const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Nayakan": "Epic, sprawling rhythm that meticulously builds the tragic, powerful rise and fall of an underworld don.",
    "Anjali": "Tender, emotional pacing that intimately captures the delicate, complex dynamics of a struggling family.",
    "Kadhalan": "Vibrant, kinetic editing that seamlessly integrates spectacular musical sequences with high-stakes action.",
    "Super Deluxe": "Audacious, multi-linear rhythm that effortlessly weaves disparate, eccentric narratives into a cohesive masterpiece.",
    "Kannathil Muthamittal": "Poignant, evocative pacing that beautifully balances the devastating impact of war with innocent familial love.",
    "RRR": "High-octane, spectacular editing that drives monumental action sequences with relentless, pulsating energy.",
    "Kaithi": "Tense, relentless momentum that grips the viewer through a single, adrenaline-fueled night of survival.",
    "Master": "Dynamic, stylish rhythm that amplifies the massive, charismatic clash between two powerhouse personas.",
    "Leo": "Ferocious, razor-sharp pacing that thrusts the narrative forward through brutal, visceral action sequences.",
    "Enthiran": "Sleek, futuristic editing that perfectly constructs the complex, rapid-fire logic of a rogue machine.",
    "Vinnathaandi Varuvaayaa": "Lyrical, deeply romantic pacing that lingers on the intense, quiet agonies of unfulfilled love.",
    "Sivaji: The Boss": "Explosive, larger-than-life rhythm designed to maximize mass appeal and theatrical grandeur.",
    "Mersal": "Fast-paced, high-energy editing that masterfully juggles multiple timelines and electrifying commercial elements.",
    "Pushpa: The Rise": "Raw, gritty pacing that mirrors the rugged, unforgiving terrain of the red sandalwood smuggling underworld.",
    "Jawan": "Hyper-kinetic, explosive rhythm that seamlessly integrates massive set pieces and intense emotional flashbacks."
};

const moviesByDirector = {
    "B. Lenin": [
        {
            title: "Nayakan",
            country: "India",
            releaseDate: "October 21, 1987",
            year: 1987,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "P. C. Sreeram",
            editor: "B. Lenin / V. T. Vijayan",
            composer: "Ilaiyaraaja",
            studio: "Muktha Films"
        },
        {
            title: "Anjali",
            country: "India",
            releaseDate: "July 12, 1990",
            year: 1990,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "Madhu Ambat",
            editor: "B. Lenin / V. T. Vijayan",
            composer: "Ilaiyaraaja",
            studio: "Sujatha Productions"
        },
        {
            title: "Kadhalan",
            country: "India",
            releaseDate: "September 17, 1994",
            year: 1994,
            director: "S. Shankar",
            writer: "S. Shankar",
            cinematographer: "Jeeva",
            editor: "B. Lenin / V. T. Vijayan",
            composer: "A. R. Rahman",
            studio: "Sri Surya Movies"
        }
    ],
    "A. Sreekar Prasad": [
        {
            title: "Super Deluxe",
            country: "India",
            releaseDate: "March 29, 2019",
            year: 2019,
            director: "Thiagarajan Kumararaja",
            writer: "Thiagarajan Kumararaja / Mysskin / Nalan Kumarasamy / Neelan K. Sekar",
            cinematographer: "P. S. Vinod / Nirav Shah",
            editor: "A. Sreekar Prasad",
            composer: "Yuvan Shankar Raja",
            studio: "Tyler Durden And Kino Fist / East West Dream Work Entertainment / Alchemy Vision Workings"
        },
        {
            title: "Kannathil Muthamittal",
            country: "India",
            releaseDate: "February 14, 2002",
            year: 2002,
            director: "Mani Ratnam",
            writer: "Mani Ratnam",
            cinematographer: "Ravi K. Chandran",
            editor: "A. Sreekar Prasad",
            composer: "A. R. Rahman",
            studio: "Madras Talkies"
        },
        {
            title: "RRR",
            country: "India",
            releaseDate: "March 25, 2022",
            year: 2022,
            director: "S. S. Rajamouli",
            writer: "S. S. Rajamouli",
            cinematographer: "K. K. Senthil Kumar",
            editor: "A. Sreekar Prasad",
            composer: "M. M. Keeravani",
            studio: "DVV Entertainment"
        }
    ],
    "Philomin Raj": [
        {
            title: "Kaithi",
            country: "India",
            releaseDate: "October 25, 2019",
            year: 2019,
            director: "Lokesh Kanagaraj",
            writer: "Lokesh Kanagaraj",
            cinematographer: "Sathyan Sooryan",
            editor: "Philomin Raj",
            composer: "Sam C. S.",
            studio: "Dream Warrior Pictures / Vivekananda Pictures"
        },
        {
            title: "Master",
            country: "India",
            releaseDate: "January 13, 2021",
            year: 2021,
            director: "Lokesh Kanagaraj",
            writer: "Lokesh Kanagaraj / Rathna Kumar / Pon Parthiban",
            cinematographer: "Sathyan Sooryan",
            editor: "Philomin Raj",
            composer: "Anirudh Ravichander",
            studio: "XB Film Creators / Seven Screen Studio"
        },
        {
            title: "Leo",
            country: "India",
            releaseDate: "October 19, 2023",
            year: 2023,
            director: "Lokesh Kanagaraj",
            writer: "Lokesh Kanagaraj / Rathna Kumar / Deeraj Vaidy",
            cinematographer: "Manoj Paramahamsa",
            editor: "Philomin Raj",
            composer: "Anirudh Ravichander",
            studio: "Seven Screen Studio"
        }
    ],
    "Anthony": [
        {
            title: "Enthiran",
            country: "India",
            releaseDate: "October 1, 2010",
            year: 2010,
            director: "S. Shankar",
            writer: "S. Shankar",
            cinematographer: "R. Rathnavelu",
            editor: "Anthony",
            composer: "A. R. Rahman",
            studio: "Sun Pictures"
        },
        {
            title: "Vinnathaandi Varuvaayaa",
            country: "India",
            releaseDate: "February 26, 2010",
            year: 2010,
            director: "Gautham Vasudev Menon",
            writer: "Gautham Vasudev Menon",
            cinematographer: "Manoj Paramahamsa",
            editor: "Anthony",
            composer: "A. R. Rahman",
            studio: "Escape Artists Motion Pictures / RS Infotainment"
        },
        {
            title: "Sivaji: The Boss",
            country: "India",
            releaseDate: "June 15, 2007",
            year: 2007,
            director: "S. Shankar",
            writer: "S. Shankar",
            cinematographer: "K. V. Anand",
            editor: "Anthony",
            composer: "A. R. Rahman",
            studio: "AVM Productions"
        }
    ],
    "Ruben": [
        {
            title: "Mersal",
            country: "India",
            releaseDate: "October 18, 2017",
            year: 2017,
            director: "Atlee",
            writer: "Atlee / K. V. Vijayendra Prasad / S. Ramana Girivasan",
            cinematographer: "G. K. Vishnu",
            editor: "Ruben",
            composer: "A. R. Rahman",
            studio: "Thenandal Studio Limited"
        },
        {
            title: "Pushpa: The Rise",
            country: "India",
            releaseDate: "December 17, 2021",
            year: 2021,
            director: "Sukumar",
            writer: "Sukumar",
            cinematographer: "Mirosław Kuba Brożek",
            editor: "Ruben / Karthika Srinivas",
            composer: "Devi Sri Prasad",
            studio: "Mythri Movie Makers / Muttamsetty Media"
        },
        {
            title: "Jawan",
            country: "India",
            releaseDate: "September 7, 2023",
            year: 2023,
            director: "Atlee",
            writer: "Atlee / S. Ramanagirivasan",
            cinematographer: "G. K. Vishnu",
            editor: "Ruben",
            composer: "Anirudh Ravichander",
            studio: "Red Chillies Entertainment"
        }
    ]
};

function fetchTMDB(query, year) {
  return new Promise((resolve) => {
    let searchTitle = query.split(' (')[0];
    
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTitle)}`;
    if (year) url += `&year=${year}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                const posterPath = json.results[0].poster_path;
                const overview = json.results[0].overview;
                resolve({
                    poster: posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null,
                    plot: overview || "Plot details not available."
                });
            } else {
                resolve({poster: null, plot: "Plot details not available."});
            }
        } catch(e) {
            resolve({poster: null, plot: "Plot details not available."});
        }
      });
    }).on('error', () => resolve({poster: null, plot: "Plot details not available."}));
  });
}

const pLimit = (limit) => {
    let activeCount = 0;
    const queue = [];
    const next = () => {
        activeCount--;
        if (queue.length > 0) {
            queue.shift()();
        }
    };
    return (fn) => new Promise((resolve, reject) => {
        const run = async () => {
            activeCount++;
            try {
                const result = await fn();
                resolve(result);
            } catch (error) {
                reject(error);
            }
            next();
        };
        if (activeCount < limit) {
            run();
        } else {
            queue.push(run);
        }
    });
};

const limit = pLimit(2);

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const editors = context.FILMS_DATA.editor.editors;
    
    for (const dName of Object.keys(moviesByDirector)) {
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "tamil" || d.region.includes("tamil")));

        if (dirObj) {
            const requestedMovies = moviesByDirector[dName];
            dirObj.mustWatch = [];
            
            for (let mv of requestedMovies) {
                let tmdbData = await limit(() => fetchTMDB(mv.title, mv.year));
                if (!tmdbData.poster || tmdbData.plot === "Plot details not available.") {
                    let fallback = await limit(() => fetchTMDB(mv.title));
                    if (fallback.poster) tmdbData.poster = fallback.poster;
                    if (fallback.plot !== "Plot details not available.") tmdbData.plot = fallback.plot;
                }

                let m = {};
                m.title = mv.title;
                if (mv.year) m.year = mv.year;
                if (mv.releaseDate) m.releaseDate = mv.releaseDate;
                if (mv.director) m.director = mv.director;
                if (mv.writer) m.writer = mv.writer;
                if (mv.cinematographer) m.cinematographer = mv.cinematographer;
                if (mv.editor) m.editor = mv.editor;
                if (mv.composer) m.composer = mv.composer;
                if (mv.studio) m.studio = mv.studio;
                if (mv.country) m.country = mv.country;
                if (tmdbData.poster) m.poster = tmdbData.poster;
                m.plot = tmdbData.plot;
                m.focus = focusMap[mv.title] || "Masterful editing technique.";
                
                dirObj.mustWatch.push(m);
            }
        } else {
            console.log("Could not find editor:", dName);
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js for Tamil Editors successfully.");
}

updateData().catch(console.error);
