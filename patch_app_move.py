import re

with open("d:/Film Studies Website/js/app.js", "r", encoding='utf-8') as f:
    content = f.read()

# Replace toggleQuickWatch
content = re.sub(
    r"""btn\.innerHTML = '<i class="ri-add-line" style="font-size: 1\.3rem; font-weight: bold;"></i>';""",
    """btn.innerHTML = '<i class="ri-add-box-line" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Mark Watched</span>';""",
    content
)
content = re.sub(
    r"""btn\.innerHTML = '<i class="ri-check-line" style="font-size: 1\.3rem; font-weight: bold;"></i>';""",
    """btn.innerHTML = '<i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>';""",
    content
)

# Function to move the button inside a specific block
def move_button(content, button_pattern):
    # This assumes the button is at the top of the card and we want to move it to `screening-card-bottom`
    # We will just extract the button, remove it from the top, and inject it before the movie-plot-section
    
    # Let's do it manually since there are 3 distinct locations
    pass

# Location 1: main render (list view)
btn1_pattern = r"""(\s*<button class="quick-tick-btn \$\{state\.watchedFilms\.includes\(mId\) \? 'watched' : ''\}"[^>]*>\s*<i class="\$\{state\.watchedFilms\.includes\(mId\) \? 'ri-check-line' : 'ri-add-line'\}"[^>]*></i>\s*</button>\s*)"""

match = re.search(btn1_pattern, content)
if match:
    btn_html = match.group(1)
    # Remove from top
    content = content.replace(btn_html, "")
    
    # Create the new styled button HTML
    new_btn_html = """
                                      <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}">
                                          <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark Watched'}</span>
                                      </button>
                                      """
    
    # Inject before movie-plot-section in location 1
    content = content.replace(
        """<div class="movie-plot-section" style="width: 100%;">""",
        new_btn_html + """<div class="movie-plot-section" style="width: 100%;">""",
        1 # Only first match which is in renderList
    )

# Location 2: Active film details
btn2_pattern = r"""(\s*<button class="quick-tick-btn \$\{state\.watchedFilms\.includes\(film\.id\) \? 'watched' : ''\}"[^>]*>\s*<i class="\$\{state\.watchedFilms\.includes\(film\.id\) \? 'ri-check-line' : 'ri-add-line'\}"[^>]*></i>\s*</button>\s*)"""
match2 = re.search(btn2_pattern, content)
if match2:
    btn_html = match2.group(1)
    content = content.replace(btn_html, "")
    new_btn_html = """
                      <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}">
                          <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>
                      """
    content = content.replace(
        """<div class="movie-plot-section" style="width: 100%;">""",
        new_btn_html + """<div class="movie-plot-section" style="width: 100%;">""",
        1 # The remaining one
    )

# Location 3: Notebook
btn3_pattern = r"""(\s*<button class="quick-tick-btn watched"[^>]*>\s*<i class="ri-check-line"[^>]*></i>\s*</button>\s*)"""
match3 = re.search(btn3_pattern, content)
if match3:
    btn_html = match3.group(1)
    content = content.replace(btn_html, "")
    new_btn_html = """
                          <button class="quick-tick-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched">
                              <i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i>
                              <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>
                          </button>
                          """
    content = content.replace(
        """<!-- Poster -->""",
        new_btn_html + """<!-- Poster -->""",
        1 # Notebook doesn't have plot section, we'll put it right after the top container starts
    )


with open("d:/Film Studies Website/js/app.js", "w", encoding='utf-8') as f:
    f.write(content)

print("done")
