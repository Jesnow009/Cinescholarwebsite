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
        if (p.id === 'seamus-mcgarvey' || p.name === 'Seamus McGarvey') {
            p.mustWatch = [];
            
            const atonement = {
                "id": "atonement",
                "title": "Atonement",
                "year": 2007,
                "director": "Joe Wright",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, romantic period lighting and sweeping long takes.",
                "plot": "Fledgling writer Briony Tallis, as a thirteen-year-old, irrevocably changes the course of several lives when she accuses her older sister's lover of a crime he did not commit.",
                "releaseDate": "2007-09-07",
                "writer": "Christopher Hampton",
                "cinematographer": "Seamus McGarvey",
                "editor": "Paul Tothill",
                "composer": "Dario Marianelli",
                "studio": "Working Title Films / StudioCanal / Focus Features"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Atonement&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                atonement.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(atonement);

            const anna = {
                "id": "anna-karenina",
                "title": "Anna Karenina",
                "year": 2012,
                "director": "Joe Wright",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Theatrical, highly stylized and artificially constrained Russian opulence.",
                "plot": "In late-19th-century Russian high society, St. Petersburg aristocrat Anna Karenina enters into a life-changing affair with the dashing Count Alexei Vronsky.",
                "releaseDate": "2012-09-07",
                "writer": "Tom Stoppard",
                "cinematographer": "Seamus McGarvey",
                "editor": "Melanie Oliver",
                "composer": "Dario Marianelli",
                "studio": "Working Title Films / StudioCanal / Focus Features"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Anna%20Karenina&year=2012`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                anna.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(anna);

            const avengers = {
                "id": "the-avengers",
                "title": "The Avengers",
                "year": 2012,
                "director": "Joss Whedon",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Bright, glossy, and large-scale superhero comic-book aesthetics.",
                "plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                "releaseDate": "2012-04-26",
                "writer": "Joss Whedon",
                "cinematographer": "Seamus McGarvey",
                "editor": "Jeffrey Ford, Lisa Lassek",
                "composer": "Alan Silvestri",
                "studio": "Marvel Studios / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Avengers&year=2012`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                avengers.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(avengers);

            modified = true;
            console.log("Fixed Seamus McGarvey.");
        }

        if (p.id === 'robbie-ryan' || p.name === 'Robbie Ryan') {
            p.mustWatch = [];
            
            const poor = {
                "id": "poor-things",
                "title": "Poor Things",
                "year": 2023,
                "director": "Yorgos Lanthimos",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Surreal, distorted wide-angles mixed with lush, painterly Victorian textures.",
                "plot": "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
                "releaseDate": "2023-12-08",
                "writer": "Tony McNamara",
                "cinematographer": "Robbie Ryan",
                "editor": "Yorgos Mavropsaridis",
                "composer": "Jerskin Fendrix",
                "studio": "Searchlight Pictures / Element Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Poor%20Things&year=2023`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                poor.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(poor);

            const favourite = {
                "id": "the-favourite",
                "title": "The Favourite",
                "year": 2018,
                "director": "Yorgos Lanthimos",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extreme fish-eye distortion capturing claustrophobic royal decadence.",
                "plot": "In early 18th-century England, a frail Queen Anne occupies the throne and her close friend, Lady Sarah, governs the country in her stead. When a new servant, Abigail, arrives, her charm endears her to Sarah.",
                "releaseDate": "2018-11-23",
                "writer": "Deborah Davis, Tony McNamara",
                "cinematographer": "Robbie Ryan",
                "editor": "Yorgos Mavropsaridis",
                "composer": "Compiled classical score",
                "studio": "Fox Searchlight Pictures / Film4"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Favourite&year=2018`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                favourite.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(favourite);

            const honey = {
                "id": "american-honey",
                "title": "American Honey",
                "year": 2016,
                "director": "Andrea Arnold",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, sun-drenched verité documentary-style realism in 4:3.",
                "plot": "A teenage girl with nothing to lose joins a traveling magazine sales crew, and gets caught up in a whirlwind of hard partying, law bending and young love as she criss-crosses the Midwest with a band of misfits.",
                "releaseDate": "2016-09-30",
                "writer": "Andrea Arnold",
                "cinematographer": "Robbie Ryan",
                "editor": "Joe Bini",
                "composer": "Compiled soundtrack",
                "studio": "A24 / Film4 / BFI"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=American%20Honey&year=2016`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                honey.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(honey);

            modified = true;
            console.log("Fixed Robbie Ryan.");
        }

        if (p.id === 'declan-quinn' || p.name === 'Declan Quinn') {
            p.mustWatch = [];
            
            const leaving = {
                "id": "leaving-las-vegas",
                "title": "Leaving Las Vegas",
                "year": 1995,
                "director": "Mike Figgis",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Raw, grainy, neon-soaked 16mm capturing desperate isolation.",
                "plot": "Ben Sanderson, a Hollywood screenwriter who lost everything because of his alcoholism, arrives in Las Vegas to drink himself to death. There, he meets and forms an uneasy friendship and non-interference pact with prostitute Sera.",
                "releaseDate": "1995-10-27",
                "writer": "Mike Figgis",
                "cinematographer": "Declan Quinn",
                "editor": "John Smith",
                "composer": "Mike Figgis",
                "studio": "Lumière Pictures / Initial Productions / United Artists"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Leaving%20Las%20Vegas&year=1995`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                leaving.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(leaving);

            const monsoon = {
                "id": "monsoon-wedding",
                "title": "Monsoon Wedding",
                "year": 2001,
                "director": "Mira Nair",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, kinetic, and deeply saturated handheld digital intimacy.",
                "plot": "A stressed father, a bride-to-be with a secret, a smitten event planner, and relatives from around the world create much ado about the preparations for an arranged marriage in India.",
                "releaseDate": "2001-08-31",
                "writer": "Sabrina Dhawan",
                "cinematographer": "Declan Quinn",
                "editor": "Allyson C. Johnson",
                "composer": "Mychael Danna",
                "studio": "Mirabai Films / Pandora Film / IFC Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Monsoon%20Wedding`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                monsoon.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(monsoon);

            const rachel = {
                "id": "rachel-getting-married",
                "title": "Rachel Getting Married",
                "year": 2008,
                "director": "Jonathan Demme",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Loose, documentary-style verité observing chaotic family dynamics.",
                "plot": "A young woman who has been in and out of rehab for the past 10 years returns home for the weekend for her sister's wedding.",
                "releaseDate": "2008-10-03",
                "writer": "Jenny Lumet",
                "cinematographer": "Declan Quinn",
                "editor": "Tim Squyres",
                "composer": "Donald Harrison Jr., Zafer Tawil",
                "studio": "Sony Pictures Classics / Marc Platt Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Rachel%20Getting%20Married&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                rachel.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(rachel);

            modified = true;
            console.log("Fixed Declan Quinn.");
        }

        if (p.id === 'suzie-lavelle' || p.name === 'Suzie Lavelle') {
            p.mustWatch = [];
            
            const normal = {
                "id": "normal-people",
                "title": "Normal People (Limited Series)",
                "year": 2020,
                "director": "Lenny Abrahamson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, sensitive, and emotionally grounded naturalism.",
                "plot": "Follows Marianne and Connell, from different backgrounds but the same small town in Ireland, as they weave in and out of each other's romantic lives.",
                "releaseDate": "2020-04-26",
                "writer": "Sally Rooney, Alice Birch, Mark O'Rowe",
                "cinematographer": "Suzie Lavelle",
                "editor": "Nathan Nugent",
                "composer": "Stephen Rennicks",
                "studio": "Element Pictures / BBC Three / Hulu"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=Normal%20People`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                normal.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(normal);

            const dark = {
                "id": "his-dark-materials",
                "title": "His Dark Materials (Series)",
                "year": 2019,
                "director": "Jamie Childs, Otto Bathurst",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Grand, textured, and atmospheric fantasy world-building.",
                "plot": "A young girl is destined to liberate her world from the grip of the Magisterium which represses people's ties to magic and their animal spirits known as daemons.",
                "releaseDate": "2019-11-03",
                "writer": "Jack Thorne",
                "cinematographer": "Suzie Lavelle",
                "editor": "Nse Asuquo, Dan Roberts",
                "composer": "Lorne Balfe",
                "studio": "Bad Wolf / BBC Studios / HBO"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=His%20Dark%20Materials`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                dark.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(dark);

            const jet = {
                "id": "jet-trash",
                "title": "Jet Trash",
                "year": 2016,
                "director": "Charlie Belleville",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Neon-drenched, fast-paced, and wildly kinetic.",
                "plot": "Two early-twenties London boys flee to India to escape a botched crime, but their past catches up with them.",
                "releaseDate": "2016-12-09",
                "writer": "Simon Lewis, Dan M. Brown",
                "cinematographer": "Suzie Lavelle",
                "editor": "Luke Dunkley",
                "composer": "Antongiulio Frulio",
                "studio": "Aimimage Productions / SUMS Film and Media"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jet%20Trash`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                jet.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(jet);

            modified = true;
            console.log("Fixed Suzie Lavelle.");
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
