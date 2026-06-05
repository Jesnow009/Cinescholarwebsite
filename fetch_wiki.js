const https = require('https');
const fs = require('fs');

const wikiTitles = {
  "Anantha Rathriya": "Anantha Rathriya",
  "Between Two Worlds": "Between Two Worlds (2009 film)",
  "Ontoryatra": "Ontoryatra",
  "Doob: No Bed of Roses": "Doob: No Bed of Roses",
  "Manto": "Manto (2015 film)",
  "Kamli": "Kamli (2022 film)",
  "Shambhala": "Shambhala (2024 film)",
  "Highway": "Highway (2012 Nepali film)"
};

function fetchWikiImage(title) {
  return new Promise((resolve) => {
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
    const options = {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== "-1" && pages[pageId].original) {
            resolve(pages[pageId].original.source);
          } else {
             resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
    let fileContent = fs.readFileSync('js/data.js', 'utf8');
    
    for (let m in wikiTitles) {
        let img = await fetchWikiImage(wikiTitles[m]);
        if (img) {
            console.log(`Found for ${m}: ${img}`);
            // Find the movie block and replace "poster": "" with "poster": "IMG"
            let titleRegex = new RegExp(`"title": "${m.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}"[\\s\\S]*?"poster": ""`);
            fileContent = fileContent.replace(titleRegex, (match) => {
                return match.replace('"poster": ""', `"poster": "${img}"`);
            });
        } else {
            console.log(`Not found for ${m}`);
        }
    }
    fs.writeFileSync('js/data.js', fileContent);
}
run();
