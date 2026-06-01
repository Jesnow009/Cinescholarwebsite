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
        if (p.id === 'roger-pratt' || p.name === 'Roger Pratt') {
            p.mustWatch = [];
            
            const brazil = {
                "id": "brazil",
                "title": "Brazil",
                "year": 1985,
                "director": "Terry Gilliam",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dystopian, hyper-stylized retro-futurism and wide-angle distortion.",
                "plot": "A low-level bureaucrat in a retro-future world tries to correct an administrative error and becomes an enemy of the state.",
                "releaseDate": "1985-02-20",
                "writer": "Terry Gilliam, Tom Stoppard, Charles McKeown",
                "cinematographer": "Roger Pratt",
                "editor": "Julian Doyle",
                "composer": "Michael Kamen",
                "studio": "Embassy International Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Brazil&year=1985`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                brazil.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(brazil);

            const affair = {
                "id": "the-end-of-the-affair",
                "title": "The End of the Affair",
                "year": 1999,
                "director": "Neil Jordan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Moodily lit, rain-slicked romantic melancholia.",
                "plot": "A writer examines the end of his affair with his friend's wife.",
                "releaseDate": "1999-12-03",
                "writer": "Neil Jordan",
                "cinematographer": "Roger Pratt",
                "editor": "Tony Lawson",
                "composer": "Michael Nyman",
                "studio": "Columbia Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20End%20of%20the%20Affair&year=1999`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                affair.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(affair);

            const batman = {
                "id": "batman",
                "title": "Batman",
                "year": 1989,
                "director": "Tim Burton",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expressionistic, shadowy, and claustrophobic gothic architecture.",
                "plot": "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
                "releaseDate": "1989-06-23",
                "writer": "Sam Hamm, Warren Skaaren",
                "cinematographer": "Roger Pratt",
                "editor": "Ray Lovejoy",
                "composer": "Danny Elfman",
                "studio": "Warner Bros. / Guber-Peters Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Batman&year=1989`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                batman.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(batman);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Roger Pratt.");
    } else {
        console.log("Could not find Roger Pratt in database.");
    }
}

run();
