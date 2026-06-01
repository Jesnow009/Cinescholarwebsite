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
        if (p.id === 'robert-richardson' || p.name === 'Robert Richardson') {
            p.mustWatch = [];
            
            const jfk = {
                "id": "jfk",
                "title": "JFK",
                "year": 1991,
                "director": "Oliver Stone",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Frenetic mixed-media montage (combining 8mm, 16mm, and 35mm).",
                "plot": "New Orleans District Attorney Jim Garrison discovers there's more to the Kennedy assassination than the official story.",
                "releaseDate": "1991-12-20",
                "writer": "Oliver Stone, Zachary Sklar",
                "cinematographer": "Robert Richardson",
                "editor": "Joe Hutshing, Pietro Scalia",
                "composer": "John Williams",
                "studio": "Warner Bros. / Le Studio Canal+ / Regency Enterprises"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=JFK&year=1991`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                jfk.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(jfk);

            const killbill = {
                "id": "kill-bill",
                "title": "Kill Bill: Vol. 1 (2003) & Vol. 2 (2004)",
                "year": 2003,
                "director": "Quentin Tarantino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Highly stylized homage to martial arts and spaghetti westerns.",
                "plot": "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
                "releaseDate": "2003-10-10", // Using Vol 1 release
                "writer": "Quentin Tarantino",
                "cinematographer": "Robert Richardson",
                "editor": "Sally Menke",
                "composer": "RZA / Robert Rodriguez",
                "studio": "Miramax / A Band Apart"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Kill%20Bill:%20Vol.%201`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                killbill.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(killbill);

            const aviator = {
                "id": "the-aviator",
                "title": "The Aviator",
                "year": 2004,
                "director": "Martin Scorsese",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant two-strip and three-strip Technicolor emulation.",
                "plot": "A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.",
                "releaseDate": "2004-12-25",
                "writer": "John Logan",
                "cinematographer": "Robert Richardson",
                "editor": "Thelma Schoonmaker",
                "composer": "Howard Shore",
                "studio": "Forward Pass / Appian Way / IMF / Miramax"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Aviator&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                aviator.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(aviator);

            const shutter = {
                "id": "shutter-island",
                "title": "Shutter Island",
                "year": 2010,
                "director": "Martin Scorsese",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gothic, moody, paranoia-inducing lighting.",
                "plot": "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
                "releaseDate": "2010-02-19",
                "writer": "Laeta Kalogridis",
                "cinematographer": "Robert Richardson",
                "editor": "Thelma Schoonmaker",
                "composer": "Robbie Robertson",
                "studio": "Paramount Pictures / Phoenix Pictures / Appian Way"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Shutter%20Island`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                shutter.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(shutter);

            const basterds = {
                "id": "inglourious-basterds",
                "title": "Inglourious Basterds",
                "year": 2009,
                "director": "Quentin Tarantino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, theatrical lighting and aggressive contrast.",
                "plot": "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
                "releaseDate": "2009-08-21",
                "writer": "Quentin Tarantino",
                "cinematographer": "Robert Richardson",
                "editor": "Sally Menke",
                "composer": "Ennio Morricone",
                "studio": "The Weinstein Company / Universal Pictures / A Band Apart"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Inglourious%20Basterds`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                basterds.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(basterds);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Robert Richardson.");
    }
}

run();
