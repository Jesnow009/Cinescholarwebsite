import os

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace from "const groups = {};" down to "notebookContainer.appendChild(groupSection);" inclusive.

old_logic_start = '        const groups = {};'
old_logic_end = '            notebookContainer.appendChild(groupSection);\n        });\n    }'

new_logic = '''        const allWatched = [];
        const legacyAdded = new Set();

        const addFilmToList = (curriculumName, film, personName, pathKey, personId, personRegion) => {
            allWatched.push({ ...film, curriculumName, personName, pathKey, personId, personRegion });
        };

        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            if (pathKey === "director" || pathKey === "editor" || pathKey === "cinematographer") {
                const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
                path[listKey].forEach(person => {
                    if (person.mustWatch) {
                        person.mustWatch.forEach(movie => {
                            const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            if (state.watchedFilms.includes(mId)) {
                                let targetSource = state.watchedSources[mId];
                                if (targetSource === "Direction Curriculum") targetSource = "DIRECTION";
                                if (targetSource === "Editing Curriculum") targetSource = "EDITING";
                                if (targetSource === "Cinematography Curriculum") targetSource = "CINEMATOGRAPHY";

                                if (targetSource === path.title || (!targetSource && !legacyAdded.has(mId))) {
                                    addFilmToList(path.title, { ...movie, mId: mId }, person.name, pathKey, person.id, person.region);
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
                        let targetSource = state.watchedSources[film.id];
                        if (targetSource === "Direction Curriculum") targetSource = "DIRECTION";
                        if (targetSource === "Editing Curriculum") targetSource = "EDITING";
                        if (targetSource === "Cinematography Curriculum") targetSource = "CINEMATOGRAPHY";

                        if (targetSource === path.title || (!targetSource && !legacyAdded.has(film.id))) {
                            addFilmToList(path.title, { ...film, mId: film.id }, null, pathKey, null, null);
                            legacyAdded.add(film.id);
                        }
                    }
                });
            }
        });

        // Sort by index in watchedFilms (latest first)
        allWatched.sort((a, b) => {
            return state.watchedFilms.indexOf(b.mId) - state.watchedFilms.indexOf(a.mId);
        });

        if (allWatched.length === 0) return;

        const logSection = document.createElement('div');
        logSection.style.marginBottom = '4rem';
        logSection.innerHTML = `
            <div class="notebook-poster-grid premium-log-grid"></div>
        `;
        const grid = logSection.querySelector('.premium-log-grid');

        allWatched.forEach((movie, i) => {
            const card = document.createElement('div');
            card.className = "notebook-poster-card premium-card";
            card.id = `notebook-film-${movie.mId}`;
            
            // Log entry number
            const logNumber = allWatched.length - i;

            let targetUrl = "#";
            if (movie.pathKey === "director" || movie.pathKey === "editor" || movie.pathKey === "cinematographer") {
                const prefix = movie.pathKey === "director" ? "direction" : (movie.pathKey === "editor" ? "editing" : "cinematography");
                const paramKey = movie.pathKey === "director" ? "director" : (movie.pathKey === "editor" ? "editor" : "cinematographer");
                const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];

                if (indianSubregions.includes(movie.personRegion)) {
                    targetUrl = `${prefix}-indian.html?subregion=${movie.personRegion}&${paramKey}=${movie.personId}&film=${movie.mId}`;
                } else {
                    targetUrl = `${prefix}-${movie.personRegion}.html?${paramKey}=${movie.personId}&film=${movie.mId}`;
                }
            } else if (movie.pathKey) {
                targetUrl = `${movie.pathKey}.html?film=${movie.mId}`;
            }

            card.innerHTML = `
                <div class="npc-badge">${movie.curriculumName}</div>
                <div class="npc-log-number">#${logNumber}</div>
                <div class="npc-poster-container" style="cursor: pointer;" onclick="window.location.href='${targetUrl}'">
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
                <div class="npc-info" style="cursor: pointer;" onclick="window.location.href='${targetUrl}'">
                    <h4 class="npc-title" title="${movie.title}">${movie.title}</h4>
                    <div class="npc-year">${movie.year || ''}</div>
                </div>
            `;

            const btn = card.querySelector('.npc-remove-btn');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = state.watchedFilms.indexOf(movie.mId);
                if (index > -1) {
                    state.watchedFilms.splice(index, 1);
                    saveWatchedState();
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.remove();
                        const cEl = document.getElementById("notebookTotalCount");
                        if (cEl) {
                            cEl.textContent = state.watchedFilms.length + " / 1760";
                        }
                        if (grid.children.length === 0) {
                            logSection.remove();
                            initJournalModule();
                        }
                    }, 200);
                }
            });

            grid.appendChild(card);
        });

        notebookContainer.appendChild(logSection);
    }'''

start_idx = content.find(old_logic_start)
end_idx = content.find(old_logic_end) + len(old_logic_end)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_logic + content[end_idx:]
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully patched app.js")
else:
    print("Could not find patch points in app.js")
