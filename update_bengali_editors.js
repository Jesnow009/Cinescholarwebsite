const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Pather Panchali": "Lyrical, unhurried pacing that beautifully observes the tragic and tender poetry of everyday rural life.",
    "Charulata": "Elegant, nuanced editing that uses lingering glances and precise pacing to reveal profound internal longing.",
    "The Music Room": "Rhythmic, musical editing that perfectly captures the slow, majestic decay of feudal grandeur.",
    "The Cloud-Capped Star": "Abrasive, jarring editing intertwined with intense soundscapes to express profound melodramatic trauma.",
    "A River Called Titas": "Epic, episodic rhythm that mirrors the sweeping, inevitable flow of a dying river community.",
    "The Last Lear": "Theatrical, reflective pacing that slowly deconstructs the fragile ego of an aging Shakespearean actor.",
    "Aparajita Tumi": "Fluid, emotional editing that maps the complex, shifting landscapes of modern relationships and infidelity.",
    "Labor of Love": "Wordless, hypnotic rhythm that finds profound emotional resonance in the mundane rituals of domestic life.",
    "Jonaki": "Surreal, fragmented pacing that meticulously constructs an abstract, dreamlike portrait of decaying memory."
};

const moviesByDirector = {
    "Dulal Dutta": [
        {
            title: "Pather Panchali",
            country: "India",
            releaseDate: "August 26, 1955",
            year: 1955,
            director: "Satyajit Ray",
            writer: "Satyajit Ray",
            cinematographer: "Subrata Mitra",
            editor: "Dulal Dutta",
            composer: "Ravi Shankar",
            studio: "Government of West Bengal"
        },
        {
            title: "Charulata",
            country: "India",
            releaseDate: "September 4, 1964",
            year: 1964,
            director: "Satyajit Ray",
            writer: "Satyajit Ray",
            cinematographer: "Subrata Mitra",
            editor: "Dulal Dutta",
            composer: "Satyajit Ray",
            studio: "R.D. Bansal & Co."
        },
        {
            title: "The Music Room",
            country: "India",
            releaseDate: "October 24, 1958",
            year: 1958,
            director: "Satyajit Ray",
            writer: "Satyajit Ray",
            cinematographer: "Subrata Mitra",
            editor: "Dulal Dutta",
            composer: "Vilayat Khan",
            studio: "Satyajit Ray Productions"
        }
    ],
    "Subodh Naskar": [
        {
            title: "The Cloud-Capped Star",
            country: "India",
            releaseDate: "April 14, 1960",
            year: 1960,
            director: "Ritwik Ghatak",
            writer: "Ritwik Ghatak",
            cinematographer: "Dilibat Gupta",
            editor: "Subodh Naskar",
            composer: "Jyotirindra Moitra",
            studio: "Chitrakalpa"
        },
        {
            title: "A River Called Titas",
            country: "Bangladesh / India",
            releaseDate: "July 27, 1973",
            year: 1973,
            director: "Ritwik Ghatak",
            writer: "Ritwik Ghatak",
            cinematographer: "Baby Islam",
            editor: "Subodh Naskar",
            composer: "Ahsan Ahmed / Bahadur Khan",
            studio: "Purba Pran Chitra"
        }
    ],
    "Arghyakamal Mitra": [
        {
            title: "The Last Lear",
            country: "India",
            releaseDate: "September 9, 2007",
            year: 2007,
            director: "Rituparno Ghosh",
            writer: "Rituparno Ghosh",
            cinematographer: "Abhik Mukhopadhyay",
            editor: "Arghyakamal Mitra",
            composer: "21st Century Xanadu",
            studio: "Planman Motion Pictures"
        },
        {
            title: "Aparajita Tumi",
            country: "India",
            releaseDate: "January 20, 2012",
            year: 2012,
            director: "Aniruddha Roy Chowdhury",
            writer: "Syamalkanti Das / Aniruddha Roy Chowdhury",
            cinematographer: "Ranjan Palit",
            editor: "Arghyakamal Mitra",
            composer: "Shantanu Moitra",
            studio: "Opus Communication / Screenplay Films"
        }
    ],
    "Bodhaditya Banerjee": [
        {
            title: "Labor of Love",
            country: "India",
            releaseDate: "September 4, 2014",
            year: 2014,
            director: "Aditya Vikram Sengupta",
            writer: "Aditya Vikram Sengupta",
            cinematographer: "Mahendra J. Shetty / Aditya Vikram Sengupta",
            editor: "Bodhaditya Banerjee",
            studio: "For Films"
        },
        {
            title: "Jonaki",
            country: "India / France / Singapore",
            releaseDate: "January 25, 2018",
            year: 2018,
            director: "Aditya Vikram Sengupta",
            writer: "Aditya Vikram Sengupta",
            cinematographer: "Mahendra J. Shetty",
            editor: "Bodhaditya Banerjee",
            studio: "For Films / Fandango / Samir Sarkar"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "indian" || d.region.includes("indian")));

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
    console.log("Updated js/data.js for Bengali Editors successfully.");
}

updateData().catch(console.error);
