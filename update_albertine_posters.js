const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name.includes("Albertine Lastera") && (d.region === "african" || d.region.includes("african")));

if (dirObj) {
    for (let movie of dirObj.mustWatch) {
        if (movie.title === "Blue Is the Warmest Colour") {
            movie.poster = "assets/movies/blue_is_the_warmest_colour.png";
        } else if (movie.title === "Being 17") {
            movie.poster = "assets/movies/being_17.png";
        }
    }
} else {
    console.log("Editor not found.");
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated posters successfully.");
