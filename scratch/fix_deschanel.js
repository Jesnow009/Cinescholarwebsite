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
        if (p.id === 'caleb-deschanel' || p.name === 'Caleb Deschanel') {
            p.mustWatch = [];
            
            const stallion = {
                "id": "the-black-stallion",
                "title": "The Black Stallion",
                "year": 1979,
                "director": "Carroll Ballard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Wordless, poetic, and sun-drenched naturalistic photography.",
                "plot": "While traveling with his father, young Alec becomes fascinated by a mysterious Arabian stallion. When their ship tragically sinks, Alec and the horse are stranded on a deserted island where they form a unique bond.",
                "releaseDate": "1979-10-17",
                "writer": "Melissa Mathison, Jeanne Rosenberg, William D. Wittliff",
                "cinematographer": "Caleb Deschanel",
                "editor": "Robert Dalva",
                "composer": "Carmine Coppola",
                "studio": "Omni Zoetrope / United Artists"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Black%20Stallion`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                stallion.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(stallion);

            const rightstuff = {
                "id": "the-right-stuff",
                "title": "The Right Stuff",
                "year": 1983,
                "director": "Philip Kaufman",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Heroic, golden-hour Americana framing the space race.",
                "plot": "The story of the original Mercury 7 astronauts and their macho, seat-of-the-pants approach to the space program.",
                "releaseDate": "1983-10-21",
                "writer": "Philip Kaufman",
                "cinematographer": "Caleb Deschanel",
                "editor": "Glenn Farr, Lisa Fruchtman, Stephen A. Rotter, Douglas Stewart, Tom Rolf",
                "composer": "Bill Conti",
                "studio": "The Ladd Company / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Right%20Stuff`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                rightstuff.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(rightstuff);

            const natural = {
                "id": "the-natural",
                "title": "The Natural",
                "year": 1984,
                "director": "Barry Levinson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Mythic, nostalgic backlighting elevating baseball to legend.",
                "plot": "An unknown middle-aged batter with a mysterious past appears out of nowhere to take a losing 1930s baseball team to the top of the league.",
                "releaseDate": "1984-05-11",
                "writer": "Roger Towne, Phil Dusenberry",
                "cinematographer": "Caleb Deschanel",
                "editor": "Stu Linder",
                "composer": "Randy Newman",
                "studio": "TriStar Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Natural&year=1984`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                natural.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(natural);

            const never = {
                "id": "never-look-away",
                "title": "Never Look Away",
                "year": 2018,
                "director": "Florian Henckel von Donnersmarck",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expansive, pristine, and luminous historical portraiture.",
                "plot": "An artist escapes to West Germany, but continues to be tormented by his childhood experiences under the Nazis and the GDR-regime.",
                "releaseDate": "2018-11-02",
                "writer": "Florian Henckel von Donnersmarck",
                "cinematographer": "Caleb Deschanel",
                "editor": "Patricia Rommel",
                "composer": "Max Richter",
                "studio": "Pergamon Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Never%20Look%20Away`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                never.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(never);

            const fly = {
                "id": "fly-away-home",
                "title": "Fly Away Home",
                "year": 1996,
                "director": "Carroll Ballard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Aerial majesty and lyrical tracking shots of nature.",
                "plot": "A father and daughter decide to attempt to lead a flock of orphaned Canada Geese south by air.",
                "releaseDate": "1996-09-13",
                "writer": "Robert Rodat, Vince McKewin",
                "cinematographer": "Caleb Deschanel",
                "editor": "Nicholas C. Smith",
                "composer": "Mark Isham",
                "studio": "Columbia Pictures / Sandollar Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Fly%20Away%20Home`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                fly.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(fly);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Caleb Deschanel.");
    }
}

run();
