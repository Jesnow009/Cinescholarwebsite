const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => r(JSON.parse(data)));
        }).on('error', e => {
            console.error("HTTP Error", e.code);
            r(null);
        });
        req.setTimeout(5000, () => {
            req.abort();
            console.error("HTTP Timeout");
            r(null);
        });
    });
}

const newData = {
    "Sudhakar Reddy Yakkanti": [
        {
            "id": "sairat",
            "title": "Sairat",
            "year": 2016,
            "director": "Nagraj Manjule",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant, earthy, and sun-drenched rural landscapes.",
            "plot": "Two college students from different castes fall in love, sparking violent conflict between their families.",
            "releaseDate": "2016-04-29",
            "writer": "Nagraj Manjule",
            "cinematographer": "Sudhakar Reddy Yakkanti",
            "editor": "Kutub Inamdar",
            "composer": "Ajay-Atul",
            "studio": "Aatpat Productions / Zee Studios"
        },
        {
            "id": "naal",
            "title": "Naal",
            "year": 2018,
            "director": "Sudhakar Reddy Yakkanti",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intimate, grounded, and emotionally observant framing.",
            "plot": "A young boy's journey of discovering his roots and experiencing the emotional complexities of childhood.",
            "releaseDate": "2018-11-16",
            "writer": "Sudhakar Reddy Yakkanti",
            "cinematographer": "Sudhakar Reddy Yakkanti",
            "editor": "Sanchari Das Moulik",
            "composer": "Advait Nemlekar",
            "studio": "Aatpat Productions / Zee Studios"
        },
        {
            "id": "jhund",
            "title": "Jhund",
            "year": 2022,
            "director": "Nagraj Manjule",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dynamic, kinetic, and highly textured urban realism.",
            "plot": "Based on the life of Vijay Barse, a retired sports teacher who founded an NGO called Slum Soccer.",
            "releaseDate": "2022-03-04",
            "writer": "Nagraj Manjule",
            "cinematographer": "Sudhakar Reddy Yakkanti",
            "editor": "Kutub Inamdar",
            "composer": "Ajay-Atul",
            "studio": "T-Series Films / Albraz Entertainment / Aatpat Productions"
        }
    ],
    "Savita Singh": [
        {
            "id": "phoonk",
            "title": "Phoonk",
            "year": 2008,
            "director": "Ram Gopal Varma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Shadowy, eerie, high-contrast psychological horror visuals.",
            "plot": "A rational man is forced to reconsider his beliefs when his daughter is seemingly possessed by an evil spirit.",
            "releaseDate": "2008-08-22",
            "writer": "Milind Gadagkar",
            "cinematographer": "Savita Singh",
            "editor": "Amit Parmar / Nipun Ashok Gupta",
            "composer": "Amar Mohile / Bapi-Tutul",
            "studio": "One More Thought Entertainment / Zed 3 Pictures"
        },
        {
            "id": "hawaizaada",
            "title": "Hawaizaada",
            "year": 2015,
            "director": "Vibhu Puri",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, whimsical, golden-hued period fantasy aesthetics.",
            "plot": "Based on the life of Shivkar Bapuji Talpade, who is credited with constructing India's first unmanned plane.",
            "releaseDate": "2015-01-30",
            "writer": "Vibhu Puri / Saurabh Bhave",
            "cinematographer": "Savita Singh",
            "editor": "Shan Mohammed",
            "composer": "Rochak Kohli / Ayushmann Khurrana / Mangesh Dhakde",
            "studio": "Reliance Entertainment / Trilogic Digital Media / FilmKraft"
        },
        {
            "id": "ventilator",
            "title": "Ventilator",
            "year": 2016,
            "director": "Rajesh Mapuskar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Claustrophobic, realistic, clinical lighting reflecting a hospital setting.",
            "plot": "A large joint family reunites at a hospital when their patriarch goes into a coma just days before the Ganesha festival.",
            "releaseDate": "2016-11-04",
            "writer": "Rajesh Mapuskar",
            "cinematographer": "Savita Singh",
            "editor": "Rameshwar S. Bhagat",
            "composer": "Rohan-Rohan",
            "studio": "Purple Pebble Pictures"
        }
    ],
    "Vikram Amladi": [
        {
            "id": "fandry",
            "title": "Fandry",
            "year": 2013,
            "director": "Nagraj Manjule",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Harsh, unvarnished, deeply observational social realism.",
            "plot": "A teenage Dalit boy falls in love with an upper-caste girl in a village marked by severe caste discrimination.",
            "releaseDate": "2013-10-18",
            "writer": "Nagraj Manjule",
            "cinematographer": "Vikram Amladi",
            "editor": "Chandan Arora",
            "composer": "Alokananda Dasgupta",
            "studio": "Navalkha Arts / Holy Basil Productions"
        },
        {
            "id": "ribbon",
            "title": "Ribbon",
            "year": 2017,
            "director": "Rakhee Sandilya",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Naturalistic, handheld, documentary-style intimate framing.",
            "plot": "A young working couple in Mumbai navigates the overwhelming challenges of an unplanned pregnancy.",
            "releaseDate": "2017-11-03",
            "writer": "Rakhee Sandilya / Rajeev Upadhyay",
            "cinematographer": "Vikram Amladi",
            "editor": "Redice Films",
            "composer": "Sagar Desai",
            "studio": "Redice Productions"
        },
        {
            "id": "kuldip-patwal",
            "title": "Kuldip Patwal: I Didn't Do It!",
            "year": 2017,
            "director": "Remy Kohli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Tense, moody, low-key lighting reflecting a courtroom drama.",
            "plot": "A commoner is accused of assassinating a local politician, leading to a complex and gripping trial.",
            "releaseDate": "2017-12-15",
            "writer": "Remy Kohli / Rahul Ramchandani",
            "cinematographer": "Vikram Amladi",
            "editor": "Shounok Ghosh",
            "composer": "Alokananda Dasgupta",
            "studio": "Rapid Eye Motion Pictures"
        }
    ]
};

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let name in newData) {
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-').replace(/\./g, ''));
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            // fetch posters
            for (let m of dp.mustWatch) {
                let query = encodeURIComponent(m.title.split(':')[0].trim());
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
                
                let mRes = await fetchJson(url);
                
                let posterUrl = null;
                if (mRes && mRes.results && mRes.results.length > 0) {
                    // find closest year if possible
                    let result = mRes.results.find(r => r.release_date && r.release_date.startsWith(m.year.toString()));
                    if (!result) result = mRes.results[0]; // fallback to first
                    
                    if (result && result.poster_path) {
                        posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                    }
                }

                if (posterUrl) {
                    m.poster = posterUrl;
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
        console.log("Successfully updated Marathi Cinematographers");
    }
}

run();
