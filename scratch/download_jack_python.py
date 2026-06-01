import urllib.request

url = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jack-cardiff-pipe-1.jpg/250px-Jack-cardiff-pipe-1.jpg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response, open('assets/images/cinematographers/jack-cardiff.jpg', 'wb') as out_file:
        data = response.read()
        out_file.write(data)
        print("Downloaded image successfully!")
except Exception as e:
    print("Error:", e)
