const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.name === 'Asakazu Nakai' || p.id === 'asakazu-nakai') {
            for (const m of p.mustWatch) {
                if (m.title.toLowerCase().includes('ikiru')) {
                    console.log(`Old editor for Ikiru was: ${m.editor}`);
                    m.editor = 'Kōichi Iwashita';
                    modified = true;
                    console.log(`Updated editor to: ${m.editor}`);
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Ikiru.");
    } else {
        console.log("Could not find Asakazu Nakai or Ikiru.");
    }
}

run();
