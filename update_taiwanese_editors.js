const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "A City of Sadness": "Deliberate, long-take editing that constructs a detached yet deeply empathetic historical observation.",
    "The Assassin": "Poetic, elliptical editing that emphasizes atmosphere, stillness, and fleeting bursts of violence over conventional action pacing.",
    "The Puppetmaster": "Meditative, fragmented pacing blending documentary aesthetics with historical reenactments.",
    "A Brighter Summer Day": "Measured, meticulous pacing that allows the sprawling narrative of 1960s youth gangs to gradually boil over into tragedy.",
    "Yi Yi": "Patient, tender rhythm reflecting the complex, intertwining rhythms of a multi-generational family.",
    "Mahjong": "Kinetic, cynical editing capturing the frantic, hyper-capitalist chaos of 1990s Taipei."
};

const moviesByDirector = {
    "Liao Ching-sung": [
        {
            title: "A City of Sadness",
            country: "Taiwan",
            releaseDate: "September 15, 1989",
            year: 1989,
            director: "Hou Hsiao-hsien",
            writer: "Chu T’ien-wen / Wu Nien-jen",
            cinematographer: "Mark Lee Ping-bin",
            editor: "Liao Ching-sung",
            composer: "S.E.N.S.",
            studio: "3-H Films"
        },
        {
            title: "The Assassin",
            country: "Taiwan / China / Hong Kong",
            releaseDate: "August 27, 2015",
            year: 2015,
            director: "Hou Hsiao-hsien",
            writer: "Chu T’ien-wen / Ah Cheng / Hou Hsiao-hsien",
            cinematographer: "Mark Lee Ping-bin",
            editor: "Liao Ching-sung / Huang Shih-ching",
            composer: "Lim Giong",
            studio: "SpotFilms / Sil-Metropole Organisation / Media Asia Film"
        },
        {
            title: "The Puppetmaster",
            country: "Taiwan",
            releaseDate: "September 11, 1993",
            year: 1993,
            director: "Hou Hsiao-hsien",
            writer: "Chu T’ien-wen / Wu Nien-jen",
            cinematographer: "Mark Lee Ping-bin",
            editor: "Liao Ching-sung",
            composer: "Chen Ming-chang",
            studio: "City Films / Era International"
        }
    ],
    "Chen Po-wen": [
        {
            title: "A Brighter Summer Day",
            country: "Taiwan",
            releaseDate: "July 27, 1991",
            year: 1991,
            director: "Edward Yang",
            writer: "Edward Yang / Yan Hongya / Yang Shunqing / Lai Mingtang",
            cinematographer: "Zhang Hui-gong / Li Long-yu",
            editor: "Chen Po-wen",
            studio: "Yang & His Gang Filmmakers / Jane Balfour Films"
        },
        {
            title: "Yi Yi",
            country: "Taiwan / Japan",
            releaseDate: "September 20, 2000",
            year: 2000,
            director: "Edward Yang",
            writer: "Edward Yang",
            cinematographer: "Yang Wei-han",
            editor: "Chen Po-wen",
            composer: "Peng Kaili",
            studio: "1+2 Seisaku Committee / Pony Canyon / Omega Project"
        },
        {
            title: "Mahjong",
            country: "Taiwan",
            releaseDate: "May 11, 1996",
            year: 1996,
            director: "Edward Yang",
            writer: "Edward Yang",
            cinematographer: "Li Long-yu / Arthur Wong / Zhang Zhan",
            editor: "Chen Po-wen",
            studio: "Atom Films / Edward Yang Studio"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "taiwanese");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && d.region === "taiwanese");

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
    console.log("Updated js/data.js for Taiwanese Editors successfully.");
}

updateData().catch(console.error);
