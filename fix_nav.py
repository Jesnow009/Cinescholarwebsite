import os
import glob

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)
missing = []
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has a dropdown but doesn't have the Notebook link
    if '<li><a href="cinematography.html">Cinematography</a></li>' in content and 'notebook.html' not in content[content.find('<ul class="dropdown-menu">'):content.find('</ul>', content.find('<ul class="dropdown-menu">'))]:
        missing.append(file_path)
        
        # Inject the link
        target = '<li><a href="cinematography.html">Cinematography</a></li>'
        replacement = target + '\n                        <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>\n                        <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>'
        
        content = content.replace(target, replacement)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print(f'Fixed {len(missing)} files missing notebook link:')
for m in missing:
    print(os.path.basename(m))
