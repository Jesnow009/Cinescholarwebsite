const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    const missing = [
        'Sairat', 'Naal', 'Jhund', 'Phoonk', 'Hawaizaada', 'Ventilator', 'Fandry', 'Ribbon'
    ];

    for (let dp of data.cinematographer.cinematographers) {
        for (let m of dp.mustWatch) {
            if (missing.includes(m.title)) {
                m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(m.title)}`;
                modified = true;
                console.log(`Set placeholder for ${m.title}`);
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Marathi missing posters with placeholders.");
    }
}

run();
