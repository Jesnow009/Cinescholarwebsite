import os
files = ['direction.html', 'editing.html', 'cinematography.html']
target = """                        <li><a href="cinematography.html">Cinematography</a></li>
                    </ul>
                </li>"""

replacement = """                        <li><a href="cinematography.html">Cinematography</a></li>
                    </ul>
                </li>
                <li><a href="notebook.html">My Notebook</a></li>"""

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    content = content.replace(target, replacement)
    with open(f, 'w') as file:
        file.write(content)
print("done")
