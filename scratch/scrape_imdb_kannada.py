import urllib.request
import re
import json

movies = {
    'K.G.F: Chapter 1': 'tt8176054',
    'K.G.F: Chapter 2': 'tt10698680',
    'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 'tt14300300'
}

results = {}

for title, tt in movies.items():
    url = f"https://www.imdb.com/title/{tt}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'meta property="og:image" content="(https://m\.media-amazon\.com/images/M/[^"]+)"', html)
        if match:
            results[title] = match.group(1)
            print(f"Found {title}: {match.group(1)}")
        else:
            print(f"Not found: {title}")
    except Exception as e:
        print(f"Error {title}: {e}")

# If we found them, update data.js
if len(results) > 0:
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const FILMS_DATA = (\{[\s\S]*?\});', content)
    if match:
        data = json.loads(match.group(1).replace("\n", "").replace("    ", "")) # This is risky since it's JS, let's use node instead for the update step.

