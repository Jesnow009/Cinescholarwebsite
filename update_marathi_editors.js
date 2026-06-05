const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Harishchandrachi Factory": "Lighthearted, whimsical rhythm that perfectly captures the joyous, historical struggle of early Indian cinema.",
    "Elizabeth Ekadashi": "Endearing, grounded pacing that beautifully mirrors a child's innocent, deeply determined struggle.",
    "Duniyadari": "Vibrant, nostalgic editing that flawlessly recreates the passionate, emotionally turbulent bonds of youth.",
    "Lai Bhaari": "High-voltage, explosive pacing designed purely to amplify relentless, charismatic mass-action sequences.",
    "Katyar Kaljat Ghusali": "Musical, deeply dramatic rhythm that seamlessly builds immense tension through rich classical performances.",
    "Dombivali Fast": "Urgent, chaotic pacing that viscerally maps the explosive mental breakdown of a middle-class commoner.",
    "Court": "Static, painstakingly deliberate rhythm that chillingly underscores the suffocating bureaucracy of the legal system."
};

const moviesByDirector = {
    "Kutub Inamdar": [
        {
            title: "Harishchandrachi Factory",
            country: "India",
            releaseDate: "January 29, 2010",
            year: 2010,
            director: "Paresh Mokashi",
            writer: "Paresh Mokashi",
            cinematographer: "Amalendu Chaudhary",
            editor: "Kutub Inamdar",
            composer: "Anand Modak",
            studio: "Mayasabha Productions"
        },
        {
            title: "Elizabeth Ekadashi",
            country: "India",
            releaseDate: "November 14, 2014",
            year: 2014,
            director: "Paresh Mokashi",
            writer: "Madhugandha Kulkarni / Paresh Mokashi",
            cinematographer: "Amol Gole",
            editor: "Kutub Inamdar",
            composer: "Anand Modak",
            studio: "Essel Vision Productions / Mayasabha Productions"
        }
    ],
    "Apurva Motiwale & Ashish Mhatre": [
        {
            title: "Duniyadari",
            country: "India",
            releaseDate: "July 19, 2013",
            year: 2013,
            director: "Sanjay Jadhav",
            writer: "Chinmay Mandlekar",
            cinematographer: "Prasad Bhende",
            editor: "Apurva Motiwale / Ashish Mhatre",
            composer: "Amit Raj / Pankaj Padghan / Sayalie Pankaj",
            studio: "Dreaming 24/7 Productions"
        },
        {
            title: "Lai Bhaari",
            country: "India",
            releaseDate: "July 11, 2014",
            year: 2014,
            director: "Nishikant Kamat",
            writer: "Sajid Nadiadwala",
            cinematographer: "Hari Vedantam",
            editor: "Apurva Motiwale / Ashish Mhatre",
            composer: "Ajay-Atul",
            studio: "Mumbai Film Company / Zee Studios"
        },
        {
            title: "Katyar Kaljat Ghusali",
            country: "India",
            releaseDate: "November 12, 2015",
            year: 2015,
            director: "Subodh Bhave",
            writer: "Prakash Kapadia",
            cinematographer: "Sudhir Palsane",
            editor: "Apurva Motiwale / Ashish Mhatre",
            composer: "Shankar–Ehsaan–Loy",
            studio: "Essel Vision Productions"
        }
    ],
    "Amit Pawar": [
        {
            title: "Dombivali Fast",
            country: "India",
            releaseDate: "November 4, 2005",
            year: 2005,
            director: "Nishikant Kamat",
            writer: "Nishikant Kamat",
            cinematographer: "Sanjay Jadhav",
            editor: "Amit Pawar",
            composer: "Vedshahi",
            studio: "Cinema Vision"
        },
        {
            title: "Court",
            country: "India",
            releaseDate: "April 17, 2015",
            year: 2015,
            director: "Chaitanya Tamhane",
            writer: "Chaitanya Tamhane",
            cinematographer: "Mrnal Desai",
            editor: "Amit Pawar",
            studio: "Zoo Entertainment"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "marathi" || d.region.includes("marathi")));

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
    console.log("Updated js/data.js for Marathi Editors successfully.");
}

updateData().catch(console.error);
