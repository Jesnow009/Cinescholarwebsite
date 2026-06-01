const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
let content = fs.readFileSync(dataPath, 'utf8');
content = content.replace('const FILMS_DATA =', 'module.exports =');

const tempPath = path.join(__dirname, 'temp_val_c_data.js');
fs.writeFileSync(tempPath, content, 'utf8');

const FILMS_DATA = require(tempPath);
fs.unlinkSync(tempPath);

let errorCount = 0;
let checkedCount = 0;

if (FILMS_DATA.cinematographer && FILMS_DATA.cinematographer.cinematographers) {
  FILMS_DATA.cinematographer.cinematographers.forEach(c => {
    if (c.mustWatch) {
      c.mustWatch.forEach(m => {
        checkedCount++;
        if (m.poster) {
          if (m.poster.startsWith('assets/')) {
            const fullPosterPath = path.join(__dirname, '..', m.poster);
            if (!fs.existsSync(fullPosterPath)) {
              console.error(`  [ERROR] Cinematographer ${c.name} - Movie "${m.title}" (${m.year}) has poster path "${m.poster}" but the file does not exist on disk!`);
              errorCount++;
            }
          }
        } else {
          console.error(`  [ERROR] Cinematographer ${c.name} - Movie "${m.title}" (${m.year}) is missing poster field!`);
          errorCount++;
        }
      });
    }
  });
}

console.log(`\nCinematographer validation complete. Checked ${checkedCount} films. Found ${errorCount} errors.`);
if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
