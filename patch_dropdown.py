import os
import glob
import re

html_files = glob.glob('*.html')

notebook_link = '''
                          <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>
                          <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>'''

for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # If it doesn't already have the notebook link in the dropdown menu
        if 'notebook.html' not in content or '<ul class="dropdown-menu">' in content and 'notebook.html' not in content[content.find('<ul class="dropdown-menu">'):content.find('</ul>', content.find('<ul class="dropdown-menu">'))]:
            # Find the end of the dropdown menu for Curriculum
            # The dropdown has Direction, Editing, Cinematography
            pattern = re.compile(r'(<a href="cinematography\.html">Cinematography</a></li>\s*)(</ul>)')
            
            new_content = pattern.sub(r'\1' + notebook_link + r'\n                      \2', content)
            
            if content != new_content:
                with open(f, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f'Patched {f}')
    except Exception as e:
        print(f'Error patching {f}: {e}')
