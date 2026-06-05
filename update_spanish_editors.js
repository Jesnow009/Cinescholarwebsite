const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "All About My Mother": "Vibrant, melodramatic pacing that balances profound tragedy with exuberant life and humor.",
    "Volver": "Fluid, emotional editing that effortlessly weaves supernatural elements with a powerful celebration of womanhood.",
    "Women on the Verge of a Nervous Breakdown": "Frantic, colorful pacing that perfectly captures the escalating absurdity of a romantic crisis.",
    "Pain and Glory": "Reflective, deeply personal editing that fluidly transitions between present suffering and vivid childhood memory.",
    "Parallel Mothers": "Nuanced, intercut rhythm that explores the complex intersections of motherhood, trauma, and historical memory.",
    "The Day of the Beast": "Frenetic, dark-comedy editing that builds relentless momentum toward an apocalyptic showdown."
};

const moviesByDirector = {
    "José Salcedo": [
        {
            title: "All About My Mother",
            country: "Spain / France",
            releaseDate: "April 16, 1999",
            year: 1999,
            director: "Pedro Almodóvar",
            writer: "Pedro Almodóvar",
            cinematographer: "Affonso Beato",
            editor: "José Salcedo",
            composer: "Alberto Iglesias",
            studio: "El Deseo / Renn Productions / France 2 Cinéma"
        },
        {
            title: "Volver",
            country: "Spain",
            releaseDate: "March 17, 2006",
            year: 2006,
            director: "Pedro Almodóvar",
            writer: "Pedro Almodóvar",
            cinematographer: "José Luis Alcaine",
            editor: "José Salcedo",
            composer: "Alberto Iglesias",
            studio: "El Deseo"
        },
        {
            title: "Women on the Verge of a Nervous Breakdown",
            country: "Spain",
            releaseDate: "March 25, 1988",
            year: 1988,
            director: "Pedro Almodóvar",
            writer: "Pedro Almodóvar",
            cinematographer: "José Luis Alcaine",
            editor: "José Salcedo",
            composer: "Bernardo Bonezzi",
            studio: "El Deseo / Laurenfilm"
        }
    ],
    "Teresa Font": [
        {
            title: "Pain and Glory",
            country: "Spain",
            releaseDate: "March 22, 2019",
            year: 2019,
            director: "Pedro Almodóvar",
            writer: "Pedro Almodóvar",
            cinematographer: "José Luis Alcaine",
            editor: "Teresa Font",
            composer: "Alberto Iglesias",
            studio: "El Deseo"
        },
        {
            title: "Parallel Mothers",
            country: "Spain / France",
            releaseDate: "September 1, 2021",
            year: 2021,
            director: "Pedro Almodóvar",
            writer: "Pedro Almodóvar",
            cinematographer: "José Luis Alcaine",
            editor: "Teresa Font",
            composer: "Alberto Iglesias",
            studio: "El Deseo / Remotamente Films"
        },
        {
            title: "The Day of the Beast",
            country: "Spain / Italy",
            releaseDate: "October 20, 1995",
            year: 1995,
            director: "Álex de la Iglesia",
            writer: "Álex de la Iglesia / Jorge Guerricaechevarría",
            cinematographer: "Flavio Martínez Labiano",
            editor: "Teresa Font",
            composer: "Battista Lena",
            studio: "Sogetel / Iberoamericana Films / MG Srl"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "spanish" || d.region === "spanish-portuguese" || d.region === "spanish-and-portuguese" || d.region.includes("spanish")));

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
    console.log("Updated js/data.js for Spanish & Portuguese Editors successfully.");
}

updateData().catch(console.error);
