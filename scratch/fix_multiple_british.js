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
        if (p.id === 'ben-richardson' || p.name === 'Ben Richardson') {
            p.mustWatch = [];
            
            const beasts = {
                "id": "beasts-of-the-southern-wild",
                "title": "Beasts of the Southern Wild",
                "year": 2012,
                "director": "Benh Zeitlin",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lyrical, handheld 16mm capturing a mythic, overgrown world.",
                "plot": "Faced with both her hot-tempered father's fading health and melting ice-caps that flood her ramshackle bayou community and unleash ancient aurochs, six-year-old Hushpuppy must learn the ways of courage and love.",
                "releaseDate": "2012-06-27",
                "writer": "Lucy Alibar, Benh Zeitlin",
                "cinematographer": "Ben Richardson",
                "editor": "Crockett Doob, Affonso Gonçalves",
                "composer": "Dan Romer, Benh Zeitlin",
                "studio": "Cinereach / Court 13 Entertainment / Fox Searchlight Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Beasts%20of%20the%20Southern%20Wild`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                beasts.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(beasts);

            const fault = {
                "id": "fault-in-our-stars",
                "title": "The Fault in Our Stars",
                "year": 2014,
                "director": "Josh Boone",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, sensitive, and emotionally grounded naturalism.",
                "plot": "Two teenage cancer patients begin a life-affirming journey to visit a reclusive author in Amsterdam.",
                "releaseDate": "2014-06-06",
                "writer": "Scott Neustadter, Michael H. Weber",
                "cinematographer": "Ben Richardson",
                "editor": "Robb Sullivan",
                "composer": "Mike Mogis, Nate Walcott",
                "studio": "Temple Hill Entertainment / TSG Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Fault%20in%20Our%20Stars`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                fault.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(fault);

            const wind = {
                "id": "wind-river",
                "title": "Wind River",
                "year": 2017,
                "director": "Taylor Sheridan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Harsh, blindingly white, and isolating winter landscapes.",
                "plot": "A veteran tracker with the Fish and Wildlife Service helps to investigate the murder of a young Native American woman, and uses the case as a means of seeking redemption for an earlier act of irresponsibility which ended in tragedy.",
                "releaseDate": "2017-08-04",
                "writer": "Taylor Sheridan",
                "cinematographer": "Ben Richardson",
                "editor": "Gary D. Roach",
                "composer": "Nick Cave, Warren Ellis",
                "studio": "Acacia Filmed Entertainment / Film 44"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Wind%20River&year=2017`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                wind.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(wind);

            modified = true;
            console.log("Fixed Ben Richardson.");
        }

        if (p.id === 'chris-menges' || p.name === 'Chris Menges') {
            p.mustWatch = [];
            
            const killing = {
                "id": "the-killing-fields",
                "title": "The Killing Fields",
                "year": 1984,
                "director": "Roland Joffé",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Unflinching, documentary-style immersion into war-torn landscapes.",
                "plot": "A journalist is trapped in Cambodia during tyrant Pol Pot's bloody 'Year Zero' cleansing campaign, which claimed the lives of two million 'undesirable' civilians.",
                "releaseDate": "1984-11-02",
                "writer": "Bruce Robinson",
                "cinematographer": "Chris Menges",
                "editor": "Jim Clark",
                "composer": "Mike Oldfield",
                "studio": "Goldcrest Films / Warner Bros."
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Killing%20Fields`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                killing.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(killing);

            const mission = {
                "id": "the-mission",
                "title": "The Mission",
                "year": 1986,
                "director": "Roland Joffé",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, sweeping jungle vistas and painterly, dramatic lighting.",
                "plot": "18th-century Spanish Jesuits try to protect a remote South American tribe in danger of falling under the rule of pro-slavery Portugal.",
                "releaseDate": "1986-05-16",
                "writer": "Robert Bolt",
                "cinematographer": "Chris Menges",
                "editor": "Jim Clark",
                "composer": "Ennio Morricone",
                "studio": "Enigma Productions / Goldcrest Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Mission&year=1986`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                mission.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(mission);

            const reader = {
                "id": "the-reader",
                "title": "The Reader",
                "year": 2008,
                "director": "Stephen Daldry",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, melancholic, and deeply texturized period lighting.",
                "plot": "Post-WWII Germany: Nearly a decade after his affair with an older woman came to a mysterious end, law student Michael Berg re-encounters his former lover as she defends herself in a war-crime trial.",
                "releaseDate": "2008-12-10",
                "writer": "David Hare",
                "cinematographer": "Chris Menges, Roger Deakins",
                "editor": "Chris Menges, Melanie Oliver",
                "composer": "Nico Muhly",
                "studio": "Mirage Enterprises / The Weinstein Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Reader&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                reader.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(reader);

            modified = true;
            console.log("Fixed Chris Menges.");
        }

        if (p.id === 'douglas-slocombe' || p.name === 'Douglas Slocombe') {
            p.mustWatch = [];
            
            const raiders = {
                "id": "raiders-of-the-lost-ark",
                "title": "Raiders of the Lost Ark",
                "year": 1981,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rich, shadowed, golden-hued pulp adventure cinematography.",
                "plot": "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
                "releaseDate": "1981-06-12",
                "writer": "Lawrence Kasdan",
                "cinematographer": "Douglas Slocombe",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "Lucasfilm Ltd. / Paramount Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Raiders%20of%20the%20Lost%20Ark`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                raiders.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(raiders);

            const julia = {
                "id": "julia",
                "title": "Julia",
                "year": 1977,
                "director": "Fred Zinnemann",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Soft, elegant, and evocative European period lighting.",
                "plot": "At the behest of an old and dear friend, playwright Lillian Hellman undertakes a dangerous mission to smuggle funds into Nazi Germany.",
                "releaseDate": "1977-10-02",
                "writer": "Alvin Sargent",
                "cinematographer": "Douglas Slocombe",
                "editor": "Walter Murch",
                "composer": "Georges Delerue",
                "studio": "20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Julia&year=1977`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                julia.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(julia);

            const servant = {
                "id": "the-servant",
                "title": "The Servant",
                "year": 1963,
                "director": "Joseph Losey",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Claustrophobic, sharply contrasted, and psychologically tense black-and-white.",
                "plot": "A wealthy young Londoner hires a manservant who eventually completely dominates his life.",
                "releaseDate": "1963-11-01",
                "writer": "Harold Pinter",
                "cinematographer": "Douglas Slocombe",
                "editor": "Reginald Mills",
                "composer": "John Dankworth",
                "studio": "Springbok Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Servant&year=1963`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                servant.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(servant);

            modified = true;
            console.log("Fixed Douglas Slocombe.");
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated cinematographers.");
    }
}

run();
