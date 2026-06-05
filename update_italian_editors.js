const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "The Sweet Life": "Fluid, episodic structure editing that creates a mesmerizing mosaic of modern decadence.",
    "Nights of Cabiria": "Rhythmic, empathetic editing that intimately follows a protagonist's turbulent emotional journey.",
    "The Good, the Bad and the Ugly": "Iconic, tension-maximizing extreme close-up montage matched perfectly to a musical crescendo.",
    "Once Upon a Time in the West": "Operatic, prolonged suspense editing that stretches time before explosive outbursts.",
    "The Gospel According to St. Matthew": "Raw, documentary-style montage blending classical music with visceral realism.",
    "The Conformist": "Sophisticated non-linear editing that mirrors the protagonist's fractured, repressed psychology.",
    "Last Tango in Paris": "Lyrical and intense pacing that heightens claustrophobia and emotional volatility.",
    "1900": "Sweeping, epic-scale montage interweaving personal histories with massive political movements.",
    "The Night of the Shooting Stars": "Poetic, folklore-infused transitions that blur the line between memory, myth, and reality.",
    "Before the Revolution": "Restless, jump-cut influenced editing capturing the ideological turbulence of youth.",
    "Il Postino": "Gentle, tender pacing that beautifully emphasizes silence, poetry, and character growth.",
    "Rome, Open City": "Pioneering neorealist editing utilizing raw, jagged cuts to evoke unfiltered wartime urgency.",
    "Paisan": "Episodic, documentary-influenced montage that constructs a sweeping narrative of liberation."
};

const userText = `
Leo Catozzo
The Sweet Life

Country of Origin: Italy / France

Exact Release Date: February 5, 1960

Director: Federico Fellini

Screenplay: Federico Fellini / Ennio Flaiano / Tullio Pinelli / Brunello Rondi

Cinematography: Otello Martelli

Editing: Leo Catozzo

Music: Nino Rota

Production Studio: Riama Film / Pathé Consortium Cinéma

Nights of Cabiria

Country of Origin: Italy / France

Exact Release Date: May 10, 1957

Director: Federico Fellini

Screenplay: Federico Fellini / Ennio Flaiano / Tullio Pinelli

Cinematography: Aldo Tonti / Otello Martelli

Editing: Leo Catozzo

Music: Nino Rota

Production Studio: Dino de Laurentiis Cinematografica / Les Films Marceau

Nino Baragli
The Good, the Bad and the Ugly

Country of Origin: Italy

Exact Release Date: December 23, 1966

Director: Sergio Leone

Screenplay: Luciano Vincenzoni / Sergio Leone / Agenore Incrocci / Furio Scarpelli

Cinematography: Tonino Delli Colli

Editing: Nino Baragli / Eugenio Alabiso

Music: Ennio Morricone

Production Studio: Produzioni Europee Associate (PEA)

Once Upon a Time in the West

Country of Origin: Italy / United States

Exact Release Date: December 21, 1968

Director: Sergio Leone

Screenplay: Sergio Donati / Sergio Leone

Cinematography: Tonino Delli Colli

Editing: Nino Baragli

Music: Ennio Morricone

Production Studio: Rafran Cinematografica / Paramount Pictures

The Gospel According to St. Matthew

Country of Origin: Italy / France

Exact Release Date: September 4, 1964

Director / Screenplay: Pier Paolo Pasolini

Cinematography: Tonino Delli Colli

Editing: Nino Baragli

Production Studio: Arco Film / Lux Compagnie Cinématographique de France

Kim Arcalli
The Conformist

Country of Origin: Italy / France / West Germany

Exact Release Date: October 22, 1970

Director / Screenplay: Bernardo Bertolucci

Cinematography: Vittorio Storaro

Editing: Kim Arcalli

Music: Georges Delerue

Production Studio: Mars Film / Marianne Productions / Maran Film

Last Tango in Paris

Country of Origin: Italy / France

Exact Release Date: October 14, 1972

Director: Bernardo Bertolucci

Screenplay: Bernardo Bertolucci / Franco Arcalli

Cinematography: Vittorio Storaro

Editing: Kim Arcalli

Music: Gato Barbieri

Production Studio: PEA / Les Productions Artistes Associés

1900

Country of Origin: Italy / France / West Germany

Exact Release Date: August 15, 1976

Director: Bernardo Bertolucci

Screenplay: Franco Arcalli / Bernardo Bertolucci / Giuseppe Bertolucci

Cinematography: Vittorio Storaro

Editing: Kim Arcalli

Music: Ennio Morricone

Production Studio: PEA / Les Productions Artistes Associés / Artemis Film

Roberto Perpignani
The Night of the Shooting Stars

Country of Origin: Italy

Exact Release Date: April 21, 1982

Director / Screenplay: Paolo Taviani / Vittorio Taviani

Cinematography: Franco Di Giacomo

Editing: Roberto Perpignani

Music: Nicola Piovani

Production Studio: Amana Film / RAI / Sacis

Before the Revolution

Country of Origin: Italy

Exact Release Date: May 10, 1964

Director / Screenplay: Bernardo Bertolucci

Cinematography: Aldo Scavarda

Editing: Roberto Perpignani

Music: Ennio Morricone / Gino Paoli

Production Studio: Iride Cinematografica

Il Postino

Country of Origin: Italy / France / Belgium

Exact Release Date: September 1, 1994

Director: Michael Radford

Screenplay: Anna Pavignano / Michael Radford / Furio Scarpelli / Giacomo Scarpelli / Massimo Troisi

Cinematography: Virginio Bruni / Franco Di Giacomo

Editing: Roberto Perpignani

Music: Luis Bacalov

Production Studio: Esterno Mediterraneo Film / Blue Dahlia Productions / Cecchi Gori Group

Jolanda Benvenuti
Rome, Open City

Country of Origin: Italy

Exact Release Date: September 27, 1945

Director: Roberto Rossellini

Screenplay: Sergio Amidei / Federico Fellini / Roberto Rossellini

Cinematography: Ubaldo Arata

Editing: Jolanda Benvenuti

Music: Renzo Rossellini

Production Studio: Excelsa Film

Paisan

Country of Origin: Italy

Exact Release Date: December 10, 1946

Director: Roberto Rossellini

Screenplay: Sergio Amidei / Federico Fellini / Roberto Rossellini / Klaus Mann

Cinematography: Otello Martelli

Editing: Jolanda Benvenuti

Music: Renzo Rossellini

Production Studio: O.F.I. / Foreign Film Productions
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Leo Catozzo", "Nino Baragli", "Kim Arcalli",
    "Roberto Perpignani", "Jolanda Benvenuti"
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
    if (searchTitle === "The Sweet Life") searchTitle = "La Dolce Vita"; // common mapping
    
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
        let dirObj = editors.find(d => d.name === dName && d.region === "italian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "italian");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "italian");

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
    console.log("Updated js/data.js for Italian Editors successfully.");
}

updateData().catch(console.error);
