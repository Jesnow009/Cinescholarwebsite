const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "Daniel Rezende" && (d.region === "latin-american" || d.region.includes("latin")));

if (dirObj) {
    for (let m of dirObj.mustWatch) {
        if (m.title === "City of God") {
            m.poster = "https://image.tmdb.org/t/p/w500/zqSpQrNdQEBRWAy0nbEE9Lh91i7.jpg";
            m.plot = "In the poverty-stricken favelas of Rio de Janeiro in the 1970s, two young men choose different paths. Rocket is a budding photographer who documents the increasing drug-related violence of his neighborhood. José 'Zé' Pequeno is an ambitious drug dealer who uses Rocket and his photos as a way to increase his fame as a turf war erupts with his rival, 'Knockout Ned'.";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing Latin American movies successfully.");
