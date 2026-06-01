const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const titlesFile = path.join(__dirname, 'malayalam_movie_titles.json');
const titles = JSON.parse(fs.readFileSync(titlesFile, 'utf8'));

const retryList = ["Pranayam", "Kalimannu", "Aadujeevitham", "Amen"];

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
    for (let m of titles) {
        if (!retryList.includes(m.title)) continue;
        
        let query = encodeURIComponent(m.title.replace(/[’']/g, '').trim());
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        if (m.year) url += `&year=${m.year}`;
        
        await wait(2000);
        let mRes = await fetchJson(url);
        let posterUrl = null;
        
        if (mRes && mRes.results && mRes.results.length > 0) {
            let result = mRes.results[0];
            if (result && result.poster_path) {
                posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
            }
        }
        
        if (posterUrl) {
            console.log(`Found TMDB URL for ${m.title}`);
            const targetPath = path.join(__dirname, '..', m.posterPath);
            try {
                await download(posterUrl, targetPath);
                console.log(`Downloaded ${m.posterPath}`);
            } catch (e) {
                console.error(`Failed to download ${m.title}`, e.message);
            }
        }
    }
}

run();
