const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Lawrence of Arabia": "Epic pacing and the most famous match-cut in cinema history (match to sunrise).",
    "The Elephant Man": "Dreamlike, rhythmic transitions and pacing that balance empathy and surrealism.",
    "Out of Sight": "Slick, stylized non-linear editing with dynamic freeze-frames and chronological shifts.",
    "Slumdog Millionaire": "Kinetic, high-energy cross-cutting across multiple timelines.",
    "Shaun of the Dead": "Hyper-stylized, comedic rapid-fire montage and precise audio-sync editing.",
    "American Beauty": "Lyrical, deliberate pacing that emphasizes emotional weight and dream sequences.",
    "The King's Speech": "Meticulous pacing that perfectly captures the rhythm and tension of speech and hesitation.",
    "127 Hours": "High-octane, hallucinatory editing utilizing split-screens to convey isolation and desperation.",
    "Snatch": "Ultra-fast, stylized, and chaotic rhythmic editing that defines modern British crime films.",
    "49th Parallel": "Taut, suspenseful narrative pacing in an early WWII propaganda thriller.",
    "Pygmalion": "Sharp, fluid dialogue editing that flawlessly translates stage rhythms to the screen."
};

const userText = `
Anne V. Coates
Lawrence of Arabia

Country of Origin: United Kingdom / United States

Exact Release Date: December 10, 1962

Director: David Lean

Screenplay: Robert Bolt / Michael Wilson

Cinematography: Freddie Young

Editing: Anne V. Coates

Music: Maurice Jarre

Production Studio: Horizon Pictures

The Elephant Man

Country of Origin: United Kingdom / United States

Exact Release Date: October 3, 1980

Director: David Lynch

Screenplay: Christopher De Vore / Eric Bergren / David Lynch

Cinematography: Freddie Francis

Editing: Anne V. Coates

Music: John Morris

Production Studio: Brooksfilms

Out of Sight

Country of Origin: United States

Exact Release Date: June 26, 1998

Director: Steven Soderbergh

Screenplay: Scott Frank

Cinematography: Elliot Davis

Editing: Anne V. Coates

Music: David Holmes

Production Studio: Jersey Films

Chris Dickens
Slumdog Millionaire

Country of Origin: United Kingdom / United States

Exact Release Date: August 30, 2008

Director: Danny Boyle

Screenplay: Simon Beaufoy

Cinematography: Anthony Dod Mantle

Editing: Chris Dickens

Music: A. R. Rahman

Production Studio: Celador Films / Film4 Productions

Shaun of the Dead

Country of Origin: United Kingdom / France

Exact Release Date: April 9, 2004

Director: Edgar Wright

Screenplay: Simon Pegg / Edgar Wright

Cinematography: David M. Dunlap

Editing: Chris Dickens

Music: Daniel Mudford / Pete Woodhead

Production Studio: Working Title Films / Big Talk Studios

Tariq Anwar
American Beauty

Country of Origin: United States

Exact Release Date: September 8, 1999

Director: Sam Mendes

Screenplay: Alan Ball

Cinematography: Conrad L. Hall

Editing: Tariq Anwar / Christopher Greenbury

Music: Thomas Newman

Production Studio: Jinks/Cohen Company

The King's Speech

Country of Origin: United Kingdom / United States

Exact Release Date: September 6, 2010

Director: Tom Hooper

Screenplay: David Seidler

Cinematography: Danny Cohen

Editing: Tariq Anwar

Music: Alexandre Desplat

Production Studio: See-Saw Films / Bedlam Productions

Jon Harris
127 Hours

Country of Origin: United Kingdom / United States

Exact Release Date: September 4, 2010

Director: Danny Boyle

Screenplay: Danny Boyle / Simon Beaufoy

Cinematography: Anthony Dod Mantle / Enrique Chediak

Editing: Jon Harris

Music: A. R. Rahman

Production Studio: Pathé / Film4 Productions / Plan B Entertainment

Snatch

Country of Origin: United Kingdom / United States

Exact Release Date: August 23, 2000

Director / Screenplay: Guy Ritchie

Cinematography: Tim Maurice-Jones

Editing: Jon Harris

Music: John Murphy

Production Studio: Ska Films

David Lean
49th Parallel

Country of Origin: United Kingdom

Exact Release Date: October 8, 1941

Director: Michael Powell

Screenplay: Rodney Ackland / Emeric Pressburger

Cinematography: Freddie Young

Editing: David Lean

Music: Ralph Vaughan Williams

Production Studio: Ortus Productions

Pygmalion

Country of Origin: United Kingdom

Exact Release Date: October 6, 1938

Director: Anthony Asquith / Leslie Howard

Screenplay: George Bernard Shaw

Cinematography: Harry Stradling Sr.

Editing: David Lean

Music: Arthur Bliss

Production Studio: Pascal Film Productions
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Anne V. Coates", "Chris Dickens", "Tariq Anwar", "Jon Harris", "David Lean"
];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (knownDirectors.includes(line) && !line.includes(':')) {
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

    if (!line.includes(':') && currentDirector && !knownDirectors.includes(line)) {
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

    if (line.includes(':') && currentMovieObj) {
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
        let dirObj = editors.find(d => d.name === dName && d.region === "british");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "british");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "british");

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
    console.log("Updated js/data.js for British Editors successfully.");
}

updateData().catch(console.error);
