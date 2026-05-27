const https = require('https');

const options = {
  hostname: 'www.themoviedb.org',
  path: '/person/11333-albert-maysles',
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
        if (match) {
            console.log("TMDB Profile: https://image.tmdb.org/t/p/w500/" + match[1]);
        } else {
            console.log("Not found in HTML");
        }
    });
}).on('error', err => console.error(err));
