const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error("HTTP Error");
        r(null);
    }));
}

const manualIds = {
    "The Blue Elephant (El Feel El Azraq)": 272846, // The Blue Elephant
    "The Destiny (Al-Masser)": 59577, // Destiny
    "Bab el-Maqam (Passion)": 58654, // Passion
    "Palestine Stereo (Falastine Stereo)": 218525 // Palestine Stereo
};

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    let dps = ["Ahmed Al Morsy", "Ramses Marzouk", "Joe Saade", "Tarek Ben Abdallah"];

    for (const name of dps) {
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-'));
        if (!dp) continue;
        
        for (const m of dp.mustWatch) {
            if (m.poster.includes('placeholder.jpg') || m.poster === '') {
                console.log(`Fixing missing poster for: ${m.title}`);
                let posterUrl = null;
                
                // Try manual ID first if known, else search with stripped title
                let tmdbId = manualIds[m.title];
                
                if (tmdbId) {
                     let res = await fetchJson(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}`);
                     if (res && res.poster_path) {
                         posterUrl = 'https://image.tmdb.org/t/p/w500' + res.poster_path;
                     }
                }
                
                if (!posterUrl) {
                    let cleanTitle = encodeURIComponent(m.title.split('(')[0].trim());
                    let searchRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${cleanTitle}`);
                    if (searchRes && searchRes.results && searchRes.results.length > 0 && searchRes.results[0].poster_path) {
                        posterUrl = 'https://image.tmdb.org/t/p/w500' + searchRes.results[0].poster_path;
                    }
                }
                
                if (posterUrl) {
                    m.poster = posterUrl;
                    console.log(`Found poster: ${m.poster}`);
                    modified = true;
                } else {
                    console.log(`STILL FAILED for ${m.title}`);
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed missing posters");
    }
}

run();
