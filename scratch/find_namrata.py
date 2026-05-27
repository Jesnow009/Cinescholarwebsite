import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"name": "Namrata Rao"' in line or "'name': 'Namrata Rao'" in line or 'name: "Namrata Rao"' in line or 'name: \'Namrata Rao\'' in line:
        for j in range(max(0, i-2), min(len(lines), i+10)):
            print(f"{j+1}: {lines[j].strip()}")
        break
