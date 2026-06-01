const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'images');

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  const title = "Moonrise Kingdom";
  console.log(`Searching iTunes for ${title}...`);
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}&entity=movie&limit=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0 && data.results[0].artworkUrl100) {
      let posterUrl = data.results[0].artworkUrl100;
      // Convert to higher resolution
      posterUrl = posterUrl.replace('100x100bb', '600x900bb');
      console.log(`Found iTunes URL for ${title}: ${posterUrl}`);
      
      const imgRes = await fetch(posterUrl);
      if (!imgRes.ok) throw new Error(`HTTP error downloading image: ${imgRes.status}`);
      
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const filename = normalizeTitle(title) + '.jpg';
      const filepath = path.join(ASSETS_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      
      console.log(`Downloaded ${title} to ${filepath}`);
    } else {
      console.log(`Could not find poster for ${title} on iTunes`);
    }
  } catch (error) {
    console.error(`Error:`, error);
  }
}

run();
