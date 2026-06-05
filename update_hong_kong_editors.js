const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "In the Mood for Love": "Sensuous, elliptical editing that emphasizes suppressed desires and atmospheric mood through rhythmic slow-motion and recurring musical motifs.",
    "Chungking Express": "Kinetic, highly stylized editing using step-printing and jump cuts to evoke the frenetic energy and fleeting romance of 90s Hong Kong.",
    "The Grandmaster": "Graceful, meticulously choreographed editing that turns martial arts into poetic, melancholic ballet, emphasizing fluid movement and stillness.",
    "Hard Boiled": "Explosive, relentless action editing that perfectly captures the legendary, bullet-riddled chaos of John Woo's gun-fu masterpieces.",
    "A Chinese Ghost Story": "Frenetic, highly kinetic editing that seamlessly blends traditional wire-fu action with supernatural romantic fantasy.",
    "Bullet in the Head": "Gritty, chaotic action editing that matches the bleak, brutal reality of the Vietnam War and the destruction of brotherhood.",
    "Comrades: Almost a Love Story": "Poignant, measured pacing that elegantly spans a decade of near-misses and intersecting lives across two cities.",
    "Cold War": "Slick, rapid-fire pacing that perfectly orchestrates the intense procedural tension and complex inter-departmental politics."
};

const moviesByDirector = {
    "William Chang Suk-ping": [
        {
            title: "In the Mood for Love",
            country: "Hong Kong",
            releaseDate: "September 29, 2000",
            year: 2000,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle / Mark Lee Ping-bin",
            editor: "William Chang",
            composer: "Michael Galasso / Shigeru Umebayashi",
            studio: "Block 2 Pictures / Jet Tone Production"
        },
        {
            title: "Chungking Express",
            country: "Hong Kong",
            releaseDate: "July 14, 1994",
            year: 1994,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle / Andrew Lau",
            editor: "William Chang / Kai Kit-wai / Kwong Chi-leung",
            composer: "Frankie Chan / Roel A. Garcia",
            studio: "Jet Tone Production"
        },
        {
            title: "The Grandmaster",
            country: "Hong Kong / China",
            releaseDate: "January 8, 2013",
            year: 2013,
            director: "Wong Kar-wai",
            writer: "Zou Jingzhi / Xu Haofeng / Wong Kar-wai",
            cinematographer: "Philippe Le Sourd",
            editor: "William Chang / Benjamin Courtines / Poon Hung-yiu",
            composer: "Shigeru Umebayashi / Nathaniel Méchaly",
            studio: "Jet Tone Production / Sil-Metropole Organisation / Bona International Film Group"
        }
    ],
    "David Wu": [
        {
            title: "Hard Boiled",
            country: "Hong Kong",
            releaseDate: "April 16, 1992",
            year: 1992,
            director: "John Woo",
            writer: "Barry Wong",
            cinematographer: "Wang Wing-heng",
            editor: "David Wu / John Woo / Kit Wai-kai / Jack Ah",
            composer: "Michael Gibbs",
            studio: "Milestone Pictures / Golden Princess Film Production"
        },
        {
            title: "A Chinese Ghost Story",
            country: "Hong Kong",
            releaseDate: "July 18, 1987",
            year: 1987,
            director: "Ching Siu-tung",
            writer: "Yuen Kai-chi",
            cinematographer: "Poon Hang-sang / Sander Lee / Tom Lau / Wong Wing-hang",
            editor: "David Wu",
            composer: "Romeo Diaz / James Wong",
            studio: "Film Workshop"
        },
        {
            title: "Bullet in the Head",
            country: "Hong Kong",
            releaseDate: "August 17, 1990",
            year: 1990,
            director: "John Woo",
            writer: "John Woo / Janet Chun / Patrick Leung",
            cinematographer: "Ardy Lam / Wilson Chan / Wong Wing-hang / Somchai Kittikun",
            editor: "David Wu",
            composer: "James Wong",
            studio: "John Woo Production / Golden Princess Film Production"
        }
    ],
    "Eric Kwong": [
        {
            title: "Comrades: Almost a Love Story",
            country: "Hong Kong",
            releaseDate: "November 2, 1996",
            year: 1996,
            director: "Peter Chan",
            writer: "Ivy Ho",
            cinematographer: "Jingle Ma",
            editor: "Kwong Chi-leung",
            composer: "Chiu Tsang-hei",
            studio: "UFO - United Filmmakers Organization"
        },
        {
            title: "Cold War",
            country: "Hong Kong",
            releaseDate: "November 8, 2012",
            year: 2012,
            director: "Longman Leung / Sunny Luk",
            writer: "Longman Leung / Sunny Luk",
            cinematographer: "Jason Kwan / Kenny Tse",
            editor: "Kwong Chi-leung / Ron Chan",
            composer: "Peter Kam",
            studio: "Irresistible Alpha / Edko Films / Sil-Metropole Organisation"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "hong-kong");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "hong-kong");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "hong-kong");

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
    console.log("Updated js/data.js for Hong Kong Editors successfully.");
}

updateData().catch(console.error);
