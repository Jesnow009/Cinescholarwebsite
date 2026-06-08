import os
import glob
import re

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)
missing = []

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Use regex to find the dropdown menu
    match = re.search(r'<ul\s+class="dropdown-menu"[^>]*>.*?</ul>', content, re.DOTALL)
    if match:
        dropdown_html = match.group(0)
        if 'notebook.html' not in dropdown_html:
            missing.append(file_path)
            
            # Find the last </li> before </ul> to insert the notebook link
            # Or just insert it before </ul>
            new_dropdown_html = dropdown_html.replace('</ul>', '    <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>\n                        <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>\n                    </ul>')
            
            content = content.replace(dropdown_html, new_dropdown_html)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

print(f'Fixed {len(missing)} files missing notebook link:')
for m in missing:
    print(os.path.basename(m))
