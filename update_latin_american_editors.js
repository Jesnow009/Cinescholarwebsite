const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "City of God": "Kinetic, explosive editing that mirrors the frantic and dangerous energy of the favela.",
    "The Tree of Life": "Lyrical, impressionistic pacing that weaves cosmic themes with intimate, nostalgic memories.",
    "Elite Squad": "Relentless, adrenaline-fueled pacing that traps the viewer in the violent crossfire of urban warfare.",
    "Amores Perros": "Visceral, intertwined narrative editing that connects disparate lives through sudden, tragic collision.",
    "Y Tu Mamá También": "Free-flowing, spontaneous rhythm capturing the transient nature of youth and shifting relationships.",
    "The Jackal of Nahueltoro": "Documentary-like, urgent editing that exposes raw social injustice and systemic failure.",
    "The Promised Land": "Epic, allegorical pacing that blends historical struggle with mythic storytelling."
};

const moviesByDirector = {
    "Daniel Rezende": [
        {
            title: "City of God",
            country: "Brazil / France / Germany",
            releaseDate: "August 30, 2002",
            year: 2002,
            director: "Fernando Meirelles / Kátia Lund",
            writer: "Bráulio Mantovani",
            cinematographer: "César Charlone",
            editor: "Daniel Rezende",
            composer: "Antonio Pinto / Ed Côrtes",
            studio: "O2 Filmes / VideoFilmes / Hank Levine Film"
        },
        {
            title: "The Tree of Life",
            country: "United States",
            releaseDate: "May 16, 2011",
            year: 2011,
            director: "Terrence Malick",
            writer: "Terrence Malick",
            cinematographer: "Emmanuel Lubezki",
            editor: "Daniel Rezende / Hank Corwin / Jay Rabinowitz / Billy Weber / Mark Yoshikawa",
            composer: "Alexandre Desplat",
            studio: "River Road Entertainment / Plan B Entertainment"
        },
        {
            title: "Elite Squad",
            country: "Brazil / United States",
            releaseDate: "October 5, 2007",
            year: 2007,
            director: "José Padilha",
            writer: "José Padilha / Bráulio Mantovani / Rodrigo Pimentel",
            cinematographer: "Lula Carvalho",
            editor: "Daniel Rezende",
            composer: "Pedro Bromfman",
            studio: "Zazen Produções / Posto 9 / Weinstein Company"
        }
    ],
    "Luis Carballar": [
        {
            title: "Amores Perros",
            country: "Mexico",
            releaseDate: "May 14, 2000",
            year: 2000,
            director: "Alejandro González Iñárritu",
            writer: "Guillermo Arriaga",
            cinematographer: "Rodrigo Prieto",
            editor: "Luis Carballar / Alejandro González Iñárritu / Fernando Pérez Unda",
            composer: "Gustavo Santaolalla",
            studio: "Zeta Film / Altavista Films"
        },
        {
            title: "Y Tu Mamá También",
            country: "Mexico",
            releaseDate: "June 8, 2001",
            year: 2001,
            director: "Alfonso Cuarón",
            writer: "Carlos Cuarón / Alfonso Cuarón",
            cinematographer: "Rodrigo Prieto",
            editor: "Luis Carballar / Alfonso Cuarón",
            studio: "Producciones Anhelo"
        }
    ],
    "Gian Franco Pagliarani": [
        {
            title: "The Jackal of Nahueltoro",
            country: "Chile",
            releaseDate: "December 18, 1969",
            year: 1969,
            director: "Miguel Littín",
            writer: "Miguel Littín",
            cinematographer: "Héctor Ríos",
            editor: "Gian Franco Pagliarani",
            composer: "Sergio Ortega",
            studio: "Cine Experimental de la Universidad de Chile"
        },
        {
            title: "The Promised Land",
            country: "Chile / Cuba",
            releaseDate: "August 1, 1973",
            year: 1973,
            director: "Miguel Littín",
            writer: "Miguel Littín",
            cinematographer: "Alfonso Beato",
            editor: "Gian Franco Pagliarani / Nelson Rodríguez",
            composer: "Luis Advis / Inti-Illimani",
            studio: "Instituto Cubano del Arte e Industrias Cinematográficos (ICAIC)"
        }
    ]
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    if (searchTitle === "The Promised Land") searchTitle = "La tierra prometida";
    
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "latin-american" || d.region.includes("latin")));

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
    console.log("Updated js/data.js for Latin American Editors successfully.");
}

updateData().catch(console.error);
