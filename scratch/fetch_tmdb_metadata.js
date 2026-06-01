const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TARGET_REGIONS = ['chinese', 'hong-kong', 'taiwanese', 'iranian', 'middle-eastern', 'south-asian', 'bengali', 'malayalam', 'tamil', 'hindi', 'telugu', 'kannada', 'marathi'];

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', err => resolve(null));
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    if (!match) {
        console.error("Could not parse FILMS_DATA");
        process.exit(1);
    }
    
    let data;
    try {
        data = eval('(' + match[1] + ')');
    } catch (e) {
        console.error("Eval error", e);
        process.exit(1);
    }
    
    let modified = false;

    if (data.cinematographer && data.cinematographer.cinematographers) {
        for (const person of data.cinematographer.cinematographers) {
            if (TARGET_REGIONS.includes(person.region.toLowerCase())) {
                if (person.mustWatch) {
                    for (const movie of person.mustWatch) {
                        if (movie.writer === 'N/A' || movie.releaseDate === 'N/A') {
                            console.log(`Fetching metadata for: ${movie.title}`);
                            
                            // 1. Search Movie
                            const query = encodeURIComponent(movie.title);
                            let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
                            if (movie.year) {
                                searchUrl += `&year=${movie.year}`;
                            }
                            
                            const searchRes = await fetchJson(searchUrl);
                            await sleep(100);
                            
                            if (searchRes && searchRes.results && searchRes.results.length > 0) {
                                const movieId = searchRes.results[0].id;
                                
                                // 2. Get Details
                                const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
                                const details = await fetchJson(detailsUrl);
                                await sleep(100);
                                
                                // 3. Get Credits
                                const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
                                const credits = await fetchJson(creditsUrl);
                                await sleep(100);
                                
                                if (details && credits) {
                                    movie.releaseDate = details.release_date || "Unknown";
                                    
                                    const studios = details.production_companies ? details.production_companies.map(c => c.name).slice(0, 2).join(", ") : "Unknown";
                                    movie.studio = studios || "Unknown";
                                    
                                    const writers = credits.crew.filter(c => c.department === 'Writing' || c.job === 'Screenplay' || c.job === 'Writer').map(c => c.name);
                                    movie.writer = writers.length > 0 ? [...new Set(writers)].slice(0, 3).join(", ") : "Unknown";
                                    
                                    const dps = credits.crew.filter(c => c.job === 'Director of Photography' || c.job === 'Cinematographer').map(c => c.name);
                                    movie.cinematographer = dps.length > 0 ? [...new Set(dps)].slice(0, 2).join(", ") : person.name; // default to person if not found
                                    
                                    const editors = credits.crew.filter(c => c.job === 'Editor').map(c => c.name);
                                    movie.editor = editors.length > 0 ? [...new Set(editors)].slice(0, 2).join(", ") : "Unknown";
                                    
                                    const composers = credits.crew.filter(c => c.job === 'Original Music Composer' || c.job === 'Music').map(c => c.name);
                                    movie.composer = composers.length > 0 ? [...new Set(composers)].slice(0, 2).join(", ") : "Unknown";
                                    
                                    // if missing director
                                    if (movie.director === 'N/A' || !movie.director) {
                                        const directors = credits.crew.filter(c => c.job === 'Director').map(c => c.name);
                                        movie.director = directors.length > 0 ? [...new Set(directors)].slice(0, 2).join(", ") : "Unknown";
                                    }
                                    
                                    modified = true;
                                    console.log(`  -> Updated: ${movie.releaseDate}, ${movie.studio}, ${movie.cinematographer}`);
                                }
                            } else {
                                console.log(`  -> Not found on TMDB: ${movie.title}`);
                            }
                        }
                    }
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated metadata for targeted regions.");
    } else {
        console.log("No modifications were needed or found.");
    }
}

run();
