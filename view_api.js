const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const dirs = context.FILMS_DATA.director.directors;
const api = dirs.find(d => d.name === "Apichatpong Weerasethakul" && d.region === "southeast-asian");
console.log(JSON.stringify(api, null, 2));
