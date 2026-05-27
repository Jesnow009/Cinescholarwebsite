const fs = require('fs');
const path = require('path');

const projectDir = 'd:/Film Studies Website';

// Find all HTML files in the project root
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

console.log(`Scanning and updating ${files.length} HTML files...`);

files.forEach(file => {
    const filePath = path.join(projectDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Determine active page types
    const isDirection = file === 'direction.html' || file.startsWith('direction-');
    const isEditing = file === 'editing.html' || file.startsWith('editing-');
    const isEditing1 = file === 'editing1.html' || file.startsWith('editing1-');
    const isScreenwriting = file === 'screenwriting.html';
    const isSound = file === 'sound-design.html';
    const isHome = file === 'index.html';
    const isSimulator = file === 'simulator.html';
    const isGlossary = file === 'glossary.html';
    const isJournal = file === 'journal.html';

    // 2. Generate target navbar dropdown inner HTML
    let dropdownInner = '';
    if (isDirection) {
        dropdownInner = `
                        <li class="active"><a href="direction.html">Direction</a></li>
                        <li><a href="screenwriting.html">Screenwriting</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="editing1.html">Editing 1</a></li>
                        <li><a href="sound-design.html">Sound Design</a></li>
                    `;
    } else if (isScreenwriting) {
        dropdownInner = `
                        <li><a href="direction.html">Direction</a></li>
                        <li class="active"><a href="screenwriting.html">Screenwriting</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="editing1.html">Editing 1</a></li>
                        <li><a href="sound-design.html">Sound Design</a></li>
                    `;
    } else if (isEditing) {
        dropdownInner = `
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="screenwriting.html">Screenwriting</a></li>
                        <li class="active"><a href="editing.html">Editing</a></li>
                        <li><a href="editing1.html">Editing 1</a></li>
                        <li><a href="sound-design.html">Sound Design</a></li>
                    `;
    } else if (isEditing1) {
        dropdownInner = `
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="screenwriting.html">Screenwriting</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li class="active"><a href="editing1.html">Editing 1</a></li>
                        <li><a href="sound-design.html">Sound Design</a></li>
                    `;
    } else if (isSound) {
        dropdownInner = `
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="screenwriting.html">Screenwriting</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="editing1.html">Editing 1</a></li>
                        <li class="active"><a href="sound-design.html">Sound Design</a></li>
                    `;
    } else {
        dropdownInner = `
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="screenwriting.html">Screenwriting</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="editing1.html">Editing 1</a></li>
                        <li><a href="sound-design.html">Sound Design</a></li>
                    `;
    }

    // 3. Generate target footer links inner HTML
    let footerInner = '';
    footerInner += `\n                <li><a href="index.html"${isHome ? ' class="active"' : ''}>Home</a></li>`;
    footerInner += `\n                <li><a href="direction.html"${isDirection ? ' class="active"' : ''}>Direction</a></li>`;
    footerInner += `\n                <li><a href="screenwriting.html"${isScreenwriting ? ' class="active"' : ''}>Screenwriting</a></li>`;
    footerInner += `\n                <li><a href="editing.html"${isEditing ? ' class="active"' : ''}>Editing</a></li>`;
    footerInner += `\n                <li><a href="editing1.html"${isEditing1 ? ' class="active"' : ''}>Editing 1</a></li>`;
    footerInner += `\n                <li><a href="sound-design.html"${isSound ? ' class="active"' : ''}>Sound Design</a></li>`;
    footerInner += `\n                <li><a href="simulator.html"${isSimulator ? ' class="active"' : ''}>Simulator</a></li>`;
    footerInner += `\n                <li><a href="glossary.html"${isGlossary ? ' class="active"' : ''}>Glossary</a></li>`;
    footerInner += `\n                <li><a href="journal.html"${isJournal ? ' class="active"' : ''}>Journal</a></li>\n            `;

    // 4. Perform replacements using RegExp
    // Replace dropdown menu
    content = content.replace(
        /<ul class="dropdown-menu">([\s\S]*?)<\/ul>/,
        `<ul class="dropdown-menu">${dropdownInner}</ul>`
    );

    // Replace footer links
    content = content.replace(
        /<ul class="footer-links">([\s\S]*?)<\/ul>/,
        `<ul class="footer-links">${footerInner}</ul>`
    );

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Dropdown and footer updates completed across all HTML files.');
