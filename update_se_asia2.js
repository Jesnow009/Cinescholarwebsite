const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const userText = `
Apichatpong Weerasethakul
Tropical Malady

Country of Origin: Thailand / France / Germany / Italy

Exact Release Date: May 17, 2004

Director / Screenplay: Apichatpong Weerasethakul

Cinematography: Jarin Pengpanitch / Vichit Tanapanitch / Jean-Louis Vialard

Editing: Jacopo Quadri

Production Studio: Kick the Machine / Anna Sanders Films

Uncle Boonmee Who Can Recall His Past Lives

Country of Origin: Thailand / United Kingdom / France / Germany / Spain

Exact Release Date: May 21, 2010

Director / Screenplay: Apichatpong Weerasethakul

Cinematography: Sayombhu Mukdeeprom

Editing: Lee Chatametikool

Production Studio: Kick the Machine / Illuminations Films / Match Factory

Cemetery of Splendour

Country of Origin: Thailand / United Kingdom / France / Germany / Malaysia

Exact Release Date: May 18, 2015

Director / Screenplay: Apichatpong Weerasethakul

Cinematography: Sayombhu Mukdeeprom

Editing: Lee Chatametikool

Production Studio: Kick the Machine / Illuminations Films

Pen-Ek Ratanaruang
Last Life in the Universe

Country of Origin: Thailand / Japan / Netherlands

Exact Release Date: August 8, 2003

Director: Pen-Ek Ratanaruang

Screenplay: Pen-Ek Ratanaruang / Prabda Yoon

Cinematography: Christopher Doyle

Editing: Patamanadda Yukol

Music: Hualampong Riddim

Production Studio: Five Star Production / Bohemian Films

6ixtynin9

Country of Origin: Thailand

Exact Release Date: November 25, 1999

Director / Screenplay: Pen-Ek Ratanaruang

Cinematography: Chankit Chamnivikaipong

Editing: Patamanadda Yukol

Music: Amornbhong Methakunavudh

Production Studio: Five Star Production

Nonzee Nimibutr
Nang Nak

Country of Origin: Thailand

Exact Release Date: July 30, 1999

Director: Nonzee Nimibutr

Screenplay: Wisit Sasanatieng

Cinematography: Nattawut Kittikhun

Editing: Sunit Asvinikul

Music: Pakawat Vaiyavat /ชาติชาย ประเสริฐศิริ (Chatchai Pongprapaphan)

Production Studio: Buddy Film and Video Production / Tai Entertainment

Lino Brocka
Manila in the Claws of Light

Country of Origin: Philippines

Exact Release Date: July 16, 1975

Director: Lino Brocka

Screenplay: Clodualdo del Mundo Jr.

Cinematography: Mike De Leon

Editing: Edgardo Vinarao

Music: Max Jocson

Production Studio: Cinema Artists Philippines

Insiang

Country of Origin: Philippines

Exact Release Date: December 19, 1976

Director: Lino Brocka

Screenplay: Mario O'Hara / Lamberto E. Antonio

Cinematography: Conrado Baltazar

Editing: Augusto Salvador

Music: Minda Azarcon

Production Studio: Cine Manila

Lav Diaz
Norte, the End of History

Country of Origin: Philippines

Exact Release Date: May 23, 2013

Director: Lav Diaz

Screenplay: Lav Diaz / Rody Vera

Cinematography / Editing: Lav Diaz

Production Studio: Kayan Productions / Moira Lang

The Woman Who Left

Country of Origin: Philippines

Exact Release Date: September 9, 2016

Director / Screenplay / Cinematography / Editing: Lav Diaz

Production Studio: Sine Olivia Pilipinas / Cinema One Originals

Brillante Mendoza
Kinatay

Country of Origin: Philippines / France

Exact Release Date: May 17, 2009

Director: Brillante Mendoza

Screenplay: Armando Lao

Cinematography: Odyssey Flores

Editing: Kats Serraon

Music: Teresa Barrozo

Production Studio: Swift Productions / Center Stage Productions

Ma' Rosa

Country of Origin: Philippines

Exact Release Date: May 18, 2016

Director: Brillante Mendoza

Screenplay: Troy Espiritu

Cinematography: Odyssey Flores

Editing: Diego Marx Dobles

Music: Teresa Barrozo

Production Studio: Center Stage Productions

Garin Nugroho
Memories of My Body

Country of Origin: Indonesia

Exact Release Date: September 1, 2018

Director / Screenplay: Garin Nugroho

Cinematography: Teoh Gay Hian

Editing: Greg Arya

Music: Mondo Gascaro

Production Studio: Fourcolours Films

Joko Anwar
Satan's Slaves

Country of Origin: Indonesia / South Korea

Exact Release Date: September 28, 2017

Director / Screenplay: Joko Anwar

Cinematography: Ical Tanjung

Editing: Arifin Cu'unk

Music: Aghi Narottama / Bemby Gusti / Tony Merle

Production Studio: Rapi Films / CJ Entertainment

Impetigore

Country of Origin: Indonesia / South Korea / United States

Exact Release Date: October 17, 2019

Director / Screenplay: Joko Anwar

Cinematography: Ical Tanjung

Editing: Dinda Amanda

Music: Aghi Narottama / Bemby Gusti / Tony Merle / Mian Tiara

Production Studio: Base Entertainment / Rapi Films / CJ Entertainment / Ivanhoe Pictures

Edwin
Vengeance Is Mine, All Others Pay Cash

Country of Origin: Indonesia / Singapore / Germany / France

Exact Release Date: August 8, 2021

Director: Edwin

Screenplay: Edwin / Eka Kurniawan

Cinematography: Akiko Ashizawa

Editing: Lee Chatametikool

Music: Vicki Wendriaji

Production Studio: Palari Films / Phoenix Films / Match Factory

Tran Anh Hung
The Scent of Green Papaya

Country of Origin: Vietnam / France

Exact Release Date: June 8, 1993

Director / Screenplay: Tran Anh Hung

Cinematography: Benoît Delhomme

Editing: Nicole Dedieu / Jean-Pierre Galland

Music: Tôn-Thất Tiết

Production Studio: Les Productions Lazennec

The Cyclo

Country of Origin: Vietnam / France / Hong Kong

Exact Release Date: September 15, 1995

Director / Screenplay: Tran Anh Hung

Cinematography: Benoît Delhomme

Editing: Nicole Dedieu / Claude Ronzeau

Music: Tôn-Thất Tiết

Production Studio: Les Productions Lazennec / Lumière

Rithy Panh
The Missing Picture

Country of Origin: Cambodia / France

Exact Release Date: May 19, 2013

Director / Screenplay: Rithy Panh

Cinematography: Prum Mesa

Editing: Rithy Panh / Marie-Christine Rougerie

Music: Marc Marder

Production Studio: CDP / Catherine Dussart Productions / Bophana Center

Yasmin Ahmad
Sepet

Country of Origin: Malaysia

Exact Release Date: February 24, 2005

Director / Screenplay: Yasmin Ahmad

Cinematography: Low Soon Keong

Editing: Affandi Jamaludin

Production Studio: MHZ Productions

Eric Khoo
Mee Pok Man

Country of Origin: Singapore

Exact Release Date: April 21, 1995

Director: Eric Khoo

Screenplay: Eric Khoo / Michael Chiang

Cinematography: Ho Yoke Weng

Editing: Beon Wong

Music: Kevin Mathews / Christopher Fernandez

Production Studio: Zhao Wei Films
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Apichatpong Weerasethakul", "Pen-Ek Ratanaruang", "Nonzee Nimibutr",
    "Lino Brocka", "Lav Diaz", "Brillante Mendoza", "Garin Nugroho",
    "Joko Anwar", "Edwin", "Tran Anh Hung", "Rithy Panh",
    "Yasmin Ahmad", "Eric Khoo"
];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (knownDirectors.includes(line) && !line.includes(':')) {
        currentDirector = line;
        if (!moviesByDirector[currentDirector]) {
            moviesByDirector[currentDirector] = [];
        }
        currentMovieObj = null;
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
        } else if (key === 'Director / Screenplay / Cinematography / Editing') {
            currentMovieObj.director = value;
            currentMovieObj.writer = value;
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
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    if (year) {
        url += `&year=${year}`;
    }
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                const posterPath = json.results[0].poster_path;
                if (posterPath) {
                    resolve(`https://image.tmdb.org/t/p/w500${posterPath}`);
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        } catch(e) {
            resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    const constPrefix = content.substring(0, content.indexOf('FILMS_DATA = {') + 'FILMS_DATA = {'.length - 1);
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let dirObj = directors.find(d => d.name === dName && d.region === "southeast-asian");
        if (dirObj) {
            const requestedMovies = moviesByDirector[dName];
            dirObj.mustWatch = [];
            
            for (let mv of requestedMovies) {
                let poster = await fetchTMDB(mv.title, mv.year);
                if (!poster) poster = await fetchTMDB(mv.title); // without year
                
                // Build movie object only with keys that exist (no NA)
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
                if (poster) m.poster = poster;
                
                dirObj.mustWatch.push(m);
            }
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js successfully.");
}

updateData().catch(console.error);
