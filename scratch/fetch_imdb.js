const https = require('https');
const fs = require('fs');
const path = require('path');

const cinematographers = [
    { name: 'roger-deakins', id: 'nm0005683' },
    { name: 'gregg-toland', id: 'nm0866754' },
    { name: 'gordon-willis', id: 'nm0932336' },
    { name: 'emmanuel-lubezki', id: 'nm0523881' },
    { name: 'robert-richardson', id: 'nm0724744' },
    { name: 'conrad-hall', id: 'nm0005734' },
    { name: 'james-wong-howe', id: 'nm0002146' },
    { name: 'robert-elswit', id: 'nm0005696' },
    { name: 'janusz-kaminski', id: 'nm0001405' },
    { name: 'wally-pfister', id: 'nm0002892' },
    { name: 'matthew-libatique', id: 'nm0508732' },
    { name: 'bill-pope', id: 'nm0691874' },
    { name: 'caleb-deschanel', id: 'nm0001028' },
    { name: 'dean-cundey', id: 'nm0005687' },
    { name: 'bradford-young', id: 'nm1125275' },
    { name: 'jordan-cronenweth', id: 'nm0188670' }
];

const outDir = path.join(__dirname, '..', 'assets', 'images', 'cinematographers');

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 308) {
                return resolve(fetchHTML(res.headers.location));
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get HTML: ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return resolve(downloadImage(res.headers.location, dest));
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to download image: ${res.statusCode}`));
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', reject);
    });
}

async function run() {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    for (const p of cinematographers) {
        console.log(`Processing ${p.name}...`);
        try {
            const html = await fetchHTML(`https://www.imdb.com/name/${p.id}/`);
            const match = html.match(/<meta property="og:image" content="([^"]+)"/);
            if (match && match[1]) {
                let imgUrl = match[1];
                console.log(`Found image: ${imgUrl}`);
                const dest = path.join(outDir, `${p.name}.jpg`);
                await downloadImage(imgUrl, dest);
                console.log(`Saved ${p.name}.jpg`);
            } else {
                console.log(`No og:image found for ${p.name}`);
            }
        } catch (e) {
            console.error(`Error processing ${p.name}:`, e.message);
        }
    }
}

run();
