const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.name === 'Yutaka Yamasaki' || p.id === 'yutaka-yamasaki') {
            for (const m of p.mustWatch) {
                if (m.title.toLowerCase().includes('nobody knows')) {
                    console.log(`Old title: ${m.title}, Old Release Date: ${m.releaseDate}`);
                    m.title = 'Nobody Knows (Dare mo shiranai)';
                    m.releaseDate = '2004-08-07';
                    modified = true;
                    console.log(`Updated title to: ${m.title}`);
                    console.log(`Updated Release Date to: ${m.releaseDate}`);
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Nobody Knows.");
    } else {
        console.log("Could not find Yutaka Yamasaki or Nobody Knows.");
    }
}

run();
