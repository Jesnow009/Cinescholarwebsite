const fs = require('fs');
const lines = fs.readFileSync('js/data.js', 'utf8').split('\n');
let titles = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Plot details to be updated.')) {
        let j = i;
        while (j >= 0 && !lines[j].includes('"title"')) {
            j--;
        }
        titles.push(lines[j].trim());
    }
}
console.log(titles.join('\n'));
