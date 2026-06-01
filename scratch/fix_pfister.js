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
        if (p.id === 'wally-pfister' || p.name === 'Wally Pfister') {
            p.mustWatch = [];
            
            const inception = {
                "id": "inception",
                "title": "Inception",
                "year": 2010,
                "director": "Christopher Nolan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Crisp, massive-scale practical effects shooting and fluid dream logic.",
                "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "releaseDate": "2010-07-16",
                "writer": "Christopher Nolan",
                "cinematographer": "Wally Pfister",
                "editor": "Lee Smith",
                "composer": "Hans Zimmer",
                "studio": "Warner Bros. / Legendary Pictures / Syncopy"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Inception&year=2010`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                inception.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(inception);

            const darkknight = {
                "id": "the-dark-knight",
                "title": "The Dark Knight",
                "year": 2008,
                "director": "Christopher Nolan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering IMAX action photography and slick urban noir.",
                "plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "releaseDate": "2008-07-18",
                "writer": "Jonathan Nolan, Christopher Nolan",
                "cinematographer": "Wally Pfister",
                "editor": "Lee Smith",
                "composer": "Hans Zimmer, James Newton Howard",
                "studio": "Warner Bros. / Legendary Pictures / Syncopy"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Dark%20Knight&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                darkknight.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(darkknight);

            const memento = {
                "id": "memento",
                "title": "Memento",
                "year": 2000,
                "director": "Christopher Nolan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "High-contrast juxtaposition of color and black-and-white to reflect timeline shifts.",
                "plot": "A man with short-term memory loss attempts to track down his wife's murderer.",
                "releaseDate": "2001-03-16",
                "writer": "Christopher Nolan",
                "cinematographer": "Wally Pfister",
                "editor": "Dody Dorn",
                "composer": "David Julyan",
                "studio": "Newmarket Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Memento`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                memento.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(memento);

            const prestige = {
                "id": "the-prestige",
                "title": "The Prestige",
                "year": 2006,
                "director": "Christopher Nolan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, shadowy period lighting emphasizing deception.",
                "plot": "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
                "releaseDate": "2006-10-20",
                "writer": "Jonathan Nolan, Christopher Nolan",
                "cinematographer": "Wally Pfister",
                "editor": "Lee Smith",
                "composer": "David Julyan",
                "studio": "Touchstone Pictures / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Prestige&year=2006`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                prestige.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(prestige);

            const insomnia = {
                "id": "insomnia",
                "title": "Insomnia",
                "year": 2002,
                "director": "Christopher Nolan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Overexposed, blinding daylight highlighting psychological exhaustion.",
                "plot": "Two Los Angeles homicide detectives are dispatched to a northern town where the sun doesn't set to investigate the methodical murder of a local teen.",
                "releaseDate": "2002-05-24",
                "writer": "Hillary Seitz",
                "cinematographer": "Wally Pfister",
                "editor": "Dody Dorn",
                "composer": "David Julyan",
                "studio": "Alcon Entertainment / Section Eight Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Insomnia&year=2002`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                insomnia.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(insomnia);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Wally Pfister.");
    } else {
        console.log("Could not find Wally Pfister in database.");
    }
}

run();
