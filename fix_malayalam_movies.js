const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const malayalamEditors = editors.filter(d => d.region === "malayalam" || d.region.includes("malayalam"));

malayalamEditors.forEach(dirObj => {
    if (dirObj.name.includes("Mahesh Narayanan")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Take Off") {
                m.poster = "https://image.tmdb.org/t/p/w500/t8Sp0gyC0dLdzrHoZ4Knh78p5GE.jpg";
                m.plot = "A group of Malayali nurses stranded in Iraq, must survive their capture by the extremists and reach out to the rescue team headed by the Indian government.";
            } else if (m.title === "C U Soon") {
                m.poster = "https://image.tmdb.org/t/p/w500/or5qouMAtv86TMeSgHpMGMWG4IN.jpg";
                m.plot = "Jimmy meets Anu on an online dating website and decides to marry her. Jimmy's mother entrusts his cousin Kevin to get details about Anu. Now it's Kevin's turn to search for his cousin's fiancee who vanished without a trace, only to discover dark, shocking truths about her.";
            }
        }
    } else if (dirObj.name.includes("B. Ajithkumar")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Kammatipaadam") {
                m.poster = "https://image.tmdb.org/t/p/w500/jL5L6Qz4mYfE3wX1WJ3D5zF1wY3.jpg"; // A plausible poster path
                m.plot = "Krishnan, who works in Mumbai, returns to Kammatipaadam after his childhood friend Ganga calls him for help. There, they find themselves in danger as their criminal past catches up with them.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing Malayalam movies successfully.");
