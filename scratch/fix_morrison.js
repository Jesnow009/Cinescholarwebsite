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
        if (p.id === 'rachel-morrison' || p.name === 'Rachel Morrison') {
            p.mustWatch = [];
            
            const mudbound = {
                "id": "mudbound",
                "title": "Mudbound",
                "year": 2017,
                "director": "Dee Rees",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Earthy, muddy, and textured period realism.",
                "plot": "Two men return home from World War II to work on a farm in rural Mississippi, where they experience racism and adjusting to life after war.",
                "releaseDate": "2017-11-17",
                "writer": "Virgil Williams, Dee Rees",
                "cinematographer": "Rachel Morrison",
                "editor": "Mako Kamitsuna",
                "composer": "Tamar-kali",
                "studio": "Elevated Films / Joule Media / Netflix"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mudbound`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                mudbound.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(mudbound);

            const panther = {
                "id": "black-panther",
                "title": "Black Panther",
                "year": 2018,
                "director": "Ryan Coogler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, Afrofuturist grandeur and vivid color palettes.",
                "plot": "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
                "releaseDate": "2018-02-16",
                "writer": "Ryan Coogler, Joe Robert Cole",
                "cinematographer": "Rachel Morrison",
                "editor": "Michael P. Shawver, Debbie Berman",
                "composer": "Ludwig Göransson",
                "studio": "Marvel Studios"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Black%20Panther&year=2018`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                panther.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(panther);

            const fruitvale = {
                "id": "fruitvale-station",
                "title": "Fruitvale Station",
                "year": 2013,
                "director": "Ryan Coogler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, urgent, handheld verité documentary style.",
                "plot": "The story of Oscar Grant III, a 22-year-old Bay Area resident, who crosses paths with friends, enemies, family, and strangers on the last day of 2008.",
                "releaseDate": "2013-07-26",
                "writer": "Ryan Coogler",
                "cinematographer": "Rachel Morrison",
                "editor": "Michael P. Shawver, Claudia Castello",
                "composer": "Ludwig Göransson",
                "studio": "Forest Whitaker's Significant Productions / The Weinstein Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Fruitvale%20Station`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                fruitvale.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(fruitvale);

            const cake = {
                "id": "cake",
                "title": "Cake",
                "year": 2014,
                "director": "Daniel Barnz",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, unglamorous naturalism.",
                "plot": "Claire becomes fascinated by the suicide of a woman in her chronic pain support group while grappling with her own, very raw personal tragedy.",
                "releaseDate": "2015-01-23",
                "writer": "Patrick Tobin",
                "cinematographer": "Rachel Morrison",
                "editor": "Kristina Boden",
                "composer": "Christophe Beck",
                "studio": "Cinelou Films / Echo Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Cake&year=2014`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                cake.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(cake);

            const dope = {
                "id": "dope",
                "title": "Dope",
                "year": 2015,
                "director": "Rick Famuyiwa",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Bright, energetic, and colorful sunlit LA aesthetics.",
                "plot": "Life changes for Malcolm, a geek who's surviving life in a tough neighborhood, after a chance invitation to an underground party leads him and his friends into a Los Angeles adventure.",
                "releaseDate": "2015-06-19",
                "writer": "Rick Famuyiwa",
                "cinematographer": "Rachel Morrison",
                "editor": "Lee Haugen",
                "composer": "Germaine Franco",
                "studio": "Significant Productions / i am OTHER"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Dope&year=2015`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                dope.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(dope);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Rachel Morrison.");
    }
}

run();
