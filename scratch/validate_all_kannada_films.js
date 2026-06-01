const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'temp_data.js');
const FILMS_DATA = require(dbPath);

const reqFields = [
  'id', 'title', 'year', 'director', 'writer', 'cinematographer',
  'editor', 'composer', 'studio', 'poster', 'focus', 'plot',
  'releaseDate', 'country'
];

let errorCount = 0;
let movieCount = 0;

FILMS_DATA.director.directors.forEach(d => {
  if (d.region === 'kannada') {
    console.log(`Checking Director: ${d.name} (${d.mustWatch.length} films)`);
    d.mustWatch.forEach(m => {
      movieCount++;
      reqFields.forEach(field => {
        const val = m[field];
        if (val === undefined || val === null || val === '' || val === 'NA' || val === 'N/A') {
          console.error(`  [ERROR] Movie "${m.title}" (${m.year}) is missing field: "${field}" (value: ${val})`);
          errorCount++;
        }
      });
      if (m.poster) {
        const fullPosterPath = path.join(__dirname, '..', m.poster);
        if (!fs.existsSync(fullPosterPath)) {
          console.error(`  [ERROR] Movie "${m.title}" (${m.year}) has poster path "${m.poster}" but the file does not exist on disk!`);
          errorCount++;
        }
      }
    });
  }
});

console.log(`\nValidation complete. Checked ${movieCount} Kannada movies. Found ${errorCount} errors.`);
if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
