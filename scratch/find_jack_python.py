import urllib.request
import re

req = urllib.request.Request('https://en.wikipedia.org/wiki/Jack_Cardiff', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find the infobox image
    match = re.search(r'<table class="infobox[^>]*>.*?<img[^>]+src="([^"]+)"', html, re.DOTALL)
    if match:
        url = match.group(1)
        if url.startswith('//'):
            url = 'https:' + url
        print('Image URL:', url)
    else:
        print('No infobox image found.')
except Exception as e:
    print('Error:', e)
