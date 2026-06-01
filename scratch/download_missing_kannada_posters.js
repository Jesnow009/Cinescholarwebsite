const fs = require('fs');
const https = require('https');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        console.log(`Downloaded ${dest} successfully!`);
        resolve();
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      console.error(`Failed to download ${url}:`, err.message);
      reject(err);
    });
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function run() {
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  
  const files = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/en/3/37/Ghatashraddha_poster.jpg',
      dest: path.join(imagesDir, 'ghatashraddha.jpg')
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/en/9/94/Vamsha_Vriksha.jpg',
      dest: path.join(imagesDir, 'vamsha-vriksha.jpg')
    },
    {
      url: 'https://image.tmdb.org/t/p/w500/5pTtrf60IKt2ZfqJFpf2pYKLIBc.jpg',
      dest: path.join(imagesDir, 'sarkari-hi-pra-shaale.jpg')
    },
    {
      url: 'https://image.tmdb.org/t/p/w500/4dImTMse7PPFGHPG6GQuwDng9fB.jpg',
      dest: path.join(imagesDir, 'godhi-banna.jpg')
    }
  ];

  for (const f of files) {
    try {
      await download(f.url, f.dest);
    } catch (e) {
      console.error(`Error processing ${f.dest}:`, e.message);
    }
  }
}

run();
