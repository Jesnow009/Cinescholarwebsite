import glob
import re

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)
count = 0

old_html = r'<li><a href="watch-log\.html" style="color: var\(--accent-gold\); display: flex; align-items: center; gap: 0\.4rem;"><i class="ri-book-mark-line"></i> Watch Log</a></li>'
new_html = '<li><a href="watch-log.html" style="color: var(--accent-gold);"><i class="ri-book-mark-line" style="vertical-align: middle; margin-right: 4px; margin-top: -2px;"></i> Watch Log</a></li>'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if re.search(old_html, content):
        new_content = re.sub(old_html, new_html, content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Fixed Watch Log alignment in {count} files.")
