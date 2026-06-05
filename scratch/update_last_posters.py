with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    "https://m.media-amazon.com/images/M/MV5BODVkMWQ0MTMtYjM5Ny00YWJlLWIwYzEtZjcyNWM1ZGM5ZTY3XkEyXkFqcGc@._V1_.jpg": "assets/images/kamli.jpg",
    "https://m.media-amazon.com/images/M/MV5BNTk4Y2IzZjctZjZhZS00NjQwLWFjYTctNjY0ODA2NDNkNGZmXkEyXkFqcGc@._V1_.jpg": "assets/images/manto.jpg",
    "https://m.media-amazon.com/images/M/MV5BM2ZkY2ZjOTctMzk0MS00ZmExLTlkOTUtYzZjNTlkZDRkYmJmXkEyXkFqcGc@._V1_.jpg": "assets/images/between-two-worlds.jpg"
}

for old, new in replacements.items():
    content = content.replace(f'"poster": "{old}"', f'"poster": "{new}"')

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated data.js with local poster paths")
