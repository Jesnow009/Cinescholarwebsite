const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Sven Nykvist": [
        {
            "id": "persona",
            "title": "Persona",
            "year": 1966,
            "director": "Ingmar Bergman",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, high-contrast black-and-white lighting focusing on psychological depth.",
            "plot": "A nurse is put in charge of a mute actress and finds that their personas are melding together.",
            "releaseDate": "1966-01-01",
            "writer": "Ingmar Bergman",
            "cinematographer": "Sven Nykvist",
            "editor": "Ulla Ryghe",
            "composer": "Lars Johan Werle",
            "studio": "Svensk Filmindustri (SF)"
        },
        {
            "id": "cries-and-whispers",
            "title": "Cries and Whispers (Viskningar och rop)",
            "year": 1972,
            "director": "Ingmar Bergman",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intensely saturated reds and soft, melancholic natural light.",
            "plot": "When a woman dying of cancer in early 20th-century Sweden is visited by her two sisters, long-repressed feelings rise to the surface.",
            "releaseDate": "1972-01-01",
            "writer": "Ingmar Bergman",
            "cinematographer": "Sven Nykvist",
            "editor": "Siv Lundgren",
            "composer": "Johann Sebastian Bach / Frédéric Chopin",
            "studio": "Svensk Filmindustri (SF) / Cinematograph AB"
        },
        {
            "id": "the-sacrifice",
            "title": "The Sacrifice (Offret)",
            "year": 1986,
            "director": "Andrei Tarkovsky",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Desaturated, ethereal long takes exploring spiritual and existential dread.",
            "plot": "A man attempts to bargain with God to stop an impending nuclear holocaust.",
            "releaseDate": "1986-01-01",
            "writer": "Andrei Tarkovsky",
            "cinematographer": "Sven Nykvist",
            "editor": "Andrei Tarkovsky / Michal Leszczylowski",
            "composer": "Johann Sebastian Bach",
            "studio": "Swedish Film Institute / Argos Films"
        }
    ],
    "Hoyte van Hoytema": [
        {
            "id": "oppenheimer",
            "title": "Oppenheimer",
            "year": 2023,
            "director": "Christopher Nolan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Large-format IMAX portraiture mixing color and stark black-and-white.",
            "plot": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
            "releaseDate": "2023-01-01",
            "writer": "Christopher Nolan",
            "cinematographer": "Hoyte van Hoytema",
            "editor": "Jennifer Lame",
            "composer": "Ludwig Göransson",
            "studio": "Universal Pictures / Syncopy / Atlas Entertainment"
        },
        {
            "id": "interstellar",
            "title": "Interstellar",
            "year": 2014,
            "director": "Christopher Nolan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Expansive, gritty sci-fi realism emphasizing physical models and natural light.",
            "plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            "releaseDate": "2014-01-01",
            "writer": "Jonathan Nolan / Christopher Nolan",
            "cinematographer": "Hoyte van Hoytema",
            "editor": "Lee Smith",
            "composer": "Hans Zimmer",
            "studio": "Paramount Pictures / Warner Bros. / Legendary Pictures / Syncopy"
        },
        {
            "id": "let-the-right-one-in",
            "title": "Let the Right One In (Låt den rätte komma in)",
            "year": 2008,
            "director": "Tomas Alfredson",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Cold, bleak, desaturated winter landscapes contrasting with stark reds.",
            "plot": "Oskar, an overlooked and bullied boy, finds love and revenge through Eli, a beautiful but peculiar girl.",
            "releaseDate": "2008-01-01",
            "writer": "John Ajvide Lindqvist",
            "cinematographer": "Hoyte van Hoytema",
            "editor": "Tomas Alfredson / Dino Jonsäter",
            "composer": "Johan Söderqvist",
            "studio": "EFTI / Filmpool Nord / Sandrew Metronome Distribution"
        }
    ],
    "Sturla Brandth Grøvlen": [
        {
            "id": "victoria",
            "title": "Victoria",
            "year": 2015,
            "director": "Sebastian Schipper",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, continuous single-take cinematography capturing real-time tension.",
            "plot": "A young Spanish woman in Berlin gets caught up in a bank robbery.",
            "releaseDate": "2015-01-01",
            "writer": "Sebastian Schipper / Olivia Neergaard-Holm / Eike Frederik Schulz",
            "cinematographer": "Sturla Brandth Grøvlen",
            "editor": "Olivia Neergaard-Holm",
            "composer": "Nils Frahm",
            "studio": "MonkeyBoy / Deutschfilm / RadicalMedia"
        },
        {
            "id": "another-round",
            "title": "Another Round (Druk)",
            "year": 2020,
            "director": "Thomas Vinterberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Naturalistic, handheld documentary style capturing evolving emotional states.",
            "plot": "Four high school teachers consume alcohol on a daily basis to see how it affects their social and professional lives.",
            "releaseDate": "2020-01-01",
            "writer": "Thomas Vinterberg / Tobias Lindholm",
            "cinematographer": "Sturla Brandth Grøvlen",
            "editor": "Anne Østerud / Janus Billeskov Jansen",
            "composer": "Mikkel Maltha",
            "studio": "Zentropa Entertainments / Film i Väst / Zentropa Sweden"
        },
        {
            "id": "the-innocents",
            "title": "The Innocents (De uskyldige)",
            "year": 2021,
            "director": "Eskil Vogt",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Unsettling, bright summer daylight framing psychological horror.",
            "plot": "During the bright Nordic summer, a group of children reveal their dark and mysterious powers when the adults aren't looking.",
            "releaseDate": "2021-01-01",
            "writer": "Eskil Vogt",
            "cinematographer": "Sturla Brandth Grøvlen",
            "editor": "Jens Christian Fodstad",
            "composer": "Pessi Levanto",
            "studio": "Mer Film / BUFO / Snowglobe / Total Entertainment"
        }
    ],
    "Charlotte Bruus Christensen": [
        {
            "id": "the-hunt",
            "title": "The Hunt (Jagten)",
            "year": 2012,
            "director": "Thomas Vinterberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, autumnal tones contrasting with chilling social isolation.",
            "plot": "A teacher's life is shattered over a lie that spreads like a virus in his small community.",
            "releaseDate": "2012-01-01",
            "writer": "Thomas Vinterberg / Tobias Lindholm",
            "cinematographer": "Charlotte Bruus Christensen",
            "editor": "Anne Østerud / Janus Billeskov Jansen",
            "composer": "Nikolaj Egelund",
            "studio": "Zentropa Entertainments / Film i Väst / Zentropa International Sweden"
        },
        {
            "id": "a-quiet-place",
            "title": "A Quiet Place",
            "year": 2018,
            "director": "John Krasinski",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Mood-driven, atmospheric lighting relying heavily on natural and practical sources.",
            "plot": "A family must live in silence to hide from blind extraterrestrial creatures that hunt by sound.",
            "releaseDate": "2018-01-01",
            "writer": "Bryan Woods / Scott Beck / John Krasinski",
            "cinematographer": "Charlotte Bruus Christensen",
            "editor": "Christopher Tellefsen",
            "composer": "Marco Beltrami",
            "studio": "Paramount Pictures / Platinum Dunes / Sunday Night"
        },
        {
            "id": "fences",
            "title": "Fences",
            "year": 2016,
            "director": "Denzel Washington",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intimate, stage-like framing focusing intensely on character performances.",
            "plot": "A working-class African-American father tries to raise his family in the 1950s, while coming to terms with the events of his life.",
            "releaseDate": "2016-01-01",
            "writer": "August Wilson",
            "cinematographer": "Charlotte Bruus Christensen",
            "editor": "Hughes Winborne",
            "composer": "Marcelo Zarvos",
            "studio": "Paramount Pictures / Bron Creative / Macro Media / Scott Rudin Productions"
        }
    ],
    "Dan Laustsen": [
        {
            "id": "the-shape-of-water",
            "title": "The Shape of Water",
            "year": 2017,
            "director": "Guillermo del Toro",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Fluid camera movements and aquatic, deeply saturated cyan and emerald hues.",
            "plot": "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature.",
            "releaseDate": "2017-01-01",
            "writer": "Guillermo del Toro / Vanessa Taylor",
            "cinematographer": "Dan Laustsen",
            "editor": "Sidney Wolinsky",
            "composer": "Alexandre Desplat",
            "studio": "Fox Searchlight Pictures / TSG Entertainment / Double Dare You Productions"
        },
        {
            "id": "john-wick-3",
            "title": "John Wick: Chapter 3 - Parabellum",
            "year": 2019,
            "director": "Chad Stahelski",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Ultra-stylized, high-contrast neon lighting enhancing kinetic action.",
            "plot": "John Wick is on the run after killing a member of the international assassins' guild.",
            "releaseDate": "2019-01-01",
            "writer": "Derek Kolstad / Shay Hatten / Chris Collins / Marc Abrams",
            "cinematographer": "Dan Laustsen",
            "editor": "Evan Schiff",
            "composer": "Tyler Bates / Joel J. Richard",
            "studio": "Lionsgate / Thunder Road Pictures / 87Eleven Productions"
        },
        {
            "id": "nightwatch",
            "title": "Nightwatch (Nattevagten)",
            "year": 1994,
            "director": "Ole Bornedal",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Deep shadows, high-contrast, suspenseful and eerie clinical lighting.",
            "plot": "A law student takes a night watchman job at a forensic institute, becoming the prime suspect in a serial killer case.",
            "releaseDate": "1994-01-01",
            "writer": "Ole Bornedal",
            "cinematographer": "Dan Laustsen",
            "editor": "Camilla Skousen",
            "composer": "Joachim Holbek",
            "studio": "Thura Film / National Film School of Denmark / Danish Film Institute"
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
        console.log("Successfully updated Nordic Cinematographers");
    }
}

run();
