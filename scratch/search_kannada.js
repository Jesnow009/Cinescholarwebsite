const { fetchJsonWithRetry } = require('./retry_fetch.js');
const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

async function search(title) {
  const query = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  console.log(`Searching for "${title}"...`);
  const res = await fetchJsonWithRetry(url);
  if (res && res.results) {
    res.results.slice(0, 5).forEach(r => {
      console.log(`  ID: ${r.id} | Title: ${r.title} | Release: ${r.release_date} | Poster: ${r.poster_path}`);
    });
  } else {
    console.log(`  No results or error.`);
  }
}

async function run() {
  await search('Sarkari');
  await search('Ramanna Rai');
  await search('Kasaragodu');
  await search('Godhi Banna');
  await search('Ghatashraddha');
  await search('Vamsha Vriksha');
}

run();
