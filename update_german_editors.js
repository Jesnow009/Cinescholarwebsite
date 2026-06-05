const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "The American Friend": "Deliberate, atmospheric editing that slowly builds existential dread and tension.",
    "Paris, Texas": "Lyrical, meditative pacing that emphasizes vast landscapes and profound emotional isolation.",
    "Wings of Desire": "Poetic, floating transitions that seamlessly shift between subjective angelic perspectives and gritty reality.",
    "Run Lola Run": "Hyper-kinetic, high-octane editing that constantly rewinds and re-paces the same narrative.",
    "Citizenfour": "Tense, real-time documentary editing that perfectly captures unfolding paranoia and historical gravity.",
    "The Marriage of Maria Braun": "Sharp, unsentimental cuts that reflect the protagonist's cold ambition amidst historical ruins.",
    "Veronika Voss": "Stylized, jarring montage that evokes classical Hollywood melodrama while exposing deep psychological decay.",
    "The Lives of Others": "Meticulously measured pacing that builds subtle, agonizing tension through surveillance and silence.",
    "Never Look Away": "Sweeping, epic narrative pacing that traverses decades of history and artistic evolution."
};

const userText = `
Peter Przygodda
The American Friend

Country of Origin: West Germany / France

Exact Release Date: May 18, 1977

Director / Screenplay: Wim Wenders

Cinematography: Robby Müller

Editing: Peter Przygodda

Music: Jürgen Knieper

Production Studio: Road Movies Filmproduktion / Les Films du Losange

Paris, Texas

Country of Origin: West Germany / France / United Kingdom / United States

Exact Release Date: May 14, 1984

Director: Wim Wenders

Screenplay: Sam Shepard

Cinematography: Robby Müller

Editing: Peter Przygodda

Music: Ry Cooder

Production Studio: Road Movies Filmproduktion / Argos Films

Wings of Desire

Country of Origin: West Germany / France

Exact Release Date: May 17, 1987

Director: Wim Wenders

Screenplay: Wim Wenders / Peter Handke

Cinematography: Henri Alekan

Editing: Peter Przygodda

Music: Jürgen Knieper

Production Studio: Road Movies Filmproduktion / Argos Films

Mathilde Bonnefoy
Run Lola Run

Country of Origin: Germany

Exact Release Date: August 20, 1998

Director / Screenplay: Tom Tykwer

Cinematography: Frank Griebe

Editing: Mathilde Bonnefoy

Music: Tom Tykwer / Johnny Klimek / Reinhold Heil

Production Studio: X-Filme Creative Pool

Citizenfour

Country of Origin: United States / Germany / United Kingdom

Exact Release Date: October 10, 2014

Director: Laura Poitras

Cinematography: Laura Poitras / Kirsten Johnson / Trevor Paglen

Editing: Mathilde Bonnefoy

Production Studio: Praxis Films / Participant Media / HBO Documentary Films

Juliane Lorenz
The Marriage of Maria Braun

Country of Origin: West Germany

Exact Release Date: February 20, 1979

Director: Rainer Werner Fassbinder

Screenplay: Peter Märthesheimer / Pea Fröhlich

Cinematography: Michael Ballhaus

Editing: Juliane Lorenz

Music: Peer Raben

Production Studio: Albatros Filmproduktion / Trio Film

Veronika Voss

Country of Origin: West Germany

Exact Release Date: February 18, 1982

Director: Rainer Werner Fassbinder

Screenplay: Peter Märthesheimer / Pea Fröhlich

Cinematography: Xaver Schwarzenberger

Editing: Juliane Lorenz

Music: Peer Raben

Production Studio: Laura Film / Tango Film

Patricia Rommel
The Lives of Others

Country of Origin: Germany

Exact Release Date: March 23, 2006

Director / Screenplay: Florian Henckel von Donnersmarck

Cinematography: Hagen Bogdanski

Editing: Patricia Rommel

Music: Gabriel Yared / Stéphane Moucha

Production Studio: Wiedemann & Berg Filmproduktion

Never Look Away

Country of Origin: Germany / Italy

Exact Release Date: September 4, 2018

Director / Screenplay: Florian Henckel von Donnersmarck

Cinematography: Caleb Deschanel

Editing: Patricia Rommel

Music: Max Richter

Production Studio: Pergamon Film / Wiedemann & Berg Filmproduktion
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Peter Przygodda", "Mathilde Bonnefoy", "Juliane Lorenz", "Patricia Rommel"
];

const knownKeys = [
    "Country of Origin", "Exact Release Date", "Director", "Director / Screenplay",
    "Screenplay", "Cinematography", "Editing", "Music", "Production Studio"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "german");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "german");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "german");

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
    console.log("Updated js/data.js for German Editors successfully.");
}

updateData().catch(console.error);
