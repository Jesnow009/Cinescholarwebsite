import re
import urllib.request
import os

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

amazon_urls = set(re.findall(r'"poster": "(https://m\.media-amazon\.com/images/[^"]+)"', content))
print("Amazon URLs found:")
for url in amazon_urls:
    # Find the title
    pattern = r'"title": "([^"]+)",(?:[^}]*?)"poster": "' + re.escape(url) + r'"'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        print(f"Title: {match.group(1)} -> {url}")
    else:
        # Fallback to searching backwards
        idx = content.find(url)
        if idx != -1:
            title_idx = content.rfind('"title":', 0, idx)
            if title_idx != -1:
                end_quote = content.find('"', title_idx + 10)
                if end_quote != -1:
                    print(f"Title fallback: {content[title_idx+10:end_quote]} -> {url}")
        else:
            print(f"Title not found for {url}")

