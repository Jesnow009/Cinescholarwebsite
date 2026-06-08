import os
import glob

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'app.js?v=14' in content or 'data.js?v=14' in content:
        content = content.replace('app.js?v=14', 'app.js?v=15')
        content = content.replace('data.js?v=14', 'data.js?v=15')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Bumped version to v=15 across all HTML files.")
