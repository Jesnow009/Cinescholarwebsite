import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_css = '''.quick-tick-btn {
    position: relative;
    width: 100%;
    margin-bottom: 0.75rem;
    background: rgba(15, 17, 26, 0.85);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.85rem 2rem;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-family: var(--font-ui);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}'''

new_css = '''.quick-tick-btn {
    position: relative;
    width: 100%;
    margin-bottom: 0.75rem;
    background: rgba(35, 38, 50, 0.95);
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 6px;
    padding: 0.85rem 2rem;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-family: var(--font-ui);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(212, 175, 55, 0.1);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}'''

if old_css in content:
    content = content.replace(old_css, new_css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated button styles.")
else:
    print("Could not find old CSS block.")
