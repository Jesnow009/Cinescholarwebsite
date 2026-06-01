const fs = require('fs');
const path = require('path');

async function run() {
  const url = 'https://www.themoviedb.org/movie/83666-moonrise-kingdom';
  console.log(`Fetching HTML from ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    fs.writeFileSync(path.join(__dirname, 'tmdb.html'), html);
    console.log('Saved to tmdb.html');
  } catch (error) {
    console.error(`Error:`, error);
  }
}

run();
