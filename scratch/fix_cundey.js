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
        if (p.id === 'dean-cundey' || p.name === 'Dean Cundey') {
            p.mustWatch = [];
            
            const thing = {
                "id": "the-thing",
                "title": "The Thing",
                "year": 1982,
                "director": "John Carpenter",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Chilling, isolated claustrophobia and fluid tracking shots.",
                "plot": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
                "releaseDate": "1982-06-25",
                "writer": "Bill Lancaster",
                "cinematographer": "Dean Cundey",
                "editor": "Todd Ramsay",
                "composer": "Ennio Morricone",
                "studio": "Universal Pictures / Turman-Foster Company"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Thing&year=1982`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                thing.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(thing);

            const halloween = {
                "id": "halloween",
                "title": "Halloween",
                "year": 1978,
                "director": "John Carpenter",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering Panavision steadicam creating relentless voyeuristic tension.",
                "plot": "Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois to kill again.",
                "releaseDate": "1978-10-25",
                "writer": "John Carpenter, Debra Hill",
                "cinematographer": "Dean Cundey",
                "editor": "Charles Bornstein, Tommy Lee Wallace",
                "composer": "John Carpenter",
                "studio": "Compass International Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Halloween&year=1978`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                halloween.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(halloween);

            const jurassic = {
                "id": "jurassic-park",
                "title": "Jurassic Park",
                "year": 1993,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Seamless integration of lighting for groundbreaking CGI and animatronics.",
                "plot": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
                "releaseDate": "1993-06-11",
                "writer": "Michael Crichton, David Koepp",
                "cinematographer": "Dean Cundey",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "Universal Pictures / Amblin Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jurassic%20Park`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                jurassic.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(jurassic);

            const bttf = {
                "id": "back-to-the-future",
                "title": "Back to the Future",
                "year": 1985,
                "director": "Robert Zemeckis",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, nostalgic Spielberg-era blockbuster lighting.",
                "plot": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
                "releaseDate": "1985-07-03",
                "writer": "Robert Zemeckis, Bob Gale",
                "cinematographer": "Dean Cundey",
                "editor": "Harry Keramidas, Arthur Schmidt",
                "composer": "Alan Silvestri",
                "studio": "Universal Pictures / Amblin Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Back%20to%20the%20Future`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                bttf.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(bttf);

            const roger = {
                "id": "who-framed-roger-rabbit",
                "title": "Who Framed Roger Rabbit",
                "year": 1988,
                "director": "Robert Zemeckis",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Complex, dynamic camera movement accommodating non-existent animated characters.",
                "plot": "A toon-hating detective is a cartoon rabbit's only hope to prove his innocence when he is accused of murder.",
                "releaseDate": "1988-06-22",
                "writer": "Jeffrey Price, Peter S. Seaman",
                "cinematographer": "Dean Cundey",
                "editor": "Arthur Schmidt, Harry Keramidas",
                "composer": "Alan Silvestri",
                "studio": "Touchstone Pictures / Amblin Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Who%20Framed%20Roger%20Rabbit`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                roger.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(roger);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Dean Cundey.");
    }
}

run();
