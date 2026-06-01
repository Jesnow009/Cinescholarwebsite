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

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'darius-khondji' || p.name === 'Darius Khondji') {
            p.image = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Darius_Khondji_2017.jpg';
            modified = true;
            console.log("Updated Darius Khondji's profile picture");

            for (const m of p.mustWatch) {
                if (m.poster.includes('placeholder.jpg')) {
                    console.log(`Attempting to fetch poster for ${m.title}...`);
                    let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                    const yearMatch = m.year ? `&year=${m.year}` : '';
                    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}${yearMatch}`;
                    
                    let mRes = await fetchJson(url);
                    if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
                        m.poster = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
                        console.log(`Success for ${m.title}: ${m.poster}`);
                    } else {
                        console.log(`Still failing for ${m.title}`);
                    }
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Darius Khondji!");
    }
}

run();
