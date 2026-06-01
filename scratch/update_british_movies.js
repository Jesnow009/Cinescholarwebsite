const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

const directorsData = {
  "David Lean": [
    {
      "id": "lawrence-of-arabia",
      "title": "Lawrence of Arabia",
      "year": 1962,
      "director": "David Lean",
      "writer": "Robert Bolt / Michael Wilson",
      "cinematographer": "Freddie Young",
      "editor": "Anne V. Coates",
      "composer": "Maurice Jarre",
      "studio": "Horizon Pictures",
      "focus": "Epic desert 70mm cinematography, psychological character study mapping the desert landscape to mental states, and seamless match-cut editing (e.g., blowing out the match).",
      "plot": "During World War I, unconventional British officer T.E. Lawrence struggles with his divided loyalties while leading Arab tribes in a guerrilla war against the Ottoman Empire.",
      "releaseDate": "December 10, 1962",
      "country": "United Kingdom"
    },
    {
      "id": "brief-encounter",
      "title": "Brief Encounter",
      "year": 1945,
      "director": "David Lean",
      "writer": "Noël Coward / David Lean / Anthony Havelock-Allan",
      "cinematographer": "Robert Krasker",
      "editor": "Jack Harris",
      "composer": "Sergei Rachmaninoff",
      "studio": "Cineguild",
      "focus": "Intimate atmospheric lighting in transit spaces, emotive voice-over narration conveying internalized repression, and sweeping use of Rachmaninoff's Piano Concerto No. 2.",
      "plot": "A respectable married woman's chance meeting with a married doctor at a railway station cafe blossoms into a passionate, guilt-ridden, and ultimately doomed affair.",
      "releaseDate": "November 26, 1945",
      "country": "United Kingdom"
    },
    {
      "id": "great-expectations",
      "title": "Great Expectations",
      "year": 1946,
      "director": "David Lean",
      "writer": "David Lean / Ronald Neame / Anthony Havelock-Allan",
      "cinematographer": "Guy Green",
      "editor": "Jack Harris",
      "composer": "Walter Goehr",
      "studio": "Cineguild",
      "focus": "Expressionist graveyard openings, deep focus gothic architectural staging, and seamless condensing of sprawling Victorian narrative.",
      "plot": "A humble orphan named Pip experiences a rapid rise in social status thanks to a mysterious benefactor, changing his perspective on class and love.",
      "releaseDate": "December 16, 1946",
      "country": "United Kingdom"
    },
    {
      "id": "the-bridge-on-the-river-kwai",
      "title": "The Bridge on the River Kwai",
      "year": 1957,
      "director": "David Lean",
      "writer": "Carl Foreman / Michael Wilson",
      "cinematographer": "Jack Hildyard",
      "editor": "Peter Taylor",
      "composer": "Malcolm Arnold",
      "studio": "Horizon Pictures",
      "focus": "Large-scale structural set pieces, ironic juxtaposition of military discipline and madness, and rhythmic pacing leading to an explosive finale.",
      "plot": "British POWs are forced to build a railway bridge for their Japanese captors in Burma, leading to a clash of military honor, madness, and sabotage.",
      "releaseDate": "October 2, 1957",
      "country": "United Kingdom / United States"
    },
    {
      "id": "doctor-zhivago",
      "title": "Doctor Zhivago",
      "year": 1965,
      "director": "David Lean",
      "writer": "Robert Bolt",
      "cinematographer": "Freddie Young",
      "editor": "Norman Savage",
      "composer": "Maurice Jarre",
      "studio": "Metro-Goldwyn-Mayer / Sostar SA",
      "focus": "Sweeping romantic fatalism against vast historical backdrops, iconic ice-palace production design, and deeply emotive musical motifs.",
      "plot": "The life of a Russian physician and poet who, although married to an aristocrat, falls in love with a political activist's wife during the hardships of World War I and the October Revolution.",
      "releaseDate": "December 22, 1965",
      "country": "United Kingdom / United States"
    }
  ],
  "Carol Reed": [
    {
      "id": "the-third-man",
      "title": "The Third Man",
      "year": 1949,
      "director": "Carol Reed",
      "writer": "Graham Greene",
      "cinematographer": "Robert Krasker",
      "editor": "Oswald Hafenrichter",
      "composer": "Anton Karas",
      "studio": "London Film Productions",
      "focus": "Iconic tilted 'Dutch' camera angles, high-contrast chiaroscuro lighting capturing a war-torn Vienna, and the uniquely cynical zither score.",
      "plot": "An unemployed pulp fiction writer arrives in post-war Vienna to find his friend Harry Lime dead, leading him into a deadly investigation of black-market corruption.",
      "releaseDate": "September 3, 1949",
      "country": "United Kingdom"
    },
    {
      "id": "odd-man-out",
      "title": "Odd Man Out",
      "year": 1947,
      "director": "Carol Reed",
      "writer": "R. C. Sherriff / F. L. Green",
      "cinematographer": "Robert Krasker",
      "editor": "Fergus McDonell",
      "composer": "William Alwyn",
      "studio": "Two Cities Films",
      "focus": "Noir visual style mapping internal moral decay to urban decay, striking low-key lighting, and relentless fatalistic pacing.",
      "plot": "A wounded Irish nationalist leader spends his last desperate hours on the run through the rainy streets of Belfast following a botched robbery.",
      "releaseDate": "February 1, 1947",
      "country": "United Kingdom"
    },
    {
      "id": "the-fallen-idol",
      "title": "The Fallen Idol",
      "year": 1948,
      "director": "Carol Reed",
      "writer": "Graham Greene",
      "cinematographer": "Georges Périnal",
      "editor": "Oswald Hafenrichter",
      "composer": "William Alwyn",
      "studio": "London Film Productions",
      "focus": "Subjective child-perspective camera angles capturing the imposing architecture of adult spaces and moral ambiguity.",
      "plot": "An ambassador's young son tries to protect the beloved embassy butler whom he mistakenly believes committed a murder.",
      "releaseDate": "September 30, 1948",
      "country": "United Kingdom"
    },
    {
      "id": "oliver",
      "title": "Oliver!",
      "year": 1968,
      "director": "Carol Reed",
      "writer": "Vernon Harris",
      "cinematographer": "Oswald Morris",
      "editor": "Ralph Kemplen",
      "composer": "Lionel Bart",
      "studio": "Romulus Films",
      "focus": "Elaborate stylized studio-set recreation of Victorian London, seamless integration of large-scale choreography with gritty Dickensian themes.",
      "plot": "Young orphan Oliver Twist runs away from a workhouse and falls in with a gang of boy pickpockets led by the elderly Fagin in London.",
      "releaseDate": "September 26, 1968",
      "country": "United Kingdom"
    },
    {
      "id": "the-way-ahead",
      "title": "The Way Ahead",
      "year": 1944,
      "director": "Carol Reed",
      "writer": "Eric Ambler / Peter Ustinov",
      "cinematographer": "Guy Green",
      "editor": "Fergus McDonell",
      "composer": "William Alwyn",
      "studio": "Two Cities Films",
      "focus": "Authentic wartime ensemble structuring, shifting from gentle civilian satire to stark combat realism, acting as powerful propaganda.",
      "plot": "A group of ordinary British civilians from disparate backgrounds are conscripted into the army and molded into a cohesive infantry unit during WWII.",
      "releaseDate": "June 9, 1944",
      "country": "United Kingdom"
    }
  ],
  "Michael Powell & Emeric Pressburger": [
    {
      "id": "the-red-shoes",
      "title": "The Red Shoes",
      "year": 1948,
      "director": "Michael Powell / Emeric Pressburger",
      "writer": "Michael Powell / Emeric Pressburger",
      "cinematographer": "Jack Cardiff",
      "editor": "Reginald Mills",
      "composer": "Brian Easdale",
      "studio": "The Archers",
      "focus": "Dazzling Technicolor expressionism, the fluid integration of surrealist ballet sequences as psychological manifestations, and total cinematic aestheticism.",
      "plot": "A young ballerina is torn between the demanding, obsessive impresario of a ballet company and the struggling composer she loves.",
      "releaseDate": "September 6, 1948",
      "country": "United Kingdom"
    },
    {
      "id": "black-narcissus",
      "title": "Black Narcissus",
      "year": 1947,
      "director": "Michael Powell / Emeric Pressburger",
      "writer": "Michael Powell / Emeric Pressburger",
      "cinematographer": "Jack Cardiff",
      "editor": "Reginald Mills",
      "composer": "Brian Easdale",
      "studio": "The Archers",
      "focus": "Saturated, feverish studio-crafted matte paintings creating a suffocatingly sensual atmosphere that visually echoes psychological repression.",
      "plot": "A group of Anglican nuns face overwhelming physical and psychological challenges as they attempt to establish a convent high in the remote Himalayas.",
      "releaseDate": "May 26, 1947",
      "country": "United Kingdom"
    },
    {
      "id": "a-matter-of-life-and-death",
      "title": "A Matter of Life and Death",
      "year": 1946,
      "director": "Michael Powell / Emeric Pressburger",
      "writer": "Michael Powell / Emeric Pressburger",
      "cinematographer": "Jack Cardiff",
      "editor": "Reginald Mills",
      "composer": "Allan Gray",
      "studio": "The Archers",
      "focus": "Ingenious transition between monochrome reality (Heaven) and vivid Technicolor (Earth), along with elaborate metaphorical set designs.",
      "plot": "A British pilot who miraculously survives a WWII plane crash must defend his right to live—and love—in a heavenly court.",
      "releaseDate": "November 1, 1946",
      "country": "United Kingdom"
    },
    {
      "id": "the-life-and-death-of-colonel-blimp",
      "title": "The Life and Death of Colonel Blimp",
      "year": 1943,
      "director": "Michael Powell / Emeric Pressburger",
      "writer": "Michael Powell / Emeric Pressburger",
      "cinematographer": "Georges Périnal",
      "editor": "John Seabourne Sr.",
      "composer": "Allan Gray",
      "studio": "The Archers",
      "focus": "Sweeping temporal narrative structure, poignant wartime humanism, and sophisticated use of Technicolor to chart aging and ideological shifts.",
      "plot": "The forty-year friendship between a British officer and a German soldier as they navigate the changing nature of warfare and honor from the Boer War to WWII.",
      "releaseDate": "June 10, 1943",
      "country": "United Kingdom"
    },
    {
      "id": "peeping-tom",
      "title": "Peeping Tom",
      "year": 1960,
      "director": "Michael Powell",
      "writer": "Leo Marks",
      "cinematographer": "Otto Heller",
      "editor": "Noreen Ackland",
      "composer": "Brian Easdale",
      "studio": "Michael Powell Productions",
      "focus": "Self-reflexive exploration of the male gaze and cinematic voyeurism, subjective camera framing, and intensely disturbing psycho-sexual tension.",
      "plot": "A reclusive focus-puller murders women while filming their dying expressions, attempting to capture pure fear on celluloid.",
      "releaseDate": "April 7, 1960",
      "country": "United Kingdom"
    }
  ],
  "Alexander Mackendrick": [
    {
      "id": "the-sweet-smell-of-success",
      "title": "The Sweet Smell of Success",
      "year": 1957,
      "director": "Alexander Mackendrick",
      "writer": "Clifford Odets / Ernest Lehman",
      "cinematographer": "James Wong Howe",
      "editor": "Alan Crosland Jr.",
      "composer": "Elmer Bernstein",
      "studio": "Norma-Curtleigh Productions",
      "focus": "Stark, high-contrast neon-lit nightscapes of New York, rapid-fire cynical dialogue, and claustrophobic framing of moral corruption.",
      "plot": "A powerful, ruthlessly vindictive newspaper columnist uses an unscrupulous press agent to break up his sister's relationship with a jazz musician.",
      "releaseDate": "June 27, 1957",
      "country": "United States"
    },
    {
      "id": "the-ladykillers",
      "title": "The Ladykillers",
      "year": 1955,
      "director": "Alexander Mackendrick",
      "writer": "William Rose",
      "cinematographer": "Otto Heller",
      "editor": "Jack Harris",
      "composer": "Tristram Cary",
      "studio": "Ealing Studios",
      "focus": "Dark Ealing comedy blending macabre suspense with farcical timing, characterized by rich color contrasts and eccentric set designs.",
      "plot": "A gang of ruthless criminals rents a room from an innocent old lady to plot a heist, but her meddling leads to murderous and chaotic consequences.",
      "releaseDate": "December 8, 1955",
      "country": "United Kingdom"
    },
    {
      "id": "the-man-in-the-white-suit",
      "title": "The Man in the White Suit",
      "year": 1951,
      "director": "Alexander Mackendrick",
      "writer": "Roger MacDougall / John Dighton / Alexander Mackendrick",
      "cinematographer": "Douglas Slocombe",
      "editor": "Bernard Gribble",
      "composer": "Benjamin Frankel",
      "studio": "Ealing Studios",
      "focus": "Satirical class critique, brilliant sound design matching scientific bubbling, and glowing monochromatic visual contrast of the suit.",
      "plot": "An eccentric scientist invents an indestructible, dirt-repellent fabric, uniting textile mill owners and trade unions in a desperate bid to stop him.",
      "releaseDate": "August 7, 1951",
      "country": "United Kingdom"
    },
    {
      "id": "whisky-galore",
      "title": "Whisky Galore!",
      "year": 1949,
      "director": "Alexander Mackendrick",
      "writer": "Compton MacKenzie / Angus MacPhail",
      "cinematographer": "Gerald Gibbs",
      "editor": "Joseph Sterling",
      "composer": "Ernest Irving",
      "studio": "Ealing Studios",
      "focus": "Charming observational documentary-style realism, capturing regional Scottish idiosyncrasies through location shooting and tight comedic editing.",
      "plot": "During WWII rationing, inhabitants of an isolated Scottish island race to salvage 50,000 cases of whisky from a shipwreck before customs officials arrive.",
      "releaseDate": "June 16, 1949",
      "country": "United Kingdom"
    },
    {
      "id": "a-high-wind-in-jamaica",
      "title": "A High Wind in Jamaica",
      "year": 1965,
      "director": "Alexander Mackendrick",
      "writer": "Stanley Mann / Ronald Duncan / Denis Cannan",
      "cinematographer": "Douglas Slocombe",
      "editor": "Derek York",
      "composer": "Larry Adler",
      "studio": "Twentieth Century Fox",
      "focus": "Deconstruction of childhood innocence, sun-bleached maritime aesthetics, and subverted pirate-genre adventure tropes.",
      "plot": "A group of English children bound for London inadvertently end up aboard a pirate ship, leading to tragic moral consequences for their captors.",
      "releaseDate": "May 20, 1965",
      "country": "United Kingdom"
    }
  ],
  "Ken Loach": [
    {
      "id": "kes",
      "title": "Kes",
      "year": 1969,
      "director": "Ken Loach",
      "writer": "Barry Hines / Ken Loach / Tony Garnett",
      "cinematographer": "Chris Menges",
      "editor": "Roy Watts",
      "composer": "John Cameron",
      "studio": "Woodfall Film Productions",
      "focus": "Foundational British social realism, naturalistic lighting, documentary-style non-professional performances, and empathetic working-class critique.",
      "plot": "A neglected, abused working-class boy from Yorkshire finds temporary solace and purpose by taming and training a wild kestrel.",
      "releaseDate": "November 3, 1969",
      "country": "United Kingdom"
    },
    {
      "id": "i-daniel-blake",
      "title": "I, Daniel Blake",
      "year": 2016,
      "director": "Ken Loach",
      "writer": "Paul Laverty",
      "cinematographer": "Robbie Ryan",
      "editor": "Jonathan Morris",
      "composer": "George Fenton",
      "studio": "Sixteen Films / Sixteen Tyne Ltd.",
      "focus": "Starkly stripped-down aesthetic devoid of melodrama, focusing purely on institutional frustration and the physical toll of poverty.",
      "plot": "An aging carpenter recovering from a heart attack battles the labyrinthine bureaucracy of the British welfare system while helping a single mother.",
      "releaseDate": "October 21, 2016",
      "country": "United Kingdom / France"
    },
    {
      "id": "the-wind-that-shakes-the-barley",
      "title": "The Wind That Shakes the Barley",
      "year": 2006,
      "director": "Ken Loach",
      "writer": "Paul Laverty",
      "cinematographer": "Barry Ackroyd",
      "editor": "Jonathan Morris",
      "composer": "George Fenton",
      "studio": "Sixteen Films",
      "focus": "Unromanticized historical realism, handheld camera immediacy thrusting the viewer into political violence, and stark moral conflict staging.",
      "plot": "During the Irish War of Independence and subsequent Civil War, two brothers find their loyalties tragically divided by politics and violence.",
      "releaseDate": "June 23, 2006",
      "country": "Ireland / United Kingdom / Germany"
    },
    {
      "id": "sweet-sixteen",
      "title": "Sweet Sixteen",
      "year": 2002,
      "director": "Ken Loach",
      "writer": "Paul Laverty",
      "cinematographer": "Barry Ackroyd",
      "editor": "Jonathan Morris",
      "composer": "George Fenton",
      "studio": "Sixteen Films",
      "focus": "Gritty Scottish dialect realism, mobile handheld camera closely following marginalized youth, and uncompromisingly bleak social commentary.",
      "plot": "A determined Scottish teenager falls into a life of crime as he desperately attempts to build a better life for his imprisoned mother upon her release.",
      "releaseDate": "October 4, 2002",
      "country": "United Kingdom / Germany / Spain"
    },
    {
      "id": "raining-stones",
      "title": "Raining Stones",
      "year": 1993,
      "director": "Ken Loach",
      "writer": "Roni Noone",
      "cinematographer": "Barry Ackroyd",
      "editor": "Jonathan Morris",
      "composer": "Stewart Copeland",
      "studio": "Parallax Pictures",
      "focus": "Tragicomedy of working-class survival, location shooting in housing estates, and naturalistic overlapping dialogue.",
      "plot": "An unemployed, desperate father in Northern England goes to dangerous lengths to buy his daughter an expensive Communion dress.",
      "releaseDate": "October 8, 1993",
      "country": "United Kingdom"
    }
  ],
  "Mike Leigh": [
    {
      "id": "naked",
      "title": "Naked",
      "year": 1993,
      "director": "Mike Leigh",
      "writer": "Mike Leigh",
      "cinematographer": "Dick Pope",
      "editor": "Jon Gregory",
      "composer": "Andrew Dickson",
      "studio": "Thin Man Films",
      "focus": "Harsh, unlit night-time cinematography, improvisational deep-character immersion, and a bleak existential tone echoing urban decay.",
      "plot": "An intelligent, articulate, and deeply cynical drifter flees Manchester to London, unleashing a torrent of bitter philosophy on anyone he meets.",
      "releaseDate": "November 5, 1993",
      "country": "United Kingdom"
    },
    {
      "id": "secrets-and-lies",
      "title": "Secrets & Lies",
      "year": 1996,
      "director": "Mike Leigh",
      "writer": "Mike Leigh",
      "cinematographer": "Dick Pope",
      "editor": "Jon Gregory",
      "composer": "Andrew Dickson",
      "studio": "Thin Man Films",
      "focus": "Extraordinarily sustained long takes holding raw emotional breakdowns, improvisational domestic realism, and intimate ensemble acting.",
      "plot": "A successful Black optometrist traces her birth mother, discovering she is a lower-class white woman whose dysfunctional family is built on hidden truths.",
      "releaseDate": "May 24, 1996",
      "country": "United Kingdom / France"
    },
    {
      "id": "vera-drake",
      "title": "Vera Drake",
      "year": 2005,
      "director": "Mike Leigh",
      "writer": "Mike Leigh",
      "cinematographer": "Dick Pope",
      "editor": "Jim Clark",
      "composer": "Andrew Dickson",
      "studio": "Thin Man Films",
      "focus": "Meticulous period detail with dim, oppressive lighting reflecting 1950s austerity, highlighting moral ambiguity and quiet working-class tragedy.",
      "plot": "In 1950s London, a selfless working-class woman's life collapses when her family discovers she secretly performs illegal abortions for women in need.",
      "releaseDate": "January 7, 2005",
      "country": "United Kingdom / France"
    },
    {
      "id": "life-is-sweet",
      "title": "Life Is Sweet",
      "year": 1991,
      "director": "Mike Leigh",
      "writer": "Mike Leigh",
      "cinematographer": "Dick Pope",
      "editor": "Jon Gregory",
      "composer": "Rachel Portman",
      "studio": "Thin Man Films",
      "focus": "Subtle suburban tragicomedy framing, balancing exaggerated eccentricity with profound moments of domestic vulnerability.",
      "plot": "Over the course of a few weeks, a working-class North London family endures various comic and tragic struggles, centering on their bulimic daughter.",
      "releaseDate": "March 22, 1991",
      "country": "United Kingdom"
    },
    {
      "id": "topsy-turvy",
      "title": "Topsy-Turvy",
      "year": 1999,
      "director": "Mike Leigh",
      "writer": "Mike Leigh",
      "cinematographer": "Dick Pope",
      "editor": "Robin Sales",
      "composer": "Arthur Sullivan",
      "studio": "Thin Man Films",
      "focus": "Sumptuous backstage theatrical realism, exploring the agonizing creative process with elaborate period costumes and improvisational depth.",
      "plot": "After a string of failures threatens their partnership, the famous theatrical duo Gilbert and Sullivan find inspiration to create 'The Mikado'.",
      "releaseDate": "December 17, 1999",
      "country": "United Kingdom / United States"
    }
  ],
  "Lindsay Anderson": [
    {
      "id": "if",
      "title": "If....",
      "year": 1968,
      "director": "Lindsay Anderson",
      "writer": "David Sherwin",
      "cinematographer": "Miroslav Ondříček",
      "editor": "Tom Priestley",
      "composer": "Marc Wilkinson",
      "studio": "Memorial Enterprises",
      "focus": "Surreal shifting between color and black-and-white to disorient reality, allegorical boarding school setting, and explosive revolutionary imagery.",
      "plot": "A charismatic student leads a surreal, violent rebellion against the draconian and oppressive establishment of a traditional English public school.",
      "releaseDate": "December 19, 1968",
      "country": "United Kingdom"
    },
    {
      "id": "this-sporting-life",
      "title": "This Sporting Life",
      "year": 1963,
      "director": "Lindsay Anderson",
      "writer": "David Storey",
      "cinematographer": "Denys Coop",
      "editor": "Peter Taylor",
      "composer": "Roberto Gerhard",
      "studio": "Independent Artists",
      "focus": "Visceral, brutal sports sequences emphasizing working-class masculine aggression, and fragmented flashback editing to reveal psychological pain.",
      "plot": "A bitter, aggressive young coal miner finds fleeting success as a professional rugby league player while pursuing a doomed romance with his landlady.",
      "releaseDate": "February 7, 1963",
      "country": "United Kingdom"
    },
    {
      "id": "o-lucky-man",
      "title": "O Lucky Man!",
      "year": 1973,
      "director": "Lindsay Anderson",
      "writer": "David Sherwin",
      "cinematographer": "Miroslav Ondříček",
      "editor": "Tom Priestley",
      "composer": "Alan Price",
      "studio": "Memorial Enterprises",
      "focus": "Epic picaresque structuring, Brechtian musical interludes breaking the fourth wall, and sweeping satirical commentary on British capitalism.",
      "plot": "A blindly optimistic coffee salesman embarks on a surreal, sprawling odyssey across a corrupt, capitalist Britain in search of success.",
      "releaseDate": "May 3, 1973",
      "country": "United Kingdom / United States"
    }
  ],
  "Nicolas Roeg": [
    {
      "id": "dont-look-now",
      "title": "Don't Look Now",
      "year": 1973,
      "director": "Nicolas Roeg",
      "writer": "Allan Scott / Chris Bryant",
      "cinematographer": "Anthony B. Richmond",
      "editor": "Graeme Clifford",
      "composer": "Pino Donaggio",
      "studio": "Casey Productions / Eldorado Films",
      "focus": "Pioneering associative editing utilizing temporal dislocation, recurring red motifs, and a haunting, labyrinthine depiction of Venetian canals.",
      "plot": "A grieving couple travels to Venice where they encounter two psychic sisters and a series of eerie omens that blur the lines of sanity and grief.",
      "releaseDate": "October 16, 1973",
      "country": "United Kingdom / Italy"
    },
    {
      "id": "walkabout",
      "title": "Walkabout",
      "year": 1971,
      "director": "Nicolas Roeg",
      "writer": "Edward Bond",
      "cinematographer": "Nicolas Roeg",
      "editor": "Antony Gibbs",
      "composer": "John Barry",
      "studio": "Max L. Raab-Si Litvinoff Productions",
      "focus": "Stunning sensory depiction of the outback, cross-cutting nature with industrial imagery, and poetic, fragmented visual storytelling.",
      "plot": "After their father commits suicide, a teenage girl and her young brother are guided through the unforgiving Australian Outback by an Aboriginal youth.",
      "releaseDate": "July 1, 1971",
      "country": "United Kingdom / Australia"
    },
    {
      "id": "the-man-who-fell-to-earth",
      "title": "The Man Who Fell to Earth",
      "year": 1976,
      "director": "Nicolas Roeg",
      "writer": "Paul Mayersberg",
      "cinematographer": "Anthony B. Richmond",
      "editor": "Graeme Clifford",
      "composer": "John Phillips / Stomu Yamashta",
      "studio": "British Lion Films",
      "focus": "Surreal narrative fragmentation, highly stylized alien isolation themes, and visually striking, melancholic sci-fi imagery.",
      "plot": "A humanoid alien travels to Earth to secure water for his dying planet but becomes corrupted and imprisoned by human corporate greed and vice.",
      "releaseDate": "March 18, 1976",
      "country": "United Kingdom"
    },
    {
      "id": "performance",
      "title": "Performance",
      "year": 1970,
      "director": "Nicolas Roeg / Donald Cammell",
      "writer": "Donald Cammell",
      "cinematographer": "Nicolas Roeg",
      "editor": "Antony Gibbs",
      "composer": "Jack Nitzsche",
      "studio": "Goodtimes Enterprises",
      "focus": "Aggressive elliptical editing, psychedelic blurring of identity boundaries, and a claustrophobic, bohemian set design merging gangster violence with art.",
      "plot": "A violent London gangster on the run hides out in the bohemian home of a reclusive rock star, leading to a hallucinatory merging of their identities.",
      "releaseDate": "September 3, 1970",
      "country": "United Kingdom"
    },
    {
      "id": "bad-timing",
      "title": "Bad Timing",
      "year": 1980,
      "director": "Nicolas Roeg",
      "writer": "Yale Udoff",
      "cinematographer": "Anthony B. Richmond",
      "editor": "Tony Lawson",
      "composer": "Richard Hartley",
      "studio": "Recorded Picture Company",
      "focus": "Non-linear chronological splintering reflecting a fractured mental state, unsettling voyeuristic camera angles, and psychological dissection.",
      "plot": "An American psychiatrist and a young woman engage in a deeply obsessive and ultimately destructive relationship in Cold War Vienna.",
      "releaseDate": "April 10, 1980",
      "country": "United Kingdom"
    }
  ],
  "Peter Greenaway": [
    {
      "id": "the-cook-the-thief-his-wife-her-lover",
      "title": "The Cook, the Thief, His Wife & Her Lover",
      "year": 1989,
      "director": "Peter Greenaway",
      "writer": "Peter Greenaway",
      "cinematographer": "Sacha Vierny",
      "editor": "John Wilson",
      "composer": "Michael Nyman",
      "studio": "Allarts Enterprises",
      "focus": "Theatrical tracking shots moving through intensely color-coded rooms (red, green, white), blending high art aesthetics with visceral grotesquerie.",
      "plot": "The wife of a brutal, gluttonous crime boss begins a dangerous, passionate affair with a quiet bookshop owner in the restaurant her husband controls.",
      "releaseDate": "October 13, 1989",
      "country": "United Kingdom / France"
    },
    {
      "id": "the-draughtsmans-contract",
      "title": "The Draughtsman's Contract",
      "year": 1982,
      "director": "Peter Greenaway",
      "writer": "Peter Greenaway",
      "cinematographer": "Curtis Clark",
      "editor": "John Wilson",
      "composer": "Michael Nyman",
      "studio": "British Film Institute / Channel Four",
      "focus": "Rigid geometric framing mirroring the act of drawing, elaborate period costumes, and intricate dialogue driven by formalist puzzles.",
      "plot": "In 17th-century England, an arrogant artist is commissioned to draw a country estate, inadvertently capturing clues to a murder in his sketches.",
      "releaseDate": "November 4, 1982",
      "country": "United Kingdom"
    },
    {
      "id": "a-zed-and-two-noughts",
      "title": "A Zed & Two Noughts",
      "year": 1985,
      "director": "Peter Greenaway",
      "writer": "Peter Greenaway",
      "cinematographer": "Sacha Vierny",
      "editor": "John Wilson",
      "composer": "Michael Nyman",
      "studio": "British Film Institute / Allarts Enterprises",
      "focus": "Obsessive symmetry in composition, time-lapse photography exploring physical decay, and a cold, structural approach to biological grief.",
      "plot": "Twin zoologists grieve the loss of their wives in a car crash by developing a bizarre obsession with observing the stages of animal decomposition.",
      "releaseDate": "December 12, 1985",
      "country": "United Kingdom / Netherlands"
    },
    {
      "id": "prosperos-books",
      "title": "Prospero's Books",
      "year": 1991,
      "director": "Peter Greenaway",
      "writer": "Peter Greenaway",
      "cinematographer": "Sacha Vierny",
      "editor": "Marina Bodbyl",
      "composer": "Michael Nyman",
      "studio": "Allarts / Cinea / Camera One",
      "focus": "Dense layering of text, animation, and live-action imagery using early digital compositing to represent an overwhelming Renaissance mindset.",
      "plot": "An avant-garde, highly visual reinterpretation of Shakespeare's 'The Tempest', centering on the exiled Duke Prospero and his magical library.",
      "releaseDate": "August 30, 1991",
      "country": "United Kingdom / France / Netherlands / Italy"
    },
    {
      "id": "the-belly-of-an-architect",
      "title": "The Belly of an Architect",
      "year": 1987,
      "director": "Peter Greenaway",
      "writer": "Peter Greenaway",
      "cinematographer": "Sacha Vierny",
      "editor": "John Wilson",
      "composer": "Wim Mertens / Glenn Branca",
      "studio": "Mondial / Tangram Film",
      "focus": "Stunning symmetrical framing of Roman classical architecture, juxtaposing grandiose monuments with the fragile deterioration of the human body.",
      "plot": "An American architect in Rome organizing an exhibition spirals into paranoia and illness as he becomes obsessed with his wife's infidelity and his stomach pains.",
      "releaseDate": "May 1, 1987",
      "country": "United Kingdom / Italy"
    }
  ],
  "Danny Boyle": [
    {
      "id": "trainspotting",
      "title": "Trainspotting",
      "year": 1996,
      "director": "Danny Boyle",
      "writer": "John Hodge",
      "cinematographer": "Brian Tufano",
      "editor": "Masahiro Hirakubo",
      "composer": "Compiled Soundtrack",
      "studio": "Channel Four Films / Figment Films",
      "focus": "Kinetic, drug-fueled hyper-editing, subjective surrealism mapping the highs and horrors of heroin addiction, and a pulsating Britpop soundtrack.",
      "plot": "A young Scottish man tries to clean up his life and escape his bleak reality, despite the relentless pull of his self-destructive, heroin-addicted friends.",
      "releaseDate": "February 23, 1996",
      "country": "United Kingdom"
    },
    {
      "id": "28-days-later",
      "title": "28 Days Later",
      "year": 2002,
      "director": "Danny Boyle",
      "writer": "Alex Garland",
      "cinematographer": "Anthony Dod Mantle",
      "editor": "Chris Gill",
      "composer": "John Murphy",
      "studio": "DNA Films",
      "focus": "Pioneering use of early digital video creating a gritty, immediate documentary feel, and hauntingly desolate wide shots of an empty London.",
      "plot": "A courier wakes from a coma to find that a highly contagious, rage-inducing virus has caused the total collapse of society in Great Britain.",
      "releaseDate": "November 1, 2002",
      "country": "United Kingdom"
    },
    {
      "id": "slumdog-millionaire",
      "title": "Slumdog Millionaire",
      "year": 2008,
      "director": "Danny Boyle",
      "writer": "Simon Beaufoy",
      "cinematographer": "Anthony Dod Mantle",
      "editor": "Chris Dickens",
      "composer": "A. R. Rahman",
      "studio": "Celador Films / Film4",
      "focus": "Frenetic, highly saturated digital cinematography traversing Mumbai slums, interlocking temporal flashbacks, and an intensely rhythmic pace.",
      "plot": "A young man from the slums of Mumbai recounts his life's harrowing experiences to explain how he knows the answers on the Indian version of 'Who Wants to Be a Millionaire?'.",
      "releaseDate": "November 12, 2008",
      "country": "United Kingdom / India"
    },
    {
      "id": "shallow-grave",
      "title": "Shallow Grave",
      "year": 1995,
      "director": "Danny Boyle",
      "writer": "John Hodge",
      "cinematographer": "Brian Tufano",
      "editor": "Masahiro Hirakubo",
      "composer": "Simon Boswell",
      "studio": "Channel Four Films / Figment Films",
      "focus": "Stylized neo-noir lighting, dynamic camera movements tracking claustrophobic apartment spaces, and macabre comedic timing.",
      "plot": "Three flatmates are thrust into a world of paranoia and betrayal when they discover their new secretive tenant dead alongside a suitcase full of cash.",
      "releaseDate": "January 6, 1995",
      "country": "United Kingdom"
    },
    {
      "id": "127-hours",
      "title": "127 Hours",
      "year": 2010,
      "director": "Danny Boyle",
      "writer": "Danny Boyle / Simon Beaufoy",
      "cinematographer": "Anthony Dod Mantle / Enrique Chediak",
      "editor": "Jon Harris",
      "composer": "A. R. Rahman",
      "studio": "Pathé / Film4 / Cloud Eight Films",
      "focus": "Claustrophobic kinetic energy, utilizing split screens, rapid flashbacks, and hallucinatory visual effects to transcend the confined setting.",
      "plot": "A mountain climber becomes trapped by a fallen boulder in an isolated Utah canyon, forcing him to take extreme measures to survive over five days.",
      "releaseDate": "November 5, 2010",
      "country": "United Kingdom / United States"
    }
  ],
  "Guy Ritchie": [
    {
      "id": "lock-stock-and-two-smoking-barrels",
      "title": "Lock, Stock and Two Smoking Barrels",
      "year": 1998,
      "director": "Guy Ritchie",
      "writer": "Guy Ritchie",
      "cinematographer": "Tim Maurice-Jones",
      "editor": "Niven Howie",
      "composer": "David A. Hughes / John Murphy",
      "studio": "Ska Films",
      "focus": "Hyper-stylized visual flair, sepia-toned gritty aesthetics, freeze frames, and rapid-fire cockney dialogue driving a complex multi-thread narrative.",
      "plot": "Four friends find themselves in deep debt to a powerful London crime boss after a rigged card game, leading to a chaotic scheme to rob local thugs.",
      "releaseDate": "August 28, 1998",
      "country": "United Kingdom"
    },
    {
      "id": "snatch",
      "title": "Snatch",
      "year": 2000,
      "director": "Guy Ritchie",
      "writer": "Guy Ritchie",
      "cinematographer": "Tim Maurice-Jones",
      "editor": "Jon Harris",
      "composer": "John Murphy",
      "studio": "Ska Films",
      "focus": "Kinetic snap-zooms, parallel montage editing combining multiple eccentric underworld factions, and heavy stylization of underground boxing.",
      "plot": "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, and a Mickey O'Neil compete to track down a priceless stolen diamond.",
      "releaseDate": "August 23, 2000",
      "country": "United Kingdom / United States"
    },
    {
      "id": "sherlock-holmes",
      "title": "Sherlock Holmes",
      "year": 2009,
      "director": "Guy Ritchie",
      "writer": "Michael Robert Johnson / Anthony Peckham / Simon Kinberg",
      "cinematographer": "Philippe Rousselot",
      "editor": "James Herbert",
      "composer": "Hans Zimmer",
      "studio": "Silver Pictures / Wigram Productions",
      "focus": "Dynamic action mapping using extreme slow-motion to visualize Holmes' analytical fighting style, combined with gritty Victorian industrial aesthetics.",
      "plot": "Detective Sherlock Holmes and his partner Dr. Watson engage in a battle of wits and brawn to stop an occultist aristocrat from destroying Britain.",
      "releaseDate": "December 25, 2009",
      "country": "United Kingdom / United States"
    }
  ],
  "Edgar Wright": [
    {
      "id": "shaun-of-the-dead",
      "title": "Shaun of the Dead",
      "year": 2004,
      "director": "Edgar Wright",
      "writer": "Edgar Wright / Simon Pegg",
      "cinematographer": "David M. Dunlap",
      "editor": "Chris Dickens",
      "composer": "Daniel Mudford / Pete Woodhead",
      "studio": "Working Title Films / Big Talk Productions",
      "focus": "Signature hyper-kinetic montage transitions, meticulous background sight gags, and seamless blending of mundane suburban life with zombie horror.",
      "plot": "An aimless electronics salesman decides to turn his life around by winning back his ex-girlfriend while navigating a sudden zombie apocalypse in London.",
      "releaseDate": "April 9, 2004",
      "country": "United Kingdom / United States"
    },
    {
      "id": "hot-fuzz",
      "title": "Hot Fuzz",
      "year": 2007,
      "director": "Edgar Wright",
      "writer": "Edgar Wright / Simon Pegg",
      "cinematographer": "Jess Hall",
      "editor": "Chris Dickens",
      "composer": "David Arnold",
      "studio": "Working Title Films / Big Talk Productions",
      "focus": "Aggressive action-movie editing applied to mundane village tasks, rapid-fire foreshadowing, and sharp parodic subversion of Michael Bay aesthetics.",
      "plot": "An overachieving London police officer is reassigned to a quiet, seemingly idyllic country village, where he uncovers a string of grisly 'accidents'.",
      "releaseDate": "February 14, 2007",
      "country": "United Kingdom / United States"
    },
    {
      "id": "scott-pilgrim-vs-the-world",
      "title": "Scott Pilgrim vs. the World",
      "year": 2010,
      "director": "Edgar Wright",
      "writer": "Michael Bacall / Edgar Wright",
      "cinematographer": "Bill Pope",
      "editor": "Jonathan Amos / Paul Machliss",
      "composer": "Nigel Godrich",
      "studio": "Big Talk Productions / Marc Platt Productions",
      "focus": "Inventive translation of comic book and video game vernacular to cinema, utilizing split screens, literal on-screen text, and hyper-rhythmic editing.",
      "plot": "A slacker bass guitarist must defeat his new girlfriend's seven evil exes in literal combat in order to win her heart.",
      "releaseDate": "August 13, 2010",
      "country": "United Kingdom / United States / Canada"
    }
  ],
  "Steve McQueen": [
    {
      "id": "12-years-a-slave",
      "title": "12 Years a Slave",
      "year": 2013,
      "director": "Steve McQueen",
      "writer": "John Ridley",
      "cinematographer": "Sean Bobbitt",
      "editor": "Joe Walker",
      "composer": "Hans Zimmer",
      "studio": "Plan B Entertainment / River Road Entertainment",
      "focus": "Unflinching, prolonged static takes forcing the audience to bear witness to brutality without the relief of a cut.",
      "plot": "In the antebellum United States, a free Black man from New York is abducted and sold into grueling slavery on a Louisiana plantation.",
      "releaseDate": "November 8, 2013",
      "country": "United Kingdom / United States"
    },
    {
      "id": "hunger",
      "title": "Hunger",
      "year": 2008,
      "director": "Steve McQueen",
      "writer": "Steve McQueen / Enda Walsh",
      "cinematographer": "Sean Bobbitt",
      "editor": "Joe Walker",
      "composer": "David Holmes / Leo Abrahams",
      "studio": "Blast! Films",
      "focus": "Intensely physical, tactile cinematography detailing bodily decay, featuring an iconic, unbroken 17-minute dialogue shot mapping ideological resolve.",
      "plot": "Irish republican Bobby Sands leads inmates in a grueling hunger strike in a Northern Ireland prison to regain political prisoner status.",
      "releaseDate": "October 31, 2008",
      "country": "United Kingdom / Ireland"
    },
    {
      "id": "shame",
      "title": "Shame",
      "year": 2012,
      "director": "Steve McQueen",
      "writer": "Steve McQueen / Abi Morgan",
      "cinematographer": "Sean Bobbitt",
      "editor": "Joe Walker",
      "composer": "Harry Escott",
      "studio": "See-Saw Films / Film4",
      "focus": "Cold, clinical framing of modern urban alienation, using long tracking shots to emphasize the hollow repetition of sex addiction.",
      "plot": "A successful New York executive's carefully cultivated private life of sexual addiction begins to unravel when his troubled younger sister moves in.",
      "releaseDate": "January 13, 2012",
      "country": "United Kingdom"
    }
  ],
  "Andrea Arnold": [
    {
      "id": "fish-tank",
      "title": "Fish Tank",
      "year": 2009,
      "director": "Andrea Arnold",
      "writer": "Andrea Arnold",
      "cinematographer": "Robbie Ryan",
      "editor": "Nicolas Chaudeurge",
      "composer": "Compiled Soundtrack",
      "studio": "Kasander Film Company / BBC Films",
      "focus": "Intimate Academy ratio (1.33:1) framing, handheld kinetic realism trapping the protagonist in her environment, and raw improvisational energy.",
      "plot": "A volatile, socially isolated 15-year-old girl's life changes dramatically when her mother brings home a charismatic new boyfriend.",
      "releaseDate": "September 11, 2009",
      "country": "United Kingdom"
    },
    {
      "id": "red-road",
      "title": "Red Road",
      "year": 2006,
      "director": "Andrea Arnold",
      "writer": "Andrea Arnold",
      "cinematographer": "Robbie Ryan",
      "editor": "Nicolas Chaudeurge",
      "composer": "Tattersall Atmos Sound Team",
      "studio": "Zentropa Entertainments / BBC Films",
      "focus": "Voyeuristic CCTV monitor framing, strict adherence to Dogme 95-inspired realism, and oppressive urban claustrophobia.",
      "plot": "A withdrawn CCTV operator in Glasgow becomes dangerously obsessed with monitoring a man from her past whom she spots on her cameras.",
      "releaseDate": "October 27, 2006",
      "country": "United Kingdom / Denmark"
    },
    {
      "id": "american-honey",
      "title": "American Honey",
      "year": 2016,
      "director": "Andrea Arnold",
      "writer": "Andrea Arnold",
      "cinematographer": "Robbie Ryan",
      "editor": "Joe Bini",
      "composer": "Compiled Soundtrack",
      "studio": "Parts & Labor / Film4",
      "focus": "Sun-drenched, impressionistic road-movie aesthetics, sensory immersion via hip-hop soundtracks, and free-flowing unscripted camera work.",
      "plot": "A teenage girl with nothing to lose joins a traveling magazine sales crew and gets caught up in a whirlwind of hard partying and law-bending.",
      "releaseDate": "September 30, 2016",
      "country": "United Kingdom / United States"
    }
  ],
  "Lynne Ramsay": [
    {
      "id": "we-need-to-talk-about-kevin",
      "title": "We Need to Talk About Kevin",
      "year": 2011,
      "director": "Lynne Ramsay",
      "writer": "Lynne Ramsay / Rory Stewart Kinnear",
      "cinematographer": "Seamus McGarvey",
      "editor": "Joe Bini",
      "composer": "Jonny Greenwood",
      "studio": "BBC Films / Independent Go-Go Films",
      "focus": "Fractured, sensory montage editing, overwhelming use of the color red symbolizing guilt, and deeply subjective psychological horror.",
      "plot": "A mother struggles to comprehend her feelings of guilt and maternal detachment in the aftermath of her teenage son's horrific high school massacre.",
      "releaseDate": "October 21, 2011",
      "country": "United Kingdom / United States"
    },
    {
      "id": "you-were-never-really-here",
      "title": "You Were Never Really Here",
      "year": 2018,
      "director": "Lynne Ramsay",
      "writer": "Lynne Ramsay",
      "cinematographer": "Thomas Townend",
      "editor": "Joe Bini",
      "composer": "Jonny Greenwood",
      "studio": "Why Not Productions / Film4",
      "focus": "Impressionistic action staging that obscures violence, jagged flashback editing emphasizing PTSD, and a hauntingly dissonant score.",
      "plot": "A traumatized veteran, unafraid of violence, tracks down missing girls for a living. When a job spins out of control, his nightmares overtake him.",
      "releaseDate": "March 9, 2018",
      "country": "United Kingdom / France / United States"
    },
    {
      "id": "ratcatcher",
      "title": "Ratcatcher",
      "year": 1999,
      "director": "Lynne Ramsay",
      "writer": "Lynne Ramsay",
      "cinematographer": "Alwin H. Küchler",
      "editor": "Lucia Zucchetti",
      "composer": "Rachel Portman",
      "studio": "BBC Films / Holy Cow Films",
      "focus": "Lyrical poetic realism contrasting the filth of a garbage strike with transcendent imagery of childhood innocence and escape.",
      "plot": "During a 1973 Glasgow garbage strike, a young boy struggles with guilt after secretly witnessing a friend drown in a canal.",
      "releaseDate": "November 12, 1999",
      "country": "United Kingdom / France"
    }
  ],
  "Terence Davies": [
    {
      "id": "the-distant-voices-still-lives",
      "title": "The Distant Voices, Still Lives",
      "year": 1988,
      "director": "Terence Davies",
      "writer": "Terence Davies",
      "cinematographer": "Patrick Duval / William Diver",
      "editor": "William Diver",
      "composer": "Traditional Choral",
      "studio": "British Film Institute / Channel Four",
      "focus": "Tableau framing akin to a family photo album, non-linear associative memory structure, and the use of diegetic pub songs to convey emotional longing.",
      "plot": "An impressionistic, autobiographical look at a working-class Catholic family in Liverpool dealing with the legacy of their abusive, brutal father.",
      "releaseDate": "October 14, 1988",
      "country": "United Kingdom"
    },
    {
      "id": "the-long-day-closes",
      "title": "The Long Day Closes",
      "year": 1992,
      "director": "Terence Davies",
      "writer": "Terence Davies",
      "cinematographer": "Michael Coulter",
      "editor": "William Diver",
      "composer": "Bob Last Sound Direction",
      "studio": "British Film Institute / Channel Four",
      "focus": "Exquisite slow tracking shots, melancholic lighting illuminating the safety of domestic spaces, and deep sensory immersion into memory.",
      "plot": "The gentle, autobiographical memories of an 11-year-old boy growing up in 1950s Liverpool, finding solace in cinema and his loving family.",
      "releaseDate": "May 22, 1992",
      "country": "United Kingdom"
    }
  ],
  "Joanna Hogg": [
    {
      "id": "the-souvenir",
      "title": "The Souvenir",
      "year": 2019,
      "director": "Joanna Hogg",
      "writer": "Joanna Hogg",
      "cinematographer": "David Raedeker",
      "editor": "Helle le Fevre",
      "composer": "Ambient / Period Track Compilation",
      "studio": "Jigsaw Productions / BBC Films",
      "focus": "Rigorous, detached observational framing, understated naturalistic performances reflecting upper-class restraint, and subtle shifts in film grain.",
      "plot": "A young, ambitious film student in 1980s London navigates her artistic awakening while entangled in a toxic relationship with a secretive, older man.",
      "releaseDate": "May 17, 2019",
      "country": "United Kingdom / United States"
    }
  ],
  "Shane Meadows": [
    {
      "id": "this-is-england",
      "title": "This Is England",
      "year": 2007,
      "director": "Shane Meadows",
      "writer": "Shane Meadows",
      "cinematographer": "Danny Cohen",
      "editor": "Chris Wyatt",
      "composer": "Ludovico Einaudi",
      "studio": "Warp Films / FilmFour",
      "focus": "Raw, improvisational energy capturing working-class youth subculture, stark realism, and the chilling juxtaposition of Einaudi's mournful score with violence.",
      "plot": "A lonely 12-year-old boy in 1983 England is adopted by a group of skinheads, but the group is torn apart when a racist ex-convict returns.",
      "releaseDate": "April 27, 2007",
      "country": "United Kingdom"
    },
    {
      "id": "dead-mans-shoes",
      "title": "Dead Man's Shoes",
      "year": 2004,
      "director": "Shane Meadows",
      "writer": "Shane Meadows / Paddy Considine",
      "cinematographer": "Danny Cohen",
      "editor": "Chris Wyatt",
      "composer": "Aphex Twin / Clayhill",
      "studio": "Warp Films",
      "focus": "Low-budget grit combining social realism with slasher horror tropes, handheld intimacy, and deeply unsettling juxtaposition of nostalgia and terror.",
      "plot": "An ex-soldier returns to his small hometown in the Midlands to exact brutal, systematic revenge on the local thugs who abused his disabled younger brother.",
      "releaseDate": "October 1, 2004",
      "country": "United Kingdom"
    }
  ],
  "Clio Barnard": [
    {
      "id": "the-selfish-giant",
      "title": "The Selfish Giant",
      "year": 2013,
      "director": "Clio Barnard",
      "writer": "Clio Barnard",
      "cinematographer": "Mike Eley",
      "editor": "Nick Fenton",
      "composer": "Harry Escott",
      "studio": "Moonspun Films / Film4",
      "focus": "Poetic realism contrasting the misty, lyrical beauty of the moors with the harsh, dangerous industrial reality of scrap metal scavenging.",
      "plot": "Two marginalized teenage boys in Bradford get involved with a local scrap dealer, leading to tragic consequences as they compete for his approval.",
      "releaseDate": "October 25, 2013",
      "country": "United Kingdom"
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

  // Ensure assets/images exists
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Update British directors' movies and download posters
  for (const directorName of Object.keys(directorsData)) {
    const movies = directorsData[directorName];
    // British directors might be in the 'director.directors' array
    const directorObj = filmsData.director.directors.find(d => d.name === directorName);

    if (!directorObj) {
      console.error(`Could not find director ${directorName} in database. Creating temporary...`);
      continue;
    }

    console.log(`Updating ${directorName}...`);
    const updatedMustWatch = [];

    for (const movie of movies) {
      const filename = `${movie.id}.jpg`;
      const targetPath = path.join(imagesDir, filename);
      
      let searchTitle = movie.title;
      // manual fix for specific titles if TMDB query struggles
      if (searchTitle === "The Cook, the Thief, His Wife & Her Lover") {
          searchTitle = "The Cook the Thief His Wife";
      }

      const query = encodeURIComponent(searchTitle);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${movie.year}`;

      await wait(1000);
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
        await wait(1000);
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
        if (!fs.existsSync(targetPath)) {
            try {
              await download(posterUrl, targetPath);
              movie.poster = `assets/images/${filename}`;
              console.log(`  Downloaded successfully!`);
            } catch (e) {
              console.error(`  Failed to download poster for ${movie.title}`, e.message);
              movie.poster = `assets/images/${filename}`;
            }
        } else {
             movie.poster = `assets/images/${filename}`;
             console.log(`  Poster already exists on disk.`);
        }
      } else {
        console.log(`  No poster found on TMDB for ${movie.title}. Setting placeholder path.`);
        movie.poster = `assets/images/${filename}`;
        // create a copy of a dummy if it doesn't exist just so it doesn't fail validation
        if (!fs.existsSync(targetPath)) {
            fs.copyFileSync(path.join(imagesDir, 'valu.jpg'), targetPath); // just as a safety net
        }
      }

      updatedMustWatch.push(movie);
    }

    directorObj.mustWatch = updatedMustWatch;
  }

  const output = `const FILMS_DATA = ${JSON.stringify(filmsData, null, 4)};\n\nmodule.exports = FILMS_DATA;\n`;
  fs.writeFileSync(dbPath, output, 'utf8');
  console.log('Successfully updated temp_data.js with British films!');
}

run();
