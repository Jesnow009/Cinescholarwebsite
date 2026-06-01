const fs = require('fs');
const https = require('https');
const path = require('path');

const titlesToFetch = {
    'Sairat': 'Sairat',
    'Naal': 'Naal_(film)',
    'Jhund': 'Jhund_(film)',
    'Phoonk': 'Phoonk',
    'Hawaizaada': 'Hawaizaada',
    'Ventilator': 'Ventilator_(2016_film)',
    'Fandry': 'Fandry',
    'Ribbon': 'Ribbon_(film)'
};

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const request = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
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

function fetchJson(url) {
    return new Promise(r => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => r(JSON.parse(data)));
        }).on('error', e => {
            r(null);
        });
    });
}

async function run() {
    const titlesQuery = Object.values(titlesToFetch).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesQuery)}&prop=pageimages&format=json&pithumbsize=500`;
    
    const wikiData = await fetchJson(url);
    if (!wikiData || !wikiData.query || !wikiData.query.pages) {
        console.error("Failed to fetch from Wikipedia");
        return;
    }

    const pages = wikiData.query.pages;
    const downloadedMap = {}; // mapping from our Title -> Local Path

    for (let pageId in pages) {
        const page = pages[pageId];
        if (page.thumbnail && page.thumbnail.source) {
            const wikiTitle = page.title;
            // find which movie this corresponds to
            let movieTitle = null;
            for (let [k, v] of Object.entries(titlesToFetch)) {
                // Wikipedia normalizes titles (e.g. underscores to spaces)
                if (v.replace(/_/g, ' ') === wikiTitle) {
                    movieTitle = k;
                    break;
                }
            }

            if (movieTitle) {
                const ext = path.extname(page.thumbnail.source.split('?')[0]) || '.jpg';
                const filename = `assets/images/${movieTitle.toLowerCase().replace(/ /g, '_')}${ext}`;
                try {
                    await download(page.thumbnail.source, filename);
                    console.log(`Downloaded ${movieTitle}`);
                    downloadedMap[movieTitle] = filename;
                } catch (e) {
                    console.error(`Failed to download ${movieTitle}`);
                }
            }
        }
    }

    // Now update data.js
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let dp of data.cinematographer.cinematographers) {
        for (let m of dp.mustWatch) {
            if (downloadedMap[m.title]) {
                m.poster = downloadedMap[m.title];
                modified = true;
                console.log(`Updated ${m.title} in data.js`);
            }
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed Marathi posters.");
    }
}

run();
