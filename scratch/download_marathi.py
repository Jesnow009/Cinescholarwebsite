import urllib.request
import json
import re

downloads = {
    'Sairat': 'https://upload.wikimedia.org/wikipedia/en/3/36/Sairat_poster.jpg',
    'Naal': 'https://upload.wikimedia.org/wikipedia/en/e/e0/Naal_film_poster.jpg',
    'Jhund': 'https://upload.wikimedia.org/wikipedia/en/c/cb/Jhund_poster.jpg',
    'Phoonk': 'https://upload.wikimedia.org/wikipedia/en/d/d4/Phoonk.jpg',
    'Hawaizaada': 'https://upload.wikimedia.org/wikipedia/en/b/b3/Hawaizaada_poster.jpg',
    'Ventilator': 'https://upload.wikimedia.org/wikipedia/en/5/52/Ventilator_Film_Poster.png',
    'Fandry': 'https://upload.wikimedia.org/wikipedia/en/c/c8/Fandry_Poster.jpeg',
    'Ribbon': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Ribbon_Poster.jpg'
}

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

for title, url in downloads.items():
    ext = url.split('.')[-1]
    filename = f"assets/images/{title.lower().replace(' ', '_')}.{ext}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {title}")
        
        # update content
        pattern = r'("title": "' + re.escape(title) + r'",\s*"year": \d+,\s*"director": "[^"]+",\s*"poster": ")[^"]+(")'
        content = re.sub(pattern, r'\g<1>' + filename + r'\g<2>', content)
    except Exception as e:
        print(f"Failed {title}: {e}")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated data.js")
