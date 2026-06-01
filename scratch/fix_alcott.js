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
        if (p.id === 'john-alcott' || p.name === 'John Alcott') {
            p.mustWatch = [];
            
            const barry = {
                "id": "barry-lyndon",
                "title": "Barry Lyndon",
                "year": 1975,
                "director": "Stanley Kubrick",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Groundbreaking use of ultra-fast NASA lenses to shoot by candlelight.",
                "plot": "An Irish rogue wins the heart of a rich widow and assumes her dead husband's aristocratic position in 18th-century England.",
                "releaseDate": "1975-12-18",
                "writer": "Stanley Kubrick",
                "cinematographer": "John Alcott",
                "editor": "Tony Lawson",
                "composer": "Leonard Rosenman",
                "studio": "Hawk Films / Peregrine Productions / Warner Bros."
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Barry%20Lyndon&year=1975`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                barry.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(barry);

            const shining = {
                "id": "the-shining",
                "title": "The Shining",
                "year": 1980,
                "director": "Stanley Kubrick",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering, fluid Steadicam tracking shots through expansive geometry.",
                "plot": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
                "releaseDate": "1980-05-23",
                "writer": "Stanley Kubrick, Diane Johnson",
                "cinematographer": "John Alcott",
                "editor": "Ray Lovejoy",
                "composer": "Wendy Carlos, Rachel Elkind",
                "studio": "Hawk Films / Peregrine Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Shining&year=1980`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                shining.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(shining);

            const orange = {
                "id": "a-clockwork-orange",
                "title": "A Clockwork Orange",
                "year": 1971,
                "director": "Stanley Kubrick",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cold, clinical wide-angles and stark, aggressive lighting.",
                "plot": "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
                "releaseDate": "1971-12-19",
                "writer": "Stanley Kubrick",
                "cinematographer": "John Alcott",
                "editor": "Bill Butler",
                "composer": "Wendy Carlos",
                "studio": "Hawk Films / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Clockwork%20Orange`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                orange.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(orange);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed John Alcott.");
    } else {
        console.log("Could not find John Alcott in database.");
    }
}

run();
