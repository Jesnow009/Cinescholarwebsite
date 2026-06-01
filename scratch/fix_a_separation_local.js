const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.name === 'Mahmoud Kalari' || p.id === 'mahmoud-kalari') {
            for (const m of p.mustWatch) {
                if (m.title.includes('A Separation')) {
                    m.poster = 'assets/images/a_separation_poster.jpg';
                    modified = true;
                    console.log("Fixed A Separation poster to point to local assets folder.");
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated A Separation poster.");
    }
}

run();
