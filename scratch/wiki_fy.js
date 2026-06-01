const https = require('https');

https.get('https://en.wikipedia.org/wiki/Freddie_Young', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        const matches = d.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/[^"'\s]+\.jpg/gi);
        if (matches) {
            console.log(Array.from(new Set(matches)).join('\n'));
        } else {
            console.log("No images found on Wikipedia.");
        }
    });
});
