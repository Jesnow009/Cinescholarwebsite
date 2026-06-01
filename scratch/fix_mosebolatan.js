const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    let dp = data.cinematographer.cinematographers.find(p => p.name === 'Tunde Kelani');
    if (dp) {
        // Remove Anikura
        const originalLength = dp.mustWatch.length;
        dp.mustWatch = dp.mustWatch.filter(m => !m.title.includes('Anikura'));
        if (dp.mustWatch.length < originalLength) {
            console.log("Removed Anikura from Tunde Kelani's profile.");
            modified = true;
        }

        // Update Mosebolatan
        for (let m of dp.mustWatch) {
            if (m.title.includes('Mosebolatan')) {
                m.poster = 'assets/images/mosebolatan.png';
                modified = true;
                console.log("Updated Mosebolatan poster.");
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Tunde Kelani's profile.");
    }
}

run();
