const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const remainingDates = {
    "Star Wars": "May 25, 1977",
    "MASH": "January 25, 1970",
    "The player": "April 10, 1992",
    "Seven (Se7en)": "September 22, 1995",
    "Birdman": "October 17, 2014"
};

let updatedCount = 0;

for (const [title, exactDate] of Object.entries(remainingDates)) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRegex = new RegExp(`("title"\\s*:\\s*"${escapedTitle}"[\\s\\S]*?"releaseDate"\\s*:\\s*)"([^"]+)"`);
    
    const match = dataContent.match(blockRegex);
    if (match) {
        const oldDate = match[2];
        if (oldDate !== exactDate) {
            dataContent = dataContent.replace(blockRegex, `$1"${exactDate}"`);
            updatedCount++;
            console.log(`Updated "${title}" releaseDate from ${oldDate} to ${exactDate}`);
        }
    } else {
        console.log(`Could not find or match releaseDate for "${title}"`);
    }
}

fs.writeFileSync(dataPath, dataContent);
console.log(`Successfully updated ${updatedCount} remaining movie dates.`);
