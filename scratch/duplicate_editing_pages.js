const fs = require('fs');
const path = require('path');

const projectDir = 'd:/Film Studies Website';

// Find all editing-*.html files
const files = fs.readdirSync(projectDir).filter(f => f.startsWith('editing-') && f.endsWith('.html'));

console.log(`Found ${files.length} editing subpages to duplicate.`);

files.forEach(file => {
    const srcPath = path.join(projectDir, file);
    const destFile = file.replace('editing-', 'editing1-');
    const destPath = path.join(projectDir, destFile);

    let content = fs.readFileSync(srcPath, 'utf8');

    // 1. Update title
    content = content.replace(
        /<title>(.*?) \| EDITING Curriculum \| CineAcademy<\/title>/,
        '<title>$1 | EDITING 1 Curriculum | CineAcademy</title>'
    );

    // 2. Update body data-page
    content = content.replace(
        /body data-page="editor"/,
        'body data-page="editor1"'
    );

    // 3. Update Curriculum Dropdown Header
    content = content.replace(
        /<li><a href="direction.html">Direction<\/a><\/li>\s*<li><a href="screenwriting.html">Screenwriting<\/a><\/li>\s*<li class="active"><a href="editing.html">Editing<\/a><\/li>\s*<li><a href="sound-design.html">Sound Design<\/a><\/li>/,
        '<li><a href="direction.html">Direction</a></li>\n                        <li><a href="screenwriting.html">Screenwriting</a></li>\n                        <li><a href="editing.html">Editing</a></li>\n                        <li class="active"><a href="editing1.html">Editing 1</a></li>\n                        <li><a href="sound-design.html">Sound Design</a></li>'
    );

    // 4. Update Back to Hub button link
    content = content.replace(
        /href="editing.html" class="back-to-hub-btn"/,
        'href="editing1.html" class="back-to-hub-btn"'
    );

    // 5. Update Region selection dropdown links (replace all editing-*.html with editing1-*.html)
    // We only want to target the region dropdown section
    const startIdx = content.indexOf('id="regionSelectDropdown"');
    if (startIdx !== -1) {
        const endIdx = content.indexOf('</div>', startIdx);
        if (endIdx !== -1) {
            let dropdownSection = content.substring(startIdx, endIdx);
            dropdownSection = dropdownSection.replace(/editing-([a-z-]+)\.html/g, 'editing1-$1.html');
            content = content.substring(0, startIdx) + dropdownSection + content.substring(endIdx);
        }
    }

    // 6. Update Footer links
    content = content.replace(
        /<li><a href="direction.html">Direction<\/a><\/li>\s*<li><a href="screenwriting.html">Screenwriting<\/a><\/li>\s*<li class="active"><a href="editing.html">Editing<\/a><\/li>\s*<li><a href="sound-design.html">Sound Design<\/a><\/li>/,
        '<li><a href="direction.html">Direction</a></li>\n                <li><a href="screenwriting.html">Screenwriting</a></li>\n                <li><a href="editing.html">Editing</a></li>\n                <li class="active"><a href="editing1.html">Editing 1</a></li>\n                <li><a href="sound-design.html">Sound Design</a></li>'
    );

    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Generated: ${destFile}`);
});

console.log('Duplication complete.');
