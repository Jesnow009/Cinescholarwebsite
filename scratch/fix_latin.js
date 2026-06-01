const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Gabriel Figueroa": [
        {
            "id": "los-olvidados",
            "title": "Los Olvidados (The Young and the Damned)",
            "year": 1950,
            "director": "Luis Buñuel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, unromanticized black-and-white realism infused with surreal dream sequences.",
            "plot": "A group of juvenile delinquents live a violent and crime-filled life in the festering slums of Mexico City.",
            "releaseDate": "1950-01-01",
            "writer": "Luis Buñuel, Luis Alcoriza",
            "cinematographer": "Gabriel Figueroa",
            "editor": "Carlos Savage",
            "composer": "Gustavo Pittaluga, Rodolfo Halffter",
            "studio": "Ultramar Films"
        },
        {
            "id": "maria-candelaria",
            "title": "María Candelaria",
            "year": 1944,
            "director": "Emilio Fernández",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Iconic high-contrast skies, majestic landscapes, and deep cultural romanticism.",
            "plot": "A young indigenous woman is rejected by her community while trying to survive and find love in Xochimilco.",
            "releaseDate": "1944-01-01",
            "writer": "Emilio Fernández, Mauricio Magdaleno",
            "cinematographer": "Gabriel Figueroa",
            "editor": "Gloria Schoemann",
            "composer": "Francisco Domínguez",
            "studio": "Films Mundiales"
        },
        {
            "id": "the-pearl",
            "title": "The Pearl (La perla)",
            "year": 1947,
            "director": "Emilio Fernández",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dramatic chiaroscuro emphasizing the harsh textures of nature and human tragedy.",
            "plot": "A poor Mexican diver discovers a massive pearl, but his newfound wealth brings only tragedy.",
            "releaseDate": "1947-01-01",
            "writer": "Emilio Fernández, John Steinbeck, Jack Wagner",
            "cinematographer": "Gabriel Figueroa",
            "editor": "Gloria Schoemann",
            "composer": "Antonio Díaz Conde",
            "studio": "Águila Films"
        }
    ],
    "César Charlone": [
        {
            "id": "city-of-god",
            "title": "City of God (Cidade de Deus)",
            "year": 2002,
            "director": "Fernando Meirelles, Kátia Lund",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Frenetic, highly saturated, handheld realism conveying the chaos of the favelas.",
            "plot": "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
            "releaseDate": "2002-01-01",
            "writer": "Bráulio Mantovani",
            "cinematographer": "César Charlone",
            "editor": "Daniel Rezende",
            "composer": "Antonio Pinto, Ed Côrtes",
            "studio": "O2 Filmes / VideoFilmes"
        },
        {
            "id": "the-constant-gardener",
            "title": "The Constant Gardener",
            "year": 2005,
            "director": "Fernando Meirelles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Richly textured, vivid African landscapes juxtaposed with cold European corporate offices.",
            "plot": "A widower is determined to get to the bottom of a potentially explosive secret involving his wife's murder.",
            "releaseDate": "2005-01-01",
            "writer": "Jeffrey Caine",
            "cinematographer": "César Charlone",
            "editor": "Claire Simpson",
            "composer": "Alberto Iglesias",
            "studio": "Potboiler Productions / Focus Features"
        },
        {
            "id": "the-two-popes",
            "title": "The Two Popes",
            "year": 2019,
            "director": "Fernando Meirelles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intimate, warm, and highly composed framing highlighting theological dialogues.",
            "plot": "Behind Vatican walls, the conservative Pope Benedict XVI and the liberal future Pope Francis must find common ground.",
            "releaseDate": "2019-01-01",
            "writer": "Anthony McCartan",
            "cinematographer": "César Charlone",
            "editor": "Fernando Stutz",
            "composer": "Bryce Dessner",
            "studio": "Rideback / Netflix"
        }
    ],
    "Rodrigo Prieto": [
        {
            "id": "amores-perros",
            "title": "Amores Perros",
            "year": 2000,
            "director": "Alejandro González Iñárritu",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, high-contrast, kinetic bleach-bypass processing amplifying urban violence.",
            "plot": "A horrific car accident connects three stories, each involving characters dealing with loss, regret, and life's harsh realities.",
            "releaseDate": "2000-01-01",
            "writer": "Guillermo Arriaga",
            "cinematographer": "Rodrigo Prieto",
            "editor": "Alejandro González Iñárritu, Luis Carballar, Fernando Pérez Unda",
            "composer": "Gustavo Santaolalla",
            "studio": "Altavista Films / Zeta Film"
        },
        {
            "id": "brokeback-mountain",
            "title": "Brokeback Mountain",
            "year": 2005,
            "director": "Ang Lee",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweeping, majestic, and melancholic natural lighting emphasizing isolation.",
            "plot": "Two shepherds develop a sexual and emotional relationship. Their relationship becomes complicated when both of them get married to their respective girlfriends.",
            "releaseDate": "2005-01-01",
            "writer": "Larry McMurtry, Diana Ossana",
            "cinematographer": "Rodrigo Prieto",
            "editor": "Geraldine Peroni, Dylan Tichenor",
            "composer": "Gustavo Santaolalla",
            "studio": "River Road Entertainment / Focus Features"
        },
        {
            "id": "killers-of-the-flower-moon",
            "title": "Killers of the Flower Moon",
            "year": 2023,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Rich, earthy, and expansive lighting mimicking early color photography processes.",
            "plot": "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s.",
            "releaseDate": "2023-01-01",
            "writer": "Eric Roth, Martin Scorsese",
            "cinematographer": "Rodrigo Prieto",
            "editor": "Thelma Schoonmaker",
            "composer": "Robbie Robertson",
            "studio": "Paramount Pictures / Apple Studios / Sikelia Productions"
        }
    ],
    "Claudio Miranda": [
        {
            "id": "life-of-pi",
            "title": "Life of Pi",
            "year": 2012,
            "director": "Ang Lee",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Highly stylized, luminous 3D cinematography blending practical and digital elements.",
            "plot": "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery with a fearsome Bengal tiger.",
            "releaseDate": "2012-01-01",
            "writer": "David Magee",
            "cinematographer": "Claudio Miranda",
            "editor": "Tim Squyres",
            "composer": "Mychael Danna",
            "studio": "Fox 2000 Pictures / Dune Entertainment"
        },
        {
            "id": "benjamin-button",
            "title": "The Curious Case of Benjamin Button",
            "year": 2008,
            "director": "David Fincher",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, amber-tinted digital cinematography evoking a nostalgic, timeless atmosphere.",
            "plot": "Tells the story of Benjamin Button, a man who starts aging backwards with consequences.",
            "releaseDate": "2008-01-01",
            "writer": "Eric Roth, Robin Swicord",
            "cinematographer": "Claudio Miranda",
            "editor": "Kirk Baxter, Angus Wall",
            "composer": "Alexandre Desplat",
            "studio": "Warner Bros. Pictures / Paramount Pictures"
        },
        {
            "id": "top-gun-maverick",
            "title": "Top Gun: Maverick",
            "year": 2022,
            "director": "Joseph Kosinski",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Visceral, practical, inside-the-cockpit IMAX photography capturing immense speed.",
            "plot": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
            "releaseDate": "2022-01-01",
            "writer": "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie",
            "cinematographer": "Claudio Miranda",
            "editor": "Eddie Hamilton",
            "composer": "Harold Faltermeyer, Lady Gaga, Hans Zimmer",
            "studio": "Paramount Pictures / Skydance Media / Don Simpson/Jerry Bruckheimer Films"
        }
    ],
    "Natasha Braier": [
        {
            "id": "the-neon-demon",
            "title": "The Neon Demon",
            "year": 2016,
            "director": "Nicolas Winding Refn",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Extremely stylized, hyper-saturated neon lighting and geometric compositions.",
            "plot": "An aspiring model in Los Angeles has her beauty and youth devoured by a group of beauty-obsessed women.",
            "releaseDate": "2016-01-01",
            "writer": "Nicolas Winding Refn, Mary Laws, Polly Stenham",
            "cinematographer": "Natasha Braier",
            "editor": "Matthew Newman",
            "composer": "Cliff Martinez",
            "studio": "Space Rocket Nation / Vendian Entertainment / Bold Films"
        },
        {
            "id": "honey-boy",
            "title": "Honey Boy",
            "year": 2019,
            "director": "Alma Har'el",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dreamy, hazy, and nostalgic lighting reflecting fragmented childhood memories.",
            "plot": "A young actor's stormy childhood and early adult years as he struggles to reconcile with his father and deal with his mental health.",
            "releaseDate": "2019-01-01",
            "writer": "Shia LaBeouf",
            "cinematographer": "Natasha Braier",
            "editor": "Monica Salazar, Dominic LaPerriere",
            "composer": "Alex Somers",
            "studio": "Stay Gold Features / Delirio Films"
        },
        {
            "id": "the-milk-of-sorrow",
            "title": "The Milk of Sorrow (La teta asustada)",
            "year": 2009,
            "director": "Claudia Llosa",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Subdued, naturalistic lighting honoring the stark reality of the Andean environment.",
            "plot": "A young woman suffers from a rare illness transmitted through the breast milk of pregnant women who were abused.",
            "releaseDate": "2009-01-01",
            "writer": "Claudia Llosa",
            "cinematographer": "Natasha Braier",
            "editor": "Frank Gutiérrez",
            "composer": "Selma Mutal",
            "studio": "Vela Production / Oberón Cinematográfica"
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
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-').replace(/\./g, '').replace(/é/g, 'e').replace(/á/g, 'a'));
        
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
        console.log("Successfully updated Latin American Cinematographers");
    }
}

run();
