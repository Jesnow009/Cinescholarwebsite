import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the section smaller
content = content.replace('padding: 6rem 5%;', 'padding: 3.5rem 5%;')
content = content.replace('gap: 4rem;', 'gap: 2rem;')

# Fix contact-socials alignment
content = content.replace('.contact-socials {\n    display: flex;\n    gap: 1.5rem;\n}', '.contact-socials {\n    display: flex;\n    gap: 1.5rem;\n    justify-content: flex-end;\n    margin-top: 1.5rem;\n}')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS patched successfully.")
