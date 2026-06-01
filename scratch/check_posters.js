const fs = require('fs');
const https = require('https');

let raw = fs.readFileSync('js/data.js', 'utf8');
raw = raw.replace(/^const\s+FILMS_DATA\s*=\s*/, '');
raw = raw.replace(/;?\s*$/, '');
const dataObj = eval('(' + raw + ')');

const naRegion = dataObj.cinematographer.cinematographers.filter(c => c.region === 'hollywood-na');
const posters = [];
naRegion.forEach(c => {
  c.mustWatch.forEach(m => {
    if (m.poster) posters.push(m.poster);
  });
});

console.log(`Checking ${posters.length} posters...`);

let broken = 0;
let checked = 0;

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        broken++;
        console.log(`BROKEN [${res.statusCode}]: ${url}`);
      }
      checked++;
      if (checked === posters.length) {
        console.log(`Done. ${broken} broken posters out of ${posters.length}`);
      }
      resolve();
    }).on('error', (e) => {
      broken++;
      console.log(`ERROR: ${url} - ${e.message}`);
      checked++;
      if (checked === posters.length) {
        console.log(`Done. ${broken} broken posters out of ${posters.length}`);
      }
      resolve();
    });
  });
}

async function run() {
  for (const p of posters) {
    await checkUrl(p);
  }
}

run();
