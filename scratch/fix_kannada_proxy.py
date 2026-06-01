import urllib.request
import json
import re

API_KEY = '8265bd1679663a7ea12ac168da84d2e8'

ids = {
    'K.G.F: Chapter 1': 559969,
    'Vendhu Thanindhathu Kaadu: Part I - The Kindling': 866597
}

posters = {}

for title, movie_id in ids.items():
    url = f"https://api.allorigins.win/get?url=https%3A%2F%2Fapi.themoviedb.org%2F3%2Fmovie%2F{movie_id}%3Fapi_key%3D{API_KEY}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req).read().decode('utf-8')
        proxy_data = json.loads(response)
        data = json.loads(proxy_data['contents'])
        if 'poster_path' in data and data['poster_path']:
            poster_url = f"https://image.tmdb.org/t/p/w500{data['poster_path']}"
            posters[title] = poster_url
            print(f"Found {title}: {poster_url}")
    except Exception as e:
        print(f"Error {title}: {e}")

if posters:
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    for title, poster_url in posters.items():
        pattern = r'("title": "' + re.escape(title) + r'",\s*"year": \d+,\s*"director": "[^"]+",\s*"poster": ")[^"]+(")'
        content = re.sub(pattern, r'\g<1>' + poster_url + r'\g<2>', content)
        
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated js/data.js via proxy")
