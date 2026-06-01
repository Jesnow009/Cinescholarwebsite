const fs = require('fs');

const dataFile = 'd:/Film Studies Website/js/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const replacements = {
    'roger-deakins': 'https://upload.wikimedia.org/wikipedia/commons/9/98/RogDeakinsBFI120921_%2816_of_17%29_%2851473086144%29_%28cropped%29.jpg',
    'gregg-toland': 'https://image.tmdb.org/t/p/w500/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg',
    'gordon-willis': 'https://image.tmdb.org/t/p/w500/6gOmfatlF7UdhaHi2tPsZMb5vmz.jpg',
    'emmanuel-lubezki': 'https://image.tmdb.org/t/p/w500/v5reoqVqGobAVAq4RploSoWD3DZ.jpg',
    'robert-richardson': 'https://image.tmdb.org/t/p/w500/lmJy31oZtN5l2VAGpkrt3xEXsxL.jpg',
    'conrad-hall': 'https://image.tmdb.org/t/p/w500/rMg7swA9zsiYWzajsg3eDaDAlku.jpg',
    'james-wong-howe': 'https://image.tmdb.org/t/p/w500/7i7dsr3DjFuUXWjDG0Kp467Sovo.jpg',
    'robert-elswit': 'https://image.tmdb.org/t/p/w500/5urU681Z1ZyJxfjEGp6qY6XYXg1.jpg',
    'janusz-kaminski': 'https://image.tmdb.org/t/p/w500/5yURZbwMmhiXXlvDmRdz4V14Ufs.jpg',
    'wally-pfister': 'https://image.tmdb.org/t/p/w500/uyWeYsERTTLjpjkE79QeSETLIoA.jpg',
    'matthew-libatique': 'https://image.tmdb.org/t/p/w500/gpW5xCOMbWWZKRPHeSIyXg4F3b1.jpg',
    'bill-pope': 'https://image.tmdb.org/t/p/w500/kpakvuSrk1D9D8WMt5SOi4Rs2EV.jpg',
    'caleb-deschanel': 'https://image.tmdb.org/t/p/w500/sY2ZKhy94GRy7CK2xseLtC67QjN.jpg',
    'dean-cundey': 'https://image.tmdb.org/t/p/w500/5f95wKLwh4OTjGEzNkDhOdixDxU.jpg',
    'bradford-young': 'https://image.tmdb.org/t/p/w500/shGkUnVemFAOVJuXQDk58CqCgsz.jpg',
    'jordan-cronenweth': 'https://image.tmdb.org/t/p/w500/kEZFQZKU5mRjDK2zi5ZjXVFgofj.jpg'
};

for (const [id, url] of Object.entries(replacements)) {
    const regex = new RegExp(`"image":\\s*"assets/images/cinematographers/${id}\\.jpg"`, 'g');
    content = content.replace(regex, `"image": "${url}"`);
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Successfully updated data.js with direct image URLs.');
