const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');

let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const fetchJSON = (url, retries = 5) => {
    return new Promise((resolve, reject) => {
        const attempt = () => {
            https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        if (retries > 0) { retries--; setTimeout(attempt, 2000); } else reject(e);
                    }
                });
            }).on('error', (err) => {
                if (retries > 0) {
                    console.log(`Error: ${err.message}. Retrying... (${retries} left)`);
                    retries--;
                    setTimeout(attempt, 2000);
                } else {
                    resolve(null); // Just return null on failure so it doesn't crash
                }
            }).on('timeout', () => {
                if (retries > 0) {
                    console.log(`Timeout. Retrying... (${retries} left)`);
                    retries--;
                    setTimeout(attempt, 2000);
                } else {
                    resolve(null);
                }
            });
        };
        attempt();
    });
};

const requiredFields = ['director', 'writer', 'cinematographer', 'editor', 'composer', 'studio', 'releaseDate'];
const targetDirectors = ['Priyadarshan', 'Lijo Jose Pellissery', 'Dileesh Pothan', 'Rajeev Ravi', 'Jeethu Joseph', 'Amal Neerad'];

async function main() {
    let changed = false;
    const lines = dataJsContent.split('\n');
    let currentDirector = '';
    let currentTitle = '';
    let currentYear = '';
    let inDirectorBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        // Track the current director we're inside
        const dirMatch = lines[i].match(/"name":\s*"([^"]+)"/);
        if (dirMatch) {
            currentDirector = dirMatch[1];
        }

        const titleMatch = lines[i].match(/"title":\s*"([^"]+)"/);
        if (titleMatch) {
            currentTitle = titleMatch[1];
        }
        
        const yearMatch = lines[i].match(/"year":\s*(\d+)/);
        if (yearMatch) {
            currentYear = yearMatch[1];
        }

        if (targetDirectors.includes(currentDirector)) {
            for (const field of requiredFields) {
                const regex = new RegExp(`"${field}":\\s*(?:"N/A"|""|"NA")`);
                if (regex.test(lines[i])) {
                    console.log(`Fixing ${currentTitle} (${currentYear}) for ${currentDirector} - ${field}`);
                    
                    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentTitle)}&year=${currentYear}`;
                    const searchRes = await fetchJSON(searchUrl);
                    
                    let movieDetails = null;
                    if (searchRes && searchRes.results && searchRes.results.length > 0) {
                        const movieId = searchRes.results[0].id;
                        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`;
                        movieDetails = await fetchJSON(detailsUrl);
                    }
                    
                    let newValue = 'N/A';
                    if (movieDetails) {
                        if (field === 'releaseDate') {
                            newValue = movieDetails.release_date || 'N/A';
                        } else if (field === 'studio') {
                            newValue = (movieDetails.production_companies && movieDetails.production_companies.length > 0) ? movieDetails.production_companies[0].name : 'N/A';
                        } else if (movieDetails.credits) {
                            const crew = movieDetails.credits.crew;
                            if (field === 'director') {
                                const d = crew.find(c => c.job === 'Director');
                                if (d) newValue = d.name;
                            } else if (field === 'writer') {
                                const w = crew.find(c => c.department === 'Writing' || c.job === 'Screenplay' || c.job === 'Writer');
                                if (w) newValue = w.name;
                            } else if (field === 'cinematographer') {
                                const c = crew.find(c => c.job === 'Director of Photography' || c.job === 'Cinematographer');
                                if (c) newValue = c.name;
                            } else if (field === 'editor') {
                                const e = crew.find(c => c.job === 'Editor');
                                if (e) newValue = e.name;
                            } else if (field === 'composer') {
                                const c = crew.find(c => c.job === 'Original Music Composer' || c.job === 'Music');
                                if (c) newValue = c.name;
                            }
                        }
                    }
                    
                    if (newValue !== 'N/A' && newValue !== '') {
                        newValue = newValue.replace(/"/g, '\\"');
                        lines[i] = lines[i].replace(/"(N\/A|NA|)"/, `"${newValue}"`);
                        console.log(`  -> Set ${field} to ${newValue}`);
                        changed = true;
                    } else {
                        console.log(`  -> TMDB returned no data for ${field}. (Will fallback to manual later if needed)`);
                        // Set to "Unknown" so it's not "N/A" if we want, but let's leave it as is so it doesn't break
                    }
                }
            }
        }
    }
    
    if (changed) {
        fs.writeFileSync(dataJsPath, lines.join('\n'), 'utf8');
        console.log('data.js updated successfully for the targeted directors.');
    } else {
        console.log('No missing fields found or fixed for the targeted directors.');
    }
}

main().catch(console.error);
