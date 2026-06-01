const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
let content = fs.readFileSync(dataPath, 'utf8');
content = content.replace('const FILMS_DATA =', 'module.exports =');

const tempPath = path.join(__dirname, 'temp_final_val_data.js');
fs.writeFileSync(tempPath, content, 'utf8');

const FILMS_DATA = require(tempPath);
fs.unlinkSync(tempPath);

const reqFields = [
  'id', 'title', 'year', 'director', 'writer', 'cinematographer',
  'editor', 'composer', 'studio', 'poster', 'focus', 'plot',
  'releaseDate', 'country'
];

let errorCount = 0;
let checkedCount = 0;

const regions = ['hindi', 'telugu', 'kannada'];

FILMS_DATA.director.directors.forEach(d => {
  if (regions.includes(d.region)) {
    console.log(`Checking Director: ${d.name} (Region: ${d.region}, ${d.mustWatch.length} films)`);
    d.mustWatch.forEach(m => {
      checkedCount++;
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

console.log(`\nValidation complete. Checked ${checkedCount} films in ${regions.join(', ')} regions. Found ${errorCount} errors.`);
if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
