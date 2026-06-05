const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Breaker Morant": "Anti-war sentiment, imperial injustice, and courtroom drama",
    "The Getting of Wisdom": "Coming-of-age, social class, and female independence",
    "The Chant of Jimmie Blacksmith": "Systemic racism, indigenous dispossession, and inevitable violence",
    "The Piano": "Female desire, colonial isolation, and gothic romance",
    "An Angel at My Table": "Literary biography, mental health, and artistic salvation",
    "Sweetie": "Dysfunctional families, suburban surrealism, and mental illness",
    "Chopper": "True crime, unreliable narrators, and darkly comedic violence",
    "Strictly Ballroom": "Camp aesthetics, defying tradition, and exuberant choreography",
    "Animal Kingdom": "Crime family dynamics, moral ambiguity, and Melbourne underworld",
    "The Babadook": "Maternal grief, psychological horror, and storybook aesthetics",
    "The Nightingale": "Colonial violence, female revenge, and Tasmanian wilderness",
    "Boy": "Coming-of-age comedy, pop culture obsession, and absentee fathers",
    "Hunt for the Wilderpeople": "Found family, quirky humor, and New Zealand bush survival",
    "Once Were Warriors": "Domestic violence, Maori identity, and urban poverty",
    "Smash Palace": "Marital breakdown, toxic masculinity, and isolation",
    "Sleeping Dogs": "Fascist dystopia, political paranoia, and reluctant heroes",
    "Utu": "Maori resistance, colonial warfare, and vengeance",
    "The Quiet Earth": "Post-apocalyptic isolation, sci-fi minimalism, and existential dread",
    "Picnic at Hanging Rock": "Ethereal mystery, repressed sexuality, and the Australian outback",
    "Gallipoli": "Australian identity, loss of innocence, and the tragedy of war",
    "The Last Wave": "Apocalyptic visions, indigenous mysticism, and environmental dread",
    "Mad Max": "Dystopian lawlessness, revenge, and highway violence",
    "Mad Max 2 (The Road Warrior)": "Post-apocalyptic survival, vehicular combat, and mythic heroes",
    "Mad Max: Fury Road": "Feminist action, non-stop kinetic energy, and dystopian world-building"
};

const userText = `
Bruce Beresford
Breaker Morant

Country of Origin: Australia

Exact Release Date: May 16, 1980

Director: Bruce Beresford

Screenplay: Jonathan Hardy / David Stevens / Bruce Beresford

Cinematography: Donald McAlpine

Editing: William Anderson

Music: Phil Cuneen

Production Studio: South Australian Film Corporation

The Getting of Wisdom

Country of Origin: Australia

Exact Release Date: August 17, 1977

Director: Bruce Beresford

Screenplay: Eleanor Witcombe

Cinematography: Donald McAlpine

Editing: William Anderson

Music: Sigismund Thalberg (Adapted)

Production Studio: Southern Cross Productions

Fred Schepisi
The Chant of Jimmie Blacksmith

Country of Origin: Australia

Exact Release Date: June 21, 1978

Director / Screenplay: Fred Schepisi

Cinematography: Ian Baker

Editing: Brian Kavanagh

Music: Bruce Smeaton

Production Studio: Film House

Jane Campion
The Piano

Country of Origin: New Zealand / Australia / France

Exact Release Date: May 15, 1993

Director / Screenplay: Jane Campion

Cinematography: Stuart Dryburgh

Editing: Veronika Jenet

Music: Michael Nyman

Production Studio: Ciby 2000 / Jan Chapman Productions

An Angel at My Table

Country of Origin: New Zealand / Australia / United Kingdom

Exact Release Date: September 6, 1990

Director: Jane Campion

Screenplay: Laura Jones

Cinematography: Stuart Dryburgh

Editing: Veronika Jenet

Music: Don McGlashan

Production Studio: Hibiscus Films

Sweetie

Country of Origin: Australia

Exact Release Date: May 14, 1989

Director: Jane Campion

Screenplay: Jane Campion / Gerard Lee

Cinematography: Sally Bongers

Editing: Veronika Jenet

Music: Martin Armiger

Production Studio: Arenafilm

Andrew Dominik
Chopper

Country of Origin: Australia

Exact Release Date: August 3, 2000

Director / Screenplay: Andrew Dominik

Cinematography: Kevin Hayward / Geoffrey Hall

Editing: Ken Sallows

Music: Mick Harvey

Production Studio: Mushroom Pictures

Baz Luhrmann
Strictly Ballroom

Country of Origin: Australia

Exact Release Date: May 15, 1992

Director: Baz Luhrmann

Screenplay: Baz Luhrmann / Craig Pearce

Cinematography: Steve Mason

Editing: Jill Bilcock

Music: David Hirschfelder

Production Studio: M&A Film Corporation

David Michôd
Animal Kingdom

Country of Origin: Australia

Exact Release Date: June 3, 2010

Director / Screenplay: David Michôd

Cinematography: Adam Arkapaw

Editing: Luke Doolan

Music: Antony Partos

Production Studio: Screen Australia / Porchlight Films

Jennifer Kent
The Babadook

Country of Origin: Australia / Canada

Exact Release Date: January 17, 2014

Director / Screenplay: Jennifer Kent

Cinematography: Radek Ladczuk

Editing: Simon Njoo

Music: Jed Kurzel

Production Studio: Causeway Films

The Nightingale

Country of Origin: Australia

Exact Release Date: September 6, 2018

Director / Screenplay: Jennifer Kent

Cinematography: Radek Ladczuk

Editing: Simon Njoo

Music: Jed Kurzel

Production Studio: Causeway Films / Made Up Stories

Taika Waititi
Boy

Country of Origin: New Zealand

Exact Release Date: January 22, 2010

Director / Screenplay: Taika Waititi

Cinematography: Adam Clark

Editing: Yana Gorskaya / Chris Plummer

Music: The Phoenix Foundation

Production Studio: Unreasonable Filmmakers / Whenua Films

Hunt for the Wilderpeople

Country of Origin: New Zealand

Exact Release Date: January 22, 2016

Director / Screenplay: Taika Waititi

Cinematography: Lachlan Milne

Editing: Luke Haigh / Yana Gorskaya / Tom Eagles

Music: Lukasz Buda / Samuel Scott / Conrad Wedde

Production Studio: Defender Films / Piki Films

Lee Tamahori
Once Were Warriors

Country of Origin: New Zealand

Exact Release Date: September 2, 1994

Director: Lee Tamahori

Screenplay: Riwia Brown

Cinematography: Stuart Dryburgh

Editing: Michael Horton

Music: Murray Grindlay / Murray McNabb

Production Studio: Communicado Productions

Roger Donaldson
Smash Palace

Country of Origin: New Zealand

Exact Release Date: November 1, 1981

Director / Screenplay: Roger Donaldson

Cinematography: Graeme Cowley

Editing: Michael Horton

Music: Sharon O'Neill

Production Studio: Aardvark Films

Sleeping Dogs

Country of Origin: New Zealand

Exact Release Date: October 6, 1977

Director: Roger Donaldson

Screenplay: Ian Mune / Arthur Baysting

Cinematography: Michael Seresin

Editing: Ian John

Music: Mathew Brown / David Calder

Production Studio: Aardvark Films

Geoff Murphy
Utu

Country of Origin: New Zealand

Exact Release Date: May 13, 1983

Director: Geoff Murphy

Screenplay: Geoff Murphy / Keith Aberdein

Cinematography: Graeme Cowley

Editing: Michael Horton

Music: John Charles

Production Studio: Glitteron Film

The Quiet Earth

Country of Origin: New Zealand

Exact Release Date: September 5, 1985

Director: Geoff Murphy

Screenplay: Bill Baer / Bruno Lawrence / Sam Pillsbury

Cinematography: James Bartle

Editing: Michael Horton

Music: John Charles

Production Studio: Cinepro / Pillbury Films

Peter Weir
Picnic at Hanging Rock

Country of Origin: Australia

Exact Release Date: August 8, 1975

Director: Peter Weir

Screenplay: Cliff Green

Cinematography: Russell Boyd

Editing: Max Lemon

Music: Bruce Smeaton

Production Studio: South Australian Film Corporation / McElroy & McElroy

Gallipoli

Country of Origin: Australia

Exact Release Date: August 13, 1981

Director: Peter Weir

Screenplay: David Williamson

Cinematography: Russell Boyd

Editing: William Anderson

Music: Brian May (With Albinoni's Adagio)

Production Studio: Associated R&R Films

The Last Wave

Country of Origin: Australia

Exact Release Date: November 11, 1977

Director: Peter Weir

Screenplay: Peter Weir / Tony Morphett / Petru Popescu

Cinematography: Russell Boyd

Editing: Max Lemon

Music: Charles Wain

Production Studio: South Australian Film Corporation

George Miller
Mad Max

Country of Origin: Australia

Exact Release Date: April 12, 1979

Director: George Miller

Screenplay: James McCausland / George Miller

Cinematography: David Eggby

Editing: Tony Paterson / Cliff Hayes

Music: Brian May

Production Studio: Kennedy Miller Productions / Crossroads Trading Co.

Mad Max 2 (The Road Warrior)

Country of Origin: Australia

Exact Release Date: December 24, 1981

Director: George Miller

Screenplay: Terry Hayes / George Miller / Brian Hannant

Cinematography: Dean Semler

Editing: David Stiven / Tim Wellburn / Michael Balson

Music: Brian May

Production Studio: Kennedy Miller Entertainment

Mad Max: Fury Road

Country of Origin: Australia / United States

Exact Release Date: May 14, 2015

Director: George Miller

Screenplay: George Miller / Brendan McCarthy / Nico Lathouris

Cinematography: John Seale

Editing: Margaret Sixel

Music: Tom Holkenborg (Junkie XL)

Production Studio: Kennedy Miller Mitchell / Village Roadshow Pictures
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Bruce Beresford", "Fred Schepisi", "Jane Campion", "Andrew Dominik",
    "Baz Luhrmann", "David Michôd", "Jennifer Kent", "Taika Waititi",
    "Lee Tamahori", "Roger Donaldson", "Geoff Murphy", "Peter Weir", "George Miller"
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
        let dirObj = directors.find(d => d.name === dName && d.region === "australian-oceanic");
        if (!dirObj) dirObj = directors.find(d => d.name.includes(dName.split(' ')[1]) && d.region === "australian-oceanic");
        if (!dirObj) dirObj = directors.find(d => d.name.includes(dName.split(' ').pop()) && d.region === "australian-oceanic");

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
    console.log("Updated js/data.js for Australian & Oceanic successfully.");
}

updateData().catch(console.error);
