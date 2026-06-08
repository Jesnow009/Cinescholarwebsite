import re

with open("d:/Film Studies Website/js/app.js", "r", encoding='utf-8') as f:
    content = f.read()

# 1. Update toggleQuickWatch HTML
target1 = """            btn.innerHTML = '<i class="ri-add-box-line" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Mark</span>';"""
replacement1 = """            btn.innerHTML = '<i class="ri-add-box-line" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Mark Watched</span>';"""
content = content.replace(target1, replacement1)

target2 = """            btn.innerHTML = '<i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Watched</span>';"""
replacement2 = """            btn.innerHTML = '<i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>';"""
content = content.replace(target2, replacement2)

# 2. renderActiveDirectorDetails (remove from top)
target3 = """                            <div class="screening-card" id="film-${mId}">
                                
                                <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}">
                                    <i class="${state.watchedFilms.includes(mId) ? 'ri-check-line' : 'ri-add-line'}" style="font-size: 1.3rem; font-weight: bold;"></i>
                                </button>

                                <!-- TOP: Poster + Title Block -->"""
replacement3 = """                            <div class="screening-card" id="film-${mId}">
                                <!-- TOP: Poster + Title Block -->"""
content = content.replace(target3, replacement3)

# 3. renderActiveDirectorDetails (insert at bottom)
target4 = """                                <!-- BOTTOM: Watch & Plot -->
                                <div class="screening-card-bottom">
                                    

                                    
                                    <div class="movie-plot-section" style="width: 100%;">"""
replacement4 = """                                <!-- BOTTOM: Watch & Plot -->
                                <div class="screening-card-bottom">
                                    
                                      <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}">
                                          <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark Watched'}</span>
                                      </button>

                                    <div class="movie-plot-section" style="width: 100%;">"""
content = content.replace(target4, replacement4)


# 4. renderActiveFilmDetails (remove from top)
target5 = """            <div class="film-detail-header screening-card">
                
                <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}">
                    <i class="${state.watchedFilms.includes(film.id) ? 'ri-check-line' : 'ri-add-line'}" style="font-size: 1.3rem; font-weight: bold;"></i>
                </button>

                <!-- TOP: Poster + Title Block -->"""
replacement5 = """            <div class="film-detail-header screening-card">
                <!-- TOP: Poster + Title Block -->"""
content = content.replace(target5, replacement5)

# 5. renderActiveFilmDetails (insert at bottom)
target6 = """                <!-- BOTTOM: Watch & Plot -->
                <div class="screening-card-bottom">
                    

                    
                    <div class="movie-plot-section" style="width: 100%;">"""
replacement6 = """                <!-- BOTTOM: Watch & Plot -->
                <div class="screening-card-bottom">
                    
                      <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}">
                          <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>

                    <div class="movie-plot-section" style="width: 100%;">"""
content = content.replace(target6, replacement6)


# 6. renderNotebook (remove from top)
target7 = """                card.innerHTML = `
                    <button class="quick-tick-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched" style="position: absolute; top: 10px; right: 10px; z-index: 10;">
                        <i class="ri-check-line" style="font-size: 1.3rem; font-weight: bold;"></i>
                    </button>
                    <!-- TOP: Poster + Title Block -->"""
replacement7 = """                card.innerHTML = `
                    <!-- TOP: Poster + Title Block -->"""
content = content.replace(target7, replacement7)


# 7. renderNotebook (insert at bottom)
target8 = """                            <div class="screening-card-focus-box">
                                <div class="screening-card-focus-label">Studied Under</div>
                                <div class="screening-card-focus-text">${movie.parentName ? movie.parentName : 'General Curriculum'}</div>
                            </div>
                        </div>
                    </div>
                `;"""
replacement8 = """                            <div class="screening-card-focus-box">
                                <div class="screening-card-focus-label">Studied Under</div>
                                <div class="screening-card-focus-text">${movie.parentName ? movie.parentName : 'General Curriculum'}</div>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 0 1.5rem 1.5rem 1.5rem;">
                          <button class="quick-tick-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched">
                              <i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i>
                              <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>
                          </button>
                    </div>
                `;"""
content = content.replace(target8, replacement8)


with open("d:/Film Studies Website/js/app.js", "w", encoding='utf-8') as f:
    f.write(content)

print("done")
