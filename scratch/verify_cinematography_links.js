const fs = require('fs');

const filesToVerify = [
    'cinematography.html',
    'cinematography-british.html',
    'cinematography-indian.html',
    'cinematography-hollywood-na.html'
];

let allExist = true;
filesToVerify.forEach(f => {
    if (!fs.existsSync(f)) {
        console.error(`Missing file: ${f}`);
        allExist = false;
    } else {
        console.log(`Verified file exists: ${f}`);
    }
});

// Check critical pages for the new link
const pagesToCheck = ['index.html', 'direction.html', 'editing.html', 'cinematography.html'];
pagesToCheck.forEach(page => {
    const content = fs.readFileSync(page, 'utf8');
    const hasDropdown = content.includes('cinematography.html');
    const hasFooter = content.includes('cinematography.html');
    console.log(`Page: ${page} - Dropdown/Footer includes cinematography.html: ${hasDropdown && hasFooter}`);
    
    // Ensure no editing1 links remain
    if (content.includes('editing1.html')) {
        console.error(`Page ${page} contains old editing1.html link!`);
        allExist = false;
    }
});

if (allExist) {
    console.log('Automated verification passed successfully!');
} else {
    console.error('Verification failed.');
}
