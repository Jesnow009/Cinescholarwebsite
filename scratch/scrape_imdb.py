import urllib.request
import re

url = "https://www.imdb.com/title/tt0481845/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'"image":"(https://m\.media-amazon\.com/images/M/[^"]+)"', html)
    if match:
        print(match.group(1))
    else:
        # try another regex
        match = re.search(r'meta property="og:image" content="(https://m\.media-amazon\.com/images/M/[^"]+)"', html)
        if match:
            print(match.group(1))
        else:
            print("Not found")
except Exception as e:
    print(e)
