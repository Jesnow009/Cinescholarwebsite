const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Man with a Movie Camera": "Pioneering montage utilizing rapid cuts, double exposures, and split screens to capture urban rhythm.",
    "Three Songs About Lenin": "Propagandistic but poetic montage that blends archival footage with striking graphic compositions.",
    "Battleship Potemkin": "Revolutionary 'montage of attractions' designed to provoke visceral, emotional shocks in the audience.",
    "October (Ten Days That Shook the World)": "Intellectual montage combining disparate images to generate complex political and philosophical metaphors.",
    "Strike": "Aggressive, collision-based editing that juxtaposes striking workers with slaughterhouse imagery.",
    "By the Law": "Tense, minimalist editing emphasizing psychological claustrophobia and raw human survival.",
    "The Extraordinary Adventures of Mr. West in the Land of the Bolsheviks": "Fast-paced, dynamic editing showcasing early application of the Kuleshov Effect to manipulate spatial continuity.",
    "The Fall of the Romanov Dynasty": "Groundbreaking compilation film that redefined editing by entirely repurposing existing archival newsreels.",
    "The Great Road": "Masterful archival montage celebrating a decade of Soviet history through precisely organized historical footage."
};

const userText = `
Elizaveta Svilova
Man with a Movie Camera

Country of Origin: Soviet Union

Exact Release Date: January 8, 1929

Director: Dziga Vertov

Screenplay: Dziga Vertov

Cinematography: Mikhail Kaufman

Editing: Elizaveta Svilova

Production Studio: VUFKU

Three Songs About Lenin

Country of Origin: Soviet Union

Exact Release Date: November 1, 1934

Director: Dziga Vertov

Screenplay: Dziga Vertov

Cinematography: Dmitri Surensky / Mark Magidson / Benjamin Monastirsky

Editing: Elizaveta Svilova

Production Studio: Mezhrabpomfilm

Sergei Eisenstein
Battleship Potemkin

Country of Origin: Soviet Union

Exact Release Date: December 21, 1925

Director: Sergei Eisenstein

Screenplay: Nina Agadzhanova / Sergei Eisenstein

Cinematography: Eduard Tisse

Editing: Sergei Eisenstein

Music: Edmund Meisel (1926 score)

Production Studio: Mosfilm / Goskino

October (Ten Days That Shook the World)

Country of Origin: Soviet Union

Exact Release Date: March 14, 1928

Director: Sergei Eisenstein / Grigori Aleksandrov

Screenplay: Sergei Eisenstein / Grigori Aleksandrov

Cinematography: Eduard Tisse

Editing: Sergei Eisenstein / Grigori Aleksandrov

Production Studio: Sovkino

Strike

Country of Origin: Soviet Union

Exact Release Date: April 28, 1925

Director: Sergei Eisenstein

Screenplay: Valeriyan Pletnyov / Ilya Kravchunovsky / Sergei Eisenstein

Cinematography: Eduard Tisse

Editing: Sergei Eisenstein

Production Studio: Proletkult / Goskino

Lev Kuleshov
By the Law

Country of Origin: Soviet Union

Exact Release Date: December 3, 1926

Director: Lev Kuleshov

Screenplay: Viktor Shklovsky

Cinematography: Konstantin Kuznetsov

Editing: Lev Kuleshov

Production Studio: Goskino

The Extraordinary Adventures of Mr. West in the Land of the Bolsheviks

Country of Origin: Soviet Union

Exact Release Date: April 27, 1924

Director: Lev Kuleshov

Screenplay: Nikolai Aseev

Cinematography: Aleksandr Levitsky

Editing: Lev Kuleshov

Production Studio: Goskino

Esfir Shub
The Fall of the Romanov Dynasty

Country of Origin: Soviet Union

Exact Release Date: March 11, 1927

Director / Screenplay / Editing: Esfir Shub

Production Studio: Sovkino

The Great Road

Country of Origin: Soviet Union

Exact Release Date: November 6, 1927

Director / Screenplay / Editing: Esfir Shub

Production Studio: Sovkino
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Elizaveta Svilova", "Sergei Eisenstein", "Lev Kuleshov", "Esfir Shub"
];

const knownKeys = [
    "Country of Origin", "Exact Release Date", "Director", "Director / Screenplay",
    "Director / Screenplay / Editing", "Screenplay", "Cinematography", "Editing", 
    "Music", "Production Studio"
];

function isProperty(line) {
    return knownKeys.some(k => line.startsWith(k + ':'));
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (knownDirectors.includes(line)) {
        if (currentMovieObj && currentMovieTitle && currentDirector) {
            moviesByDirector[currentDirector].push(currentMovieObj);
        }
        
        currentDirector = line;
        if (!moviesByDirector[currentDirector]) {
            moviesByDirector[currentDirector] = [];
        }
        currentMovieObj = null;
        currentMovieTitle = '';
        continue;
    }

    if (!isProperty(line) && currentDirector && !knownDirectors.includes(line)) {
        if (currentMovieObj && currentMovieTitle) {
            moviesByDirector[currentDirector].push(currentMovieObj);
        }
        currentMovieTitle = line;
        currentMovieObj = {
            title: currentMovieTitle,
            year: '',
            releaseDate: '',
            country: ''
        };
        continue;
    }

    if (isProperty(line) && currentMovieObj) {
        const parts = line.split(':');
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        
        if (key === 'Country of Origin') {
            currentMovieObj.country = value;
        } else if (key === 'Exact Release Date') {
            currentMovieObj.releaseDate = value;
            const match = value.match(/\b(19|20)\d{2}\b/);
            if (match) currentMovieObj.year = parseInt(match[0], 10);
        } else if (key.includes('Director')) {
            currentMovieObj.director = value;
            if (key.includes('Screenplay')) currentMovieObj.writer = value;
            if (key.includes('Editing')) currentMovieObj.editor = value;
        } else if (key === 'Screenplay') {
            currentMovieObj.writer = value;
        } else if (key === 'Cinematography') {
            currentMovieObj.cinematographer = value;
        } else if (key === 'Editing') {
            currentMovieObj.editor = value;
        } else if (key === 'Music') {
            currentMovieObj.composer = value;
        } else if (key === 'Production Studio') {
            currentMovieObj.studio = value;
        }
    }
}

if (currentMovieObj && currentMovieTitle && currentDirector) {
    moviesByDirector[currentDirector].push(currentMovieObj);
}

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
        let dirObj = editors.find(d => d.name === dName && d.region === "soviet");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "soviet");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "soviet");

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
    console.log("Updated js/data.js for Soviet Editors successfully.");
}

updateData().catch(console.error);
