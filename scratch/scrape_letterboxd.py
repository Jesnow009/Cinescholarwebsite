import urllib.request
import re

url = "https://letterboxd.com/film/passion-2005/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'meta property="og:image" content="([^"]+)"', html)
    if match:
        print(match.group(1))
    else:
        print("Not found")
except Exception as e:
    print(e)
