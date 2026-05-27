const https = require('https');

https.get('https://www.themoviedb.org/person/11333-albert-maysles', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
        if (match) {
            console.log("TMDB Profile Image: https://image.tmdb.org/t/p/w500/" + match[1]);
        } else {
            console.log("Image not found");
        }
    });
}).on('error', err => console.error(err));
