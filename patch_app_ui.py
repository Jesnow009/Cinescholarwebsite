import os

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert the old onclicks
content = content.replace(
    '<div class="screening-card" id="film-${mId}" onclick="window.open(\'https://t.me/cinescholarmovievault\', \'_blank\')" style="cursor: pointer;">',
    '<div class="screening-card" id="film-${mId}">'
)
content = content.replace(
    '<div class="film-detail-header screening-card" onclick="window.open(\'https://t.me/cinescholarmovievault\', \'_blank\')" style="cursor: pointer;">',
    '<div class="film-detail-header screening-card">'
)

# 2. Add the Watch Movie button to the must-watch loop
old_button_loop = """                                      <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}">
                                          <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark Watched'}</span>
                                      </button>"""

new_button_loop = """                                    <div style="display: flex; gap: 0.5rem; width: 100%;">
                                      <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}" style="flex: 1;">
                                          <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark Watched'}</span>
                                      </button>
                                      ${movie.telegram ? `
                                      <button class="quick-tick-btn watch-now-btn" onclick="event.stopPropagation(); window.open('${movie.telegram}', '_blank');" style="flex: 1; background: rgba(212,175,55,0.15); border: 1px solid var(--accent-gold); color: var(--accent-gold);" title="Watch Full Movie">
                                          <i class="ri-play-circle-fill" style="font-size: 1.2rem;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watch</span>
                                      </button>
                                      ` : ''}
                                    </div>"""

content = content.replace(old_button_loop, new_button_loop)

# 3. Add the Watch Movie button to the active film detail
old_button_detail = """                      <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}">
                          <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>"""

new_button_detail = """                    <div style="display: flex; gap: 0.5rem; width: 100%;">
                      <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}" style="flex: 1;">
                          <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>
                      ${film.telegram ? `
                      <button class="quick-tick-btn watch-now-btn" onclick="event.stopPropagation(); window.open('${film.telegram}', '_blank');" style="flex: 1; background: rgba(212,175,55,0.15); border: 1px solid var(--accent-gold); color: var(--accent-gold);" title="Watch Full Movie">
                          <i class="ri-play-circle-fill" style="font-size: 1.2rem;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watch</span>
                      </button>
                      ` : ''}
                    </div>"""

content = content.replace(old_button_detail, new_button_detail)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("UI successfully patched with conditional 'Watch' buttons.")
