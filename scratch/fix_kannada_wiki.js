const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    const fixes = {
        'K.G.F: Chapter 1': 'https://upload.wikimedia.org/wikipedia/en/c/c0/K.G.F_Chapter_1_poster.jpg',
        'K.G.F: Chapter 2': 'https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg',
        'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 'https://upload.wikimedia.org/wikipedia/en/9/91/Vendhu_Thanindhathu_Kaadu_poster.jpg'
    };

    let dp1 = data.cinematographer.cinematographers.find(p => p.name === 'Bhuvan Gowda');
    let dp2 = data.cinematographer.cinematographers.find(p => p.name === 'Siddhartha Nuni');

    for (let dp of [dp1, dp2]) {
        if (!dp) continue;
        for (let m of dp.mustWatch) {
            if (fixes[m.title]) {
                m.poster = fixes[m.title];
                console.log(`Fixed broken poster for ${m.title} with Wikipedia`);
                modified = true;
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed broken Kannada posters with Wikipedia links.");
    }
}

run();
