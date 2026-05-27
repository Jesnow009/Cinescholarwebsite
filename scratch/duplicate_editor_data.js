const fs = require('fs');

const dataPath = 'js/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const startKey = '"editor": {';
const endKey = '"sound": {';

const startIdx = content.indexOf(startKey);
const endIdx = content.indexOf(endKey);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find editor or sound key in data.js');
    process.exit(1);
}

// Extract editor block (including trailing comma/newlines, but up to the start of "sound": {)
const editorBlock = content.substring(startIdx, endIdx);

// Modify the editor block for editor1
let editor1Block = editorBlock.replace('"editor": {', '"editor1": {');
editor1Block = editor1Block.replace('"id": "editor",', '"id": "editor1",');
editor1Block = editor1Block.replace('"title": "EDITING",', '"title": "EDITING 1",');

// Also update the list key "editors" inside to "editors" or keep it "editors"?
// Wait, in app.js:
// `const listKey = state.activePath === "director" ? "directors" : "editors";`
// If we have state.activePath === "editor1", the list key would be "editors" if we map it like:
// `const listKey = state.activePath === "director" ? "directors" : (state.activePath === "editor" ? "editors" : "editors");`
// Wait, we can keep the sub-array key as "editors" inside the editor1 object, or rename it to something else.
// Actually, keeping the property as "editors" inside the editor1 object is perfectly fine because we access it via `path[listKey]`.
// Let's check:
// In `data.js`, the "editor" object has:
// `"editors": [`
// If we keep `"editors": [` in the new "editor1" object, then when we resolve the list key for "editor1" in app.js:
// `const listKey = state.activePath === "director" ? "directors" : "editors";`
// So it will access `FILMS_DATA["editor1"]["editors"]`. This is perfect and simple! We don't need to rename the array key, just the root object key.
// But wait, let's verify if there is any other reference to "editor" inside the editorBlock that needs to be updated.
// The editors themselves have region, era, quote, bio, style, mustWatch, etc. None of these contain "editor" as an ID except maybe the region files or links, but we only duplicate the database data here.
// Let's check if the editors inside "editor" have "editor" in their ID. No, their IDs are editor names like "sergei-eisenstein", "sally-menke", etc.
// Let's double check if there are any other properties.

// Insert editor1 block right before "sound": {
const newContent = content.substring(0, endIdx) + editor1Block + '\n' + content.substring(endIdx);

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Duplicated editor key in data.js to editor1.');
