const https = require('https');

https.get('https://html.duckduckgo.com/html/?q=Freddie+Young+cinematographer+portrait', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        const matches = d.match(/https?:\/\/[^"'\s]+\.jpg/g);
        if (matches) {
            console.log(Array.from(new Set(matches)).slice(0, 10).join('\n'));
        } else {
            console.log("No images found in DuckDuckGo HTML.");
        }
    });
});
