const https = require('https');

function searchWikiTitle(query) {
  return new Promise((resolve) => {
    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
    const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.query.search.length > 0) {
            resolve(parsed.query.search[0].title);
          } else {
            resolve(null);
          }
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function fetchWikiImage(title) {
  return new Promise((resolve) => {
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
    const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
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
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const movies = [
    "Anantha Rathriya",
    "Between Two Worlds Vimukthi Jayasundara",
    "Ontoryatra",
    "Doob: No Bed of Roses",
    "Manto Sarmad Khoosat",
    "Kamli film 2022",
    "Shambhala 2024 film",
    "Highway Nepali film 2012"
  ];
  
  for (const m of movies) {
    const title = await searchWikiTitle(m);
    if (title) {
       const img = await fetchWikiImage(title);
       console.log(`${m} -> ${title} -> ${img}`);
    } else {
       console.log(`${m} -> NOT FOUND`);
    }
  }
}
run();
