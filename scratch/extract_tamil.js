const fs = require('fs');
const txt = fs.readFileSync('js/data.js', 'utf8');
const res = [...txt.matchAll(/"name":\s*"([^"]+)"[\s\S]{0,100}"region":\s*"tamil"/g)].map(m => m[1]);
console.log([...new Set(res)].join('\n'));
