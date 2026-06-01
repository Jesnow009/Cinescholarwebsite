const https = require('https');

function fetchHTML(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });
}

async function run() {
    for (const q of ["Blade Runner 2049", "1917"]) {
        const query = encodeURIComponent(q);
        const searchUrl = `https://www.themoviedb.org/search/movie?query=${query}`;
        const html = await fetchHTML(searchUrl);
        const imgMatch = html.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_-]+\.jpg)/);
        if (imgMatch) {
            console.log(q, imgMatch[1]);
        }
    }
}
run();
