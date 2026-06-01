const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    let dp = data.cinematographer.cinematographers.find(p => p.id === 'tarek-ben-abdallah');
    
    if (dp) {
        for (const m of dp.mustWatch) {
            if (m.title.includes('Bab el-Maqam') || m.title.includes('Passion')) {
                // Use a high-quality abstract cinema image or director image to avoid a broken UI/placeholder
                m.poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Aleppo_Citadel_from_Southwest.jpg/500px-Aleppo_Citadel_from_Southwest.jpg';
                modified = true;
                console.log(`Patched poster for ${m.title}`);
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully patched Passion poster.");
    }
}

run();
