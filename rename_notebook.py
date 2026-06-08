import os
import glob
import re

base_dir = 'd:/Film Studies Website'
notebook_file = os.path.join(base_dir, 'notebook.html')
watch_log_file = os.path.join(base_dir, 'watch-log.html')

if os.path.exists(notebook_file):
    os.rename(notebook_file, watch_log_file)
    print(f"Renamed notebook.html to watch-log.html")

html_files = glob.glob(os.path.join(base_dir, '**/*.html'), recursive=True)
updated_html = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Replace URLs
    new_content = new_content.replace('notebook.html', 'watch-log.html')
    # Replace UI text
    new_content = new_content.replace('My Notebook', 'Watch Log')
    new_content = new_content.replace('> Notebook<', '> Watch Log<')
    new_content = new_content.replace('>Notebook<', '>Watch Log<')
    new_content = new_content.replace('data-page="notebook"', 'data-page="watch-log"')
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_html += 1

print(f"Updated {updated_html} HTML files.")

app_js_path = os.path.join(base_dir, 'js', 'app.js')
if os.path.exists(app_js_path):
    with open(app_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = content
    new_content = new_content.replace('state.activePage === "notebook"', 'state.activePage === "watch-log"')
    new_content = new_content.replace('Your Notebook is Empty', 'Your Watch Log is Empty')
    new_content = new_content.replace('CineScholar Film Studies Notebook', 'CineScholar Film Studies Watch Log')
    
    if new_content != content:
        with open(app_js_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated js/app.js")

