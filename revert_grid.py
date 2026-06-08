import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_css = '''.notebook-poster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
}'''

new_css = '''.notebook-poster-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}'''

if old_css in content:
    content = content.replace(old_css, new_css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Reverted grid CSS to 6 columns.")
else:
    print("Could not find old CSS block.")
