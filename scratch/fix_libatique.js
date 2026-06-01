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
        if (p.id === 'matthew-libatique' || p.name === 'Matthew Libatique') {
            p.mustWatch = [];
            
            const requiem = {
                "id": "requiem-for-a-dream",
                "title": "Requiem for a Dream",
                "year": 2000,
                "director": "Darren Aronofsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Frenetic, stylized, and anxiety-inducing 'hip-hop montage'.",
                "plot": "The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.",
                "releaseDate": "2000-10-27",
                "writer": "Darren Aronofsky, Hubert Selby Jr.",
                "cinematographer": "Matthew Libatique",
                "editor": "Jay Rabinowitz",
                "composer": "Clint Mansell",
                "studio": "Artisan Entertainment / Thousand Words"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Requiem%20for%20a%20Dream`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                requiem.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(requiem);

            const swan = {
                "id": "black-swan",
                "title": "Black Swan",
                "year": 2010,
                "director": "Darren Aronofsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Claustrophobic, handheld camera emphasizing psychological descent.",
                "plot": "A committed dancer struggles to maintain her sanity after winning the lead role in a production of Tchaikovsky's 'Swan Lake'.",
                "releaseDate": "2010-12-03",
                "writer": "Mark Heyman, Andres Heinz, John McLaughlin",
                "cinematographer": "Matthew Libatique",
                "editor": "Andrew Weisblum",
                "composer": "Clint Mansell",
                "studio": "Fox Searchlight Pictures / Protozoa Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Black%20Swan&year=2010`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                swan.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(swan);

            const pi = {
                "id": "pi",
                "title": "Pi",
                "year": 1998,
                "director": "Darren Aronofsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "High-contrast, gritty, kinetic 16mm black-and-white.",
                "plot": "A paranoid mathematician searches for a key number that will unlock the universal patterns found in nature.",
                "releaseDate": "1998-07-10",
                "writer": "Darren Aronofsky",
                "cinematographer": "Matthew Libatique",
                "editor": "Oren Sarch",
                "composer": "Clint Mansell",
                "studio": "Protozoa Pictures / Harvest Filmworks"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Pi&year=1998`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                pi.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(pi);

            const star = {
                "id": "a-star-is-born",
                "title": "A Star Is Born",
                "year": 2018,
                "director": "Bradley Cooper",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, stage-bound concert photography and immersive color theory.",
                "plot": "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.",
                "releaseDate": "2018-10-05",
                "writer": "Eric Roth, Bradley Cooper, Will Fetters",
                "cinematographer": "Matthew Libatique",
                "editor": "Jay Cassidy",
                "composer": "Lady Gaga, Bradley Cooper",
                "studio": "Warner Bros. / Metro-Goldwyn-Mayer"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Star%20Is%20Born&year=2018`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                star.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(star);

            const mother = {
                "id": "mother",
                "title": "Mother!",
                "year": 2017,
                "director": "Darren Aronofsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Restricted, over-the-shoulder subjective framing binding us to the protagonist.",
                "plot": "A couple's relationship is tested when uninvited guests arrive at their home, disrupting their tranquil existence.",
                "releaseDate": "2017-09-15",
                "writer": "Darren Aronofsky",
                "cinematographer": "Matthew Libatique",
                "editor": "Andrew Weisblum",
                "composer": "Jóhann Jóhannsson",
                "studio": "Paramount Pictures / Protozoa Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mother!&year=2017`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                mother.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(mother);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Matthew Libatique.");
    } else {
        console.log("Could not find Matthew Libatique in database.");
    }
}

run();
