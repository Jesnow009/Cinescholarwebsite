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
    "Bhuvan Gowda": [
        {
            "id": "kgf-chapter-1",
            "title": "K.G.F: Chapter 1",
            "year": 2018,
            "director": "Prashanth Neel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dark, sepia-toned, high-contrast action visuals.",
            "plot": "In the 1970s, a fierce rebel rises against oppressive slavery in the Kolar Gold Fields.",
            "releaseDate": "2018-12-21",
            "writer": "Prashanth Neel",
            "cinematographer": "Bhuvan Gowda",
            "editor": "Srikanth Gowda",
            "composer": "Ravi Basrur",
            "studio": "Hombale Films"
        },
        {
            "id": "kgf-chapter-2",
            "title": "K.G.F: Chapter 2",
            "year": 2022,
            "director": "Prashanth Neel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Massive scale, dynamic lighting, and stylized slow-motion.",
            "plot": "The blood-soaked land of Kolar Gold Fields has a new overlord now, Rocky, whose name strikes fear in the heart of his foes.",
            "releaseDate": "2022-04-14",
            "writer": "Prashanth Neel",
            "cinematographer": "Bhuvan Gowda",
            "editor": "Ujwal Kulkarni",
            "composer": "Ravi Basrur",
            "studio": "Hombale Films"
        },
        {
            "id": "salaar-part-1-ceasefire",
            "title": "Salaar: Part 1 – Ceasefire",
            "year": 2023,
            "director": "Prashanth Neel",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, dystopian, and heavily textured cinematography.",
            "plot": "A gang leader makes a promise to a dying friend by taking on the other criminal gangs.",
            "releaseDate": "2023-12-22",
            "writer": "Prashanth Neel",
            "cinematographer": "Bhuvan Gowda",
            "editor": "Ujwal Kulkarni",
            "composer": "Ravi Basrur",
            "studio": "Hombale Films"
        }
    ],
    "S. Ramachandra": [
        {
            "id": "chomana-dudi",
            "title": "Chomana Dudi (Choma's Drum)",
            "year": 1975,
            "director": "B. V. Karanth",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Realistic, stark, unvarnished depiction of rural poverty and casteism.",
            "plot": "An untouchable bonded laborer struggles against extreme social and economic oppression.",
            "releaseDate": "1975-01-01",
            "writer": "Shivaram Karanth",
            "cinematographer": "S. Ramachandra",
            "editor": "G. V. Iyer",
            "composer": "B. V. Karanth",
            "studio": "Praja Films"
        },
        {
            "id": "ghatashraddha",
            "title": "Ghatashraddha (The Ritual)",
            "year": 1977,
            "director": "Girish Kasaravalli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Poignant, evocative black-and-white framing of orthodox society.",
            "plot": "A young Brahmin widow becomes pregnant and faces extreme excommunication from her orthodox community.",
            "releaseDate": "1977-01-01",
            "writer": "Girish Kasaravalli",
            "cinematographer": "S. Ramachandra",
            "editor": "M. N. Swamy",
            "composer": "B. V. Karanth",
            "studio": "Sadananda Suvarna Productions"
        },
        {
            "id": "mane",
            "title": "Mane (The House)",
            "year": 1990,
            "director": "Girish Kasaravalli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Claustrophobic, intimate, and psychologically dense visuals.",
            "plot": "A couple moves to the city in search of privacy and a better life, only to find noise and alienation.",
            "releaseDate": "1990-01-01",
            "writer": "Girish Kasaravalli",
            "cinematographer": "S. Ramachandra",
            "editor": "M. N. Swamy",
            "composer": "L. Vaidyanathan",
            "studio": "Film Folk"
        }
    ],
    "Karam Chawla": [
        {
            "id": "ulidavaru-kandanthe",
            "title": "Ulidavaru Kandanthe (As Seen by the Rest)",
            "year": 2014,
            "director": "Rakshit Shetty",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Distinctive color grading reflecting coastal Karnataka and neo-noir aesthetics.",
            "plot": "A journalist uncovers multiple perspectives of a murder that took place during a local festival.",
            "releaseDate": "2014-03-28",
            "writer": "Rakshit Shetty",
            "cinematographer": "Karam Chawla",
            "editor": "Sachin",
            "composer": "B. Ajaneesh Loknath",
            "studio": "Suvin Productions"
        },
        {
            "id": "kirik-party",
            "title": "Kirik Party",
            "year": 2016,
            "director": "Rishab Shetty",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Bright, youthful, vibrant frames transitioning with the protagonist's maturity.",
            "plot": "The journey of a group of engineering students from their freshman year to graduation.",
            "releaseDate": "2016-12-30",
            "writer": "Rishab Shetty, Rakshit Shetty",
            "cinematographer": "Karam Chawla",
            "editor": "Sachin Ravi",
            "composer": "B. Ajaneesh Loknath",
            "studio": "Paramvah Studios"
        },
        {
            "id": "avane-srimannarayana",
            "title": "Avane Srimannarayana",
            "year": 2019,
            "director": "Sachin Ravi",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stylized, Western-inspired cinematography with lavish set designs.",
            "plot": "A quirky police officer takes on a dangerous bandit chief to recover a missing treasure in a fictional town.",
            "releaseDate": "2019-12-27",
            "writer": "Rakshit Shetty, Chandrajith Belliappa, Abhijith Mahesh, Anirudh Kodgi, Nagarjun Sharma",
            "cinematographer": "Karam Chawla",
            "editor": "Sachin Ravi",
            "composer": "B. Ajaneesh Loknath, Charan Raj",
            "studio": "Pushkar Films / Paramvah Studios"
        }
    ],
    "Siddhartha Nuni": [
        {
            "id": "lucia",
            "title": "Lucia",
            "year": 2013,
            "director": "Pawan Kumar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Innovative use of color and black-and-white to distinguish reality from dreams.",
            "plot": "An usher at a movie theatre suffering from insomnia is tricked into buying a drug that causes his daydreams to come true.",
            "releaseDate": "2013-09-06",
            "writer": "Pawan Kumar",
            "cinematographer": "Siddhartha Nuni",
            "editor": "Sanath-Suresh, Pawan Kumar",
            "composer": "Poornachandra Tejaswi, Monish Kumar M. K., Santhosh Narayanan",
            "studio": "Audience Films"
        },
        {
            "id": "vendhu-thanindhathu-kaadu",
            "title": "Vendhu Thanindhathu Kaadu: Part I - The Kindling",
            "year": 2022,
            "director": "Gautham Vasudev Menon",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Raw, grounded, long takes reflecting a gritty underworld coming-of-age.",
            "plot": "A young man from a remote village moves to Mumbai and gets entangled in the city's unforgiving underworld.",
            "releaseDate": "2022-09-15",
            "writer": "Gautham Vasudev Menon, B. Jeyamohan",
            "cinematographer": "Siddhartha Nuni",
            "editor": "Anthony",
            "composer": "A. R. Rahman",
            "studio": "Vels Film International"
        },
        {
            "id": "captain-miller",
            "title": "Captain Miller",
            "year": 2024,
            "director": "Arun Matheswaran",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweeping, dusty, highly stylized historical action frames.",
            "plot": "A former British Indian Army soldier turns renegade to fight against the British colonial forces.",
            "releaseDate": "2024-01-12",
            "writer": "Arun Matheswaran, Madhan Karky",
            "cinematographer": "Siddhartha Nuni",
            "editor": "Nagooran Ramachandran",
            "composer": "G. V. Prakash Kumar",
            "studio": "Sathya Jyothi Films"
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
                let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                // Overrides for exact TMDB queries
                if (m.title.includes("K.G.F")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=K.G.F`;
                }

                let mRes = await fetchJson(url);
                
                let posterUrl = null;
                if (mRes && mRes.results && mRes.results.length > 0) {
                    // find correct year if possible
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
        console.log("Successfully updated Kannada Cinematographers");
    }
}

run();
