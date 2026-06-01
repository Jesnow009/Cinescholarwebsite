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
    "K. K. Senthil Kumar": [
        {
            "id": "baahubali-the-beginning",
            "title": "Baahubali: The Beginning",
            "year": 2015,
            "director": "S. S. Rajamouli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Epic scale, rich colors, and massive VFX integration.",
            "plot": "A young man in ancient India discovers his royal heritage and confronts his destiny.",
            "releaseDate": "2015-07-09",
            "writer": "S. S. Rajamouli",
            "cinematographer": "K. K. Senthil Kumar",
            "editor": "Kotagiri Venkateswara Rao",
            "composer": "M. M. Keeravani",
            "studio": "Arka Media Works"
        },
        {
            "id": "rrr",
            "title": "RRR",
            "year": 2022,
            "director": "S. S. Rajamouli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic action photography and vivid, mythic visual storytelling.",
            "plot": "A fictitious story about two legendary Indian revolutionaries and their journey away from home before they started fighting for their country in the 1920s.",
            "releaseDate": "2022-03-24",
            "writer": "S. S. Rajamouli",
            "cinematographer": "K. K. Senthil Kumar",
            "editor": "A. Sreekar Prasad",
            "composer": "M. M. Keeravani",
            "studio": "DVV Entertainments"
        },
        {
            "id": "eega",
            "title": "Eega",
            "year": 2012,
            "director": "S. S. Rajamouli",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Macro photography and seamless integration of a CGI protagonist.",
            "plot": "A murdered man is reincarnated as a housefly and seeks to avenge his death.",
            "releaseDate": "2012-07-06",
            "writer": "S. S. Rajamouli",
            "cinematographer": "K. K. Senthil Kumar",
            "editor": "Kotagiri Venkateswara Rao",
            "composer": "M. M. Keeravani",
            "studio": "Varahi Chalana Chitram"
        }
    ],
    "V. S. Gnanasekhar": [
        {
            "id": "vedam",
            "title": "Vedam",
            "year": 2010,
            "director": "Jagarlamudi Radha Krishna (Krish)",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, grounded, multi-narrative visual style.",
            "plot": "Five distinct individuals from different strata of society are brought together by a terrorist attack in a hospital.",
            "releaseDate": "2010-06-04",
            "writer": "Jagarlamudi Radha Krishna (Krish)",
            "cinematographer": "V. S. Gnanasekhar",
            "editor": "Shravan Katikaneni",
            "composer": "M. M. Keeravani",
            "studio": "Arka Media Works"
        },
        {
            "id": "kanche",
            "title": "Kanche",
            "year": 2015,
            "director": "Jagarlamudi Radha Krishna (Krish)",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweeping historical and war sequences contrasted with rural India.",
            "plot": "During WWII, two friends from the same village fight in the British Indian Army in Europe, while their past caste conflicts haunt them.",
            "releaseDate": "2015-10-22",
            "writer": "Jagarlamudi Radha Krishna (Krish)",
            "cinematographer": "V. S. Gnanasekhar",
            "editor": "Suraj Jagtap, Rama Krishna Arram",
            "composer": "Chirantan Bhatt",
            "studio": "First Frame Entertainments"
        },
        {
            "id": "gautamiputra-satakarni",
            "title": "Gautamiputra Satakarni",
            "year": 2017,
            "director": "Jagarlamudi Radha Krishna (Krish)",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Rich, opulent historical drama visuals.",
            "plot": "The story of the 2nd century AD Satavahana ruler Gautamiputra Satakarni.",
            "releaseDate": "2017-01-12",
            "writer": "Jagarlamudi Radha Krishna (Krish)",
            "cinematographer": "V. S. Gnanasekhar",
            "editor": "Suraj Jagtap, Rama Krishna Arram",
            "composer": "Chirantan Bhatt",
            "studio": "First Frame Entertainments"
        }
    ],
    "Manoj Paramahamsa": [
        {
            "id": "eeram",
            "title": "Eeram",
            "year": 2009,
            "director": "Arivazhagan Venkatachalam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Cold, damp, and chilling atmospheric lighting.",
            "plot": "A police officer investigates a series of murders involving water as the murder weapon.",
            "releaseDate": "2009-09-11",
            "writer": "Arivazhagan Venkatachalam",
            "cinematographer": "Manoj Paramahamsa",
            "editor": "Kishore Te.",
            "composer": "Thaman S.",
            "studio": "S Pictures"
        },
        {
            "id": "ye-maaya-chesave",
            "title": "Ye Maaya Chesave",
            "year": 2010,
            "director": "Gautham Vasudev Menon",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, romantic, beautifully sunlit frames.",
            "plot": "A Hindu mechanical engineering graduate falls in love with a Christian woman, leading to conflict.",
            "releaseDate": "2010-02-26",
            "writer": "Gautham Vasudev Menon",
            "cinematographer": "Manoj Paramahamsa",
            "editor": "Anthony",
            "composer": "A. R. Rahman",
            "studio": "Indira Productions"
        },
        {
            "id": "leo",
            "title": "Leo",
            "year": 2023,
            "director": "Lokesh Kanagaraj",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "High-octane, fluid action sequences and striking color palettes.",
            "plot": "A mild-mannered cafe owner's life is turned upside down when a cartel suspects him of being their former assassin.",
            "releaseDate": "2023-10-19",
            "writer": "Lokesh Kanagaraj, Rathna Kumar, Deeraj Vaidy",
            "cinematographer": "Manoj Paramahamsa",
            "editor": "Philomin Raj",
            "composer": "Anirudh Ravichander",
            "studio": "Seven Screen Studio"
        }
    ],
    "P. S. Vinod": [
        {
            "id": "aaranya-kaandam",
            "title": "Aaranya Kaandam",
            "year": 2010,
            "director": "Thiagarajan Kumararaja",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, stylized neo-noir aesthetics.",
            "plot": "A day in the life of an aging don who has to deal with a younger rival and his own fading relevance.",
            "releaseDate": "2011-06-10",
            "writer": "Thiagarajan Kumararaja",
            "cinematographer": "P. S. Vinod",
            "editor": "Praveen K. L., N. B. Srikanth",
            "composer": "Yuvan Shankar Raja",
            "studio": "Capital Film Works"
        },
        {
            "id": "vikram-vedha",
            "title": "Vikram Vedha",
            "year": 2017,
            "director": "Pushkar-Gayathri",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "High-contrast, moody, distinct color coding for morality.",
            "plot": "A ruthless cop and a notorious gangster engage in a mind game that challenges their notions of good and evil.",
            "releaseDate": "2017-07-21",
            "writer": "Pushkar-Gayathri",
            "cinematographer": "P. S. Vinod",
            "editor": "Richard Kevin",
            "composer": "Sam C. S.",
            "studio": "YNOT Studios"
        },
        {
            "id": "sita-ramam",
            "title": "Sita Ramam",
            "year": 2022,
            "director": "Hanu Raghavapudi",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, sweeping, classical romantic photography.",
            "plot": "An orphaned soldier's life changes when he receives a letter from a girl named Sita, leading him on a journey to find her.",
            "releaseDate": "2022-08-05",
            "writer": "Hanu Raghavapudi",
            "cinematographer": "P. S. Vinod, Shreyaas Krishna",
            "editor": "Kotagiri Venkateswara Rao",
            "composer": "Vishal Chandrashekhar",
            "studio": "Vyjayanthi Movies / Swapna Cinema"
        }
    ],
    "R. Rathnavelu": [
        {
            "id": "sethu",
            "title": "Sethu",
            "year": 1999,
            "director": "Bala",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Raw, intense, unvarnished visual realism.",
            "plot": "A rough college rowdy falls in love with a timid Brahmin girl, leading to tragic consequences.",
            "releaseDate": "1999-12-10",
            "writer": "Bala",
            "cinematographer": "R. Rathnavelu",
            "editor": "J. N. Harsha",
            "composer": "Ilaiyaraaja",
            "studio": "Kodambakkam Creations"
        },
        {
            "id": "enthiran-robot",
            "title": "Enthiran (Robot)",
            "year": 2010,
            "director": "S. Shankar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sleek, highly polished sci-fi aesthetics and advanced VFX integration.",
            "plot": "A brilliant scientist creates a humanoid robot who develops emotions and falls in love with the scientist's girlfriend.",
            "releaseDate": "2010-10-01",
            "writer": "S. Shankar, Sujatha",
            "cinematographer": "R. Rathnavelu",
            "editor": "Anthony",
            "composer": "A. R. Rahman",
            "studio": "Sun Pictures"
        },
        {
            "id": "rangasthalam",
            "title": "Rangasthalam",
            "year": 2018,
            "director": "Sukumar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dusty, earthy, highly textured rustic cinematography.",
            "plot": "Two brothers in a village led by a tyrannical leader decide to oppose him, leading to violence and revenge.",
            "releaseDate": "2018-03-30",
            "writer": "Sukumar",
            "cinematographer": "R. Rathnavelu",
            "editor": "Navin Nooli",
            "composer": "Devi Sri Prasad",
            "studio": "Mythri Movie Makers"
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
                if (m.title.includes("Enthiran (Robot)")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Enthiran`;
                } else if (m.title.includes("Aaranya Kaandam")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Aaranya%20Kaandam`;
                }

                let mRes = await fetchJson(url);
                
                let posterUrl = null;
                if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
                    posterUrl = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
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
        console.log("Successfully updated Telugu Cinematographers");
    }
}

run();
