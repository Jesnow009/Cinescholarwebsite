const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Eternal Sunshine of the Spotless Mind": "Mind-bending, non-linear editing that perfectly mirrors the chaotic fragmentation of a fading memory.",
    "Festen": "Dogme 95 pioneering style featuring raw, abrasive jump cuts that expose deep-seated family trauma.",
    "Submarino": "Gritty, uncompromising pacing that forces the audience into the painful reality of addiction and grief.",
    "Another Round": "Intoxicating, rhythmic editing that ebbs and flows with the euphoric highs and crushing lows of alcohol.",
    "The Hunt": "Relentless, suffocating pacing that captures the terrifying speed of communal paranoia and false accusation.",
    "Pelle the Conqueror": "Sweeping, classical rhythm that grounds profound human suffering and resilience in a harsh, unforgiving landscape.",
    "Let the Right One In": "Chilling, deliberate pacing that emphasizes cold, isolating space and sudden bursts of visceral horror.",
    "Tinker Tailor Soldier Spy": "Meticulous, deeply psychological editing that slowly unravels a dense labyrinth of Cold War paranoia and betrayal."
};

const moviesByDirector = {
    "Valdís Óskarsdóttir": [
        {
            title: "Eternal Sunshine of the Spotless Mind",
            country: "United States",
            releaseDate: "March 19, 2004",
            year: 2004,
            director: "Michel Gondry",
            writer: "Charlie Kaufman",
            cinematographer: "Ellen Kuras",
            editor: "Valdís Óskarsdóttir",
            composer: "Jon Brion",
            studio: "Anonymous Content / This Is That Productions"
        },
        {
            title: "Festen",
            country: "Denmark / Sweden",
            releaseDate: "June 19, 1998",
            year: 1998,
            director: "Thomas Vinterberg",
            writer: "Thomas Vinterberg / Mogens Rukov",
            cinematographer: "Anthony Dod Mantle",
            editor: "Valdís Óskarsdóttir",
            studio: "Nimbus Film / DR"
        },
        {
            title: "Submarino",
            country: "Denmark / Sweden",
            releaseDate: "February 13, 2010",
            year: 2010,
            director: "Thomas Vinterberg",
            writer: "Tobias Lindholm / Thomas Vinterberg",
            cinematographer: "Charlotte Bruus Christensen",
            editor: "Valdís Óskarsdóttir",
            composer: "Kristian Eidnes Andersen",
            studio: "Nimbus Film Productions"
        }
    ],
    "Janus Billeskov Jansen": [
        {
            title: "Another Round",
            country: "Denmark / Netherlands / Sweden",
            releaseDate: "September 12, 2020",
            year: 2020,
            director: "Thomas Vinterberg",
            writer: "Thomas Vinterberg / Tobias Lindholm",
            cinematographer: "Sturla Brandth Grøvlen",
            editor: "Janus Billeskov Jansen / Anne Østerud",
            composer: "Janus Billeskov Jansen",
            studio: "Zentropa Entertainments / Film i Väst / Topkapi Films"
        },
        {
            title: "The Hunt",
            country: "Denmark / Sweden",
            releaseDate: "May 20, 2012",
            year: 2012,
            director: "Thomas Vinterberg",
            writer: "Thomas Vinterberg / Tobias Lindholm",
            cinematographer: "Charlotte Bruus Christensen",
            editor: "Janus Billeskov Jansen / Anne Østerud",
            studio: "Zentropa Entertainments / Film i Väst"
        },
        {
            title: "Pelle the Conqueror",
            country: "Denmark / Sweden",
            releaseDate: "December 25, 1987",
            year: 1987,
            director: "Bille August",
            writer: "Bille August / Per Olov Enquist / Bjarne Reuter",
            cinematographer: "Jörgen Persson",
            editor: "Janus Billeskov Jansen",
            composer: "Stefan Nilsson",
            studio: "Per Holst Filmproduktion / Svenska Filminstitutet"
        }
    ],
    "Daniel Jonsäter": [
        {
            title: "Let the Right One In",
            country: "Sweden",
            releaseDate: "January 26, 2008",
            year: 2008,
            director: "Tomas Alfredson",
            writer: "John Ajvide Lindqvist",
            cinematographer: "Hoyte van Hoytema",
            editor: "Daniel Jonsäter",
            composer: "Johan Söderqvist",
            studio: "EFTI / Sveriges Television / Filmpool Nord"
        },
        {
            title: "Tinker Tailor Soldier Spy",
            country: "United Kingdom / France / Germany",
            releaseDate: "September 5, 2011",
            year: 2011,
            director: "Tomas Alfredson",
            writer: "Bridget O'Connor / Peter Straughan",
            cinematographer: "Hoyte van Hoytema",
            editor: "Dino Jonsäter",
            composer: "Alberto Iglesias",
            studio: "Working Title Films / StudioCanal / Karla Films"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "nordic");

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
    console.log("Updated js/data.js for Nordic Editors successfully.");
}

updateData().catch(console.error);
