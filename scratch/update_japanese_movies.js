const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'akira-kurosawa': [
        {
            title: "Seven Samurai",
            year: 1954,
            director: "Akira Kurosawa",
            writer: "Akira Kurosawa / Shinobu Hashimoto / Hideo Oguni",
            cinematographer: "Asakazu Nakai",
            editor: "Akira Kurosawa",
            composer: "Fumio Hayasaka",
            studio: "Toho",
            focus: "A monumental achievement in action choreography and dynamic composition. Kurosawa utilizes multiple cameras, long telephoto lenses, and extreme weather to craft kinetic, muddy, and wildly immersive battle sequences.",
            plot: "In 16th-century feudal Japan, a desperate, impoverished farming village hires a group of seven masterless, wandering samurai to protect their harvest from a vicious band of marauding bandits.",
            releaseDate: "April 26, 1954",
            country: "Japan"
        },
        {
            title: "Rashomon",
            year: 1950,
            director: "Akira Kurosawa",
            writer: "Akira Kurosawa / Shinobu Hashimoto",
            cinematographer: "Kazuo Miyagawa",
            editor: "Akira Kurosawa",
            composer: "Fumio Hayasaka",
            studio: "Daiei Film",
            focus: "A defining structural masterpiece that revolutionized subjective narrative. Kurosawa famously shoots directly into the sun through the dense forest canopy, visually emphasizing the dappled, elusive nature of absolute truth.",
            plot: "The horrifying murder of a samurai and the assault of his wife are recounted from four entirely different, deeply conflicting perspectives by a bandit, the wife, the dead samurai's ghost, and a woodcutter.",
            releaseDate: "August 26, 1950",
            country: "Japan"
        },
        {
            title: "Ran",
            year: 1985,
            director: "Akira Kurosawa",
            writer: "Akira Kurosawa / Hideo Oguni / Masato Ide",
            cinematographer: "Asakazu Nakai / Takao Saitō / Masaharu Ueda",
            editor: "Akira Kurosawa",
            composer: "Toru Takemitsu",
            studio: "Greenwich Film Productions / Herald Ace",
            focus: "Kurosawa's devastating, apocalyptic late-career masterpiece perfectly blends Shakespearean tragedy with Noh theater aesthetics, utilizing astonishing, color-coded battle sequences that are devoid of diegetic sound.",
            plot: "An aging, powerful warlord decides to abdicate and divide his vast empire among his three sons, but his deeply flawed decision quickly triggers a massive, horrific wave of betrayal, war, and madness.",
            releaseDate: "June 1, 1985",
            country: "Japan / France"
        }
    ],
    'yasujiro-ozu': [
        {
            title: "Tokyo Story",
            year: 1953,
            director: "Yasujirō Ozu",
            writer: "Kōgo Noda / Yasujirō Ozu",
            cinematographer: "Yūharu Atsuta",
            editor: "Yoshiyasu Hamamura",
            composer: "Takanobu Saitō",
            studio: "Shochiku",
            focus: "The pinnacle of Ozu's transcendent 'tatami-mat' style. The film employs a rigorously low, static camera, deep focus corridors, and poetic 'pillow shots' to observe the gentle, inevitable dissolution of the traditional Japanese family.",
            plot: "An elderly, traditional couple travels from their rural village to bustling Tokyo to visit their adult children, only to discover that their busy offspring have no real time or affection for them.",
            releaseDate: "November 3, 1953",
            country: "Japan"
        },
        {
            title: "Late Spring",
            year: 1949,
            director: "Yasujirō Ozu",
            writer: "Kōgo Noda / Yasujirō Ozu",
            cinematographer: "Yūharu Atsuta",
            editor: "Yoshiyasu Hamamura",
            composer: "Senji Itō",
            studio: "Shochiku",
            focus: "Ozu captures profound, heartbreaking emotional suppression through meticulous, formalist staging, where the slightest shift in posture or a sudden cut to a vase in a quiet room conveys overwhelming grief.",
            plot: "A deeply devoted, twenty-seven-year-old daughter is perfectly content to remain single and care for her widowed father, until he gently, deceptively pressures her into finding a husband for her own future security.",
            releaseDate: "September 13, 1949",
            country: "Japan"
        },
        {
            title: "Good Morning",
            year: 1959,
            director: "Yasujirō Ozu",
            writer: "Kōgo Noda / Yasujirō Ozu",
            cinematographer: "Yūharu Atsuta",
            editor: "Yoshiyasu Hamamura",
            composer: "Toshirō Mayuzumi",
            studio: "Shochiku",
            focus: "A brilliant, lighthearted subversion of Ozu's own rigid style, utilizing vibrant Technicolor and gentle, observational comedy to explore the meaningless yet essential nature of small talk and social pleasantries.",
            plot: "In suburban Tokyo, two young brothers embark on a fierce, strict vow of silence after their conservative parents outright refuse to buy them a television, inciting chaotic gossip throughout their tight-knit neighborhood.",
            releaseDate: "May 12, 1959",
            country: "Japan"
        }
    ],
    'kenji-mizoguchi': [
        {
            title: "Ugetsu",
            year: 1953,
            director: "Kenji Mizoguchi",
            writer: "Matsutarō Kawaguchi / Yoshikata Yoda",
            cinematographer: "Kazuo Miyagawa",
            editor: "Mitsuzō Miyata",
            composer: "Fumio Hayasaka / Tamezō Mochizuki",
            studio: "Daiei Film",
            focus: "Mizoguchi's masterful 'one scene, one shot' technique creates a chilling, lyrical atmosphere. Flowing camera movements glide seamlessly between the brutal realism of civil war and the misty, ethereal realm of ghosts.",
            plot: "During the chaotic civil wars of 16th-century Japan, two ambitious peasant men abandon their loyal wives to seek enormous wealth and samurai glory, ultimately falling prey to deception, violence, and an alluring phantom.",
            releaseDate: "March 26, 1953",
            country: "Japan"
        },
        {
            title: "Sansho the Bailiff",
            year: 1954,
            director: "Kenji Mizoguchi",
            writer: "Yoshikata Yoda / Yahiro Fuji",
            cinematographer: "Kazuo Miyagawa",
            editor: "Mitsuzō Miyata",
            composer: "Fumio Hayasaka",
            studio: "Daiei Film",
            focus: "An achingly beautiful tragedy characterized by Mizoguchi’s elegant, sweeping long takes and high-angle crane shots that emphasize the cruel, indifferent vastness of nature against intense human suffering.",
            plot: "In medieval Japan, the wife and children of a noble, exiled governor are brutally kidnapped by treacherous bandits and sold into horrific, grueling slavery under the tyrannical rule of Sansho the Bailiff.",
            releaseDate: "March 31, 1954",
            country: "Japan"
        }
    ],
    'masaki-kobayashi': [
        {
            title: "Harakiri",
            year: 1962,
            director: "Masaki Kobayashi",
            writer: "Shinobu Hashimoto",
            cinematographer: "Yoshio Miyajima",
            editor: "Hisashi Sagara",
            composer: "Toru Takemitsu",
            studio: "Shochiku",
            focus: "Kobayashi aggressively deconstructs the romanticized myth of samurai honor through rigid, symmetrical wide-screen framing and striking, sudden bursts of violence, culminating in a blistering critique of authoritarian hypocrisy.",
            plot: "An older, destitute ronin arrives at the courtyard of a powerful feudal lord to request a place to commit ritual suicide, using the opportunity to slowly, systematically expose the clan's utter cruelty and hypocrisy.",
            releaseDate: "September 16, 1962",
            country: "Japan"
        },
        {
            title: "The Human Condition",
            year: 1959,
            director: "Masaki Kobayashi",
            writer: "Masaki Kobayashi / Zenzo Matsuyama",
            cinematographer: "Yoshio Miyajima",
            editor: "Keiichi Uraoka",
            composer: "Chūji Kinoshita",
            studio: "Shochiku / Bungei Production Ninjin Club",
            focus: "An exhausting, massive nine-hour anti-war epic. Kobayashi combines bleak, sweeping, documentary-like battlefields with stark expressionistic lighting to trap his protagonist in a nightmarish, impossible moral labyrinth.",
            plot: "A deeply principled, pacifist Japanese supervisor attempts to humanely manage an enslaved workforce at a brutal Manchurian labor camp, but his idealism is systematically crushed by the horrific, merciless machinery of war.",
            releaseDate: "January 15, 1959",
            country: "Japan"
        }
    ],
    'nagisa-oshima': [
        {
            title: "In the Realm of the Senses",
            year: 1976,
            director: "Nagisa Oshima",
            writer: "Nagisa Oshima",
            cinematographer: "Hideo Itō",
            editor: "Keiichi Uraoka",
            composer: "Minoru Miki",
            studio: "Oshima Productions / Argos Films",
            focus: "A deeply controversial, politically charged exploration of total sexual obsession. Oshima uses claustrophobic framing and unsimulated, explicit acts to position eroticism as a radical, destructive rebellion against a rising militaristic society.",
            plot: "In 1930s Japan, a former prostitute and her affluent employer embark on a completely consuming, intensely explicit, and increasingly violent sexual affair that completely isolates them from the looming realities of fascism.",
            releaseDate: "May 15, 1976",
            country: "Japan / France"
        },
        {
            title: "Merry Christmas, Mr. Lawrence",
            year: 1983,
            director: "Nagisa Oshima",
            writer: "Nagisa Oshima / Paul Mayersberg",
            cinematographer: "Tōichirō Narushima",
            editor: "Tomoyo Ōshima",
            composer: "Ryuichi Sakamoto",
            studio: "Recorded Picture Company / Oshima Productions",
            focus: "Oshima deeply subverts traditional war cinema by entirely removing combat, focusing instead on the suffocating, psychosexual tension and fatal cultural clashes between British POWs and their Japanese captors.",
            plot: "In a sweltering, brutal Japanese prisoner-of-war camp in Java during World War II, a complex battle of wills, deep cultural misunderstandings, and repressed desire erupts between the camp's strict commandant and a rebellious British officer.",
            releaseDate: "May 11, 1983",
            country: "Japan / United Kingdom"
        }
    ],
    'shohei-imamura': [
        {
            title: "The Ballad of Narayama",
            year: 1983,
            director: "Shohei Imamura",
            writer: "Shohei Imamura",
            cinematographer: "Masao Tochizawa",
            editor: "Hajime Okayasu",
            composer: "Shinichirō Ikebe",
            studio: "Toei Company",
            focus: "Imamura strips away all sentimentality, employing harsh, naturalistic cinematography to equate human survival with brutal animal instinct, unflinchingly depicting the visceral, unforgiving laws of nature and poverty.",
            plot: "In a desperately poor, isolated 19th-century mountain village where resources are scarce, a pragmatic, deeply loving mother prepares to uphold a brutal tradition by being carried to the mountain peak to die.",
            releaseDate: "April 29, 1983",
            country: "Japan"
        },
        {
            title: "The Eel",
            year: 1997,
            director: "Shohei Imamura",
            writer: "Shohei Imamura / Motofumi Tomikawa / Daisuke Tengan",
            cinematographer: "Shigeru Komatsubara",
            editor: "Hajime Okayasu",
            composer: "Shinichirō Ikebe",
            studio: "Shochiku / Imamura Productions",
            focus: "A profoundly compassionate, darkly comic fable of redemption. Imamura blends gritty, realistic violence with deeply humanistic, absurdist humor to explore the difficult path of overcoming immense personal trauma.",
            plot: "After serving eight years in prison for the brutal murder of his unfaithful wife, a quiet, reserved man opens a small barbershop and attempts to rebuild his shattered life, confiding only in a pet eel.",
            releaseDate: "May 24, 1997",
            country: "Japan"
        }
    ],
    'takeshi-kitano': [
        {
            title: "Sonatine",
            year: 1993,
            director: "Takeshi Kitano",
            writer: "Takeshi Kitano",
            cinematographer: "Katsumi Yanagishima",
            editor: "Takeshi Kitano",
            composer: "Joe Hisaishi",
            studio: "Bandai Visual / Shochiku",
            focus: "Kitano establishes his signature, minimalist aesthetic. He uses stark, static wide shots, deadpan absurdist comedy, and sudden, shockingly violent outbursts to entirely deconstruct the traditional yakuza genre.",
            plot: "A weary, deeply cynical Tokyo yakuza boss is sent with his men to Okinawa to supposedly settle a gang dispute, only to find themselves hiding out on a remote beach, engaging in childish, absurd games while awaiting a bloody ambush.",
            releaseDate: "June 5, 1993",
            country: "Japan"
        },
        {
            title: "Hana-bi",
            year: 1997,
            director: "Takeshi Kitano",
            writer: "Takeshi Kitano",
            cinematographer: "Hideo Yamamoto",
            editor: "Takeshi Kitano",
            composer: "Joe Hisaishi",
            studio: "Bandai Visual / Tokyo FM / TV Tokyo",
            focus: "A devastatingly beautiful meditation on grief. Kitano perfectly balances scenes of brutal, cold-blooded violence with incredibly tender, silent moments of painting and quiet companionship, underscored by Joe Hisaishi's sweeping music.",
            plot: "A violent, deeply grieving ex-detective goes to extreme, criminal lengths—including borrowing money from the yakuza and staging a bank robbery—to provide a final, peaceful road trip for his terminally ill wife.",
            releaseDate: "September 3, 1997",
            country: "Japan"
        }
    ],
    'kiyoshi-kurosawa': [
        {
            title: "Cure",
            year: 1997,
            director: "Kiyoshi Kurosawa",
            writer: "Kiyoshi Kurosawa",
            cinematographer: "Tokushō Kikumura",
            editor: "Kan Suzuki",
            composer: "Gary Ashiya",
            studio: "Daiei Film",
            focus: "A masterpiece of psychological terror. Kurosawa avoids jump scares entirely, relying on hypnotic, agonizingly slow pacing, unnerving ambient sound design, and sterile, decaying industrial spaces to build unbearable dread.",
            plot: "A deeply frustrated, emotionally exhausted Tokyo detective investigates a horrifying string of identical, gruesome murders committed by completely normal people who possess no memory of their actions, leading him to a mysterious amnesiac.",
            releaseDate: "December 27, 1997",
            country: "Japan"
        },
        {
            title: "Pulse",
            year: 2001,
            director: "Kiyoshi Kurosawa",
            writer: "Kiyoshi Kurosawa",
            cinematographer: "Junichirō Hayashi",
            editor: "Masahiro Ōnaga",
            composer: "Takefumi Haketa",
            studio: "Daiei Film / Toho / Nikkatsu",
            focus: "A chilling, prophetic vision of technological alienation. Kurosawa uses murky, deeply shadowed cinematography and incredibly slow, creeping ghost movements to visualize the profound loneliness of the internet age.",
            plot: "In a bleak, increasingly isolated Tokyo, two separate groups of young people uncover a terrifying truth: the realm of the dead has breached the world of the living through a viral, soul-draining website.",
            releaseDate: "February 10, 2001",
            country: "Japan"
        }
    ],
    'hirokazu-kore-eda': [
        {
            title: "Shoplifters",
            year: 2018,
            director: "Hirokazu Kore-eda",
            writer: "Hirokazu Kore-eda",
            cinematographer: "Ryūto Kondō",
            editor: "Hirokazu Kore-eda",
            composer: "Haruomi Hosono",
            studio: "AOI Pro. / Fuji Television Network / GAGA Corporation",
            focus: "Kore-eda masterfully dissects the concept of family outside of blood relations. He uses intimate, deeply empathetic framing and naturalistic performances to find profound warmth and joy within absolute poverty.",
            plot: "A deeply impoverished, makeshift family of small-time grifters living on the margins of Tokyo takes in a young, abused girl they find freezing on the street, leading to profound joy and eventual, devastating exposure.",
            releaseDate: "May 14, 2018",
            country: "Japan"
        },
        {
            title: "Still Walking",
            year: 2008,
            director: "Hirokazu Kore-eda",
            writer: "Hirokazu Kore-eda",
            cinematographer: "Yutaka Yamazaki",
            editor: "Hirokazu Kore-eda",
            composer: "Gonzalez Mikami",
            studio: "Cinequanon / Engine Film",
            focus: "A gentle, Ozu-esque masterpiece that relies on incredibly subtle, observational details. Kore-eda builds an entire emotional universe out of quiet cooking scenes, unspoken resentments, and the lingering, invisible presence of grief.",
            plot: "Over the course of a single summer day, a fractured, aging family gathers at their traditional seaside home to commemorate the tragic drowning death of their eldest son fifteen years prior.",
            releaseDate: "June 28, 2008",
            country: "Japan"
        }
    ],
    'ryusuke-hamaguchi': [
        {
            title: "Drive My Car",
            year: 2021,
            director: "Ryusuke Hamaguchi",
            writer: "Ryusuke Hamaguchi / Takamasa Oe",
            cinematographer: "Hidetoshi Shinomiya",
            editor: "Azusa Yamazaki",
            composer: "Eiko Ishibashi",
            studio: "C&I Entertainment / Bitters End",
            focus: "A profound, slow-burning study of grief and communication. Hamaguchi uses the claustrophobic intimacy of a car interior and extensive, repetitive theater rehearsals to gently break down emotional walls and explore the healing power of art.",
            plot: "A grieving, emotionally closed-off theater director travels to Hiroshima to stage a multilingual production of 'Uncle Vanya,' where he slowly forms a profound, unspoken bond with his quiet, deeply traumatized young chauffeur.",
            releaseDate: "July 11, 2021",
            country: "Japan"
        },
        {
            title: "Happy Hour",
            year: 2015,
            director: "Ryusuke Hamaguchi",
            writer: "Ryusuke Hamaguchi / Tadashi Nohara / Tomoyuki Takahashi",
            cinematographer: "Yoshio Kitagawa",
            editor: "Ryusuke Hamaguchi",
            composer: "Umitaro Abe",
            studio: "Fuyuiko Co.",
            focus: "An extraordinary, five-hour deep dive into the minutiae of human relationships. Hamaguchi utilizes real-time conversations and non-professional actors to achieve an unparalleled level of raw, unvarnished emotional truth.",
            plot: "The lives, friendships, and marriages of four very close, seemingly content thirty-something women in Kobe are fundamentally shattered and re-examined when one of them abruptly reveals she is seeking a divorce.",
            releaseDate: "August 14, 2015",
            country: "Japan"
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
    console.log("Starting TMDB fetch and database update for Japanese Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Japanese films!");
}

run();
