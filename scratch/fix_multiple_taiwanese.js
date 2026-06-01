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
        if (p.id === 'mark-lee-ping-bing' || p.name === 'Mark Lee Ping-bing') {
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
                "studio": "Jet Tone Production / Block 2 Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=In%20the%20Mood%20for%20Love&year=2000`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mood.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mood);

            const renoir = {
                "id": "renoir",
                "title": "Renoir",
                "year": 2012,
                "director": "Gilles Bourdos",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Luminous, sun-dappled impressionistic landscapes mimicking classic French paintings.",
                "plot": "Set on the French Riviera in the summer of 1915, Jean Renoir returns home to convalesce after being wounded in World War I. At his side is Andrée, a young woman who rejuvenates, enchants, and inspires both father and son.",
                "releaseDate": "2013-01-02",
                "writer": "Gilles Bourdos, Jérôme Tonnerre",
                "cinematographer": "Mark Lee Ping-bing",
                "editor": "Yannick Kergoat",
                "composer": "Alexandre Desplat",
                "studio": "Fidélité Films / Mars Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Renoir`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) renoir.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(renoir);

            const time = {
                "id": "the-time-to-live-and-the-time-to-die",
                "title": "The Time to Live and the Time to Die (Tong nian wang shi)",
                "year": 1985,
                "director": "Hou Hsiao-hsien",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, naturalistic, static long takes establishing patient observational realism.",
                "plot": "A coming-of-age story about a young boy named Ah-ha, exploring the trials of adolescence, family tragedy, and shifting cultural identity in rural Taiwan.",
                "releaseDate": "1985-08-03",
                "writer": "Hou Hsiao-hsien, Chu Tien-wen",
                "cinematographer": "Mark Lee Ping-bing",
                "editor": "Liao Ching-sung",
                "composer": "Wu Chu-chu",
                "studio": "Central Motion Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Time%20to%20Live%20and%20the%20Time%20to%20Die&year=1985`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) time.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(time);

            modified = true;
        }

        if (p.id === 'liao-pen-jung' || p.name === 'Liao Pen-jung') {
            p.mustWatch = [];
            const dragon = {
                "id": "goodbye-dragon-inn",
                "title": "Goodbye, Dragon Inn (Bu san)",
                "year": 2003,
                "director": "Tsai Ming-liang",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extremely still, melancholic long takes embracing negative space and shadows.",
                "plot": "On the last night before an old Taipei cinema closes its doors forever, a few lingering patrons and staff silently navigate the dark, rain-soaked auditorium while a classic martial arts film plays on screen.",
                "releaseDate": "2003-08-29",
                "writer": "Tsai Ming-liang",
                "cinematographer": "Liao Pen-jung",
                "editor": "Chen Sheng-chang",
                "composer": "None",
                "studio": "Homegreen Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Goodbye,%20Dragon%20Inn&year=2003`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) dragon.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(dragon);

            const stray = {
                "id": "stray-dogs",
                "title": "Stray Dogs (Jiao you)",
                "year": 2013,
                "director": "Tsai Ming-liang",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, unblinking static shots reflecting urban decay and psychological endurance.",
                "plot": "An alcoholic man and his two young children struggle to survive in Taipei. They cross paths with a lonely grocery clerk who might offer them a glimmer of hope.",
                "releaseDate": "2013-09-05",
                "writer": "Tsai Ming-liang, Tung Cheng-yu, Peng Fei",
                "cinematographer": "Liao Pen-jung, Shong Woon-chong",
                "editor": "Lei Chen-ching",
                "composer": "None",
                "studio": "Homegreen Films / JBA Production"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Stray%20Dogs&year=2013`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) stray.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(stray);

            const vive = {
                "id": "vive-lamour",
                "title": "Vive L'Amour (Ai qing wan sui)",
                "year": 1994,
                "director": "Tsai Ming-liang",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cold, sterile, geometric framing highlighting modern alienation.",
                "plot": "Three lonely people unknowingly share a vacant apartment in Taipei, their lives silently intersecting in a poignant exploration of urban isolation.",
                "releaseDate": "1994-09-02",
                "writer": "Tsai Ming-liang, Yang Pi-ying",
                "cinematographer": "Liao Pen-jung",
                "editor": "Sung Hsiu-hsiung",
                "composer": "None",
                "studio": "Central Motion Picture Corporation"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Vive%20L%27Amour&year=1994`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) vive.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(vive);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Taiwanese cinematographers.");
    }
}

run();
