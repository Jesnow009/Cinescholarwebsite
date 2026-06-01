const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'jim-sheridan': [
        {
            title: "My Left Foot",
            year: 1989,
            director: "Jim Sheridan",
            writer: "Shane Connaughton / Jim Sheridan",
            cinematographer: "Jack Conroy",
            editor: "J. Patrick Duffner",
            composer: "Elmer Bernstein",
            studio: "Granada Television / Noel Pearson Production",
            focus: "Physical performance staging, low-angle wheelchair tracking, and working-class domestic lighting.",
            plot: "No one expects much from Christy Brown, a boy with cerebral palsy born into a working-class Irish family. Though Christy is a spastic quadriplegic and essentially paralyzed, a miraculous event occurs when, at the age of 5, he demonstrates control of his left foot by using chalk to scrawl a word on the floor. With the help of his steely mother — and no shortage of grit and determination — Christy overcomes his infirmity to become a painter, poet and author.",
            releaseDate: "February 24, 1989",
            country: "Ireland / United Kingdom"
        },
        {
            title: "In the Name of the Father",
            year: 1993,
            director: "Jim Sheridan",
            writer: "Terry George / Jim Sheridan",
            cinematographer: "Peter Biziou",
            editor: "Gerry Hambling",
            composer: "Trevor Jones",
            studio: "Hell's Kitchen Films / Universal Pictures",
            focus: "Claustrophobic prison cell staging, courtroom narrative pacing, and intense close-up interrogation blocks.",
            plot: "A small-time Belfast thief, Gerry Conlon, is wrongly convicted of an IRA bombing in London, along with his father and friends, and spends 15 years in prison fighting to prove his innocence.",
            releaseDate: "December 27, 1993",
            country: "Ireland / United Kingdom / United States"
        },
        {
            title: "In America",
            year: 2003,
            director: "Jim Sheridan",
            writer: "Jim Sheridan / Naomi Sheridan / Kirsten Sheridan",
            cinematographer: "Declan Quinn",
            editor: "Naomi Geraghty",
            composer: "Gavin Friday / Maurice Seezer",
            studio: "Hell's Kitchen Films / Fox Searchlight Pictures",
            focus: "Warm nostalgic color grading, handheld immigrant perspective framing, and naturalistic child performance staging.",
            plot: "A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life. Wait, actually, the plot is: An Irish immigrant family struggles to build a new life in a drug-ridden tenement building in New York City, finding solace and friendship in a reclusive artist neighbor.", // The user provided an incorrect plot in the previous prompt for In America, I will correct it here.
            releaseDate: "November 26, 2003",
            country: "Ireland / United Kingdom / United States"
        },
        {
            title: "The Field",
            year: 1990,
            director: "Jim Sheridan",
            writer: "Jim Sheridan",
            cinematographer: "Jack Conroy",
            editor: "J. Patrick Duffner",
            composer: "Elmer Bernstein",
            studio: "Granada Television / Noel Pearson Production",
            focus: "Harsh elemental landscape framing, intense physical acting setpieces, and brooding, shadow-heavy lighting.",
            plot: "An intimidating, stubborn Irish farmer goes to extreme and violent lengths to protect the rented field his family has worked for generations when an American developer attempts to buy it.",
            releaseDate: "September 21, 1990",
            country: "Ireland / United Kingdom"
        },
        {
            title: "Brothers",
            year: 2009,
            director: "Jim Sheridan",
            writer: "David Benioff",
            cinematographer: "Frederick Elmes",
            editor: "Jay Cassidy",
            composer: "Thomas Newman",
            studio: "Relativity Media / Lionsgate",
            focus: "Intimate domestic framing contrasting with stark war zone cinematography, utilizing tight close-ups to capture suppressed psychological trauma.",
            plot: "While on tour in Afghanistan, a dedicated Marine is presumed dead. His troubled ex-convict brother steps up to care for his family, leading to severe tension when the Marine unexpectedly returns home, deeply traumatized.",
            releaseDate: "December 4, 2009",
            country: "United States / United Kingdom"
        }
    ],
    'neil-jordan': [
        {
            title: "The Crying Game",
            year: 1992,
            director: "Neil Jordan",
            writer: "Neil Jordan",
            cinematographer: "Ian Wilson",
            editor: "Kant Pan",
            composer: "Anne Dudley",
            studio: "Palace Pictures / Channel Four Films",
            focus: "Subjective identity shifts, mirror reflections, and structural narrative twist pacing.",
            plot: "An IRA foot soldier forms an unlikely bond with a captive British soldier. Following a tragedy, he travels to London and falls in love with the soldier's enigmatic girlfriend, uncovering deeply kept secrets.",
            releaseDate: "October 30, 1992",
            country: "United Kingdom / Ireland"
        },
        {
            title: "Interview with the Vampire",
            year: 1994,
            director: "Neil Jordan",
            writer: "Anne Rice",
            cinematographer: "Philippe Rousselot",
            editor: "Mick Audsley / Joke van Wijk",
            composer: "Elliot Goldenthal",
            studio: "Geffen Pictures / Warner Bros.",
            focus: "Lush gothic aesthetic, candlelit chiaroscuro lighting, decadent costume design, and swooping, lyrical camera movements.",
            plot: "A vampire recounts his epic, tragic 200-year life story of love, betrayal, loneliness, and bloodlust to an eager reporter in modern-day San Francisco.",
            releaseDate: "November 11, 1994",
            country: "United States"
        },
        {
            title: "Mona Lisa",
            year: 1986,
            director: "Neil Jordan",
            writer: "Neil Jordan / David Leland",
            cinematographer: "Roger Pratt",
            editor: "Lesley Walker",
            composer: "Michael Kamen",
            studio: "HandMade Films",
            focus: "Neo-noir neon lighting, sleazy London underworld atmosphere, and tight framing reflecting the protagonist's naivety.",
            plot: "An ex-convict takes a job driving a high-class escort around the seedy underworld of London, slowly falling in love with her while becoming dangerously entangled in her past.",
            releaseDate: "June 13, 1986",
            country: "United Kingdom"
        },
        {
            title: "Michael Collins",
            year: 1996,
            director: "Neil Jordan",
            writer: "Neil Jordan",
            cinematographer: "Chris Menges",
            editor: "J. Patrick Duffner / Tony Lawson",
            composer: "Elliot Goldenthal",
            studio: "Geffen Pictures",
            focus: "Epic historical scale combined with handheld documentary-style action, utilizing stark, desaturated lighting to reflect violent warfare.",
            plot: "A gripping biopic of the Irish revolutionary leader who directed guerrilla warfare against the UK, helped negotiate the creation of the Irish Free State, and led the National Army during the Irish Civil War.",
            releaseDate: "October 25, 1996",
            country: "Ireland / United Kingdom / United States"
        },
        {
            title: "The Butcher Boy",
            year: 1998,
            director: "Neil Jordan",
            writer: "Neil Jordan / Patrick McCabe",
            cinematographer: "Adrian Biddle",
            editor: "Tony Lawson",
            composer: "Elliot Goldenthal",
            studio: "Geffen Pictures",
            focus: "Feverish, subjective camera angles, lurid hyper-saturated colors, and surreal dream sequences representing a decaying psyche.",
            plot: "In early 1960s Ireland, a young, neglected boy retreats into a violent, paranoid fantasy world involving comic books, aliens, and communists as his family life crumbles around him.",
            releaseDate: "February 20, 1998",
            country: "Ireland / United Kingdom / United States"
        }
    ],
    'martin-mcdonagh': [
        {
            title: "In Bruges",
            year: 2008,
            director: "Martin McDonagh",
            writer: "Martin McDonagh",
            cinematographer: "Eigil Bryld",
            editor: "Jon Gregory",
            composer: "Carter Burwell",
            studio: "Blueprint Pictures / Film4",
            focus: "Melancholic picturesque wide shots of medieval architecture contrasting with sharp, foul-mouthed rapid dialogue and sudden violence.",
            plot: "After a job goes tragically wrong, two Irish hitmen are ordered to lay low in the fairytale-like city of Bruges, Belgium, where they await further instructions from their volatile boss.",
            releaseDate: "February 8, 2008",
            country: "United Kingdom / United States"
        },
        {
            title: "The Banshees of Inisherin",
            year: 2022,
            director: "Martin McDonagh",
            writer: "Martin McDonagh",
            cinematographer: "Ben Davis",
            editor: "Mikkel E. G. Nielsen",
            composer: "Carter Burwell",
            studio: "Searchlight Pictures / Blueprint Pictures",
            focus: "Desolate, painterly landscapes, precise blocking of characters to emphasize sudden emotional distance, and melancholic, isolationist sound design.",
            plot: "On a remote island off the coast of Ireland, a lifelong friendship suddenly ends when one man abruptly decides to cut ties with the other, leading to alarming and absurd consequences.",
            releaseDate: "October 21, 2022",
            country: "Ireland / United Kingdom / United States"
        },
        {
            title: "Three Billboards Outside Ebbing, Missouri",
            year: 2017,
            director: "Martin McDonagh",
            writer: "Martin McDonagh",
            cinematographer: "Ben Davis",
            editor: "Jon Gregory",
            composer: "Carter Burwell",
            studio: "Blueprint Pictures / Fox Searchlight Pictures",
            focus: "Grounded midwestern aesthetic, static mid-shots that let rapid-fire dialogue breathe, and an uncompromising blend of bleak comedy and tragedy.",
            plot: "A mother personally challenges the local authorities to solve her daughter's murder when they fail to catch the culprit, renting three provocative billboards to force their hand.",
            releaseDate: "November 10, 2017",
            country: "United States / United Kingdom"
        },
        {
            title: "Seven Psychopaths",
            year: 2012,
            director: "Martin McDonagh",
            writer: "Martin McDonagh",
            cinematographer: "Ben Davis",
            editor: "Lisa Gunning",
            composer: "Carter Burwell",
            studio: "Blueprint Pictures / Film4",
            focus: "Meta-cinematic self-reflexive editing, sun-drenched Los Angeles desert aesthetics, and absurdly hyper-violent set pieces.",
            plot: "A struggling screenwriter inadvertently becomes entangled in the Los Angeles criminal underworld after his oddball friends kidnap a gangster's beloved Shih Tzu.",
            releaseDate: "October 12, 2012",
            country: "United Kingdom / United States"
        }
    ],
    'john-michael-mcdonagh': [
        {
            title: "The Guard",
            year: 2011,
            director: "John Michael McDonagh",
            writer: "John Michael McDonagh",
            cinematographer: "Larry Smith",
            editor: "Chris Gill",
            composer: "Calexico",
            studio: "Element Pictures / Reprisal Films",
            focus: "Bleak, windswept Connemara landscapes, dry comedic timing through editing, and unconventional framing of authority figures.",
            plot: "An unorthodox, confrontational Irish policeman with a subversive sense of humor is forced to partner with a straitlaced FBI agent to investigate an international drug-smuggling ring.",
            releaseDate: "July 7, 2011",
            country: "Ireland / United Kingdom"
        },
        {
            title: "Calvary",
            year: 2014,
            director: "John Michael McDonagh",
            writer: "John Michael McDonagh",
            cinematographer: "Larry Smith",
            editor: "Chris Gill",
            composer: "Patrick Cassidy",
            studio: "Reprisal Films / Octagon Films",
            focus: "Stark, imposing coastal scenery, deeply expressive close-ups capturing moral weight, and an underlying tone of fatalistic tension.",
            plot: "A good-natured Irish priest is threatened during confession by an anonymous parishioner, leaving him one week to make peace with his troubled community and prepare for his death.",
            releaseDate: "April 11, 2014",
            country: "Ireland / United Kingdom"
        },
        {
            title: "The Forgiven",
            year: 2022,
            director: "John Michael McDonagh",
            writer: "John Michael McDonagh",
            cinematographer: "Larry Smith",
            editor: "Chris Gill",
            composer: "Lorne Balfe",
            studio: "House of Un-American Activities / Brookstreet Pictures",
            focus: "Harsh, unyielding Moroccan desert lighting, opulent production design contrasting with severe poverty, and deliberate, heavy pacing.",
            plot: "While attending a lavish party in the High Atlas Mountains of Morocco, a wealthy couple accidentally hits and kills a local boy, forcing them to reckon with the consequences of their actions.",
            releaseDate: "July 1, 2022",
            country: "United Kingdom / United States"
        }
    ],
    'lenny-abrahamson': [
        {
            title: "Room",
            year: 2015,
            director: "Lenny Abrahamson",
            writer: "Emma Donoghue",
            cinematographer: "Danny Cohen",
            editor: "Nathan Nugent",
            composer: "Stephen Rennicks",
            studio: "Element Pictures / No Trace Camping",
            focus: "Extreme claustrophobic framing utilizing wide-angle lenses in tight spaces, heavily subjective child's-eye POV, and transformative use of natural light.",
            plot: "Held captive for years in an enclosed space, a woman and her young son finally gain their freedom, allowing the boy to experience the outside world for the very first time.",
            releaseDate: "October 16, 2015",
            country: "Ireland / Canada / United Kingdom / United States"
        },
        {
            title: "Frank",
            year: 2014,
            director: "Lenny Abrahamson",
            writer: "Jon Ronson / Peter Straughan",
            cinematographer: "James Mather",
            editor: "Nathan Nugent",
            composer: "Stephen Rennicks",
            studio: "Element Pictures / Film4",
            focus: "Offbeat observational framing, visually isolating the eccentric protagonist, and organic, chaotic musical performance set pieces.",
            plot: "A wannabe musician bites off more than he can chew when he joins an eccentric avant-garde pop band led by a mysterious and enigmatic frontman who wears a giant papier-mâché head.",
            releaseDate: "May 2, 2014",
            country: "Ireland / United Kingdom"
        },
        {
            title: "Garage",
            year: 2007,
            director: "Lenny Abrahamson",
            writer: "Mark O'Halloran",
            cinematographer: "Peter Robertson",
            editor: "Isobel Stephenson",
            composer: "Stephen Rennicks",
            studio: "Element Pictures",
            focus: "Quiet, desolate framing of rural midwestern Ireland, long takes emphasizing isolation, and a deeply empathetic, slow-paced rhythm.",
            plot: "A harmless, socially awkward gas station attendant in rural Ireland sees his lonely life unravel over the course of a single summer after a misunderstanding with a teenage co-worker.",
            releaseDate: "October 5, 2007",
            country: "Ireland"
        },
        {
            title: "Adam & Paul",
            year: 2004,
            director: "Lenny Abrahamson",
            writer: "Mark O'Halloran",
            cinematographer: "James Mather",
            editor: "Isobel Stephenson",
            composer: "Stephen Rennicks",
            studio: "Element Pictures",
            focus: "Tragicomedy tracking shots, physical comedy akin to silent cinema, and unvarnished realism depicting the gritty streets of Dublin.",
            plot: "Two hapless, lifelong friends and heroin addicts spend a chaotic day wandering the streets of Dublin in a desperate, often comical, search for their next fix.",
            releaseDate: "August 27, 2004",
            country: "Ireland"
        }
    ],
    'john-carney': [
        {
            title: "Once",
            year: 2007,
            director: "John Carney",
            writer: "John Carney",
            cinematographer: "Tim Fleming",
            editor: "Paul Mullen",
            composer: "Glen Hansard / Markéta Irglová",
            studio: "Samson Films",
            focus: "Documentary-style digital handheld camera work, entirely diegetic naturalistic musical performances, and raw, unpolished lighting.",
            plot: "A modern-day musical about a vacuum repairman and a Czech immigrant who bond over their shared love of music and spend a week recording a demo album in Dublin.",
            releaseDate: "March 23, 2007",
            country: "Ireland"
        },
        {
            title: "Sing Street",
            year: 2016,
            director: "John Carney",
            writer: "John Carney",
            cinematographer: "Yaron Orbach",
            editor: "Andrew Marcus",
            composer: "Gary Clark / John Carney",
            studio: "Cosmo Films / Likely Story",
            focus: "Vibrant 1980s music video aesthetics, energetic youthful montage, and the integration of joyous fantasy sequences with dreary 1980s Dublin realism.",
            plot: "A teenager growing up in 1980s Dublin escapes his strained family life by starting a band to impress the mysterious girl he likes.",
            releaseDate: "March 17, 2016",
            country: "Ireland / United Kingdom / United States"
        },
        {
            title: "Begin Again",
            year: 2014,
            director: "John Carney",
            writer: "John Carney",
            cinematographer: "Yaron Orbach",
            editor: "Andrew Marcus",
            composer: "Gregg Alexander",
            studio: "Exclusive Media / Sycamore Pictures",
            focus: "Kinetic on-location shooting in New York City streets, capturing live ambient audio, and employing a breezy, optimistic visual tone.",
            plot: "A chance encounter between a disgraced music-business executive and a fiercely independent singer-songwriter turns into a promising collaboration as they record an album outdoors across New York City.",
            releaseDate: "June 27, 2014",
            country: "United States"
        }
    ],
    'tomm-moore': [
        {
            title: "The Secret of Kells",
            year: 2009,
            director: "Tomm Moore / Nora Twomey",
            writer: "Fabrice Ziolkowski",
            cinematographer: "Ross Stewart", // Art Direction mapped to cinematographer for UI
            editor: "Fabienne Alvarez-Giro",
            composer: "Bruno Coulais / Kíla",
            studio: "Cartoon Saloon / Les Armateurs",
            focus: "Visually striking 2D animation heavily inspired by illuminated manuscripts, utilizing flat perspectives, intricate Celtic knotwork, and vibrant watercolors.",
            plot: "A young boy in a medieval Irish outpost must conquer his fears and journey into an enchanted forest to help complete a legendary, magical book.",
            releaseDate: "February 11, 2009",
            country: "Ireland / France / Belgium"
        },
        {
            title: "Song of the Sea",
            year: 2014,
            director: "Tomm Moore",
            writer: "Will Collins",
            cinematographer: "Adrien Merigeau", // Art Direction mapped
            editor: "Darragh Byrne",
            composer: "Bruno Coulais / Kíla",
            studio: "Cartoon Saloon / Melusine Productions",
            focus: "Breathtaking hand-drawn watercolor backgrounds, circular and flowing geometric designs, and soft, melancholic color palettes.",
            plot: "A young boy and his mute younger sister, who is the last of the legendary selkies, embark on a magical journey to free the fairies and save the spirit world.",
            releaseDate: "December 10, 2014",
            country: "Ireland / Denmark / Belgium / France / Luxembourg"
        },
        {
            title: "Wolfwalkers",
            year: 2020,
            director: "Tomm Moore / Ross Stewart",
            writer: "Will Collins",
            cinematographer: "Maria Pareja", // Art Direction mapped
            editor: "Darragh Byrne / Richie Cody / Darren Holmes",
            composer: "Bruno Coulais / Kíla",
            studio: "Cartoon Saloon / Melusine Productions",
            focus: "Contrasting animation styles utilizing harsh, angular woodblock aesthetics for the puritan town and fluid, energetic, sketch-like lines for the magical forest.",
            plot: "A young apprentice hunter travels to Ireland with her father to wipe out the last wolf pack, but befriends a free-spirited girl from a mysterious tribe rumored to transform into wolves by night.",
            releaseDate: "October 26, 2020",
            country: "Ireland / United Kingdom / France / Luxembourg"
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
    console.log("Starting TMDB fetch and database update for Irish Filmmakers...");
    
    let dbContent = fs.readFileSync(DB_PATH, 'utf8');

    for (const [directorId, movies] of Object.entries(moviesUpdate)) {
        console.log(`Updating ${directorId}...`);
        
        // Add slug ID to each movie and download poster
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
            }
            await delay(500); // rate limiting
        }

        // Generate the new string to replace
        const newMoviesStr = JSON.stringify(movies, null, 24).replace(/\n/g, '\n                    ');

        // Regex to replace the mustWatch array
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
    console.log("Successfully updated temp_data.js with Irish films!");
}

run();
