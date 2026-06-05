const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Baahubali: The Beginning": "Epic, sweeping pacing that meticulously establishes grand scale and monumental myth-building.",
    "Baahubali 2: The Conclusion": "High-octane, majestic rhythm that seamlessly weaves intense emotion with breathtaking, larger-than-life action.",
    "Eega": "Inventive, relentless editing that flawlessly executes high-stakes revenge from a microscopic perspective.",
    "Pokiri": "Razor-sharp, mass-appealing rhythm that perfectly balances explosive action with slick, charismatic tension.",
    "Arundhati": "Atmospheric, gripping pacing that expertly sustains a terrifying blend of folklore and supernatural dread.",
    "Bommarillu": "Warm, relatable rhythm that beautifully maps the heartfelt, conflicting emotions of youthful independence.",
    "1: Nenokkadine": "Complex, cerebral editing that masterfully blurs the lines between reality and psychological hallucination.",
    "Mathu Vadalara": "Quirky, fast-paced rhythm that brilliantly elevates a chaotic, darkly comedic series of errors.",
    "Antariksham 9000 KMPH": "Tense, precise pacing that effectively grounds the high-stakes, perilous isolation of deep space exploration."
};

const moviesByDirector = {
    "Kotagiri Venkateswara Rao": [
        {
            title: "Baahubali: The Beginning",
            country: "India",
            releaseDate: "July 10, 2015",
            year: 2015,
            director: "S. S. Rajamouli",
            writer: "S. S. Rajamouli",
            cinematographer: "K. K. Senthil Kumar",
            editor: "Kotagiri Venkateswara Rao",
            composer: "M. M. Keeravani",
            studio: "Arka Media Works"
        },
        {
            title: "Baahubali 2: The Conclusion",
            country: "India",
            releaseDate: "April 28, 2017",
            year: 2017,
            director: "S. S. Rajamouli",
            writer: "S. S. Rajamouli",
            cinematographer: "K. K. Senthil Kumar",
            editor: "Kotagiri Venkateswara Rao",
            composer: "M. M. Keeravani",
            studio: "Arka Media Works"
        },
        {
            title: "Eega",
            country: "India",
            releaseDate: "July 6, 2012",
            year: 2012,
            director: "S. S. Rajamouli",
            writer: "S. S. Rajamouli",
            cinematographer: "K. K. Senthil Kumar",
            editor: "Kotagiri Venkateswara Rao",
            composer: "M. M. Keeravani",
            studio: "Vaaraahi Chalana Chitram"
        }
    ],
    "Marthand K. Venkatesh": [
        {
            title: "Pokiri",
            country: "India",
            releaseDate: "April 28, 2006",
            year: 2006,
            director: "Puri Jagannadh",
            writer: "Puri Jagannadh",
            cinematographer: "Shyam K. Naidu",
            editor: "Marthand K. Venkatesh",
            composer: "Mani Sharma",
            studio: "Vaishno Academy / Indira Productions"
        },
        {
            title: "Arundhati",
            country: "India",
            releaseDate: "January 16, 2009",
            year: 2009,
            director: "Kodi Ramakrishna",
            writer: "Matti Shyam Prasad",
            cinematographer: "K. K. Senthil Kumar",
            editor: "Marthand K. Venkatesh",
            composer: "Koti",
            studio: "Mallemala Entertainments"
        },
        {
            title: "Bommarillu",
            country: "India",
            releaseDate: "August 9, 2006",
            year: 2006,
            director: "Bhaskar",
            writer: "Bhaskar / Abburi Ravi",
            cinematographer: "Vijay C. Kumar",
            editor: "Marthand K. Venkatesh",
            composer: "Devi Sri Prasad",
            studio: "Sri Venkateswara Creations"
        }
    ],
    "Karthika Srinivas": [
        {
            title: "1: Nenokkadine",
            country: "India",
            releaseDate: "January 10, 2014",
            year: 2014,
            director: "Sukumar",
            writer: "Sukumar",
            cinematographer: "R. Rathnavelu",
            editor: "Karthika Srinivas",
            composer: "Devi Sri Prasad",
            studio: "14 Reels Entertainment"
        },
        {
            title: "Mathu Vadalara",
            country: "India",
            releaseDate: "December 25, 2019",
            year: 2019,
            director: "Ritesh Rana",
            writer: "Ritesh Rana",
            cinematographer: "Suresh Sarangam",
            editor: "Karthika Srinivas",
            composer: "Kaala Bhairava",
            studio: "Clap Entertainment / Mythri Movie Makers"
        },
        {
            title: "Antariksham 9000 KMPH",
            country: "India",
            releaseDate: "December 21, 2018",
            year: 2018,
            director: "Sankalp Reddy",
            writer: "Sankalp Reddy",
            cinematographer: "Gnanasekar V. S.",
            editor: "Karthika Srinivas",
            composer: "Prashanth R. Vihari",
            studio: "First Frame Entertainments"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "telugu" || d.region.includes("telugu")));

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
    console.log("Updated js/data.js for Telugu Editors successfully.");
}

updateData().catch(console.error);
