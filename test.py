import urllib.request
import re

url = 'https://t.me/s/cinescholarmovievault'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find data-post and document title
pattern = r'data-post="(cinescholarmovievault/\d+)".*?class="tgme_widget_message_document_title"[^>]*>(.*?)</div>'
matches = re.findall(pattern, html, re.DOTALL)

results = []
for post_id, title in matches:
    clean_title = re.sub(r'<[^>]+>', '', title).strip()
    results.append((post_id, clean_title))

print("Results:", results)
