const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
// Search specifically for Pablo Larrain
const dirObj = directors.find(d => d.name === "Nacer Khemir" && d.region === "african");

if (dirObj && dirObj.mustWatch) {
    let movie = dirObj.mustWatch.find(m => m.title === "Bab'Aziz - The Prince That Contemplated His Soul");
    if (movie) {
        movie.poster = "assets/images/bab_aziz_poster.png";
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated Bab'Aziz poster successfully.");
