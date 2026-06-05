const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "The Changing Village": "Patient, observant editing that captures the slow, melancholic decay of the traditional Sri Lankan aristocracy.",
    "The Treasure": "Tense, psychological pacing that brilliantly builds an atmosphere of mounting obsession and inevitable tragedy.",
    "The Line of Destiny": "Collaborative, nuanced rhythm that seamlessly intertwines personal emotion with sweeping social change.",
    "The Girls": "Empathetic, delicate editing focusing on the subtle emotional shifts and constrained lives of young women.",
    "Manto": "Fractured, intense pacing that vividly mirrors the brilliant but tormented mind of the legendary writer.",
    "The Clay Bird": "Meditative, lyrical editing that contrasts religious dogma with humanistic warmth during a period of historical upheaval.",
    "Television": "Satirical, crisp rhythm that expertly balances profound religious themes with sharp societal comedy."
};

const moviesByDirector = {
    "Titus Thotawatte": [
        {
            title: "The Changing Village",
            country: "Sri Lanka",
            releaseDate: "December 20, 1963",
            year: 1963,
            director: "Lester James Peries",
            writer: "Reggie Siriwardena",
            cinematographer: "Willie Blake",
            editor: "Titus Thotawatte",
            composer: "W. D. Amaradeva",
            studio: "Cine Lanka"
        },
        {
            title: "The Treasure",
            country: "Sri Lanka",
            releaseDate: "January 12, 1972",
            year: 1972,
            director: "Lester James Peries",
            writer: "Tissa Abeysekara",
            cinematographer: "M. S. Anandan",
            editor: "Titus Thotawatte",
            composer: "Premasiri Khemadasa",
            studio: "Ceylon Studios"
        }
    ],
    "Sumitra Peries": [
        {
            title: "The Line of Destiny",
            country: "Sri Lanka",
            releaseDate: "December 20, 1963",
            year: 1963,
            director: "Lester James Peries",
            writer: "Reggie Siriwardena",
            cinematographer: "Willie Blake",
            editor: "Titus Thotawatte / Sumitra Peries",
            composer: "W. D. Amaradeva",
            studio: "Cine Lanka"
        },
        {
            title: "The Girls",
            country: "Sri Lanka",
            releaseDate: "March 17, 1978",
            year: 1978,
            director: "Sumitra Peries",
            writer: "Karunasena Jayalath",
            cinematographer: "Donald Karunaratne",
            editor: "Sumitra Peries",
            composer: "Nimal Mendis",
            studio: "Chinthana Chithra"
        }
    ],
    "Nadeem Abbas": [
        {
            title: "Manto",
            country: "Pakistan",
            releaseDate: "September 11, 2015",
            year: 2015,
            director: "Sarmad Khoosat",
            writer: "Shahid Nadeem",
            cinematographer: "Khizer Idrees",
            editor: "Nadeem Abbas",
            composer: "True Brew Records",
            studio: "Geo Films / A&B Entertainment"
        }
    ],
    "Mujibur Rahman Dulu": [
        {
            title: "The Clay Bird",
            country: "Bangladesh / France",
            releaseDate: "May 17, 2002",
            year: 2002,
            director: "Tareque Masud",
            writer: "Tareque Masud / Catherine Masud",
            cinematographer: "Sudheer Palsane",
            editor: "Mujibur Rahman Dulu / Catherine Masud",
            studio: "Audiovision / MK2 Productions"
        },
        {
            title: "Television",
            country: "Bangladesh",
            releaseDate: "October 13, 2012",
            year: 2012,
            director: "Mostofa Sarwar Farooki",
            writer: "Mostofa Sarwar Farooki / Anisul Hoque",
            cinematographer: "Golam Maula Nabir",
            editor: "Mujibur Rahman Dulu",
            studio: "Chabial"
        }
    ]
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    // Special adjustments for API matches
    if (searchTitle === "The Changing Village" || searchTitle === "The Line of Destiny") {
        searchTitle = "Gamperaliya";
    }
    if (searchTitle === "The Treasure") {
        searchTitle = "Nidhanaya";
    }
    if (searchTitle === "The Girls") {
        searchTitle = "Gehenu Lamai";
    }
    if (searchTitle === "The Clay Bird") {
        searchTitle = "The Clay Bird"; 
    }

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
        let dirObj = editors.find(d => d.name === dName && d.region === "south-asian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "south-asian");

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
    console.log("Updated js/data.js for South Asian Editors successfully.");
}

updateData().catch(console.error);
