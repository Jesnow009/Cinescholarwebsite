const https = require('https');
https.get('https://www.imdb.com/name/nm0005682/', {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
  let d='';
  res.on('data', c=>d+=c);
  res.on('end', () => {
    const match = d.match(/https:\/\/m\.media-amazon\.com\/images\/M\/[^"]+\.jpg/);
    if(match) console.log('IMDB Image:', match[0]);
    else console.log('Not found');
  });
});
