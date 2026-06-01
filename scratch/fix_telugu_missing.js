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

    // Retry fetching
    for (const p of data.cinematographer.cinematographers) {
        if (p.name !== 'K. K. Senthil Kumar') continue;

        for (const m of p.mustWatch) {
            if (m.poster.includes('placeholder.jpg')) {
                let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                let res = await fetchJson(url);
                if (res && res.results && res.results.length > 0 && res.results[0].poster_path) {
                    m.poster = 'https://image.tmdb.org/t/p/w500' + res.results[0].poster_path;
                    console.log(`Fixed poster for: ${m.title}`);
                    modified = true;
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed remaining Telugu posters.");
    }
}

run();
