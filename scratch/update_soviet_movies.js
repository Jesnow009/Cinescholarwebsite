const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'sergei-eisenstein': [
        {
            title: "Battleship Potemkin",
            year: 1925,
            director: "Sergei Eisenstein",
            writer: "Sergei Eisenstein",
            cinematographer: "Eduard Tisse",
            editor: "Sergei Eisenstein",
            composer: "Edmund Meisel",
            studio: "Mosfilm",
            focus: "The monumental codification of Soviet Montage theory. Eisenstein utilizes aggressive intellectual montage, rapid rhythmic cutting, and striking compositional geometries to evoke a visceral, revolutionary mass consciousness.",
            plot: "Based on the true historical events of 1905, the crew of a Russian battleship violently mutinies against their brutal, oppressive officers, sparking a massive, tragic civilian uprising in the city of Odessa.",
            releaseDate: "December 21, 1925",
            country: "Soviet Union"
        },
        {
            title: "October",
            year: 1928,
            director: "Sergei Eisenstein / Grigori Aleksandrov",
            writer: "Sergei Eisenstein / Grigori Aleksandrov",
            cinematographer: "Eduard Tisse",
            editor: "Sergei Eisenstein",
            composer: "Edmund Meisel",
            studio: "Sovkino",
            focus: "A radical experiment in 'intellectual montage,' juxtaposing disparate images (such as mechanical peacocks and religious idols) to create abstract political and historical meaning outside of traditional narrative.",
            plot: "A sweeping, chaotic, and heavily stylized recreation of the 1917 October Revolution in Russia, detailing the violent overthrow of the Provisional Government and the triumphant rise of the Bolsheviks.",
            releaseDate: "March 14, 1928",
            country: "Soviet Union"
        },
        {
            title: "Alexander Nevsky",
            year: 1938,
            director: "Sergei Eisenstein",
            writer: "Sergei Eisenstein / Pyotr Pavlenko",
            cinematographer: "Eduard Tisse",
            editor: "Sergei Eisenstein",
            composer: "Sergei Prokofiev",
            studio: "Mosfilm",
            focus: "Eisenstein's first sound film merges audio and visual into a 'vertical montage,' perfectly synchronizing the epic, icy geometry of the battle sequences with Sergei Prokofiev's thunderous, driving orchestral score.",
            plot: "In the 13th century, a visionary Russian prince is called upon to unite his people and lead a massive, peasant-led army to defend the city of Novgorod against an invasion by the terrifying Teutonic Knights.",
            releaseDate: "November 25, 1938",
            country: "Soviet Union"
        }
    ],
    'vsevolod-pudovkin': [
        {
            title: "Mother",
            year: 1926,
            director: "Vsevolod Pudovkin",
            writer: "Nathan Zarkhi",
            cinematographer: "Anatoli Golovnya",
            editor: "Vsevolod Pudovkin",
            composer: "David Blok",
            studio: "Mezhrabpom-Rus",
            focus: "Contrasting Eisenstein's focus on the masses, Pudovkin grounds Soviet montage in individual psychological realism, using lyrical cross-cutting to align the protagonist's emotional awakening with the rising tide of revolution.",
            plot: "During the 1905 Russian Revolution, a poor, politically naive working-class mother is unwittingly manipulated into betraying her radicalized son, leading her to experience a profound, tragic political awakening.",
            releaseDate: "October 11, 1926",
            country: "Soviet Union"
        },
        {
            title: "The End of St. Petersburg",
            year: 1927,
            director: "Vsevolod Pudovkin",
            writer: "Nathan Zarkhi",
            cinematographer: "Anatoli Golovnya",
            editor: "Vsevolod Pudovkin",
            composer: "N/A",
            studio: "Mezhrabpom-Rus",
            focus: "A breathtakingly dynamic exploration of the city as a living organism, utilizing rapid-fire montage to contrast the cold, monumental architecture of the tsarist regime with the explosive kinetic energy of the striking workers.",
            plot: "A naive, desperately poor peasant travels to the city to find work, only to be drafted into the horrors of World War I, ultimately returning to join the Bolsheviks in the storming of the Winter Palace.",
            releaseDate: "November 6, 1927",
            country: "Soviet Union"
        },
        {
            title: "Storm Over Asia",
            year: 1928,
            director: "Vsevolod Pudovkin",
            writer: "Osip Brik",
            cinematographer: "Anatoli Golovnya",
            editor: "Vsevolod Pudovkin",
            composer: "N/A",
            studio: "Mezhrabpom-Rus",
            focus: "Pudovkin expands his montage theory to an epic, sweeping landscape, utilizing the vast, windy steppes of Mongolia to visually parallel the rising, uncontrollable force of indigenous rebellion against imperialism.",
            plot: "In 1918 Mongolia, a simple trapper is captured by British occupying forces and unexpectedly discovered to be a descendant of Genghis Khan, leading the British to attempt to install him as a puppet ruler.",
            releaseDate: "November 10, 1928",
            country: "Soviet Union"
        }
    ],
    'mikhail-kalatozov': [
        {
            title: "The Cranes Are Flying",
            year: 1957,
            director: "Mikhail Kalatozov",
            writer: "Viktor Rozov",
            cinematographer: "Sergei Urusevsky",
            editor: "Mariya Timofeyeva",
            composer: "Moisei Vainberg",
            studio: "Mosfilm",
            focus: "A revolutionary departure from Stalinist realism. Kalatozov and Urusevsky utilize an incredibly fluid, weightless handheld camera and dramatic, expressive angles to externalize the chaotic emotional devastation of war.",
            plot: "The deep, passionate romance between two young lovers in Moscow is suddenly and tragically shattered when the man volunteers for the front lines of World War II, leaving the woman to endure the horrors of the home front.",
            releaseDate: "October 12, 1957",
            country: "Soviet Union"
        },
        {
            title: "I Am Cuba",
            year: 1964,
            director: "Mikhail Kalatozov",
            writer: "Yevgeny Yevtushenko / Enrique Pineda Barnet",
            cinematographer: "Sergei Urusevsky",
            editor: "N. Glagoleva",
            composer: "Carlos Fariñas",
            studio: "Mosfilm / ICAIC",
            focus: "A dizzying, hallucinatory masterpiece of extreme camera acrobatics, featuring impossibly long, continuous tracking shots that glide through buildings and over crowds to capture the fever-dream birth of the Cuban Revolution.",
            plot: "Told through four distinct, interconnected vignettes, the film explores the extreme disparity, corruption, and exploitation of pre-revolutionary Cuba, culminating in the fiery uprising of the peasant class.",
            releaseDate: "November 2, 1964",
            country: "Soviet Union / Cuba"
        },
        {
            title: "The Letter Never Sent",
            year: 1960,
            director: "Mikhail Kalatozov",
            writer: "Grigori Koltunov / Valeri Osika / Viktor Rozov",
            cinematographer: "Sergei Urusevsky",
            editor: "Mariya Timofeyeva",
            composer: "Nikolai Kryukov",
            studio: "Mosfilm",
            focus: "Kalatozov pushes the limits of survival cinema with raw, immersive, handheld cinematography in brutal natural environments, using the suffocating smoke of forest fires and freezing snow to convey man's struggle against nature.",
            plot: "Four geologists on an arduous, highly successful diamond-hunting expedition in the remote Siberian taiga are suddenly trapped by a massive, apocalyptic forest fire, turning their journey into a desperate, harrowing fight for survival.",
            releaseDate: "November 12, 1960",
            country: "Soviet Union"
        }
    ],
    'grigori-chukhrai': [
        {
            title: "Ballad of a Soldier",
            year: 1959,
            director: "Grigori Chukhrai",
            writer: "Valentin Yezhov / Grigori Chukhrai",
            cinematographer: "Vladimir Nikolayev / Era Savelyeva",
            editor: "Mariya Timofeyeva",
            composer: "Mikhail Ziv",
            studio: "Mosfilm",
            focus: "A poignant, lyrically beautiful piece of the post-Stalin 'Thaw,' utilizing a gentle, episodic road-movie structure and tender, humanist cinematography to focus entirely on the personal, rather than political, tragedy of war.",
            plot: "A young Soviet soldier is granted a brief, six-day leave for a heroic act. As he desperately attempts to travel home to embrace his mother and fix her roof, he continually sacrifices his time to help the civilians he meets.",
            releaseDate: "December 1, 1959",
            country: "Soviet Union"
        },
        {
            title: "The Forty-First",
            year: 1956,
            director: "Grigori Chukhrai",
            writer: "Grigori Koltunov",
            cinematographer: "Sergei Urusevsky",
            editor: "Mariya Timofeyeva",
            composer: "Nikolai Kryukov",
            studio: "Mosfilm",
            focus: "Urusevsky's stunning, saturated color cinematography beautifully captures the vast, arid expanse of the desert and the crashing, violent seas, serving as a sweeping canvas for an intimate, ideologically conflicted romance.",
            plot: "During the Russian Civil War, a hardened female Red Army sniper—who has killed exactly forty White Guards—is tasked with escorting an aristocratic White Army prisoner, leading to a passionate, doomed romance when they are marooned together.",
            releaseDate: "October 22, 1956",
            country: "Soviet Union"
        }
    ],
    'andrei-tarkovsky': [
        {
            title: "Andrei Rublev",
            year: 1971,
            director: "Andrei Tarkovsky",
            writer: "Andrei Tarkovsky / Andrei Konchalovsky",
            cinematographer: "Vadim Yusov",
            editor: "Tatyana Egorycheva / Lyudmila Feiginova / Olga Shevkunenko",
            composer: "Vyacheslav Ovchinnikov",
            studio: "Mosfilm",
            focus: "A towering, episodic epic of muddy, visceral realism. Tarkovsky utilizes incredibly dense, textured black-and-white wide shots to explore the agonizing spiritual burden of the artist amidst a savage, medieval world.",
            plot: "The life of the legendary 15th-century Russian icon painter Andrei Rublev is told through a series of loosely connected, brutal vignettes that challenge his faith, his artistry, and his understanding of humanity.",
            releaseDate: "December 24, 1971",
            country: "Soviet Union"
        },
        {
            title: "Stalker",
            year: 1979,
            director: "Andrei Tarkovsky",
            writer: "Andrei Tarkovsky",
            cinematographer: "Aleksandr Knyazhinsky / Georgy Rerberg",
            editor: "Lyudmila Feiginova",
            composer: "Eduard Artemyev",
            studio: "Mosfilm",
            focus: "The ultimate realization of Tarkovsky's 'sculpting in time' philosophy, employing impossibly long, slow, hypnotic tracking shots across a decaying, water-logged industrial landscape to induce a profound state of spiritual meditation.",
            plot: "In a heavily guarded, post-apocalyptic wasteland, a melancholy guide known as a Stalker leads a cynical writer and a quiet scientist into 'The Zone,' a mysterious, sentient area containing a room that supposedly grants a person's deepest desires.",
            releaseDate: "May 25, 1979",
            country: "Soviet Union"
        },
        {
            title: "Mirror",
            year: 1975,
            director: "Andrei Tarkovsky",
            writer: "Andrei Tarkovsky / Aleksandr Misharin",
            cinematographer: "Georgy Rerberg",
            editor: "Lyudmila Feiginova",
            composer: "Eduard Artemyev",
            studio: "Mosfilm",
            focus: "A deeply abstract, non-linear masterwork of memory, utilizing a fluid mixture of color, sepia, and historical newsreel footage to create a dreamlike, stream-of-consciousness exploration of childhood and national trauma.",
            plot: "A dying poet in his forties reflects back upon his life, drifting seamlessly through fragmented memories of his mother, the traumatic events of World War II, his childhood in the countryside, and his failing marriage.",
            releaseDate: "March 7, 1975",
            country: "Soviet Union"
        },
        {
            title: "Solaris",
            year: 1972,
            director: "Andrei Tarkovsky",
            writer: "Andrei Tarkovsky / Friedrich Gorenstein",
            cinematographer: "Vadim Yusov",
            editor: "Lyudmila Feiginova",
            composer: "Eduard Artemyev",
            studio: "Mosfilm",
            focus: "Tarkovsky subverts the sci-fi genre by turning the camera inward, using long, contemplative takes and shifting color palettes to explore profound psychological grief and the boundaries of human consciousness.",
            plot: "A psychologist is sent to a decaying space station orbiting the mysterious oceanic planet Solaris to investigate the crew's descent into madness, only to be confronted by a physical manifestation of his dead wife.",
            releaseDate: "March 20, 1972",
            country: "Soviet Union"
        },
        {
            title: "Ivan's Childhood",
            year: 1962,
            director: "Andrei Tarkovsky",
            writer: "Vladimir Bogomolov / Mikhail Papava",
            cinematographer: "Vadim Yusov",
            editor: "Lyudmila Feiginova",
            composer: "Vyacheslav Ovchinnikov",
            studio: "Mosfilm",
            focus: "Tarkovsky's debut contrasts the stark, muddy, and terrifying reality of war on the Eastern Front with the luminous, hauntingly beautiful dream sequences of a lost childhood, captured through highly expressive cinematography.",
            plot: "During World War II, an orphaned, fiercely vengeful twelve-year-old boy works as a spy for the Soviet army, repeatedly undertaking incredibly dangerous reconnaissance missions across the treacherous German lines.",
            releaseDate: "April 6, 1962",
            country: "Soviet Union"
        }
    ],
    'elem-klimov': [
        {
            title: "Come and See",
            year: 1985,
            director: "Elem Klimov",
            writer: "Elem Klimov / Ales Adamovich",
            cinematographer: "Alexei Rodonov",
            editor: "Valeria Belova",
            composer: "Oleg Yanchenko",
            studio: "Mosfilm / Belarusfilm",
            focus: "A devastating, apocalyptic descent into the horrors of war. Klimov uses extreme, agonizingly prolonged close-ups, Steadicam tracking shots, and a deeply unsettling, distorted soundscape to fully immerse the viewer in psychological trauma.",
            plot: "In 1943 Belarus, an innocent young boy joins the Soviet resistance movement, but a horrific, apocalyptic encounter with the monstrous brutality of the Nazi SS forces irrevocably shatters his sanity and his youth.",
            releaseDate: "July 9, 1985",
            country: "Soviet Union"
        },
        {
            title: "Agony",
            year: 1981,
            director: "Elem Klimov",
            writer: "Semyon Lungin / Ilya Nusinov",
            cinematographer: "Leonid Kalashnikov",
            editor: "Valeria Belova",
            composer: "Alfred Schnittke",
            studio: "Mosfilm",
            focus: "An operatic, heavily stylized, and delirious historical epic, characterized by grotesque, wildly theatrical performances and a frenzied, chaotic tone that mirrors the impending collapse of the Russian Empire.",
            plot: "During the chaotic final days of the Romanov dynasty, the bizarre, mystic charlatan Grigori Rasputin exerts a massive, destructive, and increasingly unhinged influence over the weak-willed Tsar Nicholas II and his family.",
            releaseDate: "January 1, 1981",
            country: "Soviet Union"
        }
    ],
    'andrei-konchalovsky': [
        {
            title: "Siberiade",
            year: 1979,
            director: "Andrei Konchalovsky",
            writer: "Andrei Konchalovsky / Valentin Yezhov",
            cinematographer: "Levan Paatashvili",
            editor: "Valentina Kulagina",
            composer: "Eduard Artemyev",
            studio: "Mosfilm",
            focus: "A sweeping, multi-generational saga told with epic scope, utilizing Eduard Artemyev's groundbreaking electronic score and vast, majestic tracking shots across the endless Siberian landscape to mirror the march of Soviet history.",
            plot: "Spanning from the early 1900s through the 1960s, a bitter, decades-long feud between two deeply contrasting families—one wealthy, one poor—plays out against the backdrop of war, revolution, and the discovery of oil in a remote Siberian village.",
            releaseDate: "January 1, 1979",
            country: "Soviet Union"
        },
        {
            title: "The Story of Asya Klyachina",
            year: 1987,
            director: "Andrei Konchalovsky",
            writer: "Rolf Schünzel",
            cinematographer: "Georgy Rerberg",
            editor: "L. Pokrovskaya",
            composer: "Vyacheslav Ovchinnikov",
            studio: "Mosfilm",
            focus: "Shelved for twenty years due to its uncompromising realism, the film employs a stark, documentary-style approach, utilizing non-professional actors and unscripted dialogue to capture the raw truth of Soviet rural life.",
            plot: "On a collective farm, a pregnant, fiercely independent young woman stubbornly refuses to marry the unreliable father of her child, instead choosing to endure the hardships and gossip of the rural community on her own terms.",
            releaseDate: "December 1, 1987",
            country: "Soviet Union"
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
    console.log("Starting TMDB fetch and database update for Soviet Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Soviet films!");
}

run();
