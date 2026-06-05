const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const taiwaneseEditors = editors.filter(d => d.region === "taiwanese");

taiwaneseEditors.forEach(d => {
    console.log(`\n=== ${d.name} ===`);
    if (d.mustWatch) {
        d.mustWatch.forEach(m => {
            console.log(`Title: ${m.title}`);
            console.log(`Poster: ${m.poster || 'MISSING'}`);
            console.log(`Plot: ${m.plot || 'MISSING'}`);
            console.log(`Focus: ${m.focus || 'MISSING'}`);
        });
    } else {
        console.log('NONE');
    }
});
