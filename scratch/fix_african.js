const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Tunde Kelani": [
        {
            "id": "anikura",
            "title": "Anikura",
            "year": 1982,
            "director": "Oyin Adejobi",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Early analog Yoruba theatre adaptations capturing energetic live performances.",
            "plot": "A theatrical drama exploring the consequences of greed and societal corruption.",
            "releaseDate": "1982-01-01",
            "writer": "Oyin Adejobi",
            "cinematographer": "Tunde Kelani",
            "editor": "Tunde Kelani",
            "composer": "Oyin Adejobi Theatre Group",
            "studio": "Oyin Adejobi Films"
        },
        {
            "id": "iya-ni-wura",
            "title": "Iya Ni Wura",
            "year": 1985,
            "director": "Adebayo Faleti",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Documentary-style realism highlighting indigenous cultural aesthetics.",
            "plot": "A profound exploration of motherhood and the sacrifices made by women in traditional societies.",
            "releaseDate": "1985-01-01",
            "writer": "Adebayo Faleti",
            "cinematographer": "Tunde Kelani",
            "editor": "Tunde Kelani",
            "composer": "Alabi Ogundepo",
            "studio": "Latola Films"
        },
        {
            "id": "mosebolatan",
            "title": "Mosebolatan",
            "year": 1986,
            "director": "Moses Olaiya (Baba Sala)",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant, high-contrast lighting emphasizing physical comedy and slapstick.",
            "plot": "The hilarious misadventures of Baba Sala in his quest for sudden wealth.",
            "releaseDate": "1986-01-01",
            "writer": "Moses Olaiya",
            "cinematographer": "Tunde Kelani",
            "editor": "David Owoyemi",
            "composer": "Baba Sala & His International Dance Band",
            "studio": "Alawada Movies International"
        }
    ],
    "Yinka Edward": [
        {
            "id": "the-figurine",
            "title": "The Figurine (Araromire)",
            "year": 2009,
            "director": "Kunle Afolayan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty realism transitioning into supernatural, shadow-heavy psychological thriller lighting.",
            "plot": "Two friends discover a mystical sculpture that grants seven years of good luck followed by seven years of disaster.",
            "releaseDate": "2009-01-01",
            "writer": "Kemi Adesoye",
            "cinematographer": "Yinka Edward",
            "editor": "Yemi Jolaoso",
            "composer": "Ejiro Osiobe",
            "studio": "Golden Effects Pictures"
        },
        {
            "id": "phone-swap",
            "title": "Phone Swap",
            "year": 2012,
            "director": "Kunle Afolayan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Bright, colorful, and polished lighting contrasting urban and rural Nigerian life.",
            "plot": "A fashion designer and an arrogant executive accidentally swap phones at an airport, forcing them into each other's worlds.",
            "releaseDate": "2012-01-01",
            "writer": "Kemi Adesoye",
            "cinematographer": "Yinka Edward",
            "editor": "Yemi Jolaoso",
            "composer": "Tolu Obanro",
            "studio": "Golden Effects Pictures"
        },
        {
            "id": "76",
            "title": "’76",
            "year": 2016,
            "director": "Izu Ojukwu",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Muted, desaturated 16mm-style aesthetic capturing the mood of a 1970s military dictatorship.",
            "plot": "A young soldier gets entangled in the 1976 military coup in Nigeria, affecting his pregnant wife.",
            "releaseDate": "2016-01-01",
            "writer": "Emmanuel Ojeisekhoba",
            "cinematographer": "Yinka Edward",
            "editor": "Emeka Ojukwu",
            "composer": "Hyacinth Ogbu, Joel Krozer",
            "studio": "Adonis Production / Princewill's Trust"
        }
    ],
    "Mostafa El Kashef": [
        {
            "id": "19b",
            "title": "19B",
            "year": 2022,
            "director": "Ahmad Abdalla",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Claustrophobic, dimly lit, naturalistic framing emphasizing isolation in an old Cairo villa.",
            "plot": "An aging guard living in an abandoned villa faces his fears when an aggressive young man invades his space.",
            "releaseDate": "2022-01-01",
            "writer": "Ahmad Abdalla",
            "cinematographer": "Mostafa El Kashef",
            "editor": "Sara Abdallah",
            "composer": "Yarob Maroof",
            "studio": "Film Clinic"
        },
        {
            "id": "the-village-next-to-paradise",
            "title": "The Village Next to Paradise",
            "year": 2024,
            "director": "Mo Harawe",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweeping, harsh, and beautiful natural lighting capturing the Somali desert.",
            "plot": "A newly assembled family must navigate their complex relationships in a windswept Somali village.",
            "releaseDate": "2024-01-01",
            "writer": "Mo Harawe",
            "cinematographer": "Mostafa El Kashef",
            "editor": "Joana Scrinzi",
            "composer": "Peter Scherer",
            "studio": "FreibeuterFilm / Kazak Productions / Niko Film"
        },
        {
            "id": "ben-imana",
            "title": "Ben'Imana",
            "year": 2026,
            "director": "Marie Clémentine Dusabejambo",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intimate, emotionally resonant framing honoring deep psychological scars.",
            "plot": "Explores the aftermath of genocide and the painful journey towards reconciliation.",
            "releaseDate": "2026-01-01",
            "writer": "Marie Clémentine Dusabejambo, Deliphine Agut",
            "cinematographer": "Mostafa El Kashef",
            "editor": "Dounia Sichov",
            "composer": "Christiaan Verbeek",
            "studio": "Cannes Un Certain Regard"
        }
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
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-').replace(/\./g, '').replace(/é/g, 'e').replace(/á/g, 'a').replace(/'/g, ''));
        
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
                    await wait(2000); // 2 second delay to avoid rate limit
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
                        m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(queryTitle)}`;
                    }
                } else {
                    console.log(`Could not find poster for ${m.title} on TMDB`);
                    m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(queryTitle)}`;
                }
            }
            modified = true;
        } else {
            console.log(`Could not find DP: ${name}`);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated African Cinematographers");
    }
}

run();
