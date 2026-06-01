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
        if (p.id === 'eduard-tisse' || p.name === 'Eduard Tisse') {
            // Replace existing movies
            p.mustWatch = [];
            
            const strike = {
                "id": "strike",
                "title": "Strike",
                "year": 1925,
                "director": "Sergei Eisenstein",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dynamic, aggressive montage and visual metaphors.",
                "plot": "A vivid and brutal depiction of a factory workers' strike in pre-revolutionary Russia, famously intercut with the slaughter of a bull to symbolize the massacre of the workers.",
                "releaseDate": "1925-04-28",
                "writer": "Grigori Aleksandrov, Sergei Eisenstein, Ilya Kravchunovsky, Valeryan Pletnev",
                "cinematographer": "Eduard Tisse",
                "editor": "Sergei Eisenstein", // default
                "composer": "Unknown", // default
                "studio": "Goskino (1st Factory) / Mosfilm"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Strike&year=1925`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                strike.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(strike);

            const potemkin = {
                "id": "battleship-potemkin",
                "title": "Battleship Potemkin",
                "year": 1925,
                "director": "Sergei Eisenstein",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Revolutionary montage, geometric composition, and kinetic camera movement.",
                "plot": "A dramatized account of a great Russian naval mutiny and a resulting street demonstration which brought on a police massacre.",
                "releaseDate": "1925-12-21",
                "writer": "Nina Agadzhanova",
                "cinematographer": "Eduard Tisse",
                "editor": "Sergei Eisenstein", // default
                "composer": "Edmund Meisel, Dmitri Shostakovich",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Battleship%20Potemkin`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                potemkin.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(potemkin);

            const october = {
                "id": "october-ten-days",
                "title": "October: Ten Days That Shook the World",
                "year": 1928,
                "director": "Sergei Eisenstein, Grigori Aleksandrov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intellectual montage, crowds as the hero, and striking low-angle portraiture.",
                "plot": "A dramatized reenactment of the 1917 October Revolution in Russia, emphasizing the collective power of the masses over individual heroism.",
                "releaseDate": "1928-01-20",
                "writer": "Sergei Eisenstein, Grigori Aleksandrov",
                "cinematographer": "Eduard Tisse",
                "editor": "Sergei Eisenstein", // default
                "composer": "Edmund Meisel", // default
                "studio": "Sovkino"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=October:%20Ten%20Days%20That%20Shook%20the%20World`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                october.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(october);

            const general = {
                "id": "the-general-line",
                "title": "The General Line",
                "year": 1929,
                "director": "Sergei Eisenstein, Grigori Aleksandrov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sensory, rhythmic montage celebrating agricultural machinery.",
                "plot": "A cinematic celebration of the collectivization of agriculture in the Soviet Union, focusing on the introduction of modern machinery to traditional farming communities.",
                "releaseDate": "1929-11-07",
                "writer": "Sergei Eisenstein, Grigori Aleksandrov",
                "cinematographer": "Eduard Tisse",
                "editor": "Sergei Eisenstein", // default
                "composer": "Unknown", // default
                "studio": "Sovkino"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20General%20Line`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                general.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(general);

            const immortal = {
                "id": "the-immortal-garrison",
                "title": "The Immortal Garrison",
                "year": 1956,
                "director": "Eduard Tisse, Zakhar Agranenko",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, heroic, and tragic depictions of wartime siege.",
                "plot": "A heroic drama depicting the brave defense of the Brest Fortress against invading Nazi forces during the opening days of the Great Patriotic War.",
                "releaseDate": "1956-06-21",
                "writer": "Konstantin Simonov",
                "cinematographer": "Eduard Tisse, Grigori Ayzenberg",
                "editor": "Unknown", // default
                "composer": "Veniamin Basner",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Immortal%20Garrison`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                immortal.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(immortal);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Eduard Tisse.");
    }
}

run();
