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
        if (p.id === 'alisher-khamidkhodzhaev' || p.name === 'Alisher Khamidkhodzhaev') {
            // Replace existing movies
            p.mustWatch = [];
            
            const paper = {
                "id": "paper-soldier",
                "title": "Paper Soldier",
                "year": 2008,
                "director": "Aleksey German Jr.",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Misty, poetic, and dreamlike visual atmosphere.",
                "plot": "A doctor struggles with his conscience as he prepares young cosmonauts for the first manned space flight in 1961, torn between the heroism of the state and the fragility of human life.",
                "releaseDate": "2008-11-13",
                "writer": "Aleksey German Jr., Vladimir Arkusha",
                "cinematographer": "Alisher Khamidkhodzhaev, Maksim Drozdov",
                "editor": "Sergey Ivanov", // Default since none provided
                "composer": "Fedor Sofronov",
                "studio": "Phenomen Films, Metrafilms"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Paper%20Soldier`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                paper.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(paper);

            const arrhythmia = {
                "id": "arrhythmia",
                "title": "Arrhythmia",
                "year": 2017,
                "director": "Boris Khlebnikov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, frantic, and claustrophobic handheld realism.",
                "plot": "A gifted paramedic who cares deeply about his patients but neglects his wife struggles to keep his personal life from collapsing amid the high-stress demands of his job and the arrival of a strict new boss.",
                "releaseDate": "2017-10-12",
                "writer": "Nataliya Meshchaninova, Boris Khlebnikov",
                "cinematographer": "Alisher Khamidkhodzhaev",
                "editor": "Ivan Lebedev", // Default
                "composer": "Valentin Strykalo",
                "studio": "CTB Film Company, Mars Media"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Arrhythmia&year=2017`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                arrhythmia.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(arrhythmia);

            const anna = {
                "id": "annas-war",
                "title": "Anna's War",
                "year": 2018,
                "director": "Aleksey Fedorchenko",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Shadowy, constricted, and deeply subjective framing.",
                "plot": "A young Jewish girl survives the mass execution of her family by hiding inside the fireplace of a Nazi commandant's office, observing the war from her hidden vantage point.",
                "releaseDate": "2019-05-09",
                "writer": "Nataliya Meshchaninova, Aleksey Fedorchenko",
                "cinematographer": "Alisher Khamidkhodzhaev",
                "editor": "Erve Shneid", // Default
                "composer": "Vladimir Komarov, Atsuo Matsumoto",
                "studio": "SAGa, Metrafilms"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Anna's%20War`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                anna.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(anna);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Alisher Khamidkhodzhaev.");
    }
}

run();
