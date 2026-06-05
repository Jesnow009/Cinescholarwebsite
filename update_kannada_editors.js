const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "K.G.F: Chapter 1": "Kinetic, explosive rhythm that aggressively amplifies mythic hero worship and high-octane action.",
    "Ugramm": "Gritty, fast-paced editing that seamlessly weaves dark vengeance with stylized, intense mass appeal.",
    "Bharaate": "Energetic, dynamic pacing designed to maximize colorful commercial elements and robust family drama.",
    "Mungaru Male": "Melodious, sweeping rhythm that beautifully heightens the emotional intensity of tragic romance and nature.",
    "Tagaru": "Fractured, non-linear editing that brilliantly creates a disorienting, raw, and visceral criminal underworld.",
    "Duniya": "Raw, realistic pacing that unflinchingly captures the brutal, tragic journey of the marginalized.",
    "Roja": "Lyrical, emotionally charged rhythm that perfectly balances patriotic fervor with deeply intimate romance.",
    "Bombay": "Poignant, escalating pacing that masterfully contrasts innocent love against the devastating chaos of communal riots.",
    "Iruvar": "Epic, measured editing that majestically chronicles the intertwined, complex lives of political and cinematic titans.",
    "Mufti": "Atmospheric, deliberate rhythm that steadily builds palpable tension and dark, brooding underworld intrigue.",
    "Daredevil Musthafa": "Charming, lively editing that nostalgically captures the innocent, comedic spirit of college camaraderie.",
    "Ammachi Yemba Nenapu": "Observational, nuanced pacing that delicately unfolds a poignant, culturally rooted feminist narrative."
};

const moviesByDirector = {
    "Srikanth Gowda": [
        {
            title: "K.G.F: Chapter 1",
            country: "India",
            releaseDate: "December 21, 2018",
            year: 2018,
            director: "Prashanth Neel",
            writer: "Prashanth Neel",
            cinematographer: "Bhuvan Gowda",
            editor: "Srikanth Gowda",
            composer: "Ravi Basrur",
            studio: "Hombale Films"
        },
        {
            title: "Ugramm",
            country: "India",
            releaseDate: "February 21, 2014",
            year: 2014,
            director: "Prashanth Neel",
            writer: "Prashanth Neel",
            cinematographer: "Ravi Varman / Bhuvan Gowda",
            editor: "Srikanth Gowda",
            composer: "Ravi Basrur",
            studio: "Inkfinite Pictures"
        },
        {
            title: "Bharaate",
            country: "India",
            releaseDate: "October 18, 2019",
            year: 2019,
            director: "Chethan Kumar",
            writer: "Chethan Kumar",
            cinematographer: "Girish R. Gowda",
            editor: "Srikanth Gowda",
            composer: "Arjun Janya",
            studio: "Sri Jagadguru Chathrapathi Movies"
        }
    ],
    "Deepu S. Kumar": [
        {
            title: "Mungaru Male",
            country: "India",
            releaseDate: "December 29, 2006",
            year: 2006,
            director: "Yogaraj Bhat",
            writer: "Yogaraj Bhat / Preetham Gubbi",
            cinematographer: "S. Krishna",
            editor: "Deepu S. Kumar",
            composer: "Mano Murthy",
            studio: "E K Pictures"
        },
        {
            title: "Tagaru",
            country: "India",
            releaseDate: "February 23, 2018",
            year: 2018,
            director: "Popcorn Monkey Tiger / Suri",
            writer: "Popcorn Monkey Tiger / Suri",
            cinematographer: "Mahendra Simha",
            editor: "Deepu S. Kumar",
            composer: "Charan Raj",
            studio: "Srikanth Enterprises"
        },
        {
            title: "Duniya",
            country: "India",
            releaseDate: "February 23, 2007",
            year: 2007,
            director: "Suri",
            writer: "Suri",
            cinematographer: "Sathya Hegde",
            editor: "Deepu S. Kumar",
            composer: "V. Harikrishna",
            studio: "Samyuktha Hornbill"
        }
    ],
    "Suresh Urs": [
        {
            title: "Roja",
            country: "India",
            releaseDate: "August 15, 1992",
            year: 1992,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "Santosh Sivan",
            editor: "Suresh Urs",
            composer: "A. R. Rahman",
            studio: "Kavithalayaa Productions"
        },
        {
            title: "Bombay",
            country: "India",
            releaseDate: "March 10, 1995",
            year: 1995,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "Rajiv Menon",
            editor: "Suresh Urs",
            composer: "A. R. Rahman",
            studio: "Aalayam Productions / Amitabh Bachchan Corporation"
        },
        {
            title: "Iruvar",
            country: "India",
            releaseDate: "January 14, 1997",
            year: 1997,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "Santosh Sivan",
            editor: "Suresh Urs",
            composer: "A. R. Rahman",
            studio: "Madras Talkies"
        }
    ],
    "Harish Komme": [
        {
            title: "Mufti",
            country: "India",
            releaseDate: "December 1, 2017",
            year: 2017,
            director: "Narthan",
            writer: "Narthan",
            cinematographer: "Naveen Kumar",
            editor: "Harish Komme",
            composer: "Ravi Basrur",
            studio: "Jayanna Combines"
        },
        {
            title: "Daredevil Musthafa",
            country: "India",
            releaseDate: "May 19, 2023",
            year: 2023,
            director: "Shashank Soghal",
            writer: "Shashank Soghal / Anantha Shandy / Raghavendra Mayakonda",
            cinematographer: "Rahul Roy",
            editor: "Harish Komme",
            composer: "Navneet Sham",
            studio: "CINEMANTRA / Jordan Cinema"
        },
        {
            title: "Ammachi Yemba Nenapu",
            country: "India",
            releaseDate: "November 1, 2018",
            year: 2018,
            director: "Champa P. Shetty",
            writer: "Champa P. Shetty",
            cinematographer: "Naveen Kumar Attlabbi",
            editor: "Harish Komme",
            composer: "Ravi Murur",
            studio: "Mayuraa Motion Pictures"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "kannada" || d.region.includes("kannada")));

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
    console.log("Updated js/data.js for Kannada Editors successfully.");
}

updateData().catch(console.error);
