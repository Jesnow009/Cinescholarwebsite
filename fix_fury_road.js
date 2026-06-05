const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const movieData = {
    title: "Mad Max: Fury Road",
    year: 2015,
    releaseDate: "May 14, 2015",
    director: "George Miller",
    writer: "George Miller / Brendan McCarthy / Nico Lathouris",
    cinematographer: "John Seale",
    editor: "Margaret Sixel",
    composer: "Tom Holkenborg (Junkie XL)",
    studio: "Kennedy Miller Mitchell / Village Roadshow Pictures",
    country: "Australia / United States",
    focus: "Feminist action, non-stop kinetic energy, and dystopian world-building"
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    if (year) url += `&year=${year}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                const posterPath = json.results[0].poster_path;
                const overview = json.results[0].overview;
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

async function fix() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    const dirObj = directors.find(d => d.name === "George Miller" && d.region === "australian-oceanic");

    if (dirObj) {
        let tmdbData = await fetchTMDB(movieData.title, movieData.year);
        
        let m = {
            title: movieData.title,
            year: movieData.year,
            releaseDate: movieData.releaseDate,
            director: movieData.director,
            writer: movieData.writer,
            cinematographer: movieData.cinematographer,
            editor: movieData.editor,
            composer: movieData.composer,
            studio: movieData.studio,
            country: movieData.country,
            poster: tmdbData.poster,
            plot: tmdbData.plot,
            focus: movieData.focus
        };
        
        dirObj.mustWatch.push(m);

        let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
        const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
        fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
        console.log("Fixed Mad Max: Fury Road");
    }
}

fix();
