import re

with open("d:/Film Studies Website/js/app.js", "r", encoding='utf-8') as f:
    content = f.read()

# Replace toggleQuickWatch innerHTML
content = content.replace(
    """btn.innerHTML = '<i class="ri-add-line" style="font-size: 1.3rem; font-weight: bold;"></i>';""",
    """btn.innerHTML = '<i class="ri-add-box-line" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Mark</span>';"""
)
content = content.replace(
    """btn.innerHTML = '<i class="ri-check-line" style="font-size: 1.3rem; font-weight: bold;"></i>';""",
    """btn.innerHTML = '<i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Watched</span>';"""
)

# Replace the HTML generations
old_html_1 = """                                      <i class="${state.watchedFilms.includes(mId) ? 'ri-check-line' : 'ri-add-line'}" 
style="font-size: 1.3rem; font-weight: bold;"></i>"""
new_html_1 = """                                      <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                      <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark'}</span>"""
content = content.replace(old_html_1, new_html_1)

old_html_2 = """                      <i class="${state.watchedFilms.includes(film.id) ? 'ri-check-line' : 'ri-add-line'}" 
style="font-size: 1.3rem; font-weight: bold;"></i>"""
new_html_2 = """                      <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                      <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark'}</span>"""
content = content.replace(old_html_2, new_html_2)

old_html_3 = """                          <i class="ri-check-line" style="font-size: 1.3rem; font-weight: bold;"></i>"""
new_html_3 = """                          <i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Watched</span>"""
content = content.replace(old_html_3, new_html_3)

with open("d:/Film Studies Website/js/app.js", "w", encoding='utf-8') as f:
    f.write(content)

print("done")
