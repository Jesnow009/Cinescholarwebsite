const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "William Chang Suk-ping" && d.region === "hong-kong");

if (dirObj) {
    for (let mv of dirObj.mustWatch) {
        if (mv.title === "In the Mood for Love") {
            mv.poster = "assets/images/in_the_mood_for_love_poster.png";
        } else if (mv.title === "Chungking Express") {
            mv.poster = "assets/images/chungking_express_poster.png";
        } else if (mv.title === "The Grandmaster") {
            mv.poster = "assets/images/the_grandmaster_poster.png";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated William Chang's movie posters successfully.");
