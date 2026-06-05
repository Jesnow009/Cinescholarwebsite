const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const tamilEditors = editors.filter(d => d.region === "tamil" || d.region.includes("tamil"));

tamilEditors.forEach(dirObj => {
    if (dirObj.name.includes("Anthony")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Vinnathaandi Varuvaayaa") {
                m.poster = "https://image.tmdb.org/t/p/w500/mH9y7v1V42nU5H80B2V5eP34hF6.jpg";
                m.plot = "Karthik, an aspiring filmmaker, falls in love with Jessie, his neighbour. However, they face several challenges to unite.";
            }
        }
    } else if (dirObj.name.includes("Philomin Raj")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Leo") {
                m.poster = "https://image.tmdb.org/t/p/w500/pD6sL4vvnUThg7ASByWHMAvGMR.jpg"; // Path for 2023 Tamil Leo
                m.plot = "Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains attention from a drug cartel claiming he was once a part of them.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing/wrong Tamil movies successfully.");
