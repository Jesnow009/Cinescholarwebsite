import urllib.request
import re

url = "https://www.imdb.com/name/nm2886400/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        # search for any m.media-amazon.com/images/M/
        matches = re.findall(r'https://m\.media-amazon\.com/images/M/[a-zA-Z0-9@_.,-]+\.jpg', html)
        print("Found images:", list(set(matches)))
except Exception as e:
    print("Error:", e)
