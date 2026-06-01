const fs = require('fs');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'images');

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  const title = "Moonrise Kingdom";
  console.log(`Searching TMDB for ${title}...`);
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0 && data.results[0].poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
      console.log(`Found TMDB URL for ${title}: ${posterUrl}`);
      
      const imgRes = await fetch(posterUrl);
      if (!imgRes.ok) throw new Error(`HTTP error downloading image: ${imgRes.status}`);
      
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const filename = normalizeTitle(title) + '.jpg';
      const filepath = path.join(ASSETS_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      
      console.log(`Downloaded ${title} to ${filepath}`);
    } else {
      console.log(`Could not find poster for ${title} on TMDB`);
    }
  } catch (error) {
    console.error(`Error:`, error);
  }
}

run();
