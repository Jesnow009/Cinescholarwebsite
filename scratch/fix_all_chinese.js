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
    let count = 0;

    for (const p of data.cinematographer.cinematographers) {
        // If the region has 'chinese' in its name
        if (p.region && p.region.includes('chinese')) {
            for (const m of p.mustWatch) {
                if (!m.poster || m.poster.includes('placeholder.jpg') || m.poster === '') {
                    // Fetch poster
                    let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                    // Sometimes title has Original Title in it
                    query = encodeURIComponent(m.title.split('(')[0].trim());
                    
                    const yearMatch = m.year ? `&year=${m.year}` : '';
                    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}${yearMatch}`;
                    
                    const sRes = await fetchJson(url);
                    if (sRes && sRes.results && sRes.results.length > 0 && sRes.results[0].poster_path) {
                        m.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
                        console.log(`Updated poster for ${m.title} (${p.name})`);
                        modified = true;
                        count++;
                    } else {
                        // try without year
                        const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
                        const sRes2 = await fetchJson(url2);
                        if (sRes2 && sRes2.results && sRes2.results.length > 0 && sRes2.results[0].poster_path) {
                            m.poster = 'https://image.tmdb.org/t/p/w500' + sRes2.results[0].poster_path;
                            console.log(`Updated poster for ${m.title} (${p.name}) (no year)`);
                            modified = true;
                            count++;
                        } else {
                            // try searching tv show if movie fails
                            const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`;
                            const tvRes = await fetchJson(tvUrl);
                            if (tvRes && tvRes.results && tvRes.results.length > 0 && tvRes.results[0].poster_path) {
                                m.poster = 'https://image.tmdb.org/t/p/w500' + tvRes.results[0].poster_path;
                                console.log(`Updated poster for ${m.title} (${p.name}) (TV)`);
                                modified = true;
                                count++;
                            } else {
                                console.log(`Could NOT find poster for ${m.title} (${p.name})`);
                            }
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
        console.log(`Fixed ${count} posters.`);
    } else {
        console.log("No posters needed fixing.");
    }
}

run();
