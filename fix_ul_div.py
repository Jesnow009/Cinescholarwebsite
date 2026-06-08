import os
import glob

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)
fixed_count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the invalid div is present
    target_div = '<div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>'
    replacement_li = '<li style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></li>'
    
    if target_div in content:
        content = content.replace(target_div, replacement_li)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1

print(f'Fixed {fixed_count} HTML files with invalid <div> in <ul>.')
