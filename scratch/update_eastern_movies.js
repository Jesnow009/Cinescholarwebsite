const fs = require('fs');
const https = require('https');
const path = require('path');

const TMDB_API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POSTERS_DIR = path.join(__dirname, '..', 'assets', 'images');
const DB_PATH = path.join(__dirname, '..', 'temp_data.js');

const moviesUpdate = {
    'andrzej-wajda': [
        {
            title: "Ashes and Diamonds",
            year: 1958,
            director: "Andrzej Wajda",
            writer: "Jerzy Andrzejewski / Andrzej Wajda",
            cinematographer: "Jerzy Wójcik",
            editor: "Halina Nawrocka",
            composer: "Filip Nowak",
            studio: "Zespół Filmowy Kadr",
            focus: "A cornerstone of the Polish Film School, employing deep focus cinematography, stark contrast lighting, and complex blocking to visually represent the deep moral ambiguity of a nation torn apart at the end of WWII.",
            plot: "On the final day of World War II, a young Home Army resistance fighter is ordered to assassinate a Communist official, but his sudden romance with a barmaid forces him to question the senseless cycle of violence.",
            releaseDate: "October 3, 1958",
            country: "Poland"
        },
        {
            title: "Kanal",
            year: 1957,
            director: "Andrzej Wajda",
            writer: "Jerzy Stefan Stawiński",
            cinematographer: "Jerzy Lipman",
            editor: "Aurelia Rut",
            composer: "Jan Krenz",
            studio: "Zespół Filmowy Kadr",
            focus: "A grim, utterly claustrophobic masterpiece of existential dread, shooting almost entirely in the dark, suffocating confines of the Warsaw sewer system to physically manifest the desperate final hours of the Polish resistance.",
            plot: "During the tragic final days of the 1944 Warsaw Uprising, a decimated company of Polish resistance fighters is forced to retreat into the horrific, stinking sewers in a doomed attempt to escape the surrounding German army.",
            releaseDate: "April 20, 1957",
            country: "Poland"
        },
        {
            title: "Man of Marble",
            year: 1977,
            director: "Andrzej Wajda",
            writer: "Aleksander Ścibor-Rylski",
            cinematographer: "Edward Kłosiński",
            editor: "Halina Prugar-Ketling",
            composer: "Andrzej Korzyński",
            studio: "Zespół Filmowy X",
            focus: "Wajda combines the investigative structure of 'Citizen Kane' with a gritty, documentary-like immediacy, utilizing aggressive editing and newsreel footage to deconstruct the myth-making apparatus of Soviet propaganda.",
            plot: "A fiercely determined young film student in the 1970s begins investigating the hidden, tragic life of a forgotten 1950s 'Stakhanovite' bricklayer who was once elevated as a grand hero of the socialist state, only to be ruthlessly destroyed by it.",
            releaseDate: "February 25, 1977",
            country: "Poland"
        }
    ],
    'krzysztof-kieslowski': [
        {
            title: "Three Colors: Blue",
            year: 1993,
            director: "Krzysztof Kieślowski",
            writer: "Krzysztof Kieślowski / Krzysztof Piesiewicz",
            cinematographer: "Sławomir Idziak",
            editor: "Jacques Witta",
            composer: "Zbigniew Preisner",
            studio: "MK2 Productions / CED Productions / Tor Film Studio",
            focus: "An exquisite exploration of profound grief utilizing extreme close-ups, overwhelming swells of orchestral music, and an omnipresent, thematic blue color palette that reflects the protagonist's cold, emotional isolation.",
            plot: "After surviving a tragic car crash that kills her composer husband and young daughter, a devastatingly grief-stricken woman attempts to cut all ties to her past and live a completely isolated, unattached life in Paris.",
            releaseDate: "September 8, 1993",
            country: "France / Poland / Switzerland"
        },
        {
            title: "The Double Life of Véronique",
            year: 1991,
            director: "Krzysztof Kieślowski",
            writer: "Krzysztof Kieślowski / Krzysztof Piesiewicz",
            cinematographer: "Sławomir Idziak",
            editor: "Jacques Witta",
            composer: "Zbigniew Preisner",
            studio: "Sideral Productions / Tor Film Studio / Canal+",
            focus: "Kieślowski crafts a deeply intuitive, metaphysical visual poem, characterized by Sławomir Idziak's heavily filtered, golden-green cinematography and distorted reflections that emphasize the mystical connection between two souls.",
            plot: "Two identical young women—one living in Poland, the other in France—share no tangible connection but experience a profound, mysterious, and inexplicable emotional bond that shapes their respective lives and destinies.",
            releaseDate: "May 15, 1991",
            country: "France / Poland / Norway"
        },
        {
            title: "A Short Film About Killing",
            year: 1988,
            director: "Krzysztof Kieślowski",
            writer: "Krzysztof Kieślowski / Krzysztof Piesiewicz",
            cinematographer: "Sławomir Idziak",
            editor: "Ewa Smal",
            composer: "Zbigniew Preisner",
            studio: "Zespół Filmowy Tor",
            focus: "Shot through oppressive, sickly yellow-green filters that make Warsaw look diseased and decaying, the film visually equates the cold brutality of a random murder with the equally cold brutality of state-sponsored execution.",
            plot: "A disaffected, wandering youth senselessly and brutally murders a cynical taxi driver, leading an idealistic but ultimately powerless young defense attorney to grapple with the state's impending execution of the boy.",
            releaseDate: "March 11, 1988",
            country: "Poland"
        }
    ],
    'andrzej-zulawski': [
        {
            title: "Possession",
            year: 1981,
            director: "Andrzej Żuławski",
            writer: "Andrzej Żuławski",
            cinematographer: "Bruno Nuytten",
            editor: "Marie-Sophie Dubus / Suzanne Lang-Willar",
            composer: "Andrzej Korzyński",
            studio: "Oliane Productions / Marianne Productions / Soma Film Produktion",
            focus: "A film of hysterical, frantic energy, featuring wildly kinetic, swirling camerawork and unhinged, physically agonizing performances to manifest the extreme emotional trauma and monstrosity of a bitter divorce.",
            plot: "A spy returns home to West Berlin to find his wife inexplicably demanding a divorce, plunging both of them into a terrifying spiral of madness, extreme violence, and a horrific, tentacled monster hidden in a dilapidated apartment.",
            releaseDate: "May 25, 1981",
            country: "France / West Germany"
        },
        {
            title: "On the Silver Globe",
            year: 1988,
            director: "Andrzej Żuławski",
            writer: "Andrzej Żuławski",
            cinematographer: "Andrzej J. Jaroszewicz",
            editor: "Krzysztof Osiecki",
            composer: "Andrzej Korzyński",
            studio: "Zespół Filmowy Pryzmat / Zespół Filmowy Kadr",
            focus: "An incomplete but awe-inspiring sci-fi epic shot with extreme, distorted wide-angle lenses and handheld frenzy, exploring religious dogma and tribalism with hallucinatory, chaotic grandeur.",
            plot: "A group of dissident astronauts crash-lands on a desolate, earth-like moon and attempts to build a new civilization, which rapidly devolves into a primitive, violently religious tribal society awaiting a messiah.",
            releaseDate: "May 12, 1988",
            country: "Poland"
        }
    ],
    'pawel-pawlikowski': [
        {
            title: "Ida",
            year: 2013,
            director: "Paweł Pawlikowski",
            writer: "Paweł Pawlikowski / Rebecca Lenkiewicz",
            cinematographer: "Łukasz Żal / Ryszard Lenczewski",
            editor: "Jarosław Kamiński",
            composer: "Kristian Eidnes Andersen",
            studio: "Opus Film / Phoenix Film Investments",
            focus: "Shot in stark, high-contrast black-and-white and the classic 1.37:1 Academy ratio, Pawlikowski frames his subjects radically low in the frame, allowing the empty space above them to weigh heavily like the burden of history.",
            plot: "In 1960s Poland, a young novitiate nun on the verge of taking her vows discovers a dark family secret dating back to the Nazi occupation, leading her on a profound road trip with her cynical, hard-drinking aunt.",
            releaseDate: "October 25, 2013",
            country: "Poland / Denmark / France / United Kingdom"
        },
        {
            title: "Cold War",
            year: 2018,
            director: "Paweł Pawlikowski",
            writer: "Paweł Pawlikowski / Janusz Głowacki",
            cinematographer: "Łukasz Żal",
            editor: "Jarosław Kamiński",
            composer: "Marcin Masecki",
            studio: "Opus Film / Apocalypso Pictures / MK2 Productions",
            focus: "A breathtakingly beautiful, elliptical romance shot in luminous monochrome, utilizing sudden, sharp editing jumps across years and borders, driven entirely by the shifting, evolving nature of traditional folk music and jazz.",
            plot: "A passionate but impossibly turbulent romance between a brooding musical director and a fiery, ambitious young singer spans a decade as they repeatedly unite and fracture across the borders of a divided, Cold War Europe.",
            releaseDate: "June 8, 2018",
            country: "Poland / France / United Kingdom"
        }
    ],
    'milos-forman': [
        {
            title: "The Loves of a Blonde",
            year: 1965,
            director: "Miloš Forman",
            writer: "Miloš Forman / Jaroslav Papoušek / Ivan Passer",
            cinematographer: "Miroslav Ondříček",
            editor: "Miroslav Hájek",
            composer: "Evžen Illín",
            studio: "Filmové Studio Barrandov",
            focus: "A quintessential work of the Czechoslovak New Wave, employing non-professional actors, improvised dialogue, and observational, documentary-style camerawork to capture the awkward, humorous truth of youth under socialism.",
            plot: "A naive young woman working in a provincial shoe factory spends a romantic night with a visiting musician from Prague, and decides to unexpectedly travel to the city to visit him, much to the dismay of his conservative parents.",
            releaseDate: "November 12, 1965",
            country: "Czechoslovakia"
        },
        {
            title: "The Firemen's Ball",
            year: 1967,
            director: "Miloš Forman",
            writer: "Miloš Forman / Jaroslav Papoušek / Ivan Passer",
            cinematographer: "Miroslav Ondříček",
            editor: "Miroslav Hájek",
            composer: "Karel Mareš",
            studio: "Filmové Studio Barrandov / Claude Berri Productions",
            focus: "Forman's brilliantly chaotic, sprawling ensemble staging uses overlapping dialogue and farcical, observational comedy to create a devastating, thinly-veiled allegory for the incompetence and corruption of the Communist system.",
            plot: "An annual ball organized by a small-town volunteer fire department rapidly devolves into complete, disastrous chaos as the lottery prizes are stolen, a beauty pageant goes horribly wrong, and a local house burns to the ground.",
            releaseDate: "November 24, 1967",
            country: "Czechoslovakia / France"
        },
        {
            title: "One Flew Over the Cuckoo's Nest",
            year: 1975,
            director: "Miloš Forman",
            writer: "Lawrence Hauben / Bo Goldman",
            cinematographer: "Haskell Wexler / Bill Butler",
            editor: "Richard Chew / Lynzee Klingman / Sheldon Kahn",
            composer: "Jack Nitzsche",
            studio: "Fantasy Films",
            focus: "Forman adapts his Eastern European anti-authoritarian sensibility to an American context, utilizing patient, empathetic close-ups and an immersive, documentary-style approach to capture the humanity within an oppressive institution.",
            plot: "To escape hard labor in a prison, a rebellious, anti-authoritarian criminal fakes insanity and is transferred to a mental institution, where he immediately clashes with the icy, tyrannical, and fiercely controlling Nurse Ratched.",
            releaseDate: "November 19, 1975",
            country: "United States"
        }
    ],
    'jiri-menzel': [
        {
            title: "Closely Watched Trains",
            year: 1966,
            director: "Jiří Menzel",
            writer: "Jiří Menzel",
            cinematographer: "Jaromír Šofr",
            editor: "Jiřina Lukešová",
            composer: "Jiří Šust",
            studio: "Filmové Studio Barrandov",
            focus: "A gentle, profoundly humanist tragicomedy that balances light, whimsical sexual coming-of-age humor with the sudden, harsh realities of war, embodying the defining bittersweet tone of the Czech New Wave.",
            plot: "During the German occupation of Czechoslovakia, a naive, bumbling young man begins his first job as a train dispatcher at a sleepy rural station, far more concerned with losing his virginity than the ongoing realities of World War II.",
            releaseDate: "November 18, 1966",
            country: "Czechoslovakia"
        },
        {
            title: "Larks on a String",
            year: 1990,
            director: "Jiří Menzel",
            writer: "Jiří Menzel",
            cinematographer: "Jaromír Šofr",
            editor: "Jiřina Lukešová",
            composer: "Jiří Šust",
            studio: "Filmové Studio Barrandov",
            focus: "Banned for two decades, this film utilizes an absurd, darkly comedic, and deeply empathetic tone to satirize the oppressive state re-education camps, finding gentle poetry in a junkyard.",
            plot: "In a bleak 1950s scrap metal yard, a group of 'bourgeois' dissidents—including a philosopher, a saxophonist, and a cook—are forced to undergo grueling 're-education' through hard labor alongside female prisoners.",
            releaseDate: "February 1, 1990",
            country: "Czechoslovakia"
        }
    ],
    'vera-chytilova': [
        {
            title: "Daisies",
            year: 1966,
            director: "Věra Chytilová",
            writer: "Věra Chytilová / Ester Krumbachová / Pavel Juráček",
            cinematographer: "Jaroslav Kučera",
            editor: "Miroslav Hájek",
            composer: "Jiří Šust / Jiří Šlitr",
            studio: "Filmové Studio Barrandov",
            focus: "An absolute explosion of avant-garde feminist anarchy, characterized by aggressive jump cuts, chaotic color tinting, stop-motion animation, and a deliberate destruction of traditional narrative form and decorum.",
            plot: "Deciding that since the entire world has gone completely bad, they must go completely bad as well, two young women named Marie embark on a surreal, gluttonous, and anarchic spree of destruction, pranks, and consumption.",
            releaseDate: "December 30, 1966",
            country: "Czechoslovakia"
        },
        {
            title: "Fruit of Paradise",
            year: 1970,
            director: "Věra Chytilová",
            writer: "Věra Chytilová / Ester Krumbachová",
            cinematographer: "Jaroslav Kučera",
            editor: "Miroslav Hájek",
            composer: "Zdeněk Liška",
            studio: "Filmové Studio Barrandov / Elisabeth Films",
            focus: "A visually intoxicating, highly abstract reinterpretation of the Adam and Eve myth, utilizing overwhelming floral patterns, psychedelic color filters, and an extraordinary, chaotic avant-garde musical score.",
            plot: "In a stylized, surreal health spa that serves as an allegory for the Garden of Eden, a young woman's curiosity leads her to uncover the dark, murderous secret of a charismatic but deeply sinister man.",
            releaseDate: "July 23, 1970",
            country: "Czechoslovakia / Belgium"
        }
    ],
    'jan-svankmajer': [
        {
            title: "Alice",
            year: 1988,
            director: "Jan Švankmajer",
            writer: "Jan Švankmajer",
            cinematographer: "Svatopluk Malý",
            editor: "Marie Zemanová",
            composer: "Period Sound Design",
            studio: "Condor Features / Hessischer Rundfunk / Channel Four",
            focus: "Švankmajer utterly transforms the classic tale using deeply unsettling, tactile stop-motion animation involving taxidermy, animal bones, and rusty household objects, creating a grimy, genuinely threatening nightmare.",
            plot: "A young girl named Alice follows a terrifying, taxidermied White Rabbit into a desolate, rotting Wonderland filled with aggressive, animated objects, dead animals, and bizarre, menacing creatures.",
            releaseDate: "April 28, 1988",
            country: "Czechoslovakia / Switzerland / United Kingdom / West Germany"
        },
        {
            title: "Faust",
            year: 1994,
            director: "Jan Švankmajer",
            writer: "Jan Švankmajer",
            cinematographer: "Svatopluk Malý",
            editor: "Marie Zemanová",
            composer: "Jiří Šust",
            studio: "Heart of Europe Bio Film / Athanor / BBC / CNC",
            focus: "A surreal, deeply absurdist blend of live-action and grotesque claymation/puppet animation, utilizing the crumbling, labyrinthine streets of Prague to modernize the eternal tragedy of the Faustian bargain.",
            plot: "An ordinary, modern-day man in Prague is inexplicably lured into a surreal underground puppet theater, where he unwittingly assumes the role of Faust and is drawn into a terrifying, inevitable pact with the Devil.",
            releaseDate: "September 15, 1994",
            country: "Czech Republic / France / United Kingdom / Germany"
        }
    ],
    'bela-tarr': [
        {
            title: "Sátántangó",
            year: 1994,
            director: "Béla Tarr",
            writer: "László Krasznahorkai / Béla Tarr",
            cinematographer: "Gábor Medvigy",
            editor: "Ágnes Hranitzky",
            composer: "Mihály Víg",
            studio: "Vega Film / Von Vietinghoff Filmproduktion",
            focus: "A monument of slow cinema clocking in at over seven hours. Tarr utilizes mesmerizing, relentlessly long takes and hypnotic camera tracking across muddy, desolate landscapes to capture spiritual decay and the weight of time.",
            plot: "In a rain-soaked, decaying agricultural collective in post-communist Hungary, the desperate, squabbling villagers are thrown into disarray by the sudden, prophetic return of a charismatic former co-worker they believed was dead.",
            releaseDate: "April 28, 1994",
            country: "Hungary / Germany / Switzerland"
        },
        {
            title: "Werckmeister Harmonies",
            year: 2001,
            director: "Béla Tarr / Ágnes Hranitzky",
            writer: "László Krasznahorkai / Béla Tarr",
            cinematographer: "Gábor Medvigy / Robby Müller / Patrick de Melsche / Miklós Gurbán / Erwin Lanzensberger / Emil Novák",
            editor: "Ágnes Hranitzky",
            composer: "Mihály Víg",
            studio: "13 Productions / Goëss Film / Go Filmproduktion / Von Vietinghoff Film",
            focus: "Composed of just 39 shots across two and a half hours, the film uses masterfully orchestrated, balletic long takes to build a terrifying atmosphere of impending cosmic and social apocalypse.",
            plot: "A mysterious traveling circus arrives in a freezing, desolate Hungarian town, bringing with it a massive stuffed whale and a shadow figure known as 'The Prince,' which incites a terrifying, uncontrollable wave of mob violence.",
            releaseDate: "February 1, 2001",
            country: "Hungary / Germany / France / Switzerland / Italy"
        },
        {
            title: "The Turin Horse",
            year: 2011,
            director: "Béla Tarr / Ágnes Hranitzky",
            writer: "László Krasznahorkai / Béla Tarr",
            cinematographer: "Fred Kelemen",
            editor: "Ágnes Hranitzky",
            composer: "Mihály Víg",
            studio: "T. T. Filmműhely / MPM Film / Vega Film / Zero Fiction Film",
            focus: "Tarr's devastating final film strips cinema down to its absolute barest essence. Extreme, repetitive long takes of grueling daily chores amidst a howling windstorm physically convey the slow, agonizing extinction of the world.",
            plot: "In a desolate, wind-battered wasteland, an aging, crippled farmer and his dutiful daughter face the slow, bleak, and inevitable end of the world as their sole horse stubbornly refuses to move or eat.",
            releaseDate: "March 31, 2011",
            country: "Hungary / France / Germany / Switzerland / United States"
        }
    ],
    'miklos-jancso': [
        {
            title: "The Round-Up",
            year: 1966,
            director: "Miklós Jancsó",
            writer: "Gyula Hernádi",
            cinematographer: "Tamás Somló",
            editor: "Zoltán Farkas",
            composer: "Traditional Choral Motifs",
            studio: "Mafilm Studio 4",
            focus: "Jancsó pioneered a highly formalized, geometric visual style utilizing incredibly complex, balletic tracking shots across the barren Hungarian plains to depict the precise, cold mechanics of political oppression.",
            plot: "In 1869, following a failed Hungarian uprising, suspected partisans are rounded up in an isolated prison camp where their Austrian captors subject them to a series of insidious, psychologically torturous mind games to force confessions.",
            releaseDate: "January 6, 1966",
            country: "Hungary"
        },
        {
            title: "The Red and the White",
            year: 1967,
            director: "Miklós Jancsó",
            writer: "Gyula Hernádi / Miklós Jancsó / Georgi Mdivani",
            cinematographer: "János Kende",
            editor: "Zoltán Farkas",
            composer: "N/A",
            studio: "Mafilm Studio 4 / Mosfilm",
            focus: "An anti-war masterpiece devoid of traditional protagonists, using continuous, fluid long takes to capture the chaotic, constantly shifting tides of power, executions, and the sheer absurdity of combat.",
            plot: "During the chaos of the Russian Civil War in 1919, Hungarian volunteers fight alongside the Bolsheviks, leading to a brutal, senseless series of captures, escapes, and executions as the surrounding hills change hands continuously.",
            releaseDate: "November 3, 1967",
            country: "Hungary / Soviet Union"
        }
    ],
    'cristian-mungiu': [
        {
            title: "4 Months, 3 Weeks and 2 Days",
            year: 2007,
            director: "Cristian Mungiu",
            writer: "Cristian Mungiu",
            cinematographer: "Oleg Mutu",
            editor: "Dana Bunescu",
            composer: "N/A",
            studio: "Mobra Films / SRI Studio",
            focus: "A defining triumph of the Romanian New Wave. Mungiu uses agonizing, unbroken long takes and a complete lack of non-diegetic music to trap the viewer in the suffocating tension and bureaucratic horror of Ceaușescu's Romania.",
            plot: "In 1987, during the oppressive final years of the Romanian communist regime, a fiercely devoted university student risks her own life to help her terrified friend secure an illegal abortion in a dingy hotel room.",
            releaseDate: "June 1, 2007",
            country: "Romania"
        },
        {
            title: "Beyond the Hills",
            year: 2012,
            director: "Cristian Mungiu",
            writer: "Cristian Mungiu",
            cinematographer: "Oleg Mutu",
            editor: "Mircea Olteanu",
            composer: "N/A",
            studio: "Mobra Films / Why Not Productions / Les Films du Fleuve",
            focus: "Shot with stark, punishing realism and deep focus cinematography in a snowy, desolate landscape, exploring the deadly intersection of profound religious dogma and unaddressed mental illness.",
            plot: "A young woman returns to Romania to convince her childhood friend, who has become a deeply devoted orthodox nun, to leave a secluded monastery, inciting a tragic clash between the outside world and rigid religious fundamentalism.",
            releaseDate: "May 19, 2012",
            country: "Romania / France / Belgium"
        }
    ],
    'cristi-puiu': [
        {
            title: "The Death of Mr. Lazarescu",
            year: 2005,
            director: "Cristi Puiu",
            writer: "Cristi Puiu / Răzvan Rădulescu",
            cinematographer: "Oleg Mutu",
            editor: "Dana Bunescu",
            composer: "N/A",
            studio: "Mandragora",
            focus: "The spark that ignited the Romanian New Wave, utilizing an uncompromisingly bleak, hyper-realistic, documentary-like handheld camera to capture a descent into bureaucratic hell in real-time.",
            plot: "An elderly, ailing man in Bucharest is shuttled from one overburdened hospital to another throughout a single, agonizing night, slowly dying as he is repeatedly ignored by an indifferent and utterly broken healthcare system.",
            releaseDate: "September 22, 2005",
            country: "Romania"
        },
        {
            title: "Sieranevada",
            year: 2016,
            director: "Cristi Puiu",
            writer: "Cristi Puiu",
            cinematographer: "Barbu Bălășoiu",
            editor: "Letiția Ștefănescu / Ciprian Cimpoi",
            composer: "N/A",
            studio: "Mandragora / Production2006 / Alcatraz Films",
            focus: "An extraordinary feat of staging and panning camera work; the film is almost entirely confined to a cramped apartment, acting as a fly-on-the-wall observing the overlapping conversations and chaos of a massive family.",
            plot: "Three days after the terrorist attack on Charlie Hebdo, a massive, highly dysfunctional Romanian family gathers in a crowded apartment to commemorate the recent passing of their patriarch, leading to bitter arguments and unveiled secrets.",
            releaseDate: "September 9, 2016",
            country: "Romania / France / Bosnia and Herzegovina / Croatia / Macedonia"
        }
    ],
    'corneliu-porumboiu': [
        {
            title: "12:08 East of Bucharest",
            year: 2006,
            director: "Corneliu Porumboiu",
            writer: "Corneliu Porumboiu",
            cinematographer: "Marius Panduru",
            editor: "Roxana Szel",
            composer: "N/A",
            studio: "42 Km Film",
            focus: "A dry, brilliant satire that uses extended, static, painfully awkward takes—particularly during a disastrous local television broadcast—to explore the subjectivity of historical memory and truth.",
            plot: "Sixteen years after the fall of Ceaușescu, a small-town talk show host invites two local men—an alcoholic teacher and an elderly retiree—onto his live program to debate whether a true revolution actually occurred in their town.",
            releaseDate: "September 29, 2006",
            country: "Romania"
        },
        {
            title: "Police, Adjective",
            year: 2009,
            director: "Corneliu Porumboiu",
            writer: "Corneliu Porumboiu",
            cinematographer: "Marius Panduru",
            editor: "Roxana Szel",
            composer: "N/A",
            studio: "42 Km Film / Periscop Film",
            focus: "Porumboiu deconstructs the traditional police procedural by focusing entirely on the mind-numbing bureaucracy of the job, using extraordinarily long, quiet takes to meditate on language, law, and morality.",
            plot: "A conscientious, weary police detective in a small Romanian town experiences a profound crisis of conscience when he is ordered to arrest a teenage boy for a minor, victimless drug offense that will ruin the boy's life.",
            releaseDate: "July 3, 2009",
            country: "Romania"
        }
    ],
    'emir-kusturica': [
        {
            title: "Underground",
            year: 1995,
            director: "Emir Kusturica",
            writer: "Dušan Kovačević / Emir Kusturica",
            cinematographer: "Vilko Filač",
            editor: "Branka Čeperac",
            composer: "Goran Bregović",
            studio: "CiBy 2000 / Pandora Film / Novo Film / Komuna",
            focus: "An absolutely chaotic, raucous, and sprawling magical-realist epic, combining frantic brass band music, surreal visual poetry, and unhinged performances to symbolize the tragic, farcical history of Yugoslavia.",
            plot: "A corrupt, charismatic opportunist manipulates his best friend and a group of partisans into hiding in a vast underground cellar, tricking them into believing World War II is still raging above them for the next fifty years.",
            releaseDate: "April 1, 1995",
            country: "Federal Republic of Yugoslavia / France / Germany / Hungary"
        },
        {
            title: "Time of the Gypsies",
            year: 1988,
            director: "Emir Kusturica",
            writer: "Emir Kusturica / Gordan Mihić",
            cinematographer: "Vilko Filač",
            editor: "Andrija Zafranović",
            composer: "Goran Bregović",
            studio: "Forum Sarajevo / P.F.A. Cinematografica / Lowndes Productions",
            focus: "A breathtakingly vibrant, deeply empathetic portrayal of Romani culture, utilizing non-professional actors, the Romani language, and soaring flights of magical realism to craft a devastating coming-of-age tragedy.",
            plot: "A young Romani boy with telekinetic powers is lured away from his grandmother in Yugoslavia to Italy by a ruthless gangster, plunging him into a tragic, corrupting life of petty crime and human trafficking.",
            releaseDate: "December 21, 1988",
            country: "Yugoslavia / United Kingdom / Italy"
        },
        {
            title: "Black Cat, White Cat",
            year: 1998,
            director: "Emir Kusturica",
            writer: "Gordan Mihić / Emir Kusturica",
            cinematographer: "Thierry Arbogast",
            editor: "Svetolik Zajc",
            composer: "Dr. Nele Karajlić / Vojislav Aralica / Dejan Sparavalo",
            studio: "Ciby 2000 / Pandora Film / Komuna",
            focus: "A joyous, absurdly energetic farce overflowing with vitality, animals, and non-stop brass music, featuring Kusturica's signature chaotic framing and wild, larger-than-life caricatures.",
            plot: "In a chaotic Romani settlement on the banks of the Danube River, two feuding patriarchs and a bumbling young smuggler become entangled in a massive, absurd conspiracy involving a forced marriage and a heavily drugged corpse.",
            releaseDate: "September 10, 1998",
            country: "Federal Republic of Yugoslavia / France / Germany / Austria / Greece"
        }
    ],
    'danis-tanovic': [
        {
            title: "No Man's Land",
            year: 2001,
            director: "Danis Tanović",
            writer: "Danis Tanović",
            cinematographer: "Walther Vanden Ende",
            editor: "Francesca Calvelli",
            composer: "Danis Tanović",
            studio: "Noé Productions / Judy Counihan Films / Studio Maj / Casablanca Film Production",
            focus: "A darkly comedic, razor-sharp anti-war satire utilizing confined trench warfare framing to highlight the tragic absurdity of the Bosnian conflict and the complete impotence of the UN peacekeeping forces.",
            plot: "During the height of the Bosnian War in 1993, a Bosniak and a Bosnian Serb soldier become trapped together in a trench between enemy lines, complicated by a third soldier who is lying on a live, unremovable bouncing mine.",
            releaseDate: "September 28, 2001",
            country: "Bosnia and Herzegovina / Slovenia / France / United Kingdom / Italy / Belgium"
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
    console.log("Starting TMDB fetch and database update for Eastern European Filmmakers...");
    
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
            await delay(300);
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
    console.log("Successfully updated temp_data.js with Eastern European films!");
}

run();
