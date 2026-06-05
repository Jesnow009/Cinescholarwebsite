const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const germanEditors = editors.filter(d => d.region === "german");

germanEditors.forEach(d => {
    console.log(`${d.name}: ${d.mustWatch ? d.mustWatch.map(m => m.title).join(', ') : 'NONE'}`);
});
