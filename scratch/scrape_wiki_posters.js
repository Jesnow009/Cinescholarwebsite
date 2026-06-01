const fs = require('fs');
const https = require('https');
const path = require('path');

const targets = [
    { title: "Swayamvaram", url: "https://en.wikipedia.org/wiki/Swayamvaram_(1972_film)", dest: "swayamvaram.jpg" },
    { title: "Elippathayam", url: "https://en.wikipedia.org/wiki/Elippathayam", dest: "elippathayam.jpg" },
    { title: "Agraharathil Kazhuthai", url: "https://en.wikipedia.org/wiki/Agraharathil_Kazhuthai", dest: "agraharathil_kazhuthai.jpg" },
    { title: "Cheriyachante Kroorakrityangal", url: "https://en.wikipedia.org/wiki/Cheriyachante_Kroorakrithyangal", dest: "cheriyachante_kroorakrityangal.jpg" },
    { title: "Veendum Chila Veetukaryangal", url: "https://en.wikipedia.org/wiki/Veendum_Chila_Veettukaryangal", dest: "veendum_chila_veetukaryangal.jpg" },
    { title: "Nokketha Doorathu Kannum Nattu", url: "https://en.wikipedia.org/wiki/Nokkethadhoorathu_Kannum_Nattu", dest: "nokketha_doorathu_kannum_nattu.jpg" },
    { title: "Kazcha", url: "https://en.wikipedia.org/wiki/Kazhcha", dest: "kazcha.jpg" },
    { title: "Thanmatra", url: "https://en.wikipedia.org/wiki/Thanmathra", dest: "thanmatra.jpg" },
    { title: "Aadujeevitham", url: "https://en.wikipedia.org/wiki/The_Goat_Life", dest: "aadujeevitham.jpg" },
    { title: "Amen", url: "https://en.wikipedia.org/wiki/Amen_(2013_film)", dest: "amen.jpg" },
    { title: "Kammatipaadam", url: "https://en.wikipedia.org/wiki/Kammatipaadam", dest: "kammatipaadam.jpg" }
];

function fetchHtml(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let loc = res.headers.location;
                if (!loc.startsWith('http')) loc = 'https://en.wikipedia.org' + loc;
                return fetchHtml(loc).then(resolve);
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        }).on('error', e => resolve(null));
        req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);
            });
        }).on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
        req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function run() {
    let success = 0;
    for (let m of targets) {
        console.log(`Fetching HTML for ${m.title}...`);
        const html = await fetchHtml(m.url);
        if (html) {
            const match = html.match(/<meta property="og:image" content="([^"]+)"/);
            if (match && match[1]) {
                const imgUrl = match[1];
                console.log(`Found og:image for ${m.title}: ${imgUrl}`);
                const targetPath = path.join(__dirname, '..', 'assets', 'images', m.dest);
                try {
                    await download(imgUrl, targetPath);
                    console.log(`Downloaded ${m.dest}`);
                    success++;
                } catch (e) {
                    console.error(`Failed to download ${m.title}`, e.message);
                }
            } else {
                console.log(`No og:image found for ${m.title}`);
            }
        } else {
            console.log(`Failed to fetch HTML for ${m.title}`);
        }
    }
    console.log(`Successfully downloaded ${success} posters via Wikipedia og:image extraction.`);
}

run();
