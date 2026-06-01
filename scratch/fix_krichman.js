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
        if (p.id === 'mikhail-krichman') {
            // Replace existing movies
            p.mustWatch = [];
            
            const returnMovie = {
                "id": "the-return",
                "title": "The Return",
                "year": 2003,
                "director": "Andrey Zvyagintsev",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, haunting compositions of vast Russian landscapes.",
                "plot": "Two boys, whose father has been absent for 12 years, are suddenly reunited with him. They embark on a tense, mysterious road trip that turns into a profound and challenging test of manhood.",
                "releaseDate": "2003-10-16",
                "writer": "Vladimir Moiseenko, Aleksandr Novototsky-Vlasov",
                "cinematographer": "Mikhail Krichman",
                "editor": "Elena Slonetskaya",
                "composer": "Andrey Dergachev",
                "studio": "Ren Film"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Return&year=2003`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                returnMovie.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(returnMovie);

            const leviathan = {
                "id": "leviathan",
                "title": "Leviathan",
                "year": 2014,
                "director": "Andrey Zvyagintsev",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cold, sweeping, and allegorical visual storytelling.",
                "plot": "In a Russian coastal town, a man battles a corrupt mayor who is determined to take away his house, leading to a tragic, bureaucratic, and spiritual unraveling.",
                "releaseDate": "2015-02-05",
                "writer": "Oleg Negin, Andrey Zvyagintsev",
                "cinematographer": "Mikhail Krichman",
                "editor": "Anna Mass",
                "composer": "Philip Glass",
                "studio": "Non-Stop Production"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Leviathan&year=2014`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                leviathan.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(leviathan);

            const loveless = {
                "id": "loveless",
                "title": "Loveless",
                "year": 2017,
                "director": "Andrey Zvyagintsev",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rigid, frigid, and emotionally chilling cinematography.",
                "plot": "An estranged couple going through a bitter divorce must join forces to find their young son, who mysteriously disappears during one of their brutal arguments.",
                "releaseDate": "2017-06-01",
                "writer": "Oleg Negin, Andrey Zvyagintsev",
                "cinematographer": "Mikhail Krichman",
                "editor": "Anna Mass",
                "composer": "Evgueni Galperine, Sacha Galperine",
                "studio": "Non-Stop Production, Fetisoff Illusion"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Loveless&year=2017`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                loveless.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(loveless);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Mikhail Krichman.");
    }
}

run();
