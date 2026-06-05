const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Breathless": "Pioneering jump-cut editing that shattered traditional continuity and defined the French New Wave.",
    "My Night at Maud's": "Deliberate, restrained pacing that emphasizes philosophical dialogue and intellectual tension.",
    "Shoot the Piano Player": "Playful, unpredictable editing that wildly shifts tones between comedy, romance, and tragedy.",
    "The Diving Bell and the Butterfly": "Highly subjective, fragmented editing that mirrors the protagonist's locked-in syndrome and vivid imagination.",
    "A Prophet": "Gritty, visceral cross-cutting that traces a complex, brutal rise through the criminal underworld.",
    "The Science of Sleep": "Surreal, free-flowing transitions that seamlessly blend reality with handcrafted dream sequences.",
    "Contempt": "Languid, classical pacing juxtaposed with jarring modernist cuts, reflecting the dissolution of a marriage.",
    "Alphaville": "Stark, disorienting montage that transforms contemporary Paris into a dystopian futuristic nightmare.",
    "The Wild Child": "Classic, documentary-like pacing utilizing traditional wipes and irises to evoke early cinema aesthetics.",
    "The 400 Blows": "Fluid, empathetic pacing culminating in the iconic freeze-frame ending that leaves the protagonist's fate unresolved.",
    "Léon Morin, Priest": "Precise, elliptical editing that builds immense psychological and erotic tension between characters.",
    "Microcosmos": "Mesmerizing, macro-scale pacing that transforms the insect world into a grand, dramatic spectacle.",
    "Army of Shadows": "Cold, methodical pacing that reflects the grim, fatalistic reality of the French Resistance.",
    "Z": "Kinetic, pulse-pounding political thriller editing that redefined the urgency of investigative cinema.",
    "The Tenant": "Claustrophobic, paranoid editing that masterfully builds psychological horror from mundane apartment life.",
    "Amélie": "Whimsical, hyper-kinetic editing filled with visual gags, rapid montages, and joyful rhythmic timing.",
    "Delicatessen": "Stylized, rhythmic, and darkly comedic editing with brilliant audio-sync sequences.",
    "The City of Lost Children": "Imaginative, dense montage that builds a visually overwhelming, surreal steampunk fairytale."
};

const userText = `
Cécile Decugis
Breathless

Country of Origin: France

Exact Release Date: March 16, 1960

Director: Jean-Luc Godard

Screenplay: Jean-Luc Godard / François Truffaut

Cinematography: Raoul Coutard

Editing: Cécile Decugis

Production Studio: Les Films Georges de Beauregard / Société Nouvelle de Cinématographie (SNC)

My Night at Maud's

Country of Origin: France

Exact Release Date: June 4, 1969

Director / Screenplay: Éric Rohmer

Cinematography: Néstor Almendros

Editing: Cécile Decugis

Production Studio: Les Films du Losange / FFP / Renée Films

Shoot the Piano Player

Country of Origin: France

Exact Release Date: November 25, 1960

Director: François Truffaut

Screenplay: François Truffaut / Marcel Moussy

Cinematography: Raoul Coutard

Editing: Cécile Decugis / Claudine Bouché

Music: Georges Delerue

Production Studio: Les Films de la Pléiade

Juliette Welfling
The Diving Bell and the Butterfly

Country of Origin: France / United States

Exact Release Date: May 22, 2007

Director: Julian Schnabel

Screenplay: Ronald Harwood

Cinematography: Janusz Kamiński

Editing: Juliette Welfling

Music: Paul Cantelon

Production Studio: Pathé Renn Productions / Kennedy/Marshall Company

A Prophet

Country of Origin: France / Italy

Exact Release Date: May 16, 2009

Director: Jacques Audiard

Screenplay: Jacques Audiard / Thomas Bidegain / Abdel Raouf Dafri / Nicolas Peufaillit

Cinematography: Stéphane Fontaine

Editing: Juliette Welfling

Music: Alexandre Desplat

Production Studio: Why Not Productions / Page 114 / Chic Films

The Science of Sleep

Country of Origin: France / Italy

Exact Release Date: February 11, 2006

Director / Screenplay: Michel Gondry

Cinematography: Jean-Louis Bompoint

Editing: Juliette Welfling

Music: Jean-Michel Bernard

Production Studio: Partizan Films / Gaumont

Agnès Guillemot
Contempt

Country of Origin: France / Italy

Exact Release Date: December 20, 1963

Director / Screenplay: Jean-Luc Godard

Cinematography: Raoul Coutard

Editing: Agnès Guillemot / Lila Lakshmanan

Music: Georges Delerue / Piero Piccioni

Production Studio: Les Films Georges de Beauregard / Rome Paris Films / Compagnia Cinematografica Champion

Alphaville

Country of Origin: France / Italy

Exact Release Date: May 5, 1965

Director / Screenplay: Jean-Luc Godard

Cinematography: Raoul Coutard

Editing: Agnès Guillemot

Music: Paul Misraki

Production Studio: Chaumiane / Filmstudio

The Wild Child

Country of Origin: France / Italy

Exact Release Date: February 26, 1970

Director: François Truffaut

Screenplay: François Truffaut / Jean Gruault

Cinematography: Néstor Almendros

Editing: Agnès Guillemot

Music: Antonio Vivaldi (Adapted)

Production Studio: Les Productions Artistes Associés

Marie-Josèphe Yoyotte
The 400 Blows

Country of Origin: France

Exact Release Date: June 3, 1959

Director: François Truffaut

Screenplay: François Truffaut / Marcel Moussy

Cinematography: Henri Decaë

Editing: Marie-Josèphe Yoyotte

Music: Jean Constantin

Production Studio: Les Films du Carrosse / Sédif Productions

Léon Morin, Priest

Country of Origin: France / Italy

Exact Release Date: September 22, 1961

Director / Screenplay: Jean-Pierre Melville

Cinematography: Henri Decaë

Editing: Marie-Josèphe Yoyotte

Music: Martial Solal / Jean Prodromidès

Production Studio: Rome Paris Films / Compagnia Cinematografica Champion

Microcosmos

Country of Origin: France / Switzerland / Italy / United Kingdom

Exact Release Date: May 13, 1996

Director: Claude Nuridsany / Marie Pérennou

Cinematography: Claude Nuridsany / Marie Pérennou / Thierry Machado / Hughes Ryffel

Editing: Marie-Josèphe Yoyotte / Florence Ricard

Music: Bruno Coulais

Production Studio: Galatée Films / Jacques Perrin Productions / France 2 Cinéma

Françoise Bonnot
Army of Shadows

Country of Origin: France / Italy

Exact Release Date: September 12, 1969

Director / Screenplay: Jean-Pierre Melville

Cinematography: Pierre Lhomme / Walter Wottitz

Editing: Françoise Bonnot

Music: Éric Demarsan

Production Studio: Les Films Corona / Fono Roma

Z

Country of Origin: France / Algeria

Exact Release Date: February 26, 1969

Director: Costa-Gavras

Screenplay: Jorge Semprún / Costa-Gavras

Cinematography: Raoul Coutard

Editing: Françoise Bonnot

Music: Mikis Theodorakis

Production Studio: Reggane Films / Office National pour le Commerce et l'Industrie Cinématographique (ONCIC)

The Tenant

Country of Origin: France

Exact Release Date: May 26, 1976

Director: Roman Polanski

Screenplay: Gérard Brach / Roman Polanski

Cinematography: Sven Nykvist

Editing: Françoise Bonnot

Music: Philippe Sarde

Production Studio: Marianne Productions / Stera Films

Hervé Schneid
Amélie

Country of Origin: France / Germany

Exact Release Date: April 25, 2001

Director: Jean-Pierre Jeunet

Screenplay: Jean-Pierre Jeunet / Guillaume Laurant

Cinematography: Bruno Delbonnel

Editing: Hervé Schneid

Music: Yann Tiersen

Production Studio: Victoires Productions / Tac Seis / Union Générale Cinématographique (UGC)

Delicatessen

Country of Origin: France

Exact Release Date: April 17, 1991

Director: Jean-Pierre Jeunet / Marc Caro

Screenplay: Jean-Pierre Jeunet / Marc Caro / Gilles Adrien

Cinematography: Darius Khondji

Editing: Hervé Schneid

Music: Carlos D'Alessio

Production Studio: Constellation / Hachette Première

The City of Lost Children

Country of Origin: France / Germany / Spain

Exact Release Date: May 17, 1995

Director: Jean-Pierre Jeunet / Marc Caro

Screenplay: Jean-Pierre Jeunet / Marc Caro / Gilles Adrien

Cinematography: Darius Khondji

Editing: Hervé Schneid

Music: Angelo Badalamenti

Production Studio: Lumière / Studio Canal+ / Téléma
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Cécile Decugis", "Juliette Welfling", "Agnès Guillemot",
    "Marie-Josèphe Yoyotte", "Françoise Bonnot", "Hervé Schneid"
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
        let dirObj = editors.find(d => d.name === dName && d.region === "french");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "french");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "french");

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
    console.log("Updated js/data.js for French Editors successfully.");
}

updateData().catch(console.error);
