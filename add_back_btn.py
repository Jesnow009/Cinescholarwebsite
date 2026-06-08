import os
import glob
import re

css_path = 'd:/Film Studies Website/css/style.css'
with open(css_path, 'a', encoding='utf-8') as f:
    f.write('''\n
/* --- Global Back Button --- */
.global-back-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-muted);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.2rem;
}

.global-back-btn:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: var(--accent-gold);
    color: var(--accent-gold);
    transform: translateX(-3px);
}
''')

html_files = glob.glob('d:/Film Studies Website/**/*.html', recursive=True)

old_logo = '''<div class="logo">
                <a href="index.html" style="display:flex; align-items:center; gap:0.75rem;">
                    <i class="ri-movie-2-line logo-icon"></i>
                    <span class="logo-text">CineScholar</span>
                </a>
            </div>'''

new_logo_normal = '''<div style="display:flex; align-items:center; gap: 1rem;">
                <button onclick="if(document.referrer.includes(window.location.hostname)){ history.back(); } else { window.location.href='index.html'; }" class="global-back-btn" title="Go Back"><i class="ri-arrow-left-line"></i></button>
                <div class="logo">
                    <a href="index.html" style="display:flex; align-items:center; gap:0.75rem;">
                        <i class="ri-movie-2-line logo-icon"></i>
                        <span class="logo-text">CineScholar</span>
                    </a>
                </div>
            </div>'''

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_logo in content:
        if os.path.basename(file_path) == 'index.html':
            # Skip index.html or keep old_logo
            pass
        else:
            new_content = content.replace(old_logo, new_logo_normal)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1

print(f"Added back button to {count} files.")
