const fs = require('fs');
const path = require('path');

const directory = 'd:\\Film Studies Website';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove list items for Screenwriting and Sound Design
    content = content.replace(/.*<li><a href="screenwriting\.html(?:".*?>|>).*?<\/a><\/li>.*\r?\n/g, '');
    content = content.replace(/.*<li><a href="sound-design\.html(?:".*?>|>).*?<\/a><\/li>.*\r?\n/g, '');
    
    // Also remove the "active" versions if they exist
    content = content.replace(/.*<li class="active"><a href="screenwriting\.html(?:".*?>|>).*?<\/a><\/li>.*\r?\n/g, '');
    content = content.replace(/.*<li class="active"><a href="sound-design\.html(?:".*?>|>).*?<\/a><\/li>.*\r?\n/g, '');

    if (filePath.endsWith('index.html')) {
        // Remove Path cards
        // They look like:
        // <!-- Path 3: SCREENWRITING -->
        // ... (until </a>)
        content = content.replace(/[ \t]*<!-- Path 3: SCREENWRITING -->[\s\S]*?<\/a>\r?\n/g, '');
        content = content.replace(/[ \t]*<!-- Path 5: SOUND DESIGN -->[\s\S]*?<\/a>\r?\n/g, '');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // we don't have nested html files but just in case
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    });
}

traverseDirectory(directory);

// Delete the files
try {
    fs.unlinkSync(path.join(directory, 'screenwriting.html'));
    console.log('Deleted screenwriting.html');
} catch(e) {
    console.log('screenwriting.html already deleted or not found.');
}

try {
    fs.unlinkSync(path.join(directory, 'sound-design.html'));
    console.log('Deleted sound-design.html');
} catch(e) {
    console.log('sound-design.html already deleted or not found.');
}

console.log("Done.");
