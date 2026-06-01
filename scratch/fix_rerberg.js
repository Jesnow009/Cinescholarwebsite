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
        if (p.id === 'georgi-rerberg' || p.name === 'Georgi Rerberg') {
            p.mustWatch = [];
            
            const mirror = {
                "id": "mirror",
                "title": "Mirror",
                "year": 1975,
                "director": "Andrei Tarkovsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Slow tracking shots, mixed media formats, and lighting for 'dampness'.",
                "plot": "A dying man reflects upon his life, weaving together memories of his childhood, his mother, the Spanish Civil War, and the harsh realities of Soviet history into a nonlinear dreamscape.",
                "releaseDate": "1975-04-01", // Approximate since exact day was April 1975
                "writer": "Aleksandr Misharin, Andrei Tarkovsky",
                "cinematographer": "Georgi Rerberg",
                "editor": "Lyudmila Feiginova",
                "composer": "Eduard Artemyev",
                "studio": "Mosfilm"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mirror&year=1975`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                mirror.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(mirror);

            const teacher = {
                "id": "the-first-teacher",
                "title": "The First Teacher",
                "year": 1965,
                "director": "Andrei Konchalovsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark black-and-white framing, emphasizing rugged rural landscapes.",
                "plot": "A fervent young Red Army soldier attempts to bring Soviet education and revolutionary ideals to a remote, traditional Kyrgyz village, facing fierce resistance from local customs.",
                "releaseDate": "1965-08-01",
                "writer": "Chingiz Aitmatov, Boris Dobrodeyev",
                "cinematographer": "Georgi Rerberg",
                "editor": "Eva Ladyzhenskaya",
                "composer": "Vyacheslav Ovchinnikov",
                "studio": "Mosfilm / Kirghizfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20First%20Teacher&year=1965`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                teacher.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(teacher);

            const vanya = {
                "id": "uncle-vanya",
                "title": "Uncle Vanya",
                "year": 1970,
                "director": "Andrei Konchalovsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Subdued, claustrophobic lighting reflecting internal stagnation.",
                "plot": "The quiet, melancholic life of an aging estate manager is thrown into turmoil when his haughty brother-in-law returns with a beautiful, young new wife.",
                "releaseDate": "1971-09-01",
                "writer": "Andrei Konchalovsky",
                "cinematographer": "Georgi Rerberg, Yevgeni Guslinsky",
                "editor": "L. Pokrovskaya, Lyudmila Rayeva",
                "composer": "Alfred Schnittke",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Uncle%20Vanya&year=1970`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                vanya.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(vanya);

            const sergius = {
                "id": "father-sergius",
                "title": "Father Sergius",
                "year": 1978,
                "director": "Igor Talankin",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Chiaroscuro lighting emphasizing spiritual isolation.",
                "plot": "A brilliant, ambitious Prince abruptly breaks off his engagement and abandons high society to become an ascetic monk, but struggles to completely rid himself of earthly temptations.",
                "releaseDate": "1978-10-01",
                "writer": "Igor Talankin",
                "cinematographer": "Georgi Rerberg, Anatoli Nikolayev",
                "editor": "Zoya Veryovkina",
                "composer": "Alfred Schnittke",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Father%20Sergius&year=1978`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                sergius.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(sergius);

            const asya = {
                "id": "the-story-of-asya-klyachina",
                "title": "The Story of Asya Klyachina",
                "year": 1966,
                "director": "Andrei Konchalovsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Documentary-like, unfiltered realism using non-actors.",
                "plot": "A deeply realistic portrayal of life on a Soviet collective farm, focusing on a lame but fiercely independent pregnant woman who refuses to marry the father of her child.",
                "releaseDate": "1987-01-01",
                "writer": "Yuri Klepikov",
                "cinematographer": "Georgi Rerberg",
                "editor": "L. Pokrovskaya",
                "composer": "Diegetic Sound",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Story%20of%20Asya%20Klyachina`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                asya.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(asya);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Georgi Rerberg.");
    }
}

run();
