import urllib.request
import urllib.parse
import json
import re

movies = [
    'Watan Kay Rakhwalay 1991',
    'The Surja Dighal Bari 1979',
    'Chitra Nodir Pare 1999'
]

def search_imdb(query):
    try:
        url = "https://v3.sg.media-imdb.com/suggestion/x/" + urllib.parse.quote(query.replace(' ', '_')) + ".json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            if data and 'd' in data and len(data['d']) > 0:
                for item in data['d']:
                    if 'i' in item and 'imageUrl' in item['i']:
                        return item['i']['imageUrl']
    except Exception as e:
        print(f"Error searching IMDB for {query}: {e}")
    return None

import sys
import os

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

for m in movies:
    print(f"Searching IMDB for {m}...")
    img_url = search_imdb(m)
    if img_url:
        print(f"Found IMDB poster for {m}: {img_url}")
        title = m.rsplit(' ', 1)[0] # remove year
        filename = f"assets/images/{title.lower().replace(' ', '_')}.jpg"
        
        try:
            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {title}")
            
            # replace in data.js
            # Find the title (can be partial match due to parentheses)
            pattern = r'("title": "' + re.escape(title) + r'(?: \([^)]+\))?",\s*"year": \d+,\s*"director": "[^"]+",\s*"poster": ")[^"]+(")'
            content = re.sub(pattern, r'\g<1>' + filename + r'\g<2>', content)
        except Exception as e:
            print(f"Failed to download {title}: {e}")
    else:
        print(f"Could not find IMDB poster for {m}")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated data.js with IMDB posters.")
