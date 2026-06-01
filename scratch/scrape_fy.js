const https = require('https');
https.get('https://britishcinematographer.co.uk/freddie-young-bsc/', {headers:{'User-Agent':'Mozilla/5.0'}}, res=>{
    let d='';
    res.on('data', c=>d+=c);
    res.on('end', ()=>{
        const matches = d.match(/https:\/\/[^"'\s]+\.jpg/g);
        if (matches) {
            console.log(Array.from(new Set(matches)).join('\n'));
        } else {
            console.log("No images found.");
        }
    });
});
