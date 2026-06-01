const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const updates = {
    "Vidyarthikale Ithile Ithile": { writer: "M. Azad" },
    "Prayanam": { writer: "P. Padmarajan" },
    "Thakara": { writer: "P. Padmarajan" },
    "Chamaram": { writer: "John Paul" },
    "Vaishali": { writer: "M. T. Vasudevan Nair" }, // Actually M.T. wrote Vaishali! The TMDB script got ONV Kurup (who wrote the lyrics).
    "Amaram": { writer: "A. K. Lohithadas" },
    "Nadodikkattu": { writer: "Sreenivasan" },
    "Pappan Priyappetta Pappan": { writer: "Siddique-Lal" },
    "Sandhesam": { writer: "Sreenivasan" },
    "Veendum Chila Veetukaryangal": { writer: "A. K. Lohithadas" },
    "Manassinakkare": { writer: "Ranjan Pramod" },
    "Manichitrathazhu": { writer: "Madhu Muttam" }
};

let changed = false;

for (const title of Object.keys(updates)) {
    const writerName = updates[title].writer;
    
    // Find the block of lines for this movie. We can just use a regex replacement.
    // e.g. "title": "Prayanam",\n\s*"year": 1975,\n\s*"director": "Bharathan",\n\s*"writer": "",
    const regex = new RegExp(`("title":\\s*"${title}"[\\s\\S]*?"writer":\\s*)"(?:N/A|NA|)"`);
    if (regex.test(dataJsContent)) {
        dataJsContent = dataJsContent.replace(regex, `$1"${writerName}"`);
        console.log(`Updated writer for ${title} to ${writerName}`);
        changed = true;
    }
}

if (changed) {
    fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');
    console.log("Successfully patched missing Malayalam writers in data.js");
} else {
    console.log("No missing Malayalam writers found to patch.");
}
