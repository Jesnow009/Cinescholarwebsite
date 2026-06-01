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
        if (p.id === 'roger-deakins' || p.name === 'Roger Deakins') {
            
            const movie1917 = {
                "id": "1917",
                "title": "1917",
                "year": 2019,
                "director": "Sam Mendes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, continuous long takes creating real-time immersion.",
                "plot": "April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
                "releaseDate": "2019-12-25",
                "writer": "Sam Mendes, Krysty Wilson-Cairns",
                "cinematographer": "Roger Deakins",
                "editor": "Lee Smith",
                "composer": "Thomas Newman",
                "studio": "DreamWorks Pictures, Reliance Entertainment"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=1917&year=2019`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                movie1917.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(movie1917);
            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Added 1917 to Roger Deakins.");
    }
}

run();
