import urllib.request
import re

def clean_filename(filename):
    # Remove file extension
    name = re.sub(r'\.\w{3,4}$', '', filename)
    # Remove everything after a year (e.g., 1958, 2001)
    name = re.sub(r'(19\d\d|20\d\d).*', '', name, flags=re.IGNORECASE)
    # Replace dots, underscores, brackets with spaces
    name = re.sub(r'[\.\[\]\(\)_@\-]', ' ', name)
    # Remove common uploader tags
    tags = ['CC Links', 'Mj Linkz', 'Tv2Us', 'archive series']
    for tag in tags:
        name = re.sub(tag, '', name, flags=re.IGNORECASE)
    # Clean up extra spaces
    return ' '.join(name.split()).strip().lower()

def run_sync():
    print("Fetching latest movies from Telegram...")
    req = urllib.request.Request('https://t.me/s/cinescholarmovievault', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
    except Exception as e:
        print("Failed to fetch Telegram channel:", e)
        return

    pattern = r'<a class="tgme_widget_message_document_wrap" href="https://t.me/(cinescholarmovievault/\d+)">.*?<div class="tgme_widget_message_document_title[^>]*>([^<]+)</div>'
    matches = re.findall(pattern, html, re.DOTALL)
    
    print(f"Found {len(matches)} movie files on Telegram.")

    with open('js/data.js', 'r', encoding='utf-8') as f:
        data_js = f.read()

    # Extract all titles from data.js
    title_pattern = r'"title":\s*"([^"]+)"'
    db_titles = list(set(re.findall(title_pattern, data_js)))
    
    updated_count = 0
    for link, filename in matches:
        clean_name = clean_filename(filename)
        telegram_url = f"https://t.me/{link}"
        
        # Find best match in database
        best_match = None
        for db_t in db_titles:
            if db_t.lower() == clean_name:
                best_match = db_t
                break
        
        # Fallback substring match
        if not best_match:
            for db_t in db_titles:
                if db_t.lower() in clean_name or clean_name in db_t.lower():
                    # Ensure it's a very close match to avoid false positives
                    if len(db_t) > 3:
                        best_match = db_t
                        break

        if best_match:
            # Check if this exact link is already added to this title
            existing_check = r'"title":\s*"' + re.escape(best_match) + r'".*?"telegram":\s*"' + re.escape(telegram_url) + r'"'
            if not re.search(existing_check, data_js, re.DOTALL):
                # Replace the title line with title + telegram link
                replace_pattern = r'("title":\s*"' + re.escape(best_match) + r'",)(?!\s*"telegram")'
                replacement = r'\1\n                        "telegram": "' + telegram_url + r'",'
                data_js = re.sub(replace_pattern, replacement, data_js)
                print(f"Mapped: {filename} -> {best_match}")
                updated_count += 1
        else:
            print(f"Warning: Could not find database match for Telegram file: {filename} (Cleaned: {clean_name})")

    if updated_count > 0:
        with open('js/data.js', 'w', encoding='utf-8') as f:
            f.write(data_js)
        print(f"Successfully linked {updated_count} movies to the website!")
    else:
        print("No new movies needed linking.")

if __name__ == '__main__':
    run_sync()
