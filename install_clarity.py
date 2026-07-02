import os
import glob

directory = 'd:/Film Studies Website'
html_files = glob.glob(os.path.join(directory, '*.html'))

clarity_code = """
    <!-- Microsoft Clarity Tracking Code -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "x3xz5xowh3");
    </script>
"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if we already inserted it
    if "x3xz5xowh3" not in content:
        # Insert before </head>
        content = content.replace('</head>', clarity_code + '</head>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added Clarity to {os.path.basename(file_path)}")

print("Clarity installation complete.")
