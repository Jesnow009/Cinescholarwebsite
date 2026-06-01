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
        if (p.id === 'sergei-urusevsky' || p.name === 'Sergei Urusevsky') {
            p.mustWatch = [];
            
            const cranes = {
                "id": "the-cranes-are-flying",
                "title": "The Cranes Are Flying",
                "year": 1957,
                "director": "Mikhail Kalatozov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dizzying, deeply emotional handheld camera work.",
                "plot": "A young couple's romance is brutally interrupted by the outbreak of World War II, leading to a heartbreaking journey of survival, loss, and unyielding hope.",
                "releaseDate": "1957-10-12",
                "writer": "Viktor Rozov",
                "cinematographer": "Sergei Urusevsky",
                "editor": "Mariya Timofeyeva",
                "composer": "Moisei Vainberg",
                "studio": "Mosfilm"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Cranes%20Are%20Flying`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                cranes.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(cranes);

            const cuba = {
                "id": "i-am-cuba",
                "title": "I Am Cuba",
                "year": 1964,
                "director": "Mikhail Kalatozov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Astonishing, gravity-defying long takes.",
                "plot": "Four vignettes exploring the stark inequalities and growing revolutionary fervor in Cuba just prior to the communist revolution.",
                "releaseDate": "1964-11-02",
                "writer": "Enrique Pineda Barnet, Yevgeny Yevtushenko",
                "cinematographer": "Sergei Urusevsky",
                "editor": "Nina Glagoleva",
                "composer": "Carlos Fariñas",
                "studio": "Mosfilm / ICAIC"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=I%20Am%20Cuba`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                cuba.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(cuba);

            const letter = {
                "id": "letter-never-sent",
                "title": "Letter Never Sent",
                "year": 1960,
                "director": "Mikhail Kalatozov",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Visceral, elemental survival photography against nature.",
                "plot": "Four geologists searching for diamonds in the remote Siberian taiga find themselves trapped by a massive forest fire and the onset of a brutal winter.",
                "releaseDate": "1960-06-27",
                "writer": "Grigori Kozyntsev, Viktor Rozov, Valeri Osipov",
                "cinematographer": "Sergei Urusevsky",
                "editor": "Mariya Timofeyeva",
                "composer": "Nikolai Kryukov",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Letter%20Never%20Sent`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                letter.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(letter);

            const forty = {
                "id": "the-forty-first",
                "title": "The Forty-First",
                "year": 1956,
                "director": "Grigori Chukhrai",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant early Soviet color cinematography and sweeping deserts.",
                "plot": "During the Russian Civil War, a female Red Army sniper falls in love with her prisoner, an aristocratic White Army officer, while stranded on a desert island.",
                "releaseDate": "1956-10-15",
                "writer": "Grigori Koltunov",
                "cinematographer": "Sergei Urusevsky",
                "editor": "Mariya Timofeyeva",
                "composer": "Nikolai Kryukov",
                "studio": "Mosfilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Forty-First`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                forty.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(forty);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Sergei Urusevsky.");
    }
}

run();
