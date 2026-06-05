const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Tropical Malady": "Hypnotic, split-narrative editing that masterfully transitions from urban romance to primal, mythic jungle.",
    "Syndromes and a Century": "Diptyich structure utilizing deliberate pacing and repetition to explore memory and contrasting environments.",
    "Uncle Boonmee Who Can Recall His Past Lives": "Tranquil, elliptical rhythm that gently dissolves the boundaries between the living, the dead, and the natural world.",
    "Bayaning 3rd World": "Meta-cinematic, playful editing that deconstructs historical narrative and challenges traditional biopics.",
    "Sister Stella L.": "Urgent, politically charged pacing that chronicles a profound personal and social awakening amidst labor unrest.",
    "Norte, the End of History": "Monumental, durational pacing relying on profound long takes to explore crime, punishment, and profound moral decay.",
    "From What Is Before": "Immersive, contemplative editing that captures the slow, inevitable creep of martial law into rural consciousness."
};

const moviesByDirector = {
    "Lee Chatametikool": [
        {
            title: "Tropical Malady",
            country: "Thailand / France / Germany / Italy",
            releaseDate: "May 14, 2004",
            year: 2004,
            director: "Apichatpong Weerasethakul",
            writer: "Apichatpong Weerasethakul",
            cinematographer: "Jarin Pengpanitch / Vichit Tanapanitch / Jean-Louis Vialard",
            editor: "Lee Chatametikool",
            studio: "Kick the Machine / Anna Sanders Films / Match Factory"
        },
        {
            title: "Syndromes and a Century",
            country: "Thailand / France / Austria",
            releaseDate: "August 30, 2006",
            year: 2006,
            director: "Apichatpong Weerasethakul",
            writer: "Apichatpong Weerasethakul",
            cinematographer: "Sayombhu Mukdeeprom",
            editor: "Lee Chatametikool",
            studio: "Kick the Machine / Illumination Films"
        },
        {
            title: "Uncle Boonmee Who Can Recall His Past Lives",
            country: "Thailand / United Kingdom / France / Germany / Spain",
            releaseDate: "May 21, 2010",
            year: 2010,
            director: "Apichatpong Weerasethakul",
            writer: "Apichatpong Weerasethakul",
            cinematographer: "Sayombhu Mukdeeprom",
            editor: "Lee Chatametikool",
            studio: "Kick the Machine / Illuminations Films / Match Factory"
        }
    ],
    "Edgardo Vinarao": [
        {
            title: "Bayaning 3rd World",
            country: "Philippines",
            releaseDate: "November 17, 1999",
            year: 1999,
            director: "Mike De Leon",
            writer: "Clodualdo del Mundo Jr. / Mike De Leon",
            cinematographer: "Ding Achacoso",
            editor: "Edgardo Vinarao",
            composer: "Lorrie Ilustre",
            studio: "Cinema Artists Philippines"
        },
        {
            title: "Sister Stella L.",
            country: "Philippines",
            releaseDate: "July 11, 1984",
            year: 1984,
            director: "Mike De Leon",
            writer: "Jose F. Lacaba / Jose Almojuela / Mike De Leon",
            cinematographer: "Rody Lacap",
            editor: "Edgardo Vinarao",
            composer: "Ding Achacoso",
            studio: "Regal Films"
        }
    ],
    "Lawrence S. Ang": [
        {
            title: "Norte, the End of History",
            country: "Philippines",
            releaseDate: "May 18, 2013",
            year: 2013,
            director: "Lav Diaz",
            writer: "Lav Diaz / Rody Vera",
            cinematographer: "Lauro Rene Manda",
            editor: "Lawrence S. Ang",
            studio: "Kino Lorber / Waning Crescent Publications"
        },
        {
            title: "From What Is Before",
            country: "Philippines",
            releaseDate: "August 4, 2014",
            year: 2014,
            director: "Lav Diaz",
            writer: "Lav Diaz",
            cinematographer: "Lav Diaz",
            editor: "Lawrence S. Ang",
            studio: "Sine Olivia Pilipinas"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "southeast-asian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "southeast-asian");

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
    console.log("Updated js/data.js for Southeast Asian Editors successfully.");
}

updateData().catch(console.error);
