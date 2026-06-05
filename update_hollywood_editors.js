const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Raging Bull": "Visceral, kinetic editing emphasizing the brutality of the boxing ring and the protagonist's psychological state.",
    "Goodfellas": "Rapid, rhythmic pacing, masterful use of freeze-frames, and dynamic montage sequences.",
    "The Departed": "Tense, overlapping cross-cutting that builds immense suspense between parallel storylines.",
    "Apocalypse Now": "Complex, hallucinatory sound and image montages that capture the descent into madness.",
    "The English Patient": "Lyrical, non-linear editing that weaves seamlessly between past and present timelines.",
    "The Conversation": "Meticulous audio-driven editing that perfectly mirrors the protagonist's paranoia.",
    "Pulp Fiction": "Sharp, jagged editing with unconventional narrative structures and iconic music cues.",
    "Kill Bill: Vol. 1": "Highly stylized, genre-blending action editing with visceral pacing.",
    "Inglourious Basterds": "Masterful tension-building through prolonged, meticulously paced dialogue scenes.",
    "Raiders of the Lost Ark": "Classic, rhythm-driven action editing that maximizes excitement and spatial clarity.",
    "Schindler's List": "Restrained, emotionally devastating cuts that heighten the documentary-like realism.",
    "Saving Private Ryan": "Chaotic, visceral, and groundbreaking combat editing that immerses the viewer.",
    "Bonnie and Clyde": "Revolutionary, rapid-fire editing in the climax that redefined violence in American cinema.",
    "Dog Day Afternoon": "Tense, high-energy pacing that captures the unpredictable volatility of a live hostage situation.",
    "Reds": "Sweeping, epic editing that balances intimate romance with massive historical movements.",
    "Star Wars (Episode IV: A New Hope)": "Pioneering, fast-paced cross-cutting that defined modern blockbuster pacing.",
    "One Flew Over the Cuckoo's Nest": "Incisive, character-driven cuts that highlight subtle psychological shifts and power dynamics.",
    "Jaws": "Masterclass in building suspense through what is withheld, relying on precise timing and reaction shots.",
    "American Graffiti": "Seamless, energetic montage editing that interweaves multiple coming-of-age storylines."
};

const userText = `
Thelma Schoonmaker
Raging Bull

Country of Origin: United States

Exact Release Date: November 14, 1980

Director: Martin Scorsese

Screenplay: Paul Schrader / Mardik Martin

Cinematography: Michael Chapman

Editing: Thelma Schoonmaker

Production Studio: Chartoff-Winkler Productions

Goodfellas

Country of Origin: United States

Exact Release Date: September 19, 1990

Director: Martin Scorsese

Screenplay: Nicholas Pileggi / Martin Scorsese

Cinematography: Michael Ballhaus

Editing: Thelma Schoonmaker

Production Studio: Warner Bros.

The Departed

Country of Origin: United States

Exact Release Date: October 6, 2006

Director: Martin Scorsese

Screenplay: William Monahan

Cinematography: Michael Ballhaus

Editing: Thelma Schoonmaker

Production Studio: Plan B Entertainment / Initial Entertainment Group

Walter Murch
Apocalypse Now

Country of Origin: United States

Exact Release Date: August 15, 1979

Director: Francis Ford Coppola

Screenplay: John Milius / Francis Ford Coppola

Cinematography: Vittorio Storaro

Editing: Richard Marks / Walter Murch / Gerald B. Greenberg / Lisa Fruchtman

Music: Carmine Coppola / Francis Ford Coppola

Production Studio: Omni Zoetrope

The English Patient

Country of Origin: United States / United Kingdom

Exact Release Date: November 15, 1996

Director / Screenplay: Anthony Minghella

Cinematography: John Seale

Editing: Walter Murch

Music: Gabriel Yared

Production Studio: Tiger Moth Productions / Miramax

The Conversation

Country of Origin: United States

Exact Release Date: April 12, 1974

Director / Screenplay: Francis Ford Coppola

Cinematography: Bill Butler

Editing: Richard Chew / Walter Murch

Music: David Shire

Production Studio: The Directors Company / American Zoetrope

Sally Menke
Pulp Fiction

Country of Origin: United States

Exact Release Date: October 14, 1994

Director / Screenplay: Quentin Tarantino

Cinematography: Andrzej Sekuła

Editing: Sally Menke

Production Studio: A Band Apart / Jersey Films

Kill Bill: Vol. 1

Country of Origin: United States

Exact Release Date: October 10, 2003

Director / Screenplay: Quentin Tarantino

Cinematography: Robert Richardson

Editing: Sally Menke

Music: RZA

Production Studio: A Band Apart / Miramax

Inglourious Basterds

Country of Origin: United States / Germany

Exact Release Date: August 21, 2009

Director / Screenplay: Quentin Tarantino

Cinematography: Robert Richardson

Editing: Sally Menke

Production Studio: A Band Apart / Studio Babelsberg

Michael Kahn
Raiders of the Lost Ark

Country of Origin: United States

Exact Release Date: June 12, 1981

Director: Steven Spielberg

Screenplay: Lawrence Kasdan

Cinematography: Douglas Slocombe

Editing: Michael Kahn

Music: John Williams

Production Studio: Lucasfilm Ltd.

Schindler's List

Country of Origin: United States

Exact Release Date: December 15, 1993

Director: Steven Spielberg

Screenplay: Steven Zaillian

Cinematography: Janusz Kamiński

Editing: Michael Kahn

Music: John Williams

Production Studio: Amblin Entertainment

Saving Private Ryan

Country of Origin: United States

Exact Release Date: July 24, 1998

Director: Steven Spielberg

Screenplay: Robert Rodat

Cinematography: Janusz Kamiński

Editing: Michael Kahn

Music: John Williams

Production Studio: Amblin Entertainment / Mutual Film Company

Dede Allen
Bonnie and Clyde

Country of Origin: United States

Exact Release Date: August 13, 1967

Director: Arthur Penn

Screenplay: David Newman / Robert Benton

Cinematography: Burnett Guffey

Editing: Dede Allen

Music: Charles Strouse

Production Studio: Warner Bros.-Seven Arts / Tatira Productions

Dog Day Afternoon

Country of Origin: United States

Exact Release Date: September 21, 1975

Director: Sidney Lumet

Screenplay: Frank Pierson

Cinematography: Victor J. Kemper

Editing: Dede Allen

Production Studio: Warner Bros. / Artists Entertainment Complex

Reds

Country of Origin: United States

Exact Release Date: December 4, 1981

Director: Warren Beatty

Screenplay: Warren Beatty / Trevor Griffiths

Cinematography: Vittorio Storaro

Editing: Dede Allen / Craig McKay

Music: Stephen Sondheim / Dave Grusin

Production Studio: JRS Productions / Paramount Pictures

Richard Chew
Star Wars (Episode IV: A New Hope)

Country of Origin: United States

Exact Release Date: May 25, 1977

Director / Screenplay: George Lucas

Cinematography: Gilbert Taylor

Editing: Paul Hirsch / Marcia Lucas / Richard Chew

Music: John Williams

Production Studio: Lucasfilm Ltd.

One Flew Over the Cuckoo's Nest

Country of Origin: United States

Exact Release Date: November 19, 1975

Director: Miloš Forman

Screenplay: Lawrence Hauben / Bo Goldman

Cinematography: Haskell Wexler

Editing: Richard Chew / Lynzee Klingman / Sheldon Kahn

Music: Jack Nitzsche

Production Studio: Fantasy Films

Verna Fields
Jaws

Country of Origin: United States

Exact Release Date: June 20, 1975

Director: Steven Spielberg

Screenplay: Peter Benchley / Carl Gottlieb

Cinematography: Bill Butler

Editing: Verna Fields

Music: John Williams

Production Studio: Zanuck/Brown Production / Universal Pictures

American Graffiti

Country of Origin: United States

Exact Release Date: August 11, 1973

Director: George Lucas

Screenplay: George Lucas / Gloria Katz / Willard Huyck

Cinematography: Jan d'Alquen / Ron Eveslage

Editing: Verna Fields / Marcia Lucas

Production Studio: Lucasfilm Ltd. / Coppola Company
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Thelma Schoonmaker", "Walter Murch", "Sally Menke", "Michael Kahn",
    "Dede Allen", "Richard Chew", "Verna Fields"
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
        // Handle case where title might have a colon, e.g., "Star Wars: Episode IV"
        // But here we are parsing keys like "Country of Origin: "
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
    let searchTitle = query.split(' (')[0].replace('Episode IV: ', ''); // for Star Wars
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
        let dirObj = editors.find(d => d.name === dName && d.region === "hollywood-na");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "hollywood-na");
        if (!dirObj) dirObj = editors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "hollywood-na");

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
    console.log("Updated js/data.js for Hollywood Editors successfully.");
}

updateData().catch(console.error);
