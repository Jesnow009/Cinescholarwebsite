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
        if (p.id === 'christopher-doyle' || p.name === 'Christopher Doyle') {
            p.mustWatch = [];
            const mood = {
                "id": "in-the-mood-for-love",
                "title": "In the Mood for Love (Fa yeung nin wa)",
                "year": 2000,
                "director": "Wong Kar-wai",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sultry, heavily saturated neon lighting evoking intense romantic longing.",
                "plot": "Two neighbors form a strong bond after both suspect extramarital activities of their spouses. However, they agree to keep their bond platonic so as not to commit similar wrongs.",
                "releaseDate": "2000-09-29",
                "writer": "Wong Kar-wai",
                "cinematographer": "Christopher Doyle, Mark Lee Ping-bing",
                "editor": "William Chang",
                "composer": "Michael Galasso, Shigeru Umebayashi",
                "studio": "Jet Tone Production"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=In%20the%20Mood%20for%20Love&year=2000`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mood.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mood);

            const chungking = {
                "id": "chungking-express",
                "title": "Chungking Express (Chung Hing sam lam)",
                "year": 1994,
                "director": "Wong Kar-wai",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, step-printed, smudged neon capturing the frantic energy of 90s Hong Kong.",
                "plot": "Two melancholy Hong Kong policemen fall in love: one with a mysterious female underworld figure, the other with a beautiful and airy server at a late-night restaurant he frequents.",
                "releaseDate": "1994-07-14",
                "writer": "Wong Kar-wai",
                "cinematographer": "Christopher Doyle, Andrew Lau",
                "editor": "William Chang, Kai Kit-wai, Kwong Chi-leung",
                "composer": "Frankie Chan, Roel A. Garcia",
                "studio": "Jet Tone Production"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Chungking%20Express&year=1994`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) chungking.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(chungking);

            const hero = {
                "id": "hero",
                "title": "Hero (Ying xiong)",
                "year": 2002,
                "director": "Zhang Yimou",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extravagant, hyper-stylized monochromatic color schemes defining different narrative threads.",
                "plot": "A defense officer, Nameless, was summoned by the King of Qin regarding his success of terminating three warriors.",
                "releaseDate": "2002-10-24",
                "writer": "Li Feng, Zhang Yimou, Wang Bin",
                "cinematographer": "Christopher Doyle",
                "editor": "Zhai Ru, Angie Lam",
                "composer": "Tan Dun",
                "studio": "Beijing New Picture Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Hero&year=2002`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) hero.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(hero);

            modified = true;
        }

        if (p.id === 'james-yuen' || p.name === 'James Yuen') {
            p.mustWatch = [];
            const warlords = {
                "id": "the-warlords",
                "title": "The Warlords (Tau ming chong)",
                "year": 2007,
                "director": "Peter Chan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated, gritty realism capturing the grim mud and blood of battle.",
                "plot": "Set in the 1860s, during the Taiping Rebellion in the late Qing Dynasty in China, three sworn brothers are forced to turn against one another by the harsh realities of war and political intrigue.",
                "releaseDate": "2007-12-13",
                "writer": "James Yuen, Xu Lan, Chun Tin-nam, Aubrey Lam",
                "cinematographer": "Arthur Wong",
                "editor": "Wenders Li, Wong Hoi, Yue Jing-ping",
                "composer": "Chan Kwong-wing, Peter Kam, Leon Ko",
                "studio": "Media Asia / China Film Group"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Warlords&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) warlords.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(warlords);

            const crazy = {
                "id": "crazy-n-the-city",
                "title": "Crazy N' The City (Sun gaing hup nui)",
                "year": 2005,
                "director": "James Yuen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, contemporary Hong Kong street aesthetics framing urban isolation.",
                "plot": "A seasoned police officer in Wan Chai navigates the bustling streets, dealing with colorful locals while mentoring a new, idealistic recruit.",
                "releaseDate": "2005-01-14",
                "writer": "James Yuen, Jessica Fong, Lo Yiu-fai",
                "cinematographer": "Keung Kwok-man",
                "editor": "Kwong Chi-leung",
                "composer": "Peter Kam",
                "studio": "Universe Entertainment"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Crazy%20N%27%20The%20City&year=2005`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) crazy.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(crazy);

            const heavenly = {
                "id": "heavenly-mission",
                "title": "Heavenly Mission (Tin heng tse)",
                "year": 2006,
                "director": "James Yuen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cool-toned, stylized framing invoking internal moral conflict.",
                "plot": "A Triad boss is released from a Thai prison after eight years. With the help of a monk, he seeks to leave the criminal world behind, but his past and former associates won't let him go easily.",
                "releaseDate": "2006-11-14",
                "writer": "James Yuen, Jessica Fong",
                "cinematographer": "Ng Man-Ching",
                "editor": "Angie Lam",
                "composer": "Henry Lai",
                "studio": "BMA Screenplay / Sil-Metropole Organisation"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Heavenly%20Mission&year=2006`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) heavenly.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(heavenly);

            modified = true;
        }

        if (p.id === 'poon-hang-sang' || p.name === 'Poon Hang-sang') {
            p.mustWatch = [];
            const ghost = {
                "id": "a-chinese-ghost-story",
                "title": "A Chinese Ghost Story",
                "year": 1987,
                "director": "Ching Siu-tung",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Ethereal, blue-tinted moonlight and floating, dreamlike camera movements.",
                "plot": "A debt collector spends the night in a haunted temple and falls in love with a beautiful female ghost, only to discover she is bound to a terrifying tree demon.",
                "releaseDate": "1987-07-18",
                "writer": "Yuen Kai-chi",
                "cinematographer": "Poon Hang-sang, Sander Lee, Wong Wing-hang, Tom Lau",
                "editor": "David Wu",
                "composer": "Romeo Diaz, James Wong",
                "studio": "Film Workshop"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Chinese%20Ghost%20Story&year=1987`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) ghost.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(ghost);

            const center = {
                "id": "center-stage",
                "title": "Center Stage",
                "year": 1991,
                "director": "Stanley Kwan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Luminous, deeply textured recreation of 1930s Shanghai glamor.",
                "plot": "A biopic of the tragic silent film star Ruan Lingyu, interweaving dramatized scenes with actual documentary footage and interviews.",
                "releaseDate": "1991-09-07",
                "writer": "Qiu Gangjian, Peggy Chiao",
                "cinematographer": "Poon Hang-sang",
                "editor": "Peter Cheung, Cheung Ka-fai, Keung Chuen-Tak",
                "composer": "Siu Chung",
                "studio": "Golden Harvest / Golden Way Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Center%20Stage&year=1991`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) center.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(center);

            const kungfu = {
                "id": "kung-fu-hustle",
                "title": "Kung Fu Hustle",
                "year": 2004,
                "director": "Stephen Chow",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, comic-book-inspired high-contrast lighting blending CGI with traditional wire-fu.",
                "plot": "In Shanghai, China in the 1940s, a wannabe gangster aspires to join the notorious 'Axe Gang' while residents of a housing complex exhibit extraordinary powers in defending their turf.",
                "releaseDate": "2004-12-23",
                "writer": "Stephen Chow, Tsang Kan-cheung, Xin Huo, Chan Man-keung",
                "cinematographer": "Poon Hang-sang",
                "editor": "Angie Lam",
                "composer": "Raymond Wong",
                "studio": "Columbia Pictures Film Production Asia"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Kung%20Fu%20Hustle&year=2004`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) kungfu.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(kungfu);

            modified = true;
        }

        if (p.id === 'arthur-wong' || p.name === 'Arthur Wong') {
            p.mustWatch = [];
            const warlords2 = {
                "id": "the-warlords",
                "title": "The Warlords (Tau ming chong)",
                "year": 2007,
                "director": "Peter Chan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated, gritty realism capturing the grim mud and blood of battle.",
                "plot": "Set in the 1860s, during the Taiping Rebellion in the late Qing Dynasty in China, three sworn brothers are forced to turn against one another by the harsh realities of war and political intrigue.",
                "releaseDate": "2007-12-13",
                "writer": "Xu Lan, Chun Tin-nam, Aubrey Lam, Huang Jianxin, Jojo Hui, He Jiping, Guo Junli, James Yuen",
                "cinematographer": "Arthur Wong",
                "editor": "Wenders Li",
                "composer": "Chan Kwong-wing, Peter Kam, Leon Ko, Chatchai Pongprapaphan",
                "studio": "Media Asia / China Film Group"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Warlords&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) warlords2.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(warlords2);

            const china = {
                "id": "once-upon-a-time-in-china",
                "title": "Once Upon a Time in China",
                "year": 1991,
                "director": "Tsui Hark",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dynamic, highly acrobatic low-angle tracking shots defining 90s martial arts epics.",
                "plot": "Wong Fei-Hung, a martial arts master, fights against foreign forces plundering China while navigating his complicated feelings for his modernized 'Aunt' Yee.",
                "releaseDate": "1991-08-15",
                "writer": "Tsui Hark, Yuen Kai-chi, Leung Yiu-ming, Elsa Tang",
                "cinematographer": "Arthur Wong, David Chung, Bill Wong, Ardy Lam, Wingo Chan, Wilson Chan",
                "editor": "Marco Mak",
                "composer": "James Wong",
                "studio": "Golden Harvest / Film Workshop"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Once%20Upon%20a%20Time%20in%20China&year=1991`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) china.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(china);

            const bodyguards = {
                "id": "bodyguards-and-assassins",
                "title": "Bodyguards and Assassins",
                "year": 2009,
                "director": "Teddy Chan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweeping, intricately choreographed crane shots traversing massive historical sets.",
                "plot": "In 1905, revolutionary Sun Yat-Sen visits Hong Kong to discuss plans with Tongmenghui members to overthrow the Qing dynasty. But when they find out that assassins have been sent to kill him, they assemble a group of protectors to prevent any attacks.",
                "releaseDate": "2009-12-18",
                "writer": "Guo Junli, Chun Tin-nam, Joyce Chan, Wu Bing",
                "cinematographer": "Arthur Wong",
                "editor": "Derek Hui, Wong Hoi",
                "composer": "Chan Kwong-wing, Peter Kam",
                "studio": "Cinema Popular / Polybona Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Bodyguards%20and%20Assassins&year=2009`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) bodyguards.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(bodyguards);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Hong Kong cinematographers.");
    }
}

run();
