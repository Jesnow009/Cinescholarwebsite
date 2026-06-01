const https = require('https');

const cinematographers = [
    { name: 'Roger Deakins', id: 'roger-deakins' },
    { name: 'Gregg Toland', id: 'gregg-toland' },
    { name: 'Gordon Willis', id: 'gordon-willis' },
    { name: 'Emmanuel Lubezki', id: 'emmanuel-lubezki' },
    { name: 'Robert Richardson', id: 'robert-richardson' },
    { name: 'Conrad Hall', id: 'conrad-hall' },
    { name: 'James Wong Howe', id: 'james-wong-howe' },
    { name: 'Robert Elswit', id: 'robert-elswit' },
    { name: 'Janusz Kamiński', id: 'janusz-kaminski' },
    { name: 'Wally Pfister', id: 'wally-pfister' },
    { name: 'Matthew Libatique', id: 'matthew-libatique' },
    { name: 'Bill Pope', id: 'bill-pope' },
    { name: 'Caleb Deschanel', id: 'caleb-deschanel' },
    { name: 'Dean Cundey', id: 'dean-cundey' },
    { name: 'Bradford Young', id: 'bradford-young' },
    { name: 'Jordan Cronenweth', id: 'jordan-cronenweth' }
];

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
    for (const c of cinematographers) {
        const query = encodeURIComponent(c.name);
        const searchHtml = await fetchHTML(`https://www.themoviedb.org/search/person?query=${query}`);
        
        // Find first person link
        const linkMatch = searchHtml.match(/\/person\/(\d+-[a-zA-Z0-9-]+)/);
        if (linkMatch) {
            const personUrl = `https://www.themoviedb.org/person/${linkMatch[1]}`;
            const personHtml = await fetchHTML(personUrl);
            
            // Find profile image
            const imgMatch = personHtml.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
            if (imgMatch) {
                console.log(`${c.id}::https://image.tmdb.org/t/p/w500/${imgMatch[1]}`);
            } else {
                console.log(`${c.id}::NO_IMAGE`);
            }
        } else {
            console.log(`${c.id}::NO_PERSON`);
        }
    }
}

run();
