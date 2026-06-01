const fs = require('fs');
const content = fs.readFileSync('d:/Film Studies Website/temp_data.js', 'utf8');
const lines = content.split('\n');
let names = [];
let isDirector = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"region": "eastern-european"')) {
    isDirector = false;
    for (let k = i; k < i + 20 && k < lines.length; k++) {
      if (lines[k].includes('"mustWatch":')) {
        isDirector = true;
        break;
      }
      if (lines[k].includes('"name":')) {
         if (k > i+2) break;
      }
    }
    
    if (isDirector) {
      for (let j = i; j >= i - 5; j--) {
        if (lines[j].includes('"name":')) {
          let name = lines[j].split('"name": "')[1].split('"')[0];
          names.push(name);
          break;
        }
      }
    }
  }
}
console.log(names.join('\n'));
