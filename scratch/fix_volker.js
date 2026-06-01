const fs = require('fs');

const movies = [
    {
        "title": "The Tin Drum",
        "year": 1979,
        "director": "Volker Schlöndorff",
        "writer": "Jean-Claude Carrière / Franz Seitz / Volker Schlöndorff",
        "cinematographer": "Igor Luther",
        "editor": "Suzanne Baron",
        "composer": "Maurice Jarre",
        "studio": "Franz Seitz Filmproduktion / Bioskop Film / Artemis Film",
        "focus": "A grotesque, carnivalesque adaptation of Günter Grass's novel, using the distorted, low-angle perspective of a child to satirize the terrifying rise of Nazism and the complicity of the German petite bourgeoisie.",
        "plot": "In 1920s Danzig, a remarkably precocious young boy named Oskar becomes so disgusted with the hypocrisy and brutality of the adult world that he willfully decides to stop physically growing at the age of three.",
        "releaseDate": "May 3, 1979",
        "country": "West Germany / France / Poland / Yugoslavia",
        "id": "the-tin-drum",
        "poster": "assets/images/the-tin-drum.jpg"
    }
];

let dbContent = fs.readFileSync('d:/Film Studies Website/temp_data.js', 'utf8');
const newMoviesStr = JSON.stringify(movies, null, 24).replace(/\n/g, '\n                    ');

const regex = new RegExp(`"id": "volker-schloendorff"[\\s\\S]*?"mustWatch": \\[[\\s\\S]*?\\],`);
const match = dbContent.match(regex);
if (match) {
    const replacement = match[0].replace(/"mustWatch": \[[ \s\S]*?\],/, `"mustWatch": ${newMoviesStr},`);
    dbContent = dbContent.replace(match[0], replacement);
    fs.writeFileSync('d:/Film Studies Website/temp_data.js', dbContent, 'utf8');
    console.log("Fixed Volker Schlöndorff.");
} else {
    console.log("Could not find Volker.");
}
