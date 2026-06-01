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
        if (p.id === 'ryuto-kondo') {
            // Remove Broker
            p.mustWatch = p.mustWatch.filter(m => m.title !== 'Broker');
            
            // Add A Story of Yonosuke
            const yonosuke = {
                "id": "a-story-of-yonosuke",
                "title": "A Story of Yonosuke",
                "year": 2013,
                "director": "Shuichi Okita",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, nostalgic, and subtly evocative framing.",
                "plot": "A coming-of-age story following the life of Yonosuke, an earnest and good-natured college student from a small port town who moves to Tokyo in the late 1980s.",
                "releaseDate": "2013-02-23",
                "writer": "Shuichi Okita, Shiro Maeda",
                "cinematographer": "Ryuto Kondo",
                "editor": "Takashi Sato",
                "composer": "Takashi Aoki",
                "studio": "T-Joy, Kirin Enterprises"
            };
            
            const sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Story%20of%20Yonosuke`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                yonosuke.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(yonosuke);
            modified = true;
        }

        if (p.id === 'shinsaku-himeda') {
            // Replace existing movies
            p.mustWatch = [];
            
            const intentions = {
                "id": "intentions-of-murder",
                "title": "Intentions of Murder",
                "year": 1964,
                "director": "Shohei Imamura",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, suffocating compositions reflecting psychological entrapment.",
                "plot": "A lower-class housewife, trapped in an unhappy marriage, is assaulted by a burglar who subsequently becomes obsessed with her, forcing her to make desperate choices to survive.",
                "releaseDate": "1964-06-28",
                "writer": "Shohei Imamura, Keiji Hasebe",
                "cinematographer": "Shinsaku Himeda",
                "editor": "Mutsuo Tanji",
                "composer": "Toshiro Mayuzumi",
                "studio": "Nikkatsu"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Intentions%20of%20Murder`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                intentions.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(intentions);

            const vengeance = {
                "id": "vengeance-is-mine",
                "title": "Vengeance Is Mine",
                "year": 1979,
                "director": "Shohei Imamura",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Documentary-like realism, cold and detached observation.",
                "plot": "Based on the true story of Akira Nishiguchi, the film follows a remorseless serial killer and fraudster as he evades the police and continues his nationwide crime spree across Japan.",
                "releaseDate": "1979-04-21",
                "writer": "Masaru Baba",
                "cinematographer": "Shinsaku Himeda",
                "editor": "Keiichi Uraoka",
                "composer": "Shinichiro Ikebe",
                "studio": "Shochiku, Imamura Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Vengeance%20Is%20Mine&year=1979`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                vengeance.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(vengeance);

            const tora = {
                "id": "tora-tora-tora",
                "title": "Tora! Tora! Tora!",
                "year": 1970,
                "director": "Richard Fleischer, Toshio Masuda, Kinji Fukasaku",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expansive, Oscar-nominated historical battle cinematography.",
                "plot": "A meticulously detailed historical account of the Japanese attack on Pearl Harbor, told from both the American and Japanese perspectives.",
                "releaseDate": "1970-09-23",
                "writer": "Larry Forrester, Hideo Oguni, Ryuzo Kikushima",
                "cinematographer": "Shinsaku Himeda, Charles F. Wheeler, Masamichi Satoh, Osamu Furuya",
                "editor": "James E. Newcom, Pembroke J. Herring, Inoue Chikaya",
                "composer": "Jerry Goldsmith",
                "studio": "20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Tora!%20Tora!%20Tora!`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                tora.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(tora);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Japanese Cinematographers.");
    }
}

run();
