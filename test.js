const fs = require('fs');

// Mock DOM
global.window = {
    addEventListener: () => {},
    location: { search: '' }
};
global.document = {
    addEventListener: () => {},
    querySelectorAll: () => [],
    getElementById: (id) => {
        if (id === 'notebookContent') return { innerHTML: '', appendChild: function(el) { this.children.push(el); }, children: [] };
        if (id === 'notebookTotalCount') return { textContent: '' };
        return null;
    },
    createElement: (tag) => {
        return {
            style: {},
            innerHTML: '',
            className: '',
            id: '',
            appendChild: function(el) { this.children.push(el); },
            querySelector: function(sel) { 
                if (sel === '.notebook-poster-grid') return { children: [], appendChild: function(el) { this.children.push(el); } };
                if (sel === '.npc-remove-btn') return { addEventListener: () => {} };
                return null;
            },
            children: []
        };
    },
    querySelector: () => null,
    body: { getAttribute: () => null }
};

global.localStorage = {
    getItem: (key) => {
        if (key === 'cine_watched_films') return JSON.stringify(['goodfellas', 'raging-bull', 'taxi-driver']);
        if (key === 'cine_watched_sources') return JSON.stringify({'goodfellas':'DIRECTION', 'raging-bull':'EDITING', 'taxi-driver':'DIRECTION'});
        if (key === 'cine_film_notes') return JSON.stringify({});
        return null;
    },
    setItem: () => {}
};

// Load data.js
const dataCode = fs.readFileSync('d:/Film Studies Website/js/data.js', 'utf8');
eval(dataCode);

// Load app.js but intercept DOMContentLoaded
const appCode = fs.readFileSync('d:/Film Studies Website/js/app.js', 'utf8');

const modifiedApp = appCode.replace('document.addEventListener("DOMContentLoaded", () => {', 'function run() {')
                           .replace(/}\);\s*$/, '}');

eval(modifiedApp);

// Setup state for notebook page
try {
    document.body.getAttribute = (attr) => attr === 'data-page' ? 'notebook' : null;
    run();
    console.log("Success! Rendered correctly.");
} catch (e) {
    console.error("ERROR:", e);
}
