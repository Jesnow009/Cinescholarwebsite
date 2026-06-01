const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = {
    'K.G.F: Chapter 1': {
        url: 'https://upload.wikimedia.org/wikipedia/en/c/c0/K.G.F_Chapter_1_poster.jpg',
        filename: 'assets/images/kgf1.jpg'
    },
    'K.G.F: Chapter 2': {
        url: 'https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg',
        filename: 'assets/images/kgf2.jpg'
    },
    'Vendhu Thanindhathu Kaadu: Part I - The Kindling': {
        url: 'https://upload.wikimedia.org/wikipedia/en/9/91/Vendhu_Thanindhathu_Kaadu_poster.jpg',
        filename: 'assets/images/vtk.jpg'
    }
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

async function run() {
    let modified = false;
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');

    for (const title in downloads) {
        try {
            await download(downloads[title].url, downloads[title].filename);
            console.log('Downloaded', title);
            
            // update data
            for (let dp of data.cinematographer.cinematographers) {
                for (let m of dp.mustWatch) {
                    if (m.title === title) {
                        m.poster = downloads[title].filename;
                        modified = true;
                        console.log('Updated', title, 'to local path');
                    }
                }
            }
        } catch (e) {
            console.error('Failed to download', title, e);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully fixed broken Kannada posters with local files.");
    }
}

run();
