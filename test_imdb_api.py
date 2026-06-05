import urllib.request
import urllib.parse
import json

movies = [
    "Anantha Rathriya",
    "Between Two Worlds",
    "Ontoryatra",
    "Doob: No Bed of Roses",
    "Manto Sarmad Khoosat",
    "Kamli film",
    "Shambhala 2024",
    "Highway Nepali film"
]

for title in movies:
    try:
        url = f"https://v3.sg.media-imdb.com/suggestion/x/{urllib.parse.quote(title)}.json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(res)
        
        if data.get('d') and len(data['d']) > 0:
            best_match = data['d'][0]
            if 'i' in best_match and 'imageUrl' in best_match['i']:
                print(f"{title}: {best_match['i']['imageUrl']}")
            else:
                print(f"{title}: No image in match")
        else:
            print(f"{title}: Not found")
    except Exception as e:
        print(f"{title}: Error {e}")
