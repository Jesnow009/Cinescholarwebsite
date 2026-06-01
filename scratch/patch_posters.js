const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const updates = {
    "Thanmatra": "assets/images/thanmatra.jpg",
    "Aadujeevitham": "assets/images/aadujeevitham.jpg",
    "Elippathayam": "assets/images/elippathayam.jpg"
};

let changed = false;

for (const title of Object.keys(updates)) {
    const posterPath = updates[title];
    const regex = new RegExp(`("title":\\s*"${title}"[\\s\\S]*?"poster":\\s*)"([^"]+)"`);
    if (regex.test(dataJsContent)) {
        dataJsContent = dataJsContent.replace(regex, `$1"${posterPath}"`);
        console.log(`Updated poster path for ${title} to ${posterPath}`);
        changed = true;
    }
}

if (changed) {
    fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');
    console.log("Successfully patched poster paths in data.js");
} else {
    console.log("No matching posters found to patch.");
}
