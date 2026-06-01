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
            if (person.region && person.region.toLowerCase() === 'irish') {
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
                        // Add missing fields as N/A so they render, or better yet, maybe I can use TMDB
                        // But for now, let's at least ensure they are "N/A" or empty string if not present
                        ['releaseDate', 'writer', 'cinematographer', 'editor', 'composer', 'studio'].forEach(field => {
                            if (!movie[field]) {
                                movie[field] = "N/A";
                                modified = true;
                            }
                        });
                    });
                }
            }
        });
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Irish cinematographers movie information.");
    } else {
        console.log("No modifications were needed or found.");
    }
}
