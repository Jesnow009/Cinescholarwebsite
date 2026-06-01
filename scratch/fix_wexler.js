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
        if (p.id === 'haskell-wexler' || p.name === 'Haskell Wexler') {
            p.mustWatch = [];
            
            const virginia = {
                "id": "whos-afraid-of-virginia-woolf",
                "title": "Who's Afraid of Virginia Woolf?",
                "year": 1966,
                "director": "Mike Nichols",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Harsh, unglamorous, high-contrast black and white.",
                "plot": "A bitter, aging couple, with the help of alcohol, use a young couple to fuel anguish and emotional pain towards each other over the course of a distressing night.",
                "releaseDate": "1966-06-22",
                "writer": "Ernest Lehman",
                "cinematographer": "Haskell Wexler",
                "editor": "Sam O'Steen",
                "composer": "Alex North",
                "studio": "Warner Bros."
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Who's%20Afraid%20of%20Virginia%20Woolf?`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                virginia.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(virginia);

            const glory = {
                "id": "bound-for-glory",
                "title": "Bound for Glory",
                "year": 1976,
                "director": "Hal Ashby",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering Steadicam use and dusty, golden-hour Americana.",
                "plot": "The early life of Woody Guthrie as a vagabond folk singer.",
                "releaseDate": "1976-12-05",
                "writer": "Robert Getchell",
                "cinematographer": "Haskell Wexler",
                "editor": "Robert C. Jones, Pembroke J. Herring",
                "composer": "Leonard Rosenman",
                "studio": "United Artists"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Bound%20for%20Glory`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                glory.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(glory);

            const medium = {
                "id": "medium-cool",
                "title": "Medium Cool",
                "year": 1969,
                "director": "Haskell Wexler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Raw, documentary verité blurring the line between fiction and reality.",
                "plot": "A television news reporter finds himself becoming personally involved in the violence that erupts around the 1968 Democratic National Convention.",
                "releaseDate": "1969-08-27",
                "writer": "Haskell Wexler",
                "cinematographer": "Haskell Wexler",
                "editor": "Verna Fields",
                "composer": "Mike Bloomfield",
                "studio": "H&J Pictures / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Medium%20Cool`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                medium.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(medium);

            const heat = {
                "id": "in-the-heat-of-the-night",
                "title": "In the Heat of the Night",
                "year": 1967,
                "director": "Norman Jewison",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweat-drenched, high-contrast, racially pioneering lighting.",
                "plot": "A black police detective is asked to investigate a murder in a racially hostile southern town.",
                "releaseDate": "1967-08-02",
                "writer": "Stirling Silliphant",
                "cinematographer": "Haskell Wexler",
                "editor": "Hal Ashby",
                "composer": "Quincy Jones",
                "studio": "United Artists"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=In%20the%20Heat%20of%20the%20Night`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                heat.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(heat);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Haskell Wexler.");
    }
}

run();
