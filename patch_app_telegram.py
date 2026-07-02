import os

app_js_path = 'd:/Film Studies Website/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the screening cards clickable to open the telegram vault
content = content.replace(
    '<div class="screening-card" id="film-${mId}">',
    '<div class="screening-card" id="film-${mId}" onclick="window.open(\'https://t.me/cinescholarmovievault\', \'_blank\')" style="cursor: pointer;">'
)

# And for the detail header card
content = content.replace(
    '<div class="film-detail-header screening-card">',
    '<div class="film-detail-header screening-card" onclick="window.open(\'https://t.me/cinescholarmovievault\', \'_blank\')" style="cursor: pointer;">'
)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Telegram link added to all movie cards in app.js")
