const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "The Blazing Sun": "Energetic, dramatic editing that captures the fiery passion and conflict of a changing Egyptian society.",
    "Cairo Station": "Tense, claustrophobic pacing that brilliantly amplifies psychological obsession within the confines of a bustling train terminal.",
    "The Land": "Sweeping, socially conscious rhythm that roots the struggle of the peasantry in the monumental landscape.",
    "Moon Knight": "Dynamic, fractured editing reflecting the protagonist's dissociative identity disorder and chaotic supernatural action.",
    "Clash": "Relentless, highly kinetic editing that perfectly traps the audience within the visceral panic of a crowded police van.",
    "The Blue Elephant": "Hallucinatory, non-linear pacing that plunges the viewer into a complex labyrinth of psychological horror and mystery.",
    "The One-Man Show": "Intimate, reflective editing that interweaves personal narrative with the haunting echoes of memory.",
    "Gate #5": "Documentary-style patience that carefully observes the subtle rhythms of daily life and quiet spaces."
};

const moviesByDirector = {
    "Rachida Abdel Salam": [
        {
            title: "The Blazing Sun",
            country: "Egypt",
            releaseDate: "April 3, 1954",
            year: 1954,
            director: "Youssef Chahine",
            writer: "Ali El Zorkani / Helmy Halim",
            cinematographer: "Alevise Orfanelli",
            editor: "Rachida Abdel Salam",
            studio: "Misr S.A.E."
        },
        {
            title: "Cairo Station",
            country: "Egypt",
            releaseDate: "January 22, 1958",
            year: 1958,
            director: "Youssef Chahine",
            writer: "Abdel Hai Adib / Mohamed Abu Youssef",
            cinematographer: "Alvise Orfanelli",
            editor: "Rachida Abdel Salam",
            composer: "Fouad El Zahery",
            studio: "Misr S.A.E."
        },
        {
            title: "The Land",
            country: "Egypt",
            releaseDate: "February 27, 1970",
            year: 1970,
            director: "Youssef Chahine",
            writer: "Abdel Rahman El-Sharqawi / Hassan Fuad",
            cinematographer: "Alevise Orfanelli",
            editor: "Rachida Abdel Salam",
            composer: "Ali Ismael",
            studio: "General Egyptian Cinema Organization"
        }
    ],
    "Ahmed Hafez": [
        {
            title: "Moon Knight",
            country: "United States",
            releaseDate: "March 30, 2022",
            year: 2022,
            director: "Mohamed Diab / Justin Benson / Aaron Moorhead",
            writer: "Jeremy Slater",
            cinematographer: "Gregory Middleton / Andrew Droz Palermo",
            editor: "Ahmed Hafez / Joan Sobel / Cedric Nairn-Smith",
            composer: "Hesham Nazih",
            studio: "Marvel Studios"
        },
        {
            title: "Clash",
            country: "Egypt / France / Germany / United Arab Emirates",
            releaseDate: "May 12, 2016",
            year: 2016,
            director: "Mohamed Diab",
            writer: "Khaled Diab / Mohamed Diab",
            cinematographer: "Ahmed Gabr",
            editor: "Ahmed Hafez",
            composer: "Khaled Dagher",
            studio: "Film Clinic / Sampek Productions / EMC Pictures"
        },
        {
            title: "The Blue Elephant",
            country: "Egypt",
            releaseDate: "July 28, 2014",
            year: 2014,
            director: "Marwan Hamed",
            writer: "Ahmed Mourad",
            cinematographer: "Ahmad Al Morsy",
            editor: "Ahmed Hafez",
            composer: "Hesham Nazih",
            studio: "Al Batros Film / Lighthouse Entertainment"
        }
    ],
    "Simon El Habre": [
        {
            title: "The One-Man Show",
            country: "Lebanon",
            releaseDate: "November 22, 2008",
            year: 2008,
            director: "Simon El Habre",
            writer: "Simon El Habre",
            cinematographer: "Simon El Habre",
            editor: "Simon El Habre",
            composer: "Scrambled Eggs",
            studio: "We Group / Gabriel Chamoun"
        },
        {
            title: "Gate #5",
            country: "Lebanon / United Arab Emirates",
            releaseDate: "December 9, 2011",
            year: 2011,
            director: "Simon El Habre",
            writer: "Simon El Habre",
            cinematographer: "Simon El Habre",
            editor: "Simon El Habre",
            studio: "Beirut DC"
        }
    ]
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    if (year) url += `&year=${year}`;
    if (searchTitle === "Moon Knight") {
        url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}&first_air_date_year=${year}`;
    }
    
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
        let dirObj = editors.find(d => d.name === dName && d.region === "middle-eastern");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "middle-eastern");

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
    console.log("Updated js/data.js for Middle Eastern Editors successfully.");
}

updateData().catch(console.error);
