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
        if (p.id === 'gregg-toland' || p.name === 'Gregg Toland') {
            p.mustWatch = [];
            
            const kane = {
                "id": "citizen-kane",
                "title": "Citizen Kane",
                "year": 1941,
                "director": "Orson Welles",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Deep focus, dramatic low angles, and highly stylized chiaroscuro lighting.",
                "plot": "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: 'Rosebud'.",
                "releaseDate": "1941-05-01",
                "writer": "Herman J. Mankiewicz, Orson Welles",
                "cinematographer": "Gregg Toland",
                "editor": "Robert Wise",
                "composer": "Bernard Herrmann",
                "studio": "Mercury Productions / RKO Radio Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Citizen%20Kane`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                kane.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(kane);

            const grapes = {
                "id": "the-grapes-of-wrath",
                "title": "The Grapes of Wrath",
                "year": 1940,
                "director": "John Ford",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Harsh, documentary-like realism and expressionistic shadows.",
                "plot": "A poor Midwest family is forced off their land. They travel to California, suffering the misfortunes of the homeless in the Great Depression.",
                "releaseDate": "1940-03-15",
                "writer": "Nunnally Johnson",
                "cinematographer": "Gregg Toland",
                "editor": "Robert Simpson",
                "composer": "Alfred Newman",
                "studio": "20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Grapes%20of%20Wrath`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                grapes.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(grapes);

            const wuthering = {
                "id": "wuthering-heights",
                "title": "Wuthering Heights",
                "year": 1939,
                "director": "William Wyler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Moody, evocative lighting defining romantic tragedy.",
                "plot": "A servant in the house of Wuthering Heights tells a traveler the unfortunate tale of lovers Cathy and Heathcliff.",
                "releaseDate": "1939-04-14",
                "writer": "Charles MacArthur, Ben Hecht",
                "cinematographer": "Gregg Toland",
                "editor": "Sherman Todd",
                "composer": "Alfred Newman",
                "studio": "Samuel Goldwyn Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Wuthering%20Heights&year=1939`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                wuthering.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(wuthering);

            const foxes = {
                "id": "the-little-foxes",
                "title": "The Little Foxes",
                "year": 1941,
                "director": "William Wyler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Meticulous deep staging to capture shifting power dynamics in a single frame.",
                "plot": "The ruthless, moneyed Hubbard clan lives in, and poisons, their part of the deep South at the turn of the twentieth century.",
                "releaseDate": "1941-08-29",
                "writer": "Lillian Hellman",
                "cinematographer": "Gregg Toland",
                "editor": "Daniel Mandell",
                "composer": "Meredith Willson",
                "studio": "Samuel Goldwyn Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Little%20Foxes`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                foxes.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(foxes);

            const bestyears = {
                "id": "the-best-years-of-our-lives",
                "title": "The Best Years of Our Lives",
                "year": 1946,
                "director": "William Wyler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering deep focus to capture multiple layers of emotional narrative simultaneously.",
                "plot": "Three World War II veterans return home to small-town America to discover that they and their families have been irreparably changed.",
                "releaseDate": "1946-11-21",
                "writer": "Robert E. Sherwood",
                "cinematographer": "Gregg Toland",
                "editor": "Daniel Mandell",
                "composer": "Hugo Friedhofer",
                "studio": "Samuel Goldwyn Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Best%20Years%20of%20Our%20Lives`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                bestyears.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(bestyears);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Gregg Toland.");
    }
}

run();
