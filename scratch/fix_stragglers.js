const fs = require('fs');
const dataStr = fs.readFileSync('js/data.js', 'utf8');
const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
const data = eval('(' + match[1] + ')');
let modified = false;

data.cinematographer.cinematographers.forEach(p => {
    if (p.mustWatch) {
        p.mustWatch.forEach(m => {
            if (m.title === 'Farewell My Concubine') {
                m.releaseDate = '1993-01-01'; m.writer = 'Lilian Lee'; m.cinematographer = 'Gu Changwei'; m.editor = 'Pei Xiaonan'; m.composer = 'Zhao Jiping'; m.studio = 'Beijing Film Studio'; modified = true;
            } else if (m.title === 'Red Sorghum') {
                m.releaseDate = '1988-02-01'; m.writer = 'Mo Yan'; m.cinematographer = 'Gu Changwei'; m.editor = 'Du Yuan'; m.composer = 'Zhao Jiping'; m.studio = "Xi'an Film Studio"; modified = true;
            } else if (m.title === 'Paatal Lok') {
                m.releaseDate = '2020-05-15'; m.writer = 'Sudip Sharma'; m.cinematographer = 'Avinash Arun'; m.editor = 'Sanyukta Kaza'; m.composer = 'Naren Chandavarkar'; m.studio = 'Clean Slate Filmz'; modified = true;
            } else if (m.title === 'Kammatipaadam') {
                m.releaseDate = '2016-05-20'; m.writer = 'P. Balachandran'; m.cinematographer = 'Madhu Neelakandan'; m.editor = 'B. Ajithkumar'; m.composer = 'K'; m.studio = 'Global United Media'; modified = true;
            } else if (m.title === 'K.G.F: Chapter 1 & 2') {
                m.releaseDate = '2018-12-21'; m.writer = 'Prashanth Neel'; m.cinematographer = 'Bhuvan Gowda'; m.editor = 'Srikanth Gowda'; m.composer = 'Ravi Basrur'; m.studio = 'Hombale Films'; modified = true;
            }
        });
    }
});

if (modified) {
    let newContent = JSON.stringify(data, null, 4);
    const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
    fs.writeFileSync('js/data.js', newFileContent, 'utf8');
    console.log('Fixed stragglers.');
}
