const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const missing = [
    'Sairat', 'Naal', 'Jhund', 'Phoonk', 'Hawaizaada', 'Ventilator', 'Fandry', 'Ribbon'
];

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { r(JSON.parse(data)); } catch(e) { r(null); }
            });
        }).on('error', e => {
            r(null);
        });
        req.setTimeout(5000, () => {
            req.abort();
            r(null);
        });
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
        req.setTimeout(5000, () => {
            req.abort();
            reject(new Error('timeout'));
        });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;
    const downloadedMap = {};

    for (let dp of data.cinematographer.cinematographers) {
        for (let m of dp.mustWatch) {
            if (missing.includes(m.title)) {
                let query = encodeURIComponent(m.title);
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                let retry = 3;
                let posterUrl = null;
                
                while(retry > 0 && !posterUrl) {
                    await wait(2000); // 2 second delay to avoid rate limit / connection reset
                    console.log(`Searching TMDB for ${m.title}...`);
                    let mRes = await fetchJson(url);
                    
                    if (mRes && mRes.results && mRes.results.length > 0) {
                        let result = mRes.results.find(r => r.release_date && r.release_date.startsWith(m.year.toString()));
                        if (!result) result = mRes.results[0];
                        
                        if (result && result.poster_path) {
                            posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                        }
                    } else if (!mRes) {
                        console.log(`Failed fetch for ${m.title}, retrying...`);
                        retry--;
                        continue;
                    }
                    break;
                }

                if (posterUrl) {
                    console.log(`Found TMDB URL for ${m.title}: ${posterUrl}`);
                    const filename = `assets/images/${m.title.toLowerCase().replace(/ /g, '_')}.jpg`;
                    try {
                        await download(posterUrl, filename);
                        console.log(`Downloaded ${m.title}`);
                        m.poster = filename;
                        modified = true;
                    } catch (e) {
                        console.error(`Failed to download ${m.title}`, e);
                    }
                } else {
                    console.log(`Could not find poster for ${m.title} on TMDB`);
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Marathi posters.");
    }
}

run();
