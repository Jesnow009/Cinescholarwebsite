const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'nuri-bilge-ceylan': [
        {
            title: "Once Upon a Time in Anatolia",
            year: 2011,
            director: "Nuri Bilge Ceylan",
            writer: "Ercan Kesal / Ebru Ceylan / Nuri Bilge Ceylan",
            cinematographer: "Gökhan Tiryaki",
            editor: "Bora Gökşingöl / Nuri Bilge Ceylan",
            composer: "N/A",
            studio: "Zeyno Film / NBC Film / Production 2006",
            focus: "A breathtaking, incredibly methodical masterpiece of slow cinema. Ceylan utilizes impossibly gorgeous, highly contrasted wide shots of the desolate Anatolian steppes to mirror a profound, agonizingly slow existential unravelling of male authority and moral guilt.",
            plot: "A group of deeply weary men, including a police commissar, a prosecutor, a doctor, and a murder suspect, spend a long, grueling night driving through the vast, dark Anatolian steppes desperately searching for a buried body.",
            releaseDate: "May 21, 2011",
            country: "Turkey / Bosnia and Herzegovina / France"
        },
        {
            title: "Winter Sleep",
            year: 2014,
            director: "Nuri Bilge Ceylan",
            writer: "Ebru Ceylan / Nuri Bilge Ceylan",
            cinematographer: "Gökhan Tiryaki",
            editor: "Bora Gökşingöl / Nuri Bilge Ceylan",
            composer: "N/A",
            studio: "NBC Film / Zeyno Film / Memento Films Production",
            focus: "A monumental, Chekhovian epic of immense psychological depth. Ceylan traps his deeply flawed, highly articulate characters inside a snowbound hotel, using incredibly dense, brilliantly sustained dialogue sequences to slowly dismantle class privilege and intellectual arrogance.",
            plot: "A wealthy, deeply arrogant former actor running a small hotel in the snowy mountains of Cappadocia finds his marriage and his sense of moral superiority slowly collapsing under the weight of his own bitter isolation.",
            releaseDate: "May 16, 2014",
            country: "Turkey / France / Germany"
        },
        {
            title: "Uzak",
            year: 2002,
            director: "Nuri Bilge Ceylan",
            writer: "Nuri Bilge Ceylan",
            cinematographer: "Nuri Bilge Ceylan",
            editor: "Nuri Bilge Ceylan",
            composer: "N/A",
            studio: "NBC Film",
            focus: "A profound, highly austere study of modern alienation. Serving as his own cinematographer, Ceylan utilizes incredibly static, deeply melancholy framing of a snowy Istanbul to visually articulate the immense emotional chasm between two estranged relatives.",
            plot: "A deeply cynical, highly successful photographer living in Istanbul reluctantly takes in his incredibly naive, unemployed relative from the countryside, leading to a quiet, painfully awkward clash of profound loneliness and mismatched values.",
            releaseDate: "December 20, 2002",
            country: "Turkey"
        }
    ],
    'yilmaz-guney': [
        {
            title: "Yol",
            year: 1982,
            director: "Şerif Gören",
            writer: "Yılmaz Güney",
            cinematographer: "Erdoğan Engin",
            editor: "Yılmaz Güney / Elizabeth Waelchli",
            composer: "Sebastian Argol / Zülfü Livaneli",
            studio: "Güney Film / Cactus Film",
            focus: "A deeply devastating, fiercely political triumph of neo-realism. Imprisoned during production, Güney miraculously micro-managed this sweeping, incredibly harrowing portrait of Turkey, utilizing harsh, unforgiving landscapes to reflect a society crushed under martial law and strict patriarchal oppression.",
            plot: "Five deeply traumatized Kurdish prisoners are granted a temporary, highly regulated week-long leave to visit their struggling families, only to discover that the outside world is just as oppressive and unforgiving as their prison cells.",
            releaseDate: "May 19, 1982",
            country: "Turkey / Switzerland / France"
        },
        {
            title: "The Herd (Sürü)",
            year: 1979,
            director: "Zeki Ökten",
            writer: "Yılmaz Güney",
            cinematographer: "İzzet Akay",
            editor: "N/A",
            composer: "Zülfü Livaneli",
            studio: "Güney Film",
            focus: "A monumental, deeply tragic epic of socio-economic transition. Also written while Güney was incarcerated, the film uses incredibly sweeping, documentary-style cinematography to capture the profound, agonizing death of traditional nomadic life against the rise of brutal modernization.",
            plot: "A deeply struggling, fiercely traditional nomadic Kurdish family embarks on a grueling, incredibly perilous train journey to transport their large flock of sheep across the country to Ankara, facing corruption, disease, and the devastating collapse of their ancient way of life.",
            releaseDate: "January 1, 1979",
            country: "Turkey"
        }
    ],
    'elia-suleiman': [
        {
            title: "Divine Intervention",
            year: 2002,
            director: "Elia Suleiman",
            writer: "Elia Suleiman",
            cinematographer: "Marc-André Batigne",
            editor: "Veronique Lange",
            composer: "N/A",
            studio: "Elia Suleiman Productions / Ognon Pictures",
            focus: "A brilliantly absurd, highly surreal tragicomedy. Suleiman utilizes incredibly precise, Keaton-esque deadpan framing and profoundly absurd visual gags to devastatingly critique the suffocating, highly absurd reality of life under military occupation.",
            plot: "Living in incredibly tense, divided Nazareth, a deadpan Palestinian man and his fiercely devoted lover from Ramallah are forced to conduct their deeply passionate romance entirely within the heavily guarded confines of an Israeli military checkpoint.",
            releaseDate: "May 19, 2002",
            country: "Palestine / France / Morocco / Germany"
        },
        {
            title: "The Time That Remains",
            year: 2009,
            director: "Elia Suleiman",
            writer: "Elia Suleiman",
            cinematographer: "Marc-André Batigne",
            editor: "Veronique Lange",
            composer: "N/A",
            studio: "Nazira Films / Artemis Productions",
            focus: "A deeply poignant, semi-autobiographical historical tableau. Suleiman maintains his incredibly rigid, heavily stylized static camera to observe generations of Palestinian life, transforming profound political tragedy into quiet, deeply melancholic visual poetry.",
            plot: "A highly fragmented, deeply personal chronicle of a Palestinian family spanning from the creation of the State of Israel in 1948 to the modern day, observed through the quiet, incredibly deadpan gaze of the director.",
            releaseDate: "May 22, 2009",
            country: "Palestine / France / United Kingdom / Italy / Belgium"
        }
    ],
    'hany-abu-assad': [
        {
            title: "Paradise Now",
            year: 2005,
            director: "Hany Abu-Assad",
            writer: "Hany Abu-Assad / Bero Beyer",
            cinematographer: "Antoine Héberlé",
            editor: "Kai Morrison",
            composer: "Jina Sumedi",
            studio: "Augustus Film / Lama Films / Razor Film Produktion",
            focus: "A deeply humanistic, incredibly tense psychological thriller. Abu-Assad utilizes highly grounded, deeply intimate camerawork to strip away the sensationalism of political violence, focusing entirely on the devastating internal conflict and terrifying banality of radicalization.",
            plot: "Two lifelong, deeply inseparable Palestinian friends working as mechanics in Nablus are suddenly recruited for a devastating suicide bombing mission in Tel Aviv, forcing them into a terrifying, highly emotional moral crisis.",
            releaseDate: "February 14, 2005",
            country: "Palestine / Netherlands / Germany / France"
        },
        {
            title: "Omar",
            year: 2013,
            director: "Hany Abu-Assad",
            writer: "Hany Abu-Assad",
            cinematographer: "Ehab Assal",
            editor: "Martin Brinkler / Eyas Salman",
            composer: "N/A",
            studio: "ZBros Productions",
            focus: "A brilliantly taut, incredibly paranoid thriller of betrayal and survival. Abu-Assad perfectly captures the profound claustrophobia of life in the West Bank, using the massive separation wall as a deeply literal and terrifyingly metaphorical barrier to love and freedom.",
            plot: "A deeply romantic, highly athletic young Palestinian baker is violently captured by Israeli military police after a fatal sniper attack, forcing him into an incredibly tense, deadly game of deception as a coerced informant.",
            releaseDate: "May 21, 2013",
            country: "Palestine"
        }
    ],
    'nadine-labaki': [
        {
            title: "Capernaum",
            year: 2018,
            director: "Nadine Labaki",
            writer: "Nadine Labaki / Jihad Hojeily / Michelle Keserwany",
            cinematographer: "Christopher Aoun",
            editor: "Konstantin Bock",
            composer: "Khaled Mouzanar",
            studio: "Mooz Films",
            focus: "An incredibly visceral, deeply heart-wrenching masterpiece of neo-realism. Labaki utilizes deeply intimate, documentary-style handheld cinematography and astonishing non-professional performances to brilliantly expose the profound devastation of poverty and systemic neglect in Beirut.",
            plot: "A deeply hardened, incredibly resourceful 12-year-old Syrian refugee boy living in extreme squalor on the chaotic streets of Beirut takes the unprecedented, highly publicized step of suing his deeply negligent parents for giving him life.",
            releaseDate: "May 17, 2018",
            country: "Lebanon / France"
        },
        {
            title: "Caramel",
            year: 2007,
            director: "Nadine Labaki",
            writer: "Nadine Labaki / Jihad Hojeily / Rodney Al Haddad",
            cinematographer: "Yves Sehnaoui",
            editor: "Laurence Briaud",
            composer: "Khaled Mouzanar",
            studio: "Les Films des Tournelles / Roissy Films",
            focus: "A vibrant, incredibly warm, and deeply observant social comedy. Labaki uses lush, highly colorful cinematography to create a deeply intimate, matriarchal safe haven, brilliantly exploring the profound societal pressures facing modern Lebanese women.",
            plot: "The deeply intertwined, highly complicated lives, hidden romances, and profound everyday struggles of five very different Lebanese women profoundly intersect inside a vibrant, bustling beauty salon in Beirut.",
            releaseDate: "May 20, 2007",
            country: "Lebanon / France"
        }
    ],
    'ziad-doueiri': [
        {
            title: "The Insult",
            year: 2017,
            director: "Ziad Doueiri",
            writer: "Ziad Doueiri / Joëlle Touma",
            cinematographer: "Tommaso Fiorilli",
            editor: "Dominique Marcombe",
            composer: "Éric Neveux",
            studio: "Rouge International / Tessalit Productions",
            focus: "A highly explosive, deeply riveting courtroom drama. Doueiri utilizes incredibly tight, highly volatile dialogue and deeply claustrophobic framing to masterfully dissect the profound, deeply unresolved historical trauma and terrifying sectarian divisions of modern Lebanon.",
            plot: "A highly trivial, incredibly petty argument over a broken drainpipe between a deeply stubborn Lebanese Christian and a proud Palestinian refugee rapidly escalates into a massive, highly publicized national court case that threatens to tear the country apart.",
            releaseDate: "August 31, 2017",
            country: "Lebanon / France"
        },
        {
            title: "West Beirut",
            year: 1998,
            director: "Ziad Doueiri",
            writer: "Ziad Doueiri",
            cinematographer: "Ricardo Jacques Gale",
            editor: "Dominique Marcombe",
            composer: "Stewart Copeland",
            studio: "3B Productions",
            focus: "A deeply nostalgic, highly energetic coming-of-age film. Doueiri captures the terrifying onset of the Lebanese Civil War through a profoundly youthful, kinetic lens, beautifully balancing deep tragedy with incredible adolescent resilience and humor.",
            plot: "In 1975, as a terrifying, highly destructive civil war violently rips Beirut into divided religious sectors, two incredibly mischievous teenage best friends dangerously navigate the chaotic, war-torn streets desperately armed with a Super 8 camera.",
            releaseDate: "May 15, 1998",
            country: "Lebanon / France / Germany / Norway"
        }
    ],
    'ari-folman': [
        {
            title: "Waltz with Bashir",
            year: 2008,
            director: "Ari Folman",
            writer: "Ari Folman",
            cinematographer: "N/A",
            editor: "Nili Feller",
            composer: "Max Richter",
            studio: "Bridgit Folman Film Gang / Les Films d'Ici / Razor Film Produktion",
            focus: "An unprecedented, highly profound animated documentary. Folman utilizes deeply surreal, incredibly fluid rotoscope-style animation to brilliantly visualize the deeply fragmented nature of memory, PTSD, and the terrifying, hallucinatory horror of the 1982 Lebanon War.",
            plot: "A deeply haunted Israeli film director, unable to remember his time as an infantry soldier during the 1982 Lebanon War, embarks on a desperate, highly surreal animated journey to interview former comrades and reconstruct his deeply repressed memories.",
            releaseDate: "May 13, 2008",
            country: "Israel / France / Germany"
        }
    ],
    'samuel-maoz': [
        {
            title: "Lebanon",
            year: 2009,
            director: "Samuel Maoz",
            writer: "Samuel Maoz",
            cinematographer: "Giora Bejach",
            editor: "Einat Glaser-Zarhin",
            composer: "Alex Claude",
            studio: "Ariel Films / Paralite / Arte France Cinéma",
            focus: "A masterpiece of extreme, deeply visceral cinematic claustrophobia. Maoz traps the audience entirely within the terrifying, highly suffocating interior of an Israeli tank, restricting all vision of the outside war to the deeply limited, crosshaired view of a gun sight.",
            plot: "During the incredibly violent, highly chaotic early days of the 1982 Lebanon War, four deeply terrified, highly inexperienced young Israeli soldiers find themselves trapped inside a stalled tank surrounded by hostile forces.",
            releaseDate: "September 8, 2009",
            country: "Israel / France / Germany"
        },
        {
            title: "Foxtrot",
            year: 2017,
            director: "Samuel Maoz",
            writer: "Samuel Maoz",
            cinematographer: "Giora Bejach",
            editor: "Guy Nemesh / Arik Lahav-Leibovich",
            composer: "N/A",
            studio: "Pola Pandora Filmproduktions / Spiro Films / ASAP Films",
            focus: "A deeply surreal, visually astounding structural triad. Maoz uses incredibly rigorous, highly stylized symmetry and moments of profound, absurdist choreography to dissect the deep, cyclical nature of grief and the terrifying randomness of military service.",
            plot: "A deeply grieving, highly affluent Tel Aviv couple is completely shattered by the news of their son's death at a remote military checkpoint, launching a profoundly surreal, highly devastating exploration of fate, trauma, and cover-ups.",
            releaseDate: "September 2, 2017",
            country: "Israel / Germany / France / Switzerland"
        }
    ],
    'haifaa-al-mansour': [
        {
            title: "Wadjda",
            year: 2012,
            director: "Haifaa al-Mansour",
            writer: "Haifaa al-Mansour",
            cinematographer: "Lutz Reitemeier",
            editor: "Andreas Wodraschke",
            composer: "Max Richter",
            studio: "Razor Film Produktion / High Look Enterprises",
            focus: "A groundbreaking, deeply vital work of highly determined social realism. Shot entirely in Saudi Arabia, Al-Mansour utilizes incredibly observant, highly empathetic framing to brilliantly critique the deep, systemic oppression of women through the innocent, highly rebellious gaze of a child.",
            plot: "A fiercely independent, highly rebellious ten-year-old Saudi girl secretly enters a highly competitive Quran recitation competition to win enough money to buy the beautiful green bicycle she is forbidden by society to ride.",
            releaseDate: "August 31, 2012",
            country: "Saudi Arabia / Germany"
        }
    ]
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchPoster(title, year) {
    return new Promise((resolve, reject) => {
        const query = encodeURIComponent(title);
        const url = `${TMDB_BASE_URL}?api_key=${TMDB_API_KEY}&query=${query}&year=${year}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.results && parsed.results.length > 0 && parsed.results[0].poster_path) {
                        resolve(POSTER_BASE_URL + parsed.results[0].poster_path);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(POSTERS_DIR, filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function run() {
    console.log("Starting TMDB fetch and database update for Middle Eastern Filmmakers...");
    
    let dbContent = fs.readFileSync(DB_PATH, 'utf8');

    for (const [directorId, movies] of Object.entries(moviesUpdate)) {
        console.log(`Updating ${directorId}...`);
        
        for (let i = 0; i < movies.length; i++) {
            const m = movies[i];
            m.id = slugify(m.title);
            m.poster = `assets/images/${m.id}.jpg`;

            const posterUrl = await fetchPoster(m.title, m.year);
            if (posterUrl) {
                console.log(`  Found poster for ${m.title}: ${posterUrl}`);
                try {
                    await downloadImage(posterUrl, `${m.id}.jpg`);
                    console.log('  Downloaded successfully!');
                } catch (e) {
                    console.log(`  Failed to download poster for ${m.title}`);
                }
            } else {
                console.log(`  No poster found on TMDB for ${m.title}. Setting placeholder path.`);
                try {
                    // if dummy exists, just use it
                    fs.writeFileSync(path.join(POSTERS_DIR, `${m.id}.jpg`), ''); 
                } catch(err) {
                    // ignore
                }
            }
            await delay(300);
        }

        const newMoviesStr = JSON.stringify(movies, null, 24).replace(/\n/g, '\n                    ');
        const regex = new RegExp(`"id": "${directorId}"[\\s\\S]*?"mustWatch": \\[[\\s\\S]*?\\],`);
        
        const match = dbContent.match(regex);
        if (match) {
            const replacement = match[0].replace(/"mustWatch": \[[ \s\S]*?\],/, `"mustWatch": ${newMoviesStr},`);
            dbContent = dbContent.replace(match[0], replacement);
        } else {
            console.log(`Could not find block for ${directorId} in temp_data.js`);
        }
    }

    fs.writeFileSync(DB_PATH, dbContent, 'utf8');
    console.log("Successfully updated temp_data.js with Middle Eastern films!");
}

run();
