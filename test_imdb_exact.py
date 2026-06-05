import urllib.request
import re

imdb_ids = {
    "Ontoryatra": "tt0494833",
    "Highway": "tt2244834"
}

for title, tt_id in imdb_ids.items():
    try:
        url = f"https://www.imdb.com/title/{tt_id}/"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        img_match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if img_match:
            print(f"{title}: {img_match.group(1)}")
        else:
            print(f"{title}: No image in page")
    except Exception as e:
        print(f"{title}: Error {e}")
