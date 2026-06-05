const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const dirObj = directors.find(d => d.name === "Bruce Beresford" && d.region === "australian-oceanic");

if (dirObj) {
    const movie = dirObj.mustWatch.find(m => m.title === "Breaker Morant");
    if (movie) {
        movie.poster = "assets/images/breaker_morant_poster.png";
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated Breaker Morant poster successfully.");
