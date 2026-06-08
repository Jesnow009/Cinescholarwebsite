import re
import os

with open("d:/Film Studies Website/js/app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add watchedSources to state initialization
content = content.replace(
    'watchedFilms: JSON.parse(localStorage.getItem("cine_watched_films")) || [],',
    'watchedFilms: JSON.parse(localStorage.getItem("cine_watched_films")) || [],\n        watchedSources: JSON.parse(localStorage.getItem("cine_watched_sources")) || {},'
)

# 2. Add saveWatchedState update
content = content.replace(
    'localStorage.setItem("cine_watched_films", JSON.stringify(state.watchedFilms));',
    'localStorage.setItem("cine_watched_films", JSON.stringify(state.watchedFilms));\n        localStorage.setItem("cine_watched_sources", JSON.stringify(state.watchedSources));'
)

# 3. Update toggleQuickWatch to accept sourceTitle
toggle_target = '''    window.toggleQuickWatch = function(filmId, btn) {
        if (!state.watchedFilms) state.watchedFilms = [];
        const index = state.watchedFilms.indexOf(filmId);
        
        if (index > -1) {
            state.watchedFilms.splice(index, 1);
            btn.classList.remove('watched');'''

toggle_replace = '''    window.toggleQuickWatch = function(filmId, btn, sourceTitle = null) {
        if (!state.watchedFilms) state.watchedFilms = [];
        if (!state.watchedSources) state.watchedSources = {};
        
        // Try to figure out sourceTitle if not provided
        if (!sourceTitle) {
            if (document.title.includes("DIRECTION")) sourceTitle = "Direction Curriculum";
            else if (document.title.includes("EDITING")) sourceTitle = "Editing Curriculum";
            else if (document.title.includes("CINEMATOGRAPHY")) sourceTitle = "Cinematography Curriculum";
            else sourceTitle = "Direction Curriculum"; // fallback
        }

        const index = state.watchedFilms.indexOf(filmId);
        
        if (index > -1) {
            state.watchedFilms.splice(index, 1);
            delete state.watchedSources[filmId];
            btn.classList.remove('watched');'''

content = content.replace(toggle_target, toggle_replace)

# Also update the push branch
push_target = '''        } else {
            state.watchedFilms.push(filmId);
            btn.classList.add('watched');'''

push_replace = '''        } else {
            state.watchedFilms.push(filmId);
            state.watchedSources[filmId] = sourceTitle;
            btn.classList.add('watched');'''

content = content.replace(push_target, push_replace)

# 4. Update initJournalModule to only add films to their matched source group (or the first one if legacy)
# We will rewrite the grouping logic

journal_target = '''        function addFilmToGroup(pathTitle, filmObj, parentName) {
            if (!groups[pathTitle]) groups[pathTitle] = [];
            // Prevent duplicates
            if (!groups[pathTitle].some(f => f.mId === filmObj.mId)) {
                groups[pathTitle].push({ ...filmObj, parentName });
            }
        }
        
        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
            
            if (path[listKey]) {
                path[listKey].forEach(person => {
                    if (person.mustWatch) {
                        person.mustWatch.forEach(movie => {
                            const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            if (state.watchedFilms.includes(mId)) {
                                addFilmToGroup(path.title, { ...movie, mId: mId }, person.name);
                            }
                        });
                    }
                });
            }
            if (path.films) {
                path.films.forEach(film => {
                    if (state.watchedFilms.includes(film.id)) {
                        addFilmToGroup(path.title, { ...film, mId: film.id }, null);
                    }
                });
            }
        });'''

journal_replace = '''        function addFilmToGroup(pathTitle, filmObj, parentName) {
            if (!groups[pathTitle]) groups[pathTitle] = [];
            // Prevent duplicates
            if (!groups[pathTitle].some(f => f.mId === filmObj.mId)) {
                groups[pathTitle].push({ ...filmObj, parentName });
            }
        }
        
        const legacyAdded = new Set();

        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
            
            if (path[listKey]) {
                path[listKey].forEach(person => {
                    if (person.mustWatch) {
                        person.mustWatch.forEach(movie => {
                            const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            if (state.watchedFilms.includes(mId)) {
                                const targetSource = state.watchedSources[mId];
                                if (targetSource === path.title || (!targetSource && !legacyAdded.has(mId))) {
                                    addFilmToGroup(path.title, { ...movie, mId: mId }, person.name);
                                    legacyAdded.add(mId);
                                }
                            }
                        });
                    }
                });
            }
            if (path.films) {
                path.films.forEach(film => {
                    if (state.watchedFilms.includes(film.id)) {
                        const targetSource = state.watchedSources[film.id];
                        if (targetSource === path.title || (!targetSource && !legacyAdded.has(film.id))) {
                            addFilmToGroup(path.title, { ...film, mId: film.id }, null);
                            legacyAdded.add(film.id);
                        }
                    }
                });
            }
        });'''

content = content.replace(journal_target, journal_replace)


# 5. Redesign the notebook cards. The user wants "a movie card with poster little big".
# Let's change the card HTML.
card_target = '''            films.forEach(movie => {
                const card = document.createElement('div');
                card.className = "notebook-mini-card";
                card.id = `notebook-film-${movie.mId}`;
                
                card.innerHTML = `
                    <div class="notebook-mini-card-info">
                        <div class="notebook-mini-card-title" title="${movie.title}">${movie.title}</div>
                        ${movie.year ? `<div class="notebook-mini-card-year">${movie.year}</div>` : ''}
                    </div>
                    <button class="notebook-mini-card-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched">
                        <i class="ri-close-line"></i>
                    </button>
                `;
                
                const btn = card.querySelector('.notebook-mini-card-btn');'''

card_replace = '''            films.forEach(movie => {
                const card = document.createElement('div');
                card.className = "notebook-poster-card";
                card.id = `notebook-film-${movie.mId}`;
                
                card.innerHTML = `
                    <div class="npc-poster-container">
                        ${movie.poster ? `
                            <img src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.outerHTML='<div class=&quot;npc-poster-placeholder&quot;><i class=&quot;ri-clapperboard-line&quot;></i></div>'" />
                        ` : `
                            <div class="npc-poster-placeholder">
                                <i class="ri-clapperboard-line"></i>
                            </div>
                        `}
                        <button class="npc-remove-btn" data-film-id="${movie.mId}" title="Unmark as Watched">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <div class="npc-info">
                        <h4 class="npc-title" title="${movie.title}">${movie.title}</h4>
                        <div class="npc-year">${movie.year || ''}</div>
                    </div>
                `;
                
                const btn = card.querySelector('.npc-remove-btn');'''

content = content.replace(card_target, card_replace)

# We also need to change the grid class name from 'notebook-mini-grid' to 'notebook-poster-grid'
content = content.replace('<div class="notebook-mini-grid"></div>', '<div class="notebook-poster-grid"></div>')
content = content.replace(".querySelector('.notebook-mini-grid')", ".querySelector('.notebook-poster-grid')")

with open("d:/Film Studies Website/js/app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("app.js updated successfully.")
