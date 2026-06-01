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
        if (p.id === 'tak-fujimoto' || p.name === 'Tak Fujimoto') {
            p.mustWatch = [];
            
            const silence = {
                "id": "the-silence-of-the-lambs",
                "title": "The Silence of the Lambs",
                "year": 1991,
                "director": "Jonathan Demme",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Claustrophobic, subjective subjective close-ups creating intense psychological intimacy.",
                "plot": "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
                "releaseDate": "1991-02-14",
                "writer": "Ted Tally",
                "cinematographer": "Tak Fujimoto",
                "editor": "Craig McKay",
                "composer": "Howard Shore",
                "studio": "Orion Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Silence%20of%20the%20Lambs`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                silence.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(silence);

            const sixth = {
                "id": "the-sixth-sense",
                "title": "The Sixth Sense",
                "year": 1999,
                "director": "M. Night Shyamalan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cool, ghostly palettes and deliberate, unsettling camera restraint.",
                "plot": "A frightened, withdrawn Philadelphia boy who communicates with spirits seeks the help of a disheartened child psychologist.",
                "releaseDate": "1999-08-06",
                "writer": "M. Night Shyamalan",
                "cinematographer": "Tak Fujimoto",
                "editor": "Andrew Mondshein",
                "composer": "James Newton Howard",
                "studio": "Hollywood Pictures / Spyglass Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Sixth%20Sense`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                sixth.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(sixth);

            const devil = {
                "id": "devil-in-a-blue-dress",
                "title": "Devil in a Blue Dress",
                "year": 1995,
                "director": "Carl Franklin",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rich, saturated neo-noir evoking 1940s Los Angeles.",
                "plot": "An African-American World War II veteran in need of money is hired to find a mysterious missing woman, plunging him into a murderous political scandal.",
                "releaseDate": "1995-09-29",
                "writer": "Carl Franklin",
                "cinematographer": "Tak Fujimoto",
                "editor": "Carole Kravetz",
                "composer": "Elmer Bernstein",
                "studio": "TriStar Pictures / Clinica Estetico"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Devil%20in%20a%20Blue%20Dress`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                devil.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(devil);

            const ferris = {
                "id": "ferris-buellers-day-off",
                "title": "Ferris Bueller's Day Off",
                "year": 1986,
                "director": "John Hughes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Bright, buoyant, and energetic suburban realism.",
                "plot": "A high school wise guy is determined to have a day off from school, despite what the Principal thinks of that.",
                "releaseDate": "1986-06-11",
                "writer": "John Hughes",
                "cinematographer": "Tak Fujimoto",
                "editor": "Paul Hirsch",
                "composer": "Ira Newborn",
                "studio": "Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ferris%20Bueller's%20Day%20Off`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                ferris.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(ferris);

            const philadelphia = {
                "id": "philadelphia",
                "title": "Philadelphia",
                "year": 1993,
                "director": "Jonathan Demme",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Empathetic, unvarnished portraiture tracking physical decline.",
                "plot": "When a man with HIV is fired by his law firm because of his condition, he hires a homophobic small time lawyer as the only willing advocate for a wrongful dismissal suit.",
                "releaseDate": "1993-12-22",
                "writer": "Ron Nyswaner",
                "cinematographer": "Tak Fujimoto",
                "editor": "Craig McKay",
                "composer": "Howard Shore",
                "studio": "TriStar Pictures / Clinica Estetico"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Philadelphia&year=1993`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                philadelphia.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(philadelphia);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Tak Fujimoto.");
    } else {
        console.log("Could not find Tak Fujimoto in database.");
    }
}

run();
