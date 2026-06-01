const https = require('https');

https.get('https://www.alamy.com/stock-photo/freddie-young-cinematographer.html', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        const matches = d.match(/https:\/\/[a-zA-Z0-9.-]+\.alamy\.com\/comp\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.jpg/g);
        if (matches) {
            console.log(Array.from(new Set(matches)).slice(0, 5).join('\n'));
        } else {
            console.log("No images found on Alamy.");
        }
    });
});
