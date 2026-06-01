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
        if (p.id === 'bradford-young' || p.name === 'Bradford Young') {
            p.mustWatch = [];
            
            const arrival = {
                "id": "arrival",
                "title": "Arrival",
                "year": 2016,
                "director": "Denis Villeneuve",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Murky, atmospheric, and emotionally resonant natural lighting.",
                "plot": "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
                "releaseDate": "2016-11-11",
                "writer": "Eric Heisserer",
                "cinematographer": "Bradford Young",
                "editor": "Joe Walker",
                "composer": "Jóhann Jóhannsson",
                "studio": "Paramount Pictures / FilmNation Entertainment"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Arrival&year=2016`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                arrival.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(arrival);

            const selma = {
                "id": "selma",
                "title": "Selma",
                "year": 2014,
                "director": "Ava DuVernay",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, earthy tones grounding historical figures in raw humanity.",
                "plot": "A chronicle of Dr. Martin Luther King, Jr.'s campaign to secure equal voting rights via an epic march from Selma to Montgomery, Alabama, in 1965.",
                "releaseDate": "2014-12-25",
                "writer": "Paul Webb",
                "cinematographer": "Bradford Young",
                "editor": "Spencer Averick",
                "composer": "Jason Moran",
                "studio": "Pathé / Harpo Films / Plan B / Paramount"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Selma&year=2014`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                selma.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(selma);

            const violent = {
                "id": "a-most-violent-year",
                "title": "A Most Violent Year",
                "year": 2014,
                "director": "J.C. Chandor",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Subdued, heavily shadowed 1980s winter aesthetic.",
                "plot": "In New York City 1981, an ambitious immigrant fights to protect his business and family during the most dangerous year in the city's history.",
                "releaseDate": "2014-12-31",
                "writer": "J.C. Chandor",
                "cinematographer": "Bradford Young",
                "editor": "Ron Patane",
                "composer": "Alex Ebert",
                "studio": "Participant Media / Image Nation Abu Dhabi / A24"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Most%20Violent%20Year`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                violent.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(violent);

            const saints = {
                "id": "aint-them-bodies-saints",
                "title": "Ain't Them Bodies Saints",
                "year": 2013,
                "director": "David Lowery",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Malick-esque golden hour warmth and lyrical silhouettes.",
                "plot": "An outlaw escapes from prison and sets out across the Texas hills to reunite with his wife and the daughter he has never met.",
                "releaseDate": "2013-08-16",
                "writer": "David Lowery",
                "cinematographer": "Bradford Young",
                "editor": "Craig McKay, Jane Rizzo",
                "composer": "Daniel Hart",
                "studio": "Sailor Bear / RT Features / Evolution Independent"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ain't%20Them%20Bodies%20Saints`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                saints.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(saints);

            const solo = {
                "id": "solo-a-star-wars-story",
                "title": "Solo: A Star Wars Story",
                "year": 2018,
                "director": "Ron Howard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, low-light, and surprisingly muddy sci-fi realism.",
                "plot": "During an adventure into the criminal underworld, Han Solo meets his future co-pilot Chewbacca and encounters Lando Calrissian years before joining the Rebellion.",
                "releaseDate": "2018-05-25",
                "writer": "Jonathan Kasdan, Lawrence Kasdan",
                "cinematographer": "Bradford Young",
                "editor": "Chris Dickens, Pietro Scalia",
                "composer": "John Powell, John Williams",
                "studio": "Lucasfilm / Walt Disney Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Solo:%20A%20Star%20Wars%20Story`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                solo.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(solo);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Bradford Young.");
    } else {
        console.log("Could not find Bradford Young in database.");
    }
}

run();
