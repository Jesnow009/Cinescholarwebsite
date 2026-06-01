const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let dp of data.cinematographer.cinematographers) {
        for (let m of dp.mustWatch) {
            if (m.title === 'K.G.F: Chapter 1') {
                m.poster = 'assets/images/kgf1_poster.png';
                modified = true;
                console.log("Updated K.G.F: Chapter 1 poster.");
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed KGF 1 poster.");
    }
}

run();
