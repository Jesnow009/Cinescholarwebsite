const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Sayombhu Mukdeeprom": [
        {
            "id": "uncle-boonmee",
            "title": "Uncle Boonmee Who Can Recall His Past Lives (Lung Boonmee raleuk chat)",
            "year": 2010,
            "director": "Apichatpong Weerasethakul",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dreamlike, mystical lighting blending reality and the supernatural.",
            "plot": "A dying man spends his final days surrounded by his loved ones, including the ghosts of his wife and son.",
            "releaseDate": "2010-01-01",
            "writer": "Apichatpong Weerasethakul",
            "cinematographer": "Sayombhu Mukdeeprom",
            "editor": "Lee Chatametikool",
            "composer": "Koichi Shimizu",
            "studio": "Kick the Machine / Illuminations Films"
        },
        {
            "id": "call-me-by-your-name",
            "title": "Call Me by Your Name",
            "year": 2017,
            "director": "Luca Guadagnino",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, sun-drenched, sensual, and nostalgic natural lighting.",
            "plot": "A passionate summer romance blossoms between a teenager and his father's charming intern in 1980s Italy.",
            "releaseDate": "2017-01-01",
            "writer": "James Ivory",
            "cinematographer": "Sayombhu Mukdeeprom",
            "editor": "Walter Fasano",
            "composer": "Sufjan Stevens",
            "studio": "Frenesy Film Company / La Cinéfacture / RT Features"
        },
        {
            "id": "challengers",
            "title": "Challengers",
            "year": 2024,
            "director": "Luca Guadagnino",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, highly stylized, intense and sweaty close-ups.",
            "plot": "A tennis champion on a losing streak faces his former best friend and his wife's ex in a dramatic tournament.",
            "releaseDate": "2024-01-01",
            "writer": "Justin Kuritzkes",
            "cinematographer": "Sayombhu Mukdeeprom",
            "editor": "Marco Costa",
            "composer": "Trent Reznor / Atticus Ross",
            "studio": "Metro-Goldwyn-Mayer (MGM) / Pascal Pictures"
        }
    ],
    "Albert Banzon": [
        {
            "id": "ordinary-people",
            "title": "Ordinary People (Pamilya Ordinaryo)",
            "year": 2016,
            "director": "Eduardo W. Roy Jr.",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, chaotic, handheld documentary-style urban realism.",
            "plot": "Two teenage street dwellers navigate the harsh realities of Manila while searching for their kidnapped baby.",
            "releaseDate": "2016-01-01",
            "writer": "Eduardo W. Roy Jr.",
            "cinematographer": "Albert Banzon",
            "editor": "Carlo Francisco Manatad",
            "composer": "Richard Gonzales",
            "studio": "Found Films / Cinemalaya Foundation"
        },
        {
            "id": "nervous-translation",
            "title": "Nervous Translation",
            "year": 2017,
            "director": "Shireen Seno",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Child's-eye perspective, highly composed and nostalgic analog tones.",
            "plot": "A shy young girl processes her anxieties and the world around her through a miniature toy kitchen.",
            "releaseDate": "2017-01-01",
            "writer": "Shireen Seno",
            "cinematographer": "Albert Banzon / Jippy Pascua",
            "editor": "John Torres / Shireen Seno",
            "composer": "Itos Ledesma",
            "studio": "Los Otros Filmes"
        },
        {
            "id": "violator",
            "title": "Violator",
            "year": 2014,
            "director": "Dodo Dayao",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Bleak, claustrophobic, and atmospheric lighting inducing dread.",
            "plot": "As a typhoon ravages Manila, a group of men trapped in a police station face a sinister presence.",
            "releaseDate": "2014-01-01",
            "writer": "Dodo Dayao",
            "cinematographer": "Albert Banzon",
            "editor": "Lawrence Ang",
            "composer": "Francis De Veyra",
            "studio": "Cinema One Originals / Engineering Concept / Delirium Filmes"
        }
    ],
    "Christopher Doyle": [
        {
            "id": "chungking-express",
            "title": "Chungking Express (Chung Hing sam lam)",
            "year": 1994,
            "director": "Wong Kar-wai",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Frenetic step-printing, vivid neon colors, and evocative urban blur.",
            "plot": "Two melancholy Hong Kong policemen fall in love in parallel stories exploring urban isolation and longing.",
            "releaseDate": "1994-01-01",
            "writer": "Wong Kar-wai",
            "cinematographer": "Christopher Doyle / Lau Wai-keung",
            "editor": "William Chang / Kwong Chi-leung",
            "composer": "Frankie Chan / Roel A. García",
            "studio": "Jet Tone Production"
        },
        {
            "id": "in-the-mood-for-love",
            "title": "In the Mood for Love (Fa yeung nin wa)",
            "year": 2000,
            "director": "Wong Kar-wai",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Richly saturated reds, claustrophobic framing, and poetic slow motion.",
            "plot": "Two neighbors form a deep bond after suspecting their respective spouses of having an affair.",
            "releaseDate": "2000-01-01",
            "writer": "Wong Kar-wai",
            "cinematographer": "Christopher Doyle / Mark Lee Ping-bing / Pung Leung-kwan",
            "editor": "William Chang",
            "composer": "Michael Galasso / Shigeru Umebayashi",
            "studio": "Jet Tone Production / Block 2 Pictures"
        },
        {
            "id": "hero",
            "title": "Hero (Ying xiong)",
            "year": 2002,
            "director": "Zhang Yimou",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Monochromatic, color-coded majestic landscapes and highly stylized wuxia combat.",
            "plot": "A nameless warrior claims to have defeated three legendary assassins targeting the King of Qin.",
            "releaseDate": "2002-01-01",
            "writer": "Li Feng / Zhang Yimou / Wang Bin",
            "cinematographer": "Christopher Doyle",
            "editor": "Zhai Ru",
            "composer": "Tan Dun",
            "studio": "Elite Group Enterprises / Beijing New Picture Film / Sil-Metropole Organisation"
        }
    ],
    "Chankit Chamnivikaipong": [
        {
            "id": "6ixtynin9",
            "title": "6ixtynin9 (Ruang talok 69)",
            "year": 1999,
            "director": "Pen-Ek Ratanaruang",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Quirky, saturated pop-art aesthetics mixed with dark comedic undertones.",
            "plot": "A woman discovers a mysterious box of cash outside her apartment, leading to a deadly and comedic chain of events.",
            "releaseDate": "1999-01-01",
            "writer": "Pen-Ek Ratanaruang",
            "cinematographer": "Chankit Chamnivikaipong",
            "editor": "Patamanadda Yukol",
            "composer": "Amornbhong Methakunavudh",
            "studio": "Five Star Production"
        },
        {
            "id": "monrak-transistor",
            "title": "Monrak Transistor (Transistor Love Story)",
            "year": 2001,
            "director": "Pen-Ek Ratanaruang",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant, highly stylized homage to classic Thai musical melodrama.",
            "plot": "A country boy with a talent for singing leaves his wife to pursue his dreams, only to face numerous tragicomic misfortunes.",
            "releaseDate": "2001-01-01",
            "writer": "Pen-Ek Ratanaruang",
            "cinematographer": "Chankit Chamnivikaipong",
            "editor": "Patamanadda Yukol",
            "composer": "Chartchai Pongprapapan",
            "studio": "Five Star Production"
        },
        {
            "id": "headshot",
            "title": "Headshot (Fon tok huen fah)",
            "year": 2011,
            "director": "Pen-Ek Ratanaruang",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Slick, moody neo-noir visuals with creative inverted-perspective framing.",
            "plot": "An honest cop turned hitman suffers a traumatic head injury that causes him to see everything upside down.",
            "releaseDate": "2011-01-01",
            "writer": "Pen-Ek Ratanaruang",
            "cinematographer": "Chankit Chamnivikaipong",
            "editor": "Patamanadda Yukol",
            "composer": "Vichaya Vatanasapt",
            "studio": "Local Color Films"
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
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-').replace(/\./g, ''));
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            for (let m of dp.mustWatch) {
                let queryTitle = m.title.split('(')[0].trim();
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
        console.log("Successfully updated Southeast Asian Cinematographers");
    }
}

run();
