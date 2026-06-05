const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Touki Bouki": "Avant-garde editing, post-colonial identity, and vivid visual poetry",
    "Hyenas": "Anti-colonial satire, consumerism critique, and dark comedy",
    "Yeelen (Brightness)": "Bambara mythology, slow cinema, and mystical landscapes",
    "Baara (Work)": "Class consciousness, labor exploitation, and early West African social realism",
    "Soleil Ô": "Anti-colonial critique, immigrant alienation, and stylised docufiction",
    "Sarraounia": "Anti-colonial resistance, historical epic, and feminist leadership",
    "The Wanderers of the Desert": "Sufi mysticism, visual poetry, and allegorical desert landscapes",
    "Bab'Aziz - The Prince That Contemplated His Soul": "Sufi philosophy, non-linear storytelling, and spiritual journeys",
    "Timbuktu": "Religious extremism, quiet resistance, and striking composition",
    "Bamako": "Globalization critique, political trial, and courtyard micro-society",
    "A Screaming Man": "Civil war trauma, father-son conflict, and minimalist tension",
    "Daratt (Dry Season)": "Post-war reconciliation, revenge, and sparse dialogue",
    "Rafiki": "Queer romance, vibrant color palettes, and Afrobubblegum aesthetic",
    "Félicité": "Kinshasa street life, musical interludes, and raw emotional resilience",
    "Atlantics": "Migration trauma, supernatural romance, and evocative cinematography",
    "Tsotsi": "Post-apartheid inequality, redemption arcs, and township realism",
    "Mapantsula": "Anti-apartheid resistance, structural racism, and kinetic urban storytelling",
    "Black Girl (La Noire de...)": "Post-colonial exploitation, silence as resistance, and stark black-and-white visuals",
    "Xala": "Political satire, bourgeois hypocrisy, and cultural impotence",
    "Moolaadé": "Female genital mutilation, traditional vs modern values, and protective sanctuary",
    "Cairo Station (The Iron Gate)": "Neorealism, sexual repression, and psychological thriller elements",
    "The Sparrow": "Six-Day War trauma, political corruption, and national disillusionment",
    "Alexandria... Why?": "Autobiographical memory, World War II backdrop, and cultural cosmopolitanism"
};

const userText = `
Djibril Diop Mambéty
Touki Bouki

Country of Origin: Senegal

Exact Release Date: May 1, 1973

Director / Screenplay: Djibril Diop Mambéty

Cinematography: Georges Bracher

Editing: Siro Asteni

Music: Mady Kasem

Production Studio: Cineast Associates

Hyenas

Country of Origin: Senegal / France / Switzerland / United Kingdom

Exact Release Date: May 12, 1992

Director / Screenplay: Djibril Diop Mambéty

Cinematography: Matthias Kälin

Editing: Loredana Cristelli

Music: Wasis Diop

Production Studio: Maag Daan / ADR Productions / Thelma Film

Souleymane Cissé
Yeelen (Brightness)

Country of Origin: Mali / Burkina Faso / France / West Germany

Exact Release Date: May 7, 1987

Director / Screenplay: Souleymane Cissé

Cinematography: Jean-Noël Ferragut / Jean-Michel Humeau

Editing: Dounamba Coulibaly / Andrée Davanture / Marie-Catherine Miqueau

Music: Michel Portal / Salif Keita

Production Studio: Les Films Cissé / Atriascop / Mfproductions

Baara (Work)

Country of Origin: Mali

Exact Release Date: October 1, 1978

Director / Screenplay: Souleymane Cissé

Cinematography: Étienne de Grammont

Editing: Andrée Davanture

Production Studio: Les Films Cissé

Med Hondo
Soleil Ô

Country of Origin: Mauritania / France

Exact Release Date: May 1, 1967

Director / Screenplay: Med Hondo

Cinematography: François Catonné

Editing: Michèle Masnier

Music: Georges Anderson

Production Studio: Les Films Soleil Ô

Sarraounia

Country of Origin: Mauritania / Burkina Faso / France

Exact Release Date: November 26, 1986

Director / Screenplay: Med Hondo

Cinematography: Jean-Monsigny

Editing: Marie-Thérèse Boiche

Music: Pierre Akendengué

Production Studio: Les Films Soleil Ô / Compagnie Africaine Cinématographique Industrielle

Nacer Khemir
The Wanderers of the Desert

Country of Origin: Tunisia / France

Exact Release Date: May 22, 1984

Director / Screenplay: Nacer Khemir

Cinematography: Georges Barsky

Editing: Moufida Tlatli

Music: Fethi Zghonda

Production Studio: France Media International / SATPEC

Bab'Aziz - The Prince That Contemplated His Soul

Country of Origin: Tunisia / France / Germany / Iran / United Kingdom

Exact Release Date: February 10, 2005

Director: Nacer Khemir

Screenplay: Nacer Khemir / Tonino Guerra

Cinematography: Mahmoud Kalari

Editing: Isabelle Rathery

Music: Armand Amar

Production Studio: Cygnus Productions / Type Film / Zephyr Films

Abderrahmane Sissako
Timbuktu

Country of Origin: Mauritania / France

Exact Release Date: May 15, 2014

Director: Abderrahmane Sissako

Screenplay: Abderrahmane Sissako / Kessen Tall

Cinematography: Sofian El Fani

Editing: Nadia Ben Rachid

Music: Amine Bouhafa

Production Studio: Les Films du Worso / Dune Vision

Bamako

Country of Origin: Mauritania / Mali / France

Exact Release Date: May 21, 2006

Director / Screenplay: Abderrahmane Sissako

Cinematography: Jacques Besse

Editing: Nadia Ben Rachid

Production Studio: Chinguitty Films / Archipel 35

Mahamat-Saleh Haroun
A Screaming Man

Country of Origin: Chad / France / Belgium

Exact Release Date: May 17, 2010

Director / Screenplay: Mahamat-Saleh Haroun

Cinematography: Laurent Brunet

Editing: Marie-Hélène Dozo

Music: Wasis Diop

Production Studio: Pili Films / Entre Chien et Loup

Daratt (Dry Season)

Country of Origin: Chad / France / Belgium / Austria

Exact Release Date: September 1, 2006

Director / Screenplay: Mahamat-Saleh Haroun

Cinematography: Laurent Brunet

Editing: Marie-Hélène Dozo

Music: Wasis Diop

Production Studio: Chinguitty Films / Goï-Goï Productions

Wanuri Kahiu
Rafiki

Country of Origin: Kenya / South Africa / France / Lebanon / Norway / Netherlands / Germany

Exact Release Date: May 9, 2018

Director: Wanuri Kahiu

Screenplay: Wanuri Kahiu / Jenna Bass

Cinematography: Christopher Wessels

Editing: Isabelle Dedieu

Production Studio: Big World Cinema / Afrobubblegum

Alain Gomis
Félicité

Country of Origin: Senegal / France / Germany / Belgium / Lebanon

Exact Release Date: February 11, 2017

Director: Alain Gomis

Screenplay: Alain Gomis / Olivier Loustau / Delphine Zingg

Cinematography: Céline Bozon

Editing: Fabrice Rouaud

Music: Kasai Allstars

Production Studio: Andolfi / Granit Films / Cinekap

Mati Diop
Atlantics

Country of Origin: Senegal / France / Belgium

Exact Release Date: May 16, 2019

Director: Mati Diop

Screenplay: Mati Diop / Olivier Demangel

Cinematography: Claire Mathon

Editing: Aël Dallier Vega

Music: Fatima Al Qadiri

Production Studio: Les Films du Bal / Cinekap / Frakas Productions

Gavin Hood
Tsotsi

Country of Origin: South Africa / United Kingdom

Exact Release Date: August 18, 2005

Director / Screenplay: Gavin Hood

Cinematography: Lance Gewer

Editing: Megan Gill

Music: Mark Kilian / Paul Hepker

Production Studio: The UK Film Council / Moviworld

Oliver Schmitz
Mapantsula

Country of Origin: South Africa / Australia / United Kingdom

Exact Release Date: May 18, 1988

Director: Oliver Schmitz

Screenplay: Oliver Schmitz / Thomas Mogotlane

Cinematography: Rod Stewart

Editing: Mark Baard

Music: The Ouens

Production Studio: One World Productions

Ousmane Sembène
Black Girl (La Noire de...)

Country of Origin: Senegal / France

Exact Release Date: June 4, 1966

Director / Screenplay: Ousmane Sembène

Cinematography: Christian Lacoste

Editing: André Gaudier

Production Studio: Les Actualités Françaises / Filmi Domirev

Xala

Country of Origin: Senegal

Exact Release Date: March 12, 1975

Director / Screenplay: Ousmane Sembène

Cinematography: Georges Caristan / Orlando López

Editing: Florence Eymon

Music: Samba Diabaré Samb

Production Studio: Société Nationale de Cinématographie (SNC) / Domirev

Moolaadé

Country of Origin: Senegal / Burkina Faso / France / Cameroon / Morocco / Tunisia

Exact Release Date: May 15, 2004

Director / Screenplay: Ousmane Sembène

Cinematography: Dominique Gentil

Editing: Nadia Ben Rachid

Music: Boncana Maïga

Production Studio: Direction de la Cinématographie Nationale (Burkina Faso) / Filmi Domirev

Youssef Chahine
Cairo Station (The Iron Gate)

Country of Origin: Egypt

Exact Release Date: January 26, 1958

Director: Youssef Chahine

Screenplay: Abdel Hai Adib / Mohamed Abu Seif

Cinematography: Alvise Orfanelli

Editing: Kamal Abul Ela

Music: Fouad El Zahery

Production Studio: Gabriel Film

The Sparrow

Country of Origin: Egypt / Algeria

Exact Release Date: November 14, 1972

Director / Screenplay: Youssef Chahine

Cinematography: Mustapha Abdelatif

Editing: Rashida Abdel Salam

Music: Ali Ismael

Production Studio: Misr International Films / ONCIC

Alexandria... Why?

Country of Origin: Egypt / Algeria

Exact Release Date: February 1, 1979

Director: Youssef Chahine

Screenplay: Youssef Chahine / Mohsen Zayed

Cinematography: Mohsen Nasr

Editing: Rashida Abdel Salam

Music: Fouad El Zahery

Production Studio: Misr International Films / ONCIC
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Djibril Diop Mambéty", "Souleymane Cissé", "Med Hondo", "Nacer Khemir",
    "Abderrahmane Sissako", "Mahamat-Saleh Haroun", "Wanuri Kahiu", "Alain Gomis",
    "Mati Diop", "Gavin Hood", "Oliver Schmitz", "Ousmane Sembène", "Youssef Chahine"
];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
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

if (currentMovieObj && currentMovieTitle && currentDirector) {
    moviesByDirector[currentDirector].push(currentMovieObj);
}

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    // try to fetch based on english title and strip out aliases like (Brightness)
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

    const directors = context.FILMS_DATA.director.directors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let dirObj = directors.find(d => d.name === dName && d.region === "african");
        if (!dirObj) dirObj = directors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "african");
        if (!dirObj) dirObj = directors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "african");

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
    console.log("Updated js/data.js for African successfully.");
}

updateData().catch(console.error);
