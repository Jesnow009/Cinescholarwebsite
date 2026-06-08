const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<body data-page="notebook">
    <div id="notebookTotalCount"></div>
    <div id="notebookContent"></div>
</body>
</html>
`, { runScripts: "outside-only", url: "http://localhost/" });

const window = dom.window;

// Proper localStorage mock for jsdom
window.localStorage.setItem('cine_watched_films', JSON.stringify(['goodfellas', 'raging-bull', 'taxi-driver']));
window.localStorage.setItem('cine_watched_sources', JSON.stringify({'goodfellas':'DIRECTION', 'raging-bull':'EDITING', 'taxi-driver':'DIRECTION'}));

global.URL = window.URL;
global.URLSearchParams = window.URLSearchParams;

const dataCode = fs.readFileSync('d:/Film Studies Website/js/data.js', 'utf8').replace('const FILMS_DATA =', 'window.FILMS_DATA =');
window.eval(dataCode);

const appCode = fs.readFileSync('d:/Film Studies Website/js/app.js', 'utf8');
const modifiedApp = appCode.replace('document.addEventListener("DOMContentLoaded", () => {', 'window.runApp = function() {')
                           .replace(/}\);\s*$/, '}');

window.eval(modifiedApp);

try {
    window.runApp();
    console.log("notebookContent innerHTML:", window.document.getElementById('notebookContent').innerHTML);
} catch (e) {
    console.error("ERROR running app:", e);
}
