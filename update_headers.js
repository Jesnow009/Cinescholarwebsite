const fs = require('fs');
const cssClass = `
.path-badge {
    color: var(--accent-gold);
    font-size: 0.5em;
    vertical-align: middle;
    margin-right: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 1px solid rgba(212,175,55,0.4);
    background: rgba(212,175,55,0.05);
    padding: 4px 10px;
    border-radius: 4px;
    display: inline-block;
    transform: translateY(-2px);
}
`;

let cssContent = fs.readFileSync('css/style.css', 'utf8');
if (!cssContent.includes('.path-badge')) {
    fs.writeFileSync('css/style.css', cssContent + '\n' + cssClass);
    console.log('Added .path-badge to style.css');
}

const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html') && (f.startsWith('direction-') || f.startsWith('editing-') || f.startsWith('cinematography-')));

let count = 0;
for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    let discipline = '';
    if (file.startsWith('direction-')) discipline = 'DIRECTION';
    else if (file.startsWith('editing-')) discipline = 'EDITING';
    else if (file.startsWith('cinematography-')) discipline = 'CINEMATOGRAPHY';
    
    // Find <h2 class="region-page-title">...</h2>
    if (!content.includes('<span class="path-badge">')) {
        content = content.replace(/<h2 class="region-page-title">([^<]+)<\/h2>/g, `<h2 class="region-page-title"><span class="path-badge">${discipline}</span> $1</h2>`);
        fs.writeFileSync(file, content);
        count++;
    }
}
console.log('Modified ' + count + ' files.');
