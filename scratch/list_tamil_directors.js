const fs = require('fs');
let c = fs.readFileSync('js/data.js', 'utf8');
c = c.replace(/export default FILMS_DATA;/, 'module.exports = FILMS_DATA;');
fs.writeFileSync('temp_data.js', c);
const d = require('./temp_data.js');

let tamilDirectors = [];
for (const key in d) {
    if (d[key].directors) {
        tamilDirectors = tamilDirectors.concat(
            d[key].directors.filter(x => x.region === 'tamil').map(x => x.name)
        );
    }
}
console.log(tamilDirectors.join('\n'));
