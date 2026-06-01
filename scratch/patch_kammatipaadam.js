const fs = require('fs');
let c = fs.readFileSync('js/data.js', 'utf8');
c = c.replace(/("title":\s*"Kammatipaadam"[\s\S]*?"writer":\s*)"(?:N\/A|NA|)"/, '$1"P. Balachandran"');
fs.writeFileSync('js/data.js', c, 'utf8');
console.log('Fixed Kammatipaadam writer');
