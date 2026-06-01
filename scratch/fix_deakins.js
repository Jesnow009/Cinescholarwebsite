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
        if (p.id === 'roger-deakins' || p.name === 'Roger Deakins') {
            p.mustWatch = [];
            
            const blade = {
                "id": "blade-runner-2049",
                "title": "Blade Runner 2049",
                "year": 2017,
                "director": "Denis Villeneuve",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stunning neon-drenched sci-fi noir and oppressive atmosphere.",
                "plot": "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
                "releaseDate": "2017-10-06",
                "writer": "Hampton Fancher, Michael Green",
                "cinematographer": "Roger Deakins",
                "editor": "Joe Walker",
                "composer": "Hans Zimmer, Benjamin Wallfisch",
                "studio": "Warner Bros., Alcon Entertainment"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Blade%20Runner%202049`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                blade.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(blade);

            const jesse = {
                "id": "assassination-jesse-james",
                "title": "The Assassination of Jesse James by the Coward Robert Ford",
                "year": 2007,
                "director": "Andrew Dominik",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lyrical, painterly light and shadowy silhouettes.",
                "plot": "Robert Ford, who's idolized Jesse James since childhood, tries hard to join the reforming gang of the Missouri outlaw, but gradually becomes resentful of the bandit leader.",
                "releaseDate": "2007-09-21",
                "writer": "Andrew Dominik",
                "cinematographer": "Roger Deakins",
                "editor": "Curtiss Clayton, Dylan Tichenor",
                "composer": "Nick Cave, Warren Ellis",
                "studio": "Warner Bros., Scott Free Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Assassination%20of%20Jesse%20James`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                jesse.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(jesse);

            const nocountry = {
                "id": "no-country-for-old-men",
                "title": "No Country for Old Men",
                "year": 2007,
                "director": "Joel & Ethan Coen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, unromanticized, and tense desert realism.",
                "plot": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
                "releaseDate": "2007-11-09",
                "writer": "Joel & Ethan Coen",
                "cinematographer": "Roger Deakins",
                "editor": "Roderick Jaynes",
                "composer": "Carter Burwell",
                "studio": "Miramax, Paramount Vantage"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=No%20Country%20for%20Old%20Men`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                nocountry.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(nocountry);

            const shawshank = {
                "id": "shawshank-redemption",
                "title": "The Shawshank Redemption",
                "year": 1994,
                "director": "Frank Darabont",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Subtle, narrative-driven lighting contrasting confinement and freedom.",
                "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "releaseDate": "1994-09-23",
                "writer": "Frank Darabont",
                "cinematographer": "Roger Deakins",
                "editor": "Richard Francis-Bruce",
                "composer": "Thomas Newman",
                "studio": "Castle Rock Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Shawshank%20Redemption`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                shawshank.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(shawshank);

            const skyfall = {
                "id": "skyfall",
                "title": "Skyfall",
                "year": 2012,
                "director": "Sam Mendes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sleek, highly stylized, and color-coded action cinematography.",
                "plot": "James Bond's loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat.",
                "releaseDate": "2012-11-09",
                "writer": "Neal Purvis, Robert Wade, John Logan",
                "cinematographer": "Roger Deakins",
                "editor": "Stuart Baird",
                "composer": "Thomas Newman",
                "studio": "Eon Productions, MGM"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Skyfall`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                skyfall.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(skyfall);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Roger Deakins.");
    }
}

run();
