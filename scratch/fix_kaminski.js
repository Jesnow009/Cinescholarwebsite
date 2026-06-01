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
        if (p.id === 'janusz-kaminski' || p.name === 'Janusz Kamiński' || p.name === 'Janusz Kaminski') {
            p.mustWatch = [];
            
            const ryan = {
                "id": "saving-private-ryan",
                "title": "Saving Private Ryan",
                "year": 1998,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated colors, stripped shutter angles, and kinetic handheld grit.",
                "plot": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
                "releaseDate": "1998-07-24",
                "writer": "Robert Rodat",
                "cinematographer": "Janusz Kamiński",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "DreamWorks Pictures / Paramount Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Saving%20Private%20Ryan`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                ryan.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(ryan);

            const schindler = {
                "id": "schindlers-list",
                "title": "Schindler's List",
                "year": 1993,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast, documentary-style black-and-white.",
                "plot": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
                "releaseDate": "1993-12-15",
                "writer": "Steven Zaillian",
                "cinematographer": "Janusz Kamiński",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "Universal Pictures / Amblin Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Schindler's%20List`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                schindler.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(schindler);

            const minority = {
                "id": "minority-report",
                "title": "Minority Report",
                "year": 2002,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Bleach bypass aesthetic creating a cool, harsh sci-fi bloom.",
                "plot": "In a future where a special police unit is able to arrest murderers before they commit their crimes, an officer from that unit is himself accused of a future murder.",
                "releaseDate": "2002-06-21",
                "writer": "Scott Frank, Jon Cohen",
                "cinematographer": "Janusz Kamiński",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "20th Century Fox / DreamWorks Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Minority%20Report`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                minority.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(minority);

            const war = {
                "id": "war-of-the-worlds",
                "title": "War of the Worlds",
                "year": 2005,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, desaturated realism and blown-out highlights.",
                "plot": "As Earth is invaded by alien tripod fighting machines, one family fights for survival in this sci-fi action epic.",
                "releaseDate": "2005-06-29",
                "writer": "Josh Friedman, David Koepp",
                "cinematographer": "Janusz Kamiński",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "Paramount Pictures / DreamWorks Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=War%20of%20the%20Worlds&year=2005`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                war.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(war);

            const west = {
                "id": "west-side-story",
                "title": "West Side Story",
                "year": 2021,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, dynamic, intensely blooming cinematic musical lighting.",
                "plot": "An adaptation of the 1957 musical, exploring forbidden love and the rivalry between the Jets and the Sharks, two teenage street gangs of different ethnic backgrounds.",
                "releaseDate": "2021-12-10",
                "writer": "Tony Kushner",
                "cinematographer": "Janusz Kamiński",
                "editor": "Michael Kahn, Sarah Broshar",
                "composer": "Leonard Bernstein, David Newman",
                "studio": "20th Century Studios / Amblin Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=West%20Side%20Story&year=2021`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                west.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(west);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Janusz Kaminski.");
    } else {
        console.log("Could not find Janusz Kaminski in database.");
    }
}

run();
