const https = require('https');

const query = encodeURIComponent('Freddie Young cinematographer portrait');
const options = {
    hostname: 'html.duckduckgo.com',
    path: `/html/?q=${query}`,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

https.get(options, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        const matches = d.match(/https:\/\/[a-zA-Z0-9.\-_]+\/[a-zA-Z0-9.\-_/]+\.jpg/g);
        if (matches) {
            console.log("Found matches:");
            console.log(Array.from(new Set(matches)).slice(0, 10).join('\n'));
        } else {
            console.log("No images found in DuckDuckGo search.");
            console.log(d.substring(0, 500)); // Log some HTML to see if blocked
        }
    });
}).on('error', e => console.error(e));
