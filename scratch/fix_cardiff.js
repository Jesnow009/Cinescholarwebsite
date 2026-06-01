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
        if (p.id === 'jack-cardiff' || p.name === 'Jack Cardiff') {
            p.mustWatch = [];
            
            const narc = {
                "id": "black-narcissus",
                "title": "Black Narcissus",
                "year": 1947,
                "director": "Michael Powell, Emeric Pressburger",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vivid, intense, and psychologically charged 3-strip Technicolor.",
                "plot": "A group of Anglican nuns travel to a remote location in the Himalayas to set up a school and hospital, but soon find themselves succumb to the repressed desires that the environment brings out.",
                "releaseDate": "1947-05-26",
                "writer": "Michael Powell, Emeric Pressburger",
                "cinematographer": "Jack Cardiff",
                "editor": "Reginald Beck",
                "composer": "Brian Easdale",
                "studio": "The Archers / Independent Producers"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Black%20Narcissus&year=1947`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                narc.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(narc);

            const shoes = {
                "id": "the-red-shoes",
                "title": "The Red Shoes",
                "year": 1948,
                "director": "Michael Powell, Emeric Pressburger",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expressive, fantastical, highly-stylized theatrical Technicolor.",
                "plot": "A young ballet dancer is torn between the man she loves and her pursuit to become a prima ballerina.",
                "releaseDate": "1948-09-06",
                "writer": "Michael Powell, Emeric Pressburger",
                "cinematographer": "Jack Cardiff",
                "editor": "Reginald Beck",
                "composer": "Brian Easdale",
                "studio": "The Archers"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Red%20Shoes&year=1948`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                shoes.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(shoes);

            const matter = {
                "id": "a-matter-of-life-and-death",
                "title": "A Matter of Life and Death",
                "year": 1946,
                "director": "Michael Powell, Emeric Pressburger",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "A mix of pearlescent black-and-white for heaven and vibrant Technicolor for earth.",
                "plot": "A British wartime aviator who cheats death must argue for his life before a celestial court.",
                "releaseDate": "1946-11-01",
                "writer": "Michael Powell, Emeric Pressburger",
                "cinematographer": "Jack Cardiff",
                "editor": "Reginald Beck",
                "composer": "Allan Gray",
                "studio": "The Archers"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Matter%20of%20Life%20and%20Death`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                matter.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(matter);

            const queen = {
                "id": "the-african-queen",
                "title": "The African Queen",
                "year": 1951,
                "director": "John Huston",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Groundbreaking location shooting with bulky Technicolor cameras.",
                "plot": "In Africa during WWI, a gin-swilling riverboat captain is persuaded by a strait-laced missionary to use his boat to attack an enemy warship.",
                "releaseDate": "1951-12-23",
                "writer": "James Agee, John Huston",
                "cinematographer": "Jack Cardiff",
                "editor": "Ralph Kemplen",
                "composer": "Allan Gray",
                "studio": "Horizon Pictures / Romulus Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20African%20Queen`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                queen.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(queen);

            const girl = {
                "id": "girl-on-a-motorcycle",
                "title": "Girl on a Motorcycle",
                "year": 1968,
                "director": "Jack Cardiff",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Psychedelic, solarized imagery and kinetic 60s experimentation.",
                "plot": "A newly married woman leaves her husband and rides her motorcycle to visit her lover.",
                "releaseDate": "1968-05-01",
                "writer": "Ronald Duncan",
                "cinematographer": "Jack Cardiff",
                "editor": "Malcolm Cooke",
                "composer": "Les Reed",
                "studio": "Mid Atlantic Film Holdings"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Girl%20on%20a%20Motorcycle`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                girl.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(girl);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Jack Cardiff.");
    } else {
        console.log("Could not find Jack Cardiff in database.");
    }
}

run();
