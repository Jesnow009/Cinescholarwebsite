import urllib.request
import json
import re

API_KEY = '8265bd1679663a7ea12ac168da84d2e8'

ids = {
    'K.G.F: Chapter 1': 559969,
    'K.G.F: Chapter 2': 603692,
    'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 866597
}

posters = {}

for title, movie_id in ids.items():
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(response)
        if 'poster_path' in data and data['poster_path']:
            poster_url = f"https://image.tmdb.org/t/p/w500{data['poster_path']}"
            posters[title] = poster_url
            print(f"Found {title}: {poster_url}")
    except Exception as e:
        print(f"Error {title}: {e}")

if posters:
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will use simple string replacement since we know exactly how the titles are stored
    for title, poster_url in posters.items():
        # Find the block for this title
        pattern = r'("title": "' + re.escape(title) + r'",\s*"year": \d+,\s*"director": "[^"]+",\s*"poster": ")[^"]+(")'
        content = re.sub(pattern, r'\g<1>' + poster_url + r'\g<2>', content)
        
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated js/data.js")
