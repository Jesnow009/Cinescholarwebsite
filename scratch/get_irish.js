const fs = require('fs');
const content = fs.readFileSync('d:/Film Studies Website/temp_data.js', 'utf8');
const lines = content.split('\n');
let names = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"region": "irish"')) {
    // go backwards to find name
    for (let j = i; j >= i - 5; j--) {
      if (lines[j].includes('"name":')) {
        let name = lines[j].split('"name": "')[1].split('"')[0];
        names.push(name);
        break;
      }
    }
  }
}
console.log(names.join('\n'));
