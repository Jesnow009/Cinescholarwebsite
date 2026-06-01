import urllib.request, re

html = urllib.request.urlopen(urllib.request.Request('https://www.bing.com/images/search?q=Psycho+2020+Tamil+movie+poster', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
urls = re.findall(r'murl&quot;:&quot;(https?[^&]+(?:jpg|jpeg|png))&quot;', html)

req = urllib.request.build_opener()
req.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(req)

success = False
for u in urls:
    try:
        urllib.request.urlretrieve(u, 'assets/images/psycho-real.jpg')
        success = True
        break
    except:
        pass

print('Found' if success else 'Not found')
