const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'roberto-rossellini': [
        {
            title: "Rome, Open City",
            year: 1945,
            director: "Roberto Rossellini",
            writer: "Sergio Amidei / Federico Fellini / Roberto Rossellini",
            cinematographer: "Ubaldo Arata",
            editor: "Eraldo Da Roma",
            composer: "Renzo Rossellini",
            studio: "Excelsa Film",
            focus: "A foundational text of Italian Neorealism, shot on the ruined streets of post-war Rome using available light and non-professional actors to create staggering documentary-like authenticity.",
            plot: "During the brutal Nazi occupation of Rome in 1944, a brave Resistance leader seeks refuge with a sympathetic priest and a pregnant widow as the Gestapo ruthlessly hunts him down.",
            releaseDate: "September 24, 1945",
            country: "Italy"
        },
        {
            title: "Paisan",
            year: 1946,
            director: "Roberto Rossellini",
            writer: "Sergio Amidei / Federico Fellini / Roberto Rossellini / Klaus Mann",
            cinematographer: "Otello Martelli",
            editor: "Eraldo Da Roma",
            composer: "Renzo Rossellini",
            studio: "Organizzazione Film Internazionali (OFI)",
            focus: "Episodic narrative structure spanning the length of Italy, blending newsreel-style documentary footage with raw, improvised drama capturing the immediate aftermath of war.",
            plot: "Told in six distinct episodes moving from Sicily to the Po Valley, the film chronicles the complex, often tragic interactions between advancing American soldiers and the newly liberated Italian people.",
            releaseDate: "December 10, 1946",
            country: "Italy"
        },
        {
            title: "Germany, Year Zero",
            year: 1948,
            director: "Roberto Rossellini",
            writer: "Roberto Rossellini",
            cinematographer: "Robert Juillard",
            editor: "Eraldo Da Roma",
            composer: "Renzo Rossellini",
            studio: "Tevere Film / Sadfi / Union Générale Cinématographique",
            focus: "Bleak, uncompromising realism shot amidst the actual pulverized ruins of Berlin, utilizing a hauntingly objective camera to observe a society stripped of all moral foundation.",
            plot: "In the devastated, bombed-out ruins of post-WWII Berlin, a desperate 12-year-old boy struggles to support his starving family, falling under the corrupting influence of a former Nazi teacher.",
            releaseDate: "December 1, 1948",
            country: "Italy / Germany / France"
        }
    ],
    'vittorio-de-sica': [
        {
            title: "Bicycle Thieves",
            year: 1948,
            director: "Vittorio De Sica",
            writer: "Cesare Zavattini",
            cinematographer: "Carlo Montuori",
            editor: "Eraldo Da Roma",
            composer: "Alessandro Cicognini",
            studio: "Produzioni De Sica (PDS)",
            focus: "Pinnacle of Neorealist melodrama, featuring heartbreaking performances from non-professional actors and deep-focus street photography that captures the stark reality of working-class desperation.",
            plot: "An impoverished, unemployed father in post-war Rome finally secures a job hanging posters, but when his bicycle—essential for the work—is stolen, he and his young son desperately scour the city to find it.",
            releaseDate: "November 24, 1948",
            country: "Italy"
        },
        {
            title: "Shoeshine",
            year: 1946,
            director: "Vittorio De Sica",
            writer: "Cesare Zavattini / Sergio Amidei / Adolfo Franci / C.G. Viola",
            cinematographer: "Anchise Brizzi",
            editor: "Niccolò Lazzari",
            composer: "Alessandro Cicognini",
            studio: "Società Cooperativa Alfa Film",
            focus: "Unsentimental, harsh depiction of childhood innocence destroyed by institutional corruption, characterized by gritty urban locations and a deeply humanist lens.",
            plot: "Two young Italian shoeshine boys, trying to save enough money to buy a horse, are inadvertently drawn into a black-market scam and sent to a brutal juvenile prison that destroys their friendship.",
            releaseDate: "April 27, 1946",
            country: "Italy"
        },
        {
            title: "Umberto D.",
            year: 1952,
            director: "Vittorio De Sica",
            writer: "Cesare Zavattini",
            cinematographer: "G.R. Aldo",
            editor: "Eraldo Da Roma",
            composer: "Alessandro Cicognini",
            studio: "Rizzoli Film / Amato Film / Produzioni De Sica",
            focus: "The swansong of classic Neorealism; an uncompromisingly bleak, rigorously unsentimental portrait of old age, defined by its stark simplicity and devastating emotional restraint.",
            plot: "An elderly, dignified retired civil servant living in Rome with only his beloved dog for company struggles desperately to survive on a meager pension while facing eviction by his callous landlady.",
            releaseDate: "January 20, 1952",
            country: "Italy"
        }
    ],
    'luchino-visconti': [
        {
            title: "Ossessione",
            year: 1943,
            director: "Luchino Visconti",
            writer: "Luchino Visconti",
            cinematographer: "Aldo Tonti / Domenico Scala",
            editor: "Mario Serandrei",
            composer: "Giuseppe Rosati",
            studio: "ICI (Industrie Cinematografiche Italiane)",
            focus: "The unofficial birth of Neorealism, blending sweaty, grimy provincial realism with the sweaty, fatalistic passion of American noir, breaking decisively from the polished 'White Telephone' cinema of the era.",
            plot: "A handsome, drifiting vagabond stops at a roadside inn where he falls into a torrid, destructive affair with the unhappy wife of the inn's boorish owner, leading to a deadly conspiracy.",
            releaseDate: "May 16, 1943",
            country: "Italy"
        },
        {
            title: "The Leopard",
            year: 1963,
            director: "Luchino Visconti",
            writer: "Suso Cecchi d'Amico / Pasquale Festa Campanile / Luchino Visconti",
            cinematographer: "Giuseppe Rotunno",
            editor: "Mario Serandrei",
            composer: "Nino Rota",
            studio: "Titanus / Société Nouvelle Pathé Cinéma",
            focus: "Sumptuous, operatic widescreen grandeur, featuring astonishingly lavish production design, sweeping tracking shots, and a deeply melancholic, historical perspective on aristocratic decay.",
            plot: "During the turbulent unification of Italy in the 1860s, a noble, aging Sicilian prince attempts to preserve his family's legacy and aristocratic privilege by arranging a marriage between his opportunistic nephew and the daughter of a wealthy merchant.",
            releaseDate: "March 28, 1963",
            country: "Italy / France"
        },
        {
            title: "Rocco and His Brothers",
            year: 1960,
            director: "Luchino Visconti",
            writer: "Suso Cecchi d'Amico / Luchino Visconti / Pasquale Festa Campanile",
            cinematographer: "Giuseppe Rotunno",
            editor: "Mario Serandrei",
            composer: "Nino Rota",
            studio: "Titanus / Les Films Marceau",
            focus: "Epic, novelistic structure combining raw urban realism with grand operatic tragedy, featuring stark, high-contrast cinematography that captures the harsh reality of Northern industrialization.",
            plot: "A destitute widow and her five sons migrate from the impoverished rural south of Italy to the industrial north of Milan, where the brutal realities of urban life, boxing, and a shared obsession with a local prostitute tear the family apart.",
            releaseDate: "September 6, 1960",
            country: "Italy / France"
        }
    ],
    'giuseppe-de-santis': [
        {
            title: "Bitter Rice",
            year: 1949,
            director: "Giuseppe De Santis",
            writer: "Giuseppe De Santis",
            cinematographer: "Piero Portalupi",
            editor: "Gabriele Varriale",
            composer: "Goffredo Petrassi",
            studio: "Lux Film",
            focus: "A unique fusion of Marxist social critique with Hollywood-style genre elements (crime, noir, melodrama) and bold, dynamic crane shots that emphasize the collective labor of the working class.",
            plot: "In the muddy rice fields of Northern Italy, the grueling, exploitative lives of female agricultural workers are disrupted when a pair of thieves hiding stolen jewels infiltrate the camp, leading to romance, betrayal, and tragedy.",
            releaseDate: "September 21, 1949",
            country: "Italy"
        }
    ],
    'federico-fellini': [
        {
            title: "8½",
            year: 1963,
            director: "Federico Fellini",
            writer: "Federico Fellini",
            cinematographer: "Gianni Di Venanzo",
            editor: "Leo Catozzo",
            composer: "Nino Rota",
            studio: "Cineriz / Francinex",
            focus: "A dizzying, surreal masterclass in subjective filmmaking, characterized by fluid, dream-logic editing, dazzlingly complex choreography of extras, and a complete dissolution of the boundary between reality and imagination.",
            plot: "A celebrated but creatively bankrupt Italian film director retreats to a luxury spa to overcome 'director's block', only to find his life collapsing into a surreal swirl of memories, fantasies, and the demanding women in his life.",
            releaseDate: "February 14, 1963",
            country: "Italy / France"
        },
        {
            title: "La Dolce Vita",
            year: 1960,
            director: "Federico Fellini",
            writer: "Federico Fellini",
            cinematographer: "Otello Martelli",
            editor: "Leo Catozzo",
            composer: "Nino Rota",
            studio: "Riama Film / Pathé Consortium Cinéma",
            focus: "Expansive, episodic widescreen compositions contrasting ancient Roman ruins with sterile modern architecture, capturing the spectacular yet deeply hollow decadence of the post-war economic boom.",
            plot: "Over seven decadent days and nights, a disillusioned, gossip-mongering journalist wanders through the superficial, glamorous, and spiritually empty high society of modern Rome in search of love and meaning.",
            releaseDate: "February 5, 1960",
            country: "Italy / France"
        },
        {
            title: "La Strada",
            year: 1954,
            director: "Federico Fellini",
            writer: "Federico Fellini",
            cinematographer: "Otello Martelli",
            editor: "Leo Catozzo",
            composer: "Nino Rota",
            studio: "Ponti-De Laurentiis Cinematografica",
            focus: "The pivotal transition from strict Neorealism to 'Felliniesque' poetic fable, utilizing bleak coastal landscapes to mirror psychological desolation, anchored by Nino Rota's melancholic, circus-inspired score.",
            plot: "A naive, childlike young woman is sold by her impoverished mother to a brutal, traveling circus strongman, enduring extreme hardship as they journey across the desolate Italian countryside.",
            releaseDate: "September 22, 1954",
            country: "Italy"
        }
    ],
    'michelangelo-antonioni': [
        {
            title: "L'Avventura",
            year: 1960,
            director: "Michelangelo Antonioni",
            writer: "Michelangelo Antonioni",
            cinematographer: "Aldo Scavarda",
            editor: "Eraldo Da Roma",
            composer: "Giovanni Fusco",
            studio: "Cino Del Duca / Produzioni Cinematografiche Europee / Société Cinématographique Lyre",
            focus: "Pioneering 'temps mort' (dead time) pacing, revolutionary subversion of narrative resolution, and rigorous architectural framing that visually externalizes the alienation of the bourgeoisie.",
            plot: "During a yachting trip off the coast of Sicily, a wealthy young woman mysteriously disappears on a desolate volcanic island. Her lover and her best friend search for her, but soon drift into a detached, guilty romance of their own.",
            releaseDate: "May 14, 1960",
            country: "Italy / France"
        },
        {
            title: "Blow-Up",
            year: 1966,
            director: "Michelangelo Antonioni",
            writer: "Michelangelo Antonioni",
            cinematographer: "Carlo Di Palma",
            editor: "Frank Clarke",
            composer: "Herbie Hancock",
            studio: "Carlo Ponti Production / Metro-Goldwyn-Mayer",
            focus: "Vibrant, mod-era color palettes representing 'Swinging London', an obsession with the deceptive nature of the photographic image, and a chillingly objective, detached camera style.",
            plot: "A successful, deeply arrogant London fashion photographer casually snaps photos of a couple in a park, only to discover upon enlarging the images that he may have unwittingly captured a murder.",
            releaseDate: "December 18, 1966",
            country: "United Kingdom / Italy / United States"
        },
        {
            title: "La Notte",
            year: 1961,
            director: "Michelangelo Antonioni",
            writer: "Michelangelo Antonioni / Ennio Flaiano / Tonino Guerra",
            cinematographer: "Gianni Di Venanzo",
            editor: "Eraldo Da Roma",
            composer: "Giorgio Gaslini",
            studio: "Nepi Film / Sofitedip / Silver Films",
            focus: "Stark, high-contrast black-and-white cinematography mapping the cold, geometric lines of modern Milan onto the spiritual emptiness and emotional paralysis of its affluent protagonists.",
            plot: "Over the course of one long day and night in Milan, a successful novelist and his frustrated wife wander through a hospital, a nightclub, and a lavish billionaire's party, confronting the profound alienation and death of their marriage.",
            releaseDate: "January 24, 1961",
            country: "Italy / France"
        }
    ],
    'pier-paolo-pasolini': [
        {
            title: "The Gospel According to St. Matthew",
            year: 1964,
            director: "Pier Paolo Pasolini",
            writer: "Pier Paolo Pasolini",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Luis Bacalov",
            studio: "Arco Film / Lux Compagnie Cinématographique de France",
            focus: "A Marxist, fiercely unsentimental interpretation of scripture, featuring raw, unpolished black-and-white photography, anachronistic world music, and striking close-ups of weathered, non-professional peasant faces.",
            plot: "A stark, fiercely literal retelling of the life of Jesus Christ, portraying him not as a divine, serene savior, but as a fiery, radical political revolutionary speaking directly to the impoverished and oppressed.",
            releaseDate: "October 2, 1964",
            country: "Italy / France"
        },
        {
            title: "Mamma Roma",
            year: 1962,
            director: "Pier Paolo Pasolini",
            writer: "Pier Paolo Pasolini",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Carlo Rustichelli",
            studio: "Arco Film",
            focus: "Subverting Neorealism by infusing working-class poverty with the grandeur of Renaissance painting and classical tragedy, elevating the marginalized to mythic status.",
            plot: "A passionate, middle-aged prostitute attempts to leave her sordid past behind and build a respectable, middle-class life for her teenage son, but the unforgiving nature of the Roman underclass threatens to drag them both down.",
            releaseDate: "September 22, 1962",
            country: "Italy"
        },
        {
            title: "Accattone",
            year: 1961,
            director: "Pier Paolo Pasolini",
            writer: "Pier Paolo Pasolini",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Johann Sebastian Bach",
            studio: "Arco Film / Cino Del Duca",
            focus: "The startling juxtaposition of squalid, dusty Roman slums with the sacred, transcendent music of J.S. Bach, framing the lives of pimps and thieves with religious reverence.",
            plot: "A lazy, cynical pimp in the destitute outskirts of Rome loses his primary source of income when his prostitute is jailed, forcing him into an agonizing, ultimately doomed struggle for survival and redemption.",
            releaseDate: "November 22, 1961",
            country: "Italy"
        }
    ],
    'sergio-leone': [
        {
            title: "The Good, the Bad and the Ugly",
            year: 1966,
            director: "Sergio Leone",
            writer: "Luciano Vincenzoni / Sergio Leone",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Ennio Morricone",
            studio: "Produzioni Europee Associate (PEA) / Arturo González CP / Constantin Film",
            focus: "The ultimate 'Spaghetti Western' aesthetic: sweeping widescreen vistas contrasted with intense, sweat-drenched extreme close-ups, punctuated by Ennio Morricone's operatic, iconic score.",
            plot: "During the chaos of the American Civil War, three ruthless, double-crossing gunslingers—a mysterious loner, a sadistic hitman, and a Mexican bandit—compete in a deadly race to find a fortune in buried Confederate gold.",
            releaseDate: "December 23, 1966",
            country: "Italy / Spain / West Germany"
        },
        {
            title: "Once Upon a Time in the West",
            year: 1968,
            director: "Sergio Leone",
            writer: "Sergio Leone / Sergio Donati",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Ennio Morricone",
            studio: "Rafran Cinematografica / Paramount Pictures",
            focus: "A monumental, elegiac deconstruction of the Western myth, characterized by agonizingly stretched pacing, masterful tension building, and music intricately woven into the editing rhythm.",
            plot: "As the railroad violently expands across the American West, a harmonica-playing gunslinger, a ruthless assassin, a romantic bandit, and a widowed former prostitute are drawn into an epic conflict over a vital piece of land.",
            releaseDate: "December 21, 1968",
            country: "Italy / United States"
        },
        {
            title: "Once Upon a Time in America",
            year: 1984,
            director: "Sergio Leone",
            writer: "Leonardo Benvenuti / Piero De Bernardi / Enrico Medioli / Franco Arcalli / Franco Ferrini / Sergio Leone",
            cinematographer: "Tonino Delli Colli",
            editor: "Nino Baragli",
            composer: "Ennio Morricone",
            studio: "Producers Sales Organization / The Ladd Company",
            focus: "A sprawling, melancholic gangster epic spanning decades, defined by its complex, dream-like non-linear narrative, haunting transitions, and a pervasive sense of profound regret and lost time.",
            plot: "A former Jewish Prohibition-era gangster returns to the Lower East Side of Manhattan decades after betraying his closest friends, haunted by memories of his violent past and the tragic consequences of his ambition.",
            releaseDate: "June 1, 1984",
            country: "United States / Italy"
        }
    ],
    'bernardo-bertolucci': [
        {
            title: "The Conformist",
            year: 1970,
            director: "Bernardo Bertolucci",
            writer: "Bernardo Bertolucci",
            cinematographer: "Vittorio Storaro",
            editor: "Franco Arcalli",
            composer: "Georges Delerue",
            studio: "Mars Film / Marianne Productions / Maran Film",
            focus: "A visual masterpiece of fascist architecture, characterized by Vittorio Storaro's breathtakingly expressive use of color, intricate shadow play, and dizzying, slanted camera angles reflecting moral corruption.",
            plot: "In 1938, a weak-willed Italian aristocrat, desperate to conform to normal society, joins the Fascist secret police and agrees to assassinate his former college professor, who is now a political dissident in Paris.",
            releaseDate: "October 22, 1970",
            country: "Italy / France / West Germany"
        },
        {
            title: "Last Tango in Paris",
            year: 1972,
            director: "Bernardo Bertolucci",
            writer: "Bernardo Bertolucci",
            cinematographer: "Vittorio Storaro",
            editor: "Franco Arcalli",
            composer: "Gato Barbieri",
            studio: "PEA / Les Productions Artistes Associés",
            focus: "Claustrophobic, warmly lit interior spaces contrasting with the cold, gray reality of Paris, utilizing improvisational acting to capture raw, explosive emotional and sexual despair.",
            plot: "A grieving, middle-aged American widower and an engaged young Parisian woman enter into an intense, anonymous, and increasingly brutal sexual relationship in an empty apartment.",
            releaseDate: "October 14, 1972",
            country: "Italy / France / United States"
        },
        {
            title: "1900",
            year: 1976,
            director: "Bernardo Bertolucci",
            writer: "Franco Arcalli / Bernardo Bertolucci / Giuseppe Bertolucci",
            cinematographer: "Vittorio Storaro",
            editor: "Franco Arcalli",
            composer: "Ennio Morricone",
            studio: "PEA / Les Productions Artistes Associés / Artemis Film",
            focus: "A sprawling, Marxist historical epic, visually structured around the changing of the four seasons to reflect political shifts, utilizing grand, sweeping tracking shots across the Italian countryside.",
            plot: "Born on the exact same day in 1900, the son of a wealthy landowner and the son of a peasant bastard grow up as close friends, but their lives are violently torn apart by the rise of Fascism and class warfare in Italy.",
            releaseDate: "September 1, 1976",
            country: "Italy / France / West Germany"
        }
    ],
    'dino-risi': [
        {
            title: "The Easy Life",
            year: 1962,
            director: "Dino Risi",
            writer: "Dino Risi / Ettore Scola / Ruggero Maccari",
            cinematographer: "Alfio Contini",
            editor: "Maurizio Lucidi",
            composer: "Riz Ortolani",
            studio: "Incom / Fair Film",
            focus: "A cornerstone of 'Commedia all'italiana', utilizing kinetic, sun-drenched road movie aesthetics to deliver a sharp, profoundly cynical satire of Italy's hollow post-war economic miracle.",
            plot: "On the sweltering August holiday of Ferragosto, a brash, superficial playboy impulsively drags a shy, studious law student on a wild, reckless joyride along the Italian coast, leading to tragic consequences.",
            releaseDate: "December 5, 1962",
            country: "Italy"
        }
    ],
    'giuseppe-tornatore': [
        {
            title: "Cinema Paradiso",
            year: 1988,
            director: "Giuseppe Tornatore",
            writer: "Giuseppe Tornatore",
            cinematographer: "Blasco Giurato",
            editor: "Mario Morra",
            composer: "Ennio Morricone / Andrea Morricone",
            studio: "Cristaldifilm / Films Ariane",
            focus: "Unabashedly nostalgic, warm, and sentimental visual tone, celebrating the magic and communal experience of celluloid projection, elevated by Ennio Morricone's profoundly moving score.",
            plot: "A successful, world-weary film director returns to his Sicilian hometown for the first time in thirty years to attend the funeral of the old projectionist who fostered his love for cinema when he was a boy.",
            releaseDate: "November 17, 1988",
            country: "Italy / France"
        },
        {
            title: "The Legend of 1900",
            year: 1998,
            director: "Giuseppe Tornatore",
            writer: "Giuseppe Tornatore",
            cinematographer: "Lajos Koltai",
            editor: "Massimo Quaglia",
            composer: "Ennio Morricone",
            studio: "Medusa Film / Sciarlò",
            focus: "Lush, highly romanticized cinematography, grand, sweeping crane shots of ocean liners, and an enchanting, fable-like atmosphere centering on the transcendent power of music.",
            plot: "A musical prodigy, abandoned as a baby on an ocean liner and named '1900', spends his entire life aboard the ship, becoming an unparalleled piano virtuoso who refuses to ever set foot on dry land.",
            releaseDate: "October 28, 1998",
            country: "Italy"
        }
    ],
    'ettore-scola': [
        {
            title: "A Special Day",
            year: 1977,
            director: "Ettore Scola",
            writer: "Ruggero Maccari / Ettore Scola",
            cinematographer: "Pasqualino De Santis",
            editor: "Raimondo Crociani",
            composer: "Armando Trovajoli",
            studio: "Canafox Films / Compagnia Cinematografica Champion",
            focus: "A masterpiece of confined, single-location narrative, shot in a washed-out, sepia-toned palette that visually drains the life from the protagonists, contrasting private humanity with public fascism.",
            plot: "On the historic day in 1938 when Adolf Hitler visits Rome, an exhausted, conservative housewife and a suicidal, anti-fascist gay broadcaster are the only two left in their apartment complex, forming a brief, deeply poignant connection.",
            releaseDate: "May 17, 1977",
            country: "Italy / France"
        }
    ],
    'nanni-moretti': [
        {
            title: "The Son's Room",
            year: 2001,
            director: "Nanni Moretti",
            writer: "Nanni Moretti / Heidrun Schleef / Linda Ferri",
            cinematographer: "Giuseppe Lanci",
            editor: "Esmeralda Calabria",
            composer: "Nicola Piovani",
            studio: "Sacher Film / Bac Films / StudioCanal",
            focus: "A departure from Moretti's usual neurotic comedy, featuring a restrained, deeply compassionate observational camera that quietly studies the paralyzing mechanics of sudden grief.",
            plot: "A comfortable, close-knit middle-class Italian family is completely shattered when their teenage son tragically dies in a scuba diving accident, plunging them into a quiet, agonizing struggle to process their unimaginable loss.",
            releaseDate: "March 9, 2001",
            country: "Italy / France"
        }
    ],
    'gabriele-salvatores': [
        {
            title: "Mediterraneo",
            year: 1991,
            director: "Gabriele Salvatores",
            writer: "Enzo Monteleone",
            cinematographer: "Italo Petriccione",
            editor: "Nino Baragli",
            composer: "Marco Falagiani / Giancarlo Bigazzi",
            studio: "Penta Film / A.M.A. Film",
            focus: "Bathed in idyllic, sun-drenched Grecian light, capturing an atmosphere of escapism and anti-militarism through gentle pacing and a deeply humanistic, comedic lens.",
            plot: "During WWII, a ragtag group of misfit Italian soldiers are left stranded on a remote, seemingly deserted Greek island. Believing they have been forgotten by the war, they integrate into the local village and rediscover the joys of life.",
            releaseDate: "January 31, 1991",
            country: "Italy"
        }
    ],
    'paolo-sorrentino': [
        {
            title: "The Great Beauty",
            year: 2013,
            director: "Paolo Sorrentino",
            writer: "Paolo Sorrentino / Umberto Contarello",
            cinematographer: "Luca Bigazzi",
            editor: "Cristiano Travaglioli",
            composer: "Lele Marchitelli",
            studio: "Indigo Film / Medusa Film / Babe Films",
            focus: "A modern update to Fellini's 'La Dolce Vita', featuring visually intoxicating, relentlessly kinetic tracking shots and spectacular, operatic compositions of Roman excess and decay.",
            plot: "An aging, cynical socialite and former novelist wanders through the spectacular, glittering, but spiritually bankrupt party scene of modern Rome, reflecting on his squandered life following the death of his first love.",
            releaseDate: "May 21, 2013",
            country: "Italy / France"
        },
        {
            title: "The Hand of God",
            year: 2021,
            director: "Paolo Sorrentino",
            writer: "Paolo Sorrentino",
            cinematographer: "Daria D'Antonio",
            editor: "Cristiano Travaglioli",
            composer: "Lele Marchitelli",
            studio: "The Apartment / Netflix",
            focus: "A deeply personal, semi-autobiographical shift for Sorrentino, utilizing the vibrant, sun-soaked aesthetics of 1980s Naples, but with a more grounded, emotionally vulnerable camera style.",
            plot: "In 1980s Naples, an awkward teenager's life is defined by his chaotic, loving family and his obsession with soccer legend Diego Maradona, until a sudden, devastating tragedy forces him to find his path as a filmmaker.",
            releaseDate: "November 24, 2021",
            country: "Italy"
        }
    ],
    'matteo-garrone': [
        {
            title: "Gomorrah",
            year: 2008,
            director: "Matteo Garrone",
            writer: "Maurizio Braucci / Ugo Chiti / Gianni Di Gregorio / Matteo Garrone / Roberto Saviano",
            cinematographer: "Marco Onorato",
            editor: "Marco Spoletini",
            composer: "Massive Attack / Period Nu-Nu Tracks",
            studio: "Fandango / Rai Cinema",
            focus: "An ultra-gritty, anti-Hollywood approach to the mob film, shot with harsh, jittery handheld cameras inside actual Mafia-controlled housing projects to achieve terrifying documentary realism.",
            plot: "Five interconnected stories expose the brutal, unglamorous, and deeply corrupting reality of the Camorra crime syndicate as it infects every level of society in modern-day Naples and Caserta.",
            releaseDate: "May 16, 2008",
            country: "Italy"
        },
        {
            title: "Io Capitano",
            year: 2023,
            director: "Matteo Garrone",
            writer: "Matteo Garrone / Massimo Gaudioso / Massimo Ceccherini / Andrea Tagliaferri",
            cinematographer: "Paolo Carnera",
            editor: "Marco Spoletini",
            composer: "Andrea Farri",
            studio: "Archimede / Rai Cinema / Tarantula",
            focus: "A harrowing, epic 'hero's journey' combining gritty, brutal realism of the migrant experience with sweeping, mythological desert landscapes and flashes of magical realism.",
            plot: "Two teenage Senegalese cousins leave Dakar in pursuit of a better life in Europe, embarking on a harrowing, perilous odyssey through the merciless Sahara desert and the horrific detention camps of Libya.",
            releaseDate: "September 7, 2023",
            country: "Italy / Belgium / France"
        }
    ],
    'luca-guadagnino': [
        {
            title: "Call Me by Your Name",
            year: 2017,
            director: "Luca Guadagnino",
            writer: "James Ivory",
            cinematographer: "Sayombhu Mukdeeprom",
            editor: "Walter Fasano",
            composer: "Sufjan Stevens / Ryuichi Sakamoto",
            studio: "Frenesy Film Company / La Cinéfacture / RT Features",
            focus: "Intensely sensual, sun-drenched cinematography capturing the languid perfection of an Italian summer, utilizing a single lens to create an intimate, tactile sense of memory and desire.",
            plot: "In the summer of 1983, a precocious 17-year-old boy spending the summer at his family's Italian villa embarks on a passionate, life-altering romance with his father's handsome American graduate student.",
            releaseDate: "October 20, 2017",
            country: "Italy / United States / France / Brazil"
        },
        {
            title: "I Am Love",
            year: 2009,
            director: "Luca Guadagnino",
            writer: "Luca Guadagnino / Barbara Alberti / Ivan Cotroneo / Walter Fasano",
            cinematographer: "Yorick Le Saux",
            editor: "Walter Fasano",
            composer: "John Adams",
            studio: "First Sun / Mikado Film / Rai Cinema",
            focus: "Sumptuous, visually ravishing aesthetics reminiscent of Visconti, utilizing aggressive camera movements, microscopic focus on food, and John Adams' pulsating score to track a bourgeois awakening.",
            plot: "The Russian-born matriarch of a powerful, wealthy Milanese industrialist family experiences a sudden, overwhelming sexual and emotional awakening when she falls into a passionate affair with a young chef.",
            releaseDate: "December 4, 2009",
            country: "Italy"
        }
    ],
    'alice-rohrwacher': [
        {
            title: "The Wonders",
            year: 2014,
            director: "Alice Rohrwacher",
            writer: "Alice Rohrwacher",
            cinematographer: "Hélène Louvart",
            editor: "Marco Spoletini",
            composer: "Piero Cruitti",
            studio: "Tempesta / Amka Films Productions / Rai Cinema",
            focus: "Shot on warm, grainy Super 16mm film, creating a tactile, dusty rusticism that seamlessly blends the harsh realities of agricultural labor with a sense of gentle, pastoral magic.",
            plot: "A family of eccentric beekeepers living in isolation in the Tuscan countryside finds their traditional way of life disrupted by the arrival of a troubled teenage boy and the filming of a tacky reality TV show.",
            releaseDate: "May 18, 2014",
            country: "Italy / Switzerland / Germany"
        },
        {
            title: "Happy as Lazzaro",
            year: 2018,
            director: "Alice Rohrwacher",
            writer: "Alice Rohrwacher",
            cinematographer: "Hélène Louvart",
            editor: "Nelly Quettier",
            composer: "Piero Cruitti",
            studio: "Tempesta / Amka Films Productions / Ad Vitam Production",
            focus: "A stunning fusion of social realism and magical realism, utilizing rustic 16mm cinematography to chart a profound, heartbreaking narrative leap across time and space.",
            plot: "A saintly, impossibly pure-hearted peasant who is endlessly exploited by his rural community forms an unlikely bond with a young nobleman, leading to an extraordinary, mystical journey through time to modern-day society.",
            releaseDate: "May 13, 2018",
            country: "Italy / Switzerland / France / Germany"
        }
    ]
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchPoster(title, year) {
    return new Promise((resolve, reject) => {
        const query = encodeURIComponent(title);
        const url = `${TMDB_BASE_URL}?api_key=${TMDB_API_KEY}&query=${query}&year=${year}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.results && parsed.results.length > 0 && parsed.results[0].poster_path) {
                        resolve(POSTER_BASE_URL + parsed.results[0].poster_path);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(POSTERS_DIR, filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function run() {
    console.log("Starting TMDB fetch and database update for Italian Filmmakers...");
    
    let dbContent = fs.readFileSync(DB_PATH, 'utf8');

    for (const [directorId, movies] of Object.entries(moviesUpdate)) {
        console.log(`Updating ${directorId}...`);
        
        for (let i = 0; i < movies.length; i++) {
            const m = movies[i];
            m.id = slugify(m.title);
            m.poster = `assets/images/${m.id}.jpg`;

            const posterUrl = await fetchPoster(m.title, m.year);
            if (posterUrl) {
                console.log(`  Found poster for ${m.title}: ${posterUrl}`);
                try {
                    await downloadImage(posterUrl, `${m.id}.jpg`);
                    console.log('  Downloaded successfully!');
                } catch (e) {
                    console.log(`  Failed to download poster for ${m.title}`);
                }
            } else {
                console.log(`  No poster found on TMDB for ${m.title}. Setting placeholder path.`);
                try {
                    if (!fs.existsSync(path.join(POSTERS_DIR, `${m.id}.jpg`))) {
                        fs.copyFileSync(path.join(POSTERS_DIR, 'placeholder.jpg'), path.join(POSTERS_DIR, `${m.id}.jpg`));
                    }
                } catch(err) {
                    // ignore
                }
            }
            await delay(300); // rate limiting
        }

        const newMoviesStr = JSON.stringify(movies, null, 24).replace(/\n/g, '\n                    ');

        const regex = new RegExp(`"id": "${directorId}"[\\s\\S]*?"mustWatch": \\[[\\s\\S]*?\\],`);
        
        const match = dbContent.match(regex);
        if (match) {
            const replacement = match[0].replace(/"mustWatch": \[[ \s\S]*?\],/, `"mustWatch": ${newMoviesStr},`);
            dbContent = dbContent.replace(match[0], replacement);
        } else {
            console.log(`Could not find block for ${directorId} in temp_data.js`);
        }
    }

    fs.writeFileSync(DB_PATH, dbContent, 'utf8');
    console.log("Successfully updated temp_data.js with Italian films!");
}

run();
