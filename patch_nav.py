import os

files = ['index.html', 'direction.html', 'editing.html', 'cinematography.html']

target = """                        <li><a href="cinematography.html">Cinematography</a></li>
                    </ul>
                </li>
                <li><a href="notebook.html">My Notebook</a></li>"""

replacement = """                        <li><a href="cinematography.html">Cinematography</a></li>
                        <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>
                        <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>
                    </ul>
                </li>"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace(target, replacement)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# For notebook.html
notebook_target = """            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li class="active"><a href="notebook.html">Notebook</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-trigger">Curriculum <i class="ri-arrow-down-s-line"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="cinematography.html">Cinematography</a></li>
                    </ul>
                </li>
            </ul>"""

notebook_replacement = """            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-trigger">Curriculum <i class="ri-arrow-down-s-line"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="direction.html">Direction</a></li>
                        <li><a href="editing.html">Editing</a></li>
                        <li><a href="cinematography.html">Cinematography</a></li>
                        <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0;"></div>
                        <li><a href="notebook.html" style="color: var(--accent);"><i class="ri-book-mark-line"></i> My Notebook</a></li>
                    </ul>
                </li>
            </ul>"""

with open('notebook.html', 'r', encoding='utf-8') as file:
    content = file.read()
content = content.replace(notebook_target, notebook_replacement)
with open('notebook.html', 'w', encoding='utf-8') as file:
    file.write(content)

print("done")
