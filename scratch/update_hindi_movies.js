const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "Bimal Roy": [
    {
      "id": "do-bigha-zamin",
      "title": "Do Bigha Zamin",
      "year": 1953,
      "director": "Bimal Roy",
      "writer": "Hrishikesh Mukherjee",
      "cinematographer": "Kamal Bose",
      "editor": "Hrishikesh Mukherjee",
      "composer": "Salil Chowdhury",
      "studio": "Bimal Roy Productions",
      "focus": "De Sica-influenced neorealist city-migration staging, deep-focus agricultural composition, and class struggle narrative.",
      "plot": "An impoverished peasant and his young son travel to Calcutta to work as a rickshaw puller in order to earn enough money to save their ancestral land from a greedy landlord.",
      "releaseDate": "April 3, 1953",
      "country": "India"
    },
    {
      "id": "devdas",
      "title": "Devdas",
      "year": 1955,
      "director": "Bimal Roy",
      "writer": "Nabendu Ghosh",
      "cinematographer": "Kamal Bose",
      "editor": "Hrishikesh Mukherjee",
      "composer": "S. D. Burman",
      "studio": "Bimal Roy Productions",
      "focus": "Gothic romance tragedy staging, low-key expressionist lighting, and Hrishikesh Mukherjee's psychological editing.",
      "plot": "After his wealthy family forbids him from marrying his childhood love Paro, Devdas descends into alcoholism and self-destruction, seeking refuge with the courtesan Chandramukhi.",
      "releaseDate": "December 30, 1955",
      "country": "India"
    },
    {
      "id": "madhumati",
      "title": "Madhumati",
      "year": 1958,
      "director": "Bimal Roy",
      "writer": "Ritwik Ghatak",
      "cinematographer": "Dilip Gupta",
      "editor": "Hrishikesh Mukherjee",
      "composer": "Salil Chowdhury",
      "studio": "Bimal Roy Productions",
      "focus": "Gothic reincarnation staging, fog-shrouded forest cinematography, and Ritwik Ghatak's mythological-realist script.",
      "plot": "A man takes shelter in a derelict mansion during a storm and recalls his past life as an artist who fell in love with a tribal woman named Madhumati.",
      "releaseDate": "September 19, 1958",
      "country": "India"
    },
    {
      "id": "sujata",
      "title": "Sujata",
      "year": 1959,
      "director": "Bimal Roy",
      "writer": "Nabendu Ghosh",
      "cinematographer": "Kamal Bose",
      "editor": "Hrishikesh Mukherjee",
      "composer": "S. D. Burman",
      "studio": "Bimal Roy Productions",
      "focus": "Neorealist social critique, class-divide compositions, and S. D. Burman's humanistic song-sequence staging.",
      "plot": "A young untouchable girl is adopted by a Brahmin family, navigating severe social prejudice and internal family biases when she falls in love with an upper-caste man.",
      "releaseDate": "January 1, 1959",
      "country": "India"
    },
    {
      "id": "bandini",
      "title": "Bandini",
      "year": 1963,
      "director": "Bimal Roy",
      "writer": "Nabendu Ghosh",
      "cinematographer": "Kamal Bose",
      "editor": "Babu Sheikh / G. G. Mayekar",
      "composer": "S. D. Burman",
      "studio": "Bimal Roy Productions",
      "focus": "Prison female interiority staging, high-contrast shadow composition, and emotional restraint over sentimentality.",
      "plot": "In 1930s Bengal, a female prison inmate recounts the tragic love story and moral conflict that led her to commit a crime of passion.",
      "releaseDate": "January 1, 1963",
      "country": "India"
    }
  ],
  "Guru Dutt": [
    {
      "id": "pyaasa",
      "title": "Pyaasa",
      "year": 1957,
      "director": "Guru Dutt",
      "writer": "Abrar Alvi",
      "cinematographer": "V. K. Murthy",
      "editor": "Y. G. Chawhan",
      "composer": "S. D. Burman",
      "studio": "Guru Dutt Films Pvt. Ltd.",
      "focus": "Chiaroscuro expressionism, shaft-of-light compositions, and Urdu poetic song narrative integration.",
      "plot": "A disillusioned poet searches for love and recognition in a materialistic post-independence society, aided by a warm-hearted prostitute who believes in his art.",
      "releaseDate": "February 22, 1957",
      "country": "India"
    },
    {
      "id": "kaagaz-ke-phool",
      "title": "Kaagaz Ke Phool",
      "year": 1959,
      "director": "Guru Dutt",
      "writer": "Abrar Alvi",
      "cinematographer": "V. K. Murthy",
      "editor": "Y. G. Chawhan",
      "composer": "S. D. Burman",
      "studio": "Guru Dutt Films Pvt. Ltd.",
      "focus": "CinemaScope studio-decline staging, self-reflexive mirror framing, and V. K. Murthy's pioneering crane tracking.",
      "plot": "A famous film director discovers a new actress and rises to the peak of his career, but his life collapses into alcoholism and obscurity after his family rejects him.",
      "releaseDate": "January 2, 1959",
      "country": "India"
    },
    {
      "id": "aar-paar",
      "title": "Aar Paar",
      "year": 1954,
      "director": "Guru Dutt",
      "writer": "Abrar Alvi",
      "cinematographer": "V. K. Murthy",
      "editor": "Y. G. Chawhan",
      "composer": "O. P. Nayyar",
      "studio": "Guru Dutt Films Pvt. Ltd.",
      "focus": "Kinetic urban crime comedy, street-level location staging, and O. P. Nayyar's rhythmic musical integration.",
      "plot": "A taxi driver in Bombay finds himself caught between a gang of criminals, the police, and his love for two different women.",
      "releaseDate": "January 1, 1954",
      "country": "India"
    },
    {
      "id": "mr-mrs-55",
      "title": "Mr. & Mrs. '55",
      "year": 1955,
      "director": "Guru Dutt",
      "writer": "Abrar Alvi",
      "cinematographer": "V. K. Murthy",
      "editor": "Y. G. Chawhan",
      "composer": "O. P. Nayyar",
      "studio": "Guru Dutt Films Pvt. Ltd.",
      "focus": "Social comedy staging, tennis-court and pool-side modern compositions, and sharp satirical dialogue.",
      "plot": "A wealthy heiress is forced into a marriage of convenience with a struggling cartoonist to secure her inheritance, but genuine feelings soon complicate the arrangement.",
      "releaseDate": "January 1, 1955",
      "country": "India"
    },
    {
      "id": "baazi",
      "title": "Baazi",
      "year": 1951,
      "director": "Guru Dutt",
      "writer": "Balraj Sahni",
      "cinematographer": "V. K. Murthy",
      "editor": "Y. G. Chawhan",
      "composer": "S. D. Burman",
      "studio": "Navketan Films",
      "focus": "Classic noir shadows, crime thriller pacing, and Balraj Sahni's gritty social-realist script.",
      "plot": "A young gambler is drawn into a criminal syndicate to earn money for his sister's medical treatment, leading to a murder charge he must prove himself innocent of.",
      "releaseDate": "January 1, 1951",
      "country": "India"
    }
  ],
  "Mehboob Khan": [
    {
      "id": "mother-india",
      "title": "Mother India",
      "year": 1957,
      "director": "Mehboob Khan",
      "writer": "Mehboob Khan",
      "cinematographer": "Faredoon A. Irani",
      "editor": "Shamsudin Kadri",
      "composer": "Naushad",
      "studio": "Mehboob Productions",
      "focus": "Nationalist epic allegory, peasant-struggle framing, and mythological moral staging.",
      "plot": "An impoverished rural woman struggles to raise her sons in a drought-stricken village, confronting a predatory moneylender to maintain her moral integrity.",
      "releaseDate": "October 25, 1957",
      "country": "India"
    },
    {
      "id": "aan",
      "title": "Aan",
      "year": 1952,
      "director": "Mehboob Khan",
      "writer": "Mehboob Khan",
      "cinematographer": "Faredoon A. Irani",
      "editor": "Shamsudin Kadri",
      "composer": "Naushad",
      "studio": "Mehboob Productions",
      "focus": "Technicolor palace epic staging, action choreography, and Naushad's grand orchestral score.",
      "plot": "A peasant leader falls in love with a proud princess, leading to a political and military clash between royal forces and rural rebels.",
      "releaseDate": "January 1, 1952",
      "country": "India"
    },
    {
      "id": "andaz",
      "title": "Andaz",
      "year": 1949,
      "director": "Mehboob Khan",
      "writer": "J. B. H. Wadia",
      "cinematographer": "Faredoon A. Irani",
      "editor": "Shamsudin Kadri",
      "composer": "Naushad",
      "studio": "Mehboob Productions",
      "focus": "Modern high-society staging, psychological class jealousy, and dialogue-driven melodrama.",
      "plot": "A wealthy woman's platonic friendship with a modern city man is misinterpreted by her husband, leading to a tragic cycle of suspicion and violence.",
      "releaseDate": "March 21, 1949",
      "country": "India"
    },
    {
      "id": "anmol-ghadi",
      "title": "Anmol Ghadi",
      "year": 1946,
      "director": "Mehboob Khan",
      "writer": "Anwar Batalvi",
      "cinematographer": "Faredoon A. Irani",
      "editor": "Shamsudin Kadri",
      "composer": "Naushad",
      "studio": "Mehboob Productions",
      "focus": "Pre-partition romance staging, class barrier compositions, and classic musical pacing.",
      "plot": "Two childhood friends are separated by wealth and distance, holding onto a token watch as a promise of reunion in adulthood.",
      "releaseDate": "January 1, 1946",
      "country": "India"
    },
    {
      "id": "amar",
      "title": "Amar",
      "year": 1954,
      "director": "Mehboob Khan",
      "writer": "Mehboob Khan",
      "cinematographer": "Faredoon A. Irani",
      "editor": "Shamsudin Kadri",
      "composer": "Naushad",
      "studio": "Mehboob Productions",
      "focus": "Gothic moral guilt staging, low-key lighting, and intense dramatic character blocking.",
      "plot": "An upright lawyer commits a moment of moral weakness during a storm, leading to a lifelong struggle with guilt and justice.",
      "releaseDate": "January 1, 1954",
      "country": "India"
    }
  ],
  "Raj Kapoor": [
    {
      "id": "awara",
      "title": "Awara",
      "year": 1951,
      "director": "Raj Kapoor",
      "writer": "K. A. Abbas",
      "cinematographer": "Radhu Karmakar",
      "editor": "G. G. Mayekar",
      "composer": "Shankar-Jaikishan",
      "studio": "R. K. Films",
      "focus": "Chaplinesque socialist tramp populism, Expressionist dream-sequence staging, and class-divide allegory.",
      "plot": "A poor thief falls in love with a wealthy lawyer, leading to a dramatic trial that exposes the class divide and hereditary hypocrisy of justice.",
      "releaseDate": "December 14, 1951",
      "country": "India"
    },
    {
      "id": "shree-420",
      "title": "Shree 420",
      "year": 1955,
      "director": "Raj Kapoor",
      "writer": "K. A. Abbas",
      "cinematographer": "Radhu Karmakar",
      "editor": "G. G. Mayekar",
      "composer": "Shankar-Jaikishan",
      "studio": "R. K. Films",
      "focus": "Bombay city satire, corrupt metropolis staging, and spectacular rain-drenched song composition.",
      "plot": "An honest country boy travels to Bombay to make it big but is quickly seduced into a life of corruption and gambling by wealthy con artists.",
      "releaseDate": "September 6, 1955",
      "country": "India"
    },
    {
      "id": "mera-naam-joker",
      "title": "Mera Naam Joker",
      "year": 1970,
      "director": "Raj Kapoor",
      "writer": "K. A. Abbas",
      "cinematographer": "Radhu Karmakar",
      "editor": "Raj Kapoor",
      "composer": "Shankar-Jaikishan",
      "studio": "R. K. Films",
      "focus": "Autobiographical circus allegory, tragicomic close-up clown-makeup staging, and three-act narrative structure.",
      "plot": "A circus clown tells the story of his life through three key relationships, using his public humor to mask his private sorrows.",
      "releaseDate": "December 18, 1970",
      "country": "India"
    },
    {
      "id": "sangam",
      "title": "Sangam",
      "year": 1964,
      "director": "Raj Kapoor",
      "writer": "Inder Raj Anand",
      "cinematographer": "Radhu Karmakar",
      "editor": "Raj Kapoor",
      "composer": "Shankar-Jaikishan",
      "studio": "R. K. Films",
      "focus": "Grand Technicolor melodrama staging, European locations photography, and intense three-way character geometry.",
      "plot": "Two childhood friends fall in love with the same woman, leading to sacrifice, marital tension, and tragic misunderstandings when one goes to war.",
      "releaseDate": "June 18, 1964",
      "country": "India"
    },
    {
      "id": "bobby",
      "title": "Bobby",
      "year": 1973,
      "director": "Raj Kapoor",
      "writer": "K. A. Abbas",
      "cinematographer": "Radhu Karmakar",
      "editor": "Raj Kapoor",
      "composer": "Laxmikant-Pyarelal",
      "studio": "R. K. Films",
      "focus": "Teen romance visual rebellion, modern pop-colour design, and Laxmikant-Pyarelal's youth anthem score.",
      "plot": "The son of a wealthy businessman falls in love with the granddaughter of a poor fisherman, defying intense family opposition and class barriers.",
      "releaseDate": "September 28, 1973",
      "country": "India"
    }
  ],
  "Vijay Anand": [
    {
      "id": "guide",
      "title": "Guide",
      "year": 1965,
      "director": "Vijay Anand",
      "writer": "Vijay Anand",
      "cinematographer": "Fali Mistry",
      "editor": "Vijay Anand",
      "composer": "S. D. Burman",
      "studio": "Navketan Films",
      "focus": "Contemplative location-based song choreography, complex moral-ambiguity staging, and spiritual journey narrative.",
      "plot": "A tourist guide falls in love with a married woman who wants to dance, helping her rise to fame but falling into a trap of greed and eventual spiritual redemption.",
      "releaseDate": "February 6, 1965",
      "country": "India"
    },
    {
      "id": "jewel-thief",
      "title": "Jewel Thief",
      "year": 1967,
      "director": "Vijay Anand",
      "writer": "Vijay Anand",
      "cinematographer": "V. Ratra",
      "editor": "Vijay Anand",
      "composer": "S. D. Burman",
      "studio": "Navketan Films",
      "focus": "Slick suspense espionage staging, mirror reflection play, and rapid non-linear climax editing.",
      "plot": "An ordinary man is mistaken for a notorious jewel thief, forcing him to work with the police to infiltrate a mysterious crime ring.",
      "releaseDate": "January 1, 1967",
      "country": "India"
    },
    {
      "id": "teesri-manzil",
      "title": "Teesri Manzil",
      "year": 1966,
      "director": "Vijay Anand",
      "writer": "Nasir Hussain",
      "cinematographer": "N. V. Srinivas",
      "editor": "Vijay Anand",
      "composer": "R. D. Burman",
      "studio": "Nasir Hussain Films",
      "focus": "Kinetic thriller pacing, visual reflection geometry, and R. D. Burman's brassy rock-and-roll song sequence tracking.",
      "plot": "A young woman seeks revenge on a nightclub drummer she believes is responsible for her sister's death, but falls in love with him under a false identity.",
      "releaseDate": "January 1, 1966",
      "country": "India"
    },
    {
      "id": "johny-mera-naam",
      "title": "Johny Mera Naam",
      "year": 1970,
      "director": "Vijay Anand",
      "writer": "Vijay Anand",
      "cinematographer": "Fali Mistry",
      "editor": "Vijay Anand",
      "composer": "Kalyanji-Anandji",
      "studio": "Trimurti Films",
      "focus": "Slick crime caper staging, identity deception geometry, and Kalyanji-Anandji's upbeat musical tracking.",
      "plot": "Two brothers separated in childhood grow up on opposite sides of the law, crossing paths in a smuggling ring where they must uncover their past.",
      "releaseDate": "January 1, 1970",
      "country": "India"
    },
    {
      "id": "tere-ghar-ke-samne",
      "title": "Tere Ghar Ke Samne",
      "year": 1963,
      "director": "Vijay Anand",
      "writer": "Vijay Anand",
      "cinematographer": "V. Ratra",
      "editor": "Vijay Anand",
      "composer": "S. D. Burman",
      "studio": "Navketan Films",
      "focus": "Architectural comedy staging, spatial split-screens, and romantic glass/reflection compositions.",
      "plot": "An architect is hired by two rival fathers to build identical houses facing each other, falling in love with the daughter of his father's rival.",
      "releaseDate": "January 1, 1963",
      "country": "India"
    }
  ]
};

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve(null); }
      });
    }).on('error', e => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const dbPath = path.join(__dirname, '..', 'temp_data.js');
  let dataStr = fs.readFileSync(dbPath, 'utf8');

  // Load database
  let c = dataStr.replace('module.exports = FILMS_DATA;', 'module.exports = FILMS_DATA;');
  // Evaluate FILMS_DATA
  global.FILMS_DATA = null;
  const modData = dataStr.replace('const FILMS_DATA =', 'FILMS_DATA =');
  eval(modData);

  const filmsData = global.FILMS_DATA;
  if (!filmsData) {
    console.error('Failed to load temp_data.js');
    process.exit(1);
  }

  // Update Hindi directors' movies and download posters
  for (const directorName of Object.keys(directorsData)) {
    const movies = directorsData[directorName];
    const directorObj = filmsData.director.directors.find(d => d.name === directorName);

    if (!directorObj) {
      console.error(`Could not find director ${directorName} in database`);
      continue;
    }

    console.log(`Updating ${directorName}...`);
    const updatedMustWatch = [];

    for (const movie of movies) {
      const filename = `${movie.id}.jpg`;
      const query = encodeURIComponent(movie.title);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${movie.year}`;

      await wait(1500);
      let mRes = await fetchJson(url);
      let posterUrl = null;

      if (mRes && mRes.results && mRes.results.length > 0) {
        let result = mRes.results[0];
        if (result && result.poster_path) {
          posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
        }
      }

      if (!posterUrl) {
        // try without year
        const fallbackUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        await wait(1500);
        mRes = await fetchJson(fallbackUrl);
        if (mRes && mRes.results && mRes.results.length > 0) {
          let result = mRes.results[0];
          if (result && result.poster_path) {
            posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
          }
        }
      }

      if (posterUrl) {
        console.log(`  Found poster for ${movie.title}: ${posterUrl}`);
        const targetPath = path.join(__dirname, '..', 'assets', 'images', filename);
        try {
          await download(posterUrl, targetPath);
          movie.poster = `assets/images/${filename}`;
          console.log(`  Downloaded successfully!`);
        } catch (e) {
          console.error(`  Failed to download poster for ${movie.title}`, e.message);
          movie.poster = `assets/images/${filename}`; // fallback to local path anyway
        }
      } else {
        console.log(`  No poster found on TMDB for ${movie.title}. Using placeholder path.`);
        movie.poster = `assets/images/${filename}`;
      }

      updatedMustWatch.push(movie);
    }

    directorObj.mustWatch = updatedMustWatch;
  }

  // Write updated database back to temp_data.js
  const output = `const FILMS_DATA = ${JSON.stringify(filmsData, null, 4)};\n\nmodule.exports = FILMS_DATA;\n`;
  fs.writeFileSync(dbPath, output, 'utf8');
  console.log('Successfully updated temp_data.js!');
}

run();
