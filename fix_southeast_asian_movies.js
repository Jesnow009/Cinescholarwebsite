const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "Lee Chatametikool" && d.region === "southeast-asian");

if (dirObj) {
    for (let m of dirObj.mustWatch) {
        if (m.title === "Tropical Malady") {
            m.poster = "https://image.tmdb.org/t/p/w500/p6fJ1b9O6kYdF6W3v2D4s9G7O5E.jpg";
            m.plot = "A romance between a soldier and a country boy is disrupted when the boy disappears, leading the soldier to venture into the jungle where he encounters a mythical tiger spirit.";
        } else if (m.title === "Syndromes and a Century") {
            m.poster = "https://image.tmdb.org/t/p/w500/8dD9qR3fO3wLp7vO1v5Qv7mZ8xG.jpg";
            m.plot = "A film in two parts, following a female doctor in a rural hospital and a male doctor in a city hospital, exploring their memories, relationships, and the contrasting environments.";
        } else if (m.title === "Uncle Boonmee Who Can Recall His Past Lives") {
            m.poster = "https://image.tmdb.org/t/p/w500/4gC9g8r6y9w8mO7D3v4Z2k9uG6B.jpg";
            m.plot = "Suffering from acute kidney failure, Uncle Boonmee has chosen to spend his final days surrounded by his loved ones in the countryside. Surprisingly, the ghost of his deceased wife appears to care for him, and his long lost son returns home in a non-human form.";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing Southeast Asian movies successfully.");
