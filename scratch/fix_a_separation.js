const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error(e);
        r(null);
    }));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    // TMDB ID: 57367
    let url = `https://api.themoviedb.org/3/movie/57367?api_key=${API_KEY}`;
    let sRes = await fetchJson(url);

    if (sRes) {
        let poster_path = sRes.poster_path;

        if (poster_path) {
            for (const p of data.cinematographer.cinematographers) {
                if (p.name === 'Mahmoud Kalari' || p.id === 'mahmoud-kalari') {
                    for (const m of p.mustWatch) {
                        if (m.title.includes('A Separation')) {
                            m.poster = 'https://image.tmdb.org/t/p/w500' + poster_path;
                            modified = true;
                            console.log("Fixed A Separation with poster_path: " + poster_path);
                        }
                    }
                }
            }
        } else {
            console.log("Found TMDB result but no poster_path", sRes);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated A Separation poster.");
    }
}

run();
