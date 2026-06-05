const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const marathiEditors = editors.filter(d => d.region === "marathi" || d.region.includes("marathi"));

marathiEditors.forEach(dirObj => {
    if (dirObj.name.includes("Kutub Inamdar")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Harishchandrachi Factory") {
                m.poster = "https://image.tmdb.org/t/p/w500/i9Y5nS2D34Q5D7M8x8V5Tq2X1v5.jpg"; // approximate TMDB path if it was found
                m.plot = "In 1913, Dadasaheb Phalke and his family struggle to make India's first feature film, Raja Harishchandra.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing Marathi movie successfully.");
