const fs = require('fs');
const https = require('https');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { r(JSON.parse(data)); } catch(e) { r(null); }
            });
        }).on('error', e => r(null));
        req.setTimeout(5000, () => { req.abort(); r(null); });
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);
            });
        }).on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
        req.setTimeout(5000, () => { req.abort(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;
    
    // Process all Hollywood directors
    const hollywoodDirectors = data.director.directors.filter(d => d.region === 'hollywood-na');
    console.log(`Found ${hollywoodDirectors.length} Hollywood directors.`);

    for (let dp of hollywoodDirectors) {
        if (!dp.mustWatch || dp.mustWatch.length === 0) continue;
        console.log(`Processing director: ${dp.name}`);
        
        for (let m of dp.mustWatch) {
            let queryTitle = m.title.split('(')[0].replace(/[’']/g, '').trim();
            let query = encodeURIComponent(queryTitle);
            // Year extraction, occasionally m.year is not present, use releaseDate if needed
            let year = m.year || (m.releaseDate ? m.releaseDate.split('-')[0] : '');
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
            if (year) {
                url += `&year=${year}`;
            }
            
            let retry = 3;
            let posterUrl = null;
            
            while(retry > 0 && !posterUrl) {
                await wait(1000); // 1 second delay
                console.log(`Searching TMDB for ${queryTitle}...`);
                let mRes = await fetchJson(url);
                
                if (mRes && mRes.results && mRes.results.length > 0) {
                    let result = null;
                    if (year) {
                        result = mRes.results.find(r => r.release_date && r.release_date.startsWith(year.toString()));
                    }
                    if (!result) result = mRes.results[0]; // fallback
                    
                    if (result && result.poster_path) {
                        posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                    }
                } else if (!mRes) {
                    console.log(`Failed fetch for ${queryTitle}, retrying...`);
                    retry--;
                    continue;
                }
                break; // Break if we have a successful fetch but no results or found a poster
            }

            if (posterUrl) {
                console.log(`Found TMDB URL for ${m.title}`);
                const filename = `assets/images/${queryTitle.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`;
                try {
                    await download(posterUrl, filename);
                    console.log(`Downloaded ${m.title}`);
                    m.poster = filename;
                    modified = true;
                } catch (e) {
                    console.error(`Failed to download ${m.title}`);
                }
            } else {
                console.log(`Could not find poster for ${m.title} on TMDB`);
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated all Hollywood posters.");
    } else {
        console.log("No modifications were made.");
    }
}

run();
