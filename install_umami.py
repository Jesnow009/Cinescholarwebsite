import os
import glob

directory = 'd:/Film Studies Website'
html_files = glob.glob(os.path.join(directory, '*.html'))

umami_code = """
    <!-- Umami Analytics -->
    <script defer src="https://cloud.umami.is/script.js" data-website-id="ae7d9f2b-8e80-469b-8414-4303e3de2611"></script>
"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if we already inserted it
    if "data-website-id=\"ae7d9f2b" not in content:
        # Insert before </head>
        content = content.replace('</head>', umami_code + '</head>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added Umami to {os.path.basename(file_path)}")

print("Umami installation complete.")
