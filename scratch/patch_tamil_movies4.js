const fs = require('fs');
const https = require('https');

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
    return new Promise((resolve) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', (err) => { fs.unlink(dest, ()=>{}); resolve(false); });
    });
};

async function processTamil() {
    const raw = fs.readFileSync('scratch/tamil_movies_raw.txt', 'utf8');
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const directors = {};
    let currentDirector = '';
    let currentMovie = null;
    
    const knownDirectors = [
        "K. Balachander", "Balu Mahendra", "Bharathiraja", "Mani Ratnam",
        "Bala", "Selvaraghavan", "Mysskin", "Vetrimaaran",
        "Thiagarajan Kumararaja", "Pa. Ranjith", "Karthik Subbaraj",
        "Ram", "Lokesh Kanagaraj", "Mari Selvaraj"
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (knownDirectors.includes(line)) {
            currentDirector = line;
            if (!directors[currentDirector]) directors[currentDirector] = [];
            continue;
        }
        
        if (line.startsWith('Country of Origin:')) {
            currentMovie.country = line.split(':')[1].trim();
        } else if (line.startsWith('Exact Release Date:')) {
            const dateStr = line.split(':')[1].trim();
            currentMovie.releaseDate = dateStr;
            const yearMatch = dateStr.match(/\d{4}/);
            currentMovie.year = yearMatch ? parseInt(yearMatch[0]) : 0;
        } else if (line.includes('Director')) { 
            const parts = line.split(':');
            currentMovie.director = parts[1].split('(')[0].trim();
            if (line.includes('Screenplay')) {
                currentMovie.writer = parts[1].split('(')[0].trim();
            }
            if (line.includes('Cinematography')) {
                currentMovie.cinematographer = parts[1].split('(')[0].trim();
            }
        } else if (line.startsWith('Editing:')) {
            currentMovie.editor = line.split(':')[1].trim();
        } else if (line.startsWith('Music:')) {
            currentMovie.composer = line.split(':')[1].trim();
        } else if (line.startsWith('Production Studio:')) {
            currentMovie.studio = line.split(':')[1].trim();
        } else if (line.startsWith('Cinematography:')) {
            currentMovie.cinematographer = line.split(':')[1].trim();
        } else {
            // Must be a movie title
            currentMovie = {
                id: line.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: line,
                year: 0,
                director: currentDirector,
                writer: 'N/A',
                cinematographer: 'N/A',
                editor: 'N/A',
                composer: 'N/A',
                studio: 'N/A',
                poster: '',
                focus: 'A masterclass in Tamil cinema.',
                plot: 'Plot details to be updated.',
                releaseDate: 'N/A',
                country: 'India'
            };
            directors[currentDirector].push(currentMovie);
        }
    }
    
    console.log(`Parsed ${Object.keys(directors).length} directors.`);
    
    for (const dName of Object.keys(directors)) {
        for (const m of directors[dName]) {
            console.log(`Fetching TMDB for ${m.title} (${m.year})...`);
            
            let qTitle = m.title;
            if (qTitle === "O Kadhal Kanamani") qTitle = "O Kadhal Kanmani";
            
            let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(qTitle)}`;
            if (m.year) searchUrl += `&year=${m.year}`;
            
            const res = await fetchJSON(searchUrl);
            if (res && res.results && res.results.length > 0) {
                const match = res.results[0];
                if (match.poster_path) {
                    const posterUrl = 'https://image.tmdb.org/t/p/w500' + match.poster_path;
                    const dest = `assets/images/${m.id}.jpg`;
                    await downloadImage(posterUrl, dest);
                    m.poster = dest;
                }
                if (match.overview) {
                    m.plot = match.overview;
                }
            } else {
                console.log(`  -> TMDB not found for ${m.title}`);
                m.poster = `assets/images/${m.id}.jpg`;
            }
            
            if (m.writer === 'N/A' && m.director) m.writer = m.director;
        }
    }
    
    fs.writeFileSync('scratch/tamil_movies_mapped.json', JSON.stringify(directors, null, 2), 'utf8');
    console.log('Saved mapped movies to JSON!');
}

processTamil().catch(console.error);
