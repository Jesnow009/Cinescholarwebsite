const fs = require('fs');
const path = require('path');

const directory = 'd:\\Film Studies Website';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/>Curriculum Pathway</g, '>FILMMAKER STUDY PATHWAY<');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (!fs.statSync(fullPath).isDirectory() && fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    });
}

traverseDirectory(directory);
console.log("Done.");
