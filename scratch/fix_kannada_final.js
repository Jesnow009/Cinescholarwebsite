const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    // Hardcode fallbacks
    const fallbacks = {
        'K.G.F: Chapter 1': 'https://a.ltrbxd.com/resized/film-poster/4/9/9/0/0/7/499007-k-g-f-chapter-1-0-230-0-345-crop.jpg',
        'K.G.F: Chapter 2': 'https://a.ltrbxd.com/resized/film-poster/5/0/5/4/1/1/505411-k-g-f-chapter-2-0-230-0-345-crop.jpg',
        'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 'https://a.ltrbxd.com/resized/film-poster/7/5/4/7/8/3/754783-vendhu-thanindhathu-kaadu-part-i-the-kindling-0-230-0-345-crop.jpg'
    };

    let dp1 = data.cinematographer.cinematographers.find(p => p.name === 'Bhuvan Gowda');
    let dp2 = data.cinematographer.cinematographers.find(p => p.name === 'Siddhartha Nuni');

    for (let dp of [dp1, dp2]) {
        if (!dp) continue;
        for (let m of dp.mustWatch) {
            if (fallbacks[m.title]) {
                m.poster = fallbacks[m.title];
                console.log(`Hardcoded poster for ${m.title}`);
                modified = true;
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed remaining Kannada posters.");
    }
}

run();
