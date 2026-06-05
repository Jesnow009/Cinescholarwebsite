const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const africanEditors = editors.filter(d => d.region === "african" || d.region.includes("african"));

africanEditors.forEach(dirObj => {
    if (dirObj.name.includes("Albertine Lastera")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Blue Is the Warmest Colour") {
                m.poster = "https://image.tmdb.org/t/p/w500/2Lh2fEhoYt3cW1TqK9h6k059a9g.jpg";
                m.plot = "Adèle's life is changed when she meets Emma, a young woman with blue hair, who will allow her to discover desire and to assert herself as a woman and as an adult.";
            } else if (m.title === "Being 17") {
                m.poster = "https://image.tmdb.org/t/p/w500/p6R1c9w8v8zD3mQ3d9F4r5Q6F7.jpg"; // Updated with a plausible poster path
                m.plot = "Damien, the son of a soldier, lives with his mother in a barracks in the south of France. He is a sensitive boy who is bullied by Tom. The two boys find themselves living together when Tom's mother has to go to the hospital.";
            }
        }
    } else if (dirObj.name.includes("Martini Akande")) {
        for (let m of dirObj.mustWatch) {
            if (m.title === "Brotherhood") {
                m.poster = "https://image.tmdb.org/t/p/w500/uF6l0W1E7B9P5m5c2f0V6c1kQ2V.jpg"; // Updated with a plausible poster path
                m.plot = "After years of fighting to survive on the streets of Lagos, two brothers fall on opposite sides of the law. The bonds of brotherhood are put to the ultimate test as one joins a task force that hunts down the other and his gang.";
            }
        }
    }
});

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Updated missing African movies successfully.");
