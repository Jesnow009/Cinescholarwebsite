import re

with open('d:/Film Studies Website/watch-log.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<i class="ri-book-mark-line"></i>', r'<i class="ri-book-mark-line" style="vertical-align: middle; margin-right: 4px; margin-top: -2px;"></i>', content)

with open('d:/Film Studies Website/watch-log.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed watch-log.html icon")
