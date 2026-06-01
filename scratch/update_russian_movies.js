const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'aleksei-balabanov': [
        {
            title: "Brother",
            year: 1997,
            director: "Aleksei Balabanov",
            writer: "Aleksei Balabanov",
            cinematographer: "Sergei Astakhov",
            editor: "Marina Lipartiya",
            composer: "Vyacheslav Butusov",
            studio: "STW Film Company",
            focus: "A gritty, defining masterpiece of 1990s post-Soviet cinema. Balabanov utilizes a raw, naturalistic shooting style, pervasive rock music, and a bleak, decaying St. Petersburg to capture a lost, morally adrift generation.",
            plot: "After being discharged from the army, a quiet, music-loving young man travels to St. Petersburg to find his older brother, only to discover that he is a professional hitman for the Russian mob, drawing him into a brutal life of crime.",
            releaseDate: "May 17, 1997",
            country: "Russia"
        },
        {
            title: "Brother 2",
            year: 2000,
            director: "Aleksei Balabanov",
            writer: "Aleksei Balabanov",
            cinematographer: "Sergei Astakhov",
            editor: "Marina Lipartiya",
            composer: "Various Artists / Russian Rock Compilation",
            studio: "STW Film Company",
            focus: "Expanding on the original's gritty aesthetic, Balabanov turns his cynical, ultra-violent gaze toward America, creating a chaotic, hyper-nationalistic anti-hero mythos fueled entirely by Russian rock music.",
            plot: "When his close friend is murdered over a dispute involving a corrupt American sports promoter, Danila travels from Moscow to Chicago on a violent, chaotic quest for brutal revenge and justice.",
            releaseDate: "May 11, 2000",
            country: "Russia"
        },
        {
            title: "Cargo 200",
            year: 2007,
            director: "Aleksei Balabanov",
            writer: "Aleksei Balabanov",
            cinematographer: "Aleksandr Simonov",
            editor: "Tatyana Kuzmichyova",
            composer: "N/A",
            studio: "STW Film Company",
            focus: "Balabanov's most devastating and nihilistic work. He frames the absolute moral rot of the dying Soviet empire through suffocating, claustrophobic interiors, deeply unsettling pop music contrast, and unrelenting brutality.",
            plot: "In 1984, during the height of the Soviet war in Afghanistan, a psychopathic, impotent police captain kidnaps the daughter of a high-ranking official, subjecting her to unimaginable horrors in his squalid apartment.",
            releaseDate: "June 14, 2007",
            country: "Russia"
        }
    ],
    'aleksandr-sokurov': [
        {
            title: "Russian Ark",
            year: 2002,
            director: "Aleksandr Sokurov",
            writer: "Anatoly Nikiforov / Aleksandr Sokurov",
            cinematographer: "Tilman Büttner",
            editor: "Stefan Ciupek / Sergey Ivanov",
            composer: "Sergey Yevtushenko",
            studio: "Hermitage Bridge Studio / Egoli Tossell Film",
            focus: "An unparalleled cinematic achievement consisting of a single, unbroken 96-minute Steadicam tracking shot that glides through the Winter Palace, creating a dreamlike, continuous meditation on three centuries of Russian history.",
            plot: "A contemporary unseen narrator awakens within the State Hermitage Museum in St. Petersburg and wanders through its massive halls alongside a 19th-century French diplomat, witnessing various epochs of Russian history unfold in real-time.",
            releaseDate: "May 22, 2002",
            country: "Russia / Germany"
        },
        {
            title: "Mother and Son",
            year: 1997,
            director: "Aleksandr Sokurov",
            writer: "Aleksei Fyodorov",
            cinematographer: "Aleksei Fyodorov",
            editor: "Leda Semyonova",
            composer: "Mikhail Glinka / Otmar Nussio",
            studio: "Severny Fond / Zero Film",
            focus: "Sokurov uses custom anamorphic lenses, painted glass filters, and heavily distorted perspective to transform the natural landscape into a soft, flattened, romanticist painting representing deep, unconditional love and impending death.",
            plot: "In an isolated, dreamlike countryside, a devoted young man gently carries, comforts, and cares for his deeply ailing, dying mother as they spend their final hours reflecting on life, memory, and nature.",
            releaseDate: "February 20, 1997",
            country: "Russia / Germany"
        },
        {
            title: "Faust",
            year: 2011,
            director: "Aleksandr Sokurov",
            writer: "Aleksandr Sokurov",
            cinematographer: "Bruno Delbonnel",
            editor: "Jörg Hauschild",
            composer: "Andrey Sigle",
            studio: "Proline Film",
            focus: "The final chapter of Sokurov's tetralogy on power. Shot in the 4:3 Academy ratio with sickly, desaturated colors and heavily distorted lenses, creating a claustrophobic, grimy, and physically repulsive manifestation of spiritual corruption.",
            plot: "In a squalid, 19th-century German town, a brilliant but desperately impoverished scholar is lured into a terrifying pact with a grotesque, manipulative moneylender who is heavily implied to be the Devil.",
            releaseDate: "September 8, 2011",
            country: "Russia"
        }
    ],
    'andrey-zvyagintsev': [
        {
            title: "The Return",
            year: 2003,
            director: "Andrey Zvyagintsev",
            writer: "Vladimir Moiseenko / Aleksandr Novototsky",
            cinematographer: "Mikhail Krichman",
            editor: "Kevin Kahn",
            composer: "Andrey Dergachev",
            studio: "Ren Film",
            focus: "A hauntingly beautiful, deeply mythic debut. Zvyagintsev and Krichman utilize cool, desaturated blue hues and stark, isolated natural landscapes to emphasize emotional distance, patriarchy, and unresolved childhood trauma.",
            plot: "Two young brothers whose father has been mysteriously absent for 12 years are suddenly forced to accompany him on a tense, perilous, and deeply unsettling fishing trip to a remote island.",
            releaseDate: "October 16, 2003",
            country: "Russia"
        },
        {
            title: "Leviathan",
            year: 2014,
            director: "Andrey Zvyagintsev",
            writer: "Oleg Negin / Andrey Zvyagintsev",
            cinematographer: "Mikhail Krichman",
            editor: "Anna Mass",
            composer: "Philip Glass",
            studio: "Non-Stop Production",
            focus: "A scathing, masterfully controlled allegory of modern Russia. Slow, methodical tracking shots of a desolate, whale-bone-littered coastal landscape serve as a crushing visual metaphor for the inescapable power of a corrupt state.",
            plot: "In a bleak coastal town on the Barents Sea, a hot-tempered mechanic enlists an old friend to help him fight a corrupt, powerful mayor who is attempting to illegally seize his family's property.",
            releaseDate: "May 14, 2014",
            country: "Russia"
        },
        {
            title: "Loveless",
            year: 2017,
            director: "Andrey Zvyagintsev",
            writer: "Oleg Negin / Andrey Zvyagintsev",
            cinematographer: "Mikhail Krichman",
            editor: "Anna Mass",
            composer: "Evgueni Galperine / Sacha Galperine",
            studio: "Non-Stop Production / Why Not Productions",
            focus: "An icy, forensic dissection of emotional and societal decay. Zvyagintsev's framing is cold, rigid, and immaculate, using brutalist architecture and oppressive winter landscapes to mirror the complete lack of empathy in a broken marriage.",
            plot: "An affluent, viciously divorcing Moscow couple, both entirely consumed by their new relationships and extreme mutual hatred, are suddenly forced to search for their 12-year-old son after he mysteriously disappears.",
            releaseDate: "May 18, 2017",
            country: "Russia / France / Germany / Belgium"
        }
    ],
    'kantemir-balagov': [
        {
            title: "Beanpole",
            year: 2019,
            director: "Kantemir Balagov",
            writer: "Kantemir Balagov / Aleksandr Terekhov",
            cinematographer: "Ksenia Sereda",
            editor: "Igor Litoninsky",
            composer: "Evgueni Galperine",
            studio: "Non-Stop Production",
            focus: "Balagov constructs a suffocating, intensely visceral visual landscape dominated entirely by the suffocating, symbolic colors of green and rust red, forcing the viewer to intimately witness profound, physical PTSD.",
            plot: "In the devastated, starving ruins of Leningrad immediately following World War II, two severely traumatized young women attempt to rebuild their shattered lives and discover meaning in an environment defined by unimaginable death.",
            releaseDate: "May 16, 2019",
            country: "Russia"
        },
        {
            title: "Closeness",
            year: 2017,
            director: "Kantemir Balagov",
            writer: "Kantemir Balagov",
            cinematographer: "Artem Emelyanov",
            editor: "Kantemir Balagov",
            composer: "N/A",
            studio: "Example of Intonation (Alexander Sokurov Fund)",
            focus: "Balagov's debut uses incredibly tight, claustrophobic 4:3 Academy framing and deeply saturated, aggressive color lighting to amplify the unbearable tension of ethnic tribalism and familial suffocation.",
            plot: "In 1998 in the North Caucasus, a Jewish family's life is thrown into absolute chaos when the youngest son and his fiancée are kidnapped, forcing his rebellious sister to make unimaginable sacrifices to pay the ransom.",
            releaseDate: "May 24, 2017",
            country: "Russia"
        }
    ],
    'kirill-serebrennikov': [
        {
            title: "The Student",
            year: 2016,
            director: "Kirill Serebrennikov",
            writer: "Kirill Serebrennikov",
            cinematographer: "Vladislav Opelyants",
            editor: "Yury Karikh",
            composer: "Ilya Demutsky",
            studio: "Hype Film",
            focus: "A blistering, aggressive critique of rising religious fundamentalism, employing frantic, sweeping camerawork and a deeply cynical tone to highlight the terrifying power of unchecked fanaticism in modern society.",
            plot: "A deeply troubled high school student becomes dangerously obsessed with a fundamentalist, literal interpretation of the Bible, launching a terrifying, escalating crusade against his science teacher and the perceived immorality of his peers.",
            releaseDate: "May 13, 2016",
            country: "Russia"
        },
        {
            title: "Leto",
            year: 2018,
            director: "Kirill Serebrennikov",
            writer: "Mikhail Idov / Lili Idova / Kirill Serebrennikov",
            cinematographer: "Vladislav Opelyants",
            editor: "Yury Karikh",
            composer: "Ilya Demutsky",
            studio: "Hype Film / Kinovista",
            focus: "A joyous, rebellious homage to 1980s Leningrad underground rock. Shot in gorgeous, fluid black-and-white, intermittently bursting into chaotic, animated, musical fantasies to capture the youthful spirit of artistic defiance.",
            plot: "In the early 1980s, a burgeoning, underground rock music scene begins to thrive in Leningrad, focusing on the complicated, creative friendship and love triangle between rock pioneer Mike Naumenko and the legendary Viktor Tsoi.",
            releaseDate: "May 9, 2018",
            country: "Russia / France"
        }
    ],
    'boris-khlebnikov': [
        {
            title: "Arrhythmia",
            year: 2017,
            director: "Boris Khlebnikov",
            writer: "Natalia Meshchaninova / Boris Khlebnikov",
            cinematographer: "Alisher Khamidkhodzhaev",
            editor: "Ivan Lebedev / Yulia Batalova",
            composer: "N/A",
            studio: "Mars Media Entertainment / CTB Film Company",
            focus: "A raw, deeply empathetic slice-of-life drama. Khlebnikov employs a highly kinetic, restless documentary-style camera to seamlessly blur the boundary between the frantic, life-or-death stress of a paramedic's job and his crumbling marriage.",
            plot: "A deeply devoted but heavily alcoholic young paramedic struggles to save lives while navigating the soul-crushing bureaucracy of the Russian healthcare system, even as his wife reaches her breaking point and files for divorce.",
            releaseDate: "June 13, 2017",
            country: "Russia / Finland / Germany"
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
    console.log("Starting TMDB fetch and database update for Russian Filmmakers...");
    
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
                    if (!fs.existsSync(path.join(POSTERS_DIR, `${m.id}.jpg`))) {
                        fs.copyFileSync(path.join(POSTERS_DIR, 'placeholder.jpg'), path.join(POSTERS_DIR, `${m.id}.jpg`));
                    }
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
    console.log("Successfully updated temp_data.js with Russian films!");
}

run();
