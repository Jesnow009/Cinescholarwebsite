const fs = require('fs');

const postersToUpdate = {
  "assets/images/anantha-rathriya.jpg": "https://m.media-amazon.com/images/M/MV5BYmE1MWY3MzgtMGJmZi00MjMwLWJkNzYtYTc4ODllYjBkNDAwXkEyXkFqcGc@._V1_.jpg",
  "assets/images/between-two-worlds.jpg": "https://m.media-amazon.com/images/M/MV5BM2ZkY2ZjOTctMzk0MS00ZmExLTlkOTUtYzZjNTlkZDRkYmJmXkEyXkFqcGc@._V1_.jpg",
  "assets/images/doob.jpg": "https://m.media-amazon.com/images/M/MV5BODk1MTNkZmUtNjcyYS00ZThmLTg2MmQtNmVhMjMxNTM0YmI0XkEyXkFqcGc@._V1_.jpg",
  "assets/images/manto.jpg": "https://m.media-amazon.com/images/M/MV5BNTk4Y2IzZjctZjZhZS00NjQwLWFjYTctNjY0ODA2NDNkNGZmXkEyXkFqcGc@._V1_.jpg",
  "assets/images/shambhala.jpg": "https://m.media-amazon.com/images/M/MV5BOTA4M2RjMGItYWQ1Yy00YjY5LWEzYWEtNGIyZGFkZjk5ZjFmXkEyXkFqcGc@._V1_.jpg",
  "assets/images/kamli.jpg": "https://m.media-amazon.com/images/M/MV5BODVkMWQ0MTMtYjM5Ny00YWJlLWIwYzEtZjcyNWM1ZGM5ZTY3XkEyXkFqcGc@._V1_.jpg"
};

let data = fs.readFileSync('js/data.js', 'utf8');
for (const placeholder in postersToUpdate) {
  data = data.replace(placeholder, postersToUpdate[placeholder]);
}

fs.writeFileSync('js/data.js', data);
console.log('Posters updated successfully.');
