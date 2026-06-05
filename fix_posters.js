const fs = require('fs');

const fallbacks = {
  "Anantha Rathriya": "assets/images/anantha-rathriya.jpg",
  "Between Two Worlds": "assets/images/between-two-worlds.jpg",
  "Ontoryatra": "assets/images/ontoryatra.jpg",
  "Doob: No Bed of Roses": "assets/images/doob.jpg",
  "Manto": "assets/images/manto.jpg",
  "Kamli": "assets/images/kamli.jpg",
  "Shambhala": "assets/images/shambhala.jpg",
  "Highway": "assets/images/highway.jpg"
};

let fileContent = fs.readFileSync('js/data.js', 'utf8');

for (const title in fallbacks) {
    let titleRegex = new RegExp(`"title": "${title.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}"[\\s\\S]*?"poster": ""`);
    fileContent = fileContent.replace(titleRegex, (match) => {
        return match.replace('"poster": ""', `"poster": "${fallbacks[title]}"`);
    });
}

fs.writeFileSync('js/data.js', fileContent);
console.log('Fixed empty posters');
