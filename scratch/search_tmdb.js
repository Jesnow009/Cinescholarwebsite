const https = require('https');
const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const fetchJSON = (url) => new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', c => data+=c);
        res.on('end', () => resolve(JSON.parse(data)));
    });
});
const movies = ['Kazcha', 'Thanmathra', 'Aadujeevitham', 'Elippathayam'];
async function main() {
    for(const title of movies) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
        const res = await fetchJSON(url);
        if(res.results && res.results.length > 0) {
            console.log(title + ': https://image.tmdb.org/t/p/original' + res.results[0].poster_path);
        } else {
            console.log(title + ': Not Found');
        }
    }
}
main();
