const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Oldboy": "Intense, visceral editing characterized by kinetic transitions, extreme close-ups, and legendary unbroken action sequences.",
    "The Handmaiden": "Intricate, deceptive pacing that utilizes parallel editing to manipulate point-of-view and reveal layered twists.",
    "Decision to Leave": "Elliptical, highly stylized editing that creates a dizzying romantic tension through seamless graphic matches and time jumps.",
    "Parasite": "Flawless, architectural editing that masterfully controls tension and tone while navigating vertical spatial dynamics.",
    "Okja": "Dynamic, breathless pacing that swings wildly between satirical comedy and heart-pounding action.",
    "Memories of Murder": "Gritty, methodical pacing that emphasizes procedural frustration, punctuated by abrupt bursts of violence.",
    "The Chaser": "Relentless, sweat-inducing editing that maintains a frantic, ticking-clock momentum from start to finish.",
    "The Yellow Sea": "Brutal, chaotic action editing that perfectly captures desperate, unchoreographed survival.",
    "I Saw the Devil": "Savage, uncompromising cuts that emphasize the grueling, repetitive cycle of revenge and counter-revenge.",
    "The Good, the Bad, the Weird": "Frenetic, highly stylized action montage paying homage to spaghetti westerns through a uniquely Korean lens."
};

const userText = `
Kim Sang-bum
Oldboy

Country of Origin: South Korea

Exact Release Date: November 21, 2003

Director: Park Chan-wook

Screenplay: Hwang Jo-yun / Lim Jun-hyeong / Park Chan-wook

Cinematography: Chung Chung-hoon

Editing: Kim Sang-bum / Kim Jae-bum

Music: Jo Yeong-wook

Production Studio: Egg Film / Show East

The Handmaiden

Country of Origin: South Korea

Exact Release Date: May 14, 2016

Director: Park Chan-wook

Screenplay: Chung Seo-kyung / Park Chan-wook

Cinematography: Chung Chung-hoon

Editing: Kim Sang-bum / Kim Jae-bum

Music: Jo Yeong-wook

Production Studio: Moho Film / Yong Film

Decision to Leave

Country of Origin: South Korea

Exact Release Date: May 23, 2022

Director: Park Chan-wook

Screenplay: Chung Seo-kyung / Park Chan-wook

Cinematography: Kim Ji-yong

Editing: Kim Sang-bum

Music: Jo Yeong-wook

Production Studio: Moho Film

Yang Jin-mo
Parasite

Country of Origin: South Korea

Exact Release Date: May 21, 2019

Director: Bong Joon-ho

Screenplay: Bong Joon-ho / Han Jin-won

Cinematography: Hong Kyung-pyo

Editing: Yang Jin-mo

Music: Jung Jae-il

Production Studio: Barunson E&A

Okja

Country of Origin: South Korea / United States

Exact Release Date: May 19, 2017

Director: Bong Joon-ho

Screenplay: Bong Joon-ho / Jon Ronson

Cinematography: Darius Khondji

Editing: Yang Jin-mo

Music: Jung Jae-il

Production Studio: Plan B Entertainment / Lewis Pictures / Kate Street Picture Company

Kim Sun-min
Memories of Murder

Country of Origin: South Korea

Exact Release Date: May 2, 2003

Director: Bong Joon-ho

Screenplay: Bong Joon-ho / Shim Sung-bo

Cinematography: Kim Hyung-koo

Editing: Kim Sun-min

Music: Tarō Iwashiro

Production Studio: CJ Entertainment / Sidus Pictures

The Chaser

Country of Origin: South Korea

Exact Release Date: February 14, 2008

Director: Na Hong-jin

Screenplay: Na Hong-jin / Shinho Lee / Hong Won-chan

Cinematography: Lee Sung-je

Editing: Kim Sun-min

Music: Choi Yong-rock / Kim Jun-seok

Production Studio: Bidangil Pictures

The Yellow Sea

Country of Origin: South Korea

Exact Release Date: December 22, 2010

Director / Screenplay: Na Hong-jin

Cinematography: Lee Sung-je

Editing: Kim Sun-min

Music: Jang Young-gyu / Lee Byung-hoon

Production Studio: Popcorn Film

Nam Na-young
I Saw the Devil

Country of Origin: South Korea

Exact Release Date: August 12, 2010

Director: Kim Jee-woon

Screenplay: Park Hoon-jung

Cinematography: Lee Mo-gae

Editing: Nam Na-young

Music: Mowg

Production Studio: Peppermint & Company / Syun Man Pictures

The Good, the Bad, the Weird

Country of Origin: South Korea

Exact Release Date: May 24, 2008

Director: Kim Jee-woon

Screenplay: Kim Jee-woon / Kim Min-suk

Cinematography: Lee Mo-gae / Oh Seung-chul

Editing: Nam Na-young

Music: Dalpalan / Jang Young-gyu

Production Studio: Barunson Film Division / Grim Pictures
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Kim Sang-bum", "Yang Jin-mo", "Kim Sun-min", "Nam Na-young"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "korean");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "korean");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "korean");

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
    console.log("Updated js/data.js for Korean Editors successfully.");
}

updateData().catch(console.error);
