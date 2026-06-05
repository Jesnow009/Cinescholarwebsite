const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Take Off": "Tense, relentless editing that heightens the suffocating pressure and urgency of a hostage crisis.",
    "C U Soon": "Innovative, fast-paced rhythm unfolding entirely through screens, meticulously piecing together a digital puzzle.",
    "Mayaanadhi": "Languid, deeply romantic pacing that lingers on silent moments, mirroring the tragic, inevitable flow of love.",
    "Kammatipaadam": "Gritty, non-linear editing that violently stitches together decades of urban decay and fragmented memories.",
    "Annayum Rasoolum": "Observational, realistic rhythm capturing the poetic, unhurried essence of everyday life in Kochi.",
    "Liars Dice": "Stark, methodical pacing that reflects the harsh, unforgiving journey through an alienated landscape.",
    "Angamaly Diaries": "Frenetic, unbroken momentum that thrusts the viewer into the chaotic, pulsating heart of local gang rivalries.",
    "Lucifer": "Sleek, mass-oriented editing that amplifies the mythological aura and calculated political chess games.",
    "Charlie": "Whimsical, free-flowing rhythm that mirrors the elusive, wandering spirit of its titular protagonist.",
    "Kumbalangi Nights": "Warm, textured editing that seamlessly weaves between humor, dysfunction, and profound emotional healing.",
    "Maheshinte Prathikaaram": "Delightful, observational pacing that finds subtle comedy and deep humanity in rural idiosyncrasies.",
    "Virus": "Urgent, multi-threaded editing that masterfully orchestrates a sprawling, high-stakes medical thriller."
};

const moviesByDirector = {
    "Mahesh Narayanan": [
        {
            title: "Take Off",
            country: "India",
            releaseDate: "March 24, 2017",
            year: 2017,
            director: "Mahesh Narayanan",
            writer: "Mahesh Narayanan / P. V. Shajikumar",
            cinematographer: "Sanu John Varghese",
            editor: "Mahesh Narayanan",
            composer: "Shaan Rahman / Gopi Sundar",
            studio: "Rajesh Pillai Films"
        },
        {
            title: "C U Soon",
            country: "India",
            releaseDate: "September 1, 2020",
            year: 2020,
            director: "Mahesh Narayanan",
            writer: "Mahesh Narayanan",
            cinematographer: "Sabin Uralikandy",
            editor: "Mahesh Narayanan",
            composer: "Gopi Sundar",
            studio: "Fahadh Faasil Productions / Macguffin Pictures"
        },
        {
            title: "Mayaanadhi",
            country: "India",
            releaseDate: "December 22, 2017",
            year: 2017,
            director: "Aashiq Abu",
            writer: "Syam Pushkaran / Dileesh Nair",
            cinematographer: "Jayesh Mohan",
            editor: "Mahesh Narayanan",
            composer: "Rex Vijayan",
            studio: "OPM Cinemas"
        }
    ],
    "B. Ajithkumar": [
        {
            title: "Kammatipaadam",
            country: "India",
            releaseDate: "May 20, 2016",
            year: 2016,
            director: "Rajeev Ravi",
            writer: "P. Balachandran",
            cinematographer: "Madhu Neelakandan",
            editor: "B. Ajithkumar",
            composer: "K / John P. Varkey / Vinayak Sasikumar",
            studio: "Global United Media"
        },
        {
            title: "Annayum Rasoolum",
            country: "India",
            releaseDate: "January 4, 2013",
            year: 2013,
            director: "Rajeev Ravi",
            writer: "Rajeev Ravi / G. Sethunath / Santhosh Echikkanam",
            cinematographer: "Madhu Neelakandan",
            editor: "B. Ajithkumar",
            composer: "K",
            studio: "D Thundiyil Films"
        },
        {
            title: "Liars Dice",
            country: "India",
            releaseDate: "October 5, 2013",
            year: 2013,
            director: "Geetu Mohandas",
            writer: "Geetu Mohandas",
            cinematographer: "Rajeev Ravi",
            editor: "B. Ajithkumar",
            studio: "Jar Pictures"
        }
    ],
    "Shameer Muhammed": [
        {
            title: "Angamaly Diaries",
            country: "India",
            releaseDate: "March 3, 2017",
            year: 2017,
            director: "Lijo Jose Pellissery",
            writer: "Chemban Vinod Jose",
            cinematographer: "Girish Gangadharan",
            editor: "Shameer Muhammed",
            composer: "Prashant Pillai",
            studio: "Friday Film House"
        },
        {
            title: "Lucifer",
            country: "India",
            releaseDate: "March 28, 2019",
            year: 2019,
            director: "Prithviraj Sukumaran",
            writer: "Murali Gopy",
            cinematographer: "Sujith Vaassudev",
            editor: "Shameer Muhammed",
            composer: "Deepak Dev",
            studio: "Aashirvad Cinemas"
        },
        {
            title: "Charlie",
            country: "India",
            releaseDate: "December 24, 2015",
            year: 2015,
            director: "Martin Prakkat",
            writer: "Unni R. / Martin Prakkat",
            cinematographer: "Jomon T. John",
            editor: "Shameer Muhammed",
            composer: "Gopi Sundar",
            studio: "Finding Cinema"
        }
    ],
    "Saiju Sreedharan": [
        {
            title: "Kumbalangi Nights",
            country: "India",
            releaseDate: "February 7, 2019",
            year: 2019,
            director: "Madhu C. Narayanan",
            writer: "Syam Pushkaran",
            cinematographer: "Shyju Khalid",
            editor: "Saiju Sreedharan",
            composer: "Sushin Shyam",
            studio: "Working Class Hero / Fahadh Faasil Productions"
        },
        {
            title: "Maheshinte Prathikaaram",
            country: "India",
            releaseDate: "February 5, 2016",
            year: 2016,
            director: "Dileesh Pothan",
            writer: "Syam Pushkaran",
            cinematographer: "Shyju Khalid",
            editor: "Saiju Sreedharan",
            composer: "Bijibal",
            studio: "OPM Dream Mill Cinema"
        },
        {
            title: "Virus",
            country: "India",
            releaseDate: "June 7, 2019",
            year: 2019,
            director: "Aashiq Abu",
            writer: "Muhsin Parari / Sharfu / Suhas",
            cinematographer: "Rajeev Ravi / Shyju Khalid",
            editor: "Saiju Sreedharan",
            composer: "Sushin Shyam",
            studio: "OPM Cinemas"
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
        let dirObj = editors.find(d => d.name.includes(dName.split(' ')[0]) && (d.region === "malayalam" || d.region.includes("malayalam")));

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
    console.log("Updated js/data.js for Malayalam Editors successfully.");
}

updateData().catch(console.error);
