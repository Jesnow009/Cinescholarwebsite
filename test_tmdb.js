const https = require('https');

function scrapeTMDB(query) {
  return new Promise((resolve) => {
    let url = `https://www.themoviedb.org/search/movie?query=${encodeURIComponent(query)}`;
    const options = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Look for something like: src="/t/p/w94_and_h141_bestv2/v4J79K7m3N.jpg" or src="https://media.themoviedb.org/t/p/w94_and_h141_bestv2/..."
        let match = data.match(/src="[^"]*?\/t\/p\/(w94_and_h141_bestv2|w150_and_h225_bestv2)\/([^"]+)"/);
        if (match && match[2]) {
           resolve(`https://image.tmdb.org/t/p/w500/${match[2]}`);
        } else {
           resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

scrapeTMDB("Anantha Rathriya").then(res => console.log("Anantha:", res));
scrapeTMDB("Kamli").then(res => console.log("Kamli:", res));
