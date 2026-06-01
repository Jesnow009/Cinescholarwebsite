const fs = require('fs');

function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'darius-khondji' || p.name === 'Darius Khondji') {
            // Fix region type from array to string
            p.region = "iranian";
            
            // Add missing fields to prevent UI crash
            p.years = "Active 1989 - Present";
            p.era = "Contemporary";
            p.quote = "\"I like to push the image as far as I can, to the edge of darkness.\"";
            p.style = "Dark, textural, moody, high contrast.";
            p.techniques = [
                "Extensive use of the bleach bypass process",
                "Textural, high-contrast lighting emphasizing shadow",
                "Warm, nostalgic golden tones in romantic contexts"
            ];
            p.lessons = [
                "Don't be afraid of absolute black and pushing shadows to their limit.",
                "Texture and film grain are emotional tools, not just technical artifacts."
            ];
            p.scenes = [];
            
            modified = true;
            console.log("Fixed Darius Khondji schema!");
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated data.js with schema fixes.");
    }
}

run();
