const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "Dadasaheb Phalke": [
    {
      "id": "raja-harishchandra",
      "title": "Raja Harishchandra",
      "year": 1913,
      "director": "Dadasaheb Phalke",
      "writer": "Dadasaheb Phalke",
      "cinematographer": "Trymbak B. Telang",
      "editor": "Dadasaheb Phalke",
      "composer": "Silent",
      "studio": "Phalke Films Company",
      "focus": "The dawn of Indian cinema, utilizing stage-like proscenium framing and pioneering stop-trick double exposure special effects.",
      "plot": "To honor his word to the sage Vishwamitra, the virtuous King Harishchandra sacrifices his royal kingdom, his family, and his freedom.",
      "releaseDate": "May 3, 1913",
      "country": "India"
    },
    {
      "id": "lanka-dahan",
      "title": "Lanka Dahan",
      "year": 1917,
      "director": "Dadasaheb Phalke",
      "writer": "Dadasaheb Phalke",
      "cinematographer": "Trymbak B. Telang",
      "editor": "Dadasaheb Phalke",
      "composer": "Silent",
      "studio": "Phalke Films Company",
      "focus": "Pioneering mythological trick photography, multiple exposure effects, and Anna Salunke playing both Rama and Sita in a double role.",
      "plot": "The mythological episode of Hanuman setting fire to Lanka and rescuing the abducted Sita from the demon king Ravana.",
      "releaseDate": "September 17, 1917",
      "country": "India"
    },
    {
      "id": "kaliya-mardan",
      "title": "Kaliya Mardan",
      "year": 1919,
      "director": "Dadasaheb Phalke",
      "writer": "Dadasaheb Phalke",
      "cinematographer": "Trymbak B. Telang",
      "editor": "Dadasaheb Phalke",
      "composer": "Silent",
      "studio": "Hindustan Cinema Film Company",
      "focus": "Early underwater cinematography, impressive double exposure visual trickery, and Mandakini Phalke's charismatic portrayal of child Krishna.",
      "plot": "The childhood adventures of Lord Krishna, culminating in his heroic subduing of the venomous multi-headed serpent Kaliya in the Yamuna River.",
      "releaseDate": "May 3, 1919",
      "country": "India"
    }
  ],
  "V. Shantaram": [
    {
      "id": "duniya-na-mane",
      "title": "Duniya Na Mane",
      "year": 1937,
      "director": "V. Shantaram",
      "writer": "Anant Kanekar",
      "cinematographer": "V. Avadhoot",
      "editor": "Chintamani Borvankar",
      "composer": "Keshavrao Bhole",
      "studio": "Prabhat Film Company",
      "focus": "Social critique on child marriage, expressionist lighting and shadow play, and a clock ticking as a recurring motif of entrapment.",
      "plot": "A young, spirited woman is deceptively married off to an elderly widower, choosing to resist consummation and challenge orthodox social norms.",
      "releaseDate": "March 26, 1937",
      "country": "India"
    },
    {
      "id": "aadmi",
      "title": "Aadmi",
      "year": 1939,
      "director": "V. Shantaram",
      "writer": "Anant Kanekar",
      "cinematographer": "V. Avadhoot",
      "editor": "A. R. Shaikh",
      "composer": "Master Krishnarao",
      "studio": "Prabhat Film Company",
      "focus": "Humanist urban social realism, high-contrast night-time cinematography, and empathetic framing of social outcasts.",
      "plot": "A warm-hearted police constable falls in love with and tries to rehabilitate a prostitute, facing intense opposition from society and his mother.",
      "releaseDate": "September 13, 1939",
      "country": "India"
    },
    {
      "id": "dr-kotnis-ki-amar-kahani",
      "title": "Dr. Kotnis Ki Amar Kahani",
      "year": 1946,
      "director": "V. Shantaram",
      "writer": "K.A. Abbas",
      "cinematographer": "V. Avadhoot",
      "editor": "V. Shantaram",
      "composer": "Vasant Desai",
      "studio": "Rajkamal Kalamandir",
      "focus": "A patriotic and biographical war drama, with dynamic tracking shots and expressionist medical camp shadows.",
      "plot": "The heroic, selfless life of Dr. Dwarkanath Kotnis, a dedicated Indian physician who travelled to China to treat wounded soldiers during WWII.",
      "releaseDate": "January 1, 1946",
      "country": "India"
    },
    {
      "id": "do-aankhen-barah-haath",
      "title": "Do Aankhen Barah Haath",
      "year": 1957,
      "director": "V. Shantaram",
      "writer": "G. D. Madgulkar",
      "cinematographer": "G. Balakrishna",
      "editor": "Chintamani Borvankar",
      "composer": "Vasant Desai",
      "studio": "Rajkamal Kalamandir",
      "focus": "Humanitarian rehabilitation staging, high-contrast black-and-white lighting, and symbolic animal farming sequences.",
      "plot": "A progressive, reform-minded jail warden gets permission to rehabilitate six hardened murderers by taking them to a barren farm.",
      "releaseDate": "September 25, 1957",
      "country": "India"
    },
    {
      "id": "pinjra",
      "title": "Pinjra",
      "year": 1972,
      "director": "V. Shantaram",
      "writer": "Anant Mane",
      "cinematographer": "Shivaji Sawant",
      "editor": "V. Shantaram, Jayesh Dalal",
      "composer": "Ram Kadam",
      "studio": "Rajkamal Kalamandir",
      "focus": "Vibrant color design, integration of traditional Marathi Tamasha folk theater, and tragic framing of moral decline.",
      "plot": "A highly respected village schoolteacher attempts to reform a traveling Tamasha dancer but falls for her, leading to his moral destruction.",
      "releaseDate": "March 31, 1972",
      "country": "India"
    }
  ],
  "Jabbar Patel": [
    {
      "id": "samna",
      "title": "Samna",
      "year": 1975,
      "director": "Jabbar Patel",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Ramchandra Babu",
      "editor": "N. S. Vaidya",
      "composer": "Bhaskar Chandavarkar",
      "studio": "Ramdas Phutane Productions",
      "focus": "Political dialogue-driven duel, low-key interior tavern lighting, and sugar cooperative rural power structures.",
      "plot": "An idealistic, alcoholic Master engages in a psychological duel with a corrupt, powerful rural sugar baron over a missing soldier.",
      "releaseDate": "February 20, 1975",
      "country": "India"
    },
    {
      "id": "jait-re-jait",
      "title": "Jait Re Jait",
      "year": 1977,
      "director": "Jabbar Patel",
      "writer": "Satish Alekar / Ram Kelkar",
      "cinematographer": "Binod Pradhan",
      "editor": "N. S. Vaidya",
      "composer": "Hridaynath Mangeshkar",
      "studio": "Mahat Chitra",
      "focus": "Tribal musical realism, visually striking green-golden forest lighting, and deep thematic focus on superstition vs determination.",
      "plot": "A tribal youth seeks revenge against a queen bee that blinded him, while a young woman leaves her husband to join his quest.",
      "releaseDate": "January 1, 1977",
      "country": "India"
    },
    {
      "id": "simhasan",
      "title": "Simhasan",
      "year": 1979,
      "director": "Jabbar Patel",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Suryakant Lavande",
      "editor": "N. S. Vaidya",
      "composer": "Bhaskar Chandavarkar",
      "studio": "D. V. Rao Productions",
      "focus": "Ensemble political mapping, realistic desaturated news-style framing, and sharp editing cuts that connect politicians with slums.",
      "plot": "The ruthless behind-the-scenes power struggle for the Chief Minister's seat, seen through the cynical eyes of a journalist.",
      "releaseDate": "January 26, 1979",
      "country": "India"
    },
    {
      "id": "umbartha",
      "title": "Umbartha",
      "year": 1982,
      "director": "Jabbar Patel",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Rajan Kothari",
      "editor": "N. S. Vaidya",
      "composer": "Hridaynath Mangeshkar",
      "studio": "Sujata Chitra",
      "focus": "Feminist institutional struggle, deep focus domestic architecture blocking, and exploration of female autonomy.",
      "plot": "A qualified woman accepts a job as superintendent of a women's reformatory home away from her family, seeking self-realization.",
      "releaseDate": "February 12, 1982",
      "country": "India"
    },
    {
      "id": "dr-babasaheb-ambedkar",
      "title": "Dr. Babasaheb Ambedkar",
      "year": 2000,
      "director": "Jabbar Patel",
      "writer": "Sooni Taraporevala / Daya Pawar / Arun Sadhu",
      "cinematographer": "Ashok Mehta",
      "editor": "Renu Saluja",
      "composer": "Amar Mohile",
      "studio": "NFDC / Government of India",
      "focus": "Biographical scale, detailed period reconstruction, and stark lighting depicting socio-political struggle.",
      "plot": "The life, intellectual battles, and massive contributions of Dr. B. R. Ambedkar in drafting the Indian Constitution and fighting untouchability.",
      "releaseDate": "December 15, 2000",
      "country": "India"
    }
  ],
  "Umesh Kulkarni": [
    {
      "id": "valu",
      "title": "Valu",
      "year": 2008,
      "director": "Umesh Vinayak Kulkarni",
      "writer": "Umesh Vinayak Kulkarni / Girish Kulkarni",
      "cinematographer": "Sudheer Palsane",
      "editor": "Neeraj Voralia",
      "composer": "Mangesh Dhakde",
      "studio": "Arbhaat Films",
      "focus": "Satirical village ensemble blocking, chaotic rural tracking shots, and dry observational humor.",
      "plot": "A wild consecrated bull named Valu runs amok in a village, prompting a forest officer to arrive and capture it amidst village politics.",
      "releaseDate": "January 25, 2008",
      "country": "India"
    },
    {
      "id": "vihir",
      "title": "Vihir",
      "year": 2010,
      "director": "Umesh Vinayak Kulkarni",
      "writer": "Umesh Vinayak Kulkarni / Girish Kulkarni",
      "cinematographer": "Sudheer Palsane",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Mangesh Dhakde",
      "studio": "AB Corp / Arbhaat Films",
      "focus": "Poetic slow-burn cinematography, deep-focus stone step-well framing, and symbolic imagery of childhood grief.",
      "plot": "Two adolescent cousins who share a deep bond write letters to each other, till a sudden tragedy forces one to confront mortality.",
      "releaseDate": "March 26, 2010",
      "country": "India"
    },
    {
      "id": "deool",
      "title": "Deool",
      "year": 2011,
      "director": "Umesh Vinayak Kulkarni",
      "writer": "Girish Kulkarni",
      "cinematographer": "Sudheer Palsane",
      "editor": "Abhijeet Deshpande",
      "composer": "Mangesh Dhakde",
      "studio": "Devisha Films",
      "focus": "Religious commercialization satire, character-driven ensemble group staging, and rural-to-urban transformation.",
      "plot": "A simple shepherd claims to have seen a vision of Lord Dutta, triggering a political and commercial frenzy in his village.",
      "releaseDate": "November 4, 2011",
      "country": "India"
    },
    {
      "id": "highway",
      "title": "Highway",
      "year": 2015,
      "director": "Umesh Vinayak Kulkarni",
      "writer": "Girish Kulkarni",
      "cinematographer": "Sudheer Palsane",
      "editor": "Paresh Kamdar",
      "composer": "Amit Trivedi",
      "studio": "Arbhaat Films",
      "focus": "Confinement-based road journey staging, multi-character overlapping dialogues, and rapid rhythmic transitions.",
      "plot": "A diverse set of characters from different walks of life embark on a journey on the Mumbai-Pune Expressway, revealing their inner conflicts.",
      "releaseDate": "August 28, 2015",
      "country": "India"
    }
  ],
  "Nagraj Manjule": [
    {
      "id": "fandry",
      "title": "Fandry",
      "year": 2014,
      "director": "Nagraj Manjule",
      "writer": "Nagraj Manjule",
      "cinematographer": "Vikram Amladi",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Alokananda Dasgupta",
      "studio": "Navalkha Arts / Holy Basil Productions",
      "focus": "Visceral handheld tracking shots, rural caste disparity debris framing, and a confrontational final stone-throwing climax.",
      "plot": "A Dalit teenager falls in love with an upper-caste classmate while his family is forced to hunt down a wild pig in the village.",
      "releaseDate": "February 14, 2014",
      "country": "India"
    },
    {
      "id": "sairat",
      "title": "Sairat",
      "year": 2016,
      "director": "Nagraj Manjule",
      "writer": "Nagraj Manjule",
      "cinematographer": "Sudhakar Reddy Yakkanti",
      "editor": "Kutub Inamdar",
      "composer": "Ajay-Atul",
      "studio": "Aatpat Production / Zee Studios",
      "focus": "Subversion of romantic musical codes, transition from vibrant slow-motion love to gritty urban reality, and shocking silent climax.",
      "plot": "An upper-caste politician's daughter and a lower-caste fisherman's son fall in love and elope, facing violent societal retribution.",
      "releaseDate": "April 29, 2016",
      "country": "India"
    }
  ],
  "Paresh Mokashi": [
    {
      "id": "harishchandrachi-factory",
      "title": "Harishchandrachi Factory",
      "year": 2010,
      "director": "Paresh Mokashi",
      "writer": "Paresh Mokashi",
      "cinematographer": "Amalendu Chaudhary",
      "editor": "Amit Pawar",
      "composer": "Narendra Bhide",
      "studio": "Mayasabha Production",
      "focus": "Whimsical graphic-novel flat staging, bright pastel color design, and rhythmic physical pacing synced with music.",
      "plot": "The lighthearted and persistent struggle of Dadasaheb Phalke to make Raja Harishchandra, India's very first silent feature film.",
      "releaseDate": "January 29, 2010",
      "country": "India"
    },
    {
      "id": "elizabeth-ekadashi",
      "title": "Elizabeth Ekadashi",
      "year": 2014,
      "director": "Paresh Mokashi",
      "writer": "Madhugandha Kulkarni / Paresh Mokashi",
      "cinematographer": "Amol Gole",
      "editor": "Abhijeet Deshpande",
      "composer": "Anand Modak",
      "studio": "Essel Vision Productions",
      "focus": "Child-centered narrative framing, Pandharpur pilgrimage street staging, and warm family-oriented dramatic editing.",
      "plot": "Two young children in Pandharpur try to save their beloved bicycle, named Elizabeth, from being sold by their indebted mother.",
      "releaseDate": "November 14, 2014",
      "country": "India"
    },
    {
      "id": "vaalvi",
      "title": "Vaalvi",
      "year": 2023,
      "director": "Paresh Mokashi",
      "writer": "Paresh Mokashi",
      "cinematographer": "Satyajeet Shobha Shriram",
      "editor": "Abhijeet Deshpande",
      "composer": "Mangesh Dhakde",
      "studio": "Zee Studios / Mayasabha Production",
      "focus": "Black comedy room-confinement blocking, quick reaction edits, and highly structured suspense timing.",
      "plot": "A husband and his lover plan a flawless double-suicide/murder, but a series of unforeseen developments spirals into chaos.",
      "releaseDate": "January 13, 2023",
      "country": "India"
    }
  ],
  "Sumitra Bhave & Sunil Sukthankar": [
    {
      "id": "doghi",
      "title": "Doghi",
      "year": 1995,
      "director": "Sumitra Bhave / Sunil Sukthankar",
      "writer": "Sumitra Bhave / Sunil Sukthankar",
      "cinematographer": "Sanjeev Upadhyay",
      "editor": "Mohan Rathod",
      "composer": "Anand Modak",
      "studio": "NFDC / Doordarshan",
      "focus": "Deeply empathetic rural sisterhood staging, warm domestic kitchen framing, and sensitive treatment of social double standards.",
      "plot": "Two sisters face severe economic survival choices, leading to societal hypocrisy and family tension during a wedding.",
      "releaseDate": "January 1, 1995",
      "country": "India"
    },
    {
      "id": "devrai",
      "title": "Devrai",
      "year": 2004,
      "director": "Sumitra Bhave / Sunil Sukthankar",
      "writer": "Sumitra Bhave / Sunil Sukthankar",
      "cinematographer": "Debu Deodhar",
      "editor": "Neeraj Voralia",
      "composer": "Shrirang Umrani",
      "studio": "Schizophrenia Awareness Association",
      "focus": "Sensitive portrayal of schizophrenia, natural forest grove (sacred grove) visual metaphors, and soft intimate lensing.",
      "plot": "An eccentric researcher obsessed with the sacred forest groves struggles with schizophrenia while his sister tries to care for him.",
      "releaseDate": "March 11, 2004",
      "country": "India"
    },
    {
      "id": "astu",
      "title": "Astu",
      "year": 2016,
      "director": "Sumitra Bhave / Sunil Sukthankar",
      "writer": "Sumitra Bhave / Sunil Sukthankar",
      "cinematographer": "Milind Jog",
      "editor": "Mohini Datta",
      "composer": "Dhananjay Chhatre",
      "studio": "Gawali Productions",
      "focus": "Alzheimer's cognitive decline representation, gentle natural lighting, and warm street-tracking relationship framing.",
      "plot": "An elderly Sanskrit scholar suffering from advanced Alzheimer's wanders off, finding peace with a street elephant and its mahout.",
      "releaseDate": "July 15, 2016",
      "country": "India"
    },
    {
      "id": "kaasav",
      "title": "Kaasav",
      "year": 2017,
      "director": "Sumitra Bhave / Sunil Sukthankar",
      "writer": "Sumitra Bhave / Sunil Sukthankar",
      "cinematographer": "Dhananjay Kulkarni",
      "editor": "Mohini Datta",
      "composer": "Saket Kanetkar",
      "studio": "Vichitra Chitra",
      "focus": "Clinical depression healing themes, seaside turtle conservation visual analogies, and calm ambient soundscapes.",
      "plot": "A young, suicidal man finds solace and a path to healing through a woman volunteering for Olive Ridley sea turtle conservation.",
      "releaseDate": "October 6, 2017",
      "country": "India"
    }
  ],
  "Sachin Kundalkar": [
    {
      "id": "gandha",
      "title": "Gandha",
      "year": 2009,
      "director": "Sachin Kundalkar",
      "writer": "Sachin Kundalkar",
      "cinematographer": "Arjun Sorte",
      "editor": "Abhijeet Deshpande",
      "composer": "Dynamic Ambient Score / Folk",
      "studio": "Flashbulbs Enterprises",
      "focus": "Sensory scent-themed multi-perspective framing, warm interior lighting, and soft close-up detail montages.",
      "plot": "Three independent stories explore the human sense of smell and its profound connection to love, grief, and desire.",
      "releaseDate": "August 14, 2009",
      "country": "India"
    },
    {
      "id": "nirop",
      "title": "Nirop",
      "year": 2007,
      "director": "Sachin Kundalkar",
      "writer": "Sachin Kundalkar",
      "cinematographer": "Diego Romero",
      "editor": "Sachin Kundalkar",
      "composer": "Indian / Western Classical Adaptations",
      "studio": "Sachin Kundalkar Productions",
      "focus": "Melancholic rural isolation framing, handheld camera mobility, and artistic subjective memory sequences.",
      "plot": "A young musician spends his final days in a peaceful village before departing for France, capturing parting memories with his wife.",
      "releaseDate": "January 1, 2007",
      "country": "India"
    },
    {
      "id": "vazandar",
      "title": "Vazandar",
      "year": 2016,
      "director": "Sachin Kundalkar",
      "writer": "Sachin Kundalkar",
      "cinematographer": "Milind Jog",
      "editor": "Abhijeet Deshpande",
      "composer": "Avinash-Vishwajeet",
      "studio": "Landmarc Films",
      "focus": "Saturated pastel color palettes, body-image social satire, and detailed kitchen and café set-piece staging.",
      "plot": "Two overweight friends go on a desperate weight-loss journey after a viral video subjects them to public embarrassment.",
      "releaseDate": "November 11, 2016",
      "country": "India"
    }
  ],
  "Mangesh Hadawale": [
    {
      "id": "tingya",
      "title": "Tingya",
      "year": 2008,
      "director": "Mangesh Hadawale",
      "writer": "Mangesh Hadawale",
      "cinematographer": "Dharam Gulati",
      "editor": "Sanjay Sankla",
      "composer": "Rahul Ranade",
      "studio": "Ravi Rai Productions",
      "focus": "Agrarian crisis representation, low-angle child-eye perspective framing, and natural field lighting.",
      "plot": "A young boy in a debt-ridden rural family tries to prevent his beloved injured bull from being sold to a butcher.",
      "releaseDate": "April 4, 2008",
      "country": "India"
    },
    {
      "id": "dekh-indian-circus",
      "title": "Dekh Indian Circus",
      "year": 2012,
      "director": "Mangesh Hadawale",
      "writer": "Mangesh Hadawale",
      "cinematographer": "Laxman Utekar",
      "editor": "Amit Pawar",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "Mahaveer Media",
      "focus": "Socio-economic struggle allegory, vibrant desert landscape framing, and child-centered narrative irony.",
      "plot": "A rural mother in Rajasthan faces a series of challenges as she tries to fulfill her children's dream of visiting a circus.",
      "releaseDate": "August 24, 2012",
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

  // Evaluate FILMS_DATA
  global.FILMS_DATA = null;
  const modData = dataStr.replace('const FILMS_DATA =', 'FILMS_DATA =');
  eval(modData);

  const filmsData = global.FILMS_DATA;
  if (!filmsData) {
    console.error('Failed to load temp_data.js');
    process.exit(1);
  }

  // Update Marathi directors' movies and download posters
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
      const extension = (movie.id === 'tingya' || movie.id === 'dekh-indian-circus' || movie.id === 'doghi') ? 'jpg' : 'jpg'; // We can save all as jpg
      const filename = `${movie.id}.jpg`;
      const targetPath = path.join(__dirname, '..', 'assets', 'images', filename);
      
      // Let's search TMDB first
      let searchTitle = movie.title;
      const query = encodeURIComponent(searchTitle);
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
        try {
          await download(posterUrl, targetPath);
          movie.poster = `assets/images/${filename}`;
          console.log(`  Downloaded successfully!`);
        } catch (e) {
          console.error(`  Failed to download poster for ${movie.title}`, e.message);
          movie.poster = `assets/images/${filename}`;
        }
      } else {
        console.log(`  No poster found on TMDB for ${movie.title}. Attempting Wikipedia fallback...`);
        // We will try to download from Wikipedia later if missing, or use a placeholder path
        movie.poster = `assets/images/${filename}`;
      }

      updatedMustWatch.push(movie);
    }

    directorObj.mustWatch = updatedMustWatch;
  }

  // Write updated database back to temp_data.js
  const output = `const FILMS_DATA = ${JSON.stringify(filmsData, null, 4)};\n\nmodule.exports = FILMS_DATA;\n`;
  fs.writeFileSync(dbPath, output, 'utf8');
  console.log('Successfully updated temp_data.js with Marathi films!');
}

run();
