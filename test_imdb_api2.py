import urllib.request
import urllib.parse
import json
import time

movies = {
    "Ontoryatra": "Ontoryatra",
    "Manto": "Manto 2015",
    "Kamli": "Kamli 2022",
    "Shambhala": "Shambhala Min Bahadur Bham",
    "Highway": "Highway Deepak Rauniyar"
}

def fetch(title):
    for i in range(3):
        try:
            url = f"https://v3.sg.media-imdb.com/suggestion/x/{urllib.parse.quote(title)}.json"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            res = urllib.request.urlopen(req).read().decode('utf-8')
            data = json.loads(res)
            
            if data.get('d') and len(data['d']) > 0:
                best_match = data['d'][0]
                if 'i' in best_match and 'imageUrl' in best_match['i']:
                    return best_match['i']['imageUrl']
            return "Not found"
        except Exception as e:
            time.sleep(1)
    return "Failed"

for key, title in movies.items():
    print(f"{key}: {fetch(title)}")
