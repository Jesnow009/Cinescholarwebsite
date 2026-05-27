import urllib.request
import json
import re

url = "https://www.imdb.com/name/nm2886400/mediaviewer/rm2134084865/?ref_=nm_ov_ph"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if match:
            data = json.loads(match.group(1))
            print("Found JSON data")
            
            # The image URL might be in the props -> pageProps
            # Let's just regex for the image URL that looks like Amazon's IMDB images
            image_urls = re.findall(r'https://m\.media-amazon\.com/images/M/[^.]+\.jpg', html)
            # Find the largest one
            unique_urls = list(set(image_urls))
            for u in unique_urls:
                print(u)
        else:
            print("NEXT_DATA not found. Trying regex.")
            image_urls = re.findall(r'https://m\.media-amazon\.com/images/M/[^.]+\.jpg', html)
            unique_urls = list(set(image_urls))
            for u in unique_urls:
                print(u)
except Exception as e:
    print(e)
