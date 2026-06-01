const fs = require('fs');
const https = require('https');
const path = require('path');

function fetchJson(url) {
    return new Promise(r => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { r(JSON.parse(data)); } catch(e) { r(null); }
            });
        }).on('error', () => r(null));
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);
            });
        }).on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

const titlesToFetch = {
    'Watan Kay Rakhwalay': 'Watan_Kay_Rakhwalay',
    'The Surja Dighal Bari (Ominous House)': 'Surja_Dighal_Bari',
    'Chitra Nodir Pare (Quiet Flows the River Chitra)': 'Chitra_Nodir_Pare'
};

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    
    // 1. Remove K M Sujon
    const initialLen = data.cinematographer.cinematographers.length;
    data.cinematographer.cinematographers = data.cinematographer.cinematographers.filter(c => c.name !== 'K M Sujon');
    
    if (data.cinematographer.cinematographers.length < initialLen) {
        console.log("Removed K M Sujon's profile.");
    }

    let modified = true; // since we removed someone

    // 2. Fetch the 3 missing Wikipedia posters
    const downloadedMap = {};

    for (const [movieTitle, wikiTitle] of Object.entries(titlesToFetch)) {
        await wait(1500); // polite delay
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=500`;
        console.log(`Querying Wikipedia for ${wikiTitle}...`);
        
        const wikiData = await fetchJson(url);
        if (wikiData && wikiData.query && wikiData.query.pages) {
            const pages = wikiData.query.pages;
            for (let pageId in pages) {
                const page = pages[pageId];
                if (page.thumbnail && page.thumbnail.source) {
                    const ext = path.extname(page.thumbnail.source.split('?')[0]) || '.jpg';
                    const filename = `assets/images/${movieTitle.split('(')[0].trim().toLowerCase().replace(/ /g, '_')}${ext}`;
                    try {
                        await download(page.thumbnail.source, filename);
                        console.log(`Downloaded ${movieTitle} poster.`);
                        downloadedMap[movieTitle] = filename;
                    } catch (e) {
                        console.error(`Failed to download ${movieTitle}`);
                    }
                }
            }
        }
    }

    // 3. Update the URLs for those missing posters
    for (let dp of data.cinematographer.cinematographers) {
        if (dp.name === 'Babar Bilal' || dp.name === 'Anwar Hossain') {
            for (let m of dp.mustWatch) {
                if (downloadedMap[m.title]) {
                    m.poster = downloadedMap[m.title];
                    console.log(`Updated data.js with poster for ${m.title}`);
                } else if (m.poster.includes('placehold.co')) {
                    // if Wikipedia failed, let's at least try to guess an IMDB fallback or something
                    // but we will keep placeholder if we absolutely fail.
                    console.log(`Still missing poster for ${m.title}`);
                }
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed South Asian section.");
    }
}

run();
