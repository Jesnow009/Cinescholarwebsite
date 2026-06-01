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
        if (p.id === 'james-wong-howe' || p.name === 'James Wong Howe') {
            p.mustWatch = [];
            
            const hud = {
                "id": "hud",
                "title": "Hud",
                "year": 1963,
                "director": "Martin Ritt",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast, deeply textured widescreen black-and-white.",
                "plot": "Honest and hard-working Texas rancher Homer Bannon has a conflict with his unscrupulous and selfish son Hud, who sank into alcoholism and arrogance after accidentally killing his brother in a car crash.",
                "releaseDate": "1963-05-29",
                "writer": "Irving Ravetch, Harriet Frank Jr.",
                "cinematographer": "James Wong Howe",
                "editor": "Frank Bracht",
                "composer": "Elmer Bernstein",
                "studio": "Salem Productions / Paramount Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Hud&year=1963`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                hud.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(hud);

            const smell = {
                "id": "sweet-smell-of-success",
                "title": "Sweet Smell of Success",
                "year": 1957,
                "director": "Alexander Mackendrick",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, gleaming, nocturnal New York noir lighting.",
                "plot": "Powerful but unethical Broadway columnist J.J. Hunsecker coerces unscrupulous press agent Sidney Falco into breaking up his sister's romance with a jazz musician.",
                "releaseDate": "1957-06-27",
                "writer": "Clifford Odets, Ernest Lehman",
                "cinematographer": "James Wong Howe",
                "editor": "Alan Crosland Jr.",
                "composer": "Elmer Bernstein",
                "studio": "Norma-Clandon Productions / United Artists"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Sweet%20Smell%20of%20Success`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                smell.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(smell);

            const seconds = {
                "id": "seconds",
                "title": "Seconds",
                "year": 1966,
                "director": "John Frankenheimer",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Distorted, wide-angle paranoia and surrealism.",
                "plot": "An unhappy middle-aged banker agrees to a procedure that will fake his death and give him a completely new look and identity - one that comes with its own horrific price.",
                "releaseDate": "1966-10-05",
                "writer": "Lewis John Carlino",
                "cinematographer": "James Wong Howe",
                "editor": "Ferris Webster",
                "composer": "Jerry Goldsmith",
                "studio": "Douglas & Lewis Productions / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Seconds&year=1966`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                seconds.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(seconds);

            const rose = {
                "id": "the-rose-tattoo",
                "title": "The Rose Tattoo",
                "year": 1955,
                "director": "Daniel Mann",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Evocative, moody lighting balancing tragedy and earthy romance.",
                "plot": "An Italian-American widow, in mourning for her husband, discovers he may not have been the faithful man she thought.",
                "releaseDate": "1955-12-12",
                "writer": "Tennessee Williams, Hal Kanter",
                "cinematographer": "James Wong Howe",
                "editor": "Warren Low",
                "composer": "Alex North",
                "studio": "Hal Wallis Productions / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Rose%20Tattoo`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                rose.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(rose);

            const picnic = {
                "id": "picnic",
                "title": "Picnic",
                "year": 1955,
                "director": "Joshua Logan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, sweeping Technicolor capturing simmering midwestern desires.",
                "plot": "Emotions are ignited amongst the complacent townsfolk when a handsome drifter arrives in a small Kansas community on the morning of the Labor Day picnic.",
                "releaseDate": "1956-02-16",
                "writer": "Daniel Taradash",
                "cinematographer": "James Wong Howe",
                "editor": "Charles Nelson, William A. Lyon",
                "composer": "George Duning",
                "studio": "Columbia Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Picnic&year=1955`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                picnic.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(picnic);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed James Wong Howe.");
    }
}

run();
