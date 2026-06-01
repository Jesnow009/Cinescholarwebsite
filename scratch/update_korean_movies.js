const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'bong-joon-ho': [
        {
            title: "Memories of Murder",
            year: 2003,
            director: "Bong Joon-ho",
            writer: "Bong Joon-ho / Shim Sung-bo",
            cinematographer: "Kim Hyung-koo",
            editor: "Kim Sun-min",
            composer: "Taro Iwashiro",
            studio: "CJ Entertainment / Sidus Pictures",
            focus: "A masterful subversion of the police procedural. Bong blends pitch-black comedy with an overwhelming sense of institutional incompetence and despair, utilizing deep focus wide shots to emphasize the killer's elusive, haunting presence in the rural landscape.",
            plot: "In 1986, two vastly different, highly flawed rural detectives desperately attempt to solve the horrifying string of serial murders terrifying a small, rain-drenched South Korean province.",
            releaseDate: "April 25, 2003",
            country: "South Korea"
        },
        {
            title: "The Host",
            year: 2006,
            director: "Bong Joon-ho",
            writer: "Bong Joon-ho / Baek Chul-hyun",
            cinematographer: "Kim Hyung-koo",
            editor: "Kim Sun-min",
            composer: "Lee Byung-woo",
            studio: "Chungeorahm Film",
            focus: "Bong brilliantly weaponizes the monster movie genre to deliver a scathing critique of American imperialism and government apathy, focusing not on the creature, but on the chaotic, incredibly endearing dysfunction of a marginalized family.",
            plot: "A massive, terrifying mutant creature emerges from the Han River and kidnaps a young girl, forcing her deeply dysfunctional, working-class family to band together and fight the government to save her.",
            releaseDate: "July 27, 2006",
            country: "South Korea"
        },
        {
            title: "Mother",
            year: 2009,
            director: "Bong Joon-ho",
            writer: "Bong Joon-ho / Park Eun-kyo",
            cinematographer: "Hong Kyung-pyo",
            editor: "Moon Sae-kyung",
            composer: "Lee Byung-woo",
            studio: "Barunson Co. / CJ Entertainment",
            focus: "A deeply unsettling psychological thriller. Bong frequently isolates the titular character in center-framed, extreme close-ups, blurring the line between pure, unconditional maternal love and terrifying, destructive obsession.",
            plot: "When her quiet, intellectually disabled son is suddenly and wrongfully accused of the brutal murder of a young girl, a desperately devoted mother launches her own obsessive, dangerous investigation to clear his name.",
            releaseDate: "May 28, 2009",
            country: "South Korea"
        },
        {
            title: "Parasite",
            year: 2019,
            director: "Bong Joon-ho",
            writer: "Bong Joon-ho / Han Jin-won",
            cinematographer: "Hong Kyung-pyo",
            editor: "Yang Jin-mo",
            composer: "Jung Jae-il",
            studio: "Barunson E&A / CJ Entertainment",
            focus: "A flawless, surgically precise architectural thriller. Bong uses verticality—stairs, basements, and cascading rain—to visually represent rigid class divides, executing a breathtaking tonal shift from dark comedy to horrific tragedy.",
            plot: "A desperately poor, unemployed family slowly and meticulously infiltrates the home of a wealthy, oblivious upper-class family, only to uncover a dark, terrifying secret hidden deep within the basement.",
            releaseDate: "May 30, 2019",
            country: "South Korea"
        }
    ],
    'kim-ki-young': [
        {
            title: "The Housemaid",
            year: 1960,
            director: "Kim Ki-young",
            writer: "Kim Ki-young",
            cinematographer: "Kim Deok-jin",
            editor: "Kim Ki-young",
            composer: "Han Sang-gi",
            studio: "Hanguk Yesul Film Company",
            focus: "A foundational masterpiece of Korean cinema. Kim utilizes suffocating, intensely claustrophobic framing and expressionistic lighting within a rigid two-story house to externalize extreme psychosexual tension and bourgeois anxiety.",
            plot: "The fragile, seemingly perfect domestic life of an ambitious middle-class family is violently shattered when they hire an unstable, manipulative, and deeply obsessive young woman as their new housemaid.",
            releaseDate: "November 3, 1960",
            country: "South Korea"
        },
        {
            title: "Woman of Fire",
            year: 1971,
            director: "Kim Ki-young",
            writer: "Kim Ki-young",
            cinematographer: "Jung Il-sung",
            editor: "Kim Ki-young",
            composer: "Han Sang-gi",
            studio: "Woo-jin Film",
            focus: "A delirious, intensely saturated color remake of his own classic. Kim pushes the psychological horror into full-blown melodrama, using garish reds and blues to heighten the surreal, suffocating madness of the central love triangle.",
            plot: "A naive young woman from the countryside moves to Seoul and takes a job as a maid for a wealthy family, where she becomes violently entangled in an obsessive, horrific sexual dynamic with her employer.",
            releaseDate: "April 1, 1971",
            country: "South Korea"
        }
    ],
    'im-kwon-taek': [
        {
            title: "Sopyonje",
            year: 1993,
            director: "Im Kwon-taek",
            writer: "Kim Myung-kon",
            cinematographer: "Jung Il-sung",
            editor: "Park Soon-deok",
            composer: "Kim Soo-chul",
            studio: "Taehung Pictures",
            focus: "Im employs stunning, unbroken long takes and vast landscape cinematography to deeply intertwine the agonizing, physical pain of his characters with the haunting, mournful wail of traditional pansori music.",
            plot: "An obsessed, deeply uncompromising itinerant pansori singer adopts an orphaned boy and girl, subjecting them to grueling, abusive training in a desperate attempt to master the traditional Korean musical art form.",
            releaseDate: "April 17, 1993",
            country: "South Korea"
        },
        {
            title: "Chunhyang",
            year: 2000,
            director: "Im Kwon-taek",
            writer: "Kang Hye-yeon / Cho Sang-hyun",
            cinematographer: "Jung Il-sung",
            editor: "Park Soon-deok",
            composer: "Kim Jung-kil",
            studio: "Taehung Pictures",
            focus: "A brilliant, culturally resonant adaptation that uses a live, modern pansori performance to rhythmically narrate and dictate the pacing of the lush, deeply traditional historical romance unfolding on screen.",
            plot: "In 18th-century Korea, the son of a noble governor secretly marries the beautiful daughter of a courtesan, but their forbidden love is severely tested when a cruel, corrupt new magistrate takes power.",
            releaseDate: "January 29, 2000",
            country: "South Korea"
        }
    ],
    'park-chan-wook': [
        {
            title: "Sympathy for Mr. Vengeance",
            year: 2002,
            director: "Park Chan-wook",
            writer: "Park Chan-wook / Lee Jae-soon / Lee Moo-young / Lee Yong-jong",
            cinematographer: "Kim Byeong-il",
            editor: "Kim Sang-bum",
            composer: "Uhuhboo Project",
            studio: "Studio Box / CJ Entertainment",
            focus: "A stark, agonizingly bleak anti-thriller. Park strips away all stylization, using incredibly quiet, static, wide framing to observe an inescapable chain reaction of devastating, senseless violence born of desperation.",
            plot: "A desperate, deaf-mute factory worker kidnaps the young daughter of a wealthy executive to pay for his sister's kidney transplant, sparking a catastrophic, unrelenting cycle of brutal revenge and tragedy.",
            releaseDate: "March 29, 2002",
            country: "South Korea"
        },
        {
            title: "Oldboy",
            year: 2003,
            director: "Park Chan-wook",
            writer: "Hwang Jo-yun / Lim Joon-hyung / Park Chan-wook",
            cinematographer: "Chung Chung-hoon",
            editor: "Kim Sang-bum",
            composer: "Jo Yeong-wook",
            studio: "Egg Film / Showeast",
            focus: "An operatic, wildly stylized revenge epic. Park employs hyper-kinetic camera movements, dizzying editing, and a legendary, unbroken single-take hallway fight sequence to externalize fifteen years of pent-up rage.",
            plot: "After being inexplicably kidnapped and locked in a windowless hotel room for fifteen years, a man is suddenly released, embarking on a desperate, violently destructive quest to uncover the identity of his captor.",
            releaseDate: "November 21, 2003",
            country: "South Korea"
        },
        {
            title: "The Handmaiden",
            year: 2016,
            director: "Park Chan-wook",
            writer: "Chung Seo-kyung / Park Chan-wook",
            cinematographer: "Chung Chung-hoon",
            editor: "Kim Sang-bum / Kim Jae-bum",
            composer: "Jo Yeong-wook",
            studio: "Moho Film / Yong Film",
            focus: "A dizzyingly erotic, structurally complex puzzle box. Park uses immaculate, hyper-detailed production design and extremely fluid, subjective camerawork to continually shift perspectives, deceiving both his characters and his audience.",
            plot: "During the Japanese occupation of Korea, a young female pickpocket is hired as a handmaiden to a fragile Japanese heiress as part of a complex con, but the two women unexpectedly fall deeply in love.",
            releaseDate: "June 1, 2016",
            country: "South Korea"
        },
        {
            title: "Decision to Leave",
            year: 2022,
            director: "Park Chan-wook",
            writer: "Chung Seo-kyung / Park Chan-wook",
            cinematographer: "Kim Ji-yong",
            editor: "Kim Sang-bum",
            composer: "Jo Yeong-wook",
            studio: "Moho Film / CJ ENM",
            focus: "A masterful, deeply romantic subversion of the neo-noir genre. Park utilizes highly inventive match cuts, screens-within-screens, and subjective reality to blur the lines between professional investigation and totally consuming desire.",
            plot: "An insomniac, highly meticulous detective begins to investigate a man's suspicious death in the mountains, only to fall deeply and dangerously in love with the prime suspect: the dead man's enigmatic widow.",
            releaseDate: "June 29, 2022",
            country: "South Korea"
        }
    ],
    'kim-jee-woon': [
        {
            title: "A Tale of Two Sisters",
            year: 2003,
            director: "Kim Jee-woon",
            writer: "Kim Jee-woon",
            cinematographer: "Lee Mo-gae",
            editor: "Ko Im-pyo",
            composer: "Lee Byung-woo",
            studio: "Masulpiri Films / Cineclick Asia",
            focus: "Kim elevates the horror genre through incredibly lush, ornate art direction, using William Morris wallpaper and deeply saturated reds to turn a traditional family home into a deeply traumatic, suffocating psychological labyrinth.",
            plot: "After returning home from a mental institution, a young girl and her beloved sister are subjected to the cruel, deeply unsettling behavior of their stepmother, amidst a series of terrifying supernatural occurrences.",
            releaseDate: "June 13, 2003",
            country: "South Korea"
        },
        {
            title: "A Bittersweet Life",
            year: 2005,
            director: "Kim Jee-woon",
            writer: "Kim Jee-woon",
            cinematographer: "Kim Ji-yong",
            editor: "Choi Jae-geun",
            composer: "Dalpalan / Jang Young-gyu",
            studio: "b.o.m. Film Productions Co. / CJ Entertainment",
            focus: "A slick, ultra-stylish neo-noir masterpiece. Kim juxtaposes the cold, immaculate elegance of a high-end hotel with incredibly brutal, bone-crunching violence, focusing purely on aesthetics and doomed romantic stoicism.",
            plot: "A highly efficient, completely loyal mob enforcer’s life is violently destroyed when he makes a single, fleetingly merciful decision regarding his boss's young mistress, leading him on a solitary path of total destruction.",
            releaseDate: "April 1, 2005",
            country: "South Korea"
        },
        {
            title: "I Saw the Devil",
            year: 2010,
            director: "Kim Jee-woon",
            writer: "Park Hoon-jung",
            cinematographer: "Lee Mo-gae",
            editor: "Nam Na-yeong",
            composer: "Mowg",
            studio: "Peppermint Producers / Showbox",
            focus: "An exceptionally brutal, grueling endurance test of a thriller. Kim uses dynamic, incredibly visceral camerawork and extreme gore to fundamentally blur the moral line between a monstrous serial killer and a grieving protagonist.",
            plot: "After his pregnant fiancée is brutally murdered by a psychopathic serial killer, a highly trained secret agent embarks on a sadistic, unrelenting game of cat-and-mouse to torture the killer without actually ending his life.",
            releaseDate: "August 12, 2010",
            country: "South Korea"
        }
    ],
    'lee-chang-dong': [
        {
            title: "Oasis",
            year: 2002,
            director: "Lee Chang-dong",
            writer: "Lee Chang-dong",
            cinematographer: "Choi Yeong-taek",
            editor: "Kim Hyun",
            composer: "Jae-jin Lee",
            studio: "East Film",
            focus: "A fiercely compassionate, uncompromisingly realistic drama. Lee uses a highly naturalistic, documentary-like aesthetic, interrupted by brief, incredibly tender moments of magical realism to visualize pure, unspoken romance.",
            plot: "An irresponsible, socially inept ex-convict strikes up a deep, fiercely unconventional romance with a woman who has severe cerebral palsy, leading to profound misunderstandings and cruel judgments from both of their families.",
            releaseDate: "August 15, 2002",
            country: "South Korea"
        },
        {
            title: "Secret Sunshine",
            year: 2007,
            director: "Lee Chang-dong",
            writer: "Lee Chang-dong",
            cinematographer: "Cho Yong-kyu",
            editor: "Kim Hyun",
            composer: "Lee Jae-jin",
            studio: "Pine House Film",
            focus: "A devastating, deeply agonizing exploration of grief and religion. Lee relies on excruciatingly long, uncomfortably raw takes to force the viewer to witness the absolute limit of human emotional suffering and spiritual betrayal.",
            plot: "After relocating to her deceased husband's rural hometown, a grieving widow attempts to start over, but an unimaginable second tragedy drives her into the arms of a local church, testing her capacity for forgiveness.",
            releaseDate: "May 23, 2007",
            country: "South Korea"
        },
        {
            title: "Poetry",
            year: 2010,
            director: "Lee Chang-dong",
            writer: "Lee Chang-dong",
            cinematographer: "Kim Hyun-seok",
            editor: "Kim Hyun",
            composer: "N/A",
            studio: "Pine House Film / UniKorea",
            focus: "A gentle, deeply haunting character study. Lee juxtaposes the serene, contemplative beauty of searching for inspiration in everyday objects with the grotesque, soul-crushing reality of moral responsibility and impending dementia.",
            plot: "A gentle, eccentric grandmother suffering from the early stages of Alzheimer's disease enrolls in a local poetry class just as she discovers her teenage grandson's horrifying involvement in a tragic, violent crime.",
            releaseDate: "May 13, 2010",
            country: "South Korea"
        },
        {
            title: "Burning",
            year: 2018,
            director: "Lee Chang-dong",
            writer: "Oh Jung-mi / Lee Chang-dong",
            cinematographer: "Hong Kyung-pyo",
            editor: "Kim Hyun",
            composer: "Mowg",
            studio: "Pine House Film / NHK / CGV Arthouse",
            focus: "A brilliant, smoldering enigma of a film. Lee and DP Hong Kyung-pyo utilize deeply atmospheric, 'magic hour' cinematography and an unbearably slow build of tension to explore class resentment, toxic masculinity, and ambiguous truth.",
            plot: "A struggling, working-class delivery boy reconnects with a childhood friend, but becomes consumed by intense jealousy, suspicion, and dread when she returns from Africa with an incredibly wealthy, enigmatic young man.",
            releaseDate: "May 17, 2018",
            country: "South Korea"
        }
    ],
    'hong-sang-soo': [
        {
            title: "The Day a Pig Fell Into the Well",
            year: 1996,
            director: "Hong Sang-soo",
            writer: "Hong Sang-soo / Jeong Dae-seong / Yeo Hye-young / Kim An-na",
            cinematographer: "Cho Dong-kwan",
            editor: "Park Gok-ji",
            composer: "Ok Kil-sung",
            studio: "Dong-a Export Co.",
            focus: "Hong's bleak, fragmented debut establishes his obsession with fractured narratives. He utilizes a cold, detached visual style to brutally intersect the lives of four desperately unhappy people, completely devoid of sentimentality.",
            plot: "The deeply interconnected, profoundly miserable lives of an unsuccessful writer, his married lover, her germaphobic husband, and an obsessively devoted ticket-seller spiral tragically out of control over the course of several days.",
            releaseDate: "May 4, 1996",
            country: "South Korea"
        },
        {
            title: "Right Now, Wrong Then",
            year: 2015,
            director: "Hong Sang-soo",
            writer: "Hong Sang-soo",
            cinematographer: "Park Hong-yeol",
            editor: "Hahm Sung-won",
            composer: "Jeong Yong-jin",
            studio: "Jeonwonsa Film",
            focus: "The pinnacle of Hong's signature style. He utilizes extremely long, unbroken takes punctuated by his famous, sudden zoom-ins to capture the subtle, drunken nuances of awkward, deeply human conversation across two parallel realities.",
            plot: "An art film director arrives in Suwon a day early and strikes up a conversation with an aspiring painter; the film then plays out their encounter twice, highlighting how tiny differences in honesty completely alter their dynamic.",
            releaseDate: "September 24, 2015",
            country: "South Korea"
        }
    ],
    'na-hong-jin': [
        {
            title: "The Chaser",
            year: 2008,
            director: "Na Hong-jin",
            writer: "Na Hong-jin / Shinho Lee / Hong Won-chan",
            cinematographer: "Lee Sung-je",
            editor: "Sun-min Kim",
            composer: "Choi Yong-rock / Kim Jun-seok",
            studio: "Bidangil Pictures / Showbox",
            focus: "A breathless, violently kinetic thriller that entirely subverts the 'whodunit' genre. Na utilizes frantic, handheld nighttime cinematography through narrow, steep alleyways to create an unbearable sense of terrifying urgency and incompetence.",
            plot: "A corrupt ex-detective turned pimp desperately races against time to locate his missing sex workers, quickly realizing they have all been targeted by an incredibly sadistic serial killer who immediately confesses.",
            releaseDate: "February 14, 2008",
            country: "South Korea"
        },
        {
            title: "The Yellow Sea",
            year: 2010,
            director: "Na Hong-jin",
            writer: "Na Hong-jin",
            cinematographer: "Lee Sung-je",
            editor: "Kim Sun-min",
            composer: "Jang Young-gyu / Lee Byung-hoon",
            studio: "Popcorn Film / Fox International Productions Co.",
            focus: "An exhausting, utterly brutal masterpiece of action cinema. Na pushes the limits of physical endurance with shockingly violent, hatchet-wielding brawls and massive, chaotic foot chases through freezing, desolate urban landscapes.",
            plot: "A desperately indebted taxi driver in Yanji agrees to cross the Yellow Sea into South Korea to carry out a hit, but quickly finds himself framed for murder and hunted by both the police and two warring crime syndicates.",
            releaseDate: "December 22, 2010",
            country: "South Korea"
        },
        {
            title: "The Wailing",
            year: 2016,
            director: "Na Hong-jin",
            writer: "Na Hong-jin",
            cinematographer: "Hong Kyung-pyo",
            editor: "Kim Sun-min",
            composer: "Jang Young-gyu / Dalpalan",
            studio: "Side Mirror / Fox International Productions Korea",
            focus: "A deeply terrifying, genre-defying descent into apocalyptic horror. Na utilizes torrential rain, suffocating rural isolation, and a chaotic, cacophonous shamanic ritual sequence to create a truly overwhelming sense of total spiritual dread.",
            plot: "A bumbling rural policeman is forced to confront pure, unimaginable evil when a mysterious, terrifying sickness begins spreading through his small mountain village, driving the locals to commit horrifying murders.",
            releaseDate: "May 12, 2016",
            country: "South Korea"
        }
    ],
    'kim-ki-duk': [
        {
            title: "Spring, Summer, Fall, Winter... and Spring",
            year: 2003,
            director: "Kim Ki-duk",
            writer: "Kim Ki-duk",
            cinematographer: "Baek Dong-hyeon",
            editor: "Kim Ki-duk",
            composer: "Ji Bark",
            studio: "Korea Pictures / LJ Film / Pandora Film",
            focus: "A profoundly tranquil, meditative visual poem. Kim eschews dialogue almost entirely, relying on the breathtaking, cyclical beauty of a single, isolated lake to represent the inevitable, deeply flawed cycle of human existence.",
            plot: "The peaceful, isolated life of an aging Buddhist monk and his young apprentice, living in a small floating temple on a pristine lake, is explored across the shifting, inevitable seasons of life, lust, and regret.",
            releaseDate: "September 19, 2003",
            country: "South Korea / Germany"
        },
        {
            title: "3-Iron",
            year: 2004,
            director: "Kim Ki-duk",
            writer: "Kim Ki-duk",
            cinematographer: "Jang Seong-back",
            editor: "Kim Ki-duk",
            composer: "Slvian",
            studio: "Kim Ki-duk Film / Cineclick Asia",
            focus: "A surreal, nearly dialogue-free exploration of extreme alienation. Kim employs a deeply quiet, observational camera to turn home invasion into a strange, ghostly act of empathy and profound, unspoken emotional connection.",
            plot: "A silent, ghostly young drifter who breaks into empty houses to fix broken appliances unexpectedly encounters an abused housewife, leading the two of them to embark on a bizarre, transient life together.",
            releaseDate: "October 15, 2004",
            country: "South Korea / Japan"
        },
        {
            title: "Pieta",
            year: 2012,
            director: "Kim Ki-duk",
            writer: "Kim Ki-duk",
            cinematographer: "Jo Yeong-jik",
            editor: "Kim Ki-duk",
            composer: "Park In-young",
            studio: "Kim Ki-duk Film",
            focus: "A harsh, deeply allegorical critique of capitalism. Kim contrasts the filthy, oppressive industrial environments of a dying district with extreme, shocking acts of self-mutilation and grotesque religious iconography.",
            plot: "A ruthless, incredibly brutal debt collector, who permanently cripples those who cannot pay him, has his isolated existence violently upended when a mysterious woman arrives claiming to be the mother who abandoned him.",
            releaseDate: "September 6, 2012",
            country: "South Korea"
        }
    ],
    'ryoo-seung-wan': [
        {
            title: "The Unjust",
            year: 2010,
            director: "Ryoo Seung-wan",
            writer: "Park Hoon-jung",
            cinematographer: "Chung Chung-hoon",
            editor: "Kim Sang-bum / Kim Jae-bum",
            composer: "Jo Yeong-wook",
            studio: "Film Train / Outer Curation",
            focus: "A densely plotted, cynical dissection of systemic corruption. Ryoo trades his usual stylish action for gritty, grounded realism, using rapid-fire dialogue and a bleak, claustrophobic aesthetic to highlight deep-rooted moral rot.",
            plot: "When a highly publicized serial killer investigation stalls, a desperate police captain and a deeply corrupt prosecutor engage in a vicious, highly illegal power struggle involving a completely fabricated suspect.",
            releaseDate: "October 28, 2010",
            country: "South Korea"
        },
        {
            title: "Veteran",
            year: 2015,
            director: "Ryoo Seung-wan",
            writer: "Ryoo Seung-wan",
            cinematographer: "Choi Young-hwan",
            editor: "Kim Sang-bum / Kim Jae-bum",
            composer: "Bang Jun-seok",
            studio: "Filmmaker R&K",
            focus: "A perfectly executed, wildly entertaining crowd-pleaser. Ryoo injects pure adrenaline into the police procedural genre, utilizing bone-crunching, expertly choreographed action sequences and sharp, highly kinetic editing.",
            plot: "A tough, fiercely uncompromising police detective goes to war against a wildly arrogant, psychopathic young heir to a powerful corporate syndicate who believes his immense wealth makes him entirely above the law.",
            releaseDate: "August 5, 2015",
            country: "South Korea"
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
    console.log("Starting TMDB fetch and database update for Korean Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Korean films!");
}

run();
