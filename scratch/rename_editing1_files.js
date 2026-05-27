const fs = require('fs');
const path = require('path');

const projectDir = 'd:/Film Studies Website';

// 1. Process editing1.html -> cinematography.html
const srcHub = path.join(projectDir, 'editing1.html');
const destHub = path.join(projectDir, 'cinematography.html');

if (fs.existsSync(srcHub)) {
    let content = fs.readFileSync(srcHub, 'utf8');

    // Perform replacements
    content = content.replace(/EDITING 1 Curriculum/g, 'CINEMATOGRAPHY Curriculum');
    content = content.replace(/body data-page="editor1-hub"/g, 'body data-page="cinematographer-hub"');
    content = content.replace(/EDITING 1 HUB/g, 'CINEMATOGRAPHY HUB');
    content = content.replace(/editing1\.html/g, 'cinematography.html');
    content = content.replace(/Editing 1/g, 'Cinematography');
    content = content.replace(/Search Editors, Films & Crew/g, 'Search Cinematographers, Films & Crew');
    content = content.replace(/global-search-input\"\s*placeholder=\"Search by editor/g, 'global-search-input" placeholder="Search by cinematographer');
    content = content.replace(/These filmmakers represent the definitive master editors/g, 'These filmmakers represent the definitive master cinematographers');
    content = content.replace(/each editor and corresponding film/g, 'each cinematographer and corresponding film');
    content = content.replace(/shaping editing language/g, 'shaping cinematography language');

    fs.writeFileSync(destHub, content, 'utf8');
    fs.unlinkSync(srcHub);
    console.log('Renamed and processed hub page to cinematography.html');
} else {
    console.error('Source editing1.html does not exist!');
}

// 2. Process editing1-*.html -> cinematography-*.html
const files = fs.readdirSync(projectDir).filter(f => f.startsWith('editing1-') && f.endsWith('.html'));
console.log(`Found ${files.length} editing1 subpages to process.`);

files.forEach(file => {
    const srcPath = path.join(projectDir, file);
    const destFile = file.replace('editing1-', 'cinematography-');
    const destPath = path.join(projectDir, destFile);

    let content = fs.readFileSync(srcPath, 'utf8');

    // Perform replacements
    content = content.replace(/EDITING 1 Curriculum/g, 'CINEMATOGRAPHY Curriculum');
    content = content.replace(/body data-page="editor1"/g, 'body data-page="cinematographer"');
    content = content.replace(/Editing 1/g, 'Cinematography');
    content = content.replace(/editing1\.html/g, 'cinematography.html');
    
    // Replace Editor -> Cinematographer in headers & dropdowns
    content = content.replace(/Editors \| CINEMATOGRAPHY Curriculum/g, 'Cinematographers | CINEMATOGRAPHY Curriculum');
    content = content.replace(/class=\"region-page-title\">(.*?) Editors<\/h2>/g, 'class="region-page-title">$1 Cinematographers</h2>');
    content = content.replace(/Change Region/g, 'Change Region');
    
    // Replace the dropdown links and labels
    const startIdx = content.indexOf('id="regionSelectDropdown"');
    if (startIdx !== -1) {
        const endIdx = content.indexOf('</div>', startIdx);
        if (endIdx !== -1) {
            let dropdownSection = content.substring(startIdx, endIdx);
            dropdownSection = dropdownSection.replace(/editing1-([a-z-]+)\.html/g, 'cinematography-$1.html');
            dropdownSection = dropdownSection.replace(/Editors<\/a>/g, 'Cinematographers</a>');
            content = content.substring(0, startIdx) + dropdownSection + content.substring(endIdx);
        }
    }

    // Replace editing1-*.html to cinematography-*.html in other parts of file if any
    content = content.replace(/editing1-([a-z-]+)\.html/g, 'cinematography-$1.html');

    // Replace title
    content = content.replace(/([a-zA-Z\s]+) Editors \| CINEMATOGRAPHY Curriculum \| CineAcademy/g, '$1 Cinematographers | CINEMATOGRAPHY Curriculum | CineAcademy');

    fs.writeFileSync(destPath, content, 'utf8');
    fs.unlinkSync(srcPath);
    console.log(`Renamed and processed: ${destFile}`);
});

console.log('File renaming and cleanups complete.');
