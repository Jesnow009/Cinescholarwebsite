const fs = require('fs');

const renameFileContent = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace text
    let newContent = content
        .replace(/CineAcademy/g, 'CineScholar')
        .replace(/CINEACADEMY/g, 'CINESCHOLAR')
        .replace(/cineacademy/g, 'cinescholar');
        
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        return true;
    }
    return false;
};

let modifiedCount = 0;
const files = fs.readdirSync('.');

// Modify all HTML files
for (const file of files) {
    if (file.endsWith('.html')) {
        if (renameFileContent(file)) {
            modifiedCount++;
        }
    }
}

// Modify JS files
const jsFiles = ['js/app.js', 'js/data.js'];
for (const file of jsFiles) {
    if (fs.existsSync(file)) {
        if (renameFileContent(file)) {
            modifiedCount++;
        }
    }
}

console.log('Successfully renamed across ' + modifiedCount + ' files.');
