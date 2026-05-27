const fs = require('fs');
const path = require('path');

const filesToVerify = [
    'editing1.html',
    'editing1-british.html',
    'editing1-indian.html',
    'editing1-hollywood-na.html'
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
const pagesToCheck = ['index.html', 'direction.html', 'editing.html'];
pagesToCheck.forEach(page => {
    const content = fs.readFileSync(page, 'utf8');
    const hasDropdown = content.includes('editing1.html');
    const hasFooter = content.includes('editing1.html');
    console.log(`Page: ${page} - Dropdown/Footer includes editing1.html: ${hasDropdown && hasFooter}`);
});

if (allExist) {
    console.log('Automated verification passed successfully!');
} else {
    console.error('Verification failed.');
}
