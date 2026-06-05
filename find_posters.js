const https = require('https');
const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchTMDB(query) {
  return new Promise((resolve) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                console.log(`Results for ${query}:`);
                json.results.slice(0, 1).forEach(r => {
                    console.log(`- ${r.title} (${r.release_date}):`);
                    console.log(`  Poster: https://image.tmdb.org/t/p/w500${r.poster_path}`);
                    console.log(`  Plot: ${r.overview}`);
                });
            } else {
                console.log(`No results for ${query}`);
            }
        } catch(e) {
            console.error(e);
        }
        resolve();
      });
    }).on('error', (e) => {
        console.error("Error:", e);
        resolve();
    });
  });
}

async function run() {
    await fetchTMDB("All About My Mother");
    await new Promise(r => setTimeout(r, 1000));
    await fetchTMDB("Talk to Her");
}

run();
