import urllib.request
import re

req = urllib.request.Request(
    'https://www.themoviedb.org/person/11993',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        match = re.search(r'media\.themoviedb\.org/t/p/w[a-zA-Z0-9_]+/([a-zA-Z0-9_-]+\.jpg)', html)
        if match:
            print("FREDDIE YOUNG:", match.group(1))
        else:
            print("FREDDIE YOUNG: NO MATCH")
except Exception as e:
    print("FREDDIE YOUNG:", e)
