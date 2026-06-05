import urllib.request
import urllib.parse
import re
import json

def fetch_imdb_poster(query):
    try:
        # Search DuckDuckGo for IMDB link
        url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query + ' imdb')}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Extract IMDB link
        match = re.search(r'href="(https://www\.imdb\.com/title/tt\d+/)"', html)
        if not match:
            return None
            
        imdb_url = match.group(1)
        
        # Fetch IMDB page
        req2 = urllib.request.Request(imdb_url, headers={'User-Agent': 'Mozilla/5.0'})
        imdb_html = urllib.request.urlopen(req2).read().decode('utf-8')
        
        # Extract og:image
        img_match = re.search(r'<meta property="og:image" content="([^"]+)"', imdb_html)
        if img_match:
            return img_match.group(1)
            
        return None
    except Exception as e:
        return str(e)

print("Anantha:", fetch_imdb_poster("Anantha Rathriya"))
print("Manto:", fetch_imdb_poster("Manto 2015 Sarmad Khoosat"))
