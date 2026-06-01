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
        if (p.id === 'gordon-willis' || p.name === 'Gordon Willis') {
            p.mustWatch = [];
            
            const godfather = {
                "id": "the-godfather",
                "title": "The Godfather",
                "year": 1972,
                "director": "Francis Ford Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "The 'Prince of Darkness' - revolutionary top lighting and deep shadows.",
                "plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                "releaseDate": "1972-03-24",
                "writer": "Mario Puzo, Francis Ford Coppola",
                "cinematographer": "Gordon Willis",
                "editor": "William Reynolds, Peter Zinner",
                "composer": "Nino Rota",
                "studio": "Paramount Pictures / Alfran Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Godfather&year=1972`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                godfather.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(godfather);

            const manhattan = {
                "id": "manhattan",
                "title": "Manhattan",
                "year": 1979,
                "director": "Woody Allen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, romantic, and contrast-rich widescreen black-and-white.",
                "plot": "The life of a divorced television writer dating a teenage girl is further complicated when he falls in love with his best friend's mistress.",
                "releaseDate": "1979-04-25",
                "writer": "Woody Allen, Marshall Brickman",
                "cinematographer": "Gordon Willis",
                "editor": "Susan E. Morse",
                "composer": "George Gershwin",
                "studio": "Jack Rollins & Charles H. Joffe Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Manhattan&year=1979`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                manhattan.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(manhattan);

            const president = {
                "id": "all-the-presidents-men",
                "title": "All the President's Men",
                "year": 1976,
                "director": "Alan J. Pakula",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Paranoid thrillers defined by extreme lighting contrasts (bright offices vs dark garages).",
                "plot": "The Washington Post reporters Bob Woodward and Carl Bernstein uncover the details of the Watergate scandal that leads to President Richard Nixon's resignation.",
                "releaseDate": "1976-04-09",
                "writer": "William Goldman",
                "cinematographer": "Gordon Willis",
                "editor": "Robert L. Wolfe",
                "composer": "David Shire",
                "studio": "Wildwood Enterprises / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=All%20the%20President's%20Men`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                president.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(president);

            const klute = {
                "id": "klute",
                "title": "Klute",
                "year": 1971,
                "director": "Alan J. Pakula",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Claustrophobic, moody framing pushing subjects to the edge of the screen.",
                "plot": "A small-town detective searching for a missing man has only one lead: a connection with a New York prostitute.",
                "releaseDate": "1971-06-25",
                "writer": "Andy Lewis, Dave Lewis",
                "cinematographer": "Gordon Willis",
                "editor": "Carl Lerner",
                "composer": "Michael Small",
                "studio": "Gus Productions / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Klute`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                klute.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(klute);

            const cairo = {
                "id": "the-purple-rose-of-cairo",
                "title": "The Purple Rose of Cairo",
                "year": 1985,
                "director": "Woody Allen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, nostalgic period lighting contrasting reality and cinema.",
                "plot": "In New Jersey in 1935, a movie character steps off the screen and into the real world.",
                "releaseDate": "1985-03-01",
                "writer": "Woody Allen",
                "cinematographer": "Gordon Willis",
                "editor": "Susan E. Morse",
                "composer": "Dick Hyman",
                "studio": "Orion Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Purple%20Rose%20of%20Cairo`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                cairo.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(cairo);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Gordon Willis.");
    }
}

run();
