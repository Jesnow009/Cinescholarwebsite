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
        if (p.id === 'reed-morano' || p.name === 'Reed Morano') {
            p.mustWatch = [];
            
            const handmaid = {
                "id": "the-handmaids-tale",
                "title": "The Handmaid's Tale (Pilot)",
                "year": 2017,
                "director": "Reed Morano",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Oppressive, rigid framing emphasizing Gilead's theological fascism.",
                "plot": "Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.",
                "releaseDate": "2017-04-26",
                "writer": "Bruce Miller",
                "cinematographer": "Colin Watkinson (Morano as Visual Architect)",
                "editor": "Julian Clarke",
                "composer": "Adam Taylor",
                "studio": "MGM Television / Hulu"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=The%20Handmaid's%20Tale`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                handmaid.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(handmaid);

            const kill = {
                "id": "kill-your-darlings",
                "title": "Kill Your Darlings",
                "year": 2013,
                "director": "John Krokidas",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dark, moody, jazz-infused period cinematography.",
                "plot": "A murder in 1944 draws together the great poets of the beat generation: Allen Ginsberg, Jack Kerouac and William Burroughs.",
                "releaseDate": "2013-10-16",
                "writer": "John Krokidas, Austin Bunn",
                "cinematographer": "Reed Morano",
                "editor": "Jacob Craycroft",
                "composer": "Nico Muhly",
                "studio": "Killer Films / Sony Pictures Classics"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Kill%20Your%20Darlings`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                kill.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(kill);

            const meadowland = {
                "id": "meadowland",
                "title": "Meadowland",
                "year": 2015,
                "director": "Reed Morano",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, devastating handheld camerawork navigating grief.",
                "plot": "A couple deals with their son's disappearance in an emotionally gripping narrative.",
                "releaseDate": "2015-10-16",
                "writer": "Chris Rossi",
                "cinematographer": "Reed Morano",
                "editor": "Madeleine Gavin",
                "composer": "Adam Taylor",
                "studio": "Bron Studios / Cinedigm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Meadowland`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                meadowland.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(meadowland);

            const frozen = {
                "id": "frozen-river",
                "title": "Frozen River",
                "year": 2008,
                "director": "Courtney Hunt",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Bleak, unvarnished winter verité realism.",
                "plot": "Takes place in the days before Christmas near a little-known border crossing on the Mohawk reservation between New York State and Quebec.",
                "releaseDate": "2008-08-01",
                "writer": "Courtney Hunt",
                "cinematographer": "Reed Morano",
                "editor": "Kate Williams",
                "composer": "Peter Golub",
                "studio": "Harwood Hunt Productions / Sony Pictures Classics"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Frozen%20River`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                frozen.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(frozen);

            const rhythm = {
                "id": "the-rhythm-section",
                "title": "The Rhythm Section",
                "year": 2020,
                "director": "Reed Morano",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, grounded, large-scale subjective action photography.",
                "plot": "A woman seeks revenge against those who orchestrated a plane crash that killed her family.",
                "releaseDate": "2020-01-31",
                "writer": "Mark Burnell",
                "cinematographer": "Sean Bobbitt (Directed by Reed Morano)",
                "editor": "Joan Sobel",
                "composer": "Steve Mazzaro",
                "studio": "Eon Productions / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Rhythm%20Section`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                rhythm.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(rhythm);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Reed Morano.");
    }
}

run();
