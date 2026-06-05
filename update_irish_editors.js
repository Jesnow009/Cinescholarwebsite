const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Room": "Claustrophobic, highly subjective editing that shifts drastically to convey a child's expanded worldview.",
    "Frank": "Quirky, rhythm-driven editing that balances off-beat comedy with deep psychological melancholy.",
    "Belfast": "Nostalgic, fluid memory-piece editing that interweaves intimate family moments with sudden societal violence.",
    "Stan & Ollie": "Seamless, precise comedic timing and tender pacing reflecting the enduring bond of the duo.",
    "Gaza": "Evocative, rhythmic documentary editing that juxtaposes everyday life against a backdrop of conflict.",
    "Nothing Compares": "Sharp, incisive archival montage that recontextualizes a misunderstood icon's cultural impact.",
    "Still: A Michael J. Fox Movie": "Kinetic, highly engaging documentary editing that masterfully blends archival footage, reenactments, and candid interviews.",
    "Three Identical Strangers": "Masterful suspense-building documentary editing that slowly unravels a shocking, multi-layered mystery."
};

const userText = `
Nathan Nugent
Room

Country of Origin: Ireland / Canada / United Kingdom / United States

Exact Release Date: September 4, 2015

Director: Lenny Abrahamson

Screenplay: Emma Donoghue

Cinematography: Danny Cohen

Editing: Nathan Nugent

Music: Stephen Rennicks

Production Studio: Element Pictures / No Trace Camping

Frank

Country of Origin: Ireland / United Kingdom

Exact Release Date: January 17, 2014

Director: Lenny Abrahamson

Screenplay: Jon Ronson / Peter Straughan

Cinematography: James Mather

Editing: Nathan Nugent

Music: Stephen Rennicks

Production Studio: Element Pictures / Film4 Productions

Úna Ní Dhonghaíle
Belfast

Country of Origin: United Kingdom / Ireland

Exact Release Date: September 2, 2021

Director / Screenplay: Kenneth Branagh

Cinematography: Haris Zambarloukos

Editing: Úna Ní Dhonghaíle

Music: Van Morrison

Production Studio: TKBC

Stan & Ollie

Country of Origin: United Kingdom / United States / Canada

Exact Release Date: October 21, 2018

Director: Jon S. Baird

Screenplay: Jeff Pope

Cinematography: Laurie Rose

Editing: Úna Ní Dhonghaíle

Music: Rolfe Kent

Production Studio: BBC Film / Fable Pictures

Mick Mahon
Gaza

Country of Origin: Ireland / Canada / Germany

Exact Release Date: January 29, 2019

Director: Garry Keane / Andrew McConnell

Cinematography: Andrew McConnell

Editing: Mick Mahon

Music: Ray Harman

Production Studio: Real Films / Fine Point Films / Filmoption International

Nothing Compares

Country of Origin: Ireland / United Kingdom / United States

Exact Release Date: January 21, 2022

Director: Kathryn Ferguson

Cinematography: Luke Jacobs

Editing: Mick Mahon

Music: John Reynolds / Clare Kenny

Production Studio: Tara Films / Field of Vision / BFI

Michael Harte
Still: A Michael J. Fox Movie

Country of Origin: United States

Exact Release Date: January 20, 2023

Director: Davis Guggenheim

Cinematography: C. Kim Miles / Julia Liu

Editing: Michael Harte

Music: John Powell

Production Studio: Concordia Studio

Three Identical Strangers

Country of Origin: United Kingdom / United States

Exact Release Date: January 19, 2018

Director: Tim Wardle

Cinematography: Tim Cragg

Editing: Michael Harte

Music: Paul Saunderson

Production Studio: RAW / CNN Films / Channel 4
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Nathan Nugent", "Úna Ní Dhonghaíle", "Mick Mahon", "Michael Harte"
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
    if (searchTitle.includes(': A Michael J. Fox Movie')) {
        searchTitle = "Still A Michael J. Fox Movie";
    }
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
        let dirObj = editors.find(d => d.name === dName && d.region === "irish");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "irish");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "irish");

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
    console.log("Updated js/data.js for Irish Editors successfully.");
}

updateData().catch(console.error);
