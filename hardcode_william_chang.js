const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const editors = context.FILMS_DATA.editor.editors;
const dirObj = editors.find(d => d.name === "William Chang Suk-ping" && d.region === "hong-kong");

if (dirObj) {
    for (let mv of dirObj.mustWatch) {
        if (mv.title === "In the Mood for Love") {
            mv.poster = "https://image.tmdb.org/t/p/w500/iYypPT4Oq6Xeqq463C47w1O9YhY.jpg";
            mv.plot = "A man and a woman whose spouses have secret affairs with each other find themselves kindred spirits. But they are determined to keep their relationship platonic so as not to commit similar wrongs.";
        } else if (mv.title === "Chungking Express") {
            mv.poster = "https://image.tmdb.org/t/p/w500/1XkPEXvLz2yH0n8x9iZ2fUaX7wV.jpg";
            mv.plot = "Two melancholy Hong Kong policemen fall in love: one with a mysterious female underworld figure, the other with a beautiful and quirky waitress at a late-night restaurant he frequents.";
        } else if (mv.title === "The Grandmaster") {
            mv.poster = "https://image.tmdb.org/t/p/w500/b38r0W7Qk92A3N1F81W8s10j19N.jpg";
            mv.plot = "The story of martial-arts master Ip Man, the man who trained Bruce Lee.";
        }
    }
}

let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
console.log("Successfully hardcoded William Chang's movie posters and plots.");
