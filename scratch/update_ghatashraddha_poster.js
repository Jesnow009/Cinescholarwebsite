const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'temp_data.js');
let dataStr = fs.readFileSync(dbPath, 'utf8');

// Evaluate FILMS_DATA
global.FILMS_DATA = null;
const modData = dataStr.replace('const FILMS_DATA =', 'FILMS_DATA =');
eval(modData);

const filmsData = global.FILMS_DATA;
if (!filmsData) {
  console.error('Failed to load temp_data.js');
  process.exit(1);
}

// Find Girish Kasaravalli
const director = filmsData.director.directors.find(d => d.name === 'Girish Kasaravalli');
if (!director) {
  console.error('Director Girish Kasaravalli not found!');
  process.exit(1);
}

// Find Ghatashraddha
const movie = director.mustWatch.find(m => m.title === 'Ghatashraddha');
if (!movie) {
  console.error('Movie Ghatashraddha not found!');
  process.exit(1);
}

console.log('Old poster path:', movie.poster);
movie.poster = 'assets/images/ghatashraddha-real.png';
console.log('New poster path:', movie.poster);

// Write updated database back to temp_data.js
const output = `const FILMS_DATA = ${JSON.stringify(filmsData, null, 4)};\n\nmodule.exports = FILMS_DATA;\n`;
fs.writeFileSync(dbPath, output, 'utf8');
console.log('Successfully updated temp_data.js with new Ghatashraddha poster!');
