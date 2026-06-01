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
        if (p.id === 'ed-lachman' || p.name === 'Ed Lachman') {
            p.mustWatch = [];
            
            const carol = {
                "id": "carol",
                "title": "Carol",
                "year": 2015,
                "director": "Todd Haynes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Muted, grainy Super 16mm capturing suppressed 1950s longing.",
                "plot": "An aspiring photographer develops an intimate relationship with an older woman in 1950s New York.",
                "releaseDate": "2015-11-20",
                "writer": "Phyllis Nagy",
                "cinematographer": "Ed Lachman",
                "editor": "Affonso Gonçalves",
                "composer": "Carter Burwell",
                "studio": "Number 9 Films / Killer Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Carol&year=2015`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                carol.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(carol);

            const heaven = {
                "id": "far-from-heaven",
                "title": "Far from Heaven",
                "year": 2002,
                "director": "Todd Haynes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, artificial, Sirkian Technicolor homage.",
                "plot": "In 1950s Connecticut, a housewife faces a marital crisis and mounting racial tensions in the outside world.",
                "releaseDate": "2002-11-08",
                "writer": "Todd Haynes",
                "cinematographer": "Ed Lachman",
                "editor": "James Lyons",
                "composer": "Elmer Bernstein",
                "studio": "Vulcan Productions / Killer Films / Focus Features"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Far%20from%20Heaven`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                heaven.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(heaven);

            const conde = {
                "id": "el-conde",
                "title": "El Conde",
                "year": 2023,
                "director": "Pablo Larraín",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast digital black and white.",
                "plot": "Center upon Augusto Pinochet who is not dead but an aged vampire who, after living 250 years in this world, has decided to die once and for all.",
                "releaseDate": "2023-09-15",
                "writer": "Pablo Larraín, Guillermo Calderón",
                "cinematographer": "Ed Lachman",
                "editor": "Sofía Subercaseaux",
                "composer": "Various Classical",
                "studio": "Fabula"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=El%20Conde&year=2023`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                conde.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(conde);

            const virgin = {
                "id": "the-virgin-suicides",
                "title": "The Virgin Suicides",
                "year": 1999,
                "director": "Sofia Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dreamy, sun-drenched suburban melancholia.",
                "plot": "A group of male friends become obsessed with five mysterious sisters who are sheltered by their strict, religious parents in suburban Detroit in the mid 1970s.",
                "releaseDate": "2000-04-21",
                "writer": "Sofia Coppola",
                "cinematographer": "Ed Lachman",
                "editor": "James Lyons, Melissa Kent",
                "composer": "Air",
                "studio": "American Zoetrope / Muse Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Virgin%20Suicides`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                virgin.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(virgin);

            const kenpark = {
                "id": "ken-park",
                "title": "Ken Park",
                "year": 2002,
                "director": "Larry Clark, Ed Lachman",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, unvarnished, observational naturalism.",
                "plot": "A bleak portrait of several skateboarding teenagers and their dysfunctional parents in Visalia, California.",
                "releaseDate": "2002-08-31",
                "writer": "Harmony Korine",
                "cinematographer": "Ed Lachman",
                "editor": "Andrew Hafitz",
                "composer": "J Mascis",
                "studio": "Kasander Film Company / Cinepix"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ken%20Park`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                kenpark.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(kenpark);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Ed Lachman.");
    }
}

run();
