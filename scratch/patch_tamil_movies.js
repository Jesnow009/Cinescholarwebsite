const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const fetchJSON = (url, retries = 3) => {
    return new Promise((resolve) => {
        const attempt = () => {
            https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try { resolve(JSON.parse(data)); }
                    catch (e) { if(retries>0){retries--; setTimeout(attempt, 2000);} else resolve(null); }
                });
            }).on('error', (err) => {
                if(retries>0){retries--; setTimeout(attempt, 2000);} else resolve(null);
            }).on('timeout', () => {
                if(retries>0){retries--; setTimeout(attempt, 2000);} else resolve(null);
            });
        };
        attempt();
    });
};

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', (err) => { fs.unlink(dest, ()=>{}); resolve(false); });
    });
};

async function processTamil() {
    const raw = fs.readFileSync('scratch/tamil_movies_raw.txt', 'utf8');
    const lines = raw.split('\n').map(l => l.trim());
    
    const directors = {};
    let currentDirector = '';
    let currentMovie = null;
    
    // We expect the first line to be a director name.
    // However, it could be a movie title if currentDirector is already set and we just finished a movie block.
    // The format is:
    // Director Name
    // Movie Title
    // Country of Origin: ...
    // Exact Release Date: ...
    // Director / Screenplay: ...
    // Cinematography: ...
    // Editing: ...
    // Music: ...
    // Production Studio: ...
    // <empty line>
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        
        if (line.startsWith('Country of Origin:')) {
            currentMovie.country = line.split(':')[1].trim();
        } else if (line.startsWith('Exact Release Date:')) {
            const dateStr = line.split(':')[1].trim();
            currentMovie.releaseDate = dateStr;
            currentMovie.year = dateStr.match(/\d{4}/) ? parseInt(dateStr.match(/\d{4}/)[0]) : 0;
        } else if (line.startsWith('Director / Screenplay:') || line.startsWith('Director:')) {
            const parts = line.split(':');
            currentMovie.director = parts[1].trim(); // Extract name, we can also extract writer if needed but let's just use what's there
            if (line.includes('Screenplay')) {
                currentMovie.writer = parts[1].split('(')[0].trim();
            }
        } else if (line.startsWith('Cinematography:')) {
            currentMovie.cinematographer = line.split(':')[1].trim();
        } else if (line.startsWith('Editing:')) {
            currentMovie.editor = line.split(':')[1].trim();
        } else if (line.startsWith('Music:')) {
            currentMovie.composer = line.split(':')[1].trim();
        } else if (line.startsWith('Production Studio:')) {
            currentMovie.studio = line.split(':')[1].trim();
        } else {
            // It's either a director name or a movie title.
            // In the provided text, directors are listed without empty lines before the first movie.
            // Example:
            // K. Balachander
            // Apoorva Raagangal
            // Country of Origin...
            if (lines[i+1] && lines[i+1].trim() && !lines[i+1].includes(':')) {
                // If the next line is also just text without a colon, then this line is the Director, and next is Movie!
                currentDirector = line;
                if (!directors[currentDirector]) directors[currentDirector] = [];
            } else if (currentDirector) {
                // It's a movie title!
                currentMovie = {
                    title: line,
                    id: line.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    country: 'India',
                    releaseDate: '',
                    year: 0,
                    director: '',
                    writer: 'N/A', // Will fill later if missing
                    cinematographer: 'N/A',
                    editor: 'N/A',
                    composer: 'N/A',
                    studio: 'N/A',
                    poster: '',
                    focus: 'A masterclass in Tamil cinema.',
                    plot: 'Plot details to be updated.'
                };
                directors[currentDirector].push(currentMovie);
            }
        }
    }
    
    console.log(`Parsed ${Object.keys(directors).length} directors.`);
    
    // Now fetch posters and synopses
    for (const dName of Object.keys(directors)) {
        for (const m of directors[dName]) {
            console.log(`Fetching TMDB for ${m.title} (${m.year})...`);
            let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(m.title)}`;
            if (m.year) searchUrl += `&year=${m.year}`;
            
            const res = await fetchJSON(searchUrl);
            if (res && res.results && res.results.length > 0) {
                const match = res.results[0];
                if (match.poster_path) {
                    const posterUrl = 'https://image.tmdb.org/t/p/w500' + match.poster_path;
                    const dest = `assets/images/${m.id}.jpg`;
                    await downloadImage(posterUrl, dest);
                    m.poster = dest;
                    console.log(`  -> Downloaded poster: ${dest}`);
                }
                if (match.overview) {
                    m.plot = match.overview;
                }
            } else {
                console.log(`  -> TMDB not found for ${m.title}`);
                // fallback poster?
                m.poster = `assets/images/${m.id}.jpg`;
            }
            
            // Clean up any NAs that might have slipped through
            if (m.writer === 'N/A' && m.director) m.writer = m.director; // Best guess based on typical auteur
            if (m.director.includes('(')) m.director = m.director.split('(')[0].trim();
            if (m.writer.includes('(')) m.writer = m.writer.split('(')[0].trim();
        }
    }
    
    // Now update data.js
    let dataJs = fs.readFileSync('js/data.js', 'utf8');
    
    for (const dName of Object.keys(directors)) {
        // Find the director in data.js
        const dirRegex = new RegExp(`(\"name\":\\s*\"${dName}\"[\\s\\S]*?\"mustWatch\":\\s*\\[)[\\s\\S]*?(\\]\\s*,\\s*\"style\")`, 'i');
        const match = dataJs.match(dirRegex);
        if (match) {
            const moviesJson = JSON.stringify(directors[dName], null, 24).replace(/\n/g, '\n                        ');
            dataJs = dataJs.replace(dirRegex, `$1\n                        ${moviesJson}\n                    $2`);
            console.log(`Updated data.js for ${dName}`);
        } else {
            console.log(`Could not find ${dName} in data.js!`);
        }
    }
    
    fs.writeFileSync('js/data.js', dataJs, 'utf8');
    console.log('Done mapping Tamil movies!');
}

processTamil().catch(console.error);
