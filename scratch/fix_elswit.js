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
        if (p.id === 'robert-elswit' || p.name === 'Robert Elswit') {
            p.mustWatch = [];
            
            const blood = {
                "id": "there-will-be-blood",
                "title": "There Will Be Blood",
                "year": 2007,
                "director": "Paul Thomas Anderson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, unforgiving desert sunlight and oily, subterranean darkness.",
                "plot": "A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.",
                "releaseDate": "2007-12-26",
                "writer": "Paul Thomas Anderson",
                "cinematographer": "Robert Elswit",
                "editor": "Dylan Tichenor",
                "composer": "Jonny Greenwood",
                "studio": "Paramount Vantage / Miramax Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=There%20Will%20Be%20Blood`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                blood.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(blood);

            const punch = {
                "id": "punch-drunk-love",
                "title": "Punch-Drunk Love",
                "year": 2002,
                "director": "Paul Thomas Anderson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expressionistic lens flares and aggressive, emotional color palettes.",
                "plot": "A psychologically troubled novelty supplier is nudged towards a romance with an English woman, all while being extorted by a phone-sex line run by a crooked mattress salesman.",
                "releaseDate": "2002-10-11",
                "writer": "Paul Thomas Anderson",
                "cinematographer": "Robert Elswit",
                "editor": "Leslie Jones",
                "composer": "Jon Brion",
                "studio": "Revolution Studios / New Line Cinema"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Punch-Drunk%20Love`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                punch.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(punch);

            const night = {
                "id": "good-night-and-good-luck",
                "title": "Good Night, and Good Luck.",
                "year": 2005,
                "director": "George Clooney",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Crisp, smoky, period-accurate black-and-white television aesthetic.",
                "plot": "Broadcast journalist Edward R. Murrow looks to bring down Senator Joseph McCarthy.",
                "releaseDate": "2005-10-14",
                "writer": "George Clooney, Grant Heslov",
                "cinematographer": "Robert Elswit",
                "editor": "Stephen Mirrione",
                "composer": "Dianne Reeves",
                "studio": "Section Eight Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Good%20Night%20and%20Good%20Luck`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                night.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(night);

            const boogie = {
                "id": "boogie-nights",
                "title": "Boogie Nights",
                "year": 1997,
                "director": "Paul Thomas Anderson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, Scorsese-esque kinetic long takes mimicking the excess of the 70s.",
                "plot": "The story of a young man's adventures in the Californian pornography industry of the late 1970s and early 1980s.",
                "releaseDate": "1997-10-10",
                "writer": "Paul Thomas Anderson",
                "cinematographer": "Robert Elswit",
                "editor": "Dylan Tichenor",
                "composer": "Michael Penn",
                "studio": "New Line Cinema"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Boogie%20Nights`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                boogie.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(boogie);

            const crawler = {
                "id": "nightcrawler",
                "title": "Nightcrawler",
                "year": 2014,
                "director": "Dan Gilroy",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sleek, predatory, sodium-vapor bathed neo-noir Los Angeles.",
                "plot": "When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant to become the star of his own story.",
                "releaseDate": "2014-10-31",
                "writer": "Dan Gilroy",
                "cinematographer": "Robert Elswit",
                "editor": "John Gilroy",
                "composer": "James Newton Howard",
                "studio": "Bold Films / Open Road Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Nightcrawler&year=2014`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                crawler.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(crawler);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Robert Elswit.");
    }
}

run();
