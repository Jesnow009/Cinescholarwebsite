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
        if (p.id === 'freddie-young' || p.name === 'Freddie Young') {
            p.mustWatch = [];
            
            const lawrence = {
                "id": "lawrence-of-arabia",
                "title": "Lawrence of Arabia",
                "year": 1962,
                "director": "David Lean",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweeping, majestic 70mm Super Panavision capturing the vast desert scale.",
                "plot": "The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.",
                "releaseDate": "1962-12-10",
                "writer": "Robert Bolt, Michael Wilson",
                "cinematographer": "Freddie Young",
                "editor": "Anne V. Coates",
                "composer": "Maurice Jarre",
                "studio": "Horizon Pictures / Columbia Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Lawrence%20of%20Arabia`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                lawrence.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(lawrence);

            const zhivago = {
                "id": "doctor-zhivago",
                "title": "Doctor Zhivago",
                "year": 1965,
                "director": "David Lean",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, romantic, and tragic epic scope across frozen Russian landscapes.",
                "plot": "The life of a Russian physician and poet who, although married to another, falls in love with a political activist's wife and experiences hardship during World War I and then the October Revolution.",
                "releaseDate": "1965-12-22",
                "writer": "Robert Bolt",
                "cinematographer": "Freddie Young",
                "editor": "Norman Savage",
                "composer": "Maurice Jarre",
                "studio": "Metro-Goldwyn-Mayer"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Doctor%20Zhivago&year=1965`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                zhivago.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(zhivago);

            const ryan = {
                "id": "ryans-daughter",
                "title": "Ryan's Daughter",
                "year": 1970,
                "director": "David Lean",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Incredible storm photography and lush, atmospheric 65mm landscapes.",
                "plot": "In the wake of the 1916 Easter Rising, a married woman in a small Irish village has an affair with a troubled British commander, which puts her at odds with her nationalist neighbors.",
                "releaseDate": "1970-11-09",
                "writer": "Robert Bolt",
                "cinematographer": "Freddie Young",
                "editor": "Norman Savage",
                "composer": "Maurice Jarre",
                "studio": "Metro-Goldwyn-Mayer"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ryan's%20Daughter`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                ryan.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(ryan);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Freddie Young.");
    } else {
        console.log("Could not find Freddie Young in database.");
    }
}

run();
