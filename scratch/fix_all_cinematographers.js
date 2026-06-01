const fs = require('fs');

const dataStr = fs.readFileSync('js/data.js', 'utf8');
const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);

if (match) {
    let data;
    try {
        data = eval('(' + match[1] + ')');
    } catch (e) {
        console.error("Eval error", e);
        process.exit(1);
    }
    
    let modified = false;

    if (data.cinematographer && data.cinematographer.cinematographers) {
        data.cinematographer.cinematographers.forEach(person => {
            if (person.mustWatch) {
                person.mustWatch.forEach(movie => {
                    // Rename takeaway to focus
                    if (movie.takeaway && !movie.focus) {
                        movie.focus = movie.takeaway;
                        delete movie.takeaway;
                        modified = true;
                    }
                    // Rename synopsis to plot
                    if (movie.synopsis && !movie.plot) {
                        movie.plot = movie.synopsis;
                        delete movie.synopsis;
                        modified = true;
                    }
                    // Add missing fields as N/A so they render correctly in the movie card
                    ['releaseDate', 'writer', 'cinematographer', 'editor', 'composer', 'studio'].forEach(field => {
                        if (!movie[field]) {
                            movie[field] = "N/A";
                            modified = true;
                        }
                    });
                });
            }
        });
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully normalized all cinematographers movie information.");
    } else {
        console.log("No modifications were needed or found.");
    }
}
