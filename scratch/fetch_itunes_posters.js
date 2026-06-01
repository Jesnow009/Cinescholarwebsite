const fs = require('fs');
const https = require('https');
const path = require('path');

const titlesFile = path.join(__dirname, 'bengali_movie_titles.json');
const titles = JSON.parse(fs.readFileSync(titlesFile, 'utf8'));

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
            if (response.statusCode >= 300 && response.statusCode < 400 && response.statusCode !== 304) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);
            });
        }).on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
        req.setTimeout(10000, () => { req.abort(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    let successCount = 0;
    for (let m of titles) {
        let query = encodeURIComponent(m.title);
        let url = `https://itunes.apple.com/search?term=${query}&entity=movie&limit=3`;
        
        await wait(200);
        let res = await fetchJson(url);
        let imageUrl = null;

        if (res && res.results && res.results.length > 0) {
            let bestResult = res.results[0];
            // If year is provided, try to match
            if (m.year) {
                let yearMatch = res.results.find(r => r.releaseDate && r.releaseDate.startsWith(m.year.toString()));
                if (yearMatch) bestResult = yearMatch;
            }
            // iTunes returns artworkUrl100, replace to get 600x900
            imageUrl = bestResult.artworkUrl100.replace('100x100bb', '600x900bb');
        }
        
        if (imageUrl) {
            console.log(`Found image on iTunes for ${m.title}`);
            const targetPath = path.join(__dirname, '..', m.posterPath);
            try {
                await download(imageUrl, targetPath);
                console.log(`Downloaded ${m.posterPath}`);
                successCount++;
            } catch(e) {
                console.error(`Failed to download ${imageUrl}`, e.message);
            }
        } else {
            console.log(`Could not find poster for ${m.title} on iTunes`);
        }
    }
    console.log(`Successfully downloaded ${successCount} out of ${titles.length} posters from iTunes.`);
}

run();
