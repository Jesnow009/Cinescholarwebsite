const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "Girish Kasaravalli": [
    {
      "id": "ghatashraddha",
      "title": "Ghatashraddha",
      "year": 1977,
      "director": "Girish Kasaravalli",
      "writer": "Girish Kasaravalli",
      "cinematographer": "S. Ramachandra",
      "editor": "Umakanth",
      "composer": "B. V. Karanth",
      "studio": "Suvarnagiri Films",
      "focus": "Ritualistic orthodox Brahmin village staging, stark monochrome framing, and child protagonist perspective.",
      "plot": "A young pregnant widow is ostracized by her orthodox Brahmin community, seen through the eyes of a young boy studying at the local Vedic school.",
      "releaseDate": "December 23, 1977",
      "country": "India"
    },
    {
      "id": "tabarana-kathe",
      "title": "Tabarana Kathe",
      "year": 1987,
      "director": "Girish Kasaravalli",
      "writer": "Girish Kasaravalli",
      "cinematographer": "Madhu Ambat",
      "editor": "M. N. Swamy",
      "composer": "L. Vaidyanathan",
      "studio": "Kamadhenu Films",
      "focus": "Bureaucratic tragedy staging, neorealist elderly protagonist tracking, and administrative apathy critique.",
      "plot": "A retired government watchman struggles endlessly to receive his pension from a corrupt and slow-moving bureaucratic system, leading to personal ruin.",
      "releaseDate": "January 30, 1987",
      "country": "India"
    },
    {
      "id": "thaayi-saheba",
      "title": "Thaayi Saheba",
      "year": 1997,
      "director": "Girish Kasaravalli",
      "writer": "Girish Kasaravalli",
      "cinematographer": "H. M. Ramachandra",
      "editor": "M. N. Swamy",
      "composer": "Isaac Thomas Kottukapally",
      "studio": "Jaimala Productions",
      "focus": "Feudal family transition staging, changing gender roles framing, and classical set geometry.",
      "plot": "A noblewoman in pre- and post-independence India navigates the challenges of her husband's second marriage and adoption disputes in a changing feudal structure.",
      "releaseDate": "December 1, 1997",
      "country": "India"
    },
    {
      "id": "dweepa",
      "title": "Dweepa",
      "year": 2002,
      "director": "Girish Kasaravalli",
      "writer": "Girish Kasaravalli",
      "cinematographer": "H. M. Ramachandra",
      "editor": "M. N. Swamy",
      "composer": "Isaac Thomas Kottukapally",
      "studio": "Soundarya Cinema",
      "focus": "Island isolation geography, heavy monsoon visual textures, and resilient protagonist staging.",
      "plot": "A young woman and her husband refuse to evacuate their ancestral island village as a nearby dam project threatens to submerge their home.",
      "releaseDate": "January 11, 2002",
      "country": "India"
    },
    {
      "id": "gulabi-talkies",
      "title": "Gulabi Talkies",
      "year": 2008,
      "director": "Girish Kasaravalli",
      "writer": "Girish Kasaravalli",
      "cinematographer": "S. Ramachandra",
      "editor": "M. N. Swamy",
      "composer": "Isaac Thomas Kottukapally",
      "studio": "Basant Productions",
      "focus": "Small island community division staging, introduction of television/cinema impact, and religious conflict geometry.",
      "plot": "A Muslim midwife becomes a popular figure in a small fishing village when she gets a color television, but political and religious divisions soon arise.",
      "releaseDate": "September 19, 2008",
      "country": "India"
    }
  ],
  "Girish Karnad": [
    {
      "id": "vamsha-vriksha",
      "title": "Vamsha Vriksha",
      "year": 1971,
      "director": "Girish Karnad / B. V. Karanth",
      "writer": "Girish Karnad / B. V. Karanth",
      "cinematographer": "S. Ramachandra",
      "editor": "Aruna-Vikas",
      "composer": "B. V. Karanth",
      "studio": "G. V. Iyer Productions",
      "focus": "Traditional family lineage staging, orthodox widow remarriage conflict, and dual-director framing.",
      "plot": "A conservative family's lineage and beliefs are tested when a widowed daughter-in-law decides to remarry and claim custody of her son.",
      "releaseDate": "December 17, 1971",
      "country": "India"
    },
    {
      "id": "kaadu",
      "title": "Kaadu",
      "year": 1973,
      "director": "Girish Karnad",
      "writer": "Girish Karnad",
      "cinematographer": "Govind Nihalani",
      "editor": "Aruna-Vikas",
      "composer": "B. V. Karanth",
      "studio": "Chitra Dhwani",
      "focus": "Inter-village violent tribal conflict, child eye-witness perspective framing, and Nihalani's realistic cinematography.",
      "plot": "The bitter rivalry between two remote forest villages erupts into a violent conflict, witnessed by a young boy visiting his uncle.",
      "releaseDate": "November 30, 1973",
      "country": "India"
    },
    {
      "id": "ondanondu-kaladalli",
      "title": "Ondanondu Kaladalli",
      "year": 1978,
      "director": "Girish Karnad",
      "writer": "Girish Karnad",
      "cinematographer": "Apurba Kishore Bir",
      "editor": "P. Bhaktavatsalam",
      "composer": "Bhaskar Chandavarkar",
      "studio": "L. N. Combines",
      "focus": "Kurosawa-inspired medieval warrior action, realistic martial arts choreography, and outdoor lighting geometry.",
      "plot": "A wandering mercenary joins a local chieftain fighting his brother in medieval Karnataka, showcasing early Indian martial arts and honor.",
      "releaseDate": "December 29, 1978",
      "country": "India"
    },
    {
      "id": "utsav",
      "title": "Utsav",
      "year": 1985,
      "director": "Girish Karnad",
      "writer": "Girish Karnad",
      "cinematographer": "Ashok Mehta",
      "editor": "Bhanudas Divakar",
      "composer": "Laxmikant-Pyarelal",
      "studio": "Film-Valas",
      "focus": "Classical Sanskrit drama scale staging, opulent ancient sets, and complex love-triangle geometry.",
      "plot": "An adaptation of the ancient play 'Mrichchakatika', exploring a romance between a poor Brahmin man and a wealthy courtesan in Ujjain.",
      "releaseDate": "August 23, 1985",
      "country": "India"
    }
  ],
  "B. V. Karanth": [
    {
      "id": "chomana-dudi",
      "title": "Chomana Dudi",
      "year": 1975,
      "director": "B. V. Karanth",
      "writer": "B. V. Karanth",
      "cinematographer": "S. Ramachandra",
      "editor": "Umakanth",
      "composer": "B. V. Karanth",
      "studio": "Praja Films",
      "focus": "Low-caste agrarian slavery staging, tragic drum-music motifs, and high-contrast neorealist cinematography.",
      "plot": "A poor untouchable laborer dreams of owning a piece of land to farm, but is trapped in a cycle of debt, caste discrimination, and tragedy.",
      "releaseDate": "October 24, 1975",
      "country": "India"
    }
  ],
  "Puttanna Kanagal": [
    {
      "id": "gejje-pooje",
      "title": "Gejje Pooje",
      "year": 1970,
      "director": "Puttanna Kanagal",
      "writer": "Puttanna Kanagal",
      "cinematographer": "S. V. Srikanth",
      "editor": "V. P. Krishnan",
      "composer": "Vijaya Bhaskar",
      "studio": "Chithra Jyothi",
      "focus": "Devadasi hereditary system critique, female tragic destiny staging, and Vijaya Bhaskar's melodic score.",
      "plot": "A young woman born into a family of courtesans attempts to escape her hereditary destiny through education and love, but faces rigid societal opposition.",
      "releaseDate": "January 1, 1970",
      "country": "India"
    },
    {
      "id": "sharapanjara",
      "title": "Sharapanjara",
      "year": 1971,
      "director": "Puttanna Kanagal",
      "writer": "Puttanna Kanagal",
      "cinematographer": "S. V. Srikanth",
      "editor": "V. P. Krishnan",
      "composer": "Vijaya Bhaskar",
      "studio": "Kalapriya Productions",
      "focus": "Mental health stigma staging, domestic isolation framing, and intense psychological performance tracking.",
      "plot": "A woman returns to her husband and family after being treated at a psychiatric hospital, only to face cold rejection and suspicion from her loved ones.",
      "releaseDate": "January 15, 1971",
      "country": "India"
    },
    {
      "id": "nagarahavu",
      "title": "Nagarahavu",
      "year": 1972,
      "director": "Puttanna Kanagal",
      "writer": "Puttanna Kanagal",
      "cinematographer": "S. V. Srikanth",
      "editor": "V. P. Krishnan",
      "composer": "Vijaya Bhaskar",
      "studio": "Eswari Productions",
      "focus": "Angry young protagonist rebel staging, teacher-student relationship geometry, and tragic romance cliffside framing.",
      "plot": "A hot-headed, rebellious young man is guided by his noble schoolteacher as he clashes with local orthodox families and navigates tragic love.",
      "releaseDate": "December 29, 1972",
      "country": "India"
    },
    {
      "id": "ranganayaki",
      "title": "Ranganayaki",
      "year": 1981,
      "director": "Puttanna Kanagal",
      "writer": "Puttanna Kanagal",
      "cinematographer": "Maruthi Rao",
      "editor": "V. P. Krishnan",
      "composer": "Vijaya Bhaskar",
      "studio": "Sri Bhargavi Chitra",
      "focus": "Theatre-actress identity staging, mother-son separation melodrama, and complex performance layers.",
      "plot": "A popular theatre actress who leaves her family struggles with societal stigma, later crossing paths with her estranged son who does not know her identity.",
      "releaseDate": "March 20, 1981",
      "country": "India"
    },
    {
      "id": "amrutha-ghalige",
      "title": "Amrutha Ghalige",
      "year": 1984,
      "director": "Puttanna Kanagal",
      "writer": "Puttanna Kanagal",
      "cinematographer": "D. V. Rajaram",
      "editor": "V. P. Krishnan",
      "composer": "Vijaya Bhaskar",
      "studio": "G. R. K. Combines",
      "focus": "Moral guilt psychological staging, domestic reconciliation geometry, and classical vocal soundtrack.",
      "plot": "A young man attempts to atone for a tragic mistake in his past that destroyed a friend's family, seeking forgiveness and finding love.",
      "releaseDate": "June 1, 1984",
      "country": "India"
    }
  ],
  "Upendra": [
    {
      "id": "tharle-nan-maga",
      "title": "Tharle Nan Maga",
      "year": 1992,
      "director": "Upendra",
      "writer": "Upendra",
      "cinematographer": "JG Krishna",
      "editor": "R. Janardhan",
      "composer": "V. Manohar",
      "studio": "Sri Prasanna Pictures",
      "focus": "Satirical slapstick comedy staging, high-speed chaotic tracking, and commercial movie parodies.",
      "plot": "A young man uses hilariously absurd schemes to win the heart of a wealthy girl while defying her arrogant father.",
      "releaseDate": "January 3, 1992",
      "country": "India"
    },
    {
      "id": "shhhh",
      "title": "Shhh!",
      "year": 1993,
      "director": "Upendra",
      "writer": "Upendra",
      "cinematographer": "JG Krishna",
      "editor": "R. Janardhan",
      "composer": "Sadhu Kokila",
      "studio": "Sri Durga Splendour Films",
      "focus": "Horror-comedy genre hybrid staging, movie-within-a-movie meta-framing, and suspense tracking.",
      "plot": "A film crew shooting a movie in a remote village finds their production disrupted by mysterious, terrifying events and a local legend.",
      "releaseDate": "July 23, 1993",
      "country": "India"
    },
    {
      "id": "om",
      "title": "Om",
      "year": 1995,
      "director": "Upendra",
      "writer": "Upendra",
      "cinematographer": "B. C. Gowrishankar",
      "editor": "Shashikumar",
      "composer": "Hamsalekha",
      "studio": "Sri Vajreshwari Combines",
      "focus": "Gritty underworld gangster realism, real-life criminal gang castings, and intense moral redemption staging.",
      "plot": "A young priest's son is drawn into the local gangster underworld, finding himself trapped in violence while his lover attempts to save him.",
      "releaseDate": "May 19, 1995",
      "country": "India"
    },
    {
      "id": "a-upendra",
      "title": "A",
      "year": 1998,
      "director": "Upendra",
      "writer": "Upendra",
      "cinematographer": "H. C. Venugopal",
      "editor": "R. Janardhan",
      "composer": "Gurukiran",
      "studio": "Sri Surya Movies",
      "focus": "Experimental non-linear narrative, director-actress meta-staging, and psychological ego conflict.",
      "plot": "A highly successful, arrogant film director falls in love with his lead actress, leading to a tragic ego clash, betrayal, and memory loss.",
      "releaseDate": "January 9, 1998",
      "country": "India"
    },
    {
      "id": "upendra-1999",
      "title": "Upendra",
      "year": 1999,
      "director": "Upendra",
      "writer": "Upendra",
      "cinematographer": "H. C. Venugopal",
      "editor": "R. Janardhan",
      "composer": "Gurukiran",
      "studio": "Shilpa Productions",
      "focus": "Philosophical egoism satire, split-personality protagonist geometry, and surreal set styling.",
      "plot": "An eccentric, self-centered man representing the raw human ego interacts with three women representing different societal expectations.",
      "releaseDate": "October 22, 1999",
      "country": "India"
    }
  ],
  "Yogaraj Bhat": [
    {
      "id": "mungaru-male",
      "title": "Mungaru Male",
      "year": 2006,
      "director": "Yogaraj Bhat",
      "writer": "Yogaraj Bhat",
      "cinematographer": "S. Krishna",
      "editor": "Deepu S. Kumar",
      "composer": "Mano Murthy",
      "studio": "E2 Entertainment",
      "focus": "Rain-drenched romance scenic framing, tragic romantic geometry, and Mano Murthy's acoustic melodies.",
      "plot": "A young man falls in love with a girl who is engaged to someone else, spending his days with her in the monsoonal hills of Kodagu.",
      "releaseDate": "December 29, 2006",
      "country": "India"
    },
    {
      "id": "galipata",
      "title": "Gaalipata",
      "year": 2008,
      "director": "Yogaraj Bhat",
      "writer": "Yogaraj Bhat",
      "cinematographer": "R. Rathnavelu",
      "editor": "Suresh Urs",
      "composer": "Harikrishna",
      "studio": "SPR Entertainment",
      "focus": "Hill-station holiday youth staging, kite-flying visual metaphors, and lighthearted dialogue blocking.",
      "plot": "Three close friends travel to a remote hill-station village, falling in love with three sisters who challenge their outlook on life.",
      "releaseDate": "January 18, 2008",
      "country": "India"
    },
    {
      "id": "pancharangi",
      "title": "Pancharangi",
      "year": 2010,
      "director": "Yogaraj Bhat",
      "writer": "Yogaraj Bhat",
      "cinematographer": "Tyagarajan",
      "editor": "Jo Ni Harsha",
      "composer": "Mano Murthy",
      "studio": "Yogaraj Movies",
      "focus": "Family wedding domestic satire, cynical protagonist philosophical commentary, and coastal location photography.",
      "plot": "A cynical young man watches his traditional family prepare for a wedding, questioning their societal values, matches, and marriages.",
      "releaseDate": "September 3, 2010",
      "country": "India"
    }
  ],
  "Rakshit Shetty": [
    {
      "id": "ulidavaru-kandanthe",
      "title": "Ulidavaru Kandanthe",
      "year": 2014,
      "director": "Rakshit Shetty",
      "writer": "Rakshit Shetty",
      "cinematographer": "Karm Chawla",
      "editor": "Sachin",
      "composer": "B. Ajaneesh Loknath",
      "studio": "Suvin Cinematic Inventions",
      "focus": "Rashomon-style multi-perspective crime staging, coastal Tulu culture and tiger-dance (Pili Yesa) textures, and retro musical loops.",
      "plot": "The murder of a young gangster during a coastal festival is recounted from five different perspectives by various witnesses.",
      "releaseDate": "March 28, 2014",
      "country": "India"
    }
  ],
  "Rishab Shetty": [
    {
      "id": "kirik-party",
      "title": "Kirik Party",
      "year": 2016,
      "director": "Rishab Shetty",
      "writer": "Rishab Shetty / Rakshit Shetty & The Seven Odds",
      "cinematographer": "Karm Chawla",
      "editor": "Sachin Ravi",
      "composer": "B. Ajaneesh Loknath",
      "studio": "Paramvah Studios",
      "focus": "Engineering college nostalgia staging, ensemble youth friendship geometry, and Ajaneesh Loknath's contemporary score.",
      "plot": "A group of mischievous engineering students navigate college life, friendship, campus politics, tragedy, and love.",
      "releaseDate": "December 30, 2016",
      "country": "India"
    },
    {
      "id": "sarkari-hi-pra-shaale",
      "title": "Sarkari Hi. Pra. Shaale, Kasaragodu, Koduge: Ramanna Rai",
      "year": 2018,
      "director": "Rishab Shetty",
      "writer": "Rishab Shetty",
      "cinematographer": "Venkatesh Anguraj",
      "editor": "Pratheek Shetty",
      "composer": "Vasuki Vaibhav",
      "studio": "Rishab Shetty Films",
      "focus": "Regional language struggle satire, children-led rebellion staging, and coastal village color grading.",
      "plot": "A group of children fight to save their Kannada-medium government school from being closed down by corrupt officials who want to impose another language.",
      "releaseDate": "August 24, 2018",
      "country": "India"
    },
    {
      "id": "kantara",
      "title": "Kantara",
      "year": 2022,
      "director": "Rishab Shetty",
      "writer": "Rishab Shetty",
      "cinematographer": "Arvind S. Kashyap",
      "editor": "Pratheek Shetty / K. M. Prakash",
      "composer": "B. Ajaneesh Loknath",
      "studio": "Hombale Films",
      "focus": "Divine demigod (Daiva/Kola) ritual staging, forest community land dispute, and high-octane physical combat choreography.",
      "plot": "A local rebel forest dweller clashes with a strict forest officer over land rights, triggering a supernatural intervention from ancestral demigods.",
      "releaseDate": "September 30, 2022",
      "country": "India"
    }
  ],
  "Pawan Kumar": [
    {
      "id": "lucia",
      "title": "Lucia",
      "year": 2013,
      "director": "Pawan Kumar",
      "writer": "Pawan Kumar",
      "cinematographer": "Siddhartha Nuni",
      "editor": "Pawan Kumar",
      "composer": "Poornachandra Tejaswi",
      "studio": "Audience Funded / Pawan Kumar Film Factory",
      "focus": "Crowd-funded indie cinema staging, dream-vs-reality monochrome-color shifting, and psychological memory framing.",
      "plot": "An insomniac movie usher takes a mysterious pill that allows him to live his dream life as a successful film star, but the boundaries of reality begin to blur.",
      "releaseDate": "September 6, 2013",
      "country": "India"
    },
    {
      "id": "u-turn",
      "title": "U Turn",
      "year": 2016,
      "director": "Pawan Kumar",
      "writer": "Pawan Kumar",
      "cinematographer": "Satya Hegde / Advaitha Gurumurthy",
      "editor": "Pawan Kumar",
      "composer": "Poornachandra Tejaswi",
      "studio": "Pawan Kumar Film Factory",
      "focus": "Urban supernatural investigative mystery, flyover traffic tracking, and suspenseful close-up editing loops.",
      "plot": "A young female journalist investigating traffic violations on a city flyover finds herself accused of murder, uncovering a supernatural presence.",
      "releaseDate": "May 20, 2016",
      "country": "India"
    }
  ],
  "Hemanth M. Rao": [
    {
      "id": "godhi-banna",
      "title": "Godhi Banna Sadharna Mykattu",
      "year": 2016,
      "director": "Hemanth M. Rao",
      "writer": "Hemanth M. Rao",
      "cinematographer": "Advaitha Gurumurthy",
      "editor": "Srikanth Shroff",
      "composer": "Charan Raj",
      "studio": "Lost & Found Films",
      "focus": "Alzheimer's domestic search staging, father-son relationship geometry, and quiet acoustic melodies.",
      "plot": "An career-oriented young man searches for his middle-aged father with Alzheimer's who goes missing from an care home.",
      "releaseDate": "June 3, 2016",
      "country": "India"
    },
    {
      "id": "kavaludaari",
      "title": "Kavaludaari",
      "year": 2019,
      "director": "Hemanth M. Rao",
      "writer": "Hemanth M. Rao",
      "cinematographer": "Advaitha Gurumurthy",
      "editor": "Jagadeesh Chanda",
      "composer": "Charan Raj",
      "studio": "PRK Productions",
      "focus": "Retro crime-mystery investigation, low-key lighting shadow geometry, and dual-detective partner dynamics.",
      "plot": "A young traffic cop and a retired, cynical police detective team up to solve a three-decade-old murder case involving skeletons dug up at a construction site.",
      "releaseDate": "April 12, 2019",
      "country": "India"
    },
    {
      "id": "sapta-sagara-side-a",
      "title": "Sapta Sagaradaache Ello - Side A",
      "year": 2023,
      "director": "Hemanth M. Rao",
      "writer": "Hemanth M. Rao",
      "cinematographer": "Advaitha Gurumurthy",
      "editor": "Sunil S. Bharadwaj",
      "composer": "Charan Raj",
      "studio": "Paramvah Studios",
      "focus": "Poetic coastal romance framing, prison-visitation glass-divider geometry, and Charan Raj's melancholic orchestrations.",
      "plot": "A young couple dreams of building a home, but the boy takes the blame for a wealthy businessman's crime to earn quick money, landing in prison.",
      "releaseDate": "September 1, 2023",
      "country": "India"
    },
    {
      "id": "sapta-sagara-side-b",
      "title": "Sapta Sagaradaache Ello - Side B",
      "year": 2023,
      "director": "Hemanth M. Rao",
      "writer": "Hemanth M. Rao",
      "cinematographer": "Advaitha Gurumurthy",
      "editor": "Sunil S. Bharadwaj",
      "composer": "Charan Raj",
      "studio": "Paramvah Studios",
      "focus": "Post-prison redemption search, dark urban night cinematography, and melancholic score integration.",
      "plot": "Ten years after his release from prison, Manu searches for Priya to ensure she is happy with her life, protecting her from the shadows.",
      "releaseDate": "November 17, 2023",
      "country": "India"
    }
  ],
  "Mansore": [
    {
      "id": "harivu",
      "title": "Harivu",
      "year": 2014,
      "director": "Mansore",
      "writer": "Mansore",
      "cinematographer": "Pradeep Khanavikar",
      "editor": "Suresh Armugam",
      "composer": "Charan Raj",
      "studio": "Sri Swarnalatha Productions",
      "focus": "Hospital-to-mortuary city migration realism, father-son medical tragedy, and slow-cinema pacing.",
      "plot": "A poor farmer travels to Bangalore to treat his terminally ill son, embarking on a heart-breaking journey to take his body back to their village.",
      "releaseDate": "October 15, 2014",
      "country": "India"
    },
    {
      "id": "nathicharami",
      "title": "Nathicharami",
      "year": 2018,
      "director": "Mansore",
      "writer": "Sandhya Rani",
      "cinematographer": "Guruprasad Nayanar",
      "editor": "Nagendra K. Ujjani",
      "composer": "Bindhumalini",
      "studio": "Tejaswini Enterprises",
      "focus": "Urban widow sexuality exploration, domestic interior framing, and psychological relationship dialoguing.",
      "plot": "A young widow struggles to balance her physical desires with her emotional loyalty to her late husband, seeking therapy and independence.",
      "releaseDate": "December 28, 2018",
      "country": "India"
    },
    {
      "id": "act-1978",
      "title": "Act 1978",
      "year": 2020,
      "director": "Mansore",
      "writer": "Mansore",
      "cinematographer": "Satya Hegde",
      "editor": "Nagendra K. Ujjani",
      "composer": "Ronada Gopal Rao",
      "studio": "Devaraj Films",
      "focus": "Government office hostage thriller staging, legal-bureaucracy frustration, and claustrophobic interior framing.",
      "plot": "A pregnant widow holds a government office hostage with a bomb strapped to her waist, demanding her long-delayed compensation.",
      "releaseDate": "November 20, 2020",
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

  // Update Kannada directors' movies and download posters
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
      // Clean up search query for TMDB if title is long or has subtitles
      let searchTitle = movie.title;
      if (movie.title === 'Sarkari Hi. Pra. Shaale, Kasaragodu, Koduge: Ramanna Rai') {
        searchTitle = 'Sarkari Hi. Pra. Shaale';
      }
      
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
        const targetPath = path.join(__dirname, '..', 'assets', 'images', filename);
        try {
          await download(posterUrl, targetPath);
          movie.poster = `assets/images/${filename}`;
          console.log(`  Downloaded successfully!`);
        } catch (e) {
          console.error(`  Failed to download poster for ${movie.title}`, e.message);
          movie.poster = `assets/images/${filename}`; // fallback
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
  console.log('Successfully updated temp_data.js with Kannada films!');
}

run();
