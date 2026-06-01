const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'robert-wiene': [
        {
            title: "The Cabinet of Dr. Caligari",
            year: 1920,
            director: "Robert Wiene",
            writer: "Carl Mayer / Hans Janowitz",
            cinematographer: "Willy Hameister",
            editor: "Robert Wiene",
            composer: "Giuseppe Becce",
            studio: "Decla-Bioscop AG",
            focus: "The quintessential work of German Expressionism, utilizing radically distorted, painted sets, jagged angles, and heavy shadows to visually represent the psychological subjective experience of a madman.",
            plot: "In a twisted, nightmarish German village, a sinister hypnotist uses a somnambulist to commit a series of gruesome murders, but the narrative is complicated by the unreliable perspective of the storyteller.",
            releaseDate: "February 26, 1920",
            country: "Germany"
        }
    ],
    'f-w-murnau': [
        {
            title: "Nosferatu",
            year: 1922,
            director: "F.W. Murnau",
            writer: "Henrik Galeen",
            cinematographer: "F.A. Wagner / Günther Krampf",
            editor: "N/A",
            composer: "Hans Erdmann",
            studio: "Prana-Film GmbH",
            focus: "Pioneering the horror genre, Murnau moved Expressionism out of the studio, utilizing real locations, creepy stop-motion, negative film, and eerie shadow play to create an uncanny atmosphere of dread.",
            plot: "A naive real estate agent travels to the Carpathian Mountains to finalize a property sale with the mysterious Count Orlok, only to unleash a terrifying, plague-bearing vampire upon his hometown of Wisborg.",
            releaseDate: "March 4, 1922",
            country: "Germany"
        },
        {
            title: "The Last Laugh",
            year: 1924,
            director: "F.W. Murnau",
            writer: "Carl Mayer",
            cinematographer: "Karl Freund",
            editor: "Elfi Fiebig",
            composer: "Giuseppe Becce",
            studio: "Universum Film AG (UFA)",
            focus: "Revolutionary use of the 'unchained camera' (entfesselte Kamera), employing complex tracking shots and subjective POV to convey deep psychological trauma without the use of intertitles.",
            plot: "A proud, elderly doorman at a luxurious Berlin hotel is devastatingly demoted to a washroom attendant, completely stripping him of his social status, identity, and the respect of his community.",
            releaseDate: "December 23, 1924",
            country: "Germany"
        },
        {
            title: "Sunrise",
            year: 1927,
            director: "F.W. Murnau",
            writer: "Carl Mayer",
            cinematographer: "Charles Rosher / Karl Struss",
            editor: "Katharine Hilliker / H.H. Caldwell",
            composer: "Hugo Riesenfeld",
            studio: "Fox Film Corporation",
            focus: "Murnau brought German Expressionist techniques to Hollywood, combining stunning in-camera superimpositions, forced perspective sets, and fluid camera movement to create an emotional, visual symphony.",
            plot: "A simple country farmer is seduced by a sophisticated city woman who convinces him to drown his sweet, devoted wife, leading to a harrowing crisis of conscience and a desperate journey of redemption in the bustling city.",
            releaseDate: "September 23, 1927",
            country: "United States"
        }
    ],
    'fritz-lang': [
        {
            title: "Metropolis",
            year: 1927,
            director: "Fritz Lang",
            writer: "Thea von Harbou",
            cinematographer: "Karl Freund / Günther Rittau / Walter Ruttmann",
            editor: "Fritz Lang",
            composer: "Gottfried Huppertz",
            studio: "Universum Film AG (UFA)",
            focus: "A monumental achievement in sci-fi world-building, employing massive architectural sets, pioneering special effects (Schüfftan process), and vast choreographed crowds to visualize class conflict.",
            plot: "In a futuristic, highly stratified city where wealthy industrialists rule from towering skyscrapers while oppressed workers toil underground, the privileged son of the city's master attempts to bridge the vast class divide.",
            releaseDate: "January 10, 1927",
            country: "Germany"
        },
        {
            title: "M",
            year: 1931,
            director: "Fritz Lang",
            writer: "Thea von Harbou / Fritz Lang",
            cinematographer: "Fritz Arno Wagner",
            editor: "Paul Falkenberg",
            composer: "Adolf Jansen",
            studio: "Nero-Film AG",
            focus: "Lang's first sound film masterfully uses audio as a narrative tool—specifically the murderer's whistling motif—combined with stark shadows and procedurals to build relentless, suffocating tension.",
            plot: "As a chilling serial killer who preys on young children terrorizes Berlin, the ensuing police crackdown becomes so disruptive that the city's organized crime syndicates unite to hunt the murderer down themselves.",
            releaseDate: "May 11, 1931",
            country: "Germany"
        },
        {
            title: "The Testament of Dr. Mabuse",
            year: 1933,
            director: "Fritz Lang",
            writer: "Thea von Harbou / Fritz Lang",
            cinematographer: "Fritz Arno Wagner / Karl Vash",
            editor: "Lothar Wolff",
            composer: "Hans Erdmann",
            studio: "Nero-Film AG",
            focus: "A blistering, thinly-veiled critique of the rising Nazi party, utilizing rapid, associative editing and complex sound design to depict a society descending into chaotic, hypnotic fascism.",
            plot: "A dedicated police inspector investigates a string of perfectly executed crimes that all lead back to Dr. Mabuse, a criminal mastermind who is currently locked away in a high-security insane asylum.",
            releaseDate: "April 21, 1933",
            country: "Germany"
        }
    ],
    'werner-herzog': [
        {
            title: "Aguirre, the Wrath of God",
            year: 1972,
            director: "Werner Herzog",
            writer: "Werner Herzog",
            cinematographer: "Thomas Mauch",
            editor: "Beate Mainka-Jellinghaus",
            composer: "Popol Vuh",
            studio: "Werner Herzog Filmproduktion",
            focus: "Hallucinatory, documentary-like realism achieved by shooting on location in the perilous Amazon jungle, capturing the madness of colonialism through Klaus Kinski's unhinged performance.",
            plot: "In the 16th century, a ruthless, power-mad Spanish conquistador leads a doomed expedition down the perilous Amazon River in a desperate, increasingly insane search for the mythical city of El Dorado.",
            releaseDate: "December 29, 1972",
            country: "West Germany"
        },
        {
            title: "Fitzcarraldo",
            year: 1982,
            director: "Werner Herzog",
            writer: "Werner Herzog",
            cinematographer: "Thomas Mauch",
            editor: "Beate Mainka-Jellinghaus",
            composer: "Popol Vuh",
            studio: "Werner Herzog Filmproduktion / Pro-ject Filmproduktion",
            focus: "A testament to the 'ecstatic truth' of cinema, famous for the grueling, practical reality of hauling a 320-ton steamship over a mountain, blurring the line between the film's fiction and the director's megalomania.",
            plot: "An obsessed, wildly ambitious European rubber baron in early 20th-century Peru is determined to build a grand opera house in the jungle, devising a seemingly impossible plan to drag a massive steamboat over a steep mountain.",
            releaseDate: "March 4, 1982",
            country: "West Germany / Peru"
        },
        {
            title: "Nosferatu the Vampyre",
            year: 1979,
            director: "Werner Herzog",
            writer: "Werner Herzog",
            cinematographer: "Jörg Schmidt-Reitwein",
            editor: "Beate Mainka-Jellinghaus",
            composer: "Popol Vuh",
            studio: "Werner Herzog Filmproduktion / Gaumont",
            focus: "A melancholic, deeply atmospheric remake of Murnau's classic, emphasizing the profound, eternal loneliness and tragic isolation of the vampire, scored by Popol Vuh's ethereal, haunting music.",
            plot: "A dedicated real estate agent ignores ominous warnings and travels to Transylvania to meet Count Dracula, who soon brings a devastating plague of rats and death to the agent's peaceful hometown of Wismar.",
            releaseDate: "January 17, 1979",
            country: "West Germany / France"
        }
    ],
    'rainer-werner-fassbinder': [
        {
            title: "Ali: Fear Eats the Soul",
            year: 1974,
            director: "Rainer Werner Fassbinder",
            writer: "Rainer Werner Fassbinder",
            cinematographer: "Jürgen Jürges",
            editor: "Thea Eymèsz",
            composer: "Peer Raben",
            studio: "Tango Film",
            focus: "A masterful subversion of Douglas Sirk's Hollywood melodramas, utilizing static, distancing camera work and flat, stilted acting to ruthlessly expose the hypocrisy and xenophobia of post-war German society.",
            plot: "A lonely, elderly German cleaning woman falls in love with and impulsively marries a much younger Moroccan immigrant worker, inciting vicious, racist backlash and social ostracization from their friends, family, and neighbors.",
            releaseDate: "March 5, 1974",
            country: "West Germany"
        },
        {
            title: "The Marriage of Maria Braun",
            year: 1979,
            director: "Rainer Werner Fassbinder",
            writer: "Peter Märthesheimer / Pea Fröhlich",
            cinematographer: "Michael Ballhaus",
            editor: "Juliane Lorenz",
            composer: "Peer Raben",
            studio: "Albatros Filmproduktion / Trio Film / WDR",
            focus: "An allegory for the 'Wirtschaftswunder' (economic miracle), utilizing complex, shifting framing and brilliant color schemes to contrast Maria's rising economic success with her total moral bankruptcy.",
            plot: "After a hasty marriage during a WWII bombing raid, a ruthless, pragmatic German woman uses her sexuality and sheer cunning to build a massive business empire in the ruins of post-war Germany while waiting for her husband's return.",
            releaseDate: "February 20, 1979",
            country: "West Germany"
        },
        {
            title: "World on a Wire",
            year: 1973,
            director: "Rainer Werner Fassbinder",
            writer: "Fritz Müller-Scherz / Rainer Werner Fassbinder",
            cinematographer: "Michael Ballhaus / Ulrich Prinz",
            editor: "Marie Anne Gerhardt",
            composer: "Gottfried Hüngsberg",
            studio: "Westdeutscher Rundfunk (WDR)",
            focus: "A visionary sci-fi epic employing relentless tracking shots, excessive mirrors, and disorienting reflections to visually manifest the paranoia of a simulated reality long before 'The Matrix'.",
            plot: "The newly appointed technical director of a highly advanced computer simulation that houses thousands of artificial identities begins to suspect that his own reality might just be another simulation run by a higher level.",
            releaseDate: "October 14, 1973",
            country: "West Germany"
        }
    ],
    'wim-wenders': [
        {
            title: "Wings of Desire",
            year: 1987,
            director: "Wim Wenders",
            writer: "Wim Wenders",
            cinematographer: "Henri Alekan",
            editor: "Peter Przygodda",
            composer: "Jürgen Knieper",
            studio: "Road Movies Filmproduktion / Argos Films",
            focus: "A poetic, gently meandering camera floats through a divided Berlin, utilizing lush, silvery black-and-white for the timeless angelic perspective, and shifting to stark color for the mortal, physical experience.",
            plot: "Invisible, immortal angels wander the streets of divided West Berlin, listening to the agonizing inner thoughts of the populace, until one angel falls deeply in love with a lonely trapeze artist and desires to become mortal.",
            releaseDate: "May 17, 1987",
            country: "West Germany / France"
        },
        {
            title: "Paris, Texas",
            year: 1984,
            director: "Wim Wenders",
            writer: "Sam Shepard",
            cinematographer: "Robby Müller",
            editor: "Peter Przygodda",
            composer: "Ry Cooder",
            studio: "Road Movies Filmproduktion / Argos Films",
            focus: "Wenders applies a distinctly European, observational lens to the American West, defined by Robby Müller's stunning, hyper-saturated cinematography and a deep, agonizing sense of vast spatial isolation.",
            plot: "An amnesiac, nearly mute drifter emerges from the South Texas desert after disappearing for four years, slowly attempting to reconnect with his young son and track down his estranged, traumatized wife.",
            releaseDate: "May 14, 1984",
            country: "West Germany / France / United Kingdom"
        },
        {
            title: "The American Friend",
            year: 1977,
            director: "Wim Wenders",
            writer: "Wim Wenders",
            cinematographer: "Robby Müller",
            editor: "Peter Przygodda",
            composer: "Jürgen Knieper",
            studio: "Road Movies Filmproduktion / Les Films du Losange",
            focus: "A uniquely existential, melancholy take on the neo-noir thriller, using jarringly bright, primary colors and claustrophobic framing to explore the Americanization of post-war German culture.",
            plot: "A terminally ill German picture framer is manipulated by an amoral, expatriate American art forger into becoming a hitman for the mafia in order to secure financial stability for his family after his death.",
            releaseDate: "June 24, 1977",
            country: "West Germany / France"
        }
    ],
    'volker-schlondorff': [
        {
            title: "The Tin Drum",
            year: 1979,
            director: "Volker Schlöndorff",
            writer: "Jean-Claude Carrière / Franz Seitz / Volker Schlöndorff",
            cinematographer: "Igor Luther",
            editor: "Suzanne Baron",
            composer: "Maurice Jarre",
            studio: "Franz Seitz Filmproduktion / Bioskop Film / Artemis Film",
            focus: "A grotesque, carnivalesque adaptation of Günter Grass's novel, using the distorted, low-angle perspective of a child to satirize the terrifying rise of Nazism and the complicity of the German petite bourgeoisie.",
            plot: "In 1920s Danzig, a remarkably precocious young boy named Oskar becomes so disgusted with the hypocrisy and brutality of the adult world that he willfully decides to stop physically growing at the age of three.",
            releaseDate: "May 3, 1979",
            country: "West Germany / France / Poland / Yugoslavia"
        }
    ],
    'tom-tykwer': [
        {
            title: "Run Lola Run",
            year: 1998,
            director: "Tom Tykwer",
            writer: "Tom Tykwer",
            cinematographer: "Frank Griebe",
            editor: "Mathilde Bonnefoy",
            composer: "Tom Tykwer / Johnny Klimek / Reinhold Heil",
            studio: "X-Filme Creative Pool",
            focus: "A frenetic, adrenaline-fueled exercise in kinetic pacing, employing rapid-fire MTV-style editing, aggressive techno music, and shifting formats (35mm, video, animation) to explore fate and butterfly effects.",
            plot: "After her petty-criminal boyfriend loses 100,000 Deutsche Marks belonging to a ruthless mob boss, a fiercely determined young woman has exactly twenty minutes to sprint across Berlin to find the money and save his life.",
            releaseDate: "August 20, 1998",
            country: "Germany"
        }
    ],
    'florian-henckel-von-donnersmarck': [
        {
            title: "The Lives of Others",
            year: 2006,
            director: "Florian Henckel von Donnersmarck",
            writer: "Florian Henckel von Donnersmarck",
            cinematographer: "Hagen Bogdanski",
            editor: "Patricia Rommel",
            composer: "Gabriel Yared / Stéphane Moucha",
            studio: "Wiedemann & Berg Filmproduktion",
            focus: "A visually restrained, meticulously composed thriller utilizing a cold, desaturated, oppressively grey and beige color palette to perfectly reflect the suffocating paranoia of the East German Stasi surveillance state.",
            plot: "In 1984 East Berlin, a cold, dedicated Stasi secret police officer begins to experience a profound crisis of conscience while conducting a wiretap surveillance operation on a prominent playwright and his actress lover.",
            releaseDate: "March 23, 2006",
            country: "Germany"
        }
    ],
    'fatih-akin': [
        {
            title: "Head-On",
            year: 2004,
            director: "Fatih Akin",
            writer: "Fatih Akin",
            cinematographer: "Rainer Klausmann",
            editor: "Andrew Bird",
            composer: "Alexander Hacke",
            studio: "Corazón International / WDR / Arte",
            focus: "Raw, visceral, and unsentimental, utilizing aggressive, handheld camera work and a booming punk soundtrack to capture the violent, passionate clash of Turkish tradition and modern German rebellion.",
            plot: "A self-destructive, alcoholic, 40-year-old Turkish-German man agrees to a marriage of convenience with a rebellious young Turkish woman who is desperate to escape the strict, oppressive grip of her conservative family.",
            releaseDate: "March 11, 2004",
            country: "Germany / Turkey"
        },
        {
            title: "The Edge of Heaven",
            year: 2007,
            director: "Fatih Akin",
            writer: "Fatih Akin",
            cinematographer: "Rainer Klausmann",
            editor: "Andrew Bird",
            composer: "Shantel",
            studio: "Corazón International / Anka Film / NDR",
            focus: "A deeply humanist, beautifully structured multi-narrative exploring themes of migration, grief, and forgiveness, spanning the geographical and cultural divide between Germany and Turkey.",
            plot: "The lives of six people—including a Turkish immigrant, a German university professor, a political activist, and a grieving mother—intersect and collide across Bremen and Istanbul in a complex web of tragedy and redemption.",
            releaseDate: "May 23, 2007",
            country: "Germany / Turkey / France"
        }
    ],
    'christian-petzold': [
        {
            title: "Phoenix",
            year: 2014,
            director: "Christian Petzold",
            writer: "Christian Petzold / Harun Farocki",
            cinematographer: "Hans Fromm",
            editor: "Bettina Böhler",
            composer: "Stefan Will",
            studio: "Schramm Film Koerner & Weber / WDR / Arte",
            focus: "A Hitchcockian, slow-burn melodrama utilizing immaculate, precise framing and deliberate pacing to explore the profound psychological scars of the Holocaust and the impossibility of returning to the past.",
            plot: "A severely disfigured Holocaust survivor undergoes facial reconstruction surgery and returns to the ruins of post-war Berlin to find her husband, who fails to recognize her and asks her to help him claim her own inheritance.",
            releaseDate: "September 25, 2014",
            country: "Germany / Poland"
        },
        {
            title: "Transit",
            year: 2018,
            director: "Christian Petzold",
            writer: "Christian Petzold",
            cinematographer: "Hans Fromm",
            editor: "Bettina Böhler",
            composer: "Stefan Will",
            studio: "Schramm Film Koerner & Weber / Neon Productions",
            focus: "A brilliant, unsettling anachronistic thriller that visually merges the terrifying bureaucracy of fleeing 1940s fascism with the aesthetic reality of the modern-day European refugee crisis.",
            plot: "Attempting to flee Europe during a rapidly advancing fascist occupation, a man assumes the identity of a dead author to secure transit papers in Marseille, but becomes entangled in the life of the writer's desperate widow.",
            releaseDate: "February 17, 2018",
            country: "Germany / France"
        }
    ],
    'maren-ade': [
        {
            title: "Toni Erdmann",
            year: 2016,
            director: "Maren Ade",
            writer: "Maren Ade",
            cinematographer: "Patrick Orth",
            editor: "Heike Parplies",
            composer: "Compilation / Production Track Sound Design",
            studio: "Komplizen Film / Missing Link Films",
            focus: "A masterclass in agonizing, cringe-inducing awkwardness, employing uncomfortably long takes and a complete lack of a traditional score to dissect corporate alienation and familial estrangement.",
            plot: "An eccentric, prank-loving retired music teacher visits his estranged, fiercely ambitious daughter in Bucharest, creating an outrageous, wig-wearing alter-ego in a desperate, bizarre attempt to bring joy back into her rigid corporate life.",
            releaseDate: "May 14, 2016",
            country: "Germany / Austria / Monaco"
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
    console.log("Starting TMDB fetch and database update for German Filmmakers...");
    
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
    console.log("Successfully updated temp_data.js with German films!");
}

run();
