const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "A Separation": "Razor-sharp, dialectical editing that seamlessly escalates domestic conflict into a tense moral thriller.",
    "The Salesman": "Suspenseful, theater-inspired rhythm that quietly tightens the psychological tension.",
    "About Elly": "Fluid, anxiety-inducing pacing that subtly shifts a relaxed vacation into a frantic, chaotic mystery.",
    "Taste of Cherry": "Minimalist, unhurried editing featuring long takes and real-time driving sequences that invite profound existential reflection.",
    "The Wind Will Carry Us": "Elliptical editing that emphasizes off-screen space and patience, challenging the audience to look beyond the frame.",
    "Close-Up": "Groundbreaking, reflexive editing that brilliantly blurs the line between documentary realism and staged fiction.",
    "Bashu, the Little Stranger": "Compassionate, humanistic pacing that uses visual juxtapositions to bridge vast cultural and linguistic divides.",
    "Killing Mad Dogs": "Taut, relentless editing that constructs a suffocating atmosphere of betrayal and survival.",
    "3 Faces": "Patient, observant editing that captures the stark reality and subtle humor of rural life while maintaining a documentary-like intimacy.",
    "The Past": "Intricate, psychologically dense editing that carefully peels back layers of history and hidden emotional trauma."
};

const moviesByDirector = {
    "Hayedeh Safiyari": [
        {
            title: "A Separation",
            country: "Iran",
            releaseDate: "March 16, 2011",
            year: 2011,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Mahmoud Kalari",
            editor: "Hayedeh Safiyari",
            composer: "Sattar Oraki",
            studio: "Asghar Farhadi Production"
        },
        {
            title: "The Salesman",
            country: "Iran / France",
            releaseDate: "May 21, 2016",
            year: 2016,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Hossein Jafarian",
            editor: "Hayedeh Safiyari",
            composer: "Sattar Oraki",
            studio: "Memento Films Production / Asghar Farhadi Production"
        },
        {
            title: "About Elly",
            country: "Iran",
            releaseDate: "February 7, 2009",
            year: 2009,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Hossein Jafarian",
            editor: "Hayedeh Safiyari",
            composer: "Andrea Bauer",
            studio: "Simaye Mehr"
        }
    ],
    "Abbas Kiarostami": [
        {
            title: "Taste of Cherry",
            country: "Iran / France",
            releaseDate: "May 19, 1997",
            year: 1997,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Homayoun Payvar",
            editor: "Abbas Kiarostami",
            studio: "Abbas Kiarostami Productions / CiBy 2000"
        },
        {
            title: "The Wind Will Carry Us",
            country: "Iran / France",
            releaseDate: "September 4, 1999",
            year: 1999,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Mahmoud Kalari",
            editor: "Abbas Kiarostami",
            studio: "MK2 Productions"
        },
        {
            title: "Close-Up",
            country: "Iran",
            releaseDate: "February 1, 1990",
            year: 1990,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Ali Reza Zarrindast",
            editor: "Abbas Kiarostami",
            studio: "Kanoon"
        }
    ],
    "Bahram Beyzai": [
        {
            title: "Bashu, the Little Stranger",
            country: "Iran",
            releaseDate: "February 1, 1989",
            year: 1989,
            director: "Bahram Beyzai",
            writer: "Bahram Beyzai",
            cinematographer: "Firooz Malekzadeh",
            editor: "Bahram Beyzai",
            composer: "Babak Bayat",
            studio: "Kanoon"
        },
        {
            title: "Killing Mad Dogs",
            country: "Iran",
            releaseDate: "February 4, 2001",
            year: 2001,
            director: "Bahram Beyzai",
            writer: "Bahram Beyzai",
            cinematographer: "Asghar Rafijam",
            editor: "Bahram Beyzai",
            composer: "Saba Khoylou",
            studio: "Lisar Film Production"
        }
    ],
    "Mastaneh Mohajer": [
        {
            title: "3 Faces",
            country: "Iran",
            releaseDate: "May 12, 2018",
            year: 2018,
            director: "Jafar Panahi",
            writer: "Jafar Panahi",
            cinematographer: "Amin Jafari",
            editor: "Mastaneh Mohajer / Jafar Panahi",
            studio: "Jafar Panahi Productions"
        },
        {
            title: "The Past",
            country: "Iran",
            releaseDate: "October 16, 2024",
            year: 2024,
            director: "Shahram Shah-Hosseini",
            writer: "Shahram Shah-Hosseini / Reza Baharvand",
            cinematographer: "Koohyar Kalari",
            editor: "Mastaneh Mohajer",
            composer: "Massoud Sakhavatdoost",
            studio: "Shofilm"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "iranian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "iranian");

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
    console.log("Updated js/data.js for Iranian Editors successfully.");
}

updateData().catch(console.error);
