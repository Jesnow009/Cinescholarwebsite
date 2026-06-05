const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Seven Samurai": "Masterful, rhythmic editing that perfectly balances multiple character arcs and chaotic, multi-camera action sequences.",
    "Rashomon": "Innovative editing that cuts between multiple conflicting perspectives, reshaping narrative truth.",
    "Ran": "Epic, grand-scale editing that orchestrates massive battlefield carnage with poetic tragedy.",
    "Tokyo Story": "Precision continuity editing with low-angle shots and 'tatami' framing that eschews traditional Hollywood shot-reverse-shot.",
    "Late Spring": "Delicate, measured pacing relying on static shots and elliptical cuts to emphasize unspoken emotion.",
    "Princess Mononoke": "Dynamic, breathless editing that perfectly balances fast-paced action with profound environmental introspection.",
    "Grave of the Fireflies": "Heart-wrenching, methodical pacing that contrasts moments of fragile childhood joy with devastating wartime realities.",
    "My Neighbor Totoro": "Gentle, flowing pacing that captures the wonder and unhurried rhythm of childhood discovery.",
    "Perfect Blue": "Frantic, psychological editing that disorientingly blurs the lines between reality, performance, and hallucination."
};

const userText = `
Akira Kurosawa
Seven Samurai

Country of Origin: Japan

Exact Release Date: April 26, 1954

Director: Akira Kurosawa

Screenplay: Akira Kurosawa / Shinobu Hashimoto / Hideo Oguni

Cinematography: Asakazu Nakai

Editing: Akira Kurosawa

Music: Fumio Hayasaka

Production Studio: Toho Co., Ltd.

Rashomon

Country of Origin: Japan

Exact Release Date: August 26, 1950

Director: Akira Kurosawa

Screenplay: Akira Kurosawa / Shinobu Hashimoto

Cinematography: Kazuo Miyagawa

Editing: Akira Kurosawa

Music: Fumio Hayasaka

Production Studio: Daiei Film

Ran

Country of Origin: Japan / France

Exact Release Date: June 1, 1985

Director: Akira Kurosawa

Screenplay: Akira Kurosawa / Hideo Oguni / Masato Ide

Cinematography: Takao Saito / Masaharu Ueda

Editing: Akira Kurosawa

Music: Toru Takemitsu

Production Studio: Greenwich Film Productions / Herald Ace

Yoshiyasu Hamamura
Tokyo Story

Country of Origin: Japan

Exact Release Date: November 3, 1953

Director: Yasujirō Ozu

Screenplay: Yasujirō Ozu / Kōgo Noda

Cinematography: Yūharu Atsuta

Editing: Yoshiyasu Hamamura

Music: Takanobu Saitō

Production Studio: Shochiku

Late Spring

Country of Origin: Japan

Exact Release Date: September 13, 1949

Director: Yasujirō Ozu

Screenplay: Yasujirō Ozu / Kōgo Noda

Cinematography: Yūharu Atsuta

Editing: Yoshiyasu Hamamura

Music: Senji Itō

Production Studio: Shochiku

Takeshi Seyama
Princess Mononoke

Country of Origin: Japan

Exact Release Date: July 12, 1997

Director / Screenplay: Hayao Miyazaki

Cinematography: Atsushi Okui

Editing: Takeshi Seyama

Music: Joe Hisaishi

Production Studio: Studio Ghibli

Grave of the Fireflies

Country of Origin: Japan

Exact Release Date: April 16, 1988

Director / Screenplay: Isao Takahata

Cinematography: Nobuo Koyama

Editing: Takeshi Seyama

Music: Michio Mamiya

Production Studio: Studio Ghibli / Shinchosha

My Neighbor Totoro

Country of Origin: Japan

Exact Release Date: April 16, 1988

Director / Screenplay: Hayao Miyazaki

Cinematography: Mark Henley

Editing: Takeshi Seyama

Music: Joe Hisaishi

Production Studio: Studio Ghibli

Ryuji Miyazaki
Perfect Blue

Country of Origin: Japan

Exact Release Date: February 28, 1998

Director: Satoshi Kon

Screenplay: Sadayuki Murai

Cinematography: Hisao Shirai

Editing: Ryuji Miyazaki

Music: Masahiro Ikumi

Production Studio: Madhouse
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Akira Kurosawa", "Yoshiyasu Hamamura", "Takeshi Seyama", "Ryuji Miyazaki"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "japanese");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "japanese");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "japanese");

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
    console.log("Updated js/data.js for Japanese Editors successfully.");
}

updateData().catch(console.error);
