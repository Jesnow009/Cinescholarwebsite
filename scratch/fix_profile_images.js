const fs = require('fs');
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

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            resolve(res.statusCode);
        }).on('error', () => resolve(500));
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const dataPath = 'js/data.js';
    let raw = fs.readFileSync(dataPath, 'utf8');
    
    let dataObj;
    try {
        let jsonStr = raw.replace(/^const\s+FILMS_DATA\s*=\s*/, '').replace(/;?\s*$/, '');
        dataObj = eval('(' + jsonStr + ')');
    } catch(e) {
        console.error("Parse error", e);
        process.exit(1);
    }
    
    const allCinematographers = dataObj.cinematographer.cinematographers;
    let toUpdate = [];
    
    for (const c of allCinematographers) {
        if (c.image && c.image.includes('image.tmdb.org')) {
            const status = await checkUrl(c.image);
            if (status !== 200) {
                console.log(`[BROKEN] ${c.name} - ${c.image}`);
                toUpdate.push({ name: c.name, oldImage: c.image });
            }
        }
    }
    
    console.log(`Found ${toUpdate.length} broken profile images to fix...`);
    
    let contentToSave = raw;
    let updatedCount = 0;
    
    for (const c of toUpdate) {
        const query = encodeURIComponent(c.name);
        const searchHtml = await fetchHTML(`https://www.themoviedb.org/search/person?query=${query}`);
        
        const linkMatch = searchHtml.match(/\/person\/(\d+-[a-zA-Z0-9-]+)/);
        if (linkMatch) {
            const personUrl = `https://www.themoviedb.org/person/${linkMatch[1]}`;
            const personHtml = await fetchHTML(personUrl);
            
            const imgMatch = personHtml.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+\.jpg)/);
            if (imgMatch) {
                const newImage = `https://image.tmdb.org/t/p/w500/${imgMatch[1]}`;
                console.log(`[UPDATED] ${c.name}: ${newImage}`);
                contentToSave = contentToSave.split(c.oldImage).join(newImage);
                updatedCount++;
            } else {
                console.log(`[NOT FOUND] No image on TMDB for ${c.name}`);
            }
        } else {
            console.log(`[NOT FOUND] Person not found on TMDB for ${c.name}`);
        }
        await delay(500);
    }
    
    if (updatedCount > 0) {
        fs.writeFileSync(dataPath, contentToSave, 'utf8');
        console.log(`\nSuccessfully updated ${updatedCount} profile images in data.js!`);
    } else {
        console.log("Nothing was updated.");
    }
}

run();
