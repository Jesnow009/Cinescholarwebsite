const https = require('https');
const url = 'https://www.imdb.com/title/tt0425162/';

https.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
            console.log(match[1]);
        } else {
            console.log("No og:image found");
        }
    });
}).on('error', console.error);
