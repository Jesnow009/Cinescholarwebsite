const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
let content = fs.readFileSync(dataPath, 'utf8');
content = content.replace('const FILMS_DATA =', 'module.exports =');

const tempPath = path.join(__dirname, 'temp_val_data.js');
fs.writeFileSync(tempPath, content, 'utf8');

const FILMS_DATA = require(tempPath);
fs.unlinkSync(tempPath);

const reqFields = [
  'id', 'title', 'year', 'director', 'writer', 'cinematographer',
  'editor', 'composer', 'studio', 'poster', 'focus', 'plot',
  'releaseDate', 'country'
];

let errorCount = 0;
let movieCount = 0;

FILMS_DATA.director.directors.forEach(d => {
  if (d.region === 'hindi') {
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
      // Additional checks for specific formats or placeholders
      if (m.poster) {
        const fullPosterPath = path.join(__dirname, '..', m.poster);
        if (!fs.existsSync(fullPosterPath)) {
          console.error(`  [ERROR] Movie "${m.title}" (${m.year}) has poster path "${m.poster}" but the file does not exist on disk!`);
          errorCount++;
        }
        if (m.poster.includes('placeholder') || m.poster.includes('NA') || m.poster.includes('null')) {
          console.warn(`  [WARN] Movie "${m.title}" has potential placeholder poster: "${m.poster}"`);
        }
      }
    });
  }
});

console.log(`\nValidation complete. Checked ${movieCount} movies. Found ${errorCount} errors.`);
if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
