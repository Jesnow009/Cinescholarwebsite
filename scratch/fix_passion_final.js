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
                m.poster = 'https://a.ltrbxd.com/resized/film-poster/3/6/4/1/9/2/364192-passion-0-230-0-345-crop.jpg';
                modified = true;
                console.log(`Patched actual poster for ${m.title}`);
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully patched actual Passion poster.");
    }
}

run();
