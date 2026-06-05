const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const dirs = context.FILMS_DATA.director.directors;
console.log(dirs[48].name, dirs[48].region);
console.log(dirs[427].name, dirs[427].region);
