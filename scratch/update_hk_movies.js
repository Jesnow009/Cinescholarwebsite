const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'king-hu': [
        {
            title: "A Touch of Zen",
            year: 1971,
            director: "King Hu",
            writer: "King Hu",
            cinematographer: "Chou Yeh-hsing",
            editor: "King Hu",
            composer: "Wu Ta-chiang",
            studio: "Union Film Company",
            focus: "A monumental wuxia epic that elevates martial arts to spiritual transcendence. Hu revolutionizes action cinema through his incredibly rhythmic, balletic editing, transforming gravity-defying combat in lush bamboo forests into pure visual poetry.",
            plot: "In 14th-century Ming dynasty China, an unmotivated scholar, a mysterious fugitive noblewoman, and a powerful group of Shaolin monks clash with a ruthless, corrupt eunuch's army in a deeply spiritual battle for survival.",
            releaseDate: "November 18, 1971",
            country: "Hong Kong / Taiwan"
        },
        {
            title: "Dragon Inn",
            year: 1967,
            director: "King Hu",
            writer: "King Hu",
            cinematographer: "Hua Hui-ying",
            editor: "King Hu",
            composer: "Wu Ta-chiang",
            studio: "Union Film Company",
            focus: "A foundational masterpiece of the martial arts genre. Hu brilliantly restricts the action primarily to a single, isolated inn, using incredibly tight staging, rapid-fire pacing, and kinetic editing to build unbearable tension before explosive combat.",
            plot: "During the Ming dynasty, a group of highly skilled, righteous martial artists gather at a remote, desolate inn to protect the exiled children of a murdered minister from the heavily armed assassins of a tyrannical eunuch.",
            releaseDate: "October 21, 1967",
            country: "Hong Kong / Taiwan"
        },
        {
            title: "Come Drink with Me",
            year: 1966,
            director: "King Hu",
            writer: "King Hu / Erh Yang",
            cinematographer: "Tadashi Nishimoto",
            editor: "Chiang Hsing-lung",
            composer: "Eddie H. Wang",
            studio: "Shaw Brothers",
            focus: "The film that definitively launched the modern wuxia era. Hu blends traditional Peking Opera acrobatics with intense, rapid-fire cinematic editing, introducing a graceful, fiercely independent female warrior archetype to Hong Kong cinema.",
            plot: "When a powerful governor's son is kidnapped by a ruthless band of outlaws, his highly skilled, deadly sister, known as 'Golden Swallow,' embarks on a dangerous rescue mission with the help of a drunken beggar who is actually a martial arts master.",
            releaseDate: "April 7, 1966",
            country: "Hong Kong"
        }
    ],
    'tsui-hark': [
        {
            title: "Zu Warriors from the Magic Mountain",
            year: 1983,
            director: "Tsui Hark",
            writer: "Shui Ching / Sze-to Cheuk-hon",
            cinematographer: "Bill Wong",
            editor: "David Wu",
            composer: "Kwan Sing-yau",
            studio: "Golden Harvest",
            focus: "A hyper-kinetic, deliriously imaginative explosion of fantasy. Tsui Hark utilizes early, massive practical and optical visual effects to create an unbelievably rapid, chaotic, and relentlessly inventive wuxia universe that completely defies physics.",
            plot: "In ancient China, a young, bumbling soldier fleeing the horrors of civil war accidentally stumbles into a mystical mountain realm, where he must team up with immortal warriors to stop a world-destroying Blood Demon.",
            releaseDate: "February 5, 1983",
            country: "Hong Kong"
        },
        {
            title: "Once Upon a Time in China",
            year: 1991,
            director: "Tsui Hark",
            writer: "Tsui Hark / Yuen Kai-chi / Leung Yiu-ming / Elsa Tang",
            cinematographer: "Arthur Wong / Bill Wong / Chan Tung-chuen / Wilson Chan / Andy Lam / Wong Ngok-tai",
            editor: "Marco Mak",
            composer: "James Wong",
            studio: "Film Workshop / Golden Harvest",
            focus: "Tsui radically revitalizes the legendary folk hero Wong Fei-hung. He combines breathtaking, wire-assisted martial arts choreography with a sweeping, deeply nationalist narrative exploring the painful modernization and foreign exploitation of 19th-century China.",
            plot: "In late 19th-century Canton, legendary martial arts master and physician Wong Fei-hung must protect his clinic, his people, and his culture from the increasingly violent encroachment of ruthless Western imperialists and local corrupt officials.",
            releaseDate: "August 15, 1991",
            country: "Hong Kong"
        },
        {
            title: "The Blade",
            year: 1995,
            director: "Tsui Hark",
            writer: "Tsui Hark / Koan Hui / So Man-sing",
            cinematographer: "Kim-ting Lau",
            editor: "Marco Mak",
            composer: "Raymond Wong",
            studio: "Film Workshop",
            focus: "An exceptionally brutal, nihilistic reimagining of the classic one-armed swordsman tale. Tsui uses chaotic, intensely frenetic handheld camerawork and incredibly rapid, disorienting editing to create an atmosphere of pure, unfiltered savagery.",
            plot: "After losing his arm defending a young woman from a vicious group of bandits, a crippled sword-maker invents a devastating, highly unorthodox new fighting style to exact a bloody, unrelenting revenge.",
            releaseDate: "December 21, 1995",
            country: "Hong Kong"
        }
    ],
    'ann-hui': [
        {
            title: "Boat People",
            year: 1982,
            director: "Ann Hui",
            writer: "Chiu Kang-chien",
            cinematographer: "Huang Chung-shih",
            editor: "Kin Kin",
            composer: "Law Wing-fai",
            studio: "Bluebird Movie Enterprises",
            focus: "A devastating, deeply humanistic cornerstone of the Hong Kong New Wave. Hui utilizes incredibly stark, uncompromising realism to expose the horrific, politically suppressed realities of life in post-war Communist Vietnam.",
            plot: "Three years after the communist takeover of Vietnam, a sympathetic Japanese photojournalist returns to document the country's reconstruction, only to uncover the horrifying, brutal reality of political oppression and desperate citizens trying to flee.",
            releaseDate: "October 13, 1982",
            country: "Hong Kong"
        },
        {
            title: "A Simple Life",
            year: 2012,
            director: "Ann Hui",
            writer: "Susan Chan / Lee En-霖 (Roger Lee)",
            cinematographer: "Nelson Yu Lik-wai",
            editor: "Kwong Chi-leung / Manda Wai",
            composer: "Law Wing-fai",
            studio: "Focus Films / Bona International Film Group",
            focus: "A remarkably tender, profoundly moving character study. Hui eschews melodrama in favor of quiet, deeply observant neo-realism, focusing on incredibly subtle, mundane details to capture the profound depth of an aging servant's lifelong devotion.",
            plot: "After suffering a debilitating stroke, an elderly woman who has worked as a dedicated servant for the same family for over 60 years is forced to move into a nursing home, where she is cared for by the film producer she helped raise.",
            releaseDate: "March 9, 2012",
            country: "Hong Kong"
        }
    ],
    'john-woo': [
        {
            title: "A Better Tomorrow",
            year: 1986,
            director: "John Woo",
            writer: "John Woo",
            cinematographer: "Wong Wing-hang",
            editor: "Kung Wing-leung",
            composer: "Joseph Koo",
            studio: "Film Workshop",
            focus: "The explosive birth of the 'heroic bloodshed' genre. Woo combines intensely romanticized codes of triad brotherhood with highly stylized, hyper-violent slow-motion gunplay, fundamentally changing global action cinema forever.",
            plot: "A highly respected triad counterfeiter attempts to leave the criminal underworld to reconcile with his estranged, righteous younger brother, who has just become a hot-headed police detective, leading to an inevitable, bloody collision.",
            releaseDate: "August 2, 1986",
            country: "Hong Kong"
        },
        {
            title: "The Killer",
            year: 1989,
            director: "John Woo",
            writer: "John Woo",
            cinematographer: "Peter Pau / Wong Wing-hang",
            editor: "Fan Kung-wing",
            composer: "Lowell Lo",
            studio: "Film Workshop / Magnum Films",
            focus: "An operatic, deeply melodramatic masterpiece of violence. Woo juxtaposes intensely graphic, balletic gun battles with overt religious iconography, utilizing slow-motion and sweeping tracking shots to elevate a pulpy crime story into high tragedy.",
            plot: "A highly principled, deeply conflicted triad hitman agrees to take on one final, incredibly dangerous job to pay for the eye surgery of a beautiful nightclub singer whom he accidentally blinded during a previous shootout.",
            releaseDate: "July 6, 1989",
            country: "Hong Kong"
        },
        {
            title: "Hard Boiled",
            year: 1992,
            director: "John Woo",
            writer: "Barry Wong",
            cinematographer: "Wang Wing-hang",
            editor: "John Woo / David Wu / Jack Ah / Kit Wai-man",
            composer: "Michael Gibbs",
            studio: "Milestone Pictures / Golden Princess Film Production",
            focus: "The absolute pinnacle of Woo's kinetic action aesthetics. He orchestrates mind-bogglingly complex, overwhelmingly destructive shootouts, famously culminating in a massive, seamlessly executed, unbroken 2-minute-and-42-second tracking shot through a besieged hospital.",
            plot: "A tough, fiercely independent police inspector teams up with a deeply conflicted undercover cop who has infiltrated a ruthless triad syndicate, leading to a massive, unimaginably violent showdown in a fully functioning hospital.",
            releaseDate: "April 16, 1992",
            country: "Hong Kong"
        }
    ],
    'ringo-lam': [
        {
            title: "City on Fire",
            year: 1987,
            director: "Ringo Lam",
            writer: "Ringo Lam",
            cinematographer: "Andrew Lau",
            editor: "Ming Lam",
            composer: "Teddy Robin",
            studio: "Cinema City",
            focus: "A gritty, incredibly cynical counterpoint to John Woo's romanticism. Lam utilizes a highly realistic, documentary-style aesthetic and claustrophobic framing to explore the suffocating moral ambiguity and inevitable doom of undercover police work.",
            plot: "An exhausted, deeply compromised undercover cop forms a strong, unexpected bond of brotherhood with the ruthless leader of the heavily armed jewelry heist crew he is actively trying to take down.",
            releaseDate: "February 13, 1987",
            country: "Hong Kong"
        },
        {
            title: "Prison on Fire",
            year: 1987,
            director: "Ringo Lam",
            writer: "Nam Yin",
            cinematographer: "Andrew Lau",
            editor: "Ming Lam",
            composer: "Lowell Lo",
            studio: "Cinema City",
            focus: "An intense, deeply claustrophobic prison drama. Lam uses incredibly confined spaces, sweating close-ups, and a stark, highly unsentimental visual style to highlight the brutal corruption of authority and the desperate need for loyalty.",
            plot: "A naive young advertising executive sentenced to prison for manslaughter must navigate an incredibly brutal, violently corrupt penal system with the help of a seasoned, deeply pragmatic veteran inmate.",
            releaseDate: "November 13, 1987",
            country: "Hong Kong"
        }
    ],
    'jackie-chan': [
        {
            title: "Police Story",
            year: 1985,
            director: "Jackie Chan",
            writer: "Jackie Chan / Edward Tang",
            cinematographer: "Cheung Yiu-cho",
            editor: "Peter Cheung",
            composer: "J. Peter Robinson",
            studio: "Golden Way Films / Golden Harvest",
            focus: "A revolutionary blend of martial arts and modern urban action. Chan utilizes wide, unbroken shots to showcase genuinely life-threatening, intensely choreographed practical stunts, proving the complete authenticity of the physical danger on screen.",
            plot: "A dedicated, highly unorthodox Hong Kong police detective must clear his own name after being framed for murder while simultaneously protecting a key witness from a ruthless, heavily armed drug syndicate.",
            releaseDate: "December 14, 1985",
            country: "Hong Kong"
        },
        {
            title: "Project A",
            year: 1983,
            director: "Jackie Chan",
            writer: "Jackie Chan / Edward Tang",
            cinematographer: "Cheung Yiu-cho",
            editor: "Peter Cheung",
            composer: "Michael Lai",
            studio: "Authority Films / Golden Harvest",
            focus: "Chan brilliantly integrates Buster Keaton-esque physical comedy with breathtaking, highly dangerous martial arts choreography, culminating in an iconic, terrifying practical fall from a massive clock tower that redefined action cinema.",
            plot: "In late 19th-century Hong Kong, a fiercely dedicated marine police officer must overcome intense inter-departmental rivalry to team up with the local police and a slick thief to defeat a powerful fleet of ruthless pirates.",
            releaseDate: "December 22, 1983",
            country: "Hong Kong"
        },
        {
            title: "Armor of God",
            year: 1987,
            director: "Jackie Chan",
            writer: "Jackie Chan / Edward Tang / Barry Wong",
            cinematographer: "Peter Ngor / Arthur Wong",
            editor: "Peter Cheung",
            composer: "Michael Lai",
            studio: "Golden Way Films / Paragon Films",
            focus: "A globe-trotting, Indiana Jones-inspired action extravaganza. Chan continues to push the absolute limits of physical human endurance and intricate stunt choreography, famously suffering a near-fatal head injury during the production's opening sequence.",
            plot: "An adventurous, highly skilled treasure hunter is forced to track down the remaining pieces of a legendary, mystical armor set in order to rescue his kidnapped ex-girlfriend from an incredibly bizarre, powerful religious cult.",
            releaseDate: "January 21, 1987",
            country: "Hong Kong"
        }
    ],
    'wong-kar-wai': [
        {
            title: "Days of Being Wild",
            year: 1990,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle",
            editor: "Patrick Tam / Kai Kit-wai",
            composer: "Xavier Cugat",
            studio: "In-Gear Film",
            focus: "The genesis of Wong Kar-wai's definitive style. He and DP Christopher Doyle utilize deeply languid pacing, oppressive humidity, and incredibly lush, melancholic green/gold color palettes to visually capture profound urban isolation and the burden of memory.",
            plot: "In 1960s Hong Kong, a deeply cynical, emotionally abusive playboy recklessly manipulates the lives of several women while embarking on an obsessive, doomed quest to the Philippines to find his biological mother.",
            releaseDate: "December 15, 1990",
            country: "Hong Kong"
        },
        {
            title: "Chungking Express",
            year: 1994,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle / Andrew Lau",
            editor: "William Chang / Kwong Chi-leung",
            composer: "Frankie Chan / Roel A. García",
            studio: "Jet Tone Films",
            focus: "A dizzying, wildly energetic pop-art masterpiece. Wong and Doyle famously utilize extreme step-printing and frantic, handheld camerawork to physically represent the dizzying speed, deep romantic longing, and transient connections of modern city life.",
            plot: "The fiercely independent, intersecting lives of two lovesick Hong Kong police officers are chronicled as they individually attempt to navigate deep heartbreak and striking new romances in the dense, chaotic sprawl of the Chungking Mansions.",
            releaseDate: "July 14, 1994",
            country: "Hong Kong"
        },
        {
            title: "In the Mood for Love",
            year: 2000,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle / Mark Lee Ping-bing",
            editor: "William Chang",
            composer: "Michael Galasso / Shigeru Umebayashi",
            studio: "Jet Tone Films",
            focus: "A visually intoxicating masterclass in repression and desire. Wong uses incredibly tight, voyeuristic framing, immaculate production design, and a repetitive, haunting musical motif to trap his protagonists in an agonizing, beautiful cycle of unconsummated longing.",
            plot: "In 1962 Hong Kong, two incredibly lonely, elegant neighbors living in a crowded apartment building slowly develop a deeply passionate, agonizingly restrained romance after realizing their respective spouses are having an affair with each other.",
            releaseDate: "September 29, 2000",
            country: "Hong Kong"
        },
        {
            title: "Fallen Angels",
            year: 1995,
            director: "Wong Kar-wai",
            writer: "Wong Kar-wai",
            cinematographer: "Christopher Doyle",
            editor: "William Chang / Ming Lam-wong",
            composer: "Frankie Chan / Roel A. García",
            studio: "Jet Tone Films",
            focus: "The dark, hyper-stylized mirror to *Chungking Express*. Wong heavily utilizes aggressively wide-angle lenses in impossibly tight spaces, violently distorting reality to reflect the deep alienation and desperate, fleeting violence of Hong Kong's neon-lit underbelly.",
            plot: "A detached, highly efficient hitman attempting to leave the criminal underworld crosses paths with his deeply obsessive female partner, an eccentric mute, and several other deeply lonely, alienated souls wandering the nocturnal streets of Hong Kong.",
            releaseDate: "September 21, 1995",
            country: "Hong Kong"
        }
    ],
    'johnnie-to': [
        {
            title: "The Mission",
            year: 1999,
            director: "Johnnie To",
            writer: "Milkyway Creative Team",
            cinematographer: "Cheng Siu-keung",
            editor: "Andy Chan",
            composer: "Kenji Yoshida",
            studio: "Milkyway Image",
            focus: "A minimalist masterpiece of action staging. To orchestrates incredibly tense, highly stylized shootouts that prioritize rigid, geometric blocking and deadpan stillness over kinetic movement, redefining the Hong Kong crime thriller aesthetic.",
            plot: "Five fiercely independent, highly skilled triad hitmen are brought together to act as bodyguards for a powerful mob boss who has just survived an assassination attempt, forming an unbreakable bond of brotherhood under extreme pressure.",
            releaseDate: "November 19, 1999",
            country: "Hong Kong"
        },
        {
            title: "Election",
            year: 2005,
            director: "Johnnie To",
            writer: "Yau Nai-hoi / Yip Tin-shing",
            cinematographer: "Cheng Siu-keung",
            editor: "Patrick Tam",
            composer: "Lo Tayu",
            studio: "Milkyway Image",
            focus: "A remarkably cold, unromantic dissection of organized crime. To shoots the violent, bureaucratic power struggles of a triad election like a high-stakes corporate thriller, emphasizing systemic corruption and tradition over flashy gunplay.",
            plot: "A brutal, highly tense power struggle erupts within Hong Kong's oldest triad society when two vastly different, ambitious candidates vie for the highly coveted position of chairman during the society's traditional, fiercely contested biannual election.",
            releaseDate: "October 20, 2005",
            country: "Hong Kong"
        },
        {
            title: "Exiled",
            year: 2006,
            director: "Johnnie To",
            writer: "Kam-Tin Shing / Milkyway Creative Team",
            cinematographer: "Cheng Siu-keung",
            editor: "David M. Richardson",
            composer: "Guy Zerafa",
            studio: "Milkyway Image",
            focus: "A deeply nostalgic, hyper-stylized neo-Western. To utilizes impossibly cool, slow-motion staging, swirling dust, and perfectly composed group tableaus to elevate the tragic, fatalistic brotherhood of fading triad gunmen into pure myth.",
            plot: "Two deeply conflicted triad hitmen are sent to Macau to assassinate a former colleague who has deserted the gang, but they are met by two other childhood friends determined to protect him, leading to a tense, violent standoff.",
            releaseDate: "October 19, 2006",
            country: "Hong Kong"
        }
    ],
    'andrew-lau-alan-mak': [
        {
            title: "Infernal Affairs",
            year: 2002,
            director: "Andrew Lau / Alan Mak",
            writer: "Alan Mak / Felix Chong",
            cinematographer: "Andrew Lau / Lai Yiu-fai",
            editor: "Danny Pang / Pang正熙 (Curran Pang)",
            composer: "Chan Kwong-wing",
            studio: "Media Asia Films",
            focus: "A slick, incredibly tight, and psychologically complex thriller that saved the Hong Kong box office. The directors utilize a cool, highly polished visual aesthetic and incredibly sharp parallel editing to perfectly mirror the agonizing duality of its protagonists.",
            plot: "An undercover police officer deeply embedded in a powerful triad syndicate and a highly placed triad mole operating within the police force engage in a desperate, incredibly tense game of cat-and-mouse to expose one another.",
            releaseDate: "December 12, 2002",
            country: "Hong Kong"
        }
    ],
    'stephen-chow': [
        {
            title: "Kung Fu Hustle",
            year: 2004,
            director: "Stephen Chow",
            writer: "Stephen Chow / Tsang Kan-cheong / Lola Huo / Chan Man-keung",
            cinematographer: "Poon Hang-sang",
            editor: "Angie Lam",
            composer: "Raymond Wong",
            studio: "Star Overseas / China Film Group / Columbia Pictures Asia",
            focus: "Chow brilliantly elevates his signature 'mo lei tau' (nonsense) comedy by seamlessly integrating cutting-edge CGI with dazzling, highly stylized martial arts choreography, creating a visually spectacular, wildly inventive live-action cartoon.",
            plot: "In a lawless, incredibly chaotic 1940s Shanghai, a bumbling, aspiring gangster accidentally sparks a massive, spectacularly violent turf war between the ruthless Axe Gang and the hidden, superhuman martial arts masters residing in a rundown slum.",
            releaseDate: "December 23, 2004",
            country: "Hong Kong / China"
        },
        {
            title: "Shaolin Soccer",
            year: 2001,
            director: "Stephen Chow",
            writer: "Stephen Chow / Tsang Kan-cheong",
            cinematographer: "Andy Kwong / Pak-huen Kwen",
            editor: "Kai Kit-wai",
            composer: "Raymond Wong",
            studio: "Star Overseas / Universe Entertainment",
            focus: "Chow completely revolutionizes Hong Kong sports comedy by treating absurd, physics-defying soccer matches with the utmost cinematic gravity, utilizing highly kinetic, anime-inspired visual effects to visualize the immense power of Shaolin kung fu.",
            plot: "A former, deeply disgraced soccer star teams up with a passionate, incredibly skilled Shaolin monk to reunite his discouraged brothers and form a uniquely powerful soccer team, utilizing their mystical martial arts skills to win a national tournament.",
            releaseDate: "July 12, 2001",
            country: "Hong Kong"
        }
    ],
    'fruit-chan': [
        {
            title: "Made in Hong Kong",
            year: 1997,
            director: "Fruit Chan",
            writer: "Fruit Chan",
            cinematographer: "Lam Wah-chuen",
            editor: "Fruit Chan",
            composer: "Lam Wah-chuen",
            studio: "Nicetop Independent Ltd.",
            focus: "A fiercely independent, foundational work of post-handover Hong Kong cinema. Chan utilizes discarded film stock and raw, extremely gritty handheld cinematography to violently capture the deep nihilism and absolute despair of marginalized youth.",
            plot: "A deeply alienated, hopelessly doomed teenage triad debt collector navigates the brutal, unforgiving public housing estates of Hong Kong, forming a tragic, deeply tragic bond with a terminally ill girl and a mentally disabled boy.",
            releaseDate: "October 9, 1997",
            country: "Hong Kong"
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
    console.log("Starting TMDB fetch and database update for Hong Kong Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Hong Kong films!");
}

run();
