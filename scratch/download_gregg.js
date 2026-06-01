const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('assets/images/cinematographers/gregg-toland.jpg');
https.get('https://upload.wikimedia.org/wikipedia/commons/1/1a/Gregg_Toland.jpg', {headers: {'User-Agent': 'Mozilla/5.0'}}, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Download complete'));
  });
}).on('error', function(err) {
  fs.unlink('assets/images/cinematographers/gregg-toland.jpg', () => {});
  console.error('Error:', err.message);
});
