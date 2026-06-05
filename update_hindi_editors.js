const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Jaane Bhi Do Yaaro": "Chaotic, razor-sharp rhythm that perfectly balances absurdity and biting social satire.",
    "Parinda": "Taut, relentless pacing that defined the modern Indian gangster genre with visceral intensity.",
    "Bandit Queen": "Raw, uncompromising editing that forces the viewer to confront brutal, systemic violence.",
    "Oye Lucky! Lucky Oye!": "Energetic, street-smart pacing that perfectly mirrors the charming audacity of a smooth-talking thief.",
    "Kahaani": "Tense, masterful editing that slowly unravels a deeply complex, deceptive web of mystery.",
    "LSD: Love, Sex aur Dhokha": "Voyeuristic, fragmented rhythm utilizing found-footage aesthetics to expose contemporary moral decay.",
    "Madhumati": "Lyrical, atmospheric pacing that gracefully intertwines haunting romance and supernatural suspense.",
    "Do Bigha Zamin": "Unflinching, neo-realist rhythm that steadily captures the heartbreaking struggles of an impoverished farmer.",
    "Devdas": "Melancholic, sweeping pacing that beautifully underscores the profound tragedy of doomed love and alcoholism.",
    "Black Friday": "Gritty, investigative momentum that relentlessly pieces together the sprawling, complex aftermath of the 1993 Bombay bombings.",
    "Dev.D": "Trippy, hallucinatory editing that plunges the viewer into a visceral, modern descent into addiction.",
    "Sacred Games (Season 1)": "Expansive, tightly woven rhythm that seamlessly connects vast mythological themes with a high-stakes ticking-clock thriller."
};

const moviesByDirector = {
    "Renu Saluja": [
        {
            title: "Jaane Bhi Do Yaaro",
            country: "India",
            releaseDate: "August 12, 1983",
            year: 1983,
            director: "Kundan Shah",
            writer: "Kundan Shah / Sudhir Mishra",
            cinematographer: "Binod Pradhan",
            editor: "Renu Saluja",
            composer: "Vanraj Bhatia",
            studio: "National Film Development Corporation of India"
        },
        {
            title: "Parinda",
            country: "India",
            releaseDate: "November 3, 1989",
            year: 1989,
            director: "Vidhu Vinod Chopra",
            writer: "Shivkumar Subramaniam / Vidhu Vinod Chopra",
            cinematographer: "Binod Pradhan",
            editor: "Renu Saluja",
            composer: "R. D. Burman",
            studio: "Vinod Chopra Productions"
        },
        {
            title: "Bandit Queen",
            country: "India",
            releaseDate: "January 26, 1996",
            year: 1996,
            director: "Shekhar Kapur",
            writer: "Mala Sen",
            cinematographer: "Ashok Mehta",
            editor: "Renu Saluja",
            composer: "Nusrat Fateh Ali Khan",
            studio: "Kaleidoscope Entertainment"
        }
    ],
    "Namrata Rao": [
        {
            title: "Oye Lucky! Lucky Oye!",
            country: "India",
            releaseDate: "November 28, 2008",
            year: 2008,
            director: "Dibakar Banerjee",
            writer: "Dibakar Banerjee / Urmi Juvekar",
            cinematographer: "Kartik Vijay",
            editor: "Namrata Rao",
            composer: "Sneha Khanwalkar",
            studio: "UTV Spotboy"
        },
        {
            title: "Kahaani",
            country: "India",
            releaseDate: "March 9, 2012",
            year: 2012,
            director: "Sujoy Ghosh",
            writer: "Sujoy Ghosh",
            cinematographer: "Setu",
            editor: "Namrata Rao",
            composer: "Vishal–Shekhar",
            studio: "Boundscript Motion Pictures"
        },
        {
            title: "LSD: Love, Sex aur Dhokha",
            country: "India",
            releaseDate: "March 19, 2010",
            year: 2010,
            director: "Dibakar Banerjee",
            writer: "Dibakar Banerjee / Kanu Behl",
            cinematographer: "Nikos Andritsakis",
            editor: "Namrata Rao",
            composer: "Sneha Khanwalkar",
            studio: "Freshwater Films / ALT Entertainment"
        }
    ],
    "Hrishikesh Mukherjee": [
        {
            title: "Madhumati",
            country: "India",
            releaseDate: "September 12, 1958",
            year: 1958,
            director: "Bimal Roy",
            writer: "Ritwik Ghatak",
            cinematographer: "Dilip Gupta",
            editor: "Hrishikesh Mukherjee",
            composer: "Salil Chowdhury",
            studio: "Bimal Roy Productions"
        },
        {
            title: "Do Bigha Zamin",
            country: "India",
            releaseDate: "May 15, 1953",
            year: 1953,
            director: "Bimal Roy",
            writer: "Hrishikesh Mukherjee",
            cinematographer: "Kamal Bose",
            editor: "Hrishikesh Mukherjee",
            composer: "Salil Chowdhury",
            studio: "Bimal Roy Productions"
        },
        {
            title: "Devdas",
            country: "India",
            releaseDate: "December 30, 1955",
            year: 1955,
            director: "Bimal Roy",
            writer: "Nabendu Ghosh",
            cinematographer: "Kamal Bose",
            editor: "Hrishikesh Mukherjee",
            composer: "S. D. Burman",
            studio: "Bimal Roy Productions"
        }
    ],
    "Aarti Bajaj": [
        {
            title: "Black Friday",
            country: "India",
            releaseDate: "February 9, 2007",
            year: 2007,
            director: "Anurag Kashyap",
            writer: "Anurag Kashyap",
            cinematographer: "Natarajan Subramaniam",
            editor: "Aarti Bajaj",
            composer: "Indian Ocean",
            studio: "Mid Day Multimedia Limited / Jhamu Sughand Networks"
        },
        {
            title: "Dev.D",
            country: "India",
            releaseDate: "February 6, 2009",
            year: 2009,
            director: "Anurag Kashyap",
            writer: "Anurag Kashyap / Vikramaditya Motwane",
            cinematographer: "Rajeev Ravi",
            editor: "Aarti Bajaj",
            composer: "Amit Trivedi",
            studio: "UTV Spotboy"
        },
        {
            title: "Sacred Games (Season 1)",
            country: "India",
            releaseDate: "July 6, 2018",
            year: 2018,
            director: "Anurag Kashyap / Vikramaditya Motwane",
            writer: "Varun Grover / Smita Singh / Vasant Nath",
            cinematographer: "Alokananda Dasgupta / Sylvester Fonseca / Swapnil S. Sonawane",
            editor: "Aarti Bajaj",
            composer: "Alokananda Dasgupta",
            studio: "Phantom Films"
        }
    ]
};

function fetchTMDB(query, year, isTV = false) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    
    let url = `https://api.themoviedb.org/3/search/${isTV ? 'tv' : 'movie'}?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    if (year && !isTV) url += `&year=${year}`;
    if (year && isTV) url += `&first_air_date_year=${year}`;
    
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "hindi" || d.region.includes("hindi")));

        if (dirObj) {
            const requestedMovies = moviesByDirector[dName];
            dirObj.mustWatch = [];
            
            for (let mv of requestedMovies) {
                let isTV = mv.title.includes("Sacred Games");
                let tmdbData = await limit(() => fetchTMDB(mv.title, mv.year, isTV));
                if (!tmdbData.poster || tmdbData.plot === "Plot details not available.") {
                    let fallback = await limit(() => fetchTMDB(mv.title, null, isTV));
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
    console.log("Updated js/data.js for Hindi Editors successfully.");
}

updateData().catch(console.error);
