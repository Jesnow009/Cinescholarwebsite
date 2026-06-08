import os
import glob

html_files = glob.glob('*.html')

target = '''                        <li><a href="cinematography.html">Cinematography</a></li>
                    </ul>
                </li>
                <li><a href="notebook.html" class="notebook-link"><i class="ri-book-mark-line"></i> My Notebook</a></li>
            </ul>'''

replacement = '''                        <li><a href="cinematography.html">Cinematography</a></li>
                        <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>
                        <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>
                    </ul>
                </li>
            </ul>'''

for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if target in content:
            new_content = content.replace(target, replacement)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Patched {f}')
    except Exception as e:
        print(f'Error patching {f}: {e}')
