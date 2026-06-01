const https = require('https');
https.get('https://en.wikipedia.org/wiki/Jack_Cardiff', res => {
  let d='';
  res.on('data', c=>d+=c);
  res.on('end', () => {
    const match = d.match(/<img[^>]+src=\"([^\"]+)\"[^>]*>/);
    if(match) console.log('Image:', match[1]);
  });
});
