import glob
import re
import os

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)
updated_count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Remove the old notebook link and divider from the dropdown menu
    old_notebook_regex = r'<li style="height: 1px; background: rgba\(255,255,255,0\.1\); margin: 0\.5rem 0;\"></li>\s*<li><a href="notebook\.html"[^>]*>.*?</a></li>'
    
    if re.search(old_notebook_regex, content):
        content = re.sub(old_notebook_regex, '', content)
        
        # Step 2: Add the top-level Notebook link right after the dropdown menu ends
        # The dropdown menu ends with:
        #                    </ul>
        #                </li>
        # Then we want to inject our new <li>
        # Since indentation might vary, we can find:
        # </ul>\s*</li>
        
        new_nav_item = '\n                <li><a href="notebook.html" style="color: var(--accent-gold); display: flex; align-items: center; gap: 0.4rem;"><i class="ri-book-mark-line"></i> Notebook</a></li>'
        
        # In case the file is notebook.html itself, maybe add a class="active" or just leave it as is.
        # Actually, let's just make it standard for now.
        if "notebook.html" in file_path:
             new_nav_item = '\n                <li class="active"><a href="notebook.html" style="color: var(--accent-gold); display: flex; align-items: center; gap: 0.4rem;"><i class="ri-book-mark-line"></i> Notebook</a></li>'
             
        # Find where to insert it. The nav-links UL contains the dropdown LI.
        dropdown_close_regex = r'(</ul>\s*</li>)(\s*</ul>)'
        
        match = re.search(dropdown_close_regex, content)
        if match:
            content = re.sub(dropdown_close_regex, r'\1' + new_nav_item + r'\2', content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
        else:
            print(f"Could not find dropdown closing in {file_path}")

print(f"Updated {updated_count} files.")
