const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error("HTTP Error", e);
        r(null);
    }));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');

    // Check if he already exists
    let exists = false;
    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'darius-khondji' || p.name === 'Darius Khondji') {
            exists = true;
            break;
        }
    }

    if (!exists) {
        let newDp = {
            "id": "darius-khondji",
            "name": "Darius Khondji",
            "region": ["iranian"],
            "image": "assets/cinematographers/darius_khondji.jpg",
            "bio": "Darius Khondji is an Iranian-French cinematographer known for his atmospheric, highly stylized visual aesthetic and frequent collaborations with acclaimed auteurs.",
            "mustWatch": []
        };
        
        // Fetch his profile picture
        let pRes = await fetchJson(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=Darius%20Khondji`);
        if (pRes && pRes.results && pRes.results.length > 0 && pRes.results[0].profile_path) {
            newDp.image = 'https://image.tmdb.org/t/p/w500' + pRes.results[0].profile_path;
            console.log("Found profile picture:", newDp.image);
        }

        const seven = {
            "id": "se7en",
            "title": "Se7en",
            "year": 1995,
            "director": "David Fincher",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dark, gritty, high-contrast shadows utilizing bleach bypass processing.",
            "plot": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
            "releaseDate": "1995-09-22",
            "writer": "Andrew Kevin Walker",
            "cinematographer": "Darius Khondji",
            "editor": "Richard Francis-Bruce",
            "composer": "Howard Shore",
            "studio": "New Line Cinema / Arnold Kopelson Productions"
        };
        let mRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Se7en&year=1995`);
        if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
            seven.poster = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
        } else {
            // fallback search for "Seven"
            let mRes2 = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Seven&year=1995`);
            if (mRes2 && mRes2.results && mRes2.results.length > 0 && mRes2.results[0].poster_path) {
                seven.poster = 'https://image.tmdb.org/t/p/w500' + mRes2.results[0].poster_path;
            }
        }
        newDp.mustWatch.push(seven);

        const paris = {
            "id": "midnight-in-paris",
            "title": "Midnight in Paris",
            "year": 2011,
            "director": "Woody Allen",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, golden, romanticized glowing tones evoking a nostalgic 1920s Paris.",
            "plot": "While on a trip to Paris with his fiancée's family, a nostalgic screenwriter finds himself mysteriously going back to the 1920s every day at midnight.",
            "releaseDate": "2011-05-11",
            "writer": "Woody Allen",
            "cinematographer": "Darius Khondji",
            "editor": "Alisa Lepselter",
            "composer": "Stephane Wrembel",
            "studio": "Mediapro / Gravier Productions"
        };
        mRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Midnight%20in%20Paris&year=2011`);
        if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
            paris.poster = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
        }
        newDp.mustWatch.push(paris);

        const gems = {
            "id": "uncut-gems",
            "title": "Uncut Gems",
            "year": 2019,
            "director": "Josh Safdie, Benny Safdie",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, highly textured 35mm grit capturing frantic urban anxiety.",
            "plot": "With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.",
            "releaseDate": "2019-12-13",
            "writer": "Josh Safdie, Benny Safdie, Ronald Bronstein",
            "cinematographer": "Darius Khondji",
            "editor": "Ronald Bronstein, Benny Safdie",
            "composer": "Daniel Lopatin",
            "studio": "A24 / IAC Pictures / Elara Pictures"
        };
        mRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Uncut%20Gems&year=2019`);
        if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
            gems.poster = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
        }
        newDp.mustWatch.push(gems);

        data.cinematographer.cinematographers.push(newDp);

        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully added Darius Khondji!");
    } else {
        console.log("Darius Khondji already exists.");
    }
}

run();
