const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Road to Nhill": "Quirky, observational editing that captures the dry humor and lingering pauses of rural Australian life.",
    "The Dish": "Buoyant, precise comedic timing that elegantly balances heartfelt local charm with global historical stakes.",
    "The Rage in Placid Lake": "Breezy, sardonic pacing that perfectly complements the film's eccentric, deadpan satirical tone.",
    "Two Hands": "Kinetic, jagged editing that mirrors the frantic anxiety and chaotic descent into the criminal underworld.",
    "Babe: Pig in the City": "Frantic, surreal pacing that expertly navigates a chaotic, wildly imaginative urban dreamscape."
};

const moviesByDirector = {
    "Jill Bilcock": [
        {
            title: "Road to Nhill",
            country: "Australia",
            releaseDate: "November 13, 1997",
            year: 1997,
            director: "Sue Brooks",
            writer: "Alison Tilson",
            cinematographer: "Nicolette Freeman",
            editor: "Jill Bilcock",
            composer: "Elizabeth Drake",
            studio: "Gecko Films / Film Victoria"
        },
        {
            title: "The Dish",
            country: "Australia",
            releaseDate: "October 19, 2000",
            year: 2000,
            director: "Rob Sitch",
            writer: "Santo Cilauro / Tom Gleisner / Jane Kennedy / Rob Sitch",
            cinematographer: "Graeme Wood",
            editor: "Jill Bilcock",
            composer: "Edmund Choi",
            studio: "Working Dog Productions"
        }
    ],
    "Lee Smith": [
        {
            title: "The Rage in Placid Lake",
            country: "Australia",
            releaseDate: "August 28, 2003",
            year: 2003,
            director: "Tony McNamara",
            writer: "Tony McNamara",
            cinematographer: "Andrew Commis",
            editor: "Lee Smith",
            composer: "Cezary Skubiszewski",
            studio: "Macgowan Films"
        },
        {
            title: "Two Hands",
            country: "Australia",
            releaseDate: "July 29, 1999",
            year: 1999,
            director: "Gregor Jordan",
            writer: "Gregor Jordan",
            cinematographer: "Malcolm McCulloch",
            editor: "Lee Smith",
            composer: "Cezary Skubiszewski",
            studio: "C连M Film Productions"
        }
    ],
    "Margaret Sixel": [
        {
            title: "Babe: Pig in the City",
            country: "Australia / United States",
            releaseDate: "November 25, 1998",
            year: 1998,
            director: "George Miller",
            writer: "George Miller / Judy Morris / Mark Lamprell",
            cinematographer: "Andrew Lesnie",
            editor: "Margaret Sixel / Jay Friedkin",
            composer: "Nigel Westlake",
            studio: "Kennedy Miller Productions / Universal Pictures"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "australian-oceanic" || d.region.includes("australian") || d.region.includes("oceanic")));

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
    console.log("Updated js/data.js for Australian & Oceanic Editors successfully.");
}

updateData().catch(console.error);
