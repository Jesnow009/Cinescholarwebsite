const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error("HTTP Error", e.code);
        r(null);
    }));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    // Direct lookups
    const ids = {
        'K.G.F: Chapter 1': 559969,
        'K.G.F: Chapter 2': 603692,
        'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 866597
    };

    let dp1 = data.cinematographer.cinematographers.find(p => p.name === 'Bhuvan Gowda');
    let dp2 = data.cinematographer.cinematographers.find(p => p.name === 'Siddhartha Nuni');

    for (let dp of [dp1, dp2]) {
        if (!dp) continue;
        for (let m of dp.mustWatch) {
            if (ids[m.title]) {
                let res = await fetchJson(`https://api.themoviedb.org/3/movie/${ids[m.title]}?api_key=${API_KEY}`);
                if (res && res.poster_path) {
                    m.poster = 'https://image.tmdb.org/t/p/w500' + res.poster_path;
                    console.log(`Found exact poster for ${m.title}`);
                    modified = true;
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed missing Kannada posters");
    }
}

run();
