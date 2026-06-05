const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "Titus Thotawatte" && d.region === "south-asian");

if (dirObj) {
    for (let m of dirObj.mustWatch) {
        if (m.title === "The Changing Village") {
            m.poster = "https://image.tmdb.org/t/p/w500/4DcE1EJBFvCmlM6ea6iQ2YdqPxo.jpg";
            m.plot = "Piyal is a handsome young teacher who is hired to teach English to Nanda, a member of a high class family. They fall in love, but can't elope because Piyal is of a lower class. Nanda's parents instead push her into a marriage with Jinadasa, who is of the same class as them. With economic downturn in Sri Lanka, both families lose their status and Jinadasa leaves to try to make a better life for himself; he never achieves his goal and dies penniless. Piyal and Nanda can now finally come together. They have changed however, and the earlier idylic nature of their relationship is not recaptured.";
        } else if (m.title === "The Treasure") {
            m.poster = "https://image.tmdb.org/t/p/w500/q3f2vD9z4S6z0a1kO7H9W7X2e0b.jpg";
            m.plot = "Willie Abeynayake, a superstitious bachelor, discovers a palm leaf manuscript revealing a hidden treasure that requires the sacrifice of a virgin girl with four specific birthmarks. He marries Irene, a woman possessing these marks, with the intent to murder her for the wealth. However, as their relationship deepens, he finds himself genuinely falling in love with her, leading to a tragic inner conflict.";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing South Asian movies successfully.");
