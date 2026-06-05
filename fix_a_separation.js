const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "Hayedeh Safiyari" && d.region === "iranian");

if (dirObj) {
    const movie = dirObj.mustWatch.find(m => m.title === "A Separation");
    if (movie) {
        movie.poster = "https://image.tmdb.org/t/p/w500/xQadpnoLokxzN3hRpCPbBGpxsiz.jpg";
        movie.plot = "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.";
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated A Separation successfully.");
