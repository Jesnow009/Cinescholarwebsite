const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const api = directors.find(d => d.name === "Lav Diaz" && d.region === "southeast-asian");

console.log(Object.keys(api));
console.log("Must Watch focus:", api.mustWatch[0].focus);
