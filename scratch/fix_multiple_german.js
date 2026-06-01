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
        if (p.id === 'robby-muller' || p.name === 'Robby Müller' || p.name.includes('Muller') || p.name.includes('Müller')) {
            p.mustWatch = [];
            const paris = {
                "id": "paris-texas",
                "title": "Paris, Texas",
                "year": 1984,
                "director": "Wim Wenders",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, deeply saturated neon colors contrasting with barren desert landscapes.",
                "plot": "A man wanders out of the desert not knowing who he is. His brother finds him, and helps to pull his memory back of the life he led before he walked out on his family and disappeared four years earlier.",
                "releaseDate": "1984-05-19",
                "writer": "L.M. Kit Carson, Sam Shepard",
                "cinematographer": "Robby Müller",
                "editor": "Peter Przygodda",
                "composer": "Ry Cooder",
                "studio": "Road Movies Filmproduktion / Argos Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Paris,%20Texas&year=1984`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) paris.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(paris);

            const dead = {
                "id": "dead-man",
                "title": "Dead Man",
                "year": 1995,
                "director": "Jim Jarmusch",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast, silvery black-and-white western minimalism.",
                "plot": "On the run after murdering a man, accountant William Blake encounters a strange Native American named Nobody who prepares him for his journey into the spiritual world.",
                "releaseDate": "1995-05-26",
                "writer": "Jim Jarmusch",
                "cinematographer": "Robby Müller",
                "editor": "Jay Rabinowitz",
                "composer": "Neil Young",
                "studio": "Pandora Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Dead%20Man&year=1995`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) dead.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(dead);

            const breaking = {
                "id": "breaking-the-waves",
                "title": "Breaking the Waves",
                "year": 1996,
                "director": "Lars von Trier",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, grainy, documentary-style handheld camera work.",
                "plot": "Bess McNeill, a naive young woman in a strict Scottish religious community, marries offshore oil rig worker Jan. After an accident paralyzes him, Jan asks Bess to have sex with other men and tell him about it.",
                "releaseDate": "1996-05-18",
                "writer": "Lars von Trier, Peter Asmussen",
                "cinematographer": "Robby Müller",
                "editor": "Anders Refn",
                "composer": "Joachim Holbek",
                "studio": "Zentropa Entertainments"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Breaking%20the%20Waves`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) breaking.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(breaking);

            modified = true;
        }

        if (p.id === 'karl-freund' || p.name === 'Karl Freund') {
            p.mustWatch = [];
            const metropolis = {
                "id": "metropolis",
                "title": "Metropolis",
                "year": 1927,
                "director": "Fritz Lang",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Groundbreaking expressionist miniature photography and the Schüfftan process.",
                "plot": "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.",
                "releaseDate": "1927-01-10",
                "writer": "Thea von Harbou, Fritz Lang",
                "cinematographer": "Karl Freund, Günther Rittau, Walter Ruttmann",
                "editor": "Fritz Lang",
                "composer": "Gottfried Huppertz",
                "studio": "Universum Film AG"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Metropolis&year=1927`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) metropolis.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(metropolis);

            const lastLaugh = {
                "id": "the-last-laugh",
                "title": "The Last Laugh",
                "year": 1924,
                "director": "F.W. Murnau",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "The pioneering 'unchained camera' (entfesselte Kamera) moving freely through space.",
                "plot": "An aging doorman, after being fired from his prestigious job at a luxurious hotel, faces the scorn of his friends, neighbors, and society.",
                "releaseDate": "1924-12-23",
                "writer": "Carl Mayer",
                "cinematographer": "Karl Freund",
                "editor": "Elfi Böttrich",
                "composer": "Giuseppe Becce",
                "studio": "Universum Film AG"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Last%20Laugh&year=1924`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) lastLaugh.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(lastLaugh);

            const dracula = {
                "id": "dracula",
                "title": "Dracula",
                "year": 1931,
                "director": "Tod Browning",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gothic, moody, high-contrast shadows bringing German Expressionism to Hollywood.",
                "plot": "The ancient vampire Count Dracula arrives in England and begins to prey upon the virtuous young Mina.",
                "releaseDate": "1931-02-12",
                "writer": "Garrett Fort",
                "cinematographer": "Karl Freund",
                "editor": "Milton Carruth",
                "composer": "Philip Glass",
                "studio": "Universal Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Dracula&year=1931`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) dracula.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(dracula);

            modified = true;
        }

        if (p.id === 'michael-ballhaus' || p.name === 'Michael Ballhaus') {
            p.mustWatch = [];
            const goodfellas = {
                "id": "goodfellas",
                "title": "Goodfellas",
                "year": 1990,
                "director": "Martin Scorsese",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Aggressive, kinetic tracking shots and highly choreographed long takes.",
                "plot": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
                "releaseDate": "1990-09-19",
                "writer": "Nicholas Pileggi, Martin Scorsese",
                "cinematographer": "Michael Ballhaus",
                "editor": "Thelma Schoonmaker",
                "composer": "None",
                "studio": "Warner Bros."
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Goodfellas&year=1990`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) goodfellas.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(goodfellas);

            const baker = {
                "id": "the-fabulous-baker-boys",
                "title": "The Fabulous Baker Boys",
                "year": 1989,
                "director": "Steve Kloves",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, sensual, smoke-filled club lighting with elegant 360-degree tracking.",
                "plot": "Two piano-playing brothers who have been performing together for 15 years decide to spice up their act by hiring a female singer.",
                "releaseDate": "1989-10-13",
                "writer": "Steve Kloves",
                "cinematographer": "Michael Ballhaus",
                "editor": "William Steinkamp",
                "composer": "Dave Grusin",
                "studio": "Gladden Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Fabulous%20Baker%20Boys`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) baker.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(baker);

            const dracula2 = {
                "id": "bram-stokers-dracula",
                "title": "Bram Stoker's Dracula",
                "year": 1992,
                "director": "Francis Ford Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Theatrical, in-camera effects using multiple exposures and forced perspective.",
                "plot": "Count Dracula travels to London to find the woman who looks like his long dead wife.",
                "releaseDate": "1992-11-13",
                "writer": "James V. Hart",
                "cinematographer": "Michael Ballhaus",
                "editor": "Nicholas C. Smith, Glen Scantlebury, Anne Goursaud",
                "composer": "Wojciech Kilar",
                "studio": "American Zoetrope"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Bram%20Stoker%27s%20Dracula`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) dracula2.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(dracula2);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated German cinematographers.");
    }
}

run();
