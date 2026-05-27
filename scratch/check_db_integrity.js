const fs = require('fs');

const data = fs.readFileSync('js/data.js', 'utf8');

// Define global.FILMS_DATA so eval binds it to a property we can read
global.FILMS_DATA = null;

// Replace const FILMS_DATA = with FILMS_DATA =
const modData = data.replace('const FILMS_DATA =', 'FILMS_DATA =');

eval(modData);

console.log('Keys of FILMS_DATA:', Object.keys(FILMS_DATA));
console.log('directors count:', FILMS_DATA.director ? FILMS_DATA.director.directors.length : 'undefined');
console.log('editors count:', FILMS_DATA.editor ? FILMS_DATA.editor.editors.length : 'undefined');
console.log('cinematographers count:', FILMS_DATA.cinematographer ? FILMS_DATA.cinematographer.cinematographers.length : 'undefined');
