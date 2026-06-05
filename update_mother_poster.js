const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const pedro = directors.find(d => d.name === "Pedro Almodovar" && d.region === "spanish-portuguese");

if (pedro && pedro.mustWatch) {
    let mother = pedro.mustWatch.find(m => m.title === "All About My Mother");
    if (mother) {
        mother.poster = "assets/images/all_about_my_mother_poster.png";
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated All About My Mother poster successfully.");
