const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const missing = [
    { title: "Ekdin Pratidin", filename: "and_quiet_flows_the_dawn.jpg", year: 1979 },
    { title: "Goynar Baksho", filename: "goynar_baksho.jpg", year: 2013 },
    { title: "Abohomaan", filename: "abohomaan.jpg", year: 2010 },
    { title: "Tope", filename: "tope.jpg", year: 2016 },
    { title: "Baishe Srabon", filename: "22_shey_srabon.jpg", year: 2011 }
];

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
    for (let m of missing) {
        let query = encodeURIComponent(m.title);
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
        
        await wait(2000); // 2 second delay
        let mRes = await fetchJson(url);
        let posterUrl = null;
        
        if (mRes && mRes.results && mRes.results.length > 0) {
            let result = mRes.results[0];
            if (result && result.poster_path) {
                posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
            }
        } else {
            // try without year
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
            await wait(2000);
            mRes = await fetchJson(url);
            if (mRes && mRes.results && mRes.results.length > 0) {
                let result = mRes.results[0];
                if (result && result.poster_path) {
                    posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                }
            }
        }

        if (posterUrl) {
            console.log(`Found TMDB URL for ${m.title}`);
            const targetPath = path.join(__dirname, '..', 'assets', 'images', m.filename);
            try {
                await download(posterUrl, targetPath);
                console.log(`Downloaded ${m.filename}`);
            } catch (e) {
                console.error(`Failed to download ${m.title}`, e.message);
            }
        } else {
            console.log(`Could not find poster for ${m.title} on TMDB`);
        }
    }
}

run();
