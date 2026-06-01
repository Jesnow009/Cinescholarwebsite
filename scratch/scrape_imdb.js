const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.imdb.com/title/tt0213554/';
const targetPath = path.join(__dirname, '..', 'assets', 'images', 'cheriyachante_kroorakrityangal.jpg');

function fetchHtml(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
        } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
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
        req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function run() {
    const html = await fetchHtml(url);
    if (html) {
        const match = html.match(/<meta property="og:image" content="([^"]+)"/);
        if (match && match[1]) {
            let imgUrl = match[1];
            // Get highest resolution if it's an amazon AWS image
            imgUrl = imgUrl.replace(/_V1_.*\.jpg/, '_V1_FMjpg_UX1000_.jpg');
            console.log("Found image: " + imgUrl);
            await download(imgUrl, targetPath);
            console.log("Downloaded!");
        } else {
            console.log("No image found in IMDB HTML");
        }
    } else {
        console.log("Failed to fetch IMDB");
    }
}
run();
