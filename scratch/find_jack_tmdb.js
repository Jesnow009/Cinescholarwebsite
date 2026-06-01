const https = require('https');
https.get('https://www.themoviedb.org/search/person?query=Jack+Cardiff', {headers:{'User-Agent':'Mozilla/5.0'}}, r => {
    let d='';
    r.on('data', c=>d+=c);
    r.on('end', () => {
        const links = d.match(/\/person\/(\d+-[a-zA-Z0-9-]+)/g);
        if (links && links.length > 0) {
            https.get('https://www.themoviedb.org' + links[0], {headers:{'User-Agent':'Mozilla/5.0'}}, r2 => {
                let d2 = '';
                r2.on('data', c=>d2+=c);
                r2.on('end', () => {
                    const img = d2.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
                    if (img) console.log("JACK IMAGE:", `https://image.tmdb.org/t/p/w500/${img[1]}`);
                    else console.log("NO IMAGE");
                });
            });
        }
    });
});
