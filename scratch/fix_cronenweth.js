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
        if (p.id === 'jordan-cronenweth' || p.name === 'Jordan Cronenweth') {
            p.mustWatch = [];
            
            const blade = {
                "id": "blade-runner",
                "title": "Blade Runner",
                "year": 1982,
                "director": "Ridley Scott",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Iconic, atmospheric, neon-soaked neo-noir lighting.",
                "plot": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
                "releaseDate": "1982-06-25",
                "writer": "Hampton Fancher, David Peoples",
                "cinematographer": "Jordan Cronenweth",
                "editor": "Terry Rawlings",
                "composer": "Vangelis",
                "studio": "Warner Bros. / The Ladd Company"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Blade%20Runner&year=1982`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                blade.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(blade);

            const altered = {
                "id": "altered-states",
                "title": "Altered States",
                "year": 1980,
                "director": "Ken Russell",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Hallucinatory, kinetic, and surreal visual experimentation.",
                "plot": "A Harvard scientist conducts experiments on himself with a hallucinatory drug and an isolation chamber that may be causing him to regress genetically.",
                "releaseDate": "1980-12-25",
                "writer": "Sidney Aaron",
                "cinematographer": "Jordan Cronenweth",
                "editor": "Eric Jenkins",
                "composer": "John Corigliano",
                "studio": "Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Altered%20States`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                altered.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(altered);

            const stop = {
                "id": "stop-making-sense",
                "title": "Stop Making Sense",
                "year": 1984,
                "director": "Jonathan Demme",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Groundbreaking, highly structured concert cinematography emphasizing theatrical lighting.",
                "plot": "An innovative concert movie for the rock group Talking Heads.",
                "releaseDate": "1984-10-19",
                "writer": "Jonathan Demme, Talking Heads",
                "cinematographer": "Jordan Cronenweth",
                "editor": "Lisa Day",
                "composer": "Talking Heads",
                "studio": "Cinecom Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Stop%20Making%20Sense`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                stop.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(stop);

            const peggy = {
                "id": "peggy-sue-got-married",
                "title": "Peggy Sue Got Married",
                "year": 1986,
                "director": "Francis Ford Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, nostalgic, and dreamy period lighting.",
                "plot": "Peggy Sue faints at a high school reunion. When she wakes up, she finds herself in her own past, just before she finished high school.",
                "releaseDate": "1986-10-10",
                "writer": "Jerry Leichtling, Arlene Sarner",
                "cinematographer": "Jordan Cronenweth",
                "editor": "Barry Malkin",
                "composer": "John Barry",
                "studio": "TriStar Pictures / Zoetrope Studios"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Peggy%20Sue%20Got%20Married`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                peggy.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(peggy);

            const grace = {
                "id": "state-of-grace",
                "title": "State of Grace",
                "year": 1990,
                "director": "Phil Joanou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, neo-noir realism capturing the violence of Hell's Kitchen.",
                "plot": "A Boston cop returns to his old Hell's Kitchen neighborhood as an undercover officer to infiltrate the Irish mob run by his best friend's brother.",
                "releaseDate": "1990-09-14",
                "writer": "Dennis McIntyre",
                "cinematographer": "Jordan Cronenweth",
                "editor": "Claire Simpson",
                "composer": "Ennio Morricone",
                "studio": "Orion Pictures / Cinehaus"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=State%20of%20Grace&year=1990`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                grace.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(grace);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Jordan Cronenweth.");
    }
}

run();
