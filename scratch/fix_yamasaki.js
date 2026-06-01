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
        if (p.id === 'yutaka-yamasaki' || p.name === 'Yutaka Yamasaki') {
            // Replace existing movies
            p.mustWatch = [];
            
            const afterlife = {
                "id": "after-life",
                "title": "After Life",
                "year": 1998,
                "director": "Hirokazu Kore-eda",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, naturalistic, documentary-style empathy.",
                "plot": "After people die, they spend a week with counselors, also dead, who help them pick one memory, the only memory they can take to eternity.",
                "releaseDate": "1998-09-11",
                "writer": "Hirokazu Kore-eda",
                "cinematographer": "Yutaka Yamasaki",
                "editor": "Hirokazu Kore-eda",
                "composer": "Yasuhiro Kasamatsu",
                "studio": "TV Man Union, Engine Film"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=After%20Life&year=1998`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                afterlife.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(afterlife);

            const nobody = {
                "id": "nobody-knows",
                "title": "Nobody Knows",
                "year": 2004,
                "director": "Hirokazu Kore-eda",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Unobtrusive, intimate observation of childhood isolation.",
                "plot": "Four siblings live happily with their mother in a small apartment in Tokyo. However, after their mother leaves them alone, the children must survive on their own.",
                "releaseDate": "2004-05-13",
                "writer": "Hirokazu Kore-eda",
                "cinematographer": "Yutaka Yamasaki",
                "editor": "Hirokazu Kore-eda",
                "composer": "Gontiti",
                "studio": "Cinequanon, Bandai Visual, Engine Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Nobody%20Knows&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                nobody.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(nobody);

            const still = {
                "id": "still-walking",
                "title": "Still Walking",
                "year": 2008,
                "director": "Hirokazu Kore-eda",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gentle, static framing of domestic spaces and unspoken tension.",
                "plot": "A family gathers for a commemorative ritual, where old resentments and unspoken secrets gently bubble to the surface over a summer weekend.",
                "releaseDate": "2008-06-28",
                "writer": "Hirokazu Kore-eda",
                "cinematographer": "Yutaka Yamasaki",
                "editor": "Hirokazu Kore-eda",
                "composer": "Gontiti",
                "studio": "Cinequanon, Bandai Visual, TV Man Union"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Still%20Walking&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                still.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(still);

            const great = {
                "id": "great-absence",
                "title": "Great Absence",
                "year": 2023,
                "director": "Kei Chika-ura",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Evocative, moody, and deeply empathetic portraiture.",
                "plot": "Takashi reunites with his estranged father Yohji, whose memory is fading from dementia, prompting him to piece together his father's mysterious late-in-life romance and second marriage.",
                "releaseDate": "2023-09-09",
                "writer": "Kei Chika-ura, Keiko Niwa",
                "cinematographer": "Yutaka Yamasaki",
                "editor": "Kei Chika-ura",
                "composer": "Keiichiro Shibuya",
                "studio": "Creatps Inc."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Great%20Absence`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                great.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(great);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Yutaka Yamasaki.");
    }
}

run();
