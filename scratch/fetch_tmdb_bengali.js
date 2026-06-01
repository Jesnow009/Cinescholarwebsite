const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const titlesFile = path.join(__dirname, 'bengali_movie_titles.json');
const titles = JSON.parse(fs.readFileSync(titlesFile, 'utf8'));

function fetchJson(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch(e) { resolve(null); }
            });
        }).on('error', e => resolve(null));
        req.setTimeout(8000, () => { req.destroy(); resolve(null); });
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
        req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    let successCount = 0;
    for (let m of titles) {
        let query = encodeURIComponent(m.title.replace(/[’']/g, '').trim());
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        if (m.year) url += `&year=${m.year}`;
        
        let retry = 3;
        let posterUrl = null;
        
        while(retry > 0 && !posterUrl) {
            await wait(2000); // 2 second delay to avoid rate limiting
            let mRes = await fetchJson(url);
            
            if (mRes && mRes.results && mRes.results.length > 0) {
                let result = null;
                if (m.year) {
                    result = mRes.results.find(r => r.release_date && r.release_date.startsWith(m.year.toString()));
                }
                if (!result) result = mRes.results[0]; // fallback
                
                if (result && result.poster_path) {
                    posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                }
            } else if (!mRes) {
                retry--;
                continue;
            }
            break;
        }

        if (posterUrl) {
            console.log(`Found TMDB URL for ${m.title}`);
            const targetPath = path.join(__dirname, '..', m.posterPath);
            try {
                await download(posterUrl, targetPath);
                console.log(`Downloaded ${m.posterPath}`);
                successCount++;
            } catch (e) {
                console.error(`Failed to download ${m.title}`, e.message);
            }
        } else {
            console.log(`Could not find poster for ${m.title} on TMDB`);
        }
    }
    console.log(`Successfully downloaded ${successCount} out of ${titles.length} posters from TMDB.`);
}

run();
