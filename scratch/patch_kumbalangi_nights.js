const fs = require('fs');
const https = require('https');
const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const fetchJSON = (url) => new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve(JSON.parse(data)));
    });
});

async function main() {
    console.log("Fetching Kumbalangi Nights data...");
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Kumbalangi+Nights&year=2019`;
    const searchRes = await fetchJSON(searchUrl);
    
    if (searchRes.results && searchRes.results.length > 0) {
        const movieId = searchRes.results[0].id;
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`;
        const movieDetails = await fetchJSON(detailsUrl);
        
        let releaseDate = movieDetails.release_date || 'N/A';
        let studio = (movieDetails.production_companies && movieDetails.production_companies.length > 0) ? movieDetails.production_companies[0].name : 'N/A';
        let director = 'N/A', writer = 'N/A', cinematographer = 'N/A', editor = 'N/A', composer = 'N/A';
        
        if (movieDetails.credits) {
            const crew = movieDetails.credits.crew;
            const d = crew.find(c => c.job === 'Director');
            if (d) director = d.name;
            const w = crew.find(c => c.department === 'Writing' || c.job === 'Screenplay' || c.job === 'Writer');
            if (w) writer = w.name;
            const c = crew.find(c => c.job === 'Director of Photography' || c.job === 'Cinematographer');
            if (c) cinematographer = c.name;
            const e = crew.find(c => c.job === 'Editor');
            if (e) editor = e.name;
            const m = crew.find(c => c.job === 'Original Music Composer' || c.job === 'Music');
            if (m) composer = m.name;
        }
        
        console.log({ releaseDate, studio, director, writer, cinematographer, editor, composer });
        
        let c = fs.readFileSync('js/data.js', 'utf8');
        
        // Use regex to find the Kumbalangi Nights object specifically
        const regex = /("title":\s*"Kumbalangi Nights"[\s\S]*?\})/;
        c = c.replace(regex, (match) => {
            let replaced = match;
            if (director !== 'N/A') replaced = replaced.replace(/"director":\s*"(N\/A|NA|)"/, `"director": "${director}"`);
            if (writer !== 'N/A') replaced = replaced.replace(/"writer":\s*"(N\/A|NA|)"/, `"writer": "${writer}"`);
            if (cinematographer !== 'N/A') replaced = replaced.replace(/"cinematographer":\s*"(N\/A|NA|)"/, `"cinematographer": "${cinematographer}"`);
            if (editor !== 'N/A') replaced = replaced.replace(/"editor":\s*"(N\/A|NA|)"/, `"editor": "${editor}"`);
            if (composer !== 'N/A') replaced = replaced.replace(/"composer":\s*"(N\/A|NA|)"/, `"composer": "${composer}"`);
            if (studio !== 'N/A') replaced = replaced.replace(/"studio":\s*"(N\/A|NA|)"/, `"studio": "${studio}"`);
            if (releaseDate !== 'N/A') replaced = replaced.replace(/"releaseDate":\s*"(N\/A|NA|)"/, `"releaseDate": "${releaseDate}"`);
            return replaced;
        });
        
        fs.writeFileSync('js/data.js', c, 'utf8');
        console.log('Kumbalangi Nights missing fields patched successfully.');
    } else {
        console.log("Could not find movie on TMDB.");
    }
}
main();
