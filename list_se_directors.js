const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const data = context.FILMS_DATA.direction['southeast-asian'];
if (data) {
    console.log(data.map(d => d.name));
} else {
    console.log("Not found");
}
