const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Babar Bilal": [
        {
            "id": "ashiana",
            "title": "Ashiana",
            "year": 1964,
            "director": "S. M. Yusuf",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Classic black-and-white high-contrast visual storytelling.",
            "plot": "A classic story emphasizing family values and traditional romance.",
            "releaseDate": "1964-01-01",
            "writer": "Hasrat Lakhnavi",
            "cinematographer": "Babar Bilal",
            "editor": "Ali",
            "composer": "A. Hameed",
            "studio": "F&Y Movies"
        },
        {
            "id": "watan-kay-rakhwalay",
            "title": "Watan Kay Rakhwalay",
            "year": 1991,
            "director": "Hasnat Ahmed",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Action-oriented, dynamic framing typical of 90s cinema.",
            "plot": "An action-packed patriotic film focusing on defending the nation.",
            "releaseDate": "1991-01-01",
            "writer": "Bashir Niaz",
            "cinematographer": "Babar Bilal",
            "editor": "Mohammad Ashiq",
            "composer": "Zulfiqar Ali",
            "studio": "Seven Stars Productions"
        },
        {
            "id": "qasam",
            "title": "Qasam",
            "year": 1993,
            "director": "Syed Noor",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant, melodramatic lighting emphasizing emotional intensity.",
            "plot": "A story of vows and revenge set against a dramatic backdrop.",
            "releaseDate": "1993-01-01",
            "writer": "Syed Noor",
            "cinematographer": "Babar Bilal",
            "editor": "S. Ali Ahmad",
            "composer": "M. Arshad",
            "studio": "S.N. Productions"
        }
    ],
    "Anwar Hossain": [
        {
            "id": "the-surja-dighal-bari",
            "title": "The Surja Dighal Bari (Ominous House)",
            "year": 1979,
            "director": "Sheikh Niaz Mohammad Shakil, Masihuddin Shaker",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, unvarnished realism reflecting severe rural poverty.",
            "plot": "A poor woman struggles to survive with her children in a cursed house during the 1943 Bengal famine.",
            "releaseDate": "1979-12-28",
            "writer": "Masihuddin Shaker, Sheikh Niaz Mohammad Shakil",
            "cinematographer": "Anwar Hossain",
            "editor": "Bashir Hossain",
            "composer": "Alauddin Ali",
            "studio": "Bangladesh Film Development Corporation (BFDC)"
        },
        {
            "id": "chitra-nodir-pare",
            "title": "Chitra Nodir Pare (Quiet Flows the River Chitra)",
            "year": 1999,
            "director": "Tanvir Mokammel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lyrical, melancholic wide shots capturing the Bengal riverine landscape.",
            "plot": "A Hindu family in East Pakistan faces the painful choice of migrating to India amidst religious tensions.",
            "releaseDate": "1999-01-01",
            "writer": "Tanvir Mokammel",
            "cinematographer": "Anwar Hossain",
            "editor": "Mahadeb Shi",
            "composer": "Syed Shabab Ali Arzoo",
            "studio": "Kino-Eye Films"
        },
        {
            "id": "lalsalu",
            "title": "Lalsalu (A Tree Without Roots)",
            "year": 2001,
            "director": "Tanvir Mokammel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Earthy, textured tones highlighting religious fanaticism and rural life.",
            "plot": "A charismatic but fraudulent religious leader exploits the superstitions of a remote village.",
            "releaseDate": "2001-01-01",
            "writer": "Tanvir Mokammel",
            "cinematographer": "Anwar Hossain",
            "editor": "Mahadeb Shi",
            "composer": "Syed Shabab Ali Arzoo",
            "studio": "Kino-Eye Films"
        }
    ],
    "K M Sujon": [
        {
            "id": "tui-r-ami-chol-kori-paglami",
            "title": "Tui R Ami Chol Kori Paglami",
            "year": 2022,
            "director": "Anonno Mamun",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Bright, colorful, and youthful commercial cinematography.",
            "plot": "A vibrant romantic comedy following the crazy adventures of a young couple.",
            "releaseDate": "2022-01-01",
            "writer": "Anonno Mamun",
            "cinematographer": "K M Sujon",
            "editor": "K M Sujon Rahman",
            "composer": "Naved Parvez",
            "studio": "Live Technologies"
        },
        {
            "id": "tomar-namer-roddure",
            "title": "Tomar Namer Roddure",
            "year": 2022,
            "director": "Mizanur Rahman Aryan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, emotional, deeply romantic framing and lighting.",
            "plot": "A heartwarming love story navigating modern relationships and emotions.",
            "releaseDate": "2022-01-01",
            "writer": "Mizanur Rahman Aryan",
            "cinematographer": "K M Sujon",
            "editor": "K M Sujon Rahman",
            "composer": "Sajid Sarker",
            "studio": "CMV Productions"
        },
        {
            "id": "psi",
            "title": "Psi",
            "year": 2024,
            "director": "Alok Hasan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Tense, moody, low-light psychological thriller visuals.",
            "plot": "A dark psychological thriller exploring the depths of the human mind.",
            "releaseDate": "2024-01-01",
            "writer": "Alok Hasan",
            "cinematographer": "K M Sujon",
            "editor": "Md. Nadim",
            "composer": "Ahmed Souren",
            "studio": "Alpha-i"
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
        }).on('error', e => {
            r(null);
        });
        req.setTimeout(5000, () => {
            req.abort();
            r(null);
        });
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
        req.setTimeout(5000, () => {
            req.abort();
            reject(new Error('timeout'));
        });
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
            
            // fetch posters
            for (let m of dp.mustWatch) {
                let queryTitle = m.title.replace(/\(.*\)/, '').trim();
                let query = encodeURIComponent(queryTitle);
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                let retry = 3;
                let posterUrl = null;
                
                while(retry > 0 && !posterUrl) {
                    await wait(2000); // 2 second delay to avoid rate limit / connection reset
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
                    console.log(`Found TMDB URL for ${m.title}: ${posterUrl}`);
                    const filename = `assets/images/${queryTitle.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`;
                    try {
                        await download(posterUrl, filename);
                        console.log(`Downloaded ${m.title}`);
                        m.poster = filename;
                    } catch (e) {
                        console.error(`Failed to download ${m.title}`, e);
                        // Fallback to placeholder on download fail
                        m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(m.title)}`;
                    }
                } else {
                    console.log(`Could not find poster for ${m.title} on TMDB`);
                    m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(m.title)}`;
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
        console.log("Successfully updated South Asian Cinematographers");
    }
}

run();
