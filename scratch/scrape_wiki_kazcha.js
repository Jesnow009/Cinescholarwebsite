const https = require('https');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/Kaazhcha';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/<img[^>]+src="([^"]+\.jpg)"/i);
        if (match) {
            const imgUrl = match[1].startsWith('//') ? 'https:' + match[1] : match[1];
            console.log("Found Kazhcha Image: " + imgUrl);
            
            // Download the image
            const file = fs.createWriteStream("assets/images/kazcha.jpg");
            https.get(imgUrl.replace('220px', '500px'), (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log("Downloaded kazcha.jpg");
                });
            }).on('error', (e) => {
                // If 500px fails, download the original match
                const file2 = fs.createWriteStream("assets/images/kazcha.jpg");
                https.get(imgUrl, (resp) => {
                    resp.pipe(file2);
                    console.log("Downloaded smaller kazcha.jpg");
                });
            });
            
        } else {
            console.log("No .jpg image found on Kaazhcha wiki page");
        }
    });
}).on('error', console.error);
