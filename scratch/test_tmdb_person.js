const https = require('https');

function fetchHTML(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });
}

async function run() {
    for (const name of ["Freddie Young", "Roger Pratt"]) {
        const query = encodeURIComponent(name);
        const searchHtml = await fetchHTML(`https://www.themoviedb.org/search/person?query=${query}`);
        
        const linkMatch = searchHtml.match(/\/person\/(\d+-[a-zA-Z0-9-]+)/);
        if (linkMatch) {
            const personUrl = `https://www.themoviedb.org/person/${linkMatch[1]}`;
            const personHtml = await fetchHTML(personUrl);
            const imgMatch = personHtml.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
            if (imgMatch) {
                console.log(`${name}: https://image.tmdb.org/t/p/w500/${imgMatch[1]}`);
            } else {
                console.log(`${name}: No Image`);
            }
        } else {
            console.log(`${name}: Not Found`);
        }
    }
}
run();
