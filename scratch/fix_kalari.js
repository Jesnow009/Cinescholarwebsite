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
        if (p.name === 'Mahmoud Kalari' || p.id === 'mahmoud-kalari') {
            for (const m of p.mustWatch) {
                console.log(`Checking ${m.title}... Current poster: ${m.poster}`);
                if (m.poster.includes('wikipedia') || m.poster.includes('placeholder.jpg') || m.poster === '') {
                    // Fetch poster
                    let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                    // Sometimes title has Original Title in it
                    query = encodeURIComponent(m.title.split('(')[0].trim());
                    
                    const yearMatch = m.year ? `&year=${m.year}` : '';
                    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}${yearMatch}`;
                    
                    // Special case for A Separation if we know ID
                    if (m.title.includes('A Separation')) {
                        url = `https://api.themoviedb.org/3/movie/57367?api_key=${API_KEY}`;
                    }
                    
                    let sRes = await fetchJson(url);
                    
                    let poster_path = null;
                    if (sRes && sRes.poster_path) {
                        poster_path = sRes.poster_path;
                    } else if (sRes && sRes.results && sRes.results.length > 0) {
                        poster_path = sRes.results[0].poster_path;
                    }
                    
                    if (poster_path) {
                        m.poster = 'https://image.tmdb.org/t/p/w500' + poster_path;
                        console.log(`Updated poster for ${m.title} to ${m.poster}`);
                        modified = true;
                    } else {
                        console.log(`Could NOT find TMDB poster for ${m.title}`);
                    }
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Mahmoud Kalari posters.");
    } else {
        console.log("No posters needed fixing for Mahmoud Kalari.");
    }
}

run();
