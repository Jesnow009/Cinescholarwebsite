import requests
import time
import sys

url = "https://api.themoviedb.org/3/movie/57367?api_key=8265bd1679663a7ea12ac168da84d2e8"

for i in range(5):
    try:
        r = requests.get(url, timeout=10)
        print("Success:", r.json().get("poster_path"))
        sys.exit(0)
    except Exception as e:
        print("Error on try", i+1, e)
        time.sleep(1)

sys.exit(1)
