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
        if (p.id === 'mahmoud-kalari' || p.name === 'Mahmoud Kalari') {
            p.mustWatch = [];
            const separation = {
                "id": "a-separation",
                "title": "A Separation (Jodaeiye Nader az Simin)",
                "year": 2011,
                "director": "Asghar Farhadi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Restless, naturalistic handheld camerawork emphasizing claustrophobic urban tension.",
                "plot": "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
                "releaseDate": "2011-03-16",
                "writer": "Asghar Farhadi",
                "cinematographer": "Mahmoud Kalari",
                "editor": "Hayedeh Safiyari",
                "composer": "Sattar Oraki",
                "studio": "Filmiran / Asghar Farhadi Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20Separation&year=2011`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) separation.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(separation);

            const wind = {
                "id": "the-wind-will-carry-us",
                "title": "The Wind Will Carry Us (Bad ma ra khahad bord)",
                "year": 1999,
                "director": "Abbas Kiarostami",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Expansive, dusty, sun-drenched wide shots of rural Iranian landscapes.",
                "plot": "An engineer and his colleagues from Tehran arrive in a remote village in Iranian Kurdistan to keep a vigil for a dying relative, but the wait becomes an existential journey.",
                "releaseDate": "1999-09-06",
                "writer": "Abbas Kiarostami",
                "cinematographer": "Mahmoud Kalari",
                "editor": "Abbas Kiarostami",
                "composer": "Peyman Yazdanian",
                "studio": "MK2 Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Wind%20Will%20Carry%20Us&year=1999`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) wind.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(wind);

            const gabbeh = {
                "id": "gabbeh",
                "title": "Gabbeh",
                "year": 1996,
                "director": "Mohsen Makhmalbaf",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extremely vibrant, painterly use of primary colors reflecting nomadic carpets.",
                "plot": "A magical realist tale of a young woman whose image is woven into a nomadic carpet (gabbeh) and who comes to life to tell the story of her clan and her forbidden love.",
                "releaseDate": "1996-06-28",
                "writer": "Mohsen Makhmalbaf",
                "cinematographer": "Mahmoud Kalari",
                "editor": "Mohsen Makhmalbaf",
                "composer": "Hossein Alizadeh",
                "studio": "Sanayeh Dasti / MK2 Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Gabbeh&year=1996`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) gabbeh.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(gabbeh);

            modified = true;
        }

        if (p.id === 'touraj-mansouri' || p.name === 'Touraj Mansouri') {
            p.mustWatch = [];
            const hamoun = {
                "id": "hamoun",
                "title": "Hamoun",
                "year": 1990,
                "director": "Dariush Mehrjui",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Frenetic, disjointed visual style mirroring the protagonist's psychological breakdown.",
                "plot": "A middle-class Iranian executive struggles with his wife's demand for a divorce, leading him on a chaotic, surreal journey through his past and present.",
                "releaseDate": "1990-01-01",
                "writer": "Dariush Mehrjui",
                "cinematographer": "Touraj Mansouri",
                "editor": "Hassan Hassandoost",
                "composer": "Nasser Cheshmazar",
                "studio": "Pakhshiran / Dariush Mehrjui Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Hamoun&year=1990`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) hamoun.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(hamoun);

            const sparrows = {
                "id": "the-song-of-sparrows",
                "title": "The Song of Sparrows (Avaze Gonjeshk-ha)",
                "year": 2008,
                "director": "Majid Majidi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, dusty naturalism contrasting the frantic city with serene rural life.",
                "plot": "An ostrich farmer living in a small village outside Tehran loses his job and begins working as a motorcycle taxi driver in the chaotic city to support his family.",
                "releaseDate": "2008-10-01",
                "writer": "Majid Majidi, Mehran Kashani",
                "cinematographer": "Touraj Mansouri",
                "editor": "Hassan Hassandoost",
                "composer": "Hossein Alizadeh",
                "studio": "Majid Majidi Film Production"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Song%20of%20Sparrows&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) sparrows.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(sparrows);

            const santouri = {
                "id": "santouri",
                "title": "Santouri",
                "year": 2007,
                "director": "Dariush Mehrjui",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, chaotic handheld camera capturing the descent into addiction.",
                "plot": "Ali, a master of the santour (a Persian stringed instrument), descends into heroin addiction, losing his wife, his career, and his dignity.",
                "releaseDate": "2007-02-01",
                "writer": "Dariush Mehrjui, Vahideh Mohammadifar",
                "cinematographer": "Touraj Mansouri",
                "editor": "Mehdi Hosseinvand",
                "composer": "Mohsen Chavoshi, Ardavan Kamkar",
                "studio": "Faramarz Farazmand Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Santouri&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) santouri.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(santouri);

            modified = true;
        }

        if (p.id === 'hossein-jafarian' || p.name === 'Hossein Jafarian') {
            p.mustWatch = [];
            const salesman = {
                "id": "the-salesman",
                "title": "The Salesman (Forushande)",
                "year": 2016,
                "director": "Asghar Farhadi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Claustrophobic, dimly lit interiors utilizing shadows to build psychological thriller elements.",
                "plot": "After their old flat becomes damaged, Emad and Rana, a young couple living in Tehran, are forced to move into a new apartment. However, once relocated, a sudden eruption of violence linked to the previous tenant of their new home dramatically changes the couple's life.",
                "releaseDate": "2016-01-01",
                "writer": "Asghar Farhadi",
                "cinematographer": "Hossein Jafarian",
                "editor": "Hayedeh Safiyari",
                "composer": "Sattar Oraki",
                "studio": "Asghar Farhadi Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Salesman&year=2016`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) salesman.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(salesman);

            const elly = {
                "id": "about-elly",
                "title": "About Elly (Darbareye Elly)",
                "year": 2009,
                "director": "Asghar Farhadi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, frantic handheld camera capturing group panic and seaside desolation.",
                "plot": "The mysterious disappearance of a kindergarten teacher during a picnic in the north of Iran is followed by a series of misadventures for her fellow passengers.",
                "releaseDate": "2009-01-01",
                "writer": "Asghar Farhadi",
                "cinematographer": "Hossein Jafarian",
                "editor": "Hayedeh Safiyari",
                "composer": "Andrea Bauer",
                "studio": "Simaye Mehr / Asghar Farhadi Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=About%20Elly&year=2009`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) elly.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(elly);

            const crimson = {
                "id": "crimson-gold",
                "title": "Crimson Gold (Talaye Sorkh)",
                "year": 2003,
                "director": "Jafar Panahi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cold, stark observational realism exposing urban class divides.",
                "plot": "A pizza delivery driver in Tehran is driven to desperation and crime by the glaring social inequalities he witnesses on his nightly rounds.",
                "releaseDate": "2003-01-01",
                "writer": "Abbas Kiarostami",
                "cinematographer": "Hossein Jafarian",
                "editor": "Jafar Panahi",
                "composer": "Peyman Yazdanian",
                "studio": "Jafar Panahi Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Crimson%20Gold&year=2003`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) crimson.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(crimson);

            const olive = {
                "id": "through-the-olive-trees",
                "title": "Through the Olive Trees (Zire Darakhatan Zeyton)",
                "year": 1994,
                "director": "Abbas Kiarostami",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Patient, distant extreme long shots emphasizing the vastness of the rural landscape.",
                "plot": "During the filming of an Iranian movie, the director is confronted with a real-life romance between two of his local actors, complicating the production.",
                "releaseDate": "1994-01-01",
                "writer": "Abbas Kiarostami",
                "cinematographer": "Hossein Jafarian, Farhad Saba",
                "editor": "Abbas Kiarostami",
                "composer": "Amir Farshid Rahimian, Chema Rosas",
                "studio": "Abbas Kiarostami Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Through%20the%20Olive%20Trees&year=1994`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) olive.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(olive);

            modified = true;
        }

        if (p.id === 'homayun-payvar' || p.name === 'Homayun Payvar') {
            p.mustWatch = [];
            const taste = {
                "id": "taste-of-cherry",
                "title": "Taste of Cherry (Ta'm-e gīlās)",
                "year": 1997,
                "director": "Abbas Kiarostami",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Minimalist, repetitive dusty landscapes framed almost entirely from inside a car.",
                "plot": "An Iranian man drives through the dusty outskirts of Tehran seeking someone to bury him after he commits suicide.",
                "releaseDate": "1997-01-01",
                "writer": "Abbas Kiarostami",
                "cinematographer": "Homayun Payvar",
                "editor": "Abbas Kiarostami",
                "composer": "None",
                "studio": "Abbas Kiarostami Productions / CiBy 2000"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Taste%20of%20Cherry&year=1997`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) taste.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(taste);

            const time = {
                "id": "whats-the-time-in-your-world",
                "title": "What's the Time in Your World? (Dar donya ye to saat chand ast?)",
                "year": 2014,
                "director": "Safi Yazdanian",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Nostalgic, warm, melancholic lighting of the northern Iranian city of Rasht.",
                "plot": "Goli returns to her hometown of Rasht after living in France for twenty years. She is welcomed by Farhad, a man she doesn't remember but who knows everything about her.",
                "releaseDate": "2014-01-01",
                "writer": "Safi Yazdanian",
                "cinematographer": "Homayun Payvar",
                "editor": "Fardin Saheb-Zamani",
                "composer": "Christophe Rezai",
                "studio": "Ali Mosaffa Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=What%27s%20the%20Time%20in%20Your%20World&year=2014`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) time.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(time);

            const life = {
                "id": "life-and-nothing-more",
                "title": "Life, and Nothing More... (Zendegi va digar hich)",
                "year": 1992,
                "director": "Abbas Kiarostami",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Documentary-like realism blending fiction and reality in a post-earthquake ruin.",
                "plot": "After the 1990 Manjil-Rudbar earthquake, a film director and his son travel to the devastated region to search for the young actors from his previous film.",
                "releaseDate": "1992-01-01",
                "writer": "Abbas Kiarostami",
                "cinematographer": "Homayun Payvar",
                "editor": "Abbas Kiarostami",
                "composer": "None",
                "studio": "Kanoon"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Life,%20and%20Nothing%20More&year=1992`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) life.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(life);

            modified = true;
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Iranian cinematographers.");
    }
}

run();
