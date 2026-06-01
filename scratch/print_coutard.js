const fs = require('fs');
const dataStr = fs.readFileSync('js/data.js', 'utf8');
const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
const data = eval('(' + match[1] + ')');
const coutard = data.cinematographer.cinematographers.find(c => c.name === 'Raoul Coutard');
const breathless = coutard.mustWatch.find(m => m.title.includes('Breathless'));
console.log(breathless.poster);
