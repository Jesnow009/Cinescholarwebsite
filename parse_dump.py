import re

with open('dump.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'data-post="(cinescholarmovievault/\d+)".*?class="tgme_widget_message_document_title"[^>]*>(.*?)</div>'
matches = re.findall(pattern, html, re.DOTALL)

for post_id, title in matches:
    clean_title = re.sub(r'<[^>]+>', '', title).strip()
    print(f"https://t.me/{post_id} -> {clean_title}")
