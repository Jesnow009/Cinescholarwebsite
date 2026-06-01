const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'zhang-yimou': [
        {
            title: "Red Sorghum",
            year: 1988,
            director: "Zhang Yimou",
            writer: "Chen Jianyu / Zhu Wei",
            cinematographer: "Gu Changwei",
            editor: "Du Yuan",
            composer: "Zhao Jiping",
            studio: "Xi'an Film Studio",
            focus: "Zhang's stunning directorial debut introduces his signature aesthetic: an overwhelming, incredibly saturated use of the color red, transforming the raw, physical landscape into a canvas of unbridled vitality and historical trauma.",
            plot: "In the brutal, rural 1930s, a strong-willed young peasant woman is sold into marriage with an elderly leper who owns a remote winery, leading to a passionate affair and an eventual, heroic stand against invading Japanese forces.",
            releaseDate: "February 1, 1988",
            country: "China"
        },
        {
            title: "Raise the Red Lantern",
            year: 1991,
            director: "Zhang Yimou",
            writer: "Ni Zhen",
            cinematographer: "Zhao Fei",
            editor: "Du Yuan",
            composer: "Zhao Jiping",
            studio: "China Film Co-Production Corporation / Era International",
            focus: "A masterpiece of suffocating formalist composition. Zhang utilizes incredibly rigid, symmetrical wide shots within a deeply oppressive, walled compound to visualize the inescapable, crushing weight of feudal patriarchy and tradition.",
            plot: "In 1920s China, a young, educated woman is forced to become the fourth wife of a wealthy, powerful lord, thrusting her into a bitter, psychologically devastating competition with the other wives for his nightly favor.",
            releaseDate: "September 10, 1991",
            country: "China / Hong Kong / Taiwan"
        },
        {
            title: "To Live",
            year: 1994,
            director: "Zhang Yimou",
            writer: "Lu Wei",
            cinematographer: "Lu Yue",
            editor: "Du Yuan",
            composer: "Zhao Jiping",
            studio: "Shanghai Film Studio / Era International",
            focus: "A departure from his rigid, highly stylized early work, Zhang adopts a sprawling, sweeping, and deeply empathetic historical lens to track the profound, unrelenting trauma inflicted upon the Chinese working class over decades.",
            plot: "Following a wealthy heir who loses his entire fortune to a gambling addiction, a resilient Chinese family endures four decades of unimaginably tragic, sweeping political and social upheaval, from the 1940s through the Cultural Revolution.",
            releaseDate: "May 17, 1994",
            country: "China / Hong Kong"
        },
        {
            title: "Hero",
            year: 2002,
            director: "Zhang Yimou",
            writer: "Li Feng / Zhang Yimou / Wang Bin",
            cinematographer: "Christopher Doyle",
            editor: "Zhai Ru / Angie Lam",
            composer: "Tan Dun",
            studio: "Beijing New Picture Film / Elite Group Enterprises",
            focus: "Zhang elevates the wuxia genre to high art through breathtaking, abstract visual storytelling, dividing the film into distinct, impossibly beautiful color-coded segments that represent different perspectives and shifting versions of reality.",
            plot: "In ancient China, during the violent warring states period, a nameless, stoic prefect arrives at the palace of a ruthless King, claiming to have slain the three legendary, seemingly invincible assassins who threatened his life.",
            releaseDate: "December 19, 2002",
            country: "China / Hong Kong"
        }
    ],
    'chen-kaige': [
        {
            title: "Yellow Earth",
            year: 1985,
            director: "Chen Kaige",
            writer: "Zhang Ziliang",
            cinematographer: "Zhang Yimou",
            editor: "Li Chunyan",
            composer: "Zhao Jiping",
            studio: "Guangxi Film Studio",
            focus: "The definitive film of the Fifth Generation. Chen and DP Zhang Yimou utilize stark, incredibly harsh, asymmetrical framing to dwarf their subjects against the massive, unyielding landscape, representing the crushing weight of rural tradition.",
            plot: "In 1939, an idealistic Communist soldier travels to a remote, deeply impoverished village on the Yellow Plateau to collect cheerful folk songs, only to be confronted by the brutal, inescapable misery of the local peasants' lives.",
            releaseDate: "April 1, 1985",
            country: "China"
        },
        {
            title: "Farewell My Concubine",
            year: 1993,
            director: "Chen Kaige",
            writer: "Lu Wei / Lilian Lee",
            cinematographer: "Gu Changwei",
            editor: "Pei Xiaonan",
            composer: "Zhao Jiping",
            studio: "Tomson Films / Maverick Picture Co. / China Film",
            focus: "A dizzyingly opulent, tragic historical epic. Chen utilizes heavily stylized, intensely theatrical lighting and incredibly dense production design to mirror the blurring boundary between the rigid art of the Peking Opera and the chaos of history.",
            plot: "The intense, life-long friendship and deeply unrequited love between two male Peking Opera stars is tested and ultimately shattered by a half-century of violent political turmoil and the introduction of a beautiful courtesan.",
            releaseDate: "January 1, 1993",
            country: "China / Hong Kong"
        }
    ],
    'tian-zhuangzhuang': [
        {
            title: "The Blue Kite",
            year: 1993,
            director: "Tian Zhuangzhuang",
            writer: "Xiao Mao",
            cinematographer: "Hou Yong",
            editor: "Qian Laili",
            composer: "Yoshihide Otomo",
            studio: "Beijing Film Studio / Longwick Film",
            focus: "Tian constructs an incredibly brave, unvarnished, and quietly devastating narrative, utilizing a gentle, observational camera perspective that chillingly contrasts the innocence of childhood with the rising, suffocating terror of totalitarianism.",
            plot: "Told from the perspective of a young boy growing up in 1950s and 60s Beijing, the film chronicles his family's agonizing, unrelenting suffering through the brutal political campaigns of the Hundred Flowers Movement and the Cultural Revolution.",
            releaseDate: "September 12, 1993",
            country: "China / Hong Kong"
        },
        {
            title: "Springtime in a Small Town",
            year: 2002,
            director: "Tian Zhuangzhuang",
            writer: "Ah Cheng",
            cinematographer: "Mark Lee Ping-bing",
            editor: "Xu Jianping",
            composer: "Zhao Li",
            studio: "China Film Group / Orisich Entertainment",
            focus: "A breathtakingly subtle, deeply respectful remake. Tian uses remarkably fluid, melancholic tracking shots and incredibly repressed, nuanced performances to explore profound emotional longing amidst the physical ruins of post-war China.",
            plot: "In the desolate aftermath of the Second Sino-Japanese War, a deeply depressed, sickly husband and his profoundly unhappy, isolated wife have their stagnant lives violently upended by the sudden arrival of his vibrant childhood friend.",
            releaseDate: "September 5, 2002",
            country: "China"
        }
    ],
    'jia-zhangke': [
        {
            title: "Platform",
            year: 2000,
            director: "Jia Zhangke",
            writer: "Jia Zhangke",
            cinematographer: "Yu Lik-wai",
            editor: "Chow Keung",
            composer: "Yoshihide Otomo",
            studio: "Huatong Film / Artcam International / T-Mark",
            focus: "The defining epic of the Sixth Generation. Jia utilizes incredibly long, static, ultra-wide shots to observe the slow, profound cultural and economic erosion of provincial life across a massive, transformative decade of Chinese history.",
            plot: "Spanning the massive cultural shifts of the 1980s, an amateur provincial theater troupe slowly transitions from performing rigid, state-sponsored Maoist propaganda to embracing Western pop music, breakdancing, and the rapid influx of capitalism.",
            releaseDate: "September 4, 2000",
            country: "China / Hong Kong / Japan / France"
        },
        {
            title: "Still Life",
            year: 2006,
            director: "Jia Zhangke",
            writer: "Jia Zhangke",
            cinematographer: "Yu Lik-wai",
            editor: "Kong Jinglei",
            composer: "Lim Giong",
            studio: "Xstream Pictures / Shanghai Film Group",
            focus: "Jia brilliantly blurs the line between documentary realism and surreal fiction, using slow, creeping pans across the devastating, apocalyptic destruction of the Three Gorges Dam project to visualize the human cost of rapid modernization.",
            plot: "In the ancient, rapidly flooding town of Fengjie, a coal miner desperately searches for the wife who left him 16 years ago, while simultaneously, a nurse searches for the husband who abandoned her.",
            releaseDate: "September 5, 2006",
            country: "China"
        },
        {
            title: "A Touch of Sin",
            year: 2013,
            director: "Jia Zhangke",
            writer: "Jia Zhangke",
            cinematographer: "Yu Lik-wai",
            editor: "Matthieu Laclau",
            composer: "Lim Giong",
            studio: "Xstream Pictures / Shanghai Film Group / Office Kitano",
            focus: "A drastic, violent departure from his usual observational style. Jia borrows the hyper-violent aesthetics of wuxia films to present four explosive, deeply shocking vignettes of working-class rage directly inspired by actual, modern news events.",
            plot: "Four completely disconnected, desperately marginalized citizens across vastly different regions of contemporary, ultra-capitalist China are pushed to their absolute psychological breaking points, ultimately lashing out in horrific, explosive acts of extreme violence.",
            releaseDate: "May 17, 2013",
            country: "China / Japan / France"
        }
    ],
    'lou-ye': [
        {
            title: "Suzhou River",
            year: 2000,
            director: "Lou Ye",
            writer: "Lou Ye",
            cinematographer: "Wang Yu",
            editor: "Karl Riedl",
            composer: "Jörg Lemberg",
            studio: "Dream Factory / Essential Filmproduktion",
            focus: "Lou crafts a hazy, deeply unreliable neo-noir heavily indebted to Hitchcock's *Vertigo*. He uses a gritty, subjective, handheld camera and a filthy, industrialized river setting to create a modern, deeply fatalistic urban fairy tale.",
            plot: "A mysterious, unseen videographer wandering the grimy industrial banks of Shanghai's Suzhou River becomes obsessed with the tragic, incredibly convoluted story of a petty criminal searching for his lost, potentially drowned lover.",
            releaseDate: "March 3, 2000",
            country: "China / Germany"
        },
        {
            title: "Summer Palace",
            year: 2006,
            director: "Lou Ye",
            writer: "Lou Ye / Ma Yingli / Feng Mei",
            cinematographer: "Qing Hua",
            editor: "Lou Ye / Zeng Jian",
            composer: "Peyman Yazdanian",
            studio: "Dream Factory / Rosem Films",
            focus: "A sprawling, deeply intimate, and highly controversial epic. Lou uses raw, uninhibited sexuality and chaotic, handheld cinematography to inextricably link the passionate recklessness of youth with the massive, devastating political trauma of 1989.",
            plot: "A naive young woman leaves her rural village to study at a prestigious Beijing university, where she embarks on a wildly passionate, destructive romance against the backdrop of the massive, ill-fated 1989 Tiananmen Square protests.",
            releaseDate: "May 18, 2006",
            country: "China / France"
        }
    ],
    'wang-xiaoshuai': [
        {
            title: "Beijing Bicycle",
            year: 2001,
            director: "Wang Xiaoshuai",
            writer: "Wang Xiaoshuai / Tang Dahon / Hsu Hsiao-ming / Peggy Chiao",
            cinematographer: "Liu Jie",
            editor: "Liao Ching-song",
            composer: "Wang Feng",
            studio: "Arc Light Films / Pyramide Productions",
            focus: "A gritty, kinetic reimagining of *The Bicycle Thief*. Wang utilizes tight, frantic tracking shots through the massive, unforgiving urban sprawl of Beijing to highlight the crushing, insurmountable socioeconomic divide between the city's youth.",
            plot: "A desperately poor, rural teenager moves to Beijing to work as a courier, but his entire livelihood is threatened when his newly issued, highly prized mountain bike is stolen and purchased by a stubborn local student.",
            releaseDate: "February 17, 2001",
            country: "China / Taiwan / France"
        },
        {
            title: "So Long, My Son",
            year: 2019,
            director: "Wang Xiaoshuai",
            writer: "Wang Xiaoshuai / Ah Mei",
            cinematographer: "Kim Hyun-seok",
            editor: "Lee Chatametikool",
            composer: "Dong Yingda",
            studio: "Dongchun Films / Hehe Pictures",
            focus: "A massive, profoundly emotional epic spanning three decades. Wang uses an incredibly complex, non-linear editing structure to weave a devastating tapestry of personal grief directly caused by the unyielding implementation of the one-child policy.",
            plot: "Following the tragic, accidental death of their only child, a deeply devoted, working-class Chinese couple attempts to navigate decades of unimaginable grief, economic upheaval, and state-mandated social policies that fundamentally destroy their lives.",
            releaseDate: "February 14, 2019",
            country: "China"
        }
    ],
    'diao-yinan': [
        {
            title: "Black Coal, Thin Ice",
            year: 2014,
            director: "Diao Yinan",
            writer: "Diao Yinan",
            cinematographer: "Jingsong Dong",
            editor: "Yang Hongyu",
            composer: "Wen Zi",
            studio: "Omnijoi Movie Co. / Boneyard Entertainment",
            focus: "A bleak, incredibly stylized neo-noir masterpiece. Diao uses striking, neon-lit compositions against the suffocating, frozen, desolate industrial landscapes of northern China to create an overwhelming atmosphere of profound moral decay and fatalism.",
            plot: "Five years after a deeply botched, horrific murder investigation destroyed his career, an alcoholic former detective realizes the gruesome, unsolved serial killings have suddenly started again, leading him to a mysterious widow.",
            releaseDate: "February 12, 2014",
            country: "China / Hong Kong"
        },
        {
            title: "The Wild Goose Lake",
            year: 2019,
            director: "Diao Yinan",
            writer: "Diao Yinan",
            cinematographer: "Jingsong Dong",
            editor: "Kong Jinglei",
            composer: "N/A",
            studio: "Green Ray Films / Memento Films",
            focus: "Diao pushes his neo-noir aesthetic to dazzling extremes, utilizing incredibly dense, rain-slicked neon lighting, complex staging within crowds, and sudden bursts of incredibly violent, stylish action in the lawless margins of a modern city.",
            plot: "A desperate, heavily pursued mob enforcer on the run after accidentally shooting a police officer strikes up a dangerous, incredibly fragile alliance with a mysterious 'bathing beauty' prostitute in a sprawling, lawless lakeside resort.",
            releaseDate: "May 18, 2019",
            country: "China / France"
        }
    ],
    'bi-gan': [
        {
            title: "Kaili Blues",
            year: 2015,
            director: "Bi Gan",
            writer: "Bi Gan",
            cinematographer: "Wang Tianxing",
            editor: "Qin Yanan",
            composer: "Lim Giong",
            studio: "Heaven Pictures / Blackfin Productions",
            focus: "Bi's astonishing debut completely shatters temporal logic, utilizing an incredibly complex, surreal 41-minute unbroken tracking shot through a dilapidated rural village to physically manifest the slippery, subjective nature of memory.",
            plot: "A melancholic country doctor and former convict sets out on a dreamlike, deeply poetic journey through the misty, lush subtropical province of Guizhou in search of his abandoned, missing nephew.",
            releaseDate: "July 11, 2015",
            country: "China"
        },
        {
            title: "Long Day's Journey Into Night",
            year: 2018,
            director: "Bi Gan",
            writer: "Bi Gan",
            cinematographer: "Yao Hung-i / Dong Jingsong / David Chizallet",
            editor: "Yanan Qin",
            composer: "Lim Giong / Point Hsu",
            studio: "Dangmai Films / Huace Pictures",
            focus: "An unparalleled, hallucinatory cinematic experience. The film's legendary second half consists entirely of a single, continuous 59-minute 3D tracking shot that descends into an incredibly elaborate, neon-soaked dreamscape of impossible architecture.",
            plot: "A deeply melancholic man returns to his damp, provincial hometown of Kaili to search for a mysterious, beautiful woman from his past, ultimately plunging into an incredibly strange, fractured dream logic to find her.",
            releaseDate: "May 15, 2018",
            country: "China / France"
        }
    ],
    'ning-hao': [
        {
            title: "Crazy Stone",
            year: 2006,
            director: "Ning Hao",
            writer: "Ning Hao / Wang Yao / Zhang Chenghzi",
            cinematographer: "Du Jie",
            editor: "Patrick Tam",
            composer: "Funky Sueyoshi",
            studio: "Focus Films / China Film Group",
            focus: "A massive, breakthrough hit that heavily utilizes Guy Ritchie-style kinetic editing, rapid-fire pacing, and incredibly intricate, intersecting hyper-linked storylines to deliver a brilliant, chaotic dark comedy of errors.",
            plot: "A highly valuable piece of jade discovered in a failing factory becomes the target of a desperately earnest security chief, a trio of bumbling local thieves, and a highly arrogant, ruthless international jewel thief.",
            releaseDate: "June 30, 2006",
            country: "China / Hong Kong"
        },
        {
            title: "No Man's Land",
            year: 2013,
            director: "Ning Hao",
            writer: "Ning Hao / Shu Huan / Xing Aina",
            cinematographer: "Du Jie",
            editor: "Jacob Cheung / Tang Hua",
            composer: "Nathan Wang",
            studio: "China Film Group / Dirty Monkey Films",
            focus: "Ning completely abandons his hyper-kinetic style for a brutal, incredibly bleak neo-Western aesthetic, utilizing the vast, scorching, desolate expanse of the Gobi Desert to explore a deeply nihilistic, lawless environment stripped of all morality.",
            plot: "An arrogant, deeply cynical big-city lawyer travels to the remote, lawless Gobi Desert to defend a notorious poacher, only to find himself trapped in a horrifying, escalating nightmare of violence and survival.",
            releaseDate: "December 3, 2013",
            country: "China"
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
    console.log("Starting TMDB fetch and database update for Chinese Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with Chinese films!");
}

run();
