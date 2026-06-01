const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    const fixes = {
        'K.G.F: Chapter 1': 'https://image.tmdb.org/t/p/w500/xXhKxKhnSiaGk2Q0YnZ7xG2yS9b.jpg',
        'K.G.F: Chapter 2': 'https://image.tmdb.org/t/p/w500/tL8hX3s886EaF01q8mN60K3e11K.jpg',
        'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 'https://image.tmdb.org/t/p/w500/kZ0Z23rJ1A4G5aQyYqFpM3a3X5d.jpg'
    };

    let dp1 = data.cinematographer.cinematographers.find(p => p.name === 'Bhuvan Gowda');
    let dp2 = data.cinematographer.cinematographers.find(p => p.name === 'Siddhartha Nuni');

    for (let dp of [dp1, dp2]) {
        if (!dp) continue;
        for (let m of dp.mustWatch) {
            if (fixes[m.title]) {
                m.poster = fixes[m.title];
                console.log(`Fixed broken poster for ${m.title}`);
                modified = true;
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed broken Kannada posters.");
    }
}

run();
