const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Mirror": "Fluid, nonlinear editing that seamlessly drifts between fragmented memories, dreams, and historical archival footage.",
    "Stalker": "Glacial, hypnotic pacing utilizing long takes to immerse the viewer in existential reflection.",
    "Solaris": "Meditative pacing that juxtaposes the sterile environment of the space station with the overwhelming, organic power of the planet.",
    "Leviathan": "Deliberate, slow-burn editing that meticulously uncovers systemic corruption and inescapable tragedy.",
    "Loveless": "Cold, detached editing that mirrors the emotional void of the characters and the starkness of their environment.",
    "Elena": "Methodical, rhythmic pacing that slowly builds quiet tension, leading to a devastating and inevitable climax.",
    "Wings": "Introspective editing that contrasts the protagonist's mundane present with soaring, fragmented memories of her past.",
    "Walking the Streets of Moscow": "Lyrical, episodic editing that captures the youthful, freewheeling energy of the Khrushchev Thaw.",
    "The Forty-First": "Sweeping, romantic editing that heightens the emotional intensity of a doomed love affair against a stark landscape."
};

const userText = `
Lyudmila Feiginova
Mirror

Country of Origin: Soviet Union

Exact Release Date: March 7, 1975

Director: Andrei Tarkovsky

Screenplay: Aleksandr Misharin / Andrei Tarkovsky

Cinematography: Georgi Rerberg

Editing: Lyudmila Feiginova

Music: Eduard Artemyev

Production Studio: Mosfilm

Stalker

Country of Origin: Soviet Union

Exact Release Date: May 25, 1979

Director: Andrei Tarkovsky

Screenplay: Arkady Strugatsky / Boris Strugatsky

Cinematography: Alexander Knyazhinsky

Editing: Lyudmila Feiginova

Music: Eduard Artemyev

Production Studio: Mosfilm

Solaris

Country of Origin: Soviet Union

Exact Release Date: March 20, 1972

Director: Andrei Tarkovsky

Screenplay: Fridrikh Gorenshtein / Andrei Tarkovsky

Cinematography: Vadim Yusov

Editing: Lyudmila Feiginova

Music: Eduard Artemyev

Production Studio: Mosfilm

Anna Mass
Leviathan

Country of Origin: Russia

Exact Release Date: May 23, 2014

Director: Andrey Zvyagintsev

Screenplay: Oleg Negin / Andrey Zvyagintsev

Cinematography: Mikhail Krichman

Editing: Anna Mass

Music: Philip Glass

Production Studio: Non-Stop Production

Loveless

Country of Origin: Russia / France / Germany / Belgium

Exact Release Date: May 18, 2017

Director: Andrey Zvyagintsev

Screenplay: Oleg Negin / Andrey Zvyagintsev

Cinematography: Mikhail Krichman

Editing: Anna Mass

Music: Evgueni Galperine / Sacha Galperine

Production Studio: Non-Stop Production / Why Not Productions

Elena

Country of Origin: Russia

Exact Release Date: May 21, 2011

Director: Andrey Zvyagintsev

Screenplay: Oleg Negin / Andrey Zvyagintsev

Cinematography: Mikhail Krichman

Editing: Anna Mass

Music: Philip Glass

Production Studio: Non-Stop Production

Lidia Lysenko
Wings

Country of Origin: Soviet Union

Exact Release Date: December 5, 1966

Director: Larisa Shepitko

Screenplay: Valentin Yezhov / Natalya Ryazantseva

Cinematography: Igor Slabnevich

Editing: Lidia Lysenko

Music: Roman Ledenyov

Production Studio: Mosfilm

Walking the Streets of Moscow

Country of Origin: Soviet Union

Exact Release Date: April 11, 1964

Director: Georgi Daneliya

Screenplay: Gennady Shpalikov

Cinematography: Vadim Yusov

Editing: Lidia Lysenko

Music: Andrei Petrov

Production Studio: Mosfilm

The Forty-First

Country of Origin: Soviet Union

Exact Release Date: October 15, 1956

Director: Grigori Chukhrai

Screenplay: Grigori Koltunov

Cinematography: Sergey Urusevsky

Editing: Lidia Lysenko

Music: Nikolai Kryukov

Production Studio: Mosfilm
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Lyudmila Feiginova", "Anna Mass", "Lidia Lysenko"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "russian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "russian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "russian");

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
    console.log("Updated js/data.js for Russian Editors successfully.");
}

updateData().catch(console.error);
