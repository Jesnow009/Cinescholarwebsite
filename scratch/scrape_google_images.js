const https = require('https');

https.get('https://www.google.com/search?q=Freddie+Young+cinematographer&tbm=isch', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        const matches = d.match(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=[a-zA-Z0-9_-]+/g);
        if (matches) {
            console.log(Array.from(new Set(matches)).slice(0, 5).join('\n'));
        } else {
            console.log("No images found.");
        }
    });
});
