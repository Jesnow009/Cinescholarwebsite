const fs = require('fs');

const content = fs.readFileSync('js/data.js', 'utf8');
const start = content.indexOf('"editor": {');
const end = content.indexOf('"sound": {');

if (start !== -1 && end !== -1) {
    const linesBefore = content.substring(0, start).split('\n').length;
    const linesDuring = content.substring(start, end).split('\n').length;
    console.log(`start line: ${linesBefore}, end line: ${linesBefore + linesDuring - 1}`);
} else {
    console.log('not found', start, end);
}
