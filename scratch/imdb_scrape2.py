import urllib.request
import re

url = "https://www.imdb.com/name/nm2886400/mediaviewer/rm2134084865/?ref_=nm_ov_ph"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(len(html))
        match = re.search(r'<meta property="og:image" content="(.*?)"', html)
        if match:
            print("OG Image:", match.group(1))
        
        urls = re.findall(r'https://[^"]+\.jpg', html)
        if urls:
            print(urls[:5])
except Exception as e:
    print(e)
