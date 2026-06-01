const fs = require('fs');
const content = fs.readFileSync('d:/Film Studies Website/temp_data.js', 'utf8');
const lines = content.split('\n');
let ids = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"region": "russian"')) {
    for (let j = i; j >= i - 5; j--) {
      if (lines[j].includes('"id":')) {
        let id = lines[j].split('"id": "')[1].split('"')[0];
        ids.push(id);
        break;
      }
    }
  }
}
console.log(ids.join('\n'));
