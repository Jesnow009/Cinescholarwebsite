const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name.includes("Jill Bilcock") && (d.region === "australian-oceanic" || d.region.includes("australian") || d.region.includes("oceanic")));

if (dirObj) {
    for (let m of dirObj.mustWatch) {
        if (m.title === "Road to Nhill") {
            m.poster = "assets/movies/road_to_nhill.png";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated Road to Nhill poster successfully.");
