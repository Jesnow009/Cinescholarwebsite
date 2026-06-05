const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name.includes("B. Ajithkumar") && (d.region === "malayalam" || d.region.includes("malayalam")));

if (dirObj) {
    for (let m of dirObj.mustWatch) {
        if (m.title === "Kammatipaadam") {
            m.poster = "assets/movies/kammatipaadam.png";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated Kammatipaadam poster successfully.");
