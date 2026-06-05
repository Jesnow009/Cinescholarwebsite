const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "All About My Mother": "Gender identity, female solidarity, and melodramatic pastiche",
    "Talk to Her": "Male loneliness, voyeurism, and the ethics of care",
    "Volver": "Maternal ghosts, working-class resilience, and magic realism",
    "The Discreet Charm of the Bourgeoisie": "Surrealist satire, ruling-class hypocrisy, and dream logic",
    "Los Olvidados": "Gritty neo-realism, juvenile delinquency, and systemic poverty",
    "Belle de Jour": "Bourgeois repression, sadomasochistic fantasy, and narrative ambiguity",
    "The Spirit of the Beehive": "Post-war trauma, childhood imagination, and political allegory",
    "El Sur": "Nostalgia, paternal mystique, and the legacy of the Spanish Civil War",
    "Cría Cuervos": "Childhood trauma, Francoist dictatorship allegory, and psychological confinement",
    "La Caza": "Toxic masculinity, suppressed violence, and Spanish Civil War metaphors",
    "The Others": "Gothic atmosphere, psychological horror, and plot twists",
    "The Sea Inside": "Euthanasia debate, physical paralysis, and the right to die",
    "The Orphanage": "Gothic suspense, maternal grief, and atmospheric dread",
    "Society of the Snow": "Extreme survival, human resilience, and ethical dilemmas in crisis",
    "Aniki Bóbó": "Childhood innocence, street life realism, and early Portuguese cinema",
    "Abraham's Valley": "Bourgeois ennui, romantic disillusionment, and literary adaptation",
    "In Vanda's Room": "Docufiction hybrid, marginalization, and the Fontainhas slum",
    "Vitalina Varela": "Chiaroscuro lighting, immigrant grief, and ghostly realism",
    "Tabu": "Colonial nostalgia, silent film homage, and romantic melancholy",
    "Grand Tour": "Post-colonial reflection, travelogue aesthetics, and historical memory",
    "The Ornithologist": "Queer surrealism, religious allegory, and wilderness transformation"
};

const userText = `
Pedro Almodóvar
All About My Mother

Country of Origin: Spain / France

Exact Release Date: April 16, 1999

Director / Screenplay: Pedro Almodóvar

Cinematography: Affonso Beato

Editing: José Salcedo

Music: Alberto Iglesias

Production Studio: El Deseo / Renn Productions

Talk to Her

Country of Origin: Spain

Exact Release Date: March 15, 2002

Director / Screenplay: Pedro Almodóvar

Cinematography: Javier Aguirresarobe

Editing: José Salcedo

Music: Alberto Iglesias

Production Studio: El Deseo

Volver

Country of Origin: Spain

Exact Release Date: March 10, 2006

Director / Screenplay: Pedro Almodóvar

Cinematography: José Luis Alcaine

Editing: José Salcedo

Music: Alberto Iglesias

Production Studio: El Deseo

Luis Buñuel
The Discreet Charm of the Bourgeoisie

Country of Origin: France / Italy / Spain

Exact Release Date: September 15, 1972

Director: Luis Buñuel

Screenplay: Luis Buñuel / Jean-Claude Carrière

Cinematography: Edmond Richard

Editing: Hélène Plemiannikov

Production Studio: Greenwich Film Productions

Los Olvidados

Country of Origin: Mexico

Exact Release Date: November 9, 1950

Director: Luis Buñuel

Screenplay: Luis Buñuel / Luis Alcoriza

Cinematography: Gabriel Figueroa

Editing: Carlos Savage

Music: Gustavo Pittaluga / Rodolfo Halffter

Production Studio: Ultramar Films

Belle de Jour

Country of Origin: France / Italy

Exact Release Date: May 24, 1967

Director: Luis Buñuel

Screenplay: Luis Buñuel / Jean-Claude Carrière

Cinematography: Sacha Vierny

Editing: Louisette Hautecoeur

Production Studio: Paris Film Productions / Five Film

Víctor Erice
The Spirit of the Beehive

Country of Origin: Spain

Exact Release Date: October 8, 1973

Director: Víctor Erice

Screenplay: Ángel Fernández-Santos / Víctor Erice

Cinematography: Luis Cuadrado

Editing: Pablo González del Amo

Music: Luis de Pablo

Production Studio: Elías Querejeta Producciones Cinematográficas

El Sur

Country of Origin: Spain / France

Exact Release Date: May 19, 1983

Director: Víctor Erice

Screenplay: Víctor Erice

Cinematography: José Luis Alcaine

Editing: Mapi Laguna

Production Studio: Elías Querejeta Producciones Cinematográficas / Chloe Productions

Carlos Saura
Cría Cuervos

Country of Origin: Spain

Exact Release Date: January 15, 1976

Director / Screenplay: Carlos Saura

Cinematography: Teo Escamilla

Editing: Pablo González del Amo

Production Studio: Elías Querejeta Producciones Cinematográficas

La Caza

Country of Origin: Spain

Exact Release Date: November 14, 1966

Director: Carlos Saura

Screenplay: Angelino Fons / Carlos Saura

Cinematography: Luis Cuadrado

Editing: Pablo González del Amo

Music: Luis de Pablo

Production Studio: Elías Querejeta Producciones Cinematográficas

Alejandro Amenábar
The Others

Country of Origin: Spain / United States / France / Italy

Exact Release Date: August 10, 2001

Director / Screenplay / Music: Alejandro Amenábar

Cinematography: Javier Aguirresarobe

Editing: Nacho Ruiz Capillas

Production Studio: Las Producciones del Escorpión / Sogecine / Cruise-Wagner Productions

The Sea Inside

Country of Origin: Spain / France / Italy

Exact Release Date: September 3, 2004

Director: Alejandro Amenábar

Screenplay: Alejandro Amenábar / Mateo Gil

Cinematography: Javier Aguirresarobe

Editing / Music: Alejandro Amenábar

Production Studio: Sogecine / Himenóptero / UGC Images

J. A. Bayona
The Orphanage

Country of Origin: Spain

Exact Release Date: October 11, 2007

Director: J. A. Bayona

Screenplay: Sergio G. Sánchez

Cinematography: Óscar Faura

Editing: Elena Ruiz

Music: Fernando Velázquez

Production Studio: Rodar y Rodar / Telecinco Cinema

Society of the Snow

Country of Origin: Spain / United States

Exact Release Date: December 13, 2023

Director: J. A. Bayona

Screenplay: J. A. Bayona / Bernat Vilaplana / Jaime Marques / Nicolás Casariego

Cinematography: Pedro Luque

Editing: Jaume Martí / Andrés Gil

Music: Michael Giacchino

Production Studio: Misión de Audacia Films / El Arriero Films / Netflix

Manoel de Oliveira
Aniki Bóbó

Country of Origin: Portugal

Exact Release Date: December 18, 1942

Director / Screenplay / Editing: Manoel de Oliveira

Cinematography: António Mendes

Music: Jaime Silva Filho

Production Studio: Produções Cinematográficas Manuel de Oliveira

Abraham's Valley

Country of Origin: Portugal / France / Switzerland

Exact Release Date: October 15, 1993

Director / Screenplay: Manoel de Oliveira

Cinematography: Mario Barroso

Editing: Valerie Loiseleux

Production Studio: Madragoa Filmes / Gemini Films

Pedro Costa
In Vanda's Room

Country of Origin: Portugal / Germany / Switzerland

Exact Release Date: May 19, 2000

Director / Screenplay / Cinematography: Pedro Costa

Editing: Dominique Auvray

Production Studio: Contracosta Produções / ZDF

Vitalina Varela

Country of Origin: Portugal

Exact Release Date: August 14, 2019

Director: Pedro Costa

Screenplay: Pedro Costa / Vitalina Varela

Cinematography: Leonardo Simões

Editing: João Dias

Production Studio: OPTEC Filmes

Miguel Gomes
Tabu

Country of Origin: Portugal / Germany / Brazil / France

Exact Release Date: February 14, 2012

Director: Miguel Gomes

Screenplay: Miguel Gomes / Mariana Ricardo

Cinematography: Rui Poças

Editing: Telmo Churro / Miguel Gomes

Production Studio: O Som e a Fúria / Shellac Sud / Komplizen Film

Grand Tour

Country of Origin: Portugal / Italy / France

Exact Release Date: May 22, 2024

Director: Miguel Gomes

Screenplay: Miguel Gomes / Mariana Ricardo / Telmo Churro / Maureen Fazendeiro

Cinematography: Rui Poças / Sayombhu Mukdeeprom

Editing: Telmo Churro / Pedro Ribeiro

Production Studio: Uma Pedra no Sapato / Vivo Film / Shellac

João Pedro Rodrigues
The Ornithologist

Country of Origin: Portugal / France / Brazil

Exact Release Date: August 8, 2016

Director / Screenplay: João Pedro Rodrigues

Cinematography: Rui Poças

Editing: Raphaël Lefèvre

Music: Severine Ballon

Production Studio: Blackmaria / House on Fire / Itaca Films
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Pedro Almodóvar", "Luis Buñuel", "Víctor Erice", "Carlos Saura",
    "Alejandro Amenábar", "J. A. Bayona", "Manoel de Oliveira",
    "Pedro Costa", "Miguel Gomes", "João Pedro Rodrigues"
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

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let searchName = dName;
        if (dName === "Pedro Almodóvar") searchName = "Pedro Almodovar";
        let dirObj = directors.find(d => d.name === searchName && d.region === "spanish-portuguese");
        
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
        } else {
            console.log("Could not find director:", dName);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js for Spanish & Portuguese successfully.");
}

updateData().catch(console.error);
