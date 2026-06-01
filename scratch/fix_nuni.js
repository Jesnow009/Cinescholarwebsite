const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    let dp = data.cinematographer.cinematographers.find(p => p.name === 'Siddhartha Nuni');
    if (dp) {
        dp.image = 'assets/cinematographers/siddhartha_nuni.png';
        modified = true;
        console.log("Updated Siddhartha Nuni profile picture.");
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Siddhartha Nuni profile picture.");
    }
}

run();
