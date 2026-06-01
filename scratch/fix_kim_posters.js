const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', () => resolve(null));
    });
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'kim-woo-hyung') {
            for (const m of p.mustWatch) {
                if (m.id === 'late-autumn' || m.id === 'the-front-line') {
                    const query = encodeURIComponent(m.title);
                    const searchRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`);
                    if (searchRes && searchRes.results && searchRes.results.length > 0) {
                        const posterPath = searchRes.results[0].poster_path;
                        if (posterPath) {
                            m.poster = `https://image.tmdb.org/t/p/w500${posterPath}`;
                            modified = true;
                            console.log(`Updated poster for ${m.title}`);
                        }
                    }
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed posters.");
    }
}

run();
