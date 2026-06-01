const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve(null); }
      });
    }).on('error', e => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

const moviesToFetch = [
  { id: 'tingya', title: 'Tingya', year: 2008 },
  { id: 'dekh-indian-circus', title: 'Dekh Indian Circus', year: 2012 }
];

async function run() {
  for (const movie of moviesToFetch) {
    const filename = `${movie.id}.jpg`;
    const targetPath = path.join(__dirname, '..', 'assets', 'images', filename);
    
    let query = encodeURIComponent(movie.title);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${movie.year}`;
    
    console.log(`Fetching TMDB for ${movie.title}...`);
    let mRes = await fetchJson(url);
    let posterUrl = null;

    if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
      posterUrl = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      mRes = await fetchJson(url);
      if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
        posterUrl = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
      }
    }

    if (posterUrl) {
      console.log(`Downloading ${posterUrl} to ${targetPath}`);
      await download(posterUrl, targetPath);
      console.log(`Successfully downloaded ${movie.title}`);
    } else {
      console.log(`Could not find poster for ${movie.title} on TMDB.`);
    }
  }
}

run();
