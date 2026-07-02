import os
import glob

directory = 'd:/Film Studies Website'
html_files = glob.glob(os.path.join(directory, '*.html'))

old_footer = '<p class="footer-copy">&copy; 2026 CineScholar. Created for aspiring directors and cinema students.</p>'
new_footer = '<p class="footer-copy">&copy; 2026 CineScholar. <span style="color: rgba(255,255,255,0.7);">Crafted by <strong style="color: var(--accent-gold); letter-spacing: 1px;">Jesnow Biju</strong></span></p>'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_footer in content:
        content = content.replace(old_footer, new_footer)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
    else:
        # Fallback if the text was slightly different
        if 'class="footer-copy"' in content:
            # simple regex replace
            import re
            content = re.sub(r'<p class="footer-copy">.*?</p>', new_footer, content)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {os.path.basename(file_path)} via fallback")

print("Footer updated across all pages.")
