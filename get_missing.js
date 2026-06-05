const fs = require('fs');
const dataStr = fs.readFileSync('js/data.js', 'utf8');
const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});\s*const SIMULATOR_PRESETS/);
if (match) {
    const data = eval('(' + match[1] + ')');
    let toUpdate = [];
    ['director', 'editor', 'cinematographer'].forEach(path => {
        if (!data[path]) return;
        let listKey = path + 's';
        if (data[path][listKey]) {
            data[path][listKey].forEach(person => {
                if (person.region === 'bengali' || person.region === 'malayalam') {
                    if (person.mustWatch) {
                        person.mustWatch.forEach(movie => {
                            if (movie.plot === "Plot details to be updated." || !movie.plot) {
                                toUpdate.push(movie.title);
                            }
                        });
                    }
                }
            });
        }
    });
    console.log("Movies to update:");
    console.log(JSON.stringify(toUpdate, null, 2));
} else {
    console.log("Could not parse data");
}
