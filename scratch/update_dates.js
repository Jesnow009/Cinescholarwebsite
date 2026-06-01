const fs = require('fs');
const path = require('path');

const datesPath = path.join(__dirname, 'dates.txt');
const dataPath = path.join(__dirname, '..', 'js', 'data.js');

const datesText = fs.readFileSync(datesPath, 'utf8');
const lines = datesText.split('\n');

const movieDates = {};

// Parse dates.txt
for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes('—')) continue;
    
    // Some lines have "Movie Name — Date"
    let [title, date] = trimmed.split('—').map(s => s.trim());
    if (title && date) {
        movieDates[title] = date;
    }
}

let dataContent = fs.readFileSync(dataPath, 'utf8');

let updatedCount = 0;

for (const [title, exactDate] of Object.entries(movieDates)) {
    // We want to find the object with "title": "TITLE" and update its releaseDate.
    // Since properties can be in any order but are generally clustered, we can use a regex that captures from "title": "TITLE", to "releaseDate": "..."
    // Because titles might have special characters (e.g. MASH*), we escape it.
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Look for the title line, then anything up to releaseDate within the same block.
    // The block is enclosed in {}, we just look for "title": "TITLE", then non-greedy match until "releaseDate": "YYYY-MM-DD"
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
console.log(`Successfully updated ${updatedCount} movie dates.`);
