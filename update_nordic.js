const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "The Seventh Seal": "Existential allegory, stark lighting, and the silence of God",
    "Persona": "Psychological blurring, avant-garde editing, and face-centric cinematography",
    "Wild Strawberries": "Dream logic, nostalgia, and psychological reflection",
    "The Phantom Carriage": "Double exposure trick photography, morality tales, and early cinematic storytelling",
    "Songs from the Second Floor": "Deadpan surrealism, deep focus tracking shots, and social critique",
    "A Pigeon Sat on a Branch Reflecting on Existence": "Static tableaux, pale aesthetics, and absurdist vignettes",
    "The Passion of Joan of Arc": "Extreme emotional close-ups, stripped sets, and psychological realism",
    "Ordet": "Spiritual faith, slow pacing, and transcendental style",
    "Breaking the Waves": "Dogme 95 aesthetics, hand-held camera, and profound emotional extremes",
    "Melancholia": "Depression metaphor, romantic visual aesthetics, and apocalyptic anxiety",
    "The Celebration (Festen)": "Dogme 95 manifesto rules, natural lighting, and intense family drama",
    "Another Round": "Midlife crisis, kinetic handheld cinematography, and Danish drinking culture",
    "The Worst Person in the World": "Millennial existentialism, magical realism elements, and fluid editing",
    "Oslo, August 31st": "Urban isolation, addiction recovery, and somber realism",
    "The Match Factory Girl": "Deadpan minimalism, proletarian struggle, and sparse dialogue",
    "Fallen Leaves": "Retro aesthetic, deadpan humor, and working-class romance",
    "Godland": "Harsh natural landscapes, colonialism, and psychological breakdown"
};

const userText = `
Ingmar Bergman
The Seventh Seal

Country of Origin: Sweden

Exact Release Date: February 16, 1957

Director / Screenplay: Ingmar Bergman

Cinematography: Gunnar Fischer

Editing: Lennart Wallén

Music: Erik Nordgren

Production Studio: Svensk Filmindustri

Persona

Country of Origin: Sweden

Exact Release Date: October 18, 1966

Director / Screenplay: Ingmar Bergman

Cinematography: Sven Nykvist

Editing: Ulla Ryghe

Music: Lars Johan Werle

Production Studio: Svensk Filmindustri

Wild Strawberries

Country of Origin: Sweden

Exact Release Date: December 26, 1957

Director / Screenplay: Ingmar Bergman

Cinematography: Sven Nykvist

Editing: Oscar Rosander

Music: Erik Nordgren

Production Studio: Svensk Filmindustri

Victor Sjöström
The Phantom Carriage

Country of Origin: Sweden

Exact Release Date: January 1, 1921

Director / Screenplay / Editing: Victor Sjöström

Cinematography: Julius Jaenzon

Production Studio: Svensk Filmindustri

Roy Andersson
Songs from the Second Floor

Country of Origin: Sweden / Denmark / Norway / France / Germany

Exact Release Date: May 21, 2000

Director / Screenplay: Roy Andersson

Cinematography: István Borbás / Jesper Klevenås

Editing: Roy Andersson

Production Studio: Roy Andersson Filmproduktion / Essential Filmproduktion

A Pigeon Sat on a Branch Reflecting on Existence

Country of Origin: Sweden / Germany / Norway / France

Exact Release Date: September 2, 2014

Director / Screenplay: Roy Andersson

Cinematography: István Borbás / Gergely Pálos

Editing: Alexandra Strauss

Production Studio: Roy Andersson Filmproduktion / 42 Film

Carl Theodor Dreyer
The Passion of Joan of Arc

Country of Origin: France

Exact Release Date: April 21, 1928

Director / Screenplay / Editing: Carl Theodor Dreyer

Cinematography: Rudolph Maté

Production Studio: Société Générale des Films

Ordet

Country of Origin: Denmark

Exact Release Date: January 10, 1955

Director / Screenplay: Carl Theodor Dreyer

Cinematography: Henning Bendtsen

Editing: Edith Schüssel

Production Studio: Film-Centralen-Palladium

Lars von Trier
Breaking the Waves

Country of Origin: Denmark / United Kingdom / France / Germany / Sweden

Exact Release Date: May 18, 1996

Director / Screenplay: Lars von Trier

Cinematography: Robby Müller

Editing: Anders Refn

Music: Joachim Holbek

Production Studio: Zentropa Entertainments / Argus Film Produkties

Melancholia

Country of Origin: Denmark / Sweden / France / Germany

Exact Release Date: May 18, 2011

Director / Screenplay: Lars von Trier

Cinematography: Manuel Alberto Claro

Editing: Molly Malene Stensgaard

Production Studio: Zentropa Entertainments / Memfis Film

Thomas Vinterberg
The Celebration (Festen)

Country of Origin: Denmark / Sweden

Exact Release Date: May 17, 1998

Director: Thomas Vinterberg

Screenplay: Thomas Vinterberg / Mogens Rukov

Cinematography: Anthony Dod Mantle

Editing: Valdís Óskarsdóttir

Production Studio: Nimbus Film / Danmarks Radio

Another Round

Country of Origin: Denmark / Sweden / Netherlands

Exact Release Date: September 12, 2020

Director: Thomas Vinterberg

Screenplay: Thomas Vinterberg / Tobias Lindholm

Cinematography: Sturla Brandth Grøvlen

Editing: Anne Østerud / Janus Billeskov Jansen

Production Studio: Zentropa Entertainments / Film i Väst

Joachim Trier
The Worst Person in the World

Country of Origin: Norway / France / Germany / Denmark / Sweden

Exact Release Date: July 8, 2021

Director: Joachim Trier

Screenplay: Joachim Trier / Eskil Vogt

Cinematography: Kasper Tuxen

Editing: Olivier Bugge Coutté

Music: Ola Fløttum

Production Studio: Oslo Pictures / MK2 Productions

Oslo, August 31st

Country of Origin: Norway

Exact Release Date: May 19, 2011

Director: Joachim Trier

Screenplay: Joachim Trier / Eskil Vogt

Cinematography: Jakob Ihre

Editing: Olivier Bugge Coutté

Music: Torgny Amandam

Production Studio: Motlys / Don't Look Back

Aki Kaurismäki
The Match Factory Girl

Country of Origin: Finland / Sweden

Exact Release Date: January 12, 1990

Director / Screenplay / Editing: Aki Kaurismäki

Cinematography: Timo Salminen

Production Studio: Villealfa Filmproduction / Swedish Film Institute

Fallen Leaves

Country of Origin: Finland / Germany

Exact Release Date: May 22, 2023

Director / Screenplay: Aki Kaurismäki

Cinematography: Timo Salminen

Editing: Samu Heikkilä

Production Studio: Sputnik Oy / Oy Bufo Ab / Pandora Film

Hlynur Pálmason
Godland

Country of Origin: Iceland / Denmark / France / Sweden

Exact Release Date: May 24, 2022

Director / Screenplay: Hlynur Pálmason

Cinematography: Maria von Hausswolff

Editing: Julius Krebs Damsbo

Music: Alex Zhang Hungtai

Production Studio: Join Motion Pictures / Snowglobe Production
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Ingmar Bergman", "Victor Sjöström", "Roy Andersson", 
    "Carl Theodor Dreyer", "Lars von Trier", "Thomas Vinterberg", 
    "Joachim Trier", "Aki Kaurismäki", "Hlynur Pálmason"
];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
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

    if (!line.includes(':') && currentDirector) {
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
        } else if (key === 'Director / Screenplay / Editing') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
            currentMovieObj.editor = value;
        } else if (key === 'Director / Screenplay') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
        } else if (key === 'Director') {
            currentMovieObj.director = value;
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
        } else if (key === 'Cinematography / Editing') {
            currentMovieObj.cinematographer = value;
            currentMovieObj.editor = value;
        }
    }
}
// Push the very last movie
if (currentMovieObj && currentMovieTitle && currentDirector) {
    moviesByDirector[currentDirector].push(currentMovieObj);
}

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
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

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let dirObj = directors.find(d => d.name === dName && d.region === "nordic");
        if (dirObj) {
            const requestedMovies = moviesByDirector[dName];
            dirObj.mustWatch = [];
            
            for (let mv of requestedMovies) {
                let tmdbData = await fetchTMDB(mv.title, mv.year);
                if (!tmdbData.poster || tmdbData.plot === "Plot details not available.") {
                    let fallback = await fetchTMDB(mv.title);
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
                m.focus = focusMap[mv.title] || "Cinematic storytelling and cultural exploration.";
                
                dirObj.mustWatch.push(m);
            }
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js for Nordic successfully.");
}

updateData().catch(console.error);
