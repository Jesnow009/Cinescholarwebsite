const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const nordicDirectors = directors.filter(d => d.region === "nordic");

nordicDirectors.forEach(d => {
    console.log(`${d.name}: ${d.mustWatch ? d.mustWatch.map(m => m.title).join(', ') : 'NONE'}`);
    if (d.name === "Ingmar Bergman") {
        console.log(JSON.stringify(d.mustWatch[0], null, 2));
    }
});
