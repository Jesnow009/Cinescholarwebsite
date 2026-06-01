const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "José Luis Alcaine": [
        {
            "id": "volver",
            "title": "Volver",
            "year": 2006,
            "director": "Pedro Almodóvar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant, intensely saturated colors (especially reds) highlighting passionate emotion.",
            "plot": "After her death, a mother returns to her hometown in order to fix the situations she couldn't resolve during her life.",
            "releaseDate": "2006-01-01",
            "writer": "Pedro Almodóvar",
            "cinematographer": "José Luis Alcaine",
            "editor": "José Salcedo",
            "composer": "Alberto Iglesias",
            "studio": "El Deseo"
        },
        {
            "id": "the-skin-i-live-in",
            "title": "The Skin I Live In (La piel que habito)",
            "year": 2011,
            "director": "Pedro Almodóvar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sleek, clinical, and glossy lighting framing psychological body horror.",
            "plot": "A brilliant plastic surgeon creates a synthetic skin that withstands any kind of damage, testing it on a mysterious patient.",
            "releaseDate": "2011-01-01",
            "writer": "Pedro Almodóvar",
            "cinematographer": "José Luis Alcaine",
            "editor": "José Salcedo",
            "composer": "Alberto Iglesias",
            "studio": "El Deseo"
        },
        {
            "id": "women-on-the-verge",
            "title": "Women on the Verge of a Nervous Breakdown (Mujeres al borde de un ataque de nervios)",
            "year": 1988,
            "director": "Pedro Almodóvar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Pop-art aesthetic with bright, bold primary colors conveying manic energy.",
            "plot": "A television actress encounters a variety of eccentric characters after embarking on a journey to discover why her lover abruptly left her.",
            "releaseDate": "1988-01-01",
            "writer": "Pedro Almodóvar",
            "cinematographer": "José Luis Alcaine",
            "editor": "José Salcedo",
            "composer": "Bernardo Bonezzi",
            "studio": "El Deseo / Laurenfilm"
        }
    ],
    "Eduardo Serra": [
        {
            "id": "girl-with-a-pearl-earring",
            "title": "Girl with a Pearl Earring",
            "year": 2003,
            "director": "Peter Webber",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Painterly, naturalistic lighting meticulously mimicking Johannes Vermeer's artwork.",
            "plot": "A young peasant maid working in the house of painter Johannes Vermeer becomes his talented assistant and the model for one of his most famous works.",
            "releaseDate": "2003-01-01",
            "writer": "Olivia Hetreed",
            "cinematographer": "Eduardo Serra",
            "editor": "Niven Howie",
            "composer": "Alexandre Desplat",
            "studio": "Archer Street Productions / Intermedia Films"
        },
        {
            "id": "deathly-hallows-1",
            "title": "Harry Potter and the Deathly Hallows: Part 1",
            "year": 2010,
            "director": "David Yates",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dark, moody, desaturated tones reflecting isolation and impending war.",
            "plot": "As Harry, Ron, and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world.",
            "releaseDate": "2010-01-01",
            "writer": "Steve Kloves",
            "cinematographer": "Eduardo Serra",
            "editor": "Mark Day",
            "composer": "Alexandre Desplat",
            "studio": "Warner Bros. Pictures / Heyday Films"
        },
        {
            "id": "unbreakable",
            "title": "Unbreakable",
            "year": 2000,
            "director": "M. Night Shyamalan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Comic-book style framing, long fluid takes, and deeply shadowed realism.",
            "plot": "A man learns something extraordinary about himself after a devastating accident.",
            "releaseDate": "2000-01-01",
            "writer": "M. Night Shyamalan",
            "cinematographer": "Eduardo Serra",
            "editor": "Dylan Tichenor",
            "composer": "James Newton Howard",
            "studio": "Touchstone Pictures / Blinding Edge Pictures"
        }
    ],
    "Javier Aguirresarobe": [
        {
            "id": "the-others",
            "title": "The Others",
            "year": 2001,
            "director": "Alejandro Amenábar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Heavy chiaroscuro and suffocating candlelight establishing gothic horror.",
            "plot": "A woman who lives in her darkened old family house with her two photosensitive children becomes convinced that the home is haunted.",
            "releaseDate": "2001-01-01",
            "writer": "Alejandro Amenábar",
            "cinematographer": "Javier Aguirresarobe",
            "editor": "Nacho Ruiz Capillas",
            "composer": "Alejandro Amenábar",
            "studio": "Las Producciones del Escorpión / Cruise/Wagner Productions"
        },
        {
            "id": "the-road",
            "title": "The Road",
            "year": 2009,
            "director": "John Hillcoat",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, ash-gray, extremely desaturated post-apocalyptic landscapes.",
            "plot": "In a dangerous post-apocalyptic world, an ailing father defends his son as they slowly travel to the sea.",
            "releaseDate": "2009-01-01",
            "writer": "Joe Penhall",
            "cinematographer": "Javier Aguirresarobe",
            "editor": "Jon Gregory",
            "composer": "Nick Cave / Warren Ellis",
            "studio": "2929 Productions / Plan B Entertainment"
        },
        {
            "id": "vicky-cristina-barcelona",
            "title": "Vicky Cristina Barcelona",
            "year": 2008,
            "director": "Woody Allen",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, golden, romanticized natural lighting embracing the Spanish setting.",
            "plot": "Two friends on a summer holiday in Spain become enamored with the same painter, unaware that his ex-wife is about to re-enter the picture.",
            "releaseDate": "2008-01-01",
            "writer": "Woody Allen",
            "cinematographer": "Javier Aguirresarobe",
            "editor": "Alisa Lepselter",
            "composer": "Giulia y Los Tellarini",
            "studio": "Mediapro / Gravier Productions"
        }
    ],
    "Néstor Almendros": [
        {
            "id": "days-of-heaven",
            "title": "Days of Heaven",
            "year": 1978,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Revolutionary use of natural 'magic hour' lighting and sweeping landscapes.",
            "plot": "A hot-tempered farm laborer convinces the woman he loves to marry their rich but dying boss so that they can claim his fortune.",
            "releaseDate": "1978-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "Néstor Almendros",
            "editor": "Billy Weber",
            "composer": "Ennio Morricone",
            "studio": "O.P. Productions"
        },
        {
            "id": "kramer-vs-kramer",
            "title": "Kramer vs. Kramer",
            "year": 1979,
            "director": "Robert Benton",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, naturalistic interior lighting creating a highly intimate emotional space.",
            "plot": "A workaholic advertising executive must learn to care for his son when his wife leaves him, leading to a bitter custody battle.",
            "releaseDate": "1979-01-01",
            "writer": "Robert Benton",
            "cinematographer": "Néstor Almendros",
            "editor": "Jerry Greenberg",
            "composer": "John Kander",
            "studio": "Stanley Jaffe Productions"
        },
        {
            "id": "the-last-metro",
            "title": "The Last Metro (Le Dernier Métro)",
            "year": 1980,
            "director": "François Truffaut",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, amber-hued theatrical lighting contrasting with the darkness of occupied Paris.",
            "plot": "A Parisian theater tries to keep its doors open during the Nazi occupation, while its Jewish director hides in the cellar.",
            "releaseDate": "1980-01-01",
            "writer": "François Truffaut / Suzanne Schiffman",
            "cinematographer": "Néstor Almendros",
            "editor": "Martine Barraqué",
            "composer": "Georges Delerue",
            "studio": "Les Films du Carrosse"
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
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-').replace(/\./g, '').replace(/é/g, 'e'));
        
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
        console.log("Successfully updated Spanish & Portuguese Cinematographers");
    }
}

run();
