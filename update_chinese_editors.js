const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Black Coal, Thin Ice": "Chilly, austere editing that perfectly matches the bleak, neo-noir atmosphere and moral ambiguity.",
    "Angels Wear White": "Measured, empathetic pacing that unspools a systemic tragedy through quiet observation rather than melodrama.",
    "Red Cliff": "Massive, dynamic editing that seamlessly weaves sweeping tactical warfare with intimate, character-driven drama.",
    "The Eight Hundred": "Visceral, chaotic action montage that plunges the viewer into the relentless terror and heroism of urban combat.",
    "Brotherhood of Blades": "Crisp, kinetic editing that balances intricate martial arts choreography with intense political thriller pacing.",
    "Still Life": "Slow, contemplative pacing composed of sweeping pans and long takes to capture the profound melancholy of a changing landscape.",
    "Platform": "Patient, minimalist editing characterized by distant, lingering static shots reflecting vast historical transitions.",
    "The World": "Elliptical, surreal editing that contrasts the artificial scale of the theme park with the microscopic, isolating lives of its workers."
};

const userText = `
Yang Hongyu
Black Coal, Thin Ice

Country of Origin: China / Hong Kong

Exact Release Date: February 12, 2014

Director / Screenplay: Diao Yinan

Cinematography: Dong Jinsong

Editing: Yang Hongyu

Music: Wen Zi

Production Studio: Omnijoi Media Corporation / Boneyard Entertainment China / China Film

Angels Wear White

Country of Origin: China / France

Exact Release Date: September 7, 2017

Director / Screenplay: Vivian Qu

Cinematography: Benoît Delhomme

Editing: Yang Hongyu

Production Studio: 22 Hours Film / Memento Films Production

Red Cliff

Country of Origin: China / Hong Kong / Taiwan / Japan / South Korea

Exact Release Date: July 10, 2008

Director: John Woo

Screenplay: John Woo / Kuo Cheng / Sheng Heyu / Chan Khan

Cinematography: Zhao Xiaoding / Lü Yue

Editing: Yang Hongyu / Robert A. Ferretti / Angakok Chin

Music: Tarō Iwashiro

Production Studio: Lion Rock Productions / China Film Group / Avex Entertainment

Tu Yiran
The Eight Hundred

Country of Origin: China

Exact Release Date: August 21, 2020

Director: Guan Hu

Screenplay: Guan Hu / Ge Rui

Cinematography: Cao Yu

Editing: Tu Yiran / He Yongyi

Music: Andrew Kawczynski / Rupert Gregson-Williams

Production Studio: Huayi Brothers / Tencent Pictures / Beijing Enlight Pictures

Brotherhood of Blades

Country of Origin: China

Exact Release Date: August 7, 2014

Director: Lu Yang

Screenplay: Chen Shu / Lu Yang

Cinematography: Han Qiming

Editing: Tu Yiran / Zhu Liyun

Music: Nathan Wang

Production Studio: China Film Group / Central Studio of News Reels Production

Kong Jinglei
Still Life

Country of Origin: China

Exact Release Date: September 5, 2006

Director / Screenplay: Jia Zhangke

Cinematography: Yu Lik-wai

Editing: Kong Jinglei

Music: Lim Giong

Production Studio: Xstream Pictures / Shanghai Film Studio

Platform

Country of Origin: China / Hong Kong / Japan / France

Exact Release Date: September 4, 2000

Director / Screenplay: Jia Zhangke

Cinematography: Yu Lik-wai

Editing: Kong Jinglei

Music: Yoshihiro Hanno

Production Studio: Hu Tong Communications / T-Mark / Artcam International

The World

Country of Origin: China / Japan / France

Exact Release Date: September 4, 2004

Director / Screenplay: Jia Zhangke

Cinematography: Yu Lik-wai

Editing: Kong Jinglei

Music: Lim Giong

Production Studio: Xstream Pictures / Office Kitano / Luminosity
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Yang Hongyu", "Tu Yiran", "Kong Jinglei"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "chinese");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "chinese");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "chinese");

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
    console.log("Updated js/data.js for Chinese Editors successfully.");
}

updateData().catch(console.error);
