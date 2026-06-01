const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    
    const initialLen = data.cinematographer.cinematographers.length;
    
    data.cinematographer.cinematographers = data.cinematographer.cinematographers.filter(p => {
        return !(p.id === 'darius-khondji' || p.name === 'Darius Khondji');
    });

    if (data.cinematographer.cinematographers.length < initialLen) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Removed Darius Khondji.");
    } else {
        console.log("Could not find Darius Khondji in database.");
    }
}

run();
