const fs = require('fs');
const vm = require('vm');

const dataContent = fs.readFileSync('js/data.js', 'utf8');
const appContent = fs.readFileSync('js/app.js', 'utf8');

function testPage(pageId, regionId = null) {
    console.log(`\n--- Testing activePage: ${pageId}${regionId ? `, region: ${regionId}` : ''} ---`);
    
    const mockElements = {
        regionHubGrid: {
            innerHTML: "",
            appendChild: function(child) {
                this.children.push(child);
            },
            children: []
        },
        headerNav: { className: "" },
        mobileMenuBtn: { addEventListener: () => {} },
        navWatchedCount: { textContent: "0" },
        globalSearchSection: { style: {} },
        globalSearchWrapper: { style: {}, contains: () => false },
        globalSearchInput: { addEventListener: () => {} },
        globalSearchClear: { style: {}, addEventListener: () => {} },
        globalSearchResults: { style: {} },
        globalSearchResultsInner: { innerHTML: "" },
        
        pathIntroContainer: { innerHTML: "" },
        filmsListContainer: {
            innerHTML: "",
            appendChild: function(child) {
                this.children.push(child);
            },
            children: []
        },
        filmDetailContainer: { innerHTML: "" }
    };

    const domEventListeners = {};

    const mockDocument = {
        body: {
            getAttribute: (attr) => {
                if (attr === 'data-page') return pageId;
                if (attr === 'data-region') return regionId;
                return null;
            }
        },
        addEventListener: (event, callback) => {
            domEventListeners[event] = callback;
        },
        getElementById: (id) => {
            return mockElements[id] || null;
        },
        querySelector: (selector) => {
            if (selector === '.nav-links') return { innerHTML: "" };
            if (selector === '.region-select-wrapper') return { classList: { remove: () => {} } };
            return null;
        },
        querySelectorAll: (selector) => {
            return [];
        },
        createElement: (tag) => {
            const classList = {
                classes: [],
                add: function(cls) {
                    this.classes.push(cls);
                },
                remove: function(cls) {
                    this.classes = this.classes.filter(c => c !== cls);
                },
                contains: function(cls) {
                    return this.classes.includes(cls);
                }
            };
            return {
                tag: tag,
                style: {},
                innerHTML: "",
                href: "",
                className: "",
                classList: classList,
                addEventListener: () => {}
            };
        }
    };

    const mockWindow = {
        location: new URL("http://localhost/"),
        history: {
            pushState: () => {}
        },
        addEventListener: () => {}
    };

    const mockLocalStorage = {
        getItem: (key) => {
            if (key === 'cine_watched_films') return '[]';
            if (key === 'cine_film_notes') return '{}';
            return null;
        },
        setItem: () => {}
    };

    const context = {
        document: mockDocument,
        window: mockWindow,
        localStorage: mockLocalStorage,
        console: console,
        setTimeout: setTimeout,
        setInterval: setInterval,
        URL: URL,
        URLSearchParams: URLSearchParams
    };

    vm.createContext(context);

    // 1. Run data.js to populate FILMS_DATA
    vm.runInContext(dataContent, context);

    // 2. Run app.js
    vm.runInContext(appContent, context);

    // 3. Trigger DOMContentLoaded
    if (domEventListeners['DOMContentLoaded']) {
        domEventListeners['DOMContentLoaded']();
        if (pageId.endsWith('-hub')) {
            const children = mockElements.regionHubGrid.children;
            console.log(`Success: Grid rendered ${children.length} cards.`);
            return children.length;
        } else {
            const listChildren = mockElements.filmsListContainer.children;
            console.log(`Success: Subpage rendered ${listChildren.length} items in sidebar list.`);
            return listChildren.length;
        }
    } else {
        throw new Error("DOMContentLoaded listener not registered!");
    }
}

try {
    // Test Hubs
    testPage('director-hub');
    testPage('editor-hub');
    testPage('cinematographer-hub');

    // Test Subpages
    const dirListCount = testPage('director', 'british');
    const editListCount = testPage('editor', 'british');
    const cinemaListCount = testPage('cinematographer', 'british');

    console.log('\nAll hub and subpage tests completed successfully!');
    process.exit(0);
} catch (err) {
    console.error('FAIL: Sandbox test crashed:', err);
    process.exit(1);
}
