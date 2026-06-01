const https = require('https');

function getWikiImg(page) {
    https.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let d=''; 
        res.on('data', c => d+=c); 
        res.on('end', () => { 
            try { 
                console.log(page, JSON.parse(d).originalimage.source);
            } catch(e) { 
                console.log(page, 'NO IMAGE');
            } 
        }); 
    }); 
}

getWikiImg('Freddie_Young'); 
getWikiImg('Roger_Pratt_(cinematographer)');
