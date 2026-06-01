const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'dariush-mehrjui': [
        {
            title: "The Cow",
            year: 1969,
            director: "Dariush Mehrjui",
            writer: "Dariush Mehrjui / Gholam-Hossein Sa'edi",
            cinematographer: "Fereydoun Ghovanlou",
            editor: "Dariush Mehrjui",
            composer: "Hormoz Farhat",
            studio: "Ministry of Culture and Arts",
            focus: "The definitive catalyst of the Iranian New Wave. Mehrjui utilizes incredibly stark, neo-realist cinematography and profound psychological allegory to critique extreme rural poverty and the devastating fragility of human identity.",
            plot: "In an incredibly impoverished, isolated Iranian village, a deeply devoted farmer suffers a profound psychological breakdown when his beloved cow—the village's only source of wealth—mysteriously dies while he is away.",
            releaseDate: "September 1, 1969",
            country: "Iran"
        },
        {
            title: "Leila",
            year: 1997,
            director: "Dariush Mehrjui",
            writer: "Dariush Mehrjui",
            cinematographer: "Mahmoud Kalari",
            editor: "Mostafa Kherghehpoosh",
            composer: "Keivan Jahanshahi",
            studio: "Faraz Film",
            focus: "A devastating, highly perceptive psychological melodrama. Mehrjui uses intense, claustrophobic framing and incredibly nuanced performances to meticulously dissect the crushing weight of patriarchal tradition and familial pressure on modern Iranian women.",
            plot: "A deeply in love, modern Iranian couple's seemingly perfect marriage is systematically dismantled when the wife discovers she is infertile, and her domineering mother-in-law relentlessly pressures the husband to take a second wife.",
            releaseDate: "September 23, 1997",
            country: "Iran"
        }
    ],
    'sohrab-shahid-saless': [
        {
            title: "A Simple Event",
            year: 1973,
            director: "Sohrab Shahid Saless",
            writer: "Sohrab Shahid Saless",
            cinematographer: "Naghi Masoumi",
            editor: "Sohrab Shahid Saless",
            composer: "N/A",
            studio: "Sazman-e Cinema-ye Keshvar",
            focus: "A radical masterpiece of cinematic minimalism. Shahid Saless establishes a deeply austere, profoundly observant aesthetic, utilizing painfully long, static takes to document the numbing repetition of everyday life with uncompromising realism.",
            plot: "The incredibly mundane, quietly devastating daily routine of a young, neglected boy living in a small coastal town is documented with profound detachment as he cares for his terminally ill mother and smuggler father.",
            releaseDate: "November 10, 1973",
            country: "Iran"
        },
        {
            title: "Still Life",
            year: 1974,
            director: "Sohrab Shahid Saless",
            writer: "Sohrab Shahid Saless",
            cinematographer: "Houshang Baharlou",
            editor: "Sohrab Shahid Saless",
            composer: "N/A",
            studio: "Center for the Intellectual Development of Children and Young Adults (Kanioon)",
            focus: "An incredibly slow, deeply mesmerizing meditation on aging and obsolescence. Shahid Saless perfects his poetic realism, turning incredibly repetitive, mundane domestic tasks into profound, melancholic visual poetry.",
            plot: "An elderly, deeply resigned railway crossing guard and his quiet wife live an incredibly isolated, highly repetitive existence that is suddenly, irreversibly shattered when he is abruptly forced into retirement.",
            releaseDate: "November 1, 1974",
            country: "Iran"
        }
    ],
    'abbas-kiarostami': [
        {
            title: "Close-Up",
            year: 1990,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Ali Reza Zarrindast",
            editor: "Abbas Kiarostami",
            composer: "N/A",
            studio: "Kanioon",
            focus: "A globally redefining masterpiece of meta-cinema. Kiarostami miraculously convinces real people involved in a bizarre fraud case to re-enact their own experiences, brilliantly blurring the lines between documentary truth and cinematic fiction.",
            plot: "A deeply passionate, desperately impoverished cinephile is arrested for fraud after he successfully convinces a wealthy family that he is the famous Iranian film director Mohsen Makhmalbaf.",
            releaseDate: "February 1, 1990",
            country: "Iran"
        },
        {
            title: "Taste of Cherry",
            year: 1997,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Homayoun Payvar",
            editor: "Abbas Kiarostami",
            composer: "N/A",
            studio: "Abbas Kiarostami Productions / CiBy 2000",
            focus: "A profoundly existential, deeply philosophical road movie. Kiarostami utilizes incredibly long, repetitive tracking shots from inside a moving car to create an intensely intimate, deeply reflective space exploring life, death, and human connection.",
            plot: "A middle-aged man driving an SUV through the dusty, desolate hills outside Tehran desperately tries to find someone willing to perform a simple, highly controversial task: bury him after he commits suicide.",
            releaseDate: "September 24, 1997",
            country: "Iran / France"
        },
        {
            title: "Where Is the Friend's House?",
            year: 1987,
            director: "Abbas Kiarostami",
            writer: "Abbas Kiarostami",
            cinematographer: "Farhad Saba",
            editor: "Abbas Kiarostami",
            composer: "N/A",
            studio: "Kanioon",
            focus: "The masterful genesis of Kiarostami's 'Koker Trilogy.' He utilizes a deceptively simple, deeply poetic neo-realist approach, focusing entirely on a child's perspective to explore profound themes of moral duty, empathy, and innocence.",
            plot: "A deeply conscientious, determined young schoolboy embarks on a daunting, seemingly impossible journey to a neighboring village to return a classmate's accidentally taken notebook before the boy is expelled.",
            releaseDate: "February 1, 1987",
            country: "Iran"
        }
    ],
    'mohsen-makhmalbaf': [
        {
            title: "A Moment of Innocence",
            year: 1996,
            director: "Mohsen Makhmalbaf",
            writer: "Mohsen Makhmalbaf",
            cinematographer: "Mahmoud Kalari",
            editor: "Mohsen Makhmalbaf",
            composer: "N/A",
            studio: "Makhmalbaf Productions / Pallas Film",
            focus: "A profound, highly self-reflexive masterpiece of cinematic autobiography. Makhmalbaf brilliantly deconstructs his own radical youth by casting himself and the policeman he stabbed 20 years earlier to direct actors playing their younger selves.",
            plot: "Two decades after a violent political protest, a film director and the former policeman he stabbed attempt to reconcile their deeply traumatized past by collaborating on a film recreating the life-altering incident.",
            releaseDate: "September 11, 1996",
            country: "Iran / France"
        },
        {
            title: "Kandahar",
            year: 2001,
            director: "Mohsen Makhmalbaf",
            writer: "Mohsen Makhmalbaf",
            cinematographer: "Ebrahim Ghafouri",
            editor: "Mohsen Makhmalbaf",
            composer: "Mohammad Reza Darvishi",
            studio: "Makhmalbaf Productions / Bac Films",
            focus: "A visually stunning, deeply harrowing surrealist journey. Makhmalbaf utilizes incredibly striking, heavily symbolic imagery—such as prosthetic legs dropping from parachutes—to expose the surreal horror and devastation of Taliban-controlled Afghanistan.",
            plot: "An exiled Afghan-Canadian journalist embarks on a desperate, incredibly dangerous journey back into Taliban-ruled Afghanistan to rescue her deeply depressed sister before the next solar eclipse.",
            releaseDate: "October 24, 2001",
            country: "Iran / France"
        }
    ],
    'jafar-panahi': [
        {
            title: "The White Balloon",
            year: 1995,
            director: "Jafar Panahi",
            writer: "Abbas Kiarostami",
            cinematographer: "Farzad Jodat",
            editor: "Jafar Panahi",
            composer: "N/A",
            studio: "IRIB Channel 2",
            focus: "Panahi's beautifully empathetic debut perfectly utilizes real-time narrative tension. He adopts a child's eye-level perspective to transform incredibly mundane, everyday street interactions into an utterly gripping, deeply humanistic cinematic adventure.",
            plot: "On the eve of the Iranian New Year, a young, determined girl's seemingly simple quest to buy a plump goldfish becomes an incredibly tense, chaotic adventure when she loses her money in the bustling streets of Tehran.",
            releaseDate: "February 1, 1995",
            country: "Iran"
        },
        {
            title: "The Circle",
            year: 2000,
            director: "Jafar Panahi",
            writer: "Kambuzia Partovi",
            cinematographer: "Bahram Badakshani",
            editor: "Jafar Panahi",
            composer: "N/A",
            studio: "Jafar Panahi Film Productions / Lumière & Company",
            focus: "A fierce, formally brilliant structural critique of systemic oppression. Panahi utilizes an incredibly claustrophobic, brilliantly cyclical narrative structure to physically and narratively trap his female protagonists within an unforgiving, patriarchal society.",
            plot: "Several desperately fleeing women, all recently released from prison or attempting to escape oppressive circumstances, find their lives tragically intersecting in a deeply cyclical, inescapable struggle against patriarchal authority.",
            releaseDate: "September 8, 2000",
            country: "Iran / Italy / Switzerland"
        },
        {
            title: "Taxi",
            year: 2015,
            director: "Jafar Panahi",
            writer: "Jafar Panahi",
            cinematographer: "Multi-cam Dashboard Rig",
            editor: "Jafar Panahi",
            composer: "N/A",
            studio: "Jafar Panahi Film Productions",
            focus: "An incredible triumph of guerrilla filmmaking. Despite being officially banned from making films, Panahi mounts small dashboard cameras in a taxi, brilliantly blurring reality and fiction to create a profound, highly subversive portrait of modern Tehran.",
            plot: "Posing as a regular taxi driver, banned Iranian film director Jafar Panahi drives through the streets of Tehran, picking up a diverse array of deeply opinionated passengers who discuss politics, cinema, and societal constraints.",
            releaseDate: "February 2, 2015",
            country: "Iran"
        }
    ],
    'majid-majidi': [
        {
            title: "Children of Heaven",
            year: 1997,
            director: "Majid Majidi",
            writer: "Majid Majidi",
            cinematographer: "Parviz Malekzadeh",
            editor: "Hassan Hassandoost",
            composer: "Keivan Jahanshahi",
            studio: "Kanioon",
            focus: "A masterclass in deeply empathetic, highly accessible neo-realism. Majidi uses incredibly intimate, low-angle camerawork to amplify the monumental emotional stakes of childhood, turning a missing pair of shoes into a profound, heart-wrenching epic.",
            plot: "After accidentally losing his sister's only pair of shoes, a deeply impoverished young boy and his sister must secretly share a single pair of sneakers to attend school without angering their struggling parents.",
            releaseDate: "February 1, 1997",
            country: "Iran"
        },
        {
            title: "The Color of Paradise",
            year: 1999,
            director: "Majid Majidi",
            writer: "Majid Majidi",
            cinematographer: "Mohammad Davudi",
            editor: "Hassan Hassandoost",
            composer: "Alireza Kohandairy",
            studio: "Varahonar Company",
            focus: "A visually ravishing, deeply spiritual melodrama. Majidi employs incredibly lush, vibrant color palettes and a highly sophisticated, deeply immersive soundscape to vividly approximate a blind child's profound sensory experience of the natural world.",
            plot: "A deeply spiritual, incredibly perceptive blind boy is brought home from his specialized school in Tehran by his deeply ashamed, widowed father, who desperately views the child as a burden to his upcoming second marriage.",
            releaseDate: "February 1, 1999",
            country: "Iran"
        }
    ],
    'asghar-farhadi': [
        {
            title: "A Separation",
            year: 2011,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Mahmoud Kalari",
            editor: "Hayedeh Safiyari",
            composer: "Sattar Oraki",
            studio: "Asghar Farhadi Productions",
            focus: "A breathtakingly dense, morally labyrinthine masterpiece. Farhadi utilizes incredibly tense, documentary-style handheld camerawork and a flawless, deeply intricate script to dissect the devastating intersection of class, religion, and pride.",
            plot: "A middle-class married couple's painful decision to separate sets off a devastating, highly complex chain of events involving a deeply religious working-class caretaker, leading to a massive, agonizing legal and moral crisis.",
            releaseDate: "March 16, 2011",
            country: "Iran"
        },
        {
            title: "About Elly",
            year: 2009,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Hossein Jafarian",
            editor: "Hayedeh Safiyari",
            composer: "Andrea Bauer",
            studio: "Simaye Mehr",
            focus: "An incredibly taut, masterful psychological thriller of social manners. Farhadi slowly tightens the narrative noose, using the claustrophobic dynamics of a group vacation to expose the deep, terrifying fragility of middle-class Iranian morality and reputation.",
            plot: "A joyful weekend getaway to the Caspian Sea for a group of middle-class friends devolves into a terrifying, highly volatile psychological crisis when a young kindergarten teacher mysteriously disappears, forcing everyone to confront their own lies.",
            releaseDate: "February 4, 2009",
            country: "Iran"
        },
        {
            title: "The Salesman",
            year: 2016,
            director: "Asghar Farhadi",
            writer: "Asghar Farhadi",
            cinematographer: "Hossein Jafarian",
            editor: "Hayedeh Safiyari",
            composer: "Sattar Oraki",
            studio: "Asghar Farhadi Productions / Memento Films",
            focus: "A deeply unsettling, highly sophisticated study of bruised masculinity and vengeance. Farhadi brilliantly parallels his protagonists' real-life trauma with their stage performance of *Death of a Salesman*, creating a profoundly layered moral tragedy.",
            plot: "A deeply traumatizing assault on a young wife in her new apartment slowly poisons her marriage, as her husband becomes increasingly, dangerously obsessed with tracking down the perpetrator while they both perform in Arthur Miller's famous play.",
            releaseDate: "August 31, 2016",
            country: "Iran / France"
        }
    ],
    'mohammad-rasoulof': [
        {
            title: "There Is No Evil",
            year: 2020,
            director: "Mohammad Rasoulof",
            writer: "Mohammad Rasoulof",
            cinematographer: "Ashkan Ashkani",
            editor: "Mohammadreza Muini",
            composer: "Amir Molookpour",
            studio: "Cosmopol Film / Europe Media Nest",
            focus: "A devastating, formally rigorous moral anthology. Shot entirely in secret, Rasoulof utilizes incredibly tense, deeply ethical narratives to expose the profound psychological toll and moral rot of Iran's mandated death penalty system.",
            plot: "Four deeply connected, incredibly harrowing vignettes explore the devastating moral dilemmas and profound psychological consequences faced by ordinary Iranian men who are forced to carry out state-sanctioned executions during their military service.",
            releaseDate: "February 28, 2020",
            country: "Iran / Germany / Czech Republic"
        },
        {
            title: "The Seed of the Sacred Fig",
            year: 2024,
            director: "Mohammad Rasoulof",
            writer: "Mohammad Rasoulof",
            cinematographer: "Pooyan Aghababaei",
            editor: "Andrew Bird",
            composer: "N/A",
            studio: "Run Way Pictures / Atlantis Film",
            focus: "A deeply urgent, incredibly tense domestic thriller reflecting national crisis. Rasoulof brilliantly weaponizes the claustrophobia of a single apartment, mirroring the violent paranoia and strict authoritarianism of the state through the collapse of a family.",
            plot: "As massive political protests engulf Tehran, a newly appointed investigative judge's intense paranoia and strict authoritarian control violently tear his family apart when his state-issued gun mysteriously vanishes from their apartment.",
            releaseDate: "May 24, 2024",
            country: "Iran / Germany / France"
        }
    ],
    'samira-makhmalbaf': [
        {
            title: "The Apple",
            year: 1998,
            director: "Samira Makhmalbaf",
            writer: "Mohsen Makhmalbaf",
            cinematographer: "Ebrahim Ghafouri / Mohamad Ahmadi",
            editor: "Mohsen Makhmalbaf",
            composer: "N/A",
            studio: "Makhmalbaf Productions",
            focus: "A profoundly humanistic, reality-blurring debut made when the director was only 18. Makhmalbaf brilliantly incorporates the real-life subjects of a shocking news story into the film, using deep empathy to critique extreme patriarchal isolation.",
            plot: "Based on a true story, the film documents the deeply touching, profoundly challenging transition of two young, severely developmentally delayed sisters who are finally freed after being locked inside their house by their father for twelve years.",
            releaseDate: "May 19, 1998",
            country: "Iran / France"
        },
        {
            title: "Blackboards",
            year: 2000,
            director: "Samira Makhmalbaf",
            writer: "Mohsen Makhmalbaf / Samira Makhmalbaf",
            cinematographer: "Ebrahim Ghafouri",
            editor: "Mohsen Makhmalbaf",
            composer: "Mohammad Reza Darvishi",
            studio: "Makhmalbaf Productions / Fabrica Cinema",
            focus: "A visually astonishing, deeply allegorical work of poetic realism. Makhmalbaf utilizes incredibly striking, surreal imagery—men carrying massive blackboards like crosses across desolate, dangerous mountains—to highlight the desperate, vital struggle for Kurdish education and survival.",
            plot: "A group of deeply determined, highly vulnerable Kurdish teachers carry massive blackboards on their backs across the treacherous, war-torn mountains near the Iran-Iraq border, desperately searching for students willing to learn.",
            releaseDate: "May 19, 2000",
            country: "Iran / Italy / France"
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
    console.log("Starting TMDB fetch and database update for Iranian Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Iranian films!");
}

run();
