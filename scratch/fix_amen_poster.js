const https = require('https');
const fs = require('fs');
const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const fetchJSON = (url) => new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve(JSON.parse(data)));
    });
});

async function main() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Amen&year=2013`;
    const res = await fetchJSON(url);
    if (res.results && res.results.length > 0) {
        const posterUrl = 'https://image.tmdb.org/t/p/original' + res.results[0].poster_path;
        console.log('Found Amen poster: ' + posterUrl);
        
        const file = fs.createWriteStream("assets/images/amen.jpg");
        https.get(posterUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log("Downloaded amen.jpg");
                
                // Now patch data.js
                let c = fs.readFileSync('js/data.js', 'utf8');
                c = c.replace(/("title":\s*"Amen"[\s\S]*?"poster":\s*)"[^"]+"/, '$1"assets/images/amen.jpg"');
                fs.writeFileSync('js/data.js', c, 'utf8');
                console.log('data.js patched with amen.jpg');
            });
        });
    } else {
        console.log('Not Found');
    }
}
main();
