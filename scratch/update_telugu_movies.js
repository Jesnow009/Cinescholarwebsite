const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "K. Viswanath": [
    {
      "id": "sankarabharanam",
      "title": "Sankarabharanam",
      "year": 1980,
      "director": "K. Viswanath",
      "writer": "K. Viswanath",
      "cinematographer": "Balu Mahendra",
      "editor": "G. G. Krishna Rao",
      "composer": "K. V. Mahadevan",
      "studio": "Poornodaya Movie Creations",
      "focus": "Traditional Carnatic music staging, classical dance geometry, and cinematic defense of traditional arts.",
      "plot": "A renowned classical singer defends the purity of Carnatic music against modern commercialism and social prejudice, taking in the daughter of a courtesan as his disciple.",
      "releaseDate": "February 2, 1980",
      "country": "India"
    },
    {
      "id": "sagara-sangamam",
      "title": "Sagara Sangamam",
      "year": 1983,
      "director": "K. Viswanath",
      "writer": "K. Viswanath",
      "cinematographer": "P. S. Nivas",
      "editor": "G. G. Krishna Rao",
      "composer": "Ilaiyaraaja",
      "studio": "Poornodaya Movie Creations",
      "focus": "Classical dance choreography, tragic artist melodrama staging, and musical storytelling integration.",
      "plot": "A multi-talented but alcoholic classical dancer struggles with missed opportunities and societal apathy, finding late-life redemption by training a young girl.",
      "releaseDate": "June 3, 1983",
      "country": "India"
    },
    {
      "id": "swati-mutyam",
      "title": "Swati Mutyam",
      "year": 1986,
      "director": "K. Viswanath",
      "writer": "K. Viswanath",
      "cinematographer": "M. V. Raghu",
      "editor": "G. G. Krishna Rao",
      "composer": "Ilaiyaraaja",
      "studio": "Sri Rajalakshmi Art Pictures",
      "focus": "Innocent protagonist character framing, rural social critique, and empathetic emotional staging.",
      "plot": "An autistic man marries a young widow with a child, challenging orthodox village customs and proving that innocence can triumph over societal hypocrisy.",
      "releaseDate": "March 13, 1986",
      "country": "India"
    },
    {
      "id": "sirivennela",
      "title": "Sirivennela",
      "year": 1986,
      "director": "K. Viswanath",
      "writer": "K. Viswanath",
      "cinematographer": "M. V. Raghu",
      "editor": "G. G. Krishna Rao",
      "composer": "K. V. Mahadevan",
      "studio": "Prerna Art Pictures",
      "focus": "Blind protagonist auditory perspective staging, artistic connection geometry, and lyrical musical motifs.",
      "plot": "A blind flutist and a mute painter develop a deep, unspoken artistic connection, communicating through their respective arts while facing tragic romantic misunderstandings.",
      "releaseDate": "June 13, 1986",
      "country": "India"
    },
    {
      "id": "swarnakamalam",
      "title": "Swarnakamalam",
      "year": 1988,
      "director": "K. Viswanath",
      "writer": "K. Viswanath",
      "cinematographer": "Lok Singh",
      "editor": "G. G. Krishna Rao",
      "composer": "Ilaiyaraaja",
      "studio": "Bhanu Chitra",
      "focus": "Classical dance rehearsal staging, reluctant protagonist character transformation, and aesthetic appreciation motifs.",
      "plot": "A talented but reluctant classical dancer who disdains her heritage is guided by a passionate artist to discover the true beauty and spiritual value of her art form.",
      "releaseDate": "July 15, 1988",
      "country": "India"
    }
  ],
  "Bapu": [
    {
      "id": "muthyala-muggu",
      "title": "Muthyala Muggu",
      "year": 1975,
      "director": "Bapu",
      "writer": "Mullapudi Venkata Ramana",
      "cinematographer": "Ishan Arya",
      "editor": "K. A. Marthand",
      "composer": "K. V. Mahadevan",
      "studio": "Chitra Kalpana Films",
      "focus": "Folk-style rural staging, Ramayana narrative parallels, and iconic villain blocking.",
      "plot": "A young married couple is separated by the deceitful plotting of a greedy contractor, leading to a long struggle before their ultimate reunion.",
      "releaseDate": "February 28, 1975",
      "country": "India"
    },
    {
      "id": "sita-kalyanam",
      "title": "Sita Kalyanam",
      "year": 1976,
      "director": "Bapu",
      "writer": "Mullapudi Venkata Ramana",
      "cinematographer": "Ishan Arya",
      "editor": "K. A. Marthand",
      "composer": "K. V. Mahadevan",
      "studio": "Satya Chitra",
      "focus": "Mythological narrative staging, traditional painting aesthetic framing, and ritualistic music integration.",
      "plot": "A cinematic retelling of the holy union and wedding of Lord Rama and Goddess Sita from the Hindu epic Ramayana.",
      "releaseDate": "February 26, 1976",
      "country": "India"
    },
    {
      "id": "mana-voori-pandavulu",
      "title": "Mana Voori Pandavulu",
      "year": 1978,
      "director": "Bapu",
      "writer": "Mullapudi Venkata Ramana",
      "cinematographer": "S. Gopal Reddy",
      "editor": "K. A. Marthand",
      "composer": "K. V. Mahadevan",
      "studio": "Jaya Krishna Movies",
      "focus": "Modern Mahabharata allegory, rural revolutionary staging, and collective action geometry.",
      "plot": "A group of five young villagers is inspired by a mysterious man to unite and rebel against the oppressive, corrupt landlord of their village.",
      "releaseDate": "November 3, 1978",
      "country": "India"
    },
    {
      "id": "mr-pellam",
      "title": "Mr. Pellam",
      "year": 1993,
      "director": "Bapu",
      "writer": "Mullapudi Venkata Ramana",
      "cinematographer": "R. Raghunadha Reddy",
      "editor": "G. G. Krishna Rao",
      "composer": "M. M. Keeravani",
      "studio": "Sri Lakshmi Srinivasa Chitra",
      "focus": "Domestic role-reversal comedy staging, middle-class financial tension framing, and satirical marriage dialoguing.",
      "plot": "An arrogant husband who loses his job struggles to accept his wife's career success, leading to domestic conflict and humorous life lessons.",
      "releaseDate": "May 21, 1993",
      "country": "India"
    },
    {
      "id": "sri-rama-rajyam",
      "title": "Sri Rama Rajyam",
      "year": 2011,
      "director": "Bapu",
      "writer": "Mullapudi Venkata Ramana",
      "cinematographer": "P. R. K. Raju",
      "editor": "G. G. Krishna Rao",
      "composer": "Ilaiyaraaja",
      "studio": "Sri Sai Baba Movies",
      "focus": "Grand mythological set design, digital color grading, and traditional epic character framing.",
      "plot": "An epic adaptation of the Uttara Kanda of Ramayana, focusing on Lord Rama's exile of Goddess Sita and the birth of their sons Lava and Kusha.",
      "releaseDate": "November 17, 2011",
      "country": "India"
    }
  ],
  "K. Balachander (Telugu work)": [
    {
      "id": "maro-charitra",
      "title": "Maro Charitra",
      "year": 1978,
      "director": "K. Balachander",
      "writer": "K. Balachander",
      "cinematographer": "B. S. Lokanath",
      "editor": "N. R. Kittu",
      "composer": "M. S. Viswanathan",
      "studio": "Rama Arangannal Productions",
      "focus": "Cross-cultural romantic conflict staging, multilingual communication barriers, and tragic cliffside climax framing.",
      "plot": "A Telugu man and a Tamil woman fall in love but face intense opposition from their families, leading to a year-long separation agreement.",
      "releaseDate": "May 19, 1978",
      "country": "India"
    },
    {
      "id": "idi-katha-kaadu",
      "title": "Idi Katha Kaadu",
      "year": 1979,
      "director": "K. Balachander",
      "writer": "K. Balachander",
      "cinematographer": "B. S. Lokanath",
      "editor": "N. R. Kittu",
      "composer": "M. S. Viswanathan",
      "studio": "Kalakendra Movies",
      "focus": "Multi-perspective moral dilemma staging, female resilience narrative, and intense dialogue blocking.",
      "plot": "A woman struggles through multiple tragic events and betrayal by the men in her life, ultimately asserting her independence and strength.",
      "releaseDate": "September 14, 1979",
      "country": "India"
    },
    {
      "id": "guppedu-manasu",
      "title": "Guppedu Manasu",
      "year": 1979,
      "director": "K. Balachander",
      "writer": "K. Balachander",
      "cinematographer": "B. S. Lokanath",
      "editor": "N. R. Kittu",
      "composer": "M. S. Viswanathan",
      "studio": "Kalakendra Movies",
      "focus": "Psychological urban romance staging, complex character motivation, and modern lifestyle framing.",
      "plot": "A modern romance exploring trust, betrayal, and reconciliation between a young man and woman in an urban setting.",
      "releaseDate": "April 13, 1979",
      "country": "India"
    },
    {
      "id": "rudraveena",
      "title": "Rudraveena",
      "year": 1988,
      "director": "K. Balachander",
      "writer": "K. Balachander",
      "cinematographer": "R. Raghunatha Reddy",
      "editor": "Ganesh Kumar",
      "composer": "Ilaiyaraaja",
      "studio": "Anjana Productions",
      "focus": "Social reform musical staging, father-son ideological conflict, and rural class division framing.",
      "plot": "A young, idealistic musician clashes with his conservative, caste-conscious father, choosing to use music for social reform and rural upliftment.",
      "releaseDate": "March 4, 1988",
      "country": "India"
    },
    {
      "id": "duet",
      "title": "Duet",
      "year": 1994,
      "director": "K. Balachander",
      "writer": "K. Balachander",
      "cinematographer": "Raghunatha Reddy",
      "editor": "Suresh Urs",
      "composer": "A. R. Rahman",
      "studio": "Kavithalayaa Productions",
      "focus": "Saxophone musical motif integration, sibling rivalry romantic geometry, and contemporary city lighting.",
      "plot": "Two brothers, one of whom is a talented saxophonist, fall in love with the same woman, leading to personal and professional conflict.",
      "releaseDate": "May 20, 1994",
      "country": "India"
    }
  ],
  "Ram Gopal Varma (Telugu roots)": [
    {
      "id": "siva",
      "title": "Siva",
      "year": 1989,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "S. Gopala Reddy",
      "editor": "Murali-Rama",
      "composer": "Ilaiyaraaja",
      "studio": "Annapurna Studios",
      "focus": "Revolutionary college political violence, realistic sound design, and steadycam kinetic cinematography.",
      "plot": "A student enters a new college and stands up against a corrupt, politically-backed gang leader who terrorizes the campus.",
      "releaseDate": "October 5, 1989",
      "country": "India"
    },
    {
      "id": "kshana-kshanam",
      "title": "Kshana Kshanam",
      "year": 1991,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "S. Gopala Reddy",
      "editor": "Shankar",
      "composer": "M. M. Keeravani",
      "studio": "Durga Arts",
      "focus": "Kinetic road-movie comedy, fast-paced dialogue blocking, and off-beat thriller geometry.",
      "plot": "An innocent woman and a small-time thief go on the run from both the police and a gang of eccentric bank robbers.",
      "releaseDate": "October 9, 1991",
      "country": "India"
    },
    {
      "id": "gaayam",
      "title": "Gaayam",
      "year": 1993,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "Rasool Ellore",
      "editor": "Shankar",
      "composer": "Sri",
      "studio": "Kinnera Art Creations",
      "focus": "Urban godfather-style mafia staging, low-key lighting shadow geometry, and political revenge narrative.",
      "plot": "A young man seeks revenge against a corrupt politician who killed his brother, getting sucked into the violent underworld of Hyderabad.",
      "releaseDate": "September 24, 1993",
      "country": "India"
    },
    {
      "id": "govinda-govinda",
      "title": "Govinda Govinda",
      "year": 1994,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "Rasool Ellore",
      "editor": "Shankar",
      "composer": "Raj-Koti",
      "studio": "Sri Surya Movies",
      "focus": "Supernatural thriller heist staging, temple location photography, and fast-paced comedy tracking.",
      "plot": "A group of thieves steal the sacred crown of Lord Venkateswara from Tirupati, and an innocent man gets caught in the chase to retrieve it.",
      "releaseDate": "January 21, 1994",
      "country": "India"
    },
    {
      "id": "anaganaga-oka-roju",
      "title": "Anaganaga Oka Roju",
      "year": 1997,
      "director": "Ram Gopal Varma",
      "writer": "Ram Gopal Varma",
      "cinematographer": "Chota K. Naidu",
      "editor": "Bhanodaya",
      "composer": "Sri",
      "studio": "Varma Corporation",
      "focus": "Satirical crime-road-trip comedy, eccentric side-character staging, and continuous chase tracking.",
      "plot": "A runaway couple is falsely accused of murdering a politician, leading to a frantic chase involving the police, gangsters, and a bumbling detective.",
      "releaseDate": "January 3, 1997",
      "country": "India"
    }
  ],
  "Sekhar Kammula": [
    {
      "id": "anand-kammula",
      "title": "Anand",
      "year": 2004,
      "director": "Sekhar Kammula",
      "writer": "Sekhar Kammula",
      "cinematographer": "C. Vijay Kumar",
      "editor": "Sekhar Kammula",
      "composer": "K. M. Radha Krishnan",
      "studio": "Amigos Creations",
      "focus": "Subtle urban romantic realism, warm color palette staging, and independent female protagonist framing.",
      "plot": "An independent young woman who loses her family in a tragedy rebuilds her life, finding love with a wealthy man who is secretly connected to her past.",
      "releaseDate": "October 15, 2004",
      "country": "India"
    },
    {
      "id": "godavari",
      "title": "Godavari",
      "year": 2006,
      "director": "Sekhar Kammula",
      "writer": "Sekhar Kammula",
      "cinematographer": "C. Vijay Kumar",
      "editor": "Marthand K. Venkatesh",
      "composer": "K. M. Radha Krishnan",
      "studio": "Amigos Creations",
      "focus": "River cruise scenic location framing, classical Telugu literature character references, and melodic score integration.",
      "plot": "A group of passengers on a scenic boat ride along the Godavari River navigate their personal relationships, aspirations, and romance.",
      "releaseDate": "May 19, 2006",
      "country": "India"
    },
    {
      "id": "happy-days",
      "title": "Happy Days",
      "year": 2007,
      "director": "Sekhar Kammula",
      "writer": "Sekhar Kammula",
      "cinematographer": "C. Vijay Kumar",
      "editor": "Marthand K. Venkatesh",
      "composer": "Mickey J. Meyer",
      "studio": "Amigos Creations",
      "focus": "Engineering college nostalgia staging, ensemble youth geometry, and contemporary lighthearted pacing.",
      "plot": "Eight engineering students form a close bond during their college years, navigating friendship, love, academic pressure, and career choices.",
      "releaseDate": "October 2, 2007",
      "country": "India"
    },
    {
      "id": "leader",
      "title": "Leader",
      "year": 2010,
      "director": "Sekhar Kammula",
      "writer": "Sekhar Kammula",
      "cinematographer": "Shamdat Sainudeen",
      "editor": "Marthand K. Venkatesh",
      "composer": "Mickey J. Meyer",
      "studio": "AVM Productions",
      "focus": "Idealistic political reform staging, legislative chamber geometry, and family dynasty power conflict.",
      "plot": "The son of an assassinated Chief Minister attempts to cleanse the political system of corruption, taking his father's post while facing intense opposition.",
      "releaseDate": "February 19, 2010",
      "country": "India"
    },
    {
      "id": "fidaa",
      "title": "Fidaa",
      "year": 2017,
      "director": "Sekhar Kammula",
      "writer": "Sekhar Kammula",
      "cinematographer": "Vijay C. Kumar",
      "editor": "Marthand K. Venkatesh",
      "composer": "Shakthikanth Karthick",
      "studio": "Sri Venkateswara Creations",
      "focus": "Cross-cultural regional contrast staging, vibrant rural festival color palettes, and strong female lead framing.",
      "plot": "A headstrong village girl from Telangana falls in love with an NRI doctor, navigating the emotional complexities of long-distance love and home.",
      "releaseDate": "July 21, 2017",
      "country": "India"
    }
  ],
  "Trivikram Srinivas": [
    {
      "id": "athadu",
      "title": "Athadu",
      "year": 2005,
      "director": "Trivikram Srinivas",
      "writer": "Trivikram Srinivas",
      "cinematographer": "K. V. Guhan",
      "editor": "Sreekar Prasad",
      "composer": "Mani Sharma",
      "studio": "Jayabheri Art Productions",
      "focus": "High-precision action bullet-time choreography, rural household ensemble staging, and quiet protagonist geometry.",
      "plot": "A professional assassin is framed for murder and takes refuge in a remote village by posing as a long-lost grandson of a wealthy family.",
      "releaseDate": "August 10, 2005",
      "country": "India"
    },
    {
      "id": "jalsa",
      "title": "Jalsa",
      "year": 2008,
      "director": "Trivikram Srinivas",
      "writer": "Trivikram Srinivas",
      "cinematographer": "Rasool Ellore",
      "editor": "Sreekar Prasad",
      "composer": "Devi Sri Prasad",
      "studio": "Geetha Arts",
      "focus": "High-energy satirical comedy staging, Naxalite backstory visual framing, and Devi Sri Prasad's kinetic soundtrack.",
      "plot": "An aimless youth who once joined a Naxalite movement returns to normal society, fighting a greedy land grabber to protect his love.",
      "releaseDate": "April 2, 2008",
      "country": "India"
    },
    {
      "id": "khaleja",
      "title": "Khaleja",
      "year": 2010,
      "director": "Trivikram Srinivas",
      "writer": "Trivikram Srinivas",
      "cinematographer": "Yash Bhatt",
      "editor": "Sreekar Prasad",
      "composer": "Mani Sharma",
      "studio": "Sri Kanakaratna Movies",
      "focus": "Satirical messiah-narrative comedy, arid desert location framing, and rapid-fire dialogue pacing.",
      "plot": "A cynical taxi driver travels to a remote village plagued by a mysterious illness, finding himself hailed as a divine savior by the superstitious locals.",
      "releaseDate": "October 7, 2010",
      "country": "India"
    },
    {
      "id": "attarintiki-daredi",
      "title": "Attarintiki Daredi",
      "year": 2013,
      "director": "Trivikram Srinivas",
      "writer": "Trivikram Srinivas",
      "cinematographer": "Prasad Murella",
      "editor": "Prawin Pudi",
      "composer": "Devi Sri Prasad",
      "studio": "Sri Venkateswara Cine Chitra",
      "focus": "Family reconciliation emotional staging, opulent mansion set design, and superstar dialogue blocking.",
      "plot": "A wealthy young heir enters his estranged aunt's household under a fake identity to reconcile her with his grandfather.",
      "releaseDate": "September 27, 2013",
      "country": "India"
    },
    {
      "id": "ala-vaikunthapurramuloo",
      "title": "Ala Vaikunthapurramuloo",
      "year": 2020,
      "director": "Trivikram Srinivas",
      "writer": "Trivikram Srinivas",
      "cinematographer": "P. S. Vinod",
      "editor": "Navin Nooli",
      "composer": "Thaman S.",
      "studio": "Haarika & Hassine Creations / Geetha Arts",
      "focus": "Stylized commercial dance choreography, class-contrast spatial geometry, and Thaman S.'s chart-buster musical score.",
      "plot": "A young man swaps places with a wealthy heir at birth due to a bitter employee's actions, growing up to discover his true heritage.",
      "releaseDate": "January 12, 2020",
      "country": "India"
    }
  ],
  "Krish Jagarlamudi": [
    {
      "id": "gamyam",
      "title": "Gamyam",
      "year": 2008,
      "director": "Krish Jagarlamudi",
      "writer": "Krish Jagarlamudi",
      "cinematographer": "Hari Anumolu",
      "editor": "Shravan Katikaneni",
      "composer": "E. S. Murthy / Anil R.",
      "studio": "First Frame Entertainments",
      "focus": "Philosophical road-trip character staging, rural class inequality critique, and neorealist location framing.",
      "plot": "A wealthy, arrogant man travels across Andhra Pradesh to search for his lost love, accompanied by a street-smart motorcycle thief who changes his perspective on life.",
      "releaseDate": "February 29, 2008",
      "country": "India"
    },
    {
      "id": "vedam",
      "title": "Vedam",
      "year": 2010,
      "director": "Krish Jagarlamudi",
      "writer": "Krish Jagarlamudi",
      "cinematographer": "Gnana Shekar V. S.",
      "editor": "Shravan Katikaneni",
      "composer": "M. M. Keeravani",
      "studio": "Arka Media Works",
      "focus": "Multi-strand hyperlink narrative geometry, communal crisis staging, and Keeravani's dramatic score integration.",
      "plot": "Five individuals from different social strata cross paths at a hospital during a terrorist attack, testing their courage and humanity.",
      "releaseDate": "June 4, 2010",
      "country": "India"
    },
    {
      "id": "kanche",
      "title": "Kanche",
      "year": 2015,
      "director": "Krish Jagarlamudi",
      "writer": "Krish Jagarlamudi",
      "cinematographer": "Gnana Shekar V. S.",
      "editor": "Suraj Jagtap",
      "composer": "Chirantan Bhatt",
      "studio": "First Frame Entertainments",
      "focus": "World War II combat battle staging, caste division spatial contrasts, and period-accurate costuming.",
      "plot": "An Indian soldier fighting in Europe during WWII recalls his tragic love story with a higher-caste woman in pre-independence India.",
      "releaseDate": "October 22, 2015",
      "country": "India"
    },
    {
      "id": "gautamiputra-satakarni",
      "title": "Gautamiputra Satakarni",
      "year": 2017,
      "director": "Krish Jagarlamudi",
      "writer": "Krish Jagarlamudi",
      "cinematographer": "Gnana Shekar V. S.",
      "editor": "Suraj Jagtap",
      "composer": "Chirantan Bhatt",
      "studio": "First Frame Entertainments",
      "focus": "Ancient historical combat scale staging, royal court politics, and high-contrast digital warfare.",
      "plot": "The legendary Satavahana ruler Gautamiputra Satakarni fights to unite the fractured kingdoms of ancient India under one rule.",
      "releaseDate": "January 12, 2017",
      "country": "India"
    }
  ],
  "S. S. Rajamouli": [
    {
      "id": "chatrapathi",
      "title": "Chatrapathi",
      "year": 2005,
      "director": "S. S. Rajamouli",
      "writer": "K. V. Vijayendra Prasad",
      "cinematographer": "Senthil Kumar",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "M. M. Keeravani",
      "studio": "Sri Venkateswara Cine Chitra",
      "focus": "Port-town refugee labor exploitation staging, high-octane physical combat choreography, and dramatic family emotional close-ups.",
      "plot": "A displaced refugee from Sri Lanka stands up to a local mafia leader in Vizag, becoming a savior to the oppressed community while searching for his mother.",
      "releaseDate": "September 29, 2005",
      "country": "India"
    },
    {
      "id": "magadheera",
      "title": "Magadheera",
      "year": 2009,
      "director": "S. S. Rajamouli",
      "writer": "K. V. Vijayendra Prasad",
      "cinematographer": "Senthil Kumar",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "M. M. Keeravani",
      "studio": "Geetha Arts",
      "focus": "400-year reincarnation fantasy scale staging, CGI combat chariot racing, and epic structural symmetry.",
      "plot": "A motor stunt rider recalls his past life as a warrior chief in the 17th century, battling a reincarnated rival to win the love of a princess.",
      "releaseDate": "July 31, 2009",
      "country": "India"
    },
    {
      "id": "eega",
      "title": "Eega",
      "year": 2012,
      "director": "S. S. Rajamouli",
      "writer": "S. S. Rajamouli",
      "cinematographer": "Senthil Kumar",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "M. M. Keeravani",
      "studio": "Varahi Chalana Chitram",
      "focus": "High-concept macro CGI animation, household object survival geometry, and creative kinetic comedy.",
      "plot": "A young man is murdered by a ruthless businessman and reincarnated as a common housefly, seeking revenge and protecting his lover.",
      "releaseDate": "July 6, 2012",
      "country": "India"
    },
    {
      "id": "baahubali-the-beginning",
      "title": "Baahubali: The Beginning",
      "year": 2015,
      "director": "S. S. Rajamouli",
      "writer": "K. V. Vijayendra Prasad",
      "cinematographer": "Senthil Kumar",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "M. M. Keeravani",
      "studio": "Arka Media Works",
      "focus": "Monolithic waterfalls and kingdom visual scale, epic ancient war choreography, and mythological narrative staging.",
      "plot": "A young man raised in a tribal village climbs a giant waterfall to discover his true royal lineage in the majestic kingdom of Mahishmati.",
      "releaseDate": "July 10, 2015",
      "country": "India"
    },
    {
      "id": "rrr",
      "title": "RRR",
      "year": 2022,
      "director": "S. S. Rajamouli",
      "writer": "K. V. Vijayendra Prasad",
      "cinematographer": "Senthil Kumar",
      "editor": "A. Sreekar Prasad",
      "composer": "M. M. Keeravani",
      "studio": "DVV Entertainments",
      "focus": "Kinetic action physics-defying choreography, high-speed fire-water-contrast visual design, and 'Naatu Naatu' dance blocking.",
      "plot": "A fictional story of friendship and patriotism between two legendary Indian revolutionaries fighting against the British Raj in 1920.",
      "releaseDate": "March 25, 2022",
      "country": "India"
    }
  ],
  "Sukumar": [
    {
      "id": "arya",
      "title": "Arya",
      "year": 2004,
      "director": "Sukumar",
      "writer": "Sukumar",
      "cinematographer": "R. Rathnavelu",
      "editor": "Marthand K. Venkatesh",
      "composer": "Devi Sri Prasad",
      "studio": "Sri Venkateswara Creations",
      "focus": "One-sided romantic triangle staging, stylized collegiate color palettes, and Devi Sri Prasad's high-energy youth soundtrack.",
      "plot": "A young college student falls in love with a girl who is dating a wealthy bully, choosing to express his love without expecting reciprocity.",
      "releaseDate": "May 7, 2004",
      "country": "India"
    },
    {
      "id": "1-nenokkadine",
      "title": "1: Nenokkadine",
      "year": 2014,
      "director": "Sukumar",
      "writer": "Sukumar",
      "cinematographer": "R. Rathnavelu",
      "editor": "Karthika Srinivas",
      "composer": "Devi Sri Prasad",
      "studio": "14 Reels Entertainment",
      "focus": "Psychological thriller memory distortion staging, sleek European location cinematography, and techno-synth tracking.",
      "plot": "A famous rock star suffering from schizophrenia searches for the killers of his parents, struggling to distinguish reality from hallucination.",
      "releaseDate": "January 10, 2014",
      "country": "India"
    },
    {
      "id": "rangasthalam",
      "title": "Rangasthalam",
      "year": 2018,
      "director": "Sukumar",
      "writer": "Sukumar",
      "cinematographer": "R. Rathnavelu",
      "editor": "Navin Nooli",
      "composer": "Devi Sri Prasad",
      "studio": "Mythri Movie Makers",
      "focus": "1980s rural delta location realism, hearing-impaired protagonist sensory framing, and political corruption tragedy.",
      "plot": "A deaf young mechanic in a rural village attempts to protect his brother who is running for village president against a tyrannical, long-ruling landlord.",
      "releaseDate": "March 30, 2018",
      "country": "India"
    },
    {
      "id": "pushpa-the-rise",
      "title": "Pushpa: The Rise",
      "year": 2021,
      "director": "Sukumar",
      "writer": "Sukumar",
      "cinematographer": "Mirosław Kuba Brożek",
      "editor": "Karthika Srinivas / Ruben",
      "composer": "Devi Sri Prasad",
      "studio": "Mythri Movie Makers / Muttamsetty Media",
      "focus": "Forest red-sandalwood smuggling tracking, low-caste protagonist ambition staging, and raw digital color grading.",
      "plot": "A low-wage laborer rises through the ranks of a red sandalwood smuggling syndicate, making enemies of police officers and rival gangsters.",
      "releaseDate": "December 17, 2021",
      "country": "India"
    },
    {
      "id": "pushpa-2-the-rule",
      "title": "Pushpa 2: The Rule",
      "year": 2024,
      "director": "Sukumar",
      "writer": "Sukumar",
      "cinematographer": "Mirosław Kuba Brożek",
      "editor": "Navin Nooli",
      "composer": "Devi Sri Prasad",
      "studio": "Mythri Movie Makers / Sukumar Writings",
      "focus": "Smuggling empire expansion visual scale, high-tension legal and tribal power struggles, and dramatic close-up choreography.",
      "plot": "The continuation of Pushpa Raj's reign over the red sandalwood empire, defending his territory against international syndicates and a vengeful police officer.",
      "releaseDate": "December 5, 2024",
      "country": "India"
    }
  ],
  "Nag Ashwin": [
    {
      "id": "yevade-subramanyam",
      "title": "Yevade Subramanyam",
      "year": 2015,
      "director": "Nag Ashwin",
      "writer": "Nag Ashwin",
      "cinematographer": "Rakesh E उद्योग (Rakesh Bhilare)",
      "editor": "Shravan Katikaneni",
      "composer": "Radhan",
      "studio": "Swapna Cinema",
      "focus": "Corporate-to-Himalayan spatial contrast staging, spiritual self-discovery journey framing, and acoustic score.",
      "plot": "A highly ambitious, materialistic corporate worker travels to the sacred lake of Dudh Kosi in the Himalayas to fulfill his late friend's last wish.",
      "releaseDate": "March 21, 2015",
      "country": "India"
    },
    {
      "id": "mahanati",
      "title": "Mahanati",
      "year": 2018,
      "director": "Nag Ashwin",
      "writer": "Nag Ashwin",
      "cinematographer": "Dani Sanchez-Lopez",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "Mickey J. Meyer",
      "studio": "Vyjayanthi Movies / Swapna Cinema",
      "focus": "Mid-century movie-industry period staging, actress-biography shifting color palettes, and emotional performance close-ups.",
      "plot": "The tragic, biographical life story of Savitri, one of South Indian cinema's greatest actresses, tracing her rise to stardom and subsequent downfall.",
      "releaseDate": "May 9, 2018",
      "country": "India"
    },
    {
      "id": "kalki-2898-ad",
      "title": "Kalki 2898 AD",
      "year": 2024,
      "director": "Nag Ashwin",
      "writer": "Nag Ashwin",
      "cinematographer": "Djordje Stojiljkovic",
      "editor": "Kotagiri Venkateswara Rao",
      "composer": "Santhosh Narayanan",
      "studio": "Vyjayanthi Movies",
      "focus": "Futuristic dystopian sci-fi cyberpunk set design, mythological Mahabharata integration, and grand CGI battle scale.",
      "plot": "In a post-apocalyptic world of Kasi, a modern-day bounty hunter and a legendary immortal warrior collide over the birth of a divine child who will save the world.",
      "releaseDate": "June 27, 2024",
      "country": "India"
    }
  ],
  "Vivek Athreya": [
    {
      "id": "mental-madhilo",
      "title": "Mental Madhilo",
      "year": 2017,
      "director": "Vivek Athreya",
      "writer": "Vivek Athreya",
      "cinematographer": "Veda Raman Sankaran",
      "editor": "Viplav Nyshadham",
      "composer": "Prashanth R. Vihari",
      "studio": "Dharmapatha Creations",
      "focus": "Indecisive character psychological framing, modern romance domestic staging, and warm acoustic score.",
      "plot": "A highly confused, indecisive young man struggles to choose between two women, navigating the emotional complications of arranged marriage and love.",
      "releaseDate": "November 24, 2017",
      "country": "India"
    },
    {
      "id": "brochevarevarura",
      "title": "Brochevarevarura",
      "year": 2019,
      "director": "Vivek Athreya",
      "writer": "Vivek Athreya",
      "cinematographer": "Sai Sriram",
      "editor": "Viplav Nyshadham",
      "composer": "Vivek Sagar",
      "studio": "Manyam Productions",
      "focus": "Multi-strand comic heist geometry, satirical film-industry meta-commentary, and rapid-fire dialogue pacing.",
      "plot": "Three lazy college friends attempt to execute a fake kidnapping scheme to help their friend, which goes hilariously wrong when a real gang intervenes.",
      "releaseDate": "June 28, 2019",
      "country": "India"
    },
    {
      "id": "ante-sundaraniki",
      "title": "Ante Sundaraniki!",
      "year": 2022,
      "director": "Vivek Athreya",
      "writer": "Vivek Athreya",
      "cinematographer": "Niketh Bommi",
      "editor": "Viplav Nyshadham",
      "composer": "Vivek Sagar",
      "studio": "Mythri Movie Makers",
      "focus": "Inter-religious domestic conflict satire, split-screen childhood memories framing, and complex lie-web dialoguing.",
      "plot": "A conservative Hindu man and a Christian woman cook up a web of elaborate lies about their medical conditions to convince their families to allow them to marry.",
      "releaseDate": "June 10, 2022",
      "country": "India"
    },
    {
      "id": "saripodhaa-sanivaaram",
      "title": "Saripodhaa Sanivaaram",
      "year": 2024,
      "director": "Vivek Athreya",
      "writer": "Vivek Athreya",
      "cinematographer": "Murali G.",
      "editor": "Karthika Srinivas",
      "composer": "Jakes Bejoy",
      "studio": "DVV Entertainments",
      "focus": "Vigilante anger-management calendar staging, vigilante-cop cat-and-mouse geometry, and Jakes Bejoy's industrial heavy score.",
      "plot": "A young man who controls his anger by only letting it out on Saturdays goes head-to-head with a tyrannical, corrupt police officer who terrorizes a local neighborhood.",
      "releaseDate": "August 29, 2024",
      "country": "India"
    }
  ],
  "Deva Katta": [
    {
      "id": "vennela",
      "title": "Vennela",
      "year": 2005,
      "director": "Deva Katta",
      "writer": "Deva Katta",
      "cinematographer": "Suresh Kumar",
      "editor": "Christopher Eldridge",
      "composer": "Mahesh Shankar",
      "studio": "Fourth Dimension Company",
      "focus": "NRI student life location staging, dark psychological obsession framing, and campus comedy tracking.",
      "plot": "A young woman travels to the US for her studies, finding herself pursued by her obsessive ex-fiancé who goes to dangerous lengths to win her back.",
      "releaseDate": "November 25, 2005",
      "country": "India"
    },
    {
      "id": "prasthanam",
      "title": "Prasthanam",
      "year": 2010,
      "director": "Deva Katta",
      "writer": "Deva Katta",
      "cinematographer": "Shamdat Sainudeen",
      "editor": "Dharmendra Kakarala",
      "composer": "Mahesh Shankar",
      "studio": "VRC Media & Entertainment",
      "focus": "Shakespearean political family tragedy staging, intense moral conflict close-ups, and razor-sharp dramatic dialoguing.",
      "plot": "A stepson and a biological son clash over their political inheritance, tearing their powerful politician father's family apart through greed and jealousy.",
      "releaseDate": "April 16, 2010",
      "country": "India"
    },
    {
      "id": "autonagar-surya",
      "title": "Autonagar Surya",
      "year": 2014,
      "director": "Deva Katta",
      "writer": "Deva Katta",
      "cinematographer": "Srikanth Naroj",
      "editor": "Gautham Raju",
      "composer": "Anup Rubens",
      "studio": "Max India Productions",
      "focus": "Industrial labor union unionization staging, mechanic shop location framing, and political gangster conflict.",
      "plot": "An orphan mechanic stands up against the corrupt unions and mafia lords who control the industrial area of Autonagar, fighting for workers' rights.",
      "releaseDate": "June 27, 2014",
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

  // Update Telugu directors' movies and download posters
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
      // Fix IDs for duplicate names like "Anand"
      const posterId = movie.id === 'anand-kammula' ? 'anand' : movie.id;
      const filename = `${posterId}.jpg`;
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

      // Cleanup ID to match standards if needed (but keep unique ids in mustWatch so we don't have HTML id collisions)
      updatedMustWatch.push(movie);
    }

    directorObj.mustWatch = updatedMustWatch;
  }

  // Write updated database back to temp_data.js
  const output = `const FILMS_DATA = ${JSON.stringify(filmsData, null, 4)};\n\nmodule.exports = FILMS_DATA;\n`;
  fs.writeFileSync(dbPath, output, 'utf8');
  console.log('Successfully updated temp_data.js with Telugu films!');
}

run();
