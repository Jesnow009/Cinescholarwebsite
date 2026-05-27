const fs = require('fs');

const lines = fs.readFileSync('js/app.js', 'utf8').split('\n');
lines.forEach((line, idx) => {
    if (line.includes('activePath') || line.includes('activePage')) {
        if (line.includes('director') || line.includes('editor')) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    }
});
