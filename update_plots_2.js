const fs = require('fs');
let data = fs.readFileSync('js/data.js', 'utf8');

const plots = {
  "Bhuvan Shome": "A strict, lonely railway bureaucrat's rigid worldview is permanently softened during a duck-hunting trip to a rural village in Gujarat.",
  "Unishe April (19th April)": "A tense, emotionally volatile reunion between a celebrated dancer and her estranged, bitter daughter on the anniversary of the father's death.",
  "Bagh Bahadur (The Tiger Man)": "An aging folk artist who dances as a tiger faces obsolescence and tragedy when a real circus tiger comes to his village.",
  "Shabdo (Sound)": "A Foley artist becomes so obsessed with background sounds and ambient noise that he begins losing his grip on human speech and reality.",
  "Swayamvaram": "A young couple elopes to the city against their parents' wishes, facing crushing poverty and disillusionment as their romantic ideals are tested.",
  "Uttarayanam": "A disillusioned, unemployed young man wanders through post-independence Kerala, struggling with existential dread and the corrupt societal systems around him.",
  "Vidyarthikale Ithile Ithile": "A thought-provoking narrative that explores the educational system and the lives of students in Kerala.",
  "Oridathoru Phayalvaan": "A comedic yet tragic tale of a wandering wrestler whose arrival in a village brings both admiration and unexpected chaos.",
  "Prayanam": "A subtle, deeply atmospheric exploration of human relationships, suppressed desires, and societal constraints within a traditional Kerala setting.",
  "Nadodikkattu": "Two unemployed, optimistic friends try to illegally migrate to the Middle East, but accidentally land in Chennai, sparking a hilarious series of adventures.",
  "Manjil Virinja Pookkal": "A tragic romantic thriller where a young man falls in love with a woman, only to discover she is married to a sadistic, abusive husband.",
  "Poochakkoru Mookkuthi": "A brilliant, chaotic screwball comedy revolving around mistaken identities, eccentric characters, and a desperate search for a missing wife.",
  "Kazcha": "A heartwarming, tragic story of a rural film operator in Kerala who adopts an orphaned boy from the devastating Gujarat earthquake.",
  "Amen": "A magical realist musical comedy set in a picturesque Kerala village, centering on a struggling church band and a divine musical competition.",
  "Maheshinte Prathikaaram": "A mild-mannered rural photographer takes a solemn vow never to wear slippers again until he avenges a humiliating public beating.",
  "Annayum Rasoolum": "A deeply realistic, tragically poetic love story between a Muslim taxi driver and a Christian salesgirl set in the gritty streets of Kochi.",
  "Memories": "A brilliant, grief-stricken, alcoholic police officer is forced to confront his tragic past when he investigates a series of bizarre serial murders.",
  "Big B": "Four adopted brothers reunite to fiercely avenge the brutal murder of their beloved foster mother, adopting a highly stylized, explosive form of vigilante justice.",
  "Kumbalangi Nights": "Four deeply flawed, estranged brothers living in a dilapidated shack in Kumbalangi must confront their toxic masculinity to protect the women they love."
};

let count = 0;
Object.keys(plots).forEach(title => {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`("title":\\s*"${escapedTitle}",[\\s\\S]*?)"plot":\\s*"Plot details to be updated."`, 'g');
    if (data.match(regex)) {
        data = data.replace(regex, `$1"plot": "${plots[title]}"`);
        count++;
    }
});

fs.writeFileSync('js/data.js', data, 'utf8');
console.log(`Successfully updated ${count} more plots in js/data.js`);
