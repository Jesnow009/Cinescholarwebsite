const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    // We can just find Robbie Ryan or another Irish DP and copy their region string if we want to be safe.
    let irishId = 'irish';
    for (let p of data.cinematographer.cinematographers) {
        if (p.name === 'Robbie Ryan' || p.name === 'Seamus McGarvey' && p.region && p.region.includes('irish')) {
             if (p.region !== 'british') { // just in case
                irishId = p.region;
             }
        }
    }

    for (let p of data.cinematographer.cinematographers) {
        if (p.id === 'seamus-mcgarvey' || p.name === 'Seamus McGarvey') {
            console.log(`Found ${p.name}, current region: ${p.region}. Changing to ${irishId}`);
            p.region = irishId;
            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Moved Seamus McGarvey to Irish section.");
    } else {
        console.log("Could not find Seamus McGarvey in database.");
    }
}

run();
