const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

// Replace export
content = content.replace(/export default FILMS_DATA;/g, 'module.exports = FILMS_DATA;');
const tempPath = path.join(__dirname, 'temp_data.js');
fs.writeFileSync(tempPath, content, 'utf8');

const FILMS_DATA = require('./temp_data.js');
const requiredFields = ['director', 'writer', 'cinematographer', 'editor', 'composer', 'studio', 'releaseDate'];

let count = 0;
// Note: Object.keys to find directors array
for (const key in FILMS_DATA) {
    if (FILMS_DATA[key].directors) {
        FILMS_DATA[key].directors.forEach(d => {
            if (d.region === 'malayalam') {
                d.mustWatch.forEach(m => {
                    const missing = requiredFields.filter(f => !m[f] || m[f] === '' || m[f] === 'NA');
                    if (missing.length > 0) {
                        console.log(`Movie: ${m.title} (Director: ${d.name}) missing: ${missing.join(', ')}`);
                        count++;
                    }
                });
            }
        });
    }
}
if (count === 0) console.log("No missing properties found!");
