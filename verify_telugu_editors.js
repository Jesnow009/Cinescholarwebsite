const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const teluguEditors = editors.filter(d => d.region === "telugu" || d.region.includes("telugu"));

let missing = false;
teluguEditors.forEach(d => {
    console.log(`\n=== ${d.name} ===`);
    if (d.mustWatch) {
        d.mustWatch.forEach(m => {
            console.log(`Title: ${m.title}`);
            console.log(`Poster: ${m.poster || 'MISSING'}`);
            console.log(`Plot: ${m.plot || 'MISSING'}`);
            console.log(`Focus: ${m.focus || 'MISSING'}`);
            if (!m.poster || m.plot === "Plot details not available." || !m.focus) missing = true;
        });
    } else {
        console.log('NONE');
    }
});

if (missing) console.log('\nWARNING: SOME FIELDS ARE MISSING!');
else console.log('\nSUCCESS: All fields are populated!');
