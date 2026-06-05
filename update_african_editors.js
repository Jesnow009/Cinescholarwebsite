const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Blue Is the Warmest Colour": "Intensely intimate, immersive editing that lingers on raw emotional expression and extended conversational scenes.",
    "Being 17": "Dynamic, kinetic rhythm capturing the aggressive, restless energy of adolescent tension and desire.",
    "The Worst Ones": "Nuanced, observational pacing that blurs the line between documentary authenticity and staged drama.",
    "The Silences of the Palace": "Delicate, contemplative editing that elegantly weaves oppressive silence with painful, suppressed memories.",
    "Halfaouine: Boy of the Terraces (As Editor)": "Warm, rhythmic pacing that captures the vibrant, sun-drenched flow of daily communal life.",
    "The Season of Men": "Meditative, deliberate rhythm emphasizing the psychological isolation and enduring strength of women.",
    "Brotherhood": "Fast-paced, high-octane editing that propels intense action sequences and gripping urban conflict.",
    "Gangs of Lagos": "Gritty, propulsive momentum that immerses the viewer in the relentless, dangerous criminal underworld."
};

const moviesByDirector = {
    "Albertine Lastera": [
        {
            title: "Blue Is the Warmest Colour",
            country: "France / Belgium / Spain",
            releaseDate: "May 23, 2013",
            year: 2013,
            director: "Abdellatif Kechiche",
            writer: "Abdellatif Kechiche / Ghalya Lacroix",
            cinematographer: "Sofian El Fani",
            editor: "Albertine Lastera / Ghalya Lacroix / Jean-Marie Lengellé / Camille Toubkis",
            studio: "Quat'sous Films / Wild Bunch / France 2 Cinéma"
        },
        {
            title: "Being 17",
            country: "France",
            releaseDate: "February 14, 2016",
            year: 2016,
            director: "André Téchiné",
            writer: "André Téchiné / Céline Sciamma",
            cinematographer: "Julien Hirsch",
            editor: "Albertine Lastera",
            composer: "Alexis Rault",
            studio: "Fidélité Productions / Wild Bunch"
        },
        {
            title: "The Worst Ones",
            country: "France",
            releaseDate: "May 22, 2022",
            year: 2022,
            director: "Lise Akoka / Romane Gueret",
            writer: "Lise Akoka / Romane Gueret / Elénore Gurrey",
            cinematographer: "Éric Dumont",
            editor: "Albertine Lastera",
            studio: "Les Films Velvet"
        }
    ],
    "Moufida Tlatli": [
        {
            title: "The Silences of the Palace",
            country: "Tunisia / France",
            releaseDate: "May 22, 1994",
            year: 1994,
            director: "Moufida Tlatli",
            writer: "Moufida Tlatli / Nouri Bouzid",
            cinematographer: "Youssef Ben Youssef",
            editor: "Moufida Tlatli",
            composer: "Anouar Brahem",
            studio: "Cinétéléfilms / Magfilm / CAR Film"
        },
        {
            title: "Halfaouine: Boy of the Terraces (As Editor)",
            country: "Tunisia / France / Italy",
            releaseDate: "May 19, 1990",
            year: 1990,
            director: "Férid Boughedir",
            writer: "Férid Boughedir",
            cinematographer: "Georges Barsky",
            editor: "Moufida Tlatli",
            composer: "Anouar Brahem",
            studio: "Cinétéléfilms / France Media / Scarabee Films"
        },
        {
            title: "The Season of Men",
            country: "Tunisia / France",
            releaseDate: "May 14, 2000",
            year: 2000,
            director: "Moufida Tlatli",
            writer: "Moufida Tlatli",
            cinematographer: "Youssef Ben Youssef",
            editor: "Moufida Tlatli",
            composer: "Anouar Brahem",
            studio: "Les Films du Losange / Arte France Cinéma"
        }
    ],
    "Martini Akande": [
        {
            title: "Brotherhood",
            country: "Nigeria",
            releaseDate: "September 23, 2022",
            year: 2022,
            director: "Loukman Ali",
            writer: "Abdul Tijani-Ahmed",
            cinematographer: "Loukman Ali",
            editor: "Martini Akande",
            studio: "Greoh Studios"
        },
        {
            title: "Gangs of Lagos",
            country: "Nigeria",
            releaseDate: "April 7, 2023",
            year: 2023,
            director: "Jáde Osiberu",
            writer: "Jáde Osiberu / Kay I. Jegede",
            cinematographer: "Jonathan Kovel",
            editor: "Martini Akande",
            studio: "Greoh Studios"
        }
    ]
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    if (year) url += `&year=${year}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                const posterPath = json.results[0].poster_path;
                const overview = json.results[0].overview;
                resolve({
                    poster: posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null,
                    plot: overview || "Plot details not available."
                });
            } else {
                resolve({poster: null, plot: "Plot details not available."});
            }
        } catch(e) {
            resolve({poster: null, plot: "Plot details not available."});
        }
      });
    }).on('error', () => resolve({poster: null, plot: "Plot details not available."}));
  });
}

const pLimit = (limit) => {
    let activeCount = 0;
    const queue = [];
    const next = () => {
        activeCount--;
        if (queue.length > 0) {
            queue.shift()();
        }
    };
    return (fn) => new Promise((resolve, reject) => {
        const run = async () => {
            activeCount++;
            try {
                const result = await fn();
                resolve(result);
            } catch (error) {
                reject(error);
            }
            next();
        };
        if (activeCount < limit) {
            run();
        } else {
            queue.push(run);
        }
    });
};

const limit = pLimit(2);

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const editors = context.FILMS_DATA.editor.editors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "african" || d.region.includes("african")));

        if (dirObj) {
            const requestedMovies = moviesByDirector[dName];
            dirObj.mustWatch = [];
            
            for (let mv of requestedMovies) {
                let tmdbData = await limit(() => fetchTMDB(mv.title, mv.year));
                if (!tmdbData.poster || tmdbData.plot === "Plot details not available.") {
                    let fallback = await limit(() => fetchTMDB(mv.title));
                    if (fallback.poster) tmdbData.poster = fallback.poster;
                    if (fallback.plot !== "Plot details not available.") tmdbData.plot = fallback.plot;
                }

                let m = {};
                m.title = mv.title;
                if (mv.year) m.year = mv.year;
                if (mv.releaseDate) m.releaseDate = mv.releaseDate;
                if (mv.director) m.director = mv.director;
                if (mv.writer) m.writer = mv.writer;
                if (mv.cinematographer) m.cinematographer = mv.cinematographer;
                if (mv.editor) m.editor = mv.editor;
                if (mv.composer) m.composer = mv.composer;
                if (mv.studio) m.studio = mv.studio;
                if (mv.country) m.country = mv.country;
                if (tmdbData.poster) m.poster = tmdbData.poster;
                m.plot = tmdbData.plot;
                m.focus = focusMap[mv.title] || "Masterful editing technique.";
                
                dirObj.mustWatch.push(m);
            }
        } else {
            console.log("Could not find editor:", dName);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js for African Editors successfully.");
}

updateData().catch(console.error);
