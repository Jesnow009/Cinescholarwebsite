const fs = require('fs');
const https = require('https');
const vm = require('vm');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const focusMap = {
    "Tropical Malady": "Split-narrative structure, jungle myths, and shape-shifting tigers",
    "Uncle Boonmee Who Can Recall His Past Lives": "Red-eyed monkey ghosts, cave staging, and spiritual transitions",
    "Cemetery of Splendour": "Sleeping soldiers, neon light therapy tubes, medium visitations",
    "Last Life in the Universe": "Cultural displacement, suicidal ideation, and minimalist urban aesthetics",
    "6ixtynin9": "Dark comedy, existential crisis, and apartment-bound suspense",
    "Nang Nak": "Traditional folklore, atmospheric horror, and tragic romance",
    "Manila in the Claws of Light": "Social realism, urban decay, and systemic corruption in Marcos-era Philippines",
    "Insiang": "Slum life claustrophobia, revenge narratives, and female victimization",
    "Norte, the End of History": "Durational cinema, moral philosophy, and Dostoevskian themes",
    "The Woman Who Left": "Black-and-white cinematography, long takes, and post-incarceration alienation",
    "Kinatay": "Real-time descent into depravity, handheld camerawork, and extreme realism",
    "Ma' Rosa": "Corruption in the police force, gritty slum aesthetics, and survival economics",
    "Memories of My Body": "Gender fluidity, traditional Lengger dance, and political trauma",
    "Satan's Slaves": "Islamic horror tropes, atmospheric dread, and family trauma",
    "Impetigore": "Javanese shadow puppetry, village curses, and folk horror elements",
    "Vengeance Is Mine, All Others Pay Cash": "Homage to 80s action cinema, toxic masculinity, and romance",
    "The Scent of Green Papaya": "Exquisite studio sets, sensory details, and silent observation",
    "The Cyclo": "Urban alienation, kinetic violence, and the poetry of poverty",
    "The Missing Picture": "Clay figurine animation, Khmer Rouge atrocities, and autobiographical memory",
    "Sepet": "Interracial romance, multicultural Malaysian identity, and naturalistic dialogue",
    "Mee Pok Man": "Urban loneliness, gritty nocturnal Singapore, and morbid obsession"
};

function fetchTMDBOverview(query, year) {
  return new Promise((resolve) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    if (year) {
        url += `&year=${year}`;
    }
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.results && json.results.length > 0) {
                const overview = json.results[0].overview;
                resolve(overview || "Plot details not available.");
            } else {
                resolve("Plot details not available.");
            }
        } catch(e) {
            resolve("Plot details not available.");
        }
      });
    }).on('error', () => resolve("Plot details not available."));
  });
}

async function updateData() {
    let content = fs.readFileSync('js/data.js', 'utf8');
    content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');
    
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);

    const directors = context.FILMS_DATA.director.directors;
    const seDirectors = directors.filter(d => d.region === "southeast-asian");
    
    for (const dirObj of seDirectors) {
        if (dirObj.mustWatch) {
            for (let mv of dirObj.mustWatch) {
                if (!mv.focus) {
                    mv.focus = focusMap[mv.title] || "Cinematic storytelling and cultural exploration.";
                }
                if (!mv.plot) {
                    let plot = await fetchTMDBOverview(mv.title, mv.year);
                    if (plot === "Plot details not available.") {
                        plot = await fetchTMDBOverview(mv.title); // try without year
                    }
                    mv.plot = plot;
                }
            }
        }
    }

    let newContent = JSON.stringify(context.FILMS_DATA, null, 4);
    const finalFileContent = 'const FILMS_DATA = ' + newContent + ';\n';
    fs.writeFileSync('js/data.js', finalFileContent, 'utf8');
    console.log("Updated js/data.js with focus and plot successfully.");
}

updateData().catch(console.error);
