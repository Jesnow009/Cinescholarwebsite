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
                    const originalLength = person.mustWatch.length;
                    person.mustWatch = person.mustWatch.filter(movie => movie.id !== 'the-lobster' && movie.id !== 'his-house');
                    if (person.mustWatch.length !== originalLength) {
                        modified = true;
                        console.log(`Removed movies from ${person.name}`);
                    }
                }
            }
        });
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully removed His House and The Lobster.");
    } else {
        console.log("No modifications were needed or found.");
    }
}
