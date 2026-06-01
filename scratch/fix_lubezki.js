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
        if (p.id === 'emmanuel-lubezki' || p.name === 'Emmanuel Lubezki') {
            p.mustWatch = [];
            
            const children = {
                "id": "children-of-men",
                "title": "Children of Men",
                "year": 2006,
                "director": "Alfonso Cuarón",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Complex, immersive, uninterrupted action long takes.",
                "plot": "In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
                "releaseDate": "2006-12-25",
                "writer": "Alfonso Cuarón, Timothy J. Sexton, David Arata, Mark Fergus, Hawk Ostby",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Alfonso Cuarón, Alex Rodríguez",
                "composer": "John Tavener",
                "studio": "Universal Pictures / Strike Entertainment"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Children%20of%20Men`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                children.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(children);

            const revenant = {
                "id": "the-revenant",
                "title": "The Revenant",
                "year": 2015,
                "director": "Alejandro G. Iñárritu",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Shot entirely using harsh, beautiful natural light.",
                "plot": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
                "releaseDate": "2015-12-25",
                "writer": "Alejandro G. Iñárritu, Mark L. Smith",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Stephen Mirrione",
                "composer": "Ryuichi Sakamoto, Alva Noto",
                "studio": "Regency Enterprises"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Revenant&year=2015`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                revenant.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(revenant);

            const birdman = {
                "id": "birdman",
                "title": "Birdman or (The Unexpected Virtue of Ignorance)",
                "year": 2014,
                "director": "Alejandro G. Iñárritu",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Spliced together to appear as one continuous, dreamlike shot.",
                "plot": "A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.",
                "releaseDate": "2014-10-17",
                "writer": "Alejandro G. Iñárritu, Nicolás Giacobone, Alexander Dinelaris Jr., Armando Bó",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Douglas Crise, Stephen Mirrione",
                "composer": "Antonio Sánchez",
                "studio": "Fox Searchlight Pictures / New Regency"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Birdman`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                birdman.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(birdman);

            const tree = {
                "id": "the-tree-of-life",
                "title": "The Tree of Life",
                "year": 2011,
                "director": "Terrence Malick",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Spiritual, free-floating, wide-angle lens photography.",
                "plot": "The story of a family in Waco, Texas in 1956. The eldest son witnesses the loss of innocence and struggles with his parents' conflicting teachings.",
                "releaseDate": "2011-05-27",
                "writer": "Terrence Malick",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Hank Corwin, Jay Rabinowitz, Daniel Rezende, Billy Weber, Mark Yoshikawa",
                "composer": "Alexandre Desplat",
                "studio": "River Road Entertainment / Plan B"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Tree%20of%20Life`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                tree.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(tree);

            const gravity = {
                "id": "gravity",
                "title": "Gravity",
                "year": 2013,
                "director": "Alfonso Cuarón",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Groundbreaking virtual cinematography simulating zero gravity.",
                "plot": "Two astronauts work together to survive after an accident leaves them stranded in space.",
                "releaseDate": "2013-10-04",
                "writer": "Alfonso Cuarón, Jonás Cuarón",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Alfonso Cuarón, Mark Sanger",
                "composer": "Steven Price",
                "studio": "Warner Bros. / Heyday Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Gravity&year=2013`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                gravity.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(gravity);

            const ytu = {
                "id": "y-tu-mama-tambien",
                "title": "Y Tu Mamá También",
                "year": 2001,
                "director": "Alfonso Cuarón",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid handheld camerawork mimicking a documentary road trip.",
                "plot": "In Mexico, two teenage boys and an attractive older woman embark on a road trip and learn a thing or two about life, friendship, sex, and each other.",
                "releaseDate": "2001-06-08",
                "writer": "Carlos Cuarón, Alfonso Cuarón",
                "cinematographer": "Emmanuel Lubezki",
                "editor": "Alfonso Cuarón, Alex Rodríguez",
                "composer": "Various",
                "studio": "Producciones Anhelo"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Y%20Tu%20Mama%20Tambien`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) {
                ytu.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            }
            p.mustWatch.push(ytu);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Fixed Emmanuel Lubezki.");
    }
}

run();
