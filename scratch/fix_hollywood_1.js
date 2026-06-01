const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const newData = {
    "Alfred Hitchcock": [
        {
            "id": "vertigo",
            "title": "Vertigo",
            "year": 1958,
            "director": "Alfred Hitchcock",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dizzying, subjective camera movements, intense color psychology.",
            "plot": "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
            "releaseDate": "1958-01-01",
            "writer": "Alec Coppel / Samuel A. Taylor",
            "cinematographer": "Robert Burks",
            "editor": "George Tomasini",
            "composer": "Bernard Herrmann",
            "studio": "Paramount Pictures / Alfred J. Hitchcock Productions"
        },
        {
            "id": "psycho",
            "title": "Psycho",
            "year": 1960,
            "director": "Alfred Hitchcock",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, high-contrast black-and-white photography, shocking rapid-fire editing.",
            "plot": "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
            "releaseDate": "1960-01-01",
            "writer": "Joseph Stefano",
            "cinematographer": "John L. Russell",
            "editor": "George Tomasini",
            "composer": "Bernard Herrmann",
            "studio": "Shamley Productions / Paramount Pictures"
        },
        {
            "id": "rear-window",
            "title": "Rear Window",
            "year": 1954,
            "director": "Alfred Hitchcock",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Voyeuristic POV shots meticulously confined to a single apartment set.",
            "plot": "A wheelchair-bound photographer spies on his neighbors from his Greenwich Village courtyard apartment window, and becomes convinced one of them has committed murder.",
            "releaseDate": "1954-01-01",
            "writer": "John Michael Hayes",
            "cinematographer": "Robert Burks",
            "editor": "George Tomasini",
            "composer": "Franz Waxman",
            "studio": "Paramount Pictures / Patron Inc."
        },
        {
            "id": "north-by-northwest",
            "title": "North by Northwest",
            "year": 1959,
            "director": "Alfred Hitchcock",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Expansive, dynamic VistaVision widescreen photography, iconic monumental set pieces.",
            "plot": "A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies.",
            "releaseDate": "1959-01-01",
            "writer": "Ernest Lehman",
            "cinematographer": "Robert Burks",
            "editor": "George Tomasini",
            "composer": "Bernard Herrmann",
            "studio": "Metro-Goldwyn-Mayer (MGM)"
        },
        {
            "id": "rope",
            "title": "Rope",
            "year": 1948,
            "director": "Alfred Hitchcock",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Technicolor unbroken continuous takes seamlessly edited to appear as a single shot.",
            "plot": "Two men attempt to prove they committed the perfect crime by hosting a dinner party after strangling their former classmate to death.",
            "releaseDate": "1948-01-01",
            "writer": "Arthur Laurents",
            "cinematographer": "William V. Skall / Joseph A. Valentine",
            "editor": "William H. Ziegler",
            "composer": "Leo F. Forbstein",
            "studio": "Warner Bros. / Transatlantic Pictures"
        }
    ],
    "Orson Welles": [
        {
            "id": "citizen-kane",
            "title": "Citizen Kane",
            "year": 1941,
            "director": "Orson Welles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Revolutionary deep focus photography, expressionistic low-angle shots, dramatic chiaroscuro.",
            "plot": "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance.",
            "releaseDate": "1941-01-01",
            "writer": "Herman J. Mankiewicz / Orson Welles",
            "cinematographer": "Gregg Toland",
            "editor": "Robert Wise",
            "composer": "Bernard Herrmann",
            "studio": "Mercury Productions / RKO Radio Pictures"
        },
        {
            "id": "touch-of-evil",
            "title": "Touch of Evil",
            "year": 1958,
            "director": "Orson Welles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Virtuoso continuous tracking shots, extremely distorted wide-angle lenses, stark noir shadows.",
            "plot": "A stark, perverse story of murder, kidnapping, and police corruption in a Mexican border town.",
            "releaseDate": "1958-01-01",
            "writer": "Orson Welles",
            "cinematographer": "Russell Metty",
            "editor": "Virgil W. Vogel / Aaron Stell",
            "composer": "Henry Mancini",
            "studio": "Universal International Pictures"
        },
        {
            "id": "the-magnificent-ambersons",
            "title": "The Magnificent Ambersons",
            "year": 1942,
            "director": "Orson Welles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Elaborate, fluid tracking shots, intricate multi-layered dialogue, melancholy lighting.",
            "plot": "The spoiled heir of a decaying American aristocratic family struggles to adapt to the changing industrial world.",
            "releaseDate": "1942-01-01",
            "writer": "Orson Welles",
            "cinematographer": "Stanley Cortez",
            "editor": "Robert Wise",
            "composer": "Bernard Herrmann",
            "studio": "Mercury Productions / RKO Radio Pictures"
        },
        {
            "id": "chimes-at-midnight",
            "title": "Chimes at Midnight",
            "year": 1965,
            "director": "Orson Welles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, chaotic, brutally immersive battle sequences using handheld cameras.",
            "plot": "The career of Shakespeare's Sir John Falstaff as a roistering companion to young Prince Hal.",
            "releaseDate": "1965-01-01",
            "writer": "Orson Welles",
            "cinematographer": "Edmond Richard",
            "editor": "Elena Jaumandreu",
            "composer": "Angelo Francesco Lavagnino",
            "studio": "Internacional Films / Alpine Productions"
        },
        {
            "id": "the-lady-from-shanghai",
            "title": "The Lady from Shanghai",
            "year": 1947,
            "director": "Orson Welles",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dazzling, surrealistic set pieces including a famous fragmented hall of mirrors sequence.",
            "plot": "Fascinated by a gorgeous woman, a seaman becomes involved in a complex murder plot.",
            "releaseDate": "1947-01-01",
            "writer": "Orson Welles",
            "cinematographer": "Charles Lawton Jr.",
            "editor": "Viola Lawrence",
            "composer": "Heinz Roemheld",
            "studio": "Columbia Pictures / Mercury Productions"
        }
    ],
    "Billy Wilder": [
        {
            "id": "sunset-boulevard",
            "title": "Sunset Boulevard",
            "year": 1950,
            "director": "Billy Wilder",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gothic noir aesthetics, cynical voiceover, deeply cynical look at Hollywood.",
            "plot": "A screenwriter develops a dangerous relationship with a faded silent film star determined to make a triumphant return.",
            "releaseDate": "1950-01-01",
            "writer": "Charles Brackett / Billy Wilder / D.M. Marshman Jr.",
            "cinematographer": "John F. Seitz",
            "editor": "Arthur P. Schmidt",
            "composer": "Franz Waxman",
            "studio": "Paramount Pictures"
        },
        {
            "id": "some-like-it-hot",
            "title": "Some Like It Hot",
            "year": 1959,
            "director": "Billy Wilder",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Fast-paced, razor-sharp dialogue, brilliant comedic timing, luminous black-and-white.",
            "plot": "After witnessing a Mafia murder, slick saxophone player Joe and his long-suffering buddy, Jerry, improvise a quick plan to escape from Chicago with their lives.",
            "releaseDate": "1959-01-01",
            "writer": "Billy Wilder / I.A.L. Diamond",
            "cinematographer": "Charles Lang",
            "editor": "Arthur P. Schmidt",
            "composer": "Adolph Deutsch",
            "studio": "Mirisch Company / Ashton Productions"
        },
        {
            "id": "the-apartment",
            "title": "The Apartment",
            "year": 1960,
            "director": "Billy Wilder",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Melancholic corporate realism, precise framing utilizing deep office sets.",
            "plot": "A man tries to rise in his company by letting its executives use his apartment for trysts, but complications and a romance of his own ensue.",
            "releaseDate": "1960-01-01",
            "writer": "Billy Wilder / I.A.L. Diamond",
            "cinematographer": "Joseph LaShelle",
            "editor": "Daniel Mandell",
            "composer": "Adolph Deutsch",
            "studio": "Mirisch Company"
        },
        {
            "id": "double-indemnity",
            "title": "Double Indemnity",
            "year": 1944,
            "director": "Billy Wilder",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Defining film noir lighting, venetian blind shadows, taut and cynical atmosphere.",
            "plot": "An insurance representative lets himself be talked by a seductive housewife into a murder/insurance fraud scheme.",
            "releaseDate": "1944-01-01",
            "writer": "Billy Wilder / Raymond Chandler",
            "cinematographer": "John F. Seitz",
            "editor": "Doane Harrison",
            "composer": "Miklós Rózsa",
            "studio": "Paramount Pictures"
        },
        {
            "id": "ace-in-the-hole",
            "title": "Ace in the Hole",
            "year": 1951,
            "director": "Billy Wilder",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Searing, uncompromisingly cynical portrayal of media manipulation and human greed.",
            "plot": "A frustrated former big-city journalist now stuck working for an Albuquerque newspaper exploits a story about a man trapped in a cave to re-jump start his career.",
            "releaseDate": "1951-01-01",
            "writer": "Billy Wilder / Lesser Samuels / Walter Newman",
            "cinematographer": "Charles Lang",
            "editor": "Arthur P. Schmidt",
            "composer": "Hugo Friedhofer",
            "studio": "Paramount Pictures"
        }
    ],
    "John Ford": [
        {
            "id": "the-searchers",
            "title": "The Searchers",
            "year": 1956,
            "director": "John Ford",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Monument Valley landscapes, psychological complexity, iconic framing through doorways.",
            "plot": "An American Civil War veteran embarks on a years-long journey to rescue his niece from the Comanches.",
            "releaseDate": "1956-01-01",
            "writer": "Frank S. Nugent",
            "cinematographer": "Winton C. Hoch",
            "editor": "Jack Murray",
            "composer": "Max Steiner",
            "studio": "C.V. Whitney Pictures"
        },
        {
            "id": "stagecoach",
            "title": "Stagecoach",
            "year": 1939,
            "director": "John Ford",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Defined the modern Western, sweeping scenery, intense stunt work.",
            "plot": "A group of people traveling on a stagecoach find their journey complicated by the threat of Geronimo.",
            "releaseDate": "1939-01-01",
            "writer": "Dudley Nichols",
            "cinematographer": "Bert Glennon",
            "editor": "Otho Lovering / Dorothy Spencer",
            "composer": "Richard Hageman / W. Franke Harling / John Leipold / Leo Shuken",
            "studio": "Walter Wanger Productions"
        },
        {
            "id": "the-grapes-of-wrath",
            "title": "The Grapes of Wrath",
            "year": 1940,
            "director": "John Ford",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stark, depression-era documentary-style realism blended with poetic shadows.",
            "plot": "A poor Midwest family is forced off their land. They travel to California, suffering the misfortunes of the homeless in the Great Depression.",
            "releaseDate": "1940-01-01",
            "writer": "Nunnally Johnson",
            "cinematographer": "Gregg Toland",
            "editor": "Robert L. Simpson",
            "composer": "Alfred Newman",
            "studio": "Twentieth Century Fox"
        },
        {
            "id": "liberty-valance",
            "title": "The Man Who Shot Liberty Valance",
            "year": 1962,
            "director": "John Ford",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Melancholic, studio-bound black-and-white questioning the mythology of the West.",
            "plot": "A senator returns to a Western town for the funeral of an old friend and tells the story of his origins.",
            "releaseDate": "1962-01-01",
            "writer": "James Warner Bellah / Willis Goldbeck",
            "cinematographer": "William H. Clothier",
            "editor": "Otho Lovering",
            "composer": "Cyril J. Mockridge",
            "studio": "John Ford Productions / Paramount Pictures"
        },
        {
            "id": "my-darling-clementine",
            "title": "My Darling Clementine",
            "year": 1946,
            "director": "John Ford",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Poetic, atmospheric, myth-making take on the OK Corral legend.",
            "plot": "Wyatt Earp and his brothers stop in Tombstone, Arizona, where they clash with the Clanton gang.",
            "releaseDate": "1946-01-01",
            "writer": "Samuel G. Engel / Winston Miller",
            "cinematographer": "Joseph P. MacDonald",
            "editor": "Dorothy Spencer",
            "composer": "Cyril J. Mockridge",
            "studio": "Twentieth Century Fox"
        }
    ],
    "Howard Hawks": [
        {
            "id": "bringing-up-baby",
            "title": "Bringing Up Baby",
            "year": 1938,
            "director": "Howard Hawks",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lightning-fast dialogue, perfectly timed screwball physical comedy.",
            "plot": "While trying to secure a $1 million donation for his museum, a befuddled paleontologist is pursued by a flighty and often irritating heiress.",
            "releaseDate": "1938-01-01",
            "writer": "Dudley Nichols / Hagar Wilde",
            "cinematographer": "Russell Metty",
            "editor": "George Hively",
            "composer": "Roy Webb",
            "studio": "RKO Radio Pictures"
        },
        {
            "id": "his-girl-friday",
            "title": "His Girl Friday",
            "year": 1940,
            "director": "Howard Hawks",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Rapid-fire overlapping dialogue, relentless pacing in a bustling newsroom setting.",
            "plot": "A newspaper editor uses every trick in the book to keep his ace reporter ex-wife from remarrying.",
            "releaseDate": "1940-01-01",
            "writer": "Charles Lederer",
            "cinematographer": "Joseph Walker",
            "editor": "Gene Havlick",
            "composer": "Morris Stoloff",
            "studio": "Columbia Pictures"
        },
        {
            "id": "the-big-sleep",
            "title": "The Big Sleep",
            "year": 1946,
            "director": "Howard Hawks",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dense, labyrinthine narrative driven by undeniable star chemistry and atmosphere.",
            "plot": "Private detective Philip Marlowe is hired by a wealthy family, leading him into a complex web of murder and blackmail.",
            "releaseDate": "1946-01-01",
            "writer": "William Faulkner / Leigh Brackett / Jules Furthman",
            "cinematographer": "Sidney Hickox",
            "editor": "Christian Nyby",
            "composer": "Max Steiner",
            "studio": "Warner Bros."
        },
        {
            "id": "rio-bravo",
            "title": "Rio Bravo",
            "year": 1959,
            "director": "Howard Hawks",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Relaxed pacing emphasizing camaraderie, professionalism, and character dynamics.",
            "plot": "A small-town sheriff enlists the help of a cripple, a drunk, and a young gunfighter to hold a murderer in jail.",
            "releaseDate": "1959-01-01",
            "writer": "Jules Furthman / Leigh Brackett",
            "cinematographer": "Russell Harlan",
            "editor": "Folmar Blangsted",
            "composer": "Dimitri Tiomkin",
            "studio": "Armada Productions"
        },
        {
            "id": "scarface",
            "title": "Scarface",
            "year": 1932,
            "director": "Howard Hawks",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Brutal, fast-paced early gangster violence with recurring 'X' motifs signaling death.",
            "plot": "An ambitious and near-insane mobster climbs the ranks of success in the mob, but his weaknesses prove to be his downfall.",
            "releaseDate": "1932-01-01",
            "writer": "Ben Hecht",
            "cinematographer": "Lee Garmes / L. William O'Connell",
            "editor": "Edward Curtiss",
            "composer": "Adolf Tandler",
            "studio": "The Caddo Company"
        }
    ],
    "Elia Kazan": [
        {
            "id": "on-the-waterfront",
            "title": "On the Waterfront",
            "year": 1954,
            "director": "Elia Kazan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Intensely naturalistic method acting, gritty on-location freezing docks realism.",
            "plot": "An ex-prize fighter turned New Jersey longshoreman struggles to stand up to his corrupt union bosses.",
            "releaseDate": "1954-01-01",
            "writer": "Budd Schulberg",
            "cinematographer": "Boris Kaufman",
            "editor": "Gene Milford",
            "composer": "Leonard Bernstein",
            "studio": "Horizon Pictures"
        },
        {
            "id": "streetcar-named-desire",
            "title": "A Streetcar Named Desire",
            "year": 1951,
            "director": "Elia Kazan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Claustrophobic, sweaty, emotionally raw sets closing in on the fragile protagonist.",
            "plot": "Disturbed Blanche DuBois moves in with her sister in New Orleans and is tormented by her brutish brother-in-law.",
            "releaseDate": "1951-01-01",
            "writer": "Tennessee Williams",
            "cinematographer": "Harry Stradling Sr.",
            "editor": "David Weisbart",
            "composer": "Alex North",
            "studio": "Charles K. Feldman Group"
        },
        {
            "id": "east-of-eden",
            "title": "East of Eden",
            "year": 1955,
            "director": "Elia Kazan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Expressive CinemaScope framing and highly emotional, dramatic use of color.",
            "plot": "A willful young man contends against his brother for the attention of their religious father.",
            "releaseDate": "1955-01-01",
            "writer": "Paul Osborn",
            "cinematographer": "Ted D. McCord",
            "editor": "Owen Marks",
            "composer": "Leonard Rosenman",
            "studio": "Warner Bros."
        },
        {
            "id": "a-face-in-the-crowd",
            "title": "A Face in the Crowd",
            "year": 1957,
            "director": "Elia Kazan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Caustic, energetic, media-savvy framing of a demagogue's terrifying rise to power.",
            "plot": "An Arkansas drifter becomes an overnight media sensation, growing dangerously drunk on his newfound power.",
            "releaseDate": "1957-01-01",
            "writer": "Budd Schulberg",
            "cinematographer": "Harry Stradling Sr. / Gayne Rescher",
            "editor": "Gene Milford",
            "composer": "Tom Glazer",
            "studio": "Newtown Productions"
        },
        {
            "id": "splendor-in-the-grass",
            "title": "Splendor in the Grass",
            "year": 1961,
            "director": "Elia Kazan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, evocative, melodramatic framing of repressed teenage sexuality and tragedy.",
            "plot": "Two high school sweethearts grapple with the oppressive expectations of their parents and society.",
            "releaseDate": "1961-01-01",
            "writer": "William Inge",
            "cinematographer": "Boris Kaufman",
            "editor": "Gene Milford",
            "composer": "David Amram",
            "studio": "NBI Productions"
        }
    ],
    "Sidney Lumet": [
        {
            "id": "12-angry-men",
            "title": "12 Angry Men",
            "year": 1957,
            "director": "Sidney Lumet",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Masterclass in blocking; increasingly tight lenses escalating claustrophobic tension.",
            "plot": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
            "releaseDate": "1957-01-01",
            "writer": "Reginald Rose",
            "cinematographer": "Boris Kaufman",
            "editor": "Carl Lerner",
            "composer": "Kenyon Hopkins",
            "studio": "Orion-Nova Productions"
        },
        {
            "id": "dog-day-afternoon",
            "title": "Dog Day Afternoon",
            "year": 1975,
            "director": "Sidney Lumet",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Hyper-realistic, gritty NYC street energy, entirely lacking a non-diegetic score.",
            "plot": "Three amateur bank robbers plan to hold up a bank. A simple robbery quickly goes wrong.",
            "releaseDate": "1975-01-01",
            "writer": "Frank Pierson",
            "cinematographer": "Victor J. Kemper",
            "editor": "Dede Allen",
            "composer": "Compiled Soundtrack",
            "studio": "Warner Bros. / Artists Entertainment Complex"
        },
        {
            "id": "network",
            "title": "Network",
            "year": 1976,
            "director": "Sidney Lumet",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Clinical, cynical corporate lighting contrasting with blistering, theatrical monologues.",
            "plot": "A television network cynically exploits a deranged former anchor's ravings and revelations about the news media.",
            "releaseDate": "1976-01-01",
            "writer": "Paddy Chayefsky",
            "cinematographer": "Owen Roizman",
            "editor": "Alan Heim",
            "composer": "Elliot Lawrence",
            "studio": "Metro-Goldwyn-Mayer (MGM) / United Artists"
        },
        {
            "id": "the-verdict",
            "title": "The Verdict",
            "year": 1982,
            "director": "Sidney Lumet",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Muted, autumnal tones, deeply shadowed interiors matching moral ambiguity.",
            "plot": "A down-on-his-luck lawyer takes on a medical malpractice case to save his own career and self-respect.",
            "releaseDate": "1982-01-01",
            "writer": "David Mamet",
            "cinematographer": "Andrzej Bartkowiak",
            "editor": "Peter C. Frank",
            "composer": "Johnny Mandel",
            "studio": "Fox Zanuck-Brown Production"
        },
        {
            "id": "serpico",
            "title": "Serpico",
            "year": 1973,
            "director": "Sidney Lumet",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, handheld verite style capturing the dirty, authentic streets of 1970s New York.",
            "plot": "An honest New York cop blows the whistle on rampant corruption in the force, making him a target.",
            "releaseDate": "1973-01-01",
            "writer": "Waldo Salt / Norman Wexler",
            "cinematographer": "Arthur J. Ornitz",
            "editor": "Dede Allen / Richard Marks",
            "composer": "Mikis Theodorakis",
            "studio": "Artists Entertainment Complex / Dino De Laurentiis Cinematografica"
        }
    ],
    "Stanley Kubrick": [
        {
            "id": "2001-a-space-odyssey",
            "title": "2001: A Space Odyssey",
            "year": 1968,
            "director": "Stanley Kubrick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Pioneering practical effects, meticulous symmetry, profound visual storytelling.",
            "plot": "After uncovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins.",
            "releaseDate": "1968-01-01",
            "writer": "Stanley Kubrick / Arthur C. Clarke",
            "cinematographer": "Geoffrey Unsworth",
            "editor": "Ray Lovejoy",
            "composer": "Richard Strauss / Johann Strauss II / György Ligeti",
            "studio": "Metro-Goldwyn-Mayer (MGM)"
        },
        {
            "id": "the-shining",
            "title": "The Shining",
            "year": 1980,
            "director": "Stanley Kubrick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Revolutionary Steadicam tracking shots, oppressive symmetry, labyrinthine spaces.",
            "plot": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
            "releaseDate": "1980-01-01",
            "writer": "Stanley Kubrick / Diane Johnson",
            "cinematographer": "John Alcott",
            "editor": "Ray Lovejoy",
            "composer": "Wendy Carlos / Rachel Elkind",
            "studio": "Warner Bros. / Hawk Films"
        },
        {
            "id": "a-clockwork-orange",
            "title": "A Clockwork Orange",
            "year": 1971,
            "director": "Stanley Kubrick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Distorted wide-angle lenses, stark pop-art aesthetics, chilling slow-motion.",
            "plot": "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment.",
            "releaseDate": "1971-01-01",
            "writer": "Stanley Kubrick",
            "cinematographer": "John Alcott",
            "editor": "Bill Butler",
            "composer": "Wendy Carlos",
            "studio": "Warner Bros. / Hawk Films"
        },
        {
            "id": "dr-strangelove",
            "title": "Dr. Strangelove",
            "year": 1964,
            "director": "Stanley Kubrick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Documentary-style combat footage contrasting with expressionistic, absurd war room lighting.",
            "plot": "An unhinged American general orders a bombing attack on the Soviet Union, triggering a path to nuclear holocaust.",
            "releaseDate": "1964-01-01",
            "writer": "Stanley Kubrick / Peter George / Terry Southern",
            "cinematographer": "Gilbert Taylor",
            "editor": "Anthony Harvey",
            "composer": "Laurie Johnson",
            "studio": "Hawk Films / Columbia Pictures"
        },
        {
            "id": "barry-lyndon",
            "title": "Barry Lyndon",
            "year": 1975,
            "director": "Stanley Kubrick",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Painterly composition, entirely naturally lit including extreme low-light candlelight scenes using NASA lenses.",
            "plot": "An Irish rogue wins the heart of a rich widow and assumes her dead husband's aristocratic position.",
            "releaseDate": "1975-01-01",
            "writer": "Stanley Kubrick",
            "cinematographer": "John Alcott",
            "editor": "Tony Lawson",
            "composer": "Leonard Rosenman",
            "studio": "Hawk Films / Warner Bros."
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
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
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
        console.log("Successfully updated Hollywood & North American Masters");
    }
}

run();
