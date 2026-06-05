const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const directors = context.FILMS_DATA.director.directors;
const pedro = directors.find(d => d.name === "Pedro Almodovar" && d.region === "spanish-portuguese");

if (pedro && pedro.mustWatch) {
    let mother = pedro.mustWatch.find(m => m.title === "All About My Mother");
    if (mother) {
        mother.poster = "https://image.tmdb.org/t/p/w500/lpuRN4Gh2jiKhwZeHEsKjgoHZ83.jpg";
        mother.plot = "Following the tragic death of her teenage son, Manuela travels from Madrid to Barcelona in an attempt to contact the long-estranged father the boy never knew. She reunites with an old friend, an outspoken transgender sex worker, and befriends a troubled actress and a pregnant, HIV-positive nun.";
    }

    let talk = pedro.mustWatch.find(m => m.title === "Talk to Her");
    if (talk) {
        talk.poster = "https://image.tmdb.org/t/p/w500/fWDbQlOWOqjR5jZm98KjGyYmUOw.jpg";
        talk.plot = "Two men share an odd friendship while they care for two women who are both in deep comas.";
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Fixed Pedro Almodovar movies successfully.");
