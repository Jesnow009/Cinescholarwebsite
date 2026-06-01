const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');

    let originalLength = data.cinematographer.cinematographers.length;
    data.cinematographer.cinematographers = data.cinematographer.cinematographers.filter(dp => dp.name !== 'Babacar Juuf');
    
    if (data.cinematographer.cinematographers.length < originalLength) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully removed Babacar Juuf from African Cinematographers");
    } else {
        console.log("Babacar Juuf not found.");
    }
}

run();
