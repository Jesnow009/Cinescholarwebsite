const https = require('https');
const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const fetchJSON = (url) => new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', c => data+=c);
        res.on('end', () => resolve(JSON.parse(data)));
    });
});
async function main() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent('Kaazhcha')}`;
    const res = await fetchJSON(url);
    if(res.results && res.results.length > 0) {
        console.log('Kaazhcha: https://image.tmdb.org/t/p/original' + res.results[0].poster_path);
    } else {
        console.log('Not Found');
    }
}
main();
