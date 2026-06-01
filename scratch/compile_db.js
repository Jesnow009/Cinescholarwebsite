const fs = require('fs');
const path = require('path');

const tempDbPath = path.join(__dirname, '../temp_data.js');
if (!fs.existsSync(tempDbPath)) {
  console.error('Error: temp_data.js does not exist at ' + tempDbPath);
  process.exit(1);
}

const fData = require(tempDbPath);
const output = `const FILMS_DATA = ${JSON.stringify(fData, null, 4)};\n`;
fs.writeFileSync(path.join(__dirname, '../js/data.js'), output, 'utf8');
console.log('Successfully compiled temp_data.js to js/data.js');
