const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', () => r(null)));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'gu-changwei' || p.name === 'Gu Changwei') {
            p.mustWatch = [];
            const farewell = {
                "id": "farewell-my-concubine",
                "title": "Farewell My Concubine (Ba wang bie ji)",
                "year": 1993,
                "director": "Chen Kaige",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sumptuous, highly theatrical lighting emphasizing intense reds and stage performance.",
                "plot": "Two boys meet at an opera training school in Peking in 1924. Their ensuing lifelong friendship is disastrously disrupted when one of them marries a former courtesan.",
                "releaseDate": "1993-01-01",
                "writer": "Lilian Lee, Lu Wei",
                "cinematographer": "Gu Changwei",
                "editor": "Pei Xiaonan",
                "composer": "Zhao Jiping",
                "studio": "Beijing Film Studio / Tomson Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Farewell%20My%20Concubine&year=1993`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) farewell.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(farewell);

            const judou = {
                "id": "ju-dou",
                "title": "Ju Dou",
                "year": 1990,
                "director": "Zhang Yimou, Yang Fengliang",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vivid, deeply saturated primary colors symbolizing passion and oppression.",
                "plot": "A woman married to the brutal and infertile owner of a dye mill in rural China conceives a boy with her husband's nephew but is forced to raise the child as her husband's heir.",
                "releaseDate": "1990-04-21",
                "writer": "Liu Heng",
                "cinematographer": "Gu Changwei, Yang Lun",
                "editor": "Du Yuan",
                "composer": "Zhao Jiping",
                "studio": "Xi'an Film Studio"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ju%20Dou&year=1990`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) judou.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(judou);

            const heat = {
                "id": "in-the-heat-of-the-sun",
                "title": "In the Heat of the Sun (Yang guang can lan de ri zi)",
                "year": 1994,
                "director": "Jiang Wen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, golden, hazy summer light invoking deep nostalgia.",
                "plot": "A coming-of-age tale set in Beijing during the Cultural Revolution. With their parents away, a group of teenagers are left to their own devices, fighting, falling in love, and roaming the streets.",
                "releaseDate": "1994-09-01",
                "writer": "Jiang Wen",
                "cinematographer": "Gu Changwei",
                "editor": "Zhou Ying",
                "composer": "Guo Wenjing",
                "studio": "China Film Co-Production Corp"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=In%20the%20Heat%20of%20the%20Sun&year=1994`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) heat.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(heat);

            modified = true;
        }

        if (p.id === 'zhao-fei' || p.name === 'Zhao Fei') {
            p.mustWatch = [];
            const lantern = {
                "id": "raise-the-red-lantern",
                "title": "Raise the Red Lantern (Da hong deng long gao gao gua)",
                "year": 1991,
                "director": "Zhang Yimou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rigid, highly symmetrical framing capturing claustrophobic courtyard architecture.",
                "plot": "China in the 1920s. After her father's death, 19-year-old Songlian is forced to marry Chen Zuoqian, the lord of a powerful family. Fifty-year-old Chen has already three wives, each of them living in a separate house within the great castle.",
                "releaseDate": "1991-09-10",
                "writer": "Ni Zhen",
                "cinematographer": "Zhao Fei",
                "editor": "Du Yuan",
                "composer": "Zhao Jiping",
                "studio": "Era International"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Raise%20the%20Red%20Lantern&year=1991`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) lantern.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(lantern);

            const emperor = {
                "id": "the-emperor-and-the-assassin",
                "title": "The Emperor and the Assassin (Jing Ke ci Qin Wang)",
                "year": 1998,
                "director": "Chen Kaige",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Epic, sweeping, highly textured 35mm historical scope.",
                "plot": "In pre-unified China, the King of Qin sends his concubine to a rival kingdom to produce an assassin for a political plot, but as the king's cruelty mounts, she finds her loyalties tested.",
                "releaseDate": "1998-10-08",
                "writer": "Chen Kaige, Wang Peigong",
                "cinematographer": "Zhao Fei",
                "editor": "Zhou Xinxia",
                "composer": "Zhao Jiping",
                "studio": "Beijing Film Studio"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Emperor%20and%20the%20Assassin&year=1998`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) emperor.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(emperor);

            const sweet = {
                "id": "sweet-and-lowdown",
                "title": "Sweet and Lowdown",
                "year": 1999,
                "director": "Woody Allen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, honey-toned lighting evoking nostalgic 1930s jazz clubs.",
                "plot": "In the 1930s, jazz guitarist Emmet Ray idolizes Django Reinhardt, faces a crippling inferiority complex, and treats his mute girlfriend with heartbreaking insensitivity.",
                "releaseDate": "1999-12-03",
                "writer": "Woody Allen",
                "cinematographer": "Zhao Fei",
                "editor": "Alisa Lepselter",
                "composer": "Dick Hyman",
                "studio": "Sweetland Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Sweet%20and%20Lowdown&year=1999`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) sweet.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(sweet);

            modified = true;
        }

        if (p.id === 'cao-yu' || p.name === 'Cao Yu') {
            p.mustWatch = [];
            const city = {
                "id": "city-of-life-and-death",
                "title": "City of Life and Death (Nanjing! Nanjing!)",
                "year": 2009,
                "director": "Lu Chuan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Harsh, unsparing black-and-white capturing the grittiness of war.",
                "plot": "In 1937 Japan occupied Nanjing, the Chinese capital. There was a battle and subsequent massacre. The film tells the story of several figures, both Chinese and Japanese.",
                "releaseDate": "2009-04-22",
                "writer": "Lu Chuan",
                "cinematographer": "Cao Yu",
                "editor": "Teng Yun",
                "composer": "Liu Tong",
                "studio": "China Film Group"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=City%20of%20Life%20and%20Death&year=2009`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) city.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(city);

            const eight = {
                "id": "the-eight-hundred",
                "title": "The Eight Hundred (Ba Bai)",
                "year": 2020,
                "director": "Guan Hu",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Monumental, high-contrast IMAX photography contrasting neon concessions with muddy trenches.",
                "plot": "From the acclaimed filmmaker behind Mr. Six comes this riveting war epic. In 1937, eight hundred Chinese soldiers fight under siege from a warehouse in the middle of the Shanghai battlefield, completely surrounded by the Japanese army.",
                "releaseDate": "2020-08-21",
                "writer": "Guan Hu, Ge Rui",
                "cinematographer": "Cao Yu",
                "editor": "Tu Yiran, He Yongyi",
                "composer": "Rupert Gregson-Williams, Andrew Kawczynski",
                "studio": "Huayi Brothers"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Eight%20Hundred&year=2020`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) eight.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(eight);

            const mountain = {
                "id": "kekexili-mountain-patrol",
                "title": "Kekexili: Mountain Patrol (Kekexili)",
                "year": 2004,
                "director": "Lu Chuan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, freezing, desaturated documentary-like realism on the Tibetan plateau.",
                "plot": "A journalist from Beijing travels to the harsh Kekexili region of Tibet to report on the struggle between poachers and the mountain patrol who try to protect the endangered Tibetan antelope.",
                "releaseDate": "2004-10-01",
                "writer": "Lu Chuan",
                "cinematographer": "Cao Yu",
                "editor": "Lu Chuan, Teng Yun",
                "composer": "Lao Zai",
                "studio": "Huayi Brothers / Columbia Pictures Film Production Asia"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Kekexili:%20Mountain%20Patrol&year=2004`);
            if (!sRes || !sRes.results || sRes.results.length === 0) {
                 sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mountain%20Patrol&year=2004`);
            }
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mountain.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mountain);

            modified = true;
        }

        if (p.id === 'peter-pau' || p.name === 'Peter Pau') {
            p.mustWatch = [];
            const crouching = {
                "id": "crouching-tiger-hidden-dragon",
                "title": "Crouching Tiger, Hidden Dragon (Wo hu cang long)",
                "year": 2000,
                "director": "Ang Lee",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lyrical, floating camera movements and varied, symbolic color palettes.",
                "plot": "Two warriors in pursuit of a stolen sword and a notorious fugitive are led to an impetuous, physically skilled, adolescent nobleman's daughter, who is at a crossroads in her life.",
                "releaseDate": "2000-07-06",
                "writer": "Wang Hui-ling, James Schamus, Tsai Kuo-jung",
                "cinematographer": "Peter Pau",
                "editor": "Tim Squyres",
                "composer": "Tan Dun",
                "studio": "Sony Pictures Classics / Edko Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Crouching%20Tiger,%20Hidden%20Dragon&year=2000`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) crouching.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(crouching);

            const bride = {
                "id": "the-bride-with-white-hair",
                "title": "The Bride with White Hair (Bai fa mo nu zhuan)",
                "year": 1993,
                "director": "Ronny Yu",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Highly stylized, expressionistic colors mixing martial arts with romantic fantasy.",
                "plot": "A master swordsman and a beautiful assassin fall in love, but their relationship is doomed by the long-standing blood feud between their respective clans.",
                "releaseDate": "1993-08-26",
                "writer": "Ronny Yu, David Wu, Lam Kee-To",
                "cinematographer": "Peter Pau",
                "editor": "David Wu",
                "composer": "Richard Yuen",
                "studio": "Mandarin Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Bride%20with%20White%20Hair&year=1993`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) bride.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(bride);

            const promise = {
                "id": "the-promise",
                "title": "The Promise (Wu ji)",
                "year": 2005,
                "director": "Chen Kaige",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extravagant, saturated CGI-enhanced fantasy lighting and vast scale.",
                "plot": "An orphan girl makes a pact with a sorceress: she will become a beautiful princess admired by all men, but she will never be with the man she truly loves.",
                "releaseDate": "2005-12-15",
                "writer": "Chen Kaige, Zhang Tan",
                "cinematographer": "Peter Pau",
                "editor": "Zhou Ying",
                "composer": "Klaus Badelt",
                "studio": "China Film Group"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Promise&year=2005`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) promise.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(promise);

            modified = true;
        }

        if (p.id === 'zhao-xiaoding' || p.name === 'Zhao Xiaoding') {
            p.mustWatch = [];
            const house = {
                "id": "house-of-flying-daggers",
                "title": "House of Flying Daggers (Shi mian mai fu)",
                "year": 2004,
                "director": "Zhang Yimou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Hyper-vibrant, painterly use of greens and golds in expansive bamboo forests.",
                "plot": "A romantic police captain breaks a beautiful member of a rebel group out of prison to help her rejoin her fellows, but things are not what they seem.",
                "releaseDate": "2004-07-16",
                "writer": "Li Feng, Zhang Yimou, Wang Bin",
                "cinematographer": "Zhao Xiaoding",
                "editor": "Cheng Long",
                "composer": "Shigeru Umebayashi",
                "studio": "Edko Films / Zhang Yimou Studio"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=House%20of%20Flying%20Daggers&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) house.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(house);

            const shadow = {
                "id": "shadow",
                "title": "Shadow (Ying)",
                "year": 2018,
                "director": "Zhang Yimou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated, almost monochromatic framing inspired by traditional Chinese ink-wash painting.",
                "plot": "In a kingdom ruled by a young and unpredictable king, the military commander has a secret weapon: a \"shadow\", a look-alike who can fool both his enemies and the King himself.",
                "releaseDate": "2018-09-30",
                "writer": "Zhang Yimou, Li Wei",
                "cinematographer": "Zhao Xiaoding",
                "editor": "Zhou Xiaolin",
                "composer": "Loudboy (Lao Zai)",
                "studio": "Perfect Village Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Shadow&year=2018`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) shadow.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(shadow);

            const curse = {
                "id": "curse-of-the-golden-flower",
                "title": "Curse of the Golden Flower (Man cheng jin dai huang jin jia)",
                "year": 2006,
                "director": "Zhang Yimou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extremely opulent, glowing yellows, golds, and reds maximizing imperial decadence.",
                "plot": "During China's Tang dynasty the emperor has taken the princess of a neighboring province as his wife. She has borne him two sons and raised his eldest. Now his control over his dominion is complete, including the royal family itself.",
                "releaseDate": "2006-12-14",
                "writer": "Zhang Yimou, Wu Nan, Bian Zhihong",
                "cinematographer": "Zhao Xiaoding",
                "editor": "Cheng Long",
                "composer": "Shigeru Umebayashi",
                "studio": "Edko Films / Beijing New Picture Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Curse%20of%20the%20Golden%20Flower&year=2006`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) curse.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(curse);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Chinese cinematographers.");
    }
}

run();
