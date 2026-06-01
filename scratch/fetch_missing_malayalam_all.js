const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const missingFile = path.join(__dirname, 'missing_malayalam.json');
const missing = JSON.parse(fs.readFileSync(missingFile, 'utf8'));

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
        req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function fetchFromTMDB(m) {
    let query = encodeURIComponent(m.title.replace(/[’']/g, '').trim());
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    let mRes = await fetchJson(url);
    if (mRes && mRes.results && mRes.results.length > 0) {
        let result = mRes.results[0];
        if (result && result.poster_path) {
            return 'https://image.tmdb.org/t/p/w500' + result.poster_path;
        }
    }
    return null;
}

async function fetchFromITunes(m) {
    let query = encodeURIComponent(m.title);
    let url = `https://itunes.apple.com/search?term=${query}&entity=movie&limit=1`;
    let res = await fetchJson(url);
    if (res && res.results && res.results.length > 0) {
        return res.results[0].artworkUrl100.replace('100x100bb', '600x900bb');
    }
    return null;
}

async function fetchFromWikipedia(m) {
    let query = encodeURIComponent(m.title);
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${query}`;
    let res = await fetchJson(url);
    if (res && res.query && res.query.pages) {
        const pid = Object.keys(res.query.pages)[0];
        if (res.query.pages[pid].original) {
            return res.query.pages[pid].original.source;
        }
    }
    return null;
}

async function run() {
    let count = 0;
    for (let m of missing) {
        let posterUrl = null;
        
        console.log(`Trying TMDB for ${m.title}...`);
        posterUrl = await fetchFromTMDB(m);
        await wait(2000);
        
        if (!posterUrl) {
            console.log(`Trying iTunes for ${m.title}...`);
            posterUrl = await fetchFromITunes(m);
            await wait(2000);
        }
        
        if (!posterUrl) {
            console.log(`Trying Wikipedia for ${m.title}...`);
            posterUrl = await fetchFromWikipedia(m);
            await wait(2000);
        }
        
        // try Wikipedia with " (film)"
        if (!posterUrl) {
            console.log(`Trying Wikipedia (film) for ${m.title}...`);
            let query = encodeURIComponent(m.title + " (film)");
            let url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${query}`;
            let res = await fetchJson(url);
            if (res && res.query && res.query.pages) {
                const pid = Object.keys(res.query.pages)[0];
                if (res.query.pages[pid].original) {
                    posterUrl = res.query.pages[pid].original.source;
                }
            }
            await wait(2000);
        }

        // Try wikipedia with year " (1987 film)"
        if (!posterUrl && m.year) {
            console.log(`Trying Wikipedia (${m.year} film) for ${m.title}...`);
            let query = encodeURIComponent(m.title + ` (${m.year} film)`);
            let url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${query}`;
            let res = await fetchJson(url);
            if (res && res.query && res.query.pages) {
                const pid = Object.keys(res.query.pages)[0];
                if (res.query.pages[pid].original) {
                    posterUrl = res.query.pages[pid].original.source;
                }
            }
            await wait(2000);
        }

        if (posterUrl) {
            console.log(`Found URL for ${m.title}: ${posterUrl}`);
            const targetPath = path.join(__dirname, '..', m.posterPath);
            try {
                await download(posterUrl, targetPath);
                console.log(`Downloaded ${m.posterPath}`);
                count++;
            } catch (e) {
                console.error(`Failed to download ${m.title}`, e.message);
            }
        } else {
            console.log(`Could not find ANY poster for ${m.title}`);
        }
    }
    console.log(`Successfully downloaded ${count} out of ${missing.length} missing posters.`);
}

run();
