import re
import urllib.request
import os

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all Amazon image URLs
amazon_urls = set(re.findall(r'"poster": "(https://m\.media-amazon\.com/images/[^"]+)"', content))

if not amazon_urls:
    print("No Amazon URLs found in js/data.js.")
else:
    for url in amazon_urls:
        # Generate a filename based on the URL or just sequential. Better to extract a part of it, but maybe just search for the title before it.
        # Let's find the title that corresponds to this poster.
        pattern = r'"title": "([^"]+)",\s*[^}]*"poster": "' + re.escape(url) + r'"'
        match = re.search(pattern, content)
        if match:
            title = match.group(1)
            filename = title.lower().replace(' ', '-').replace(':', '').replace("'", "") + '.jpg'
            local_path = f"assets/images/{filename}"
            print(f"Downloading {url} to {local_path} for {title}")
            
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                img_data = urllib.request.urlopen(req).read()
                with open(local_path, 'wb') as img_file:
                    img_file.write(img_data)
                
                # Replace in content
                content = content.replace(f'"poster": "{url}"', f'"poster": "{local_path}"')
            except Exception as e:
                print(f"Failed to download {url}: {e}")
        else:
            print(f"Could not find title for {url}")

    # Write back to js/data.js
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated js/data.js")
