const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', () => r(null)));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.name === 'Sergei Urusevsky') {
            for (const m of p.mustWatch) {
                if (m.title.includes('Cranes Are Flying')) {
                    // TMDB ID: 7520
                    let sRes = await fetchJson(`https://api.themoviedb.org/3/movie/7520?api_key=${API_KEY}`);
                    if (sRes && sRes.poster_path) {
                        m.poster = 'https://image.tmdb.org/t/p/w500' + sRes.poster_path;
                        modified = true;
                        console.log("Fixed The Cranes Are Flying");
                    }
                }
            }
        }
        if (p.name === 'Georgi Rerberg') {
            for (const m of p.mustWatch) {
                if (m.title.includes('Uncle Vanya')) {
                    // TMDB ID: 42366
                    let sRes = await fetchJson(`https://api.themoviedb.org/3/movie/42366?api_key=${API_KEY}`);
                    if (sRes && sRes.poster_path) {
                        m.poster = 'https://image.tmdb.org/t/p/w500' + sRes.poster_path;
                        modified = true;
                        console.log("Fixed Uncle Vanya");
                    }
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated last two posters.");
    }
}

run();
