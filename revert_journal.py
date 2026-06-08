import os

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The current "new_logic" that is currently in app.js
new_logic_start = '        const allWatched = [];'
new_logic_end = '            initJournalModule();\n                        }\n                    }, 200);\n                }\n            });\n\n            grid.appendChild(card);\n        });\n\n        notebookContainer.appendChild(logSection);\n    }'

# The original logic we want to restore
old_logic = '''        const groups = {};

        const addFilmToGroup = (groupName, film, personName, pathKey, personId, personRegion) => {
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push({ ...film, personName, pathKey, personId, personRegion });
        };

        const legacyAdded = new Set();

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
                                    addFilmToGroup(path.title, { ...movie, mId: mId }, person.name, pathKey, person.id, person.region);
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
                            addFilmToGroup(path.title, { ...film, mId: film.id }, null, pathKey, null, null);
                            legacyAdded.add(film.id);
                        }
                    }
                });
            }
        });

        // Render groups
        Object.keys(groups).forEach(groupTitle => {
            const films = groups[groupTitle];
            if (films.length === 0) return;

            const groupSection = document.createElement('div');
            groupSection.style.marginBottom = '4rem';

            groupSection.innerHTML = `
                <h2 style="font-size: 1.5rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                    ${groupTitle}
                    <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal; background: rgba(212,175,55,0.1); padding: 0.25rem 0.75rem; border-radius: 4px; border: 1px solid rgba(212,175,55,0.2);">${films.length} Screened</span>
                </h2>
                <div class="notebook-poster-grid"></div>
            `;

            const grid = groupSection.querySelector('.notebook-poster-grid');

            films.forEach(movie => {
                const card = document.createElement('div');
                card.className = "notebook-poster-card";
                card.id = `notebook-film-${movie.mId}`;

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
                        // Remove the card immediately from Notebook
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.remove();
                            // Update total count
                            const cEl = document.getElementById("notebookTotalCount");
                            if (cEl) {
                                cEl.textContent = state.watchedFilms.length + " / 1760";
                            }
                            // If grid is empty, remove the group section entirely
                            if (grid.children.length === 0) {
                                groupSection.remove();
                            }
                            // If everything is empty, re-init the module to show empty state
                            if (state.watchedFilms.length === 0) {
                                initJournalModule();
                            }
                        }, 200);
                    }
                });

                grid.appendChild(card);
            });

            notebookContainer.appendChild(groupSection);
        });
    }'''

start_idx = content.find(new_logic_start)
end_idx = content.find(new_logic_end) + len(new_logic_end)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + old_logic + content[end_idx:]
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully restored old logic in app.js")
else:
    print("Could not find patch points in app.js")
