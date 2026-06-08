import re

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State initialization
state_regex = r'(watchedSources: JSON\.parse\(localStorage\.getItem\("cine_watched_sources"\)\) \|\| \{\},)'
if re.search(state_regex, content):
    content = re.sub(state_regex, r'\1\n    watchedDates: JSON.parse(localStorage.getItem("cine_watched_dates")) || {},', content)

# 2. saveWatchedState
save_regex = r'(localStorage\.setItem\("cine_watched_sources", JSON\.stringify\(state\.watchedSources\)\);)'
if re.search(save_regex, content):
    content = re.sub(save_regex, r'\1\n        localStorage.setItem("cine_watched_dates", JSON.stringify(state.watchedDates));', content)

# 3. toggleQuickWatch
# Add to initialization
toggle_init_regex = r'(if \(!state\.watchedSources\) state\.watchedSources = \{\};)'
if re.search(toggle_init_regex, content):
    content = re.sub(toggle_init_regex, r'\1\n        if (!state.watchedDates) state.watchedDates = {};', content)

# Remove date on untoggle
toggle_remove_regex = r'(delete state\.watchedSources\[filmId\];)'
if re.search(toggle_remove_regex, content):
    content = re.sub(toggle_remove_regex, r'\1\n            delete state.watchedDates[filmId];', content)

# Add date on toggle
toggle_add_regex = r'(state\.watchedSources\[filmId\] = sourceTitle;)'
date_logic = r'''\1
            const today = new Date();
            const d = String(today.getDate()).padStart(2, '0');
            const m = String(today.getMonth() + 1).padStart(2, '0');
            const y = today.getFullYear();
            state.watchedDates[filmId] = `${d}-${m}-${y}`;'''
if re.search(toggle_add_regex, content):
    content = re.sub(toggle_add_regex, date_logic, content)

# 4. Display in initJournalModule
display_regex = r'(<div class="npc-year">\$\{movie\.year \|\| \'\'\}<\/div>)'
display_logic = r'\1\n                        <div class="npc-watched-date" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.1);"><i class="ri-calendar-line"></i> ${state.watchedDates && state.watchedDates[movie.mId] ? state.watchedDates[movie.mId] : "Unknown Date"}</div>'
if re.search(display_regex, content):
    content = re.sub(display_regex, display_logic, content)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied date functionality patches to app.js")
