const fs = require('fs');
const https = require('https');
const path = require('path');

const titlesFile = path.join(__dirname, 'bengali_movie_titles.json');
const titles = JSON.parse(fs.readFileSync(titlesFile, 'utf8'));

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
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
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, function(response) {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.statusCode !== 304) {
                // handle redirect
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
        let titleQuery = encodeURIComponent(m.title + ' (film)');
        let wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${titleQuery}`;
        
        await wait(500);
        let res = await fetchJson(wikiUrl);
        let imageUrl = null;

        if (res && res.query && res.query.pages) {
            let pages = res.query.pages;
            let pageId = Object.keys(pages)[0];
            if (pageId !== "-1" && pages[pageId].original) {
                imageUrl = pages[pageId].original.source;
            }
        }
        
        if (!imageUrl) {
            // Try without "(film)"
            titleQuery = encodeURIComponent(m.title);
            wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${titleQuery}`;
            res = await fetchJson(wikiUrl);
            if (res && res.query && res.query.pages) {
                let pages = res.query.pages;
                let pageId = Object.keys(pages)[0];
                if (pageId !== "-1" && pages[pageId].original) {
                    imageUrl = pages[pageId].original.source;
                }
            }
        }
        
        if (imageUrl) {
            console.log(`Found image on Wikipedia for ${m.title}: ${imageUrl}`);
            const targetPath = path.join(__dirname, '..', m.posterPath);
            try {
                await download(imageUrl, targetPath);
                console.log(`Downloaded ${m.posterPath}`);
                successCount++;
            } catch(e) {
                console.error(`Failed to download ${imageUrl}`, e.message);
            }
        } else {
            console.log(`Could not find poster for ${m.title} on Wikipedia`);
        }
    }
    console.log(`Successfully downloaded ${successCount} out of ${titles.length} posters.`);
}

run();
