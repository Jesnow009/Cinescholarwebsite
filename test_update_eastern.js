const fs = require('fs');

const userText = `
Jarosław Kamiński
Ida

Country of Origin: Poland / Denmark / France / United Kingdom

Exact Release Date: August 30, 2013

Director: Paweł Pawlikowski

Screenplay: Paweł Pawlikowski / Rebecca Lenkiewicz

Cinematography: Łukasz Żal / Ryszard Lenczewski

Editing: Jarosław Kamiński

Production Studio: Opus Film / Phoenix Film Investments

Cold War

Country of Origin: Poland / France / United Kingdom

Exact Release Date: May 10, 2018

Director: Paweł Pawlikowski

Screenplay: Paweł Pawlikowski / Janusz Głowacki

Cinematography: Łukasz Żal

Editing: Jarosław Kamiński

Production Studio: Opus Film / Apocalypso Pictures / MK2 Productions

Quo Vadis, Aida?

Country of Origin: Bosnia and Herzegovina / Austria / Germany / France / Netherlands / Poland

Exact Release Date: September 3, 2020

Director / Screenplay: Jasmila Žbanić

Cinematography: Christine A. Maier

Editing: Jarosław Kamiński

Music: Antoni Komasa-Łazarkiewicz

Production Studio: Deblokada / Coop99 / Digital Cube / Extreme Emotions

Ágnes Hranitzky
The Turin Horse

Country of Origin: Hungary / France / Germany / Switzerland

Exact Release Date: February 15, 2011

Director: Béla Tarr / Ágnes Hranitzky

Screenplay: László Krasznahorkai / Béla Tarr

Cinematography: Fred Kelemen

Editing: Ágnes Hranitzky

Music: Mihály Víg

Production Studio: T. T. Filmműhely / Vega Film / Zero Fiction Film

Werckmeister Harmonies

Country of Origin: Hungary / Germany / France / Italy

Exact Release Date: May 12, 2000

Director: Béla Tarr / Ágnes Hranitzky

Screenplay: László Krasznahorkai / Béla Tarr

Cinematography: Gábor Medvigy / Rob Tregethan / Emil Novák / Erwin Lanzensberger / Miklós Gurbán

Editing: Ágnes Hranitzky

Music: Mihály Víg

Production Studio: Goëss Film / 13 Production / Von Vietinghoff Filmproduktion

Sátántangó

Country of Origin: Hungary / Germany / Switzerland

Exact Release Date: February 8, 1994

Director: Béla Tarr

Screenplay: László Krasznahorkai / Béla Tarr

Cinematography: Gábor Medvigy

Editing: Ágnes Hranitzky

Music: Mihály Víg

Production Studio: Vega Film / Von Vietinghoff Filmproduktion

Dávid Jancsó
The Childhood of a Leader

Country of Origin: United Kingdom / France / Hungary

Exact Release Date: September 4, 2015

Director: Brady Corbet

Screenplay: Brady Corbet / Mona Fastvold

Cinematography: Lol Crawley

Editing: Dávid Jancsó

Music: Scott Walker

Production Studio: Unanimous Entertainment / Bow and Arrow Entertainment

White God

Country of Origin: Hungary / Germany / Sweden

Exact Release Date: May 17, 2014

Director: Kornél Mundruczó

Screenplay: Kornél Mundruczó / Viktória Petrányi / Kata Wéber

Cinematography: Marcell Rév

Editing: Dávid Jancsó

Music: Asher Goldschmidt

Production Studio: Proton Cinema / Pola Pandora Filmproduktions / Chimney

Pieces of a Woman

Country of Origin: Canada / United States / Hungary

Exact Release Date: September 4, 2020

Director: Kornél Mundruczó

Screenplay: Kata Wéber

Cinematography: Benjamin Loeb

Editing: Dávid Jancsó

Music: Howard Shore

Production Studio: Bron Studios / Little Lamb / Proton Cinema

Agnieszka Glińska
EO

Country of Origin: Poland / Italy

Exact Release Date: May 19, 2022

Director: Jerzy Skolimowski

Screenplay: Ewa Piaskowska / Jerzy Skolimowski

Cinematography: Michał Dymek

Editing: Agnieszka Glińska

Music: Paweł Mykietyn

Production Studio: Skopia Film / Alien Films

Lamb

Country of Origin: Iceland / Sweden / Poland

Exact Release Date: July 13, 2021

Director: Valdimar Jóhannsson

Screenplay: Sjón / Valdimar Jóhannsson

Cinematography: Eli Arenson

Editing: Agnieszka Glińska

Music: Þórarinn Guðnason

Production Studio: Go to Sheep / Black Spark Productions / Madants

The Girl with the Needle

Country of Origin: Denmark / Poland / Sweden

Exact Release Date: May 15, 2024

Director: Magnus von Horn

Screenplay: Magnus von Horn / Line Langebek

Cinematography: Michał Dymek

Editing: Agnieszka Glińska

Music: Frederikke Hoffmeier

Production Studio: Nordisk Film / Lava Films / TriArt Film
`;

const lines = userText.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
let currentDirector = '';
let currentMovieTitle = '';
let moviesByDirector = {};
let currentMovieObj = null;

const knownDirectors = [
    "Jarosław Kamiński", "Ágnes Hranitzky", "Dávid Jancsó", "Agnieszka Glińska"
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

for (const key of Object.keys(moviesByDirector)) {
    console.log(key + ": " + moviesByDirector[key].map(m => m.title).join(', '));
}
