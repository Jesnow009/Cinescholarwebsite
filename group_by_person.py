import os

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '        // Render groups\n        Object.keys(groups).forEach(groupTitle => {'
end_marker = '            notebookContainer.appendChild(groupSection);\n        });\n    }'

if start_marker in content and end_marker in content:
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker) + len(end_marker)

    new_logic = '''        // Render groups
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
            `;

            // Group films by person
            const personGroups = {};
            films.forEach(movie => {
                const pName = movie.personName || "Other Selected Films";
                if (!personGroups[pName]) personGroups[pName] = [];
                personGroups[pName].push(movie);
            });

            Object.keys(personGroups).forEach(pName => {
                const subSection = document.createElement('div');
                subSection.style.marginBottom = '2.5rem';
                
                let iconHtml = '<i class="ri-user-star-line"></i>';
                if (pName === "Other Selected Films") iconHtml = '<i class="ri-film-line"></i>';

                subSection.innerHTML = `
                    <h3 style="font-size: 1.15rem; color: var(--accent-gold); margin-bottom: 1.25rem; font-family: var(--font-ui); display: flex; align-items: center; gap: 0.5rem; padding-left: 0.5rem; border-left: 3px solid var(--accent-gold);">
                        ${iconHtml} ${pName}
                    </h3>
                    <div class="notebook-poster-grid"></div>
                `;

                const grid = subSection.querySelector('.notebook-poster-grid');

                personGroups[pName].forEach(movie => {
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
                            <div class="npc-watched-date" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.1);"><i class="ri-calendar-line"></i> ${state.watchedDates && state.watchedDates[movie.mId] ? state.watchedDates[movie.mId] : "Unknown Date"}</div>
                        </div>
                    `;

                    const btn = card.querySelector('.npc-remove-btn');
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const index = state.watchedFilms.indexOf(movie.mId);
                        if (index > -1) {
                            state.watchedFilms.splice(index, 1);
                            delete state.watchedDates[movie.mId];
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
                                    subSection.remove();
                                }
                                if (groupSection.querySelectorAll('.notebook-poster-card').length === 0) {
                                    groupSection.remove();
                                }
                                if (state.watchedFilms.length === 0) {
                                    initJournalModule();
                                }
                            }, 200);
                        }
                    });

                    grid.appendChild(card);
                });
                
                groupSection.appendChild(subSection);
            });

            notebookContainer.appendChild(groupSection);
        });
    }'''

    new_content = content[:start_idx] + new_logic + content[end_idx:]
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully added person grouping to Watch Log.")
else:
    print("Could not find the markers in app.js!")
