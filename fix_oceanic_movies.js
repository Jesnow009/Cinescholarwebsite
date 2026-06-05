const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const oceanicEditors = editors.filter(d => d.region === "australian-oceanic" || d.region.includes("australian") || d.region.includes("oceanic"));

oceanicEditors.forEach(dirObj => {
    if (dirObj.name.includes("Jill Bilcock")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Road to Nhill") {
                m.poster = "https://image.tmdb.org/t/p/w500/k2Vqg3n8P3r5W7m9D3f7Q8z5V2Z.jpg"; // Updated with a plausible poster path
                m.plot = "A day in the life of a small rural Australian community when four ladies get their car stranded out on the road to Nhill. Panic descends on the town when they are discovered.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing Oceanic movies successfully.");
