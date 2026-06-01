const fs = require('fs');
let data = fs.readFileSync('d:/Film Studies Website/temp_data.js', 'utf8');
data = data.replace(/"N\/A"/g, '"None"');
data = data.replace(/"NA"/g, '"None"');
fs.writeFileSync('d:/Film Studies Website/temp_data.js', data);
