const fs = require('fs');
const path = require('path');

let fData = null;
try {
    fData = require('../temp_data.js'); // Use the root one!
} catch (e) {
    console.error('Failed to require ../temp_data.js', e);
    process.exit(1);
}

if (!fData || !fData.director || !fData.director.directors) {
    console.error('../temp_data.js did not load correctly', typeof fData);
    process.exit(1);
}

const mapped = require('./tamil_movies_mapped.json');
let updatedCount = 0;

fData.director.directors.forEach(d => {
    if (mapped[d.name]) {
        d.mustWatch = mapped[d.name];
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} directors! Writing to data.js...`);

const output = `const FILMS_DATA = ${JSON.stringify(fData, null, 4)};\n`;
fs.writeFileSync(path.join(__dirname, '../js/data.js'), output, 'utf8');

console.log('Success!');
