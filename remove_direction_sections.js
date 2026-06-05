const fs = require('fs');
const path = require('path');

const directory = 'd:\\Film Studies Website';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove the links
    content = content.replace(/<a href="direction-animation\.html".*?>Animation Masters<\/a>\r?\n?/g, '');
    content = content.replace(/<a href="direction-documentary\.html".*?>Documentary Masters<\/a>\r?\n?/g, '');
    content = content.replace(/<a href="direction-experimental\.html".*?>Experimental & Avant-Garde Cinema<\/a>\r?\n?/g, '');
    content = content.replace(/<a href="#" class="active">Animation Masters<\/a>\r?\n?/g, '');
    content = content.replace(/<a href="#" class="active">Documentary Masters<\/a>\r?\n?/g, '');
    content = content.replace(/<a href="#" class="active">Experimental & Avant-Garde Cinema<\/a>\r?\n?/g, '');


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

// Delete the files
try { fs.unlinkSync(path.join(directory, 'direction-animation.html')); console.log('Deleted direction-animation.html'); } catch(e) {}
try { fs.unlinkSync(path.join(directory, 'direction-documentary.html')); console.log('Deleted direction-documentary.html'); } catch(e) {}
try { fs.unlinkSync(path.join(directory, 'direction-experimental.html')); console.log('Deleted direction-experimental.html'); } catch(e) {}

console.log("Done.");
