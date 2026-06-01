const https = require('https');

function fetchHTML(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });
}

async function run() {
    const urls = [
        "https://www.themoviedb.org/movie/335984", // Blade Runner 2049
        "https://www.themoviedb.org/movie/530915"  // 1917
    ];
    
    for (const u of urls) {
        const html = await fetchHTML(u);
        const imgMatch = html.match(/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_-]+\.jpg)/);
        console.log(u, imgMatch ? imgMatch[1] : "NO MATCH");
    }
}
run();
