const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    
    let missing = [];
    for (const p of data.cinematographer.cinematographers) {
        for (const m of p.mustWatch) {
            if (!m.poster || m.poster.includes('placeholder.jpg') || m.poster === '' || m.poster.includes('null')) {
                missing.push(`${m.title} (${p.name})`);
            }
        }
    }

    if (missing.length > 0) {
        console.log("Missing posters for:");
        console.log(missing.join('\n'));
    } else {
        console.log("All posters are populated!");
    }
}

run();
