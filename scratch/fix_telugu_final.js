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

    // Fix Baahubali
    let bRes = await fetchJson(`https://api.themoviedb.org/3/movie/256040?api_key=${API_KEY}`);
    let bUrl = null;
    if (bRes && bRes.poster_path) {
        bUrl = 'https://image.tmdb.org/t/p/w500' + bRes.poster_path;
    } else {
        bUrl = 'https://a.ltrbxd.com/resized/film-poster/2/1/1/8/8/6/211886-baahubali-the-beginning-0-230-0-345-crop.jpg'; // fallback
    }

    // Fix RRR
    let rRes = await fetchJson(`https://api.themoviedb.org/3/movie/579974?api_key=${API_KEY}`);
    let rUrl = null;
    if (rRes && rRes.poster_path) {
        rUrl = 'https://image.tmdb.org/t/p/w500' + rRes.poster_path;
    } else {
        rUrl = 'https://a.ltrbxd.com/resized/film-poster/4/4/6/1/3/4/446134-rrr-0-230-0-345-crop.jpg'; // fallback
    }

    for (const p of data.cinematographer.cinematographers) {
        if (p.name !== 'K. K. Senthil Kumar') continue;
        for (const m of p.mustWatch) {
            if (m.title.includes('Baahubali')) {
                if (bUrl) {
                    m.poster = bUrl;
                    console.log("Fixed Baahubali poster:", bUrl);
                    modified = true;
                }
            } else if (m.title === 'RRR') {
                if (rUrl) {
                    m.poster = rUrl;
                    console.log("Fixed RRR poster:", rUrl);
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
