const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "Hrishikesh Mukherjee": [
    {
      "id": "anand",
      "title": "Anand",
      "year": 1971,
      "director": "Hrishikesh Mukherjee",
      "writer": "Hrishikesh Mukherjee / Gulzar / Bimal Dutt",
      "cinematographer": "Jaywant Pathare",
      "editor": "Hrishikesh Mukherjee",
      "composer": "Salil Chowdhury",
      "studio": "Rupam Chitra",
      "focus": "Sentimental humanist staging, Salil Chowdhury's iconic score integration, and Mukherjee's precise editorial pacing.",
      "plot": "A terminally ill man decides to live his remaining days to the fullest, spreading joy to everyone he meets, including his sober doctor friend.",
      "releaseDate": "March 12, 1971",
      "country": "India"
    },
    {
      "id": "chupke-chupke",
      "title": "Chupke Chupke",
      "year": 1975,
      "director": "Hrishikesh Mukherjee",
      "writer": "Gulzar",
      "cinematographer": "Jaywant Pathare",
      "editor": "Khan Zaman Khan",
      "composer": "S. D. Burman",
      "studio": "Rupam Chitra",
      "focus": "Ensemble comedic timing, sharp dialogue blocking, and S. D. Burman's lighthearted musical compositions.",
      "plot": "A newlywed professor plays a series of elaborate practical jokes on his brother-in-law to prove that his own intellectual capability is not to be underestimated.",
      "releaseDate": "April 11, 1975",
      "country": "India"
    },
    {
      "id": "gol-maal",
      "title": "Gol Maal",
      "year": 1979,
      "director": "Hrishikesh Mukherjee",
      "writer": "Sachin Bhowmick",
      "cinematographer": "Jaywant Pathare",
      "editor": "Khan Zaman Khan",
      "composer": "R. D. Burman",
      "studio": "Rupam Chitra",
      "focus": "Satirical situational comedy, Mukherjee's signature reaction-cut editing, and R. D. Burman's playful soundtrack.",
      "plot": "A young accountant adopts a double identity to keep his job under a traditionalist boss who hates sports and demands strict adherence to traditional values.",
      "releaseDate": "April 20, 1979",
      "country": "India"
    },
    {
      "id": "abhimaan",
      "title": "Abhimaan",
      "year": 1973,
      "director": "Hrishikesh Mukherjee",
      "writer": "Nabendu Ghosh",
      "cinematographer": "Jaywant Pathare",
      "editor": "Das Dhaimade",
      "composer": "S. D. Burman",
      "studio": "Amiya Productions",
      "focus": "Dual-performer psychological conflict staging, reflection and glass visual motifs, and S. D. Burman's landmark classical score.",
      "plot": "A popular singer encourages his talented wife to pursue a music career, but his ego and jealousy threaten to destroy their marriage when her popularity eclipses his.",
      "releaseDate": "July 27, 1973",
      "country": "India"
    },
    {
      "id": "bawarchi",
      "title": "Bawarchi",
      "year": 1972,
      "director": "Hrishikesh Mukherjee",
      "writer": "Hrishikesh Mukherjee",
      "cinematographer": "Jaywant Pathare",
      "editor": "Khan Zaman Khan",
      "composer": "Madan Mohan",
      "studio": "Rupam Chitra",
      "focus": "Domestic interior ensemble staging, warm middle-class character geometry, and Madan Mohan's classical melodies.",
      "plot": "A mysterious cook arrives at a house of a bickering joint family, using his culinary skills and wisdom to resolve their conflicts and bring them together.",
      "releaseDate": "July 7, 1972",
      "country": "India"
    }
  ],
  "Ramesh Sippy": [
    {
      "id": "sholay",
      "title": "Sholay",
      "year": 1975,
      "director": "Ramesh Sippy",
      "writer": "Salim-Javed",
      "cinematographer": "Dwarka Divecha",
      "editor": "M. S. Shinde",
      "composer": "R. D. Burman",
      "studio": "Sippy Films",
      "focus": "Epic Indian Western choreography, CinemaScope spatial framing, and R. D. Burman's kinetic action score.",
      "plot": "Two convicts are hired by a retired policeman to capture a ruthless dacoit who slaughtered his family and terrorizes the village of Ramgarh.",
      "releaseDate": "August 15, 1975",
      "country": "India"
    },
    {
      "id": "shaan",
      "title": "Shaan",
      "year": 1980,
      "director": "Ramesh Sippy",
      "writer": "Salim-Javed",
      "cinematographer": "S. M. Anwar",
      "editor": "M. S. Shinde",
      "composer": "R. D. Burman",
      "studio": "Sippy Films",
      "focus": "Grand high-tech villain-lair staging, Bond-style action cinematography, and R. D. Burman's brassy musical cues.",
      "plot": "Two brothers seek revenge against a mysterious, high-tech international crime lord who is responsible for the death of their honest police officer brother.",
      "releaseDate": "December 12, 1980",
      "country": "India"
    },
    {
      "id": "seeta-aur-geeta",
      "title": "Seeta Aur Geeta",
      "year": 1972,
      "director": "Ramesh Sippy",
      "writer": "Salim-Javed",
      "cinematographer": "K. Vaikunth",
      "editor": "M. S. Shinde",
      "composer": "R. D. Burman",
      "studio": "Sippy Films",
      "focus": "Double-role split-screen optical staging, physical action comedy blocking, and R. D. Burman's upbeat pacing.",
      "plot": "Identical twin sisters separated at birth grow up in different circumstances, leading to comedic situations when they accidentally switch places.",
      "releaseDate": "January 1, 1972",
      "country": "India"
    },
    {
      "id": "shakti",
      "title": "Shakti",
      "year": 1982,
      "director": "Ramesh Sippy",
      "writer": "Salim-Javed",
      "cinematographer": "S. M. Anwar",
      "editor": "M. S. Shinde",
      "composer": "R. D. Burman",
      "studio": "M. R. Productions",
      "focus": "Intense father-son moral drama staging, low-key lighting geometry, and Salim-Javed's monumental screenplay dialogue.",
      "plot": "An honest police officer is forced to choose between his duty and his son, who has turned to crime due to a childhood trauma and resentment.",
      "releaseDate": "September 24, 1982",
      "country": "India"
    },
    {
      "id": "sagar",
      "title": "Sagar",
      "year": 1985,
      "director": "Ramesh Sippy",
      "writer": "Javed Akhtar",
      "cinematographer": "S. M. Anwar",
      "editor": "M. S. Shinde",
      "composer": "R. D. Burman",
      "studio": "Sippy Films",
      "focus": "Lush coastal location cinematography, three-way romantic geometry, and R. D. Burman's melodic orchestrations.",
      "plot": "A wealthy young man and a poor fisherman fall in love with the same beautiful woman who runs a local tavern in a coastal village.",
      "releaseDate": "August 9, 1985",
      "country": "India"
    }
  ],
  "Shyam Benegal": [
    {
      "id": "ankur",
      "title": "Ankur",
      "year": 1974,
      "director": "Shyam Benegal",
      "writer": "Shyam Benegal",
      "cinematographer": "Govind Nihalani",
      "editor": "Bhanudas Divakar",
      "composer": "Vanraj Bhatia",
      "studio": "Blaze Film Enterprises",
      "focus": "Neorealist rural oppression staging, Govind Nihalani's deep-focus cinematography, and class/caste critique.",
      "plot": "A wealthy young landlord begins an affair with a lower-caste servant girl in a rural village, leading to a tragic cycle of exploitation and quiet rebellion.",
      "releaseDate": "September 24, 1974",
      "country": "India"
    },
    {
      "id": "nishant",
      "title": "Nishant",
      "year": 1975,
      "director": "Shyam Benegal",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Govind Nihalani",
      "editor": "Bhanudas Divakar",
      "composer": "Vanraj Bhatia",
      "studio": "Blaze Film Enterprises",
      "focus": "Feudal power abuse staging, Tendulkar's multi-character social script, and neorealist location framing.",
      "plot": "A schoolteacher battles the corrupt, tyrannical local landlords who have abducted his wife, exposing the apathy of the feudal village system.",
      "releaseDate": "January 1, 1975",
      "country": "India"
    },
    {
      "id": "manthan",
      "title": "Manthan",
      "year": 1976,
      "director": "Shyam Benegal",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Govind Nihalani",
      "editor": "Bhanudas Divakar",
      "composer": "Vanraj Bhatia",
      "studio": "Gujarat Cooperative Milk Marketing Federation Ltd.",
      "focus": "Crowdfunded neorealist collective staging, cooperative movement drama, and Govind Nihalani's documentary-realist camera work.",
      "plot": "A young veterinarian arrives in a rural village to set up a dairy cooperative, facing stiff resistance from feudal landlords and local merchants.",
      "releaseDate": "January 1, 1976",
      "country": "India"
    },
    {
      "id": "bhumika",
      "title": "Bhumika",
      "year": 1977,
      "director": "Shyam Benegal",
      "writer": "Shyam Benegal",
      "cinematographer": "Govind Nihalani",
      "editor": "Bhanudas Divakar",
      "composer": "Vanraj Bhatia",
      "studio": "Blaze Film Enterprises",
      "focus": "Actress-autobiography meta-narrative, shift from black-and-white to color period styling, and female autonomy themes.",
      "plot": "An actress in the early years of Indian cinema searches for personal freedom and self-identity through several turbulent relationships.",
      "releaseDate": "January 1, 1977",
      "country": "India"
    },
    {
      "id": "mandi",
      "title": "Mandi",
      "year": 1983,
      "director": "Shyam Benegal",
      "writer": "Shyam Benegal",
      "cinematographer": "Ashok Mehta",
      "editor": "Bhanudas Divakar",
      "composer": "Vanraj Bhatia",
      "studio": "Blaze Film Enterprises",
      "focus": "Satirical ensemble brothel staging, Ashok Mehta's colorful framing, and societal hypocrisy critique.",
      "plot": "A brothel in the heart of a city becomes a political battleground when local moralists try to shut it down to claim the prime real estate.",
      "releaseDate": "January 1, 1983",
      "country": "India"
    }
  ],
  "Govind Nihalani": [
    {
      "id": "aakrosh",
      "title": "Aakrosh",
      "year": 1980,
      "director": "Govind Nihalani",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Govind Nihalani",
      "editor": "Biresh Chatterjee",
      "composer": "Ajit Varman",
      "studio": "NFDC",
      "focus": "Silent tribal protagonist staging, Vijay Tendulkar's legal thriller geometry, and high-contrast shadow cinematography.",
      "plot": "A young peasant is accused of murdering his wife, refusing to speak a word to his defense lawyer as he fears retribution from corrupt local officials.",
      "releaseDate": "January 1, 1980",
      "country": "India"
    },
    {
      "id": "ardh-satya",
      "title": "Ardh Satya",
      "year": 1983,
      "director": "Govind Nihalani",
      "writer": "Vijay Tendulkar",
      "cinematographer": "Govind Nihalani",
      "editor": "Kaiume Zaman",
      "composer": "Ajit Varman",
      "studio": "Neo Films",
      "focus": "Institutional moral corruption staging, gritty urban handheld cinematography, and Tendulkar's razor-sharp scripting.",
      "plot": "An honest police officer battles corrupt politicians and his own inner demons, finding himself pushed to the limit by a compromised justice system.",
      "releaseDate": "August 19, 1983",
      "country": "India"
    },
    {
      "id": "drohkaal",
      "title": "Drohkaal",
      "year": 1994,
      "director": "Govind Nihalani",
      "writer": "Govind Nihalani",
      "cinematographer": "Govind Nihalani",
      "editor": "Deepa Deohare",
      "composer": "Vanraj Bhatia",
      "studio": "Govind Nihalani Productions",
      "focus": "Counter-terrorism psychological game staging, extreme close-up dialogue tension, and bleak lighting geometry.",
      "plot": "Two honest police officers attempt to dismantle a terrorist network, but find their own families and moral codes targeted by the undercover cell's mastermind.",
      "releaseDate": "January 1, 1994",
      "country": "India"
    },
    {
      "id": "hazaar-chaurasi-ki-maa",
      "title": "Hazaar Chaurasi Ki Maa",
      "year": 1998,
      "director": "Govind Nihalani",
      "writer": "Govind Nihalani",
      "cinematographer": "Govind Nihalani",
      "editor": "Deepa Deohare",
      "composer": "Vanraj Bhatia",
      "studio": "Govind Nihalani Productions",
      "focus": "Naxalite political trauma staging, maternal grief observation, and low-key period cinematography.",
      "plot": "A mother discovers the secret political life of her student son after he is killed by police, forcing her to confront her own apolitical existence.",
      "releaseDate": "March 20, 1998",
      "country": "India"
    },
    {
      "id": "dev",
      "title": "Dev",
      "year": 2004,
      "director": "Govind Nihalani",
      "writer": "Govind Nihalani",
      "cinematographer": "Govind Nihalani",
      "editor": "Deepa Deohare",
      "composer": "Aadesh Shrivastava",
      "studio": "Entertainment One",
      "focus": "Communal riot realism, dual-protagonist moral conflict staging, and Nihalani's high-contrast digital look.",
      "plot": "A senior police officer attempts to contain rising communal violence in a city, clashing with his own lifelong friend who advocates a compromised approach.",
      "releaseDate": "June 11, 2004",
      "country": "India"
    }
  ],
  "Saeed Akhtar Mirza": [
    {
      "id": "albert-pinto-ko-gussa-kyoon-aata-hai",
      "title": "Albert Pinto Ko Gussa Kyoon Aata Hai",
      "year": 1980,
      "director": "Saeed Akhtar Mirza",
      "writer": "Saeed Akhtar Mirza",
      "cinematographer": "Virendra Saini",
      "editor": "Renu Saluja",
      "composer": "Bhaskar Chandavarkar",
      "studio": "NFDC",
      "focus": "Urban working-class alienation staging, Renu Saluja's sharp editing, and class struggle narrative.",
      "plot": "A young Christian mechanic in Bombay aspires to become wealthy and middle-class, but his father's union strike forces him to confront systemic labor exploitation.",
      "releaseDate": "January 1, 1980",
      "country": "India"
    },
    {
      "id": "salim-langde-pe-mat-ro",
      "title": "Salim Langde Pe Mat Rodo",
      "year": 1989,
      "director": "Saeed Akhtar Mirza",
      "writer": "Saeed Akhtar Mirza",
      "cinematographer": "Virendra Saini",
      "editor": "Renu Saluja",
      "composer": "Sharang Dev",
      "studio": "NFDC",
      "focus": "Gritty slum-crime neorealism, handheld camera movements, and Renu Saluja's fluid editorial pacing.",
      "plot": "A young, lame Muslim hoodlum in Bombay hopes to make it big in the criminal underworld, but local communal tensions make him a pawn in a larger political game.",
      "releaseDate": "January 1, 1989",
      "country": "India"
    },
    {
      "id": "arvind-desai-ki-ajeeb-dastaan",
      "title": "Arvind Desai Ki Ajeeb Dastaan",
      "year": 1978,
      "director": "Saeed Akhtar Mirza",
      "writer": "Saeed Akhtar Mirza",
      "cinematographer": "Virendra Saini",
      "editor": "Renu Saluja",
      "composer": "Bhaskar Chandavarkar",
      "studio": "NFDC",
      "focus": "Bourgeois alienation staging, slow contemplative framing, and sharp economic critiques.",
      "plot": "The son of a wealthy businessman struggles with his privileged position, torn between his father's capitalistic greed and his friend's Marxist ideals.",
      "releaseDate": "January 1, 1978",
      "country": "India"
    },
    {
      "id": "mohan-joshi-hazir-ho",
      "title": "Mohan Joshi Hazir Ho!",
      "year": 1984,
      "director": "Saeed Akhtar Mirza",
      "writer": "Saeed Akhtar Mirza",
      "cinematographer": "Virendra Saini",
      "editor": "Renu Saluja",
      "composer": "Vanraj Bhatia",
      "studio": "NFDC",
      "focus": "Satirical court-comedy staging, chawl-interior framing, and legal-system satire.",
      "plot": "An elderly couple sues their landlord over their dilapidated chawl building, only to find themselves trapped in a decades-long court battle.",
      "releaseDate": "January 1, 1984",
      "country": "India"
    },
    {
      "id": "naseem",
      "title": "Naseem",
      "year": 1995,
      "director": "Saeed Akhtar Mirza",
      "writer": "Saeed Akhtar Mirza",
      "cinematographer": "Virendra Saini",
      "editor": "Renu Saluja",
      "composer": "Vanraj Bhatia",
      "studio": "NFDC",
      "focus": "Intimate grandfather-granddaughter staging, tense pre-riot atmosphere, and slow poetic framing.",
      "plot": "A young Muslim girl in 1992 Bombay bonds with her ailing grandfather, as communal tensions rise outside leading up to the Babri Masjid demolition.",
      "releaseDate": "January 1, 1995",
      "country": "India"
    }
  ],
  "Ketan Mehta": [
    {
      "id": "mirch-masala",
      "title": "Mirch Masala",
      "year": 1987,
      "director": "Ketan Mehta",
      "writer": "Ketan Mehta",
      "cinematographer": "Jehangir Choudhary",
      "editor": "Renu Saluja",
      "composer": "Rajat Dholakia",
      "studio": "NFDC",
      "focus": "Peasant female rebellion staging, saturated red chili factory color design, and high-tension climax framing.",
      "plot": "A group of village women working in a chili factory protect one of their colleagues from a corrupt, predatory tax collector, defying their submissive husbands.",
      "releaseDate": "January 1, 1987",
      "country": "India"
    },
    {
      "id": "bhavni-bhavai",
      "title": "Bhavni Bhavai",
      "year": 1980,
      "director": "Ketan Mehta",
      "writer": "Ketan Mehta",
      "cinematographer": "Vivek Banerjee",
      "editor": "S. Chakraborty",
      "composer": "Gaurang Vyas",
      "studio": "Sanchar Film Cooperative",
      "focus": "Folk-theatre (Bhavai) performance staging, colorful surreal compositions, and caste-prejudice satire.",
      "plot": "Based on a popular Gujarati folk tale, this film uses traditional performance to satirize untouchability and royal greed.",
      "releaseDate": "January 1, 1980",
      "country": "India"
    },
    {
      "id": "maya-memsaab",
      "title": "Maya Memsaab",
      "year": 1993,
      "director": "Ketan Mehta",
      "writer": "Ketan Mehta",
      "cinematographer": "Anoop Jotwani",
      "editor": "Renu Saluja",
      "composer": "Hridaynath Mangeshkar",
      "studio": "Neo Films",
      "focus": "Madame Bovary adaptation staging, dreamlike surrealist compositions, and female desire themes.",
      "plot": "A beautiful, dream-prone woman escapes her boring marriage by engaging in several affairs, leading to her mysterious disappearance.",
      "releaseDate": "July 2, 1993",
      "country": "India"
    },
    {
      "id": "mangal-pandey-the-rising",
      "title": "Mangal Pandey: The Rising",
      "year": 2005,
      "director": "Ketan Mehta",
      "writer": "Farrukh Dhondy",
      "cinematographer": "Himman Dhamija",
      "editor": "Sreekar Prasad",
      "composer": "A. R. Rahman",
      "studio": "Kaleidoscope Entertainment",
      "focus": "Historical epic scale staging, color-contrast sepoy uniform design, and Rahman's patriotic score.",
      "plot": "The story of Mangal Pandey, a sepoy in the East India Company whose rebellion triggered the Indian Uprising of 1857.",
      "releaseDate": "August 12, 2005",
      "country": "India"
    },
    {
      "id": "manjhi-the-mountain-man",
      "title": "Manjhi - The Mountain Man",
      "year": 2015,
      "director": "Ketan Mehta",
      "writer": "Ketan Mehta",
      "cinematographer": "Rajeev Jain",
      "editor": "Pranay Vivek Patil",
      "composer": "Sandesh Shandilya",
      "studio": "NFDC / Viacom18 Motion Pictures",
      "focus": "Himalayan landscape integration, physical labor staging, and long-arc character determination framing.",
      "plot": "The true story of Dashrath Manjhi, a poor laborer in Bihar who spent 22 years carving a path through a mountain using only a hammer and chisel.",
      "releaseDate": "August 21, 2015",
      "country": "India"
    }
  ],
  "Mani Kaul": [
    {
      "id": "uski-roti",
      "title": "Uski Roti",
      "year": 1970,
      "director": "Mani Kaul",
      "writer": "Mani Kaul",
      "cinematographer": "K. K. Mahajan",
      "editor": "Ravi Patnaik",
      "composer": "Non-traditional / Drone Atmos",
      "studio": "Film Finance Corporation (FFC)",
      "focus": "Contemplative slow-cinema pacing, flat neorealist compositions, and non-diegetic drone soundscapes.",
      "plot": "A young rural woman waits daily by the highway to deliver bread to her indifferent bus-driver husband, exploring the silence of marital isolation.",
      "releaseDate": "January 1, 1970",
      "country": "India"
    },
    {
      "id": "ashadh-ka-ek-din",
      "title": "Ashadh Ka Ek Din",
      "year": 1971,
      "director": "Mani Kaul",
      "writer": "Mani Kaul",
      "cinematographer": "K. K. Mahajan",
      "editor": "Ravi Patnaik",
      "composer": "Non-traditional",
      "studio": "Film Finance Corporation (FFC)",
      "focus": "Formalist theatre adaptation staging, long contemplative takes, and deep-focus landscape framing.",
      "plot": "Based on Mohan Rakesh's play, this film depicts the tragic love story between the classical poet Kalidasa and his village muse Mallika.",
      "releaseDate": "January 1, 1971",
      "country": "India"
    },
    {
      "id": "duvidha",
      "title": "Duvidha",
      "year": 1973,
      "director": "Mani Kaul",
      "writer": "Mani Kaul",
      "cinematographer": "Navroze Contractor",
      "editor": "Mani Kaul",
      "composer": "Folk Musicians of Rajasthan",
      "studio": "Mani Kaul Productions",
      "focus": "Surrealist folk-tale staging, high-contrast desert cinematography, and traditional musical motifs.",
      "plot": "A newlywed merchant travels away for business, and a ghost who has fallen in love with his bride takes his place, living in harmony with her.",
      "releaseDate": "January 1, 1973",
      "country": "India"
    },
    {
      "id": "nazar",
      "title": "Nazar",
      "year": 1990,
      "director": "Mani Kaul",
      "writer": "Mani Kaul",
      "cinematographer": "Piyush Shah",
      "editor": "Lalitha Krishna",
      "composer": "Viktor Kisin",
      "studio": "NFDC",
      "focus": "Dostoevsky adaptation staging, slow-pace reflective geometry, and abstract musical score.",
      "plot": "Based on Dostoevsky's 'The Gentle Creature', a middle-aged pawnbroker marries a poor young girl, leading to a silent clash of wills.",
      "releaseDate": "January 1, 1990",
      "country": "India"
    },
    {
      "id": "idiot",
      "title": "Idiot",
      "year": 1992,
      "director": "Mani Kaul",
      "writer": "Anup Singh",
      "cinematographer": "Piyush Shah",
      "editor": "Lalitha Krishna",
      "composer": "Dagar Brothers",
      "studio": "Doordarshan",
      "focus": "Epic literary adaptation, deep shadow framing, and traditional Dhrupad vocal accompaniment.",
      "plot": "An adaptation of Dostoevsky's novel, exploring the moral choices of an innocent, naive man returning to modern Indian high society.",
      "releaseDate": "January 1, 1992",
      "country": "India"
    }
  ],
  "Ram Gopal Varma": [
    {
      "id": "satya",
      "title": "Satya",
      "year": 1998,
      "director": "Ram Gopal Varma",
      "writer": "Anurag Kashyap / Saurabh Shukla",
      "cinematographer": "Gerard Hooper / Mazhar Kamran",
      "editor": "Apurva Asrani / Bhanodaya",
      "composer": "Vishal Bhardwaj (Score: Sandeep Chowta)",
      "studio": "Varma Corporation",
      "focus": "Gritty location gangster realism, handheld camera movements, and Sandeep Chowta's intense background score.",
      "plot": "An immigrant arrives in Bombay and is sucked into the local underworld, rising quickly while hiding his criminal life from his innocent neighbor.",
      "releaseDate": "July 3, 1998",
      "country": "India"
    },
    {
      "id": "company",
      "title": "Company",
      "year": 2002,
      "director": "Ram Gopal Varma",
      "writer": "Jaideep Sahni",
      "cinematographer": "Hemant Chaturvedi",
      "editor": "Chandan Arora",
      "composer": "Sandeep Chowta",
      "studio": "Varma Corporation",
      "focus": "Global crime network staging, slick cinematography, and Sandeep Chowta's electronic tracking score.",
      "plot": "A young thug joins a powerful gang and becomes the leader's right-hand man, but betrayal and rivalry soon spark a violent international war.",
      "releaseDate": "April 12, 2002",
      "country": "India"
    },
    {
      "id": "shiva",
      "title": "Shiva",
      "year": 1990,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "S. Gopala Reddy",
      "editor": "Murali-Rama",
      "composer": "Ilaiyaraaja",
      "studio": "Annapurna Studios",
      "focus": "College political violence staging, kinetic action choreography, and Ilaiyaraaja's percussion-driven score.",
      "plot": "A student enters a new college and stands up against a corrupt, politically-backed gang leader who terrorizes the campus.",
      "releaseDate": "October 5, 1990",
      "country": "India"
    },
    {
      "id": "rangeela",
      "title": "Rangeela",
      "year": 1995,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "W. B. Rao",
      "editor": "R. Rajendran",
      "composer": "A. R. Rahman",
      "studio": "Varma Corporation",
      "focus": "Bombay film-industry satire, modern pop-color staging, and Rahman's breakthrough musical score.",
      "plot": "A street-smart youth is torn when his childhood friend gets cast in a movie by a superstar who falls in love with her.",
      "releaseDate": "September 8, 1995",
      "country": "India"
    },
    {
      "id": "sarkar",
      "title": "Sarkar",
      "year": 2005,
      "director": "Ram Gopal Varma",
      "writer": "Manish Gupta",
      "cinematographer": "Amit Roy",
      "editor": "Nipun Ashok Gupta",
      "composer": "Amar Mohile",
      "studio": "K Sera Sera / Kimi Kat Productions",
      "focus": "Godfather-tribute shadow staging, extreme close-up dialogue tension, and Amar Mohile's operatic background chant score.",
      "plot": "An influential patriarch who runs a parallel government in Bombay is targeted by corporate and political rivals, forcing his younger son to take charge.",
      "releaseDate": "July 1, 2005",
      "country": "India"
    }
  ],
  "Ashutosh Gowariker": [
    {
      "id": "lagaan",
      "title": "Lagaan",
      "year": 2001,
      "director": "Ashutosh Gowariker",
      "writer": "Ashutosh Gowariker",
      "cinematographer": "Anil Mehta",
      "editor": "Ballu Saluja",
      "composer": "A. R. Rahman",
      "studio": "Aamir Khan Productions",
      "focus": "Cricket match dramatic staging, Anil Mehta's deep-focus desert photography, and Rahman's folk-orchestral score.",
      "plot": "In Victorian India, a young villager accepts a challenge to a cricket match against British officers to cancel their oppressive taxes.",
      "releaseDate": "June 15, 2001",
      "country": "India"
    },
    {
      "id": "swades",
      "title": "Swades",
      "year": 2004,
      "director": "Ashutosh Gowariker",
      "writer": "Ashutosh Gowariker",
      "cinematographer": "Mahesh Aney",
      "editor": "Ballu Saluja",
      "composer": "A. R. Rahman",
      "studio": "Ashutosh Gowariker Productions",
      "focus": "Rural reform neorealist staging, NASA-to-village spatial contrasts, and Rahman's lyrical score.",
      "plot": "A successful NASA scientist returns to a remote Indian village to find his childhood nanny, leading to a profound personal awakening and rural reform.",
      "releaseDate": "December 17, 2004",
      "country": "India"
    },
    {
      "id": "jodhaa-akbar",
      "title": "Jodhaa Akbar",
      "year": 2008,
      "director": "Ashutosh Gowariker",
      "writer": "Haidar Ali / Ashutosh Gowariker",
      "cinematographer": "Kiran Deohans",
      "editor": "Ballu Saluja",
      "composer": "A. R. Rahman",
      "studio": "Ashutosh Gowariker Productions",
      "focus": "Mughal palace epic scale staging, royal combat choreography, and Rahman's grand spiritual score.",
      "plot": "A sixteenth-century love story about a marriage of convenience between the Mughal Emperor Akbar and a Rajput Princess.",
      "releaseDate": "February 15, 2008",
      "country": "India"
    }
  ],
  "Farhan Akhtar": [
    {
      "id": "dil-chahta-hai",
      "title": "Dil Chahta Hai",
      "year": 2001,
      "director": "Farhan Akhtar",
      "writer": "Farhan Akhtar",
      "cinematographer": "Ravi K. Chandran",
      "editor": "A. Sreekar Prasad",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "Excel Entertainment",
      "focus": "Modern youth friendship staging, urban-to-Goa scenic contrasts, and Shankar-Ehsaan-Loy's landmark contemporary score.",
      "plot": "Three college friends find their close bond tested by their differing approaches to romance and career choices.",
      "releaseDate": "August 10, 2001",
      "country": "India"
    },
    {
      "id": "lakshya",
      "title": "Lakshya",
      "year": 2004,
      "director": "Farhan Akhtar",
      "writer": "Javed Akhtar",
      "cinematographer": "Christopher Popp",
      "editor": "Anand Subaya",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "Excel Entertainment",
      "focus": "High-altitude military combat staging, coming-of-age personal geometry, and Shankar-Ehsaan-Loy's heroic score.",
      "plot": "An aimless, wealthy young man joins the Indian Army, finding his purpose and self-respect during the Kargil War.",
      "releaseDate": "June 18, 2004",
      "country": "India"
    },
    {
      "id": "don",
      "title": "Don",
      "year": 2006,
      "director": "Farhan Akhtar",
      "writer": "Farhan Akhtar",
      "cinematographer": "K. U. Mohanan",
      "editor": "Anand Subaya",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "Excel Entertainment",
      "focus": "Slick international thriller staging, modern pop-color digital cinematography, and identity-deception plot choreography.",
      "plot": "An ordinary lookalike is hired by police to infiltrate a powerful drug cartel after the real mafia boss is killed.",
      "releaseDate": "October 20, 2006",
      "country": "India"
    }
  ],
  "Vishal Bhardwaj": [
    {
      "id": "maqbool",
      "title": "Maqbool",
      "year": 2003,
      "director": "Vishal Bhardwaj",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Hemant Chaturvedi",
      "editor": "Aarif Sheikh",
      "composer": "Vishal Bhardwaj",
      "studio": "Kaleidoscope Entertainment",
      "focus": "Macbeth adaptation Bombay mafia staging, low-key lighting shadow geometry, and Bhardwaj's atmospheric score.",
      "plot": "An ambitious underworld lieutenant falls in love with his boss's mistress, who incites him to murder the patriarch and claim leadership.",
      "releaseDate": "January 30, 2004",
      "country": "India"
    },
    {
      "id": "omkara",
      "title": "Omkara",
      "year": 2006,
      "director": "Vishal Bhardwaj",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Tassaduq Hussain",
      "editor": "Meghna Manchanda Sen",
      "composer": "Vishal Bhardwaj",
      "studio": "Big Screen Entertainment",
      "focus": "Othello adaptation UP rural gang staging, naturalistic lighting framing, and Bhardwaj's folk-driven score.",
      "plot": "An outlaw leader's trust in his beautiful bride is poisoned by a jealous lieutenant who manipulates events to destroy them.",
      "releaseDate": "July 28, 2006",
      "country": "India"
    },
    {
      "id": "haider",
      "title": "Haider",
      "year": 2014,
      "director": "Vishal Bhardwaj",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Pankaj Kumar",
      "editor": "Aarif Sheikh",
      "composer": "Vishal Bhardwaj",
      "studio": "VB Pictures",
      "focus": "Hamlet adaptation Kashmir landscape integration, cold desaturated color design, and physical production scale.",
      "plot": "A young man returns to Kashmir during the peak of conflict to search for his missing father, confronting his mother's betrayal.",
      "releaseDate": "October 2, 2014",
      "country": "India"
    },
    {
      "id": "kaminey",
      "title": "Kaminey",
      "year": 2009,
      "director": "Vishal Bhardwaj",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Tassaduq Hussain",
      "editor": "A. Sreekar Prasad",
      "composer": "Vishal Bhardwaj",
      "studio": "UTV Motion Pictures",
      "focus": "Multi-strand pulp action staging, kinetic handheld cinematography, and rapid-cut editing loops.",
      "plot": "Twin brothers with contrasting speech impediments cross paths in a web of corrupt politicians and drug smugglers.",
      "releaseDate": "August 14, 2009",
      "country": "India"
    },
    {
      "id": "7-khoon-maaf",
      "title": "7 Khoon Maaf",
      "year": 2011,
      "director": "Vishal Bhardwaj",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Sylvester Fonseca",
      "editor": "A. Sreekar Prasad",
      "composer": "Vishal Bhardwaj",
      "studio": "VB Pictures",
      "focus": "Black comedy period staging, shifting color palettes matching husband archetypes, and classical score.",
      "plot": "An Anglo-Indian woman searches for true love through six marriages, each ending in the mysterious death of her husband.",
      "releaseDate": "February 18, 2011",
      "country": "India"
    }
  ],
  "Anurag Kashyap": [
    {
      "id": "black-friday",
      "title": "Black Friday",
      "year": 2007,
      "director": "Anurag Kashyap",
      "writer": "Anurag Kashyap",
      "cinematographer": "Natarajan Subramaniam",
      "editor": "Aarti Bajaj",
      "composer": "Indian Ocean",
      "studio": "Mid Day Multimedia Limited",
      "focus": "Docudrama location-realism staging, rapid-fire police interrogation framing, and Indian Ocean's fusion score.",
      "plot": "The story of the investigation into the 1993 Bombay bomb blasts, following police officers, conspirators, and victims in a multi-thread manhunt.",
      "releaseDate": "February 9, 2007",
      "country": "India"
    },
    {
      "id": "gangs-of-wasseypur",
      "title": "Gangs of Wasseypur",
      "year": 2012,
      "director": "Anurag Kashyap",
      "writer": "Anurag Kashyap",
      "cinematographer": "Rajeev Ravi",
      "editor": "Shweta Venkat Mathew",
      "composer": "Sneha Khanwalkar",
      "studio": "AKFPL / Filmwasseypur",
      "focus": "Coal-mafia multi-generational epic staging, Rajeev Ravi's kinetic cinematography, and Sneha Khanwalkar's folk-experimental score.",
      "plot": "A multi-generational blood feud between two powerful crime families in Wasseypur spans decades, fueled by coal wealth and politics.",
      "releaseDate": "June 22, 2012",
      "country": "India"
    },
    {
      "id": "dev-d",
      "title": "Dev.D",
      "year": 2009,
      "director": "Anurag Kashyap",
      "writer": "Anurag Kashyap",
      "cinematographer": "Rajeev Ravi",
      "editor": "Aarti Bajaj",
      "composer": "Amit Triviedi",
      "studio": "UTV Spotboy",
      "focus": "Saturated neon-night visual design, hallucinatory digital editing, and Amit Trivedi's eclectic multi-genre score.",
      "plot": "A modern, urban adaptation of Devdas, tracing a young man's descent into drug-addled self-destruction in Delhi.",
      "releaseDate": "February 6, 2009",
      "country": "India"
    },
    {
      "id": "ugly",
      "title": "Ugly",
      "year": 2014,
      "director": "Anurag Kashyap",
      "writer": "Anurag Kashyap",
      "cinematographer": "Nikos Andritsakis",
      "editor": "Aarti Bajaj",
      "composer": "Brian McOmber / G. V. Prakash Kumar",
      "studio": "Phantom Films / Dar Motion Pictures",
      "focus": "Claustrophobic handheld thriller staging, bleak low-key lighting, and relentless moral collapse narrative.",
      "plot": "The kidnapping of a young girl triggers a web of mutual suspicion and greed among her family members and police investigators.",
      "releaseDate": "December 26, 2014",
      "country": "India"
    },
    {
      "id": "raman-raghav-2-0",
      "title": "Raman Raghav 2.0",
      "year": 2016,
      "director": "Anurag Kashyap",
      "writer": "Anurag Kashyap",
      "cinematographer": "Jay Oza",
      "editor": "Aarti Bajaj",
      "composer": "Ram Sampath",
      "studio": "Phantom Films",
      "focus": "Serial-killer shadow geometry staging, neon-noir Mumbai street cinematography, and Ram Sampath's industrial electronic score.",
      "plot": "A modern serial killer inspired by the notorious Raman Raghav engages in a deadly game of cat-and-mouse with a corrupt, drug-addled police officer.",
      "releaseDate": "June 24, 2016",
      "country": "India"
    }
  ],
  "Rakeysh Omprakash Mehra": [
    {
      "id": "rang-de-basanti",
      "title": "Rang De Basanti",
      "year": 2006,
      "director": "Rakeysh Omprakash Mehra",
      "writer": "Kamlesh Pandey / Rakeysh Omprakash Mehra",
      "cinematographer": "Binod Pradhan",
      "editor": "P. S. Bharathi",
      "composer": "A. R. Rahman",
      "studio": "ROMP / UTV Motion Pictures",
      "focus": "Dual-timeline parallel editing, historic-to-contemporary contrast staging, and Rahman's landmark youth score.",
      "plot": "A British filmmaker casts a group of aimless college friends in her documentary about Indian freedom fighters, triggering a real-world rebellion.",
      "releaseDate": "January 26, 2006",
      "country": "India"
    },
    {
      "id": "bhaag-milkha-bhaag",
      "title": "Bhaag Milkha Bhaag",
      "year": 2013,
      "director": "Rakeysh Omprakash Mehra",
      "writer": "Prasoon Joshi",
      "cinematographer": "Binod Pradhan",
      "editor": "P. S. Bharathi",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "ROMP Pictures",
      "focus": "Olympic athletic track staging, partition-flashback visual geometry, and Shankar-Ehsaan-Loy's high-energy score.",
      "plot": "The biographical story of Milkha Singh, a partition survivor who overcame immense personal trauma to become an Olympic runner.",
      "releaseDate": "July 12, 2013",
      "country": "India"
    },
    {
      "id": "delhi-6",
      "title": "Delhi-6",
      "year": 2009,
      "director": "Rakeysh Omprakash Mehra",
      "writer": "Rakeysh Omprakash Mehra",
      "cinematographer": "Binod Pradhan",
      "editor": "P. S. Bharathi",
      "composer": "A. R. Rahman",
      "studio": "ROMP Pictures",
      "focus": "Contemplative old-Delhi chawl staging, communal mirror geometry, and Rahman's spiritual soundtrack.",
      "plot": "An Indian-American man travels to old Delhi with his ailing grandmother, finding himself caught in a web of religious and social conflicts.",
      "releaseDate": "February 20, 2009",
      "country": "India"
    }
  ],
  "Rajkumar Hirani": [
    {
      "id": "3-idiots",
      "title": "3 Idiots",
      "year": 2009,
      "director": "Rajkumar Hirani",
      "writer": "Abhijat Joshi / Rajkumar Hirani",
      "cinematographer": "Muraleedharan C. K.",
      "editor": "Rajkumar Hirani",
      "composer": "Shantanu Moitra",
      "studio": "Vinod Chopra Films",
      "focus": "Campus-satire ensemble staging, Hirani's signature reaction-cut editing, and Shantanu Moitra's melodic youth score.",
      "plot": "Two college friends search for their long-lost companion, recalling their student days when he challenged the rigid educational system.",
      "releaseDate": "December 25, 2009",
      "country": "India"
    },
    {
      "id": "munna-bhai-mbbs",
      "title": "Munna Bhai M.B.B.S.",
      "year": 2003,
      "director": "Rajkumar Hirani",
      "writer": "Lajan Joseph / Rajkumar Hirani",
      "cinematographer": "Binod Pradhan",
      "editor": "Rajkumar Hirani",
      "composer": "Anu Malik",
      "studio": "Vinod Chopra Productions",
      "focus": "Satirical hospital-interior staging, comic-contrast character geometry, and Anu Malik's popular melodies.",
      "plot": "A good-natured underworld don adopts a fake identity to enroll in a medical college to fulfill his father's dream of having a doctor son.",
      "releaseDate": "December 19, 2003",
      "country": "India"
    },
    {
      "id": "lage-raho-munna-bhai",
      "title": "Lage Raho Munna Bhai",
      "year": 2006,
      "director": "Rajkumar Hirani",
      "writer": "Abhijat Joshi / Rajkumar Hirani",
      "cinematographer": "Muraleedharan C. K.",
      "editor": "Rajkumar Hirani",
      "composer": "Shantanu Moitra",
      "studio": "Vinod Chopra Films",
      "focus": "Satirical Gandhian moral staging, comedic split-screen architecture, and Shantanu Moitra's warm melodies.",
      "plot": "An underworld don begins to see hallucinations of Mahatma Gandhi, using his teachings of non-violence to help ordinary citizens.",
      "releaseDate": "September 1, 2006",
      "country": "India"
    }
  ],
  "Dibakar Banerjee": [
    {
      "id": "khosla-ka-ghosla",
      "title": "Khosla Ka Ghosla!",
      "year": 2006,
      "director": "Dibakar Banerjee",
      "writer": "Jaideep Sahni",
      "cinematographer": "Sandeep Chatterji",
      "editor": "Bhanu Chawla",
      "composer": "Bapi-Tutul",
      "studio": "Tandav Film Productions",
      "focus": "Middle-class Delhi domestic satire, comic-heist coordination geometry, and Sandeep Chatterji's naturalistic photography.",
      "plot": "A middle-class family pulls off a complex, humorous con game to reclaim their plot of land from a corrupt real-estate developer.",
      "releaseDate": "September 22, 2006",
      "country": "India"
    },
    {
      "id": "oye-lucky-lucky-oye",
      "title": "Oye Lucky! Lucky Oye!",
      "year": 2008,
      "director": "Dibakar Banerjee",
      "writer": "Dibakar Banerjee",
      "cinematographer": "Kartik Vijay",
      "editor": "Namrata Rao",
      "composer": "Sneha Khanwalkar",
      "studio": "UTV Motion Pictures",
      "focus": "Delhi-suburb satirical caper staging, Namrata Rao's snappy editing, and Sneha Khanwalkar's folk-fusion score.",
      "plot": "The biographical-satire story of a charming, modern thief who robs the wealthy elite of Delhi simply for the thrill of the game.",
      "releaseDate": "November 28, 2008",
      "country": "India"
    },
    {
      "id": "lsd-love-sex-aur-dhokha",
      "title": "LSD: Love Sex Aur Dhokha",
      "year": 2010,
      "director": "Dibakar Banerjee",
      "writer": "Dibakar Banerjee",
      "cinematographer": "Nikos Andritsakis",
      "editor": "Namrata Rao",
      "composer": "Sneha Khanwalkar",
      "studio": "Freshlime Films",
      "focus": "Digital camera found-footage staging, split-screen video geometry, and raw, desaturated low-key lighting.",
      "plot": "Three intersecting stories captured on digital cameras explore the dark underbelly of honor killings, casting couches, and MMS leaks.",
      "releaseDate": "March 19, 2010",
      "country": "India"
    },
    {
      "id": "shanghai",
      "title": "Shanghai",
      "year": 2012,
      "director": "Dibakar Banerjee",
      "writer": "Dibakar Banerjee",
      "cinematographer": "Nikos Andritsakis",
      "editor": "Namrata Rao",
      "composer": "Vishal-Shekhar",
      "studio": "PVR Pictures",
      "focus": "Political thriller corruption staging, Nikos Andritsakis's gritty location framing, and Namrata Rao's tense editing.",
      "plot": "An activist's death in a provincial city triggers an investigation that exposes the deep complicity of local bureaucrats and real-estate cartels.",
      "releaseDate": "June 8, 2012",
      "country": "India"
    }
  ],
  "Neeraj Ghaywan": [
    {
      "id": "masaan",
      "title": "Masaan",
      "year": 2015,
      "director": "Neeraj Ghaywan",
      "writer": "Varun Grover",
      "cinematographer": "Avinash Arun",
      "editor": "Nitin Baid",
      "composer": "Indian Ocean",
      "studio": "Phantom Films / Dr दृश्यम",
      "focus": "Ganga ghat location-realist staging, Avinash Arun's poetic landscape framing, and Indian Ocean's acoustic score.",
      "plot": "Two parallel stories explore the tragedies of caste prejudice, sexual blackmail, and grief along Varanasi's sacred cremation ghats.",
      "releaseDate": "July 24, 2015",
      "country": "India"
    }
  ],
  "Chaitanya Tamhane": [
    {
      "id": "court",
      "title": "Court",
      "year": 2015,
      "director": "Chaitanya Tamhane",
      "writer": "Chaitanya Tamhane",
      "cinematographer": "Mrinal Desai",
      "editor": "Rikhav Desai",
      "composer": "Anita Kushwaha",
      "studio": "Zoo Entertainment",
      "focus": "Austere long-take courtroom realism, static wide-angle objective framing, and silent institutional satire.",
      "plot": "An aging folk singer is put on trial for inciting a sewage worker's suicide through his songs, exposing the systemic apathy of the legal system.",
      "releaseDate": "April 17, 2015",
      "country": "India"
    },
    {
      "id": "the-disciple",
      "title": "The Disciple",
      "year": 2021,
      "director": "Chaitanya Tamhane",
      "writer": "Chaitanya Tamhane",
      "cinematographer": "Michał Sobociński",
      "editor": "Chaitanya Tamhane",
      "composer": "Aneesh Pradhan",
      "studio": "Zoo Entertainment",
      "focus": "Contemplative classical music performance staging, Michał Sobociński's moody low-key framing, and slow-cinema pacing.",
      "plot": "A young Hindustani classical vocalist struggles to achieve perfection in his craft, questioning his devotion as his masters' legacy fades.",
      "releaseDate": "April 30, 2021",
      "country": "India"
    }
  ],
  "Ritesh Batra": [
    {
      "id": "the-lunchbox",
      "title": "The Lunchbox",
      "year": 2013,
      "director": "Ritesh Batra",
      "writer": "Ritesh Batra",
      "cinematographer": "Michael Simmonds",
      "editor": "John F. Lyons",
      "composer": "Max Richter",
      "studio": "DAR Motion Pictures",
      "focus": "Mumbai dabbawala spatial tracking, intimate domestic interior framing, and quiet humanistic letter-reading geometry.",
      "plot": "A mistake in Mumbai's famous lunchbox delivery system connects an unhappy housewife and a lonely widower who share letters through the box.",
      "releaseDate": "September 20, 2013",
      "country": "India"
    }
  ],
  "Shoojit Sircar": [
    {
      "id": "piku",
      "title": "Piku",
      "year": 2015,
      "director": "Shoojit Sircar",
      "writer": "Juhi Chaturvedi",
      "cinematographer": "Kamaljeet Negi",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Anupam Roy",
      "studio": "MSM Motion Pictures",
      "focus": "Warm road-trip ensemble staging, Juhi Chaturvedi's sharp family dialogue geometry, and Anupam Roy's acoustic melodies.",
      "plot": "A successful architect takes a road trip from Delhi to Kolkata with her eccentric, hypochondriac father who is obsessed with his bowel movements.",
      "releaseDate": "May 8, 2015",
      "country": "India"
    },
    {
      "id": "vicky-donor",
      "title": "Vicky Donor",
      "year": 2012,
      "director": "Shoojit Sircar",
      "writer": "Juhi Chaturvedi",
      "cinematographer": "Kamaljeet Negi",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Abhishek-Akshay",
      "studio": "John Abraham Entertainment",
      "focus": "Delhi neighborhood satirical staging, comic-contrast character geometry, and lighthearted editorial pacing.",
      "plot": "A struggling young Punjabi youth is recruited by an infertility specialist to become a sperm donor, keeping his job secret from his new wife.",
      "releaseDate": "April 20, 2012",
      "country": "India"
    },
    {
      "id": "october",
      "title": "October",
      "year": 2018,
      "director": "Shoojit Sircar",
      "writer": "Juhi Chaturvedi",
      "cinematographer": "Avik Mukhopadhyay",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Contemplative score by Shantanu Moitra",
      "studio": "Rising Sun Films",
      "focus": "Contemplative hospital interior observation, Avik Mukhopadhyay's soft naturalistic lighting, and slow-cinema pacing.",
      "plot": "A young hotel management trainee develops a silent, obsessive bond with a colleague who falls into a coma after a tragic accident.",
      "releaseDate": "April 13, 2018",
      "country": "India"
    },
    {
      "id": "sardar-udham",
      "title": "Sardar Udham",
      "year": 2021,
      "director": "Shoojit Sircar",
      "writer": "Shubhendu Bhattacharya / Ritesh Shah",
      "cinematographer": "Avik Mukhopadhyay",
      "editor": "Chandrashekhar Prajapati",
      "composer": "Shantanu Moitra",
      "studio": "Rising Sun Films",
      "focus": "Historical biography scale staging, desaturated period color grading, and non-linear political memory editing.",
      "plot": "The biographical story of Udham Singh, an Indian revolutionary who spent decades planning the assassination of Michael O'Dwyer to avenge the Jallianwala Bagh massacre.",
      "releaseDate": "October 16, 2021",
      "country": "India"
    }
  ],
  "Meghna Gulzar": [
    {
      "id": "talvar",
      "title": "Talvar",
      "year": 2015,
      "director": "Meghna Gulzar",
      "writer": "Vishal Bhardwaj",
      "cinematographer": "Pankaj Kumar",
      "editor": "A. Sreekar Prasad",
      "composer": "Vishal Bhardwaj",
      "studio": "VB Pictures",
      "focus": "Rashomon-style multi-perspective crime staging, low-key lighting shadow geometry, and A. Sreekar Prasad's snappy editing loops.",
      "plot": "Based on a real-world double homicide, this investigative thriller traces the conflicting theories of police officers looking into the murder of a teenage girl.",
      "releaseDate": "October 2, 2015",
      "country": "India"
    },
    {
      "id": "raazi",
      "title": "Raazi",
      "year": 2018,
      "director": "Meghna Gulzar",
      "writer": "Bhavani Iyer / Meghna Gulzar",
      "cinematographer": "Jay I. Patel",
      "editor": "Nitin Baid",
      "composer": "Shankar-Ehsaan-Loy",
      "studio": "Junglee Pictures / Dharma Productions",
      "focus": "Espionage domestic-interior tension staging, Jay Patel's naturalistic camera work, and Nitin Baid's fluid editorial pacing.",
      "plot": "An Indian college girl is married into a Pakistani military family to serve as an undercover spy leading up to the Indo-Pakistani War of 1971.",
      "releaseDate": "May 11, 2018",
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
