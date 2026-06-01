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
        if (p.id === 'harris-savides' || p.name === 'Harris Savides') {
            p.mustWatch = [];
            
            const birth = {
                "id": "birth",
                "title": "Birth",
                "year": 2004,
                "director": "Jonathan Glazer",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Muted, underexposed, and ghostly natural light.",
                "plot": "A widow is unsettled when a ten-year-old boy claims to be the reincarnation of her deceased husband.",
                "releaseDate": "2004-11-05",
                "writer": "Jean-Claude Carrière, Milo Addica, Jonathan Glazer",
                "cinematographer": "Harris Savides",
                "editor": "Sam Sneade, Claus Wehlisch",
                "composer": "Alexandre Desplat",
                "studio": "New Line Cinema / Fine Line Features"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Birth&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                birth.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(birth);

            const zodiac = {
                "id": "zodiac",
                "title": "Zodiac",
                "year": 2007,
                "director": "David Fincher",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering, ultra-clean digital cinematography with precise framing.",
                "plot": "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
                "releaseDate": "2007-03-02",
                "writer": "James Vanderbilt",
                "cinematographer": "Harris Savides",
                "editor": "Angus Wall",
                "composer": "David Shire",
                "studio": "Paramount Pictures / Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Zodiac&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                zodiac.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(zodiac);

            const elephant = {
                "id": "elephant",
                "title": "Elephant",
                "year": 2003,
                "director": "Gus Van Sant",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, floating steadicam takes conveying detachment.",
                "plot": "Several ordinary high school students go through their daily routine as two others prepare for something more malevolent.",
                "releaseDate": "2003-10-24",
                "writer": "Gus Van Sant",
                "cinematographer": "Harris Savides",
                "editor": "Gus Van Sant",
                "composer": "Ludwig van Beethoven",
                "studio": "HBO Films / Fine Line Features"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Elephant&year=2003`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                elephant.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(elephant);

            const game = {
                "id": "the-game",
                "title": "The Game",
                "year": 1997,
                "director": "David Fincher",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Glossy, high-contrast urban paranoia and sleek shadows.",
                "plot": "After a wealthy San Francisco banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.",
                "releaseDate": "1997-09-12",
                "writer": "John Brancato, Michael Ferris",
                "cinematographer": "Harris Savides",
                "editor": "James Haygood",
                "composer": "Howard Shore",
                "studio": "PolyGram Filmed Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Game&year=1997`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                game.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(game);

            const gangster = {
                "id": "american-gangster",
                "title": "American Gangster",
                "year": 2007,
                "director": "Ridley Scott",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated, gritty, and heavily textured 1970s aesthetic.",
                "plot": "An outcast New York City cop is charged with bringing down Harlem drug lord Frank Lucas, whose real life inspired this partly biographical film.",
                "releaseDate": "2007-11-02",
                "writer": "Steven Zaillian",
                "cinematographer": "Harris Savides",
                "editor": "Pietro Scalia",
                "composer": "Marc Streitenfeld",
                "studio": "Universal Pictures / Imagine Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=American%20Gangster&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                gangster.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(gangster);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Harris Savides.");
    } else {
        console.log("Could not find Harris Savides in database.");
    }
}

run();
