const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Francis Ford Coppola": [
        {
            "id": "the-godfather",
            "title": "The Godfather",
            "year": 1972,
            "director": "Francis Ford Coppola",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Deeply shadowed, warm golden-hued cinematography highlighting moral ambiguity.",
            "plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            "releaseDate": "1972-01-01",
            "writer": "Mario Puzo / Francis Ford Coppola",
            "cinematographer": "Gordon Willis",
            "editor": "William Reynolds / Peter Zinner",
            "composer": "Nino Rota",
            "studio": "Paramount Pictures / Alfran Productions"
        },
        {
            "id": "the-godfather-part-ii",
            "title": "The Godfather Part II",
            "year": 1974,
            "director": "Francis Ford Coppola",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dual timeline narrative mirroring, sepia-toned flashbacks contrasting cold modern realities.",
            "plot": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family syndicate.",
            "releaseDate": "1974-01-01",
            "writer": "Mario Puzo / Francis Ford Coppola",
            "cinematographer": "Gordon Willis",
            "editor": "Peter Zinner / Barry Malkin / Richard Marks",
            "composer": "Nino Rota / Carmine Coppola",
            "studio": "Paramount Pictures / Coppola Company"
        },
        {
            "id": "apocalypse-now",
            "title": "Apocalypse Now",
            "year": 1979,
            "director": "Francis Ford Coppola",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Hallucinatory, operatic framing of war, drenched in smoke, neon, and deep jungle shadows.",
            "plot": "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
            "releaseDate": "1979-01-01",
            "writer": "John Milius / Francis Ford Coppola",
            "cinematographer": "Vittorio Storaro",
            "editor": "Richard Marks / Walter Murch / Gerald B. Greenberg / Lisa Fruchtman",
            "composer": "Carmine Coppola / Francis Ford Coppola",
            "studio": "Omni Zoetrope"
        },
        {
            "id": "the-conversation",
            "title": "The Conversation",
            "year": 1974,
            "director": "Francis Ford Coppola",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Meticulous, objective surveillance framing mirroring the paranoia of the sound designer.",
            "plot": "A paranoid, secretive surveillance expert has a crisis of conscience when he suspects that the couple he is spying on will be murdered.",
            "releaseDate": "1974-01-01",
            "writer": "Francis Ford Coppola",
            "cinematographer": "Bill Butler / Haskell Wexler",
            "editor": "Richard Chew / Walter Murch",
            "composer": "David Shire",
            "studio": "Directors Company / Coppola Company"
        },
        {
            "id": "bram-stokers-dracula",
            "title": "Bram Stoker's Dracula",
            "year": 1992,
            "director": "Francis Ford Coppola",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Exclusively in-camera practical effects, operatic colors, highly stylized expressionist shadows.",
            "plot": "The centuries-old vampire Count Dracula comes to England to seduce his barrister Jonathan Harker's fiancée Mina Murray and inflict havoc in the foreign land.",
            "releaseDate": "1992-01-01",
            "writer": "James V. Hart",
            "cinematographer": "Michael Ballhaus",
            "editor": "Nicholas C. Smith / Glen Scantlebury / Ben Kettlewell",
            "composer": "Wojciech Kilar",
            "studio": "American Zoetrope / Columbia Pictures"
        }
    ],
    "Martin Scorsese": [
        {
            "id": "taxi-driver",
            "title": "Taxi Driver",
            "year": 1976,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Subjective POV, neon-lit rainy NYC streets, deeply psychological framing.",
            "plot": "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.",
            "releaseDate": "1976-01-01",
            "writer": "Paul Schrader",
            "cinematographer": "Michael Chapman",
            "editor": "Marcia Lucas / Tom Rolf / Melvin Shapiro",
            "composer": "Bernard Herrmann",
            "studio": "Columbia Pictures / Bill/Phillips Productions"
        },
        {
            "id": "goodfellas",
            "title": "Goodfellas",
            "year": 1990,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, highly energetic editing, iconic continuous tracking shots.",
            "plot": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
            "releaseDate": "1990-01-01",
            "writer": "Nicholas Pileggi / Martin Scorsese",
            "cinematographer": "Michael Ballhaus",
            "editor": "Thelma Schoonmaker",
            "composer": "Compiled Pop/Rock Soundtrack",
            "studio": "Warner Bros."
        },
        {
            "id": "raging-bull",
            "title": "Raging Bull",
            "year": 1980,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, visceral black-and-white, highly stylized and subjective boxing sequences.",
            "plot": "The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.",
            "releaseDate": "1980-01-01",
            "writer": "Paul Schrader / Mardik Martin",
            "cinematographer": "Michael Chapman",
            "editor": "Thelma Schoonmaker",
            "composer": "Pietro Mascagni",
            "studio": "Chartoff-Winkler Productions / United Artists"
        },
        {
            "id": "the-departed",
            "title": "The Departed",
            "year": 2006,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Relentlessly paced editing, complex overlapping narratives and aggressive framing.",
            "plot": "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
            "releaseDate": "2006-01-01",
            "writer": "William Monahan",
            "cinematographer": "Michael Ballhaus",
            "editor": "Thelma Schoonmaker",
            "composer": "Howard Shore",
            "studio": "Plan B Entertainment / Initial Entertainment Group / Vertigo Entertainment"
        },
        {
            "id": "casino",
            "title": "Casino",
            "year": 1995,
            "director": "Martin Scorsese",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dazzling, hyper-saturated colors, virtuosic camera movements matching the excess of Vegas.",
            "plot": "A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive.",
            "releaseDate": "1995-01-01",
            "writer": "Nicholas Pileggi / Martin Scorsese",
            "cinematographer": "Robert Richardson",
            "editor": "Thelma Schoonmaker",
            "composer": "Compiled Soundtrack",
            "studio": "Universal Pictures / Syalis D.A. / Legende Entreprises / De Fina-Cappa"
        }
    ],
    "Steven Spielberg": [
        {
            "id": "schindlers-list",
            "title": "Schindler's List",
            "year": 1993,
            "director": "Steven Spielberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, documentary-like black-and-white photography with strategic use of color.",
            "plot": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.",
            "releaseDate": "1993-01-01",
            "writer": "Steven Zaillian",
            "cinematographer": "Janusz Kamiński",
            "editor": "Michael Kahn",
            "composer": "John Williams",
            "studio": "Amblin Entertainment / Universal Pictures"
        },
        {
            "id": "jaws",
            "title": "Jaws",
            "year": 1975,
            "director": "Steven Spielberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Water-level POV shots generating terror by concealing the threat.",
            "plot": "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
            "releaseDate": "1975-01-01",
            "writer": "Peter Benchley / Carl Gottlieb",
            "cinematographer": "Bill Butler",
            "editor": "Verna Fields",
            "composer": "John Williams",
            "studio": "Zanuck/Brown Production / Universal Pictures"
        },
        {
            "id": "saving-private-ryan",
            "title": "Saving Private Ryan",
            "year": 1998,
            "director": "Steven Spielberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Desaturated, high-shutter-speed combat photography creating a chaotic, immersive documentary feel.",
            "plot": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
            "releaseDate": "1998-01-01",
            "writer": "Robert Rodat",
            "cinematographer": "Janusz Kamiński",
            "editor": "Michael Kahn",
            "composer": "John Williams",
            "studio": "Amblin Entertainment / Mutual Film Company / DreamWorks Pictures / Paramount Pictures"
        },
        {
            "id": "raiders-of-the-lost-ark",
            "title": "Raiders of the Lost Ark",
            "year": 1981,
            "director": "Steven Spielberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Classic adventure staging, dynamic blocking, and masterful use of silhouettes.",
            "plot": "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.",
            "releaseDate": "1981-01-01",
            "writer": "Lawrence Kasdan",
            "cinematographer": "Douglas Slocombe",
            "editor": "Michael Kahn",
            "composer": "John Williams",
            "studio": "Lucasfilm Ltd. / Paramount Pictures"
        },
        {
            "id": "et-the-extra-terrestrial",
            "title": "E.T. the Extra-Terrestrial",
            "year": 1982,
            "director": "Steven Spielberg",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Low-angle child's-eye POV framing, evocative suburban backlight.",
            "plot": "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
            "releaseDate": "1982-01-01",
            "writer": "Melissa Mathison",
            "cinematographer": "Allen Daviau",
            "editor": "Carol Littleton",
            "composer": "John Williams",
            "studio": "Amblin Entertainment / Universal Pictures"
        }
    ],
    "George Lucas": [
        {
            "id": "star-wars",
            "title": "Star Wars",
            "year": 1977,
            "director": "George Lucas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Pioneering motion-control photography, 'used future' lived-in aesthetic.",
            "plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
            "releaseDate": "1977-01-01",
            "writer": "George Lucas",
            "cinematographer": "Gilbert Taylor",
            "editor": "Richard Chew / Paul Hirsch / Marcia Lucas",
            "composer": "John Williams",
            "studio": "Lucasfilm Ltd. / Twentieth Century-Fox Film Corporation"
        },
        {
            "id": "american-graffiti",
            "title": "American Graffiti",
            "year": 1973,
            "director": "George Lucas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Nostalgic, neon-soaked cruising culture, multi-layered rock-n-roll sound design.",
            "plot": "A couple of high school grads spend one final night cruising the strip with their buddies before they go off to college.",
            "releaseDate": "1973-01-01",
            "writer": "George Lucas / Gloria Katz / Willard Huyck",
            "cinematographer": "Jan D'Alquen / Ron Eveslage",
            "editor": "Verna Fields / Marcia Lucas",
            "composer": "Compiled Soundtrack",
            "studio": "Lucasfilm Ltd. / Coppola Company / Universal Pictures"
        },
        {
            "id": "thx-1138",
            "title": "THX 1138",
            "year": 1971,
            "director": "George Lucas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Oppressive, stark white clinical environments creating a chilling dystopian atmosphere.",
            "plot": "In a 25th-century totalitarian state where mankind is stripped of individuality, a man and woman rebel by falling in love.",
            "releaseDate": "1971-01-01",
            "writer": "George Lucas / Walter Murch",
            "cinematographer": "Albert Kihn / David Myers",
            "editor": "George Lucas",
            "composer": "Lalo Schifrin",
            "studio": "American Zoetrope / Warner Bros."
        },
        {
            "id": "revenge-of-the-sith",
            "title": "Star Wars: Episode III - Revenge of the Sith",
            "year": 2005,
            "director": "George Lucas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Pioneering fully digital workflow, dense CGI world-building and operatic visual scale.",
            "plot": "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine.",
            "releaseDate": "2005-01-01",
            "writer": "George Lucas",
            "cinematographer": "David Tattersall",
            "editor": "Roger Barton / Ben Burtt",
            "composer": "John Williams",
            "studio": "Lucasfilm Ltd."
        },
        {
            "id": "the-phantom-menace",
            "title": "Star Wars: Episode I - The Phantom Menace",
            "year": 1999,
            "director": "George Lucas",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Ambitious merging of practical miniatures with revolutionary digital environments.",
            "plot": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
            "releaseDate": "1999-01-01",
            "writer": "George Lucas",
            "cinematographer": "David Tattersall",
            "editor": "Ben Burtt / Paul Martin Smith",
            "composer": "John Williams",
            "studio": "Lucasfilm Ltd."
        }
    ],
    "Brian De Palma": [
        {
            "id": "scarface-1983",
            "title": "Scarface",
            "year": 1983,
            "director": "Brian De Palma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lurid, garish Miami neon colors, sweeping camera moves highlighting violent excess.",
            "plot": "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
            "releaseDate": "1983-01-01",
            "writer": "Oliver Stone",
            "cinematographer": "John A. Alonzo",
            "editor": "Jerry Greenberg / David Ray",
            "composer": "Giorgio Moroder",
            "studio": "Universal Pictures"
        },
        {
            "id": "blow-out",
            "title": "Blow Out",
            "year": 1981,
            "director": "Brian De Palma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Virtuosic split-focus diopter shots, 360-degree pans, voyeuristic tension.",
            "plot": "A movie sound recordist accidentally records the evidence that proves that a car crash was actually murder and consequently finds himself in danger.",
            "releaseDate": "1981-01-01",
            "writer": "Brian De Palma",
            "cinematographer": "Vilmos Zsigmond",
            "editor": "Paul Hirsch",
            "composer": "Pino Donaggio",
            "studio": "Cinema 77 / Garia Productions"
        },
        {
            "id": "carrie",
            "title": "Carrie",
            "year": 1976,
            "director": "Brian De Palma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Split-screen techniques, slow-motion sequences maximizing psychological horror.",
            "plot": "Carrie White, a shy, friendless teenage girl who is sheltered by her domineering, religious mother, unleashes her telekinetic powers after being humiliated by her classmates at her senior prom.",
            "releaseDate": "1976-01-01",
            "writer": "Lawrence D. Cohen",
            "cinematographer": "Mario Tosi",
            "editor": "Paul Hirsch",
            "composer": "Pino Donaggio",
            "studio": "Red Bank Films"
        },
        {
            "id": "the-untouchables",
            "title": "The Untouchables",
            "year": 1987,
            "director": "Brian De Palma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Operatic set pieces, dramatic low angles, homage-driven slow-motion shootouts.",
            "plot": "Federal Agent Eliot Ness sets out to stop Al Capone; because of rampant corruption, he assembles a small, hand-picked team, including Irish-American cop Jimmy Malone.",
            "releaseDate": "1987-01-01",
            "writer": "David Mamet",
            "cinematographer": "Stephen H. Burum",
            "editor": "Gerald B. Greenberg / Bill Pankow",
            "composer": "Ennio Morricone",
            "studio": "Paramount Pictures"
        },
        {
            "id": "carlitos-way",
            "title": "Carlito's Way",
            "year": 1993,
            "director": "Brian De Palma",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Elaborate, fluid tracking shots, intensely stylized suspense sequences.",
            "plot": "A Puerto Rican former convict, just released from prison, pledges to stay away from drugs and violence despite the pressure around him.",
            "releaseDate": "1993-01-01",
            "writer": "David Koepp",
            "cinematographer": "Stephen H. Burum",
            "editor": "Bill Pankow / Kristina Boden",
            "composer": "Patrick Doyle",
            "studio": "Universal Pictures / Epic Productions"
        }
    ],
    "William Friedkin": [
        {
            "id": "the-exorcist",
            "title": "The Exorcist",
            "year": 1973,
            "director": "William Friedkin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Documentary-like realism grounding supernatural horror, oppressive lighting.",
            "plot": "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
            "releaseDate": "1973-01-01",
            "writer": "William Peter Blatty",
            "cinematographer": "Owen Roizman",
            "editor": "Jordan Leondopoulos / Evan A. Lottman / Norman Gay",
            "composer": "Jack Nitzsche / Mike Oldfield",
            "studio": "Warner Bros. / Hoya Productions"
        },
        {
            "id": "the-french-connection",
            "title": "The French Connection",
            "year": 1971,
            "director": "William Friedkin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, handheld verite style, defining gritty 1970s NYC street aesthetic.",
            "plot": "A pair of NYC cops in the Narcotics Bureau stumble onto a drug smuggling job with a French connection.",
            "releaseDate": "1971-01-01",
            "writer": "Ernest Tidyman",
            "cinematographer": "Owen Roizman",
            "editor": "Jerry Greenberg",
            "composer": "Don Ellis",
            "studio": "D'Antoni Productions / Twentieth Century Fox"
        },
        {
            "id": "sorcerer",
            "title": "Sorcerer",
            "year": 1977,
            "director": "William Friedkin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Sweaty, visceral jungle photography maximizing overwhelming tension.",
            "plot": "Four men from different parts of the globe, all hiding from their pasts in a remote South American town, agree to risk their lives transporting gallons of nitroglycerin across dangerous jungle terrain.",
            "releaseDate": "1977-01-01",
            "writer": "Walon Green",
            "cinematographer": "John M. Stephens / Dick Bush",
            "editor": "Bud S. Smith",
            "composer": "Tangerine Dream",
            "studio": "Film Properties International N.V. / Paramount Pictures / Universal Pictures"
        },
        {
            "id": "to-live-and-die-in-la",
            "title": "To Live and Die in L.A.",
            "year": 1985,
            "director": "William Friedkin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Neon-lit, hyper-kinetic 80s aesthetic, propulsive editing and camera movement.",
            "plot": "A fearless Secret Service agent will stop at nothing to bring down the counterfeiter who killed his partner.",
            "releaseDate": "1985-01-01",
            "writer": "William Friedkin / Gerald Petievich",
            "cinematographer": "Robby Müller",
            "editor": "Bud S. Smith / Scott Smith",
            "composer": "Wang Chung",
            "studio": "New Century Productions / SLM Production Group"
        },
        {
            "id": "cruising",
            "title": "Cruising",
            "year": 1980,
            "director": "William Friedkin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Claustrophobic, gritty, and dark underworld lighting exploring subcultures.",
            "plot": "A police detective goes undercover in the underground S&M gay subculture of New York City to catch a serial killer who is preying on gay men.",
            "releaseDate": "1980-01-01",
            "writer": "William Friedkin",
            "cinematographer": "James A. Contner",
            "editor": "Bud S. Smith",
            "composer": "Jack Nitzsche",
            "studio": "Lorimar Productions / CiP Feature Films"
        }
    ],
    "Terrence Malick": [
        {
            "id": "days-of-heaven",
            "title": "Days of Heaven",
            "year": 1978,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Exclusively shot during magic hour, capturing breathtaking natural beauty.",
            "plot": "A hot-tempered farm laborer convinces the woman he loves to marry their rich but dying boss so that they can have a claim to his fortune.",
            "releaseDate": "1978-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "Néstor Almendros",
            "editor": "Billy Weber",
            "composer": "Ennio Morricone",
            "studio": "O.P. Productions"
        },
        {
            "id": "the-thin-red-line",
            "title": "The Thin Red Line",
            "year": 1998,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Fluid Steadicam gliding through nature, juxtaposing wartime horror with ecological beauty.",
            "plot": "Adaptation of James Jones' autobiographical 1962 novel, focusing on the conflict at Guadalcanal during the second World War.",
            "releaseDate": "1998-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "John Toll",
            "editor": "Billy Weber / Leslie Jones / Saar Klein",
            "composer": "Hans Zimmer",
            "studio": "Fox 2000 Pictures / Geisler-Roberdeau / Phoenix Pictures"
        },
        {
            "id": "the-tree-of-life",
            "title": "The Tree of Life",
            "year": 2011,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Free-flowing, impressionistic wide-angle lenses emphasizing natural light and spiritual awe.",
            "plot": "The story of a family in Waco, Texas in 1956. The eldest son witnesses the loss of innocence and struggles with his parents' conflicting teachings.",
            "releaseDate": "2011-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "Emmanuel Lubezki",
            "editor": "Hank Corwin / Jay Rabinowitz / Daniel Rezende / Billy Weber / Mark Yoshikawa",
            "composer": "Alexandre Desplat",
            "studio": "River Road Entertainment / Plan B Entertainment"
        },
        {
            "id": "badlands",
            "title": "Badlands",
            "year": 1973,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Poetic, detached observational style framed against vast Midwestern landscapes.",
            "plot": "An impressionable teenage girl from a dead-end town and her older greaser boyfriend embark on a killing spree in the South Dakota badlands.",
            "releaseDate": "1973-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "Brian Probyn / Tak Fujimoto / Stevan Larner",
            "editor": "Robert Estrin",
            "composer": "George Aliceson Tipton",
            "studio": "Badlands Company"
        },
        {
            "id": "the-new-world",
            "title": "The New World",
            "year": 2005,
            "director": "Terrence Malick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lyrical, exploratory tracking shots deeply rooted in raw, untouched environments.",
            "plot": "The story of the English exploration of Virginia, and of the changing world and loves of Pocahontas.",
            "releaseDate": "2005-01-01",
            "writer": "Terrence Malick",
            "cinematographer": "Emmanuel Lubezki",
            "editor": "Richard Chew / Hank Corwin / Saar Klein / Mark Yoshikawa",
            "composer": "James Horner",
            "studio": "New Line Cinema / Sunflower Productions / Sarah Green Productions"
        }
    ]
};

function fetchJson(url) {
    return new Promise(r => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { r(JSON.parse(data)); } catch(e) { r(null); }
            });
        }).on('error', e => r(null));
        req.setTimeout(5000, () => { req.abort(); r(null); });
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
        req.setTimeout(5000, () => { req.abort(); reject(new Error('timeout')); });
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let name in newData) {
        let dp = data.director.directors.find(p => p.name === name);
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            for (let m of dp.mustWatch) {
                let queryTitle = m.title.split('(')[0].replace(/[’']/g, '').trim();
                let query = encodeURIComponent(queryTitle);
                // Hardcode specific ID searches to bypass TMDB title quirks
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                if(queryTitle === "Star Wars") {
                     url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Star%20Wars&year=1977`;
                }
                
                let retry = 3;
                let posterUrl = null;
                
                while(retry > 0 && !posterUrl) {
                    await wait(2000); // 2 second delay to avoid rate limit
                    console.log(`Searching TMDB for ${queryTitle}...`);
                    let mRes = await fetchJson(url);
                    
                    if (mRes && mRes.results && mRes.results.length > 0) {
                        let result = mRes.results.find(r => r.release_date && r.release_date.startsWith(m.year.toString()));
                        if (!result) result = mRes.results[0]; // fallback
                        
                        if (result && result.poster_path) {
                            posterUrl = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
                        }
                    } else if (!mRes) {
                        console.log(`Failed fetch for ${queryTitle}, retrying...`);
                        retry--;
                        continue;
                    }
                    break;
                }

                if (posterUrl) {
                    console.log(`Found TMDB URL for ${m.title}`);
                    const filename = `assets/images/${queryTitle.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`;
                    try {
                        await download(posterUrl, filename);
                        console.log(`Downloaded ${m.title}`);
                        m.poster = filename;
                    } catch (e) {
                        console.error(`Failed to download ${m.title}`);
                        m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(queryTitle)}`;
                    }
                } else {
                    console.log(`Could not find poster for ${m.title} on TMDB`);
                    m.poster = `https://placehold.co/500x750/1a1a1a/e2b646?text=${encodeURIComponent(queryTitle)}`;
                }
            }
            modified = true;
        } else {
            console.log(`Could not find Director: ${name}`);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Hollywood & North American Masters 2");
    }
}

run();
