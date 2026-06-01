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
        if (p.id === 'conrad-hall' || p.name === 'Conrad Hall') {
            p.mustWatch = [];
            
            const perdition = {
                "id": "road-to-perdition",
                "title": "Road to Perdition",
                "year": 2002,
                "director": "Sam Mendes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Somber, rain-slicked neo-noir lighting and deep shadows.",
                "plot": "A mob enforcer's son witnesses a murder, forcing him and his father to take to the road, and his father down a path of redemption and revenge.",
                "releaseDate": "2002-07-12",
                "writer": "David Self",
                "cinematographer": "Conrad Hall",
                "editor": "Jill Bilcock",
                "composer": "Thomas Newman",
                "studio": "DreamWorks Pictures / 20th Century Fox"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Road%20to%20Perdition&year=2002`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                perdition.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(perdition);

            const butch = {
                "id": "butch-cassidy-sundance",
                "title": "Butch Cassidy and the Sundance Kid",
                "year": 1969,
                "director": "George Roy Hill",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Golden-hour western warmth and stylistic intentional overexposure.",
                "plot": "Wyoming, early 1900s. Two outlaws and a beautiful woman are on the run from a relentless super-posse following a train robbery.",
                "releaseDate": "1969-09-23",
                "writer": "William Goldman",
                "cinematographer": "Conrad Hall",
                "editor": "John C. Howard, Richard C. Meyer",
                "composer": "Burt Bacharach",
                "studio": "20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Butch%20Cassidy%20and%20the%20Sundance%20Kid`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                butch.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(butch);

            const beauty = {
                "id": "american-beauty",
                "title": "American Beauty",
                "year": 1999,
                "director": "Sam Mendes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Meticulous, symmetrical framing revealing suburban emptiness.",
                "plot": "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
                "releaseDate": "1999-09-15",
                "writer": "Alan Ball",
                "cinematographer": "Conrad Hall",
                "editor": "Tariq Anwar, Christopher Greenbury",
                "composer": "Thomas Newman",
                "studio": "DreamWorks Pictures / Jinks/Cohen Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=American%20Beauty&year=1999`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                beauty.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(beauty);

            const blood = {
                "id": "in-cold-blood",
                "title": "In Cold Blood",
                "year": 1967,
                "director": "Richard Brooks",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast, documentary-style black-and-white.",
                "plot": "After a botched robbery results in the brutal murder of a rural family, two drifters elude police, in the end coming to terms with their own mortality and the repercussions of their vile crime.",
                "releaseDate": "1967-12-14",
                "writer": "Richard Brooks",
                "cinematographer": "Conrad Hall",
                "editor": "Peter Zinner",
                "composer": "Quincy Jones",
                "studio": "Columbia Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=In%20Cold%20Blood&year=1967`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                blood.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(blood);

            const luke = {
                "id": "cool-hand-luke",
                "title": "Cool Hand Luke",
                "year": 1967,
                "director": "Stuart Rosenberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweaty, sun-baked naturalism capturing oppressive heat.",
                "plot": "A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.",
                "releaseDate": "1967-11-01",
                "writer": "Donn Pearce, Frank Pierson",
                "cinematographer": "Conrad Hall",
                "editor": "Sam O'Steen",
                "composer": "Lalo Schifrin",
                "studio": "Jalem Productions / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Cool%20Hand%20Luke`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                luke.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(luke);

            const pros = {
                "id": "the-professionals",
                "title": "The Professionals",
                "year": 1966,
                "director": "Richard Brooks",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rugged, dusty western landscapes emphasizing texture.",
                "plot": "An arrogant Texas millionaire hires four adventurers to rescue his kidnapped wife from a notorious Mexican bandit.",
                "releaseDate": "1966-11-02",
                "writer": "Richard Brooks",
                "cinematographer": "Conrad Hall",
                "editor": "Peter Zinner",
                "composer": "Maurice Jarre",
                "studio": "Columbia Pictures / Pax Enterprises"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Professionals&year=1966`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                pros.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(pros);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Conrad Hall.");
    }
}

run();
