const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const txtPath = path.join(__dirname, 'malayalam_movies.txt');
const txtContent = fs.readFileSync(txtPath, 'utf8');

// Parse the text
const lines = txtContent.split('\n').map(l => l.trim()).filter(l => l);

const directors = {};
let currentDirector = null;
let currentMovie = null;

const knownDirectors = [
    "Adoor Gopalakrishnan", "G. Aravindan", "John Abraham", "P. Padmarajan",
    "Bharathan", "Sathyan Anthikad", "Fazil", "Priyadarshan",
    "Blessy", "Lijo Jose Pellissery", "Dileesh Pothan", "Rajeev Ravi",
    "Jeethu Joseph", "Amal Neerad", "Madhu C. Narayanan"
];

let idx = 0;
while (idx < lines.length) {
    let line = lines[idx];
    if (line === "Malayalam") {
        idx++;
        continue;
    }
    
    if (knownDirectors.includes(line)) {
        currentDirector = line;
        directors[currentDirector] = [];
        idx++;
        continue;
    }
    
    if (currentDirector) {
        // Assume this line is a movie title
        currentMovie = {
            title: line,
            id: line.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            poster: `assets/images/${line.split('(')[0].toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '')}.jpg`,
            focus: "A masterclass in Malayalam cinema.",
            plot: "Plot details to be updated."
        };
        directors[currentDirector].push(currentMovie);
        
        // Now parse the properties for this movie
        idx++;
        while (idx < lines.length && !knownDirectors.includes(lines[idx]) && lines[idx].includes(': ')) {
            let propLine = lines[idx];
            let [key, ...valParts] = propLine.split(': ');
            let val = valParts.join(': ').trim();
            
            if (key === "Exact Release Date") currentMovie.releaseDate = val;
            if (key === "Director / Screenplay" || key === "Director: " || key === "Screenplay: " || key.startsWith("Director")) {
                // handle variations
                if (key.includes("Screenplay")) {
                    let parts = val.split('/');
                    currentMovie.director = parts[0].trim();
                    currentMovie.writer = parts.length > 1 ? parts[1].trim() : val;
                } else if (key.startsWith("Director")) {
                    let parts = val.split('/');
                    currentMovie.director = parts[0].trim();
                    if (parts.length > 1) currentMovie.writer = parts[1].trim();
                } else if (key.startsWith("Screenplay")) {
                    currentMovie.writer = val;
                }
            }
            if (key.startsWith("Cinematography")) currentMovie.cinematographer = val;
            if (key === "Editing") currentMovie.editor = val;
            if (key === "Music") currentMovie.composer = val;
            if (key === "Production Studio") currentMovie.studio = val;
            if (key === "Country of Origin") currentMovie.country = val;
            
            // Generate year from exact release date
            if (currentMovie.releaseDate) {
                let yearMatch = currentMovie.releaseDate.match(/\d{4}/);
                if (yearMatch) {
                    currentMovie.year = parseInt(yearMatch[0], 10);
                }
            }
            
            idx++;
        }
    } else {
        idx++;
    }
}

let updatedCount = 0;

for (let dir of knownDirectors) {
    let movies = directors[dir];
    if (!movies) continue;
    
    let mustWatchStr = `"mustWatch": [\n` + movies.map(m => {
        return `                    {
                        "id": "${m.id}",
                        "title": "${m.title.replace(/"/g, '\\"')}",
                        "year": ${m.year},
                        "director": "${m.director || ''}",
                        "writer": "${m.writer || ''}",
                        "cinematographer": "${m.cinematographer || ''}",
                        "editor": "${m.editor || ''}",
                        "composer": "${m.composer || ''}",
                        "studio": "${m.studio || ''}",
                        "poster": "${m.poster}",
                        "focus": "${m.focus}",
                        "plot": "${m.plot}",
                        "releaseDate": "${m.releaseDate || ''}"
                    }`;
    }).join(',\n') + `\n                ]`;
    
    // Find the director in dataContent and replace their mustWatch array
    const dirRegex = new RegExp(`("name"\\s*:\\s*"${dir}"[\\s\\S]*?)"mustWatch"\\s*:\\s*\\[[\\s\\S]*?\\](?=\\s*,\\s*"scenes")`);
    
    const match = dataContent.match(dirRegex);
    if (match) {
        dataContent = dataContent.replace(dirRegex, `$1${mustWatchStr}`);
        updatedCount++;
        console.log(`Updated mustWatch for ${dir}`);
    } else {
        console.log(`Could not find mustWatch block for ${dir}`);
    }
}

fs.writeFileSync(dataPath, dataContent);
console.log(`Successfully updated ${updatedCount} Malayalam directors.`);

// Save a list of titles for TMDB fetcher later
const titles = [];
for (let dir in directors) {
    for (let m of directors[dir]) {
        titles.push({
            title: m.title.split('(')[0].trim(),
            year: m.year,
            posterPath: m.poster
        });
    }
}
fs.writeFileSync(path.join(__dirname, 'malayalam_movie_titles.json'), JSON.stringify(titles, null, 2));

