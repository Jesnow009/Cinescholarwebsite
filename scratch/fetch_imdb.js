const https = require('https');
const fs = require('fs');

const url = 'https://www.imdb.com/name/nm2886400/mediaviewer/rm2134084865/';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const matches = data.match(/https:\/\/m\.media-amazon\.com\/images\/M\/[^\"]+?\.jpg/g);
        console.log(JSON.stringify(matches, null, 2));
    });
}).on('error', err => console.error(err));
