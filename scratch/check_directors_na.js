const fs = require('fs');
const path = require('path');
const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');
content = content.replace(/export default FILMS_DATA;/g, 'module.exports = FILMS_DATA;');
fs.writeFileSync(path.join(__dirname, 'temp_data.js'), content, 'utf8');
const FILMS_DATA = require('./temp_data.js');

const directorsToCheck = ['Priyadarshan', 'Lijo Jose Pellissery', 'Dileesh Pothan', 'Rajeev Ravi', 'Jeethu Joseph', 'Amal Neerad'];
const req = ['writer', 'cinematographer', 'editor', 'composer', 'studio', 'releaseDate', 'country', 'duration'];

for (const key in FILMS_DATA) {
    if (FILMS_DATA[key].directors) {
        FILMS_DATA[key].directors.forEach(d => {
            if (directorsToCheck.includes(d.name)) {
                d.mustWatch.forEach(m => {
                    req.forEach(r => {
                        if (m[r] === undefined || m[r] === null || m[r] === 'NA' || m[r] === 'N/A' || m[r] === '') {
                            console.log(`${d.name} - ${m.title} is missing ${r} (currently ${m[r]})`);
                        }
                    });
                });
            }
        });
    }
}
