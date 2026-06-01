const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');

const missingMovies = [
    { id: 'a-brighter-summer-day', query: 'A Brighter Summer Day' }, // removing year constraint
    { id: 'yi-yi', query: 'Yi Yi: A One and a Two' } // using extended title often found on TMDB
];

function fetchPoster(query) {
    return new Promise((resolve) => {
        const url = `${TMDB_BASE_URL}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.results && parsed.results.length > 0 && parsed.results[0].poster_path) {
                        resolve(POSTER_BASE_URL + parsed.results[0].poster_path);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(POSTERS_DIR, filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
}

async function run() {
    for (const m of missingMovies) {
        console.log(`Searching for ${m.id} using query: ${m.query}...`);
        
        let posterUrl = await fetchPoster(m.query);

        if (posterUrl) {
            console.log(`  Found: ${posterUrl}`);
            await downloadImage(posterUrl, `${m.id}.jpg`);
            console.log(`  Downloaded ${m.id}.jpg successfully!`);
        } else {
            console.log(`  STILL NOT FOUND: ${m.id}`);
            // Let's try one more fallback for Yi Yi
            if (m.id === 'yi-yi') {
                console.log('Trying fallback query for Yi Yi...');
                posterUrl = await fetchPoster('Yi Yi');
                if (posterUrl) {
                    console.log(`  Found fallback: ${posterUrl}`);
                    await downloadImage(posterUrl, `${m.id}.jpg`);
                    console.log(`  Downloaded ${m.id}.jpg successfully!`);
                }
            }
        }
    }
}

run();
