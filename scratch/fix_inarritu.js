const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Alejandro G. Inarritu": [
        { "id": "birdman", "title": "Birdman", "year": 2014, "director": "Alejandro G. Iñárritu", "writer": "Alejandro G. Iñárritu / Nicolás Giacobone / Alexander Dinelaris Jr. / Armando Bó", "cinematographer": "Emmanuel Lubezki", "editor": "Douglas Crise / Stephen Mirrione", "composer": "Antonio Sánchez", "studio": "New Regency Pictures / M Prods / Le Grisbi Productions", "poster": "https://placehold.co/500x750/1a1a1a/e2b646?text=Birdman", "focus": "A dazzling technical feat, stitched together to appear as one continuous fluid tracking shot.", "plot": "A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.", "releaseDate": "2014-01-01" },
        { "id": "amores-perros", "title": "Amores Perros", "year": 2000, "director": "Alejandro G. Iñárritu", "writer": "Guillermo Arriaga", "cinematographer": "Rodrigo Prieto", "editor": "Alejandro G. Iñárritu / Luis Carballar / Fernando Pérez Unda", "composer": "Gustavo Santaolalla", "studio": "Altavista Films / Zeta Film", "poster": "https://placehold.co/500x750/1a1a1a/e2b646?text=Amores+Perros", "focus": "Gritty, high-contrast, kinetic handheld camera work linking desperate interwoven narratives.", "plot": "A horrific car accident connects three stories, each involving characters dealing with loss, regret, and life's harsh realities, all in the name of love.", "releaseDate": "2000-01-01" },
        { "id": "the-revenant", "title": "The Revenant", "year": 2015, "director": "Alejandro G. Iñárritu", "writer": "Mark L. Smith / Alejandro G. Iñárritu", "cinematographer": "Emmanuel Lubezki", "editor": "Stephen Mirrione", "composer": "Ryūichi Sakamoto / Alva Noto", "studio": "New Regency Pictures / Anonymous Content / Appian Way Productions", "poster": "https://placehold.co/500x750/1a1a1a/e2b646?text=The+Revenant", "focus": "Shot exclusively with natural light in freezing conditions, incredibly immersive wide-angle lenses.", "plot": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.", "releaseDate": "2015-01-01" },
        { "id": "21-grams", "title": "21 Grams", "year": 2003, "director": "Alejandro G. Iñárritu", "writer": "Guillermo Arriaga", "cinematographer": "Rodrigo Prieto", "editor": "Stephen Mirrione", "composer": "Gustavo Santaolalla", "studio": "This Is That Productions", "poster": "https://placehold.co/500x750/1a1a1a/e2b646?text=21+Grams", "focus": "Extremely fragmented, non-linear editing utilizing stark, bleak, grainy textures.", "plot": "A freak accident brings together a critically ill mathematician, a grieving mother, and a born-again ex-con.", "releaseDate": "2003-01-01" },
        { "id": "babel", "title": "Babel", "year": 2006, "director": "Alejandro G. Iñárritu", "writer": "Guillermo Arriaga", "cinematographer": "Rodrigo Prieto", "editor": "Stephen Mirrione", "composer": "Gustavo Santaolalla", "studio": "Anonymous Content / Zeta Film / Central Films", "poster": "https://placehold.co/500x750/1a1a1a/e2b646?text=Babel", "focus": "Vast global scale, emphasizing cultural isolation through varied cinematic textures.", "plot": "Tragedy strikes a married couple on vacation in the Moroccan desert, touching off an interlocking story involving four different families.", "releaseDate": "2006-01-01" }
    ]
};

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { r(JSON.parse(data)); } catch(e) { r(null); }
            });
        }).on('error', e => r(null));
        req.setTimeout(5000, () => { req.abort(); r(null); });
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);
            });
        }).on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
        req.setTimeout(5000, () => { req.abort(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let name in newData) {
        let dp = data.director.directors.find(p => p.name === name);
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            for (let m of dp.mustWatch) {
                let queryTitle = m.title.split('(')[0].replace(/[’']/g, '').trim();
                let query = encodeURIComponent(queryTitle);
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                let retry = 3;
                let posterUrl = null;
                
                while(retry > 0 && !posterUrl) {
                    await wait(2000); // 2 second delay
                    console.log(`Searching TMDB for ${queryTitle}...`);
                    let mRes = await fetchJson(url);
                    
                    if (mRes && mRes.results && mRes.results.length > 0) {
                        let result = mRes.results.find(r => r.release_date && r.release_date.startsWith(m.year.toString()));
                        if (!result) result = mRes.results[0]; // fallback
                        
                        if (result && result.poster_path) {
                            posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                        }
                    } else if (!mRes) {
                        console.log(`Failed fetch for ${queryTitle}, retrying...`);
                        retry--;
                        continue;
                    }
                    break;
                }

                if (posterUrl) {
                    console.log(`Found TMDB URL for ${m.title}`);
                    const filename = `assets/images/${queryTitle.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`;
                    try {
                        await download(posterUrl, filename);
                        console.log(`Downloaded ${m.title}`);
                        m.poster = filename;
                    } catch (e) {
                        console.error(`Failed to download ${m.title}`);
                    }
                } else {
                    console.log(`Could not find poster for ${m.title} on TMDB`);
                }
            }
            modified = true;
        } else {
            console.log(`Could not find Director: ${name}`);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Alejandro");
    }
}

run();
