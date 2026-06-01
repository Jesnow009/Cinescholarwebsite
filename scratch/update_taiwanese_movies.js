const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'edward-yang': [
        {
            title: "A Brighter Summer Day",
            year: 1991,
            director: "Edward Yang",
            writer: "Edward Yang / Yan Hongya / Yang Shunqing / Lai Mingtang",
            cinematographer: "Zhang Huigong",
            editor: "Chen Bowen",
            composer: "Toshio Tamura",
            studio: "Yang & His Gang Filmmakers",
            focus: "A monumental, deeply tragic four-hour epic of national identity. Yang utilizes incredibly intricate, multi-layered deep focus compositions to weave a sprawling, novelistic tapestry of youth violence, cultural displacement, and political anxiety in 1960s Taiwan.",
            plot: "In 1960s Taipei, amidst rising political tension and severe cultural identity crises among exiled mainlanders, a sensitive teenage boy is slowly drawn into a violent, deeply fatalistic youth gang rivalry.",
            releaseDate: "July 27, 1991",
            country: "Taiwan"
        },
        {
            title: "Yi Yi",
            year: 2000,
            director: "Edward Yang",
            writer: "Edward Yang",
            cinematographer: "Yang Weihan",
            editor: "Chen Bowen",
            composer: "Peng Kaili",
            studio: "Atom Films / Pony Canyon",
            focus: "A remarkably tender, profoundly observant culmination of Yang's career. He uses vast, architectural wide shots and reflections in incredibly modern, glass-walled Taipei to explore the profound isolation and quiet heartbreak of a middle-class family.",
            plot: "Following a middle-class Taipei family from a disastrous wedding to a somber funeral, each member individually struggles to navigate deep existential crises, profound romantic regret, and the bewildering complexities of modern life.",
            releaseDate: "December 16, 2000",
            country: "Taiwan / Japan"
        },
        {
            title: "The Terrorizers",
            year: 1986,
            director: "Edward Yang",
            writer: "Edward Yang / Xiao Sa",
            cinematographer: "Zhang Zhan",
            editor: "Liao Qingsong",
            composer: "N/A",
            studio: "Central Motion Picture Corporation",
            focus: "A cold, brilliant, deeply fragmented puzzle box. Yang employs a chillingly detached, Antonioni-esque visual style and complex, non-linear editing to explore the terrifyingly random, intersecting violence of urban alienation.",
            plot: "The seemingly disconnected lives of a frustrated novelist, her deeply depressed doctor husband, an ambitious young photographer, and a rebellious Eurasian teenager violently and tragically intersect due to a single, anonymous prank phone call.",
            releaseDate: "December 19, 1986",
            country: "Taiwan"
        }
    ],
    'hou-hsiao-hsien': [
        {
            title: "A City of Sadness",
            year: 1989,
            director: "Hou Hsiao-hsien",
            writer: "Wu Nien-jen / Chu T’ien-wen",
            cinematographer: "Chen Huai’en",
            editor: "Liao Qingsong",
            composer: "SENS",
            studio: "3-H Films",
            focus: "The definitive masterpiece of the Taiwanese New Wave. Hou perfects his signature 'distant observer' aesthetic, using incredibly long, static takes and elliptical editing to indirectly witness the crushing, unspeakable trauma of the 228 Incident.",
            plot: "In the immediate, chaotic aftermath of World War II, a complex Taiwanese family is slowly torn apart by the brutal, violently oppressive political transition as the Chinese Nationalist government establishes authoritarian rule.",
            releaseDate: "October 21, 1989",
            country: "Taiwan"
        },
        {
            title: "The Puppetmaster",
            year: 1993,
            director: "Hou Hsiao-hsien",
            writer: "Chu T’ien-wen / Wu Nien-jen",
            cinematographer: "Mark Lee Ping-bing",
            editor: "Liao Qingsong",
            composer: "Zhang Hongyi",
            studio: "City Films / Era International",
            focus: "A radical, deeply profound exploration of historical memory. Hou seamlessly blurs documentary and fiction, intercutting the real-life recollections of a legendary puppet master with beautifully staged, incredibly observant theatrical reenactments.",
            plot: "Spanning the first half of the 20th century, the film chronicles the fascinating, deeply complex life of Li Tien-lu, a renowned traditional hand-puppet master living through the agonizing fifty-year period of Japanese occupation in Taiwan.",
            releaseDate: "July 31, 1993",
            country: "Taiwan"
        },
        {
            title: "Millennium Mambo",
            year: 2001,
            director: "Hou Hsiao-hsien",
            writer: "Chu T’ien-wen",
            cinematographer: "Mark Lee Ping-bing",
            editor: "Liao Qingsong",
            composer: "Lim Giong / Yoshihide Otomo",
            studio: "Paradigm Films / 3-H Films",
            focus: "Hou shifts his historical lens to the dizzying present. He and DP Mark Lee Ping-bing use neon-drenched, heavily saturated cinematography and intoxicating techno beats to capture the transient, deeply aimless pulse of modern youth culture.",
            plot: "Narrated from a deeply melancholic future perspective, a young, intensely alienated woman drifts aimlessly through Taipei's neon-lit club scene, caught in an incredibly toxic, suffocating relationship with her deeply jealous boyfriend.",
            releaseDate: "November 17, 2001",
            country: "Taiwan / France"
        }
    ],
    'tsai-ming-liang': [
        {
            title: "The Hole",
            year: 1998,
            director: "Tsai Ming-liang",
            writer: "Tsai Ming-liang / Yang Ping-ying",
            cinematographer: "Liao Peng-jung",
            editor: "Chen Sheng-chang",
            composer: "N/A",
            studio: "Central Motion Picture Corporation / Haut et Court",
            focus: "An apocalyptic, nearly silent masterpiece of deadpan surrealism. Tsai utilizes incredibly severe, rigid architectural framing to isolate his characters, unexpectedly interrupting the unbearable grimness with wildly colorful, lip-synced musical numbers.",
            plot: "As a mysterious, highly contagious epidemic plagues a rain-soaked, near-apocalyptic Taipei, two deeply lonely neighbors are forced into bizarre, profoundly awkward proximity when a plumber leaves a gaping hole in their shared floor.",
            releaseDate: "September 16, 1998",
            country: "Taiwan / France"
        },
        {
            title: "Vive L'Amour",
            year: 1994,
            director: "Tsai Ming-liang",
            writer: "Tsai Ming-liang / Tsai Yi-chun / Yang Pi-ying",
            cinematographer: "Liao Peng-jung",
            editor: "Song Shuhui",
            composer: "N/A",
            studio: "Central Motion Picture Corporation",
            focus: "A devastatingly bleak, dialogue-free exploration of extreme urban isolation. Tsai famously ends the film with an incredibly agonizing, unbroken 6-minute shot of raw, unfiltered grief that fundamentally redefines the cinematic expression of loneliness.",
            plot: "Three deeply disconnected, intensely lonely Taipei residents unknowingly share the keys to the same luxurious, empty apartment, completely failing to connect with one another despite their desperate, unspoken need for intimacy.",
            releaseDate: "September 16, 1994",
            country: "Taiwan"
        },
        {
            title: "What Time Is It There?",
            year: 2001,
            director: "Tsai Ming-liang",
            writer: "Tsai Ming-liang / Yang Pi-ying",
            cinematographer: "Benoît Delhomme",
            editor: "Chen Sheng-chang",
            composer: "N/A",
            studio: "Arena Films / Homegreen Films",
            focus: "A deeply spiritual, profoundly melancholic meditation on grief and distance. Tsai creates an incredibly subtle, quiet parallel narrative that transcends time zones, using François Truffaut's *The 400 Blows* as a deeply poignant thematic anchor.",
            plot: "After a young woman buys his watch and travels to Paris, a deeply grieving street vendor in Taipei obsessively attempts to change every clock in the city to French time in a desperate, deeply strange attempt to connect with her.",
            releaseDate: "December 8, 2001",
            country: "Taiwan / France"
        }
    ],
    'ang-lee': [
        {
            title: "The Wedding Banquet",
            year: 1993,
            director: "Ang Lee",
            writer: "Ang Lee / Neil Peng / James Schamus",
            cinematographer: "Jong Lin",
            editor: "Tim Squyres",
            composer: "Mader",
            studio: "Central Motion Picture Corporation / Good Machine",
            focus: "A highly perceptive, incredibly warm cross-cultural comedy of manners. Lee utilizes a deeply compassionate, unobtrusive directorial style to gently dissect the profound tension between traditional Chinese familial obligation and modern queer identity.",
            plot: "A happily partnered gay Taiwanese immigrant living in Manhattan is forced to stage an incredibly elaborate, exhausting fake marriage to his female tenant in order to satisfy his deeply traditional, demanding parents who are visiting from Taiwan.",
            releaseDate: "August 4, 1993",
            country: "Taiwan / United States"
        },
        {
            title: "Eat Drink Man Woman",
            year: 1994,
            director: "Ang Lee",
            writer: "Ang Lee / James Schamus / Hui-Ling Wang",
            cinematographer: "Jong Lin",
            editor: "Tim Squyres",
            composer: "Mader",
            studio: "Central Motion Picture Corporation / Good Machine",
            focus: "A masterclass in culinary and emotional storytelling. Lee meticulously shoots incredibly elaborate, mouth-watering cooking sequences to serve as the primary, deeply expressive language for a family that is completely incapable of verbalizing their emotions.",
            plot: "An aging, deeply traditional master chef living in Taipei desperately attempts to hold his fracturing family together by preparing incredibly elaborate Sunday dinners for his three highly independent, rebellious adult daughters.",
            releaseDate: "August 3, 1994",
            country: "Taiwan / United States"
        },
        {
            title: "Crouching Tiger, Hidden Dragon",
            year: 2000,
            director: "Ang Lee",
            writer: "Wang Hui-ling / James Schamus / Tsai Kuo-jung",
            cinematographer: "Peter Pau",
            editor: "Tim Squyres",
            composer: "Tan Dun",
            studio: "EDKO Film / Zoom Hunt International / China Film",
            focus: "A breathtaking, globally redefining wuxia epic. Lee marries the balletic, wire-fu action aesthetics of King Hu with incredibly profound, feminist psychological depth and deeply repressed, sweeping romantic tragedy.",
            plot: "In 19th-century Qing dynasty China, the theft of a legendary, deeply revered sword sparks a massive, continent-spanning conflict involving a retiring warrior, his deeply repressed love, and a highly rebellious, immensely powerful young noblewoman.",
            releaseDate: "July 7, 2000",
            country: "Taiwan / Hong Kong / United States / China"
        }
    ],
    'midi-z': [
        {
            title: "Ice Poison",
            year: 2014,
            director: "Midi Z",
            writer: "Midi Z",
            cinematographer: "Fan Sheng-xiang",
            editor: "Midi Z",
            composer: "N/A",
            studio: "Seashore Image Productions",
            focus: "A stark, incredibly raw piece of guerrilla filmmaking. Midi Z utilizes a highly naturalistic, documentary-like approach to capture the crushing, inescapable cycle of rural poverty and the deeply devastating impact of the drug trade in Myanmar.",
            plot: "Desperate to escape crushing rural poverty in Myanmar, a young farmer sacrifices his family's only cow to buy a motorbike and work as a taxi driver, ultimately plunging into the highly dangerous, illicit world of crystal meth trafficking.",
            releaseDate: "July 18, 2014",
            country: "Taiwan / Myanmar"
        },
        {
            title: "The Road to Mandalay",
            year: 2016,
            director: "Midi Z",
            writer: "Midi Z",
            cinematographer: "Fan Sheng-xiang",
            editor: "Matthieu Laclau",
            composer: "Lim Giong",
            studio: "Montage Film Productions / Ad Astra Films",
            focus: "Midi Z elevates his raw realism with a slightly more polished, deeply tragic narrative structure. He uses claustrophobic industrial settings and incredibly grueling labor sequences to explore the deeply precarious, intensely vulnerable lives of undocumented immigrants.",
            plot: "Two desperately impoverished Burmese migrants are smuggled across the border into Thailand to seek a better life, but their deeply fragile, developing romance is fundamentally threatened by completely conflicting ambitions and brutal exploitation.",
            releaseDate: "December 9, 2016",
            country: "Taiwan / France / Germany / Myanmar"
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
    console.log("Starting TMDB fetch and database update for Taiwanese Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Taiwanese films!");
}

run();
