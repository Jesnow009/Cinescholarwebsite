const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        r(null);
    }));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    // Fix A.R.M
    let armRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ajayante`);
    let armUrl = null;
    if (armRes && armRes.results && armRes.results.length > 0 && armRes.results[0].poster_path) {
        armUrl = 'https://image.tmdb.org/t/p/w500' + armRes.results[0].poster_path;
    }

    // Fix 2.0
    let twoRes = await fetchJson(`https://api.themoviedb.org/3/movie/338225?api_key=${API_KEY}`);
    let twoUrl = null;
    if (twoRes && twoRes.poster_path) {
        twoUrl = 'https://image.tmdb.org/t/p/w500' + twoRes.poster_path;
    }

    for (const p of data.cinematographer.cinematographers) {
        for (const m of p.mustWatch) {
            if (m.title.includes('A.R.M')) {
                if (armUrl) {
                    m.poster = armUrl;
                    console.log("Fixed ARM poster:", armUrl);
                    modified = true;
                }
            } else if (m.title === '2.0') {
                if (twoUrl) {
                    m.poster = twoUrl;
                    console.log("Fixed 2.0 poster:", twoUrl);
                    modified = true;
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed remaining Indian posters.");
    }
}

run();
