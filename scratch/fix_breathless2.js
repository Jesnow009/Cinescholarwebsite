const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'raoul-coutard' || p.name === 'Raoul Coutard') {
            for (const m of p.mustWatch) {
                if (m.title.includes('Breathless')) {
                    m.poster = 'https://image.tmdb.org/t/p/w500/9Wx0Wdn2EOqeCZU4SP6tlS3LOml.jpg';
                    modified = true;
                    console.log("Fixed Breathless poster to match TMDB default.");
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
    }
}

run();
