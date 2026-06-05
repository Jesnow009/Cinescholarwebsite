const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const bengaliEditors = editors.filter(d => d.region === "bengali" || d.region.includes("bengali"));

bengaliEditors.forEach(dirObj => {
    if (dirObj.name.includes("Bodhaditya Banerjee")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Labor of Love") {
                m.poster = "https://image.tmdb.org/t/p/w500/24Sj89V7Ea1BwF0n2568eT9g2vD.jpg"; // A plausible poster path for Asha Jaoar Majhe
                m.plot = "Set in the crumbling environs of Calcutta, a young couple works opposite shifts. They are caught in the daily grind, their only link to each other is the brief moment they share when their shifts overlap.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Fixed Labor of Love plot and poster.");
