const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "María Candelaria": "Indigenous identity, tragic melodrama, and Mexican golden age cinematography",
    "Enamorada": "Mexican Revolution context, romantic melodrama, and stark lighting",
    "Y Tu Mamá También": "Coming-of-age, class divide, and sociopolitical undercurrents",
    "Roma": "Autobiographical memory, domestic life, and striking black-and-white cinematography",
    "Amores Perros": "Interlocking narratives, urban grit, and fatalistic coincidence",
    "Birdman": "Tracking shots, artistic ego, and magical realism",
    "Pan's Labyrinth": "Dark fantasy, anti-fascist allegory, and visually rich creature design",
    "The Devil's Backbone": "Ghost story conventions, Spanish Civil War setting, and childhood trauma",
    "Black God, White Devil": "Cinema Novo aesthetics, revolutionary politics, and religious fanaticism",
    "Entranced Earth": "Political disillusionment, tropicalist allegory, and baroque style",
    "Pixote": "Docufiction realism, institutional failure, and juvenile delinquency",
    "Carandiru": "Prison life, systemic violence, and social marginalization",
    "City of God": "Favela crime dynamics, kinetic editing, and cyclical violence",
    "Neighboring Sounds": "Urban paranoia, class tension, and intricate sound design",
    "Aquarius": "Historical preservation, property disputes, and individual defiance",
    "La Ciénaga": "Bourgeois decay, oppressive atmosphere, and elliptical storytelling",
    "The Headless Woman": "Psychological denial, class complicity, and blurred reality",
    "The Secret in Their Eyes": "Historical memory, obsession, and non-linear narrative",
    "Wild Tales": "Dark comedy, social inequality, and explosive revenge",
    "No": "Political campaigning, media satire, and U-matic video aesthetics",
    "The Club": "Religious hypocrisy, institutional cover-ups, and moral ambiguity",
    "Gloria": "Female aging, personal liberation, and poignant character study",
    "A Fantastic Woman": "Transgender identity, systemic prejudice, and resilient dignity",
    "Memories of Underdevelopment": "Post-revolutionary alienation, subjective narrative, and documentary blending",
    "Embrace of the Serpent": "Colonial exploitation, indigenous perspectives, and surreal jungle journeys"
};

const userText = `
Emilio Fernández
María Candelaria

Country of Origin: Mexico

Exact Release Date: January 20, 1944

Director: Emilio Fernández

Screenplay: Emilio Fernández / Mauricio Magdaleno

Cinematography: Gabriel Figueroa

Editing: Gloria Schoemann

Music: Francisco Domínguez

Production Studio: Films Mundiales

Enamorada

Country of Origin: Mexico

Exact Release Date: December 25, 1946

Director: Emilio Fernández

Screenplay: Emilio Fernández / Iñigo de Martino

Cinematography: Gabriel Figueroa

Editing: Gloria Schoemann

Music: Eduardo Hernández Moncada

Production Studio: Panamerican Films

Alfonso Cuarón
Y Tu Mamá También

Country of Origin: Mexico

Exact Release Date: June 8, 2001

Director: Alfonso Cuarón

Screenplay: Carlos Cuarón / Alfonso Cuarón

Cinematography: Emmanuel Lubezki

Editing: Alfonso Cuarón / Alex Rodríguez

Production Studio: Anhelo Producciones / Producciones Hincapié

Roma

Country of Origin: Mexico / United States

Exact Release Date: August 30, 2018

Director / Screenplay / Cinematography / Editing: Alfonso Cuarón

Production Studio: Esperanto Filmoj / Participant Media

Alejandro González Iñárritu
Amores Perros

Country of Origin: Mexico

Exact Release Date: May 14, 2000

Director: Alejandro González Iñárritu

Screenplay: Guillermo Arriaga

Cinematography: Rodrigo Prieto

Editing: Alejandro González Iñárritu / Luis Carballar / Fernando Pérez Unda

Music: Gustavo Santaolalla

Production Studio: Altavista Films / Zeta Film

Birdman

Country of Origin: United States

Exact Release Date: August 27, 2014

Director: Alejandro González Iñárritu

Screenplay: Alejandro González Iñárritu / Nicolás Giacobone / Alexander Dinelaris Jr. / Armando Bó

Cinematography: Emmanuel Lubezki

Editing: Douglas Crise / Stephen Mirrione

Music: Antonio Sánchez

Production Studio: New Regency Pictures / Searchlight Pictures

Guillermo del Toro
Pan's Labyrinth

Country of Origin: Spain / Mexico

Exact Release Date: May 27, 2006

Director / Screenplay: Guillermo del Toro

Cinematography: Guillermo Navarro

Editing: Bernat Vilaplana

Music: Javier Navarrete

Production Studio: Estudios Picasso / Tequila Gang / Esperanto Filmoj

The Devil's Backbone

Country of Origin: Spain / Mexico

Exact Release Date: April 20, 2001

Director: Guillermo del Toro

Screenplay: Guillermo del Toro / Antonio Trashorras / David Muñoz

Cinematography: Guillermo Navarro

Editing: Luis de la Madrid

Music: Javier Navarrete

Production Studio: El Deseo / Tequila Gang / Anhelo Producciones

Glauber Rocha
Black God, White Devil

Country of Origin: Brazil

Exact Release Date: April 10, 1964

Director / Screenplay: Glauber Rocha

Cinematography: Waldemar Lima

Editing: Rafael Justo Valverde

Music: Heitor Villa-Lobos / Sergio Ricardo

Production Studio: Copacabana Filmes

Entranced Earth

Country of Origin: Brazil

Exact Release Date: April 15, 1967

Director / Screenplay: Glauber Rocha

Cinematography: Luiz Carlos Barreto

Editing: Eduardo Escorel

Production Studio: Mapa Filmes

Héctor Babenco
Pixote

Country of Origin: Brazil

Exact Release Date: May 5, 1981

Director: Héctor Babenco

Screenplay: Héctor Babenco / Jorge Durán

Cinematography: Rodolfo Sánchez

Editing: Luiz Elias

Music: John Neschling

Production Studio: Embrafilme / HB Filmes

Carandiru

Country of Origin: Brazil / Argentina

Exact Release Date: April 11, 2003

Director: Héctor Babenco

Screenplay: Héctor Babenco / Fernando Bonassi / Victor Navas

Cinematography: Walter Carvalho

Editing: Mauro Alice

Music: Andre Abujamra

Production Studio: HB Filmes / Sony Pictures Classics

Fernando Meirelles
City of God

Country of Origin: Brazil / France

Exact Release Date: May 18, 2002

Director: Fernando Meirelles

Screenplay: Bráulio Mantovani

Cinematography: César Charlone

Editing: Daniel Rezende

Music: Antonio Pinto / Ed Cortês

Production Studio: O2 Filmes / VideoFilmes

Kleber Mendonça Filho
Neighboring Sounds

Country of Origin: Brazil

Exact Release Date: January 29, 2012

Director / Screenplay: Kleber Mendonça Filho

Cinematography: Pedro Sotero / Fabricio Tadeu

Editing: Kleber Mendonça Filho / João Maria

Production Studio: Cinemascópio / Rec Produtores Associados

Aquarius

Country of Origin: Brazil / France

Exact Release Date: May 17, 2016

Director / Screenplay: Kleber Mendonça Filho

Cinematography: Pedro Sotero / Fabricio Tadeu

Editing: Eduardo Serrano

Production Studio: Cinemascópio / SBS Productions

Lucrecia Martel
La Ciénaga

Country of Origin: Argentina / Spain

Exact Release Date: February 8, 2001

Director / Screenplay: Lucrecia Martel

Cinematography: Hugo Colace

Editing: Santiago Ricci

Production Studio: Cuatro Cabeceras / Lita Stantic Producciones

The Headless Woman

Country of Origin: Argentina / France / Italy / Spain

Exact Release Date: May 22, 2008

Director / Screenplay: Lucrecia Martel

Cinematography: Bárbara Álvarez

Editing: Miguel Schverdfinger

Production Studio: Aquafilmes / El Deseo / Slot Machine

Juan José Campanella
The Secret in Their Eyes

Country of Origin: Argentina / Spain

Exact Release Date: August 13, 2009

Director: Juan José Campanella

Screenplay: Juan José Campanella / Eduardo Sacheri

Cinematography: Félix Monti

Editing: Juan José Campanella

Music: Federico Jusid

Production Studio: Haddock Films / Tornasol Films

Damián Szifron
Wild Tales

Country of Origin: Argentina / Spain

Exact Release Date: May 17, 2014

Director / Screenplay: Damián Szifron

Cinematography: Javier Julia

Editing: Damián Szifron / Pablo Barbieri

Music: Gustavo Santaolalla

Production Studio: Kramer & Sigman Films / El Deseo

Pablo Larraín
No

Country of Origin: Chile / Chile / France

Exact Release Date: May 18, 2012

Director: Pablo Larraín

Screenplay: Pedro Peirano

Cinematography: Sergio Armstrong

Editing: Andrea Chignoli

Music: Carlos Cabezas

Production Studio: Fábula / Funny Balloons

The Club

Country of Origin: Chile

Exact Release Date: February 9, 2015

Director: Pablo Larraín

Screenplay: Pablo Larraín / Guillermo Calderón / Daniel Villalobos

Cinematography: Sergio Armstrong

Editing: Sebastian Sepúlveda

Production Studio: Fábula

Sebastián Lelio
Gloria

Country of Origin: Chile / Spain

Exact Release Date: February 10, 2013

Director: Sebastián Lelio

Screenplay: Sebastián Lelio / Gonzalo Maza

Cinematography: Benjamin Echazarreta

Editing: Soledad Salfate

Production Studio: Fábula

A Fantastic Woman

Country of Origin: Chile / Germany / Spain / United States

Exact Release Date: February 12, 2017

Director: Sebastián Lelio

Screenplay: Sebastián Lelio / Gonzalo Maza

Cinematography: Benjamin Echazarreta

Editing: Soledad Salfate

Music: Matthew Herbert

Production Studio: Fábula / Komplizen Film

Tomás Gutiérrez Alea
Memories of Underdevelopment

Country of Origin: Cuba

Exact Release Date: August 19, 1968

Director / Screenplay: Tomás Gutiérrez Alea

Cinematography: Ramón F. Suárez

Editing: Nelson Rodríguez

Music: Leo Brouwer

Production Studio: ICAIC (Instituto Cubano del Arte e Industria Cinematográficos)

Ciro Guerra
Embrace of the Serpent

Country of Origin: Colombia / Venezuela / Argentina

Exact Release Date: May 15, 2015

Director: Ciro Guerra

Screenplay: Ciro Guerra / Jacques Toulemonde Vidal

Cinematography: David Gallego

Editing: Etienne Boussac

Music: Nascuy Linares

Production Studio: Ciudad Lunar Producciones / Cine Ojo
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Emilio Fernández", "Alfonso Cuarón", "Alejandro González Iñárritu",
    "Guillermo del Toro", "Glauber Rocha", "Héctor Babenco",
    "Fernando Meirelles", "Kleber Mendonça Filho", "Lucrecia Martel",
    "Juan José Campanella", "Damián Szifron", "Pablo Larraín",
    "Sebastián Lelio", "Tomás Gutiérrez Alea", "Ciro Guerra"
];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // Strip notes to ensure matching works properly
    line = line.replace(/\s*\(Note:.*?\)/, '');
    
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
        } else if (key === 'Director / Screenplay / Cinematography / Editing') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
            currentMovieObj.cinematographer = value;
            currentMovieObj.editor = value;
        } else if (key === 'Director / Screenplay / Editing') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
            currentMovieObj.editor = value;
        } else if (key === 'Director / Screenplay / Cinematography') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
            currentMovieObj.cinematographer = value;
        } else if (key === 'Director / Screenplay / Music') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
            currentMovieObj.composer = value;
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
        } else if (key === 'Editing / Music') {
            currentMovieObj.editor = value;
            currentMovieObj.composer = value;
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

const limit = pLimit(2); // limit concurrent fetches to 2

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let searchName = dName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" Inarritu", " Inarritu"); // special case for ñ usually becomes n
        let dirObj = directors.find(d => d.name === searchName && d.region === "latin-american");
        if (!dirObj) dirObj = directors.find(d => d.name.includes(searchName.split(' ')[1]) && d.region === "latin-american");
        if (!dirObj) dirObj = directors.find(d => d.name === "Hector Babenco" && dName.includes("Héctor Babenco"));
        if (!dirObj) dirObj = directors.find(d => d.name === "Sebastian Lelio" && dName.includes("Sebastián Lelio"));
        if (!dirObj) dirObj = directors.find(d => d.name === "Damian Szifron" && dName.includes("Damián Szifron"));
        
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
                // manual override for the connection issue
                if (mv.title === "All About My Mother") {
                    tmdbData.poster = "assets/images/all_about_my_mother_poster.png";
                    tmdbData.plot = "Following the tragic death of her teenage son, Manuela travels from Madrid to Barcelona in an attempt to contact the long-estranged father the boy never knew.";
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
        } else {
            console.log("Could not find director:", dName);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js for Latin American successfully.");
}

updateData().catch(console.error);
