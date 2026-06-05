import urllib.request
import json

url = "https://api.themoviedb.org/3/movie/605?api_key=8265bd1679663a7ea12ac168da84d2e8"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print("Title:", data.get('title'))
        print("Poster:", "https://image.tmdb.org/t/p/w500" + str(data.get('poster_path')))
        print("Plot:", data.get('overview'))
except Exception as e:
    print(e)
