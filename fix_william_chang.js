const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const moviesToFix = [
    { title: "In the Mood for Love", year: 2000 },
    { title: "Chungking Express", year: 1994 },
    { title: "The Grandmaster", year: 2013 }
];

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                // Find best match by year if possible
                let bestMatch = json.results[0];
                for (let r of json.results) {
                    if (r.release_date && r.release_date.startsWith(year.toString())) {
                        bestMatch = r;
                        break;
                    }
                }
                const posterPath = bestMatch.poster_path;
                const overview = bestMatch.overview;
                resolve({
                    poster: posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null,
                    plot: overview || "Plot details not available."
                });
            } else {
                resolve({poster: null, plot: "Plot details not available."});
            }
        } catch(e) {
            resolve({poster: null, plot: "Plot details not available."});
        }
      });
    }).on('error', () => resolve({poster: null, plot: "Plot details not available."}));
  });
}

async function fixData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const editors = context.FILMS_DATA.editor.editors;
    const dirObj = editors.find(d => d.name === "William Chang Suk-ping" && d.region === "hong-kong");

    if (dirObj) {
        for (let mv of dirObj.mustWatch) {
            let tmdbData = await fetchTMDB(mv.title, mv.year);
            if (tmdbData.poster) mv.poster = tmdbData.poster;
            if (tmdbData.plot !== "Plot details not available.") mv.plot = tmdbData.plot;
            console.log(`Updated ${mv.title}: Poster -> ${mv.poster ? 'Yes' : 'No'}`);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Successfully fixed William Chang's movie posters.");
}

fixData().catch(console.error);
