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
        if (p.id === 'bill-pope' || p.name === 'Bill Pope') {
            p.mustWatch = [];
            
            const matrix = {
                "id": "the-matrix",
                "title": "The Matrix",
                "year": 1999,
                "director": "Lana Wachowski, Lilly Wachowski",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Iconic green-tinted digital unreality and groundbreaking bullet-time.",
                "plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                "releaseDate": "1999-03-31",
                "writer": "Lana Wachowski, Lilly Wachowski",
                "cinematographer": "Bill Pope",
                "editor": "Zach Staenberg",
                "composer": "Don Davis",
                "studio": "Warner Bros. / Village Roadshow Pictures / Silver Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Matrix`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                matrix.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(matrix);

            const spiderman = {
                "id": "spider-man-2",
                "title": "Spider-Man 2",
                "year": 2004,
                "director": "Sam Raimi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, soaring comic-book action and sweeping camera moves.",
                "plot": "Peter Parker is beset with troubles in his failing personal life as he battles a brilliant scientist named Doctor Otto Octavius.",
                "releaseDate": "2004-06-30",
                "writer": "Alvin Sargent",
                "cinematographer": "Bill Pope",
                "editor": "Bob Murawski, Michael Tronick",
                "composer": "Danny Elfman",
                "studio": "Columbia Pictures / Marvel Enterprises"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Spider-Man%202&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                spiderman.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(spiderman);

            const scott = {
                "id": "scott-pilgrim",
                "title": "Scott Pilgrim vs. the World",
                "year": 2010,
                "director": "Edgar Wright",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Hyper-stylized, vibrant comic-book and video game aesthetic.",
                "plot": "In a magically realistic version of Toronto, a young man must defeat his new girlfriend's seven evil exes one by one in order to win her heart.",
                "releaseDate": "2010-08-13",
                "writer": "Michael Bacall, Edgar Wright",
                "cinematographer": "Bill Pope",
                "editor": "Jonathan Amos, Paul Machliss",
                "composer": "Nigel Godrich",
                "studio": "Universal Pictures / Marc Platt Productions / Big Talk Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Scott%20Pilgrim%20vs.%20the%20World`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                scott.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(scott);

            const army = {
                "id": "army-of-darkness",
                "title": "Army of Darkness",
                "year": 1992,
                "director": "Sam Raimi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Zany, inventive, slapstick-horror camera wizardry.",
                "plot": "A man is accidentally transported to 1300 A.D., where he must battle an army of the dead and retrieve the Necronomicon so he can return home.",
                "releaseDate": "1993-02-19",
                "writer": "Sam Raimi, Ivan Raimi",
                "cinematographer": "Bill Pope",
                "editor": "Bob Murawski, Sam Raimi",
                "composer": "Joseph LoDuca",
                "studio": "Dino De Laurentiis Communications / Renaissance Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Army%20of%20Darkness`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                army.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(army);

            const baby = {
                "id": "baby-driver",
                "title": "Baby Driver",
                "year": 2017,
                "director": "Edgar Wright",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rythmic, music-synced camera movement mimicking the soundtrack.",
                "plot": "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
                "releaseDate": "2017-06-28",
                "writer": "Edgar Wright",
                "cinematographer": "Bill Pope",
                "editor": "Jonathan Amos, Paul Machliss",
                "composer": "Steven Price",
                "studio": "TriStar Pictures / MRC / Working Title Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Baby%20Driver`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                baby.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(baby);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Bill Pope.");
    }
}

run();
