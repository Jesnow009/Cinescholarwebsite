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
        if (p.id === 'anthony-dod-mantle' || p.name === 'Anthony Dod Mantle') {
            p.mustWatch = [];
            
            const slumdog = {
                "id": "slumdog-millionaire",
                "title": "Slumdog Millionaire",
                "year": 2008,
                "director": "Danny Boyle",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, vibrant, high-energy digital and film hybrid photography.",
                "plot": "A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of 'Who Wants to be a Millionaire?'.",
                "releaseDate": "2008-11-12",
                "writer": "Simon Beaufoy",
                "cinematographer": "Anthony Dod Mantle",
                "editor": "Chris Dickens",
                "composer": "A.R. Rahman",
                "studio": "Celador Films / Film4 Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Slumdog%20Millionaire&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                slumdog.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(slumdog);

            const days = {
                "id": "28-days-later",
                "title": "28 Days Later",
                "year": 2002,
                "director": "Danny Boyle",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, low-resolution early digital video capturing apocalyptic dread.",
                "plot": "Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.",
                "releaseDate": "2002-11-01",
                "writer": "Alex Garland",
                "cinematographer": "Anthony Dod Mantle",
                "editor": "Chris Gill",
                "composer": "John Murphy",
                "studio": "DNA Films / UK Film Council"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=28%20Days%20Later&year=2002`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                days.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(days);

            const antichrist = {
                "id": "antichrist",
                "title": "Antichrist",
                "year": 2009,
                "director": "Lars von Trier",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Haunting, extreme slow-motion mixed with raw, visceral handheld camerawork.",
                "plot": "A grieving couple retreat to their cabin in the woods, hoping to repair their broken hearts and troubled marriage, but nature takes its course and things go from bad to worse.",
                "releaseDate": "2009-05-18",
                "writer": "Lars von Trier",
                "cinematographer": "Anthony Dod Mantle",
                "editor": "Åsa Mossberg",
                "composer": "Kristian Eidnes Andersen",
                "studio": "Zentropa Entertainments"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Antichrist&year=2009`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                antichrist.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(antichrist);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Anthony Dod Mantle.");
    } else {
        console.log("Could not find Anthony Dod Mantle in database.");
    }
}

run();
