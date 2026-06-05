const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "Titus Thotawatte" && d.region === "south-asian");

if (dirObj && dirObj.mustWatch) {
    const originalLength = dirObj.mustWatch.length;
    dirObj.mustWatch = dirObj.mustWatch.filter(m => !(m.title === "The Treasure" && m.year === 1972));
    if (dirObj.mustWatch.length < originalLength) {
        console.log("Removed 'The Treasure' (1972) successfully.");
    } else {
        console.log("Movie not found.");
    }
} else {
    console.log("Editor not found.");
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
