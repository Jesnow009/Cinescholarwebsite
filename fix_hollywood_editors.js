const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const missingMovies = [
    {
        editor: "Sally Menke",
        movie: {
            title: "Kill Bill: Vol. 1",
            year: 2003,
            releaseDate: "October 10, 2003",
            director: "Quentin Tarantino",
            writer: "Quentin Tarantino",
            cinematographer: "Robert Richardson",
            editor: "Sally Menke",
            composer: "RZA",
            studio: "A Band Apart / Miramax",
            country: "United States",
            focus: "Highly stylized, genre-blending action editing with visceral pacing."
        }
    },
    {
        editor: "Richard Chew",
        movie: {
            title: "Star Wars (Episode IV: A New Hope)",
            year: 1977,
            releaseDate: "May 25, 1977",
            director: "George Lucas",
            writer: "George Lucas",
            cinematographer: "Gilbert Taylor",
            editor: "Paul Hirsch / Marcia Lucas / Richard Chew",
            composer: "John Williams",
            studio: "Lucasfilm Ltd.",
            country: "United States",
            focus: "Pioneering, fast-paced cross-cutting that defined modern blockbuster pacing."
        }
    }
];

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0].replace('Episode IV: ', ''); // for Star Wars
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

    const editors = context.FILMS_DATA.editor.editors;

    for (let missing of missingMovies) {
        const dirObj = editors.find(d => d.name === missing.editor && d.region === "hollywood-na");
        if (dirObj) {
            let tmdbData = await fetchTMDB(missing.movie.title, missing.movie.year);
            
            let m = { ...missing.movie };
            m.poster = tmdbData.poster;
            m.plot = tmdbData.plot;
            
            // Reorder Kill Bill correctly before Inglourious Basterds if possible
            if (missing.movie.title === "Kill Bill: Vol. 1") {
                const idx = dirObj.mustWatch.findIndex(x => x.title === "Inglourious Basterds");
                if (idx !== -1) {
                    dirObj.mustWatch.splice(idx, 0, m);
                } else {
                    dirObj.mustWatch.push(m);
                }
            } else if (missing.movie.title === "Star Wars (Episode IV: A New Hope)") {
                dirObj.mustWatch.unshift(m);
            } else {
                dirObj.mustWatch.push(m);
            }
            console.log(`Fixed ${m.title} for ${missing.editor}`);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Fixed missing Hollywood Editors successfully.");
}

fix();
