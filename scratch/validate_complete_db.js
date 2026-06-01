const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
if (!fs.existsSync(dataPath)) {
  console.error('Error: js/data.js does not exist.');
  process.exit(1);
}

let content = fs.readFileSync(dataPath, 'utf8');
content = content.replace('const FILMS_DATA =', 'module.exports =');

const tempPath = path.join(__dirname, 'temp_val_all_data.js');
fs.writeFileSync(tempPath, content, 'utf8');

const FILMS_DATA = require(tempPath);
fs.unlinkSync(tempPath);

let errorCount = 0;
let checkedCount = 0;

const checkMovie = (m, context) => {
  checkedCount++;
  if (!m.title) {
    console.error(`  [ERROR] Movie in ${context} is missing title!`);
    errorCount++;
    return;
  }
  if (m.poster) {
    if (m.poster.startsWith('assets/')) {
      const fullPosterPath = path.join(__dirname, '..', m.poster);
      if (!fs.existsSync(fullPosterPath)) {
        console.error(`  [ERROR] Movie "${m.title}" in ${context} has poster path "${m.poster}" but the file does not exist on disk!`);
        errorCount++;
      }
    }
  } else {
    console.error(`  [ERROR] Movie "${m.title}" in ${context} is missing poster field!`);
    errorCount++;
  }
};

// 1. Check Directors
if (FILMS_DATA.director && FILMS_DATA.director.directors) {
  FILMS_DATA.director.directors.forEach(d => {
    if (d.mustWatch) {
      d.mustWatch.forEach(m => checkMovie(m, `Director ${d.name}`));
    }
  });
}

// 2. Check Writers
if (FILMS_DATA.writer && FILMS_DATA.writer.writers) {
  FILMS_DATA.writer.writers.forEach(w => {
    if (w.mustWatch) {
      w.mustWatch.forEach(m => checkMovie(m, `Writer ${w.name}`));
    }
  });
}

// 3. Check Editors
if (FILMS_DATA.editor && FILMS_DATA.editor.editors) {
  FILMS_DATA.editor.editors.forEach(e => {
    if (e.mustWatch) {
      e.mustWatch.forEach(m => checkMovie(m, `Editor ${e.name}`));
    }
  });
}

// 4. Check Cinematographers
if (FILMS_DATA.cinematographer && FILMS_DATA.cinematographer.cinematographers) {
  FILMS_DATA.cinematographer.cinematographers.forEach(c => {
    if (c.mustWatch) {
      c.mustWatch.forEach(m => checkMovie(m, `Cinematographer ${c.name}`));
    }
  });
}

// 5. Check Sound
if (FILMS_DATA.sound && FILMS_DATA.sound.films) {
  FILMS_DATA.sound.films.forEach(m => checkMovie(m, 'Sound section'));
}

console.log(`\nComprehensive validation complete. Checked ${checkedCount} film entries across all sections. Found ${errorCount} errors.`);
if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
