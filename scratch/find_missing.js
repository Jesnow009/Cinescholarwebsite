const fs = require('fs');

let raw = fs.readFileSync('js/data.js', 'utf8');
raw = raw.replace(/^const\s+FILMS_DATA\s*=\s*/, '');
raw = raw.replace(/;?\s*$/, ''); // remove trailing semicolon

let dataObj;
try {
  dataObj = JSON.parse(raw);
} catch (e) {
  console.error("JSON Parse failed, trying eval...");
  try {
    dataObj = eval('(' + raw + ')');
  } catch(e2) {
    console.error("Eval failed:", e2);
    process.exit(1);
  }
}

let issues = [];
const naRegion = dataObj.cinematographer.cinematographers.filter(c => c.region === 'hollywood-na');

naRegion.forEach(c => {
  c.mustWatch.forEach(m => {
    let missing = [];
    if (!m.poster || m.poster.includes('N/A') || m.poster.trim() === '') missing.push('poster');
    if (!m.composer || m.composer === 'N/A' || m.composer.trim() === '') missing.push('composer');
    if (!m.studio || m.studio === 'N/A' || m.studio.trim() === '') missing.push('studio');
    if (!m.plot || m.plot === 'N/A' || m.plot.trim() === '') missing.push('plot');
    if (!m.synopsis || m.synopsis === 'N/A' || m.synopsis.trim() === '') missing.push('synopsis');
    
    if (missing.length > 0) {
      issues.push(`Cinematographer: ${c.id} | Movie: ${m.title} (${m.year}) | Missing: ${missing.join(', ')}`);
    }
  });
});

console.log(`Found ${issues.length} movies with missing details in Hollywood/NA.`);
issues.forEach(i => console.log(i));
