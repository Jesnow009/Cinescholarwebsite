const https = require('https');

function fetchOMDB(title) {
  return new Promise((resolve) => {
    let url = `https://www.omdbapi.com/?apikey=1910609&t=${encodeURIComponent(title)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.Poster && parsed.Poster !== "N/A") {
            resolve(parsed.Poster);
          } else {
             resolve(null);
          }
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

fetchOMDB("Anantha Rathriya").then(res => console.log("Anantha:", res));
fetchOMDB("Manto").then(res => console.log("Manto:", res));
