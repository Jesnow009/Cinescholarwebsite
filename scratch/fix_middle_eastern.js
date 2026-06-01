const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error("HTTP Error", e.code);
        r(null);
    }));
}

const newData = {
    "Ahmed Al Morsy": [
        {
            "id": "the-blue-elephant",
            "title": "The Blue Elephant (El Feel El Azraq)",
            "year": 2014,
            "director": "Marwan Hamed",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "High-contrast, kinetic lighting.",
            "plot": "A psychiatrist returns to work at Abbasia Hospital after a five-year hiatus to face a haunting mystery.",
            "releaseDate": "2014-07-28",
            "writer": "Ahmed Mourad",
            "cinematographer": "Ahmed Al Morsy",
            "editor": "Ahmed Hafez",
            "composer": "Hesham Nazih",
            "studio": "Al Batros Film Production / Lighthouse Films / Shorouk Production"
        },
        {
            "id": "al-asleyeen",
            "title": "Al Asleyeen (The Originals)",
            "year": 2017,
            "director": "Marwan Hamed",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sleek, atmospheric modern thriller visuals.",
            "plot": "Samir is recruited by a secret society known as 'The Originals' to spy on citizens.",
            "releaseDate": "2017-06-25",
            "writer": "Ahmed Mourad",
            "cinematographer": "Ahmed Al Morsy",
            "editor": "Ahmed Hafez",
            "composer": "Hesham Nazih",
            "studio": "Red Star / New Century Production"
        },
        {
            "id": "kira-and-el-gin",
            "title": "Kira & El Gin",
            "year": 2022,
            "director": "Marwan Hamed",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Epic, grand-scale period cinematography.",
            "plot": "A historical action-drama following the Egyptian resistance against the British occupation during the 1919 revolution.",
            "releaseDate": "2022-06-30",
            "writer": "Ahmed Mourad",
            "cinematographer": "Ahmed Al Morsy",
            "editor": "Ahmed Hafez",
            "composer": "Hesham Nazih",
            "studio": "Synergy Films"
        }
    ],
    "Ramses Marzouk": [
        {
            "id": "alexandria-again-and-forever",
            "title": "Alexandria, Again and Forever (Iskendereya Kaman we Kaman)",
            "year": 1989,
            "director": "Youssef Chahine",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, evocative lighting mixing theatricality and naturalism.",
            "plot": "The third part of Youssef Chahine's autobiographical trilogy, chronicling the Egyptian film industry's struggles.",
            "releaseDate": "1989-08-30",
            "writer": "Youssef Chahine, Yousry Nasrallah",
            "cinematographer": "Ramses Marzouk",
            "editor": "Rashida Abdelsalam",
            "composer": "Mohamed Nouh",
            "studio": "Misr International Films"
        },
        {
            "id": "the-emigrant",
            "title": "The Emigrant (Al-Mohager)",
            "year": 1994,
            "director": "Youssef Chahine",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweeping, sun-drenched desert landscapes.",
            "plot": "A re-imagining of the Biblical story of Joseph, set in ancient Egypt.",
            "releaseDate": "1994-09-08",
            "writer": "Youssef Chahine, Rafik Al Sabban, Ahmed Kassem, Khaled Youssef",
            "cinematographer": "Ramses Marzouk",
            "editor": "Rashida Abdelsalam",
            "composer": "Mohamed Nouh",
            "studio": "Misr International Films / Ognon Pictures"
        },
        {
            "id": "the-destiny",
            "title": "The Destiny (Al-Masser)",
            "year": 1997,
            "director": "Youssef Chahine",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, golden historical hues and dynamic crowd staging.",
            "plot": "In 12th-century Andalusia, philosopher Averroes struggles against rising religious fanaticism.",
            "releaseDate": "1997-05-18",
            "writer": "Youssef Chahine, Khaled Youssef",
            "cinematographer": "Ramses Marzouk",
            "editor": "Rashida Abdelsalam",
            "composer": "Kamal Al Taweel, Yasser Abdel Rahman",
            "studio": "Misr International Films / Ognon Pictures"
        }
    ],
    "Joe Saade": [
        {
            "id": "costa-brava-lebanon",
            "title": "Costa Brava, Lebanon",
            "year": 2021,
            "director": "Mounia Akl",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Naturalistic, intimate portrait of a family against an encroaching wasteland.",
            "plot": "The Badri family have escaped the toxic pollution of Beirut by seeking refuge in the utopian mountain home they have built.",
            "releaseDate": "2021-09-05",
            "writer": "Mounia Akl, Clara Roquet",
            "cinematographer": "Joe Saade",
            "editor": "Carlos Marques-Marcet, Cyrille Mansour",
            "composer": "Nathan Larson",
            "studio": "Abbout Productions / Cinema Defacto / Lastor Media / Fox in the Snow"
        },
        {
            "id": "joyland",
            "title": "Joyland",
            "year": 2022,
            "director": "Saim Sadiq",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Richly colored, emotionally charged visual intimacy.",
            "plot": "The youngest son in a traditional Pakistani family takes a job as a backup dancer in a Bollywood-style burlesque, and falls in love with the strong-willed trans woman who runs the show.",
            "releaseDate": "2022-05-23",
            "writer": "Saim Sadiq, Maggie Briggs",
            "cinematographer": "Joe Saade",
            "editor": "Saim Sadiq, Jasmin Tenucci",
            "composer": "Abdullah Siddiqui",
            "studio": "All Caps / Khoosat Films / Diversity Hire Ltd. / One Two Twenty Entertainment"
        },
        {
            "id": "a-sad-and-beautiful-world",
            "title": "A Sad and Beautiful World (Nujoum Al-Amal Wal-Alam)",
            "year": 2025,
            "director": "Cyril Aris",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Tender, moody visual storytelling.",
            "plot": "A poignant exploration of love and despair across fractured lives in the Middle East.",
            "releaseDate": "2025-01-01",
            "writer": "Cyril Aris",
            "cinematographer": "Joe Saade",
            "editor": "Cyril Aris, Nat Sanders",
            "composer": "Anthony Sahyoun",
            "studio": "Abbout Productions / One Two Twenty Entertainment / Reynard Films"
        }
    ],
    "Tarek Ben Abdallah": [
        {
            "id": "bab-el-maqam",
            "title": "Bab el-Maqam (Passion)",
            "year": 2005,
            "director": "Mohamed Malas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, earthy tones capturing the musicality of Aleppo.",
            "plot": "A Syrian woman's love for singing classical music brings her into conflict with her conservative family and society.",
            "releaseDate": "2005-09-01",
            "writer": "Mohamed Malas",
            "cinematographer": "Tarek Ben Abdallah",
            "editor": "Khaled Al-Hajj",
            "composer": "Marcel Khalife",
            "studio": "Maram TV / Syros Films"
        },
        {
            "id": "the-legend-of-kaspar-hauser",
            "title": "The Legend of Kaspar Hauser (La leggenda di Kaspar Hauser)",
            "year": 2012,
            "director": "Davide Manuli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, surreal black-and-white digital cinematography.",
            "plot": "A surrealist, techno-driven reinterpretation of the Kaspar Hauser myth set on a deserted island.",
            "releaseDate": "2012-01-29",
            "writer": "Davide Manuli",
            "cinematographer": "Tarek Ben Abdallah",
            "editor": "Rosella Mocci",
            "composer": "Vitalic",
            "studio": "Shooting Hope Productions / Blue Light / Nero Fandango"
        },
        {
            "id": "palestine-stereo",
            "title": "Palestine Stereo (Falastine Stereo)",
            "year": 2013,
            "director": "Rashid Masharawi",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Raw, grounded realism amidst conflict.",
            "plot": "Two Palestinian brothers plan to emigrate to Canada after an Israeli airstrike destroys their home.",
            "releaseDate": "2013-09-10",
            "writer": "Rashid Masharawi",
            "cinematographer": "Tarek Ben Abdallah",
            "editor": "Jacques Comets",
            "composer": "Kais Sellami",
            "studio": "Cinepal Films / Cinetelefilms / Storm Films"
        }
    ]
};

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let name in newData) {
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-'));
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            // fetch posters
            for (let m of dp.mustWatch) {
                let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                let mRes = await fetchJson(url);
                
                if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
                    m.poster = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
                    console.log(`Found poster for ${m.title}`);
                } else {
                    console.log(`Could not find poster for ${m.title}`);
                }
            }
            modified = true;
        } else {
            console.log(`Could not find DP: ${name}`);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Middle Eastern Cinematographers");
    }
}

run();
