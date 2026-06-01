const https = require('https');

const cinematographers = [
    { name: 'Roger Deakins', id: 'roger-deakins' },
    { name: 'Gregg Toland', id: 'gregg-toland' },
    { name: 'Gordon Willis', id: 'gordon-willis' },
    { name: 'Emmanuel Lubezki', id: 'emmanuel-lubezki' },
    { name: 'Robert Richardson (cinematographer)', id: 'robert-richardson' },
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

function getWikiImage(title) {
    return new Promise((resolve) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(d);
                    const pages = json.query.pages;
                    const page = Object.values(pages)[0];
                    if (page && page.original && page.original.source) {
                        resolve(page.original.source);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    for (const c of cinematographers) {
        const img = await getWikiImage(c.name);
        console.log(`${c.id}::${img || 'NOT_FOUND'}`);
    }
}

run();
