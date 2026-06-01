const fs = require('fs');
let data = fs.readFileSync('js/data.js', 'utf8');
data = data.replace(/"assets\/images\/psycho\.jpg"/g, '"assets/images/psycho.png"');
data = data.replace(/"assets\/images\/leo\.jpg"/g, '"assets/images/leo.png"');
fs.writeFileSync('js/data.js', data, 'utf8');
console.log('Posters updated.');
