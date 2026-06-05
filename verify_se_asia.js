const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const api = directors.find(d => d.name === "Pen-Ek Ratanaruang" && d.region === "southeast-asian");
console.log(JSON.stringify(api.mustWatch, null, 2));

const api2 = directors.find(d => d.name === "Lav Diaz" && d.region === "southeast-asian");
if (api2) {
    console.log(JSON.stringify(api2.mustWatch, null, 2));
}
