const fs = require('fs');
const path = require('path');

const titlesFile = path.join(__dirname, 'malayalam_movie_titles.json');
const titles = JSON.parse(fs.readFileSync(titlesFile, 'utf8'));

const missing = [];
for (let m of titles) {
    const posterPath = path.join(__dirname, '..', m.posterPath);
    if (!fs.existsSync(posterPath)) {
        missing.push(m);
    } else {
        // Also check if the file size is 0 bytes
        const stats = fs.statSync(posterPath);
        if (stats.size === 0) {
            missing.push(m);
        }
    }
}

console.log(`Missing posters: ${missing.length}`);
missing.forEach(m => console.log(m.title));
fs.writeFileSync(path.join(__dirname, 'missing_malayalam.json'), JSON.stringify(missing, null, 2));
