import os

with open('d:/Film Studies Website/js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = '''        function addFilmToGroup(pathTitle, filmObj, parentName) {
            if (!groups[pathTitle]) groups[pathTitle] = [];
            // Prevent duplicates
            if (!groups[pathTitle].some(f => f.mId === filmObj.mId)) {
                groups[pathTitle].push({ ...filmObj, parentName });
            }
        }'''
        
replacement1 = '''        function addFilmToGroup(pathTitle, filmObj, parentName, pathKey, personId, personRegion) {
            if (!groups[pathTitle]) groups[pathTitle] = [];
            // Prevent duplicates
            if (!groups[pathTitle].some(f => f.mId === filmObj.mId)) {
                groups[pathTitle].push({ ...filmObj, parentName, pathKey, personId, personRegion });
            }
        }'''

content = content.replace(target1, replacement1)

target2 = '''                                    addFilmToGroup(path.title, { ...movie, mId: mId }, person.name);'''
replacement2 = '''                                    addFilmToGroup(path.title, { ...movie, mId: mId }, person.name, pathKey, person.id, person.region);'''
content = content.replace(target2, replacement2)

target3 = '''                            addFilmToGroup(path.title, { ...film, mId: film.id }, null);'''
replacement3 = '''                            addFilmToGroup(path.title, { ...film, mId: film.id }, null, pathKey, null, null);'''
content = content.replace(target3, replacement3)

target4 = '''            films.forEach(movie => {
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
                `;'''

replacement4 = '''            films.forEach(movie => {
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
                `;'''

content = content.replace(target4, replacement4)

with open('d:/Film Studies Website/js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
