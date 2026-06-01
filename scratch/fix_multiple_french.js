const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', () => r(null)));
}

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (const p of data.cinematographer.cinematographers) {
        if (p.id === 'raoul-coutard' || p.name === 'Raoul Coutard') {
            p.mustWatch = [];
            const breathless = {
                "id": "breathless",
                "title": "Breathless (À bout de souffle)",
                "year": 1960,
                "director": "Jean-Luc Godard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Revolutionary handheld mobility and natural light capturing the French New Wave.",
                "plot": "A small-time thief steals a car and impulsively murders a motorcycle policeman. Wanted by the authorities, he reunites with a hip American journalism student and attempts to persuade her to run away with him to Italy.",
                "releaseDate": "1960-03-16",
                "writer": "Jean-Luc Godard",
                "cinematographer": "Raoul Coutard",
                "editor": "Cécile Decugis",
                "composer": "Martial Solal",
                "studio": "Les Films Impéria"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Breathless&year=1960`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) breathless.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(breathless);

            const contempt = {
                "id": "contempt",
                "title": "Contempt (Le Mépris)",
                "year": 1963,
                "director": "Jean-Luc Godard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, sun-drenched CinemaScope and primary colors.",
                "plot": "Screenwriter Paul Javal's marriage to his wife Camille disintegrates during movie production as she spends time with the producer.",
                "releaseDate": "1963-10-29",
                "writer": "Jean-Luc Godard",
                "cinematographer": "Raoul Coutard",
                "editor": "Agnès Guillemot",
                "composer": "Georges Delerue",
                "studio": "Rome Paris Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Contempt&year=1963`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) contempt.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(contempt);

            const z = {
                "id": "z",
                "title": "Z",
                "year": 1969,
                "director": "Costa-Gavras",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, urgent, documentary-style political thriller aesthetics.",
                "plot": "Following the murder of a prominent leftist, an investigator uncovers a network of police and military corruption.",
                "releaseDate": "1969-02-26",
                "writer": "Jorge Semprún, Costa-Gavras",
                "cinematographer": "Raoul Coutard",
                "editor": "Françoise Bonnot",
                "composer": "Mikis Theodorakis",
                "studio": "Reggane Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Z&year=1969`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) z.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(z);

            modified = true;
        }

        if (p.id === 'bruno-delbonnel' || p.name === 'Bruno Delbonnel') {
            p.mustWatch = [];
            const amelie = {
                "id": "amelie",
                "title": "Amélie",
                "year": 2001,
                "director": "Jean-Pierre Jeunet",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, highly saturated magical realism with distinct green/yellow palettes.",
                "plot": "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
                "releaseDate": "2001-04-25",
                "writer": "Jean-Pierre Jeunet, Guillaume Laurant",
                "cinematographer": "Bruno Delbonnel",
                "editor": "Hervé Schneid",
                "composer": "Yann Tiersen",
                "studio": "Victoires Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Amélie`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) amelie.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(amelie);

            const llewyn = {
                "id": "inside-llewyn-davis",
                "title": "Inside Llewyn Davis",
                "year": 2013,
                "director": "Joel Coen, Ethan Coen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Desaturated, melancholic, soft diffused light capturing a wintery New York.",
                "plot": "A week in the life of a young singer as he navigates the Greenwich Village folk scene of 1961.",
                "releaseDate": "2013-11-06",
                "writer": "Joel Coen, Ethan Coen",
                "cinematographer": "Bruno Delbonnel",
                "editor": "Rodrigo Prieto",
                "composer": "Marcus Mumford, T Bone Burnett",
                "studio": "Mike Zoss Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Inside%20Llewyn%20Davis`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) llewyn.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(llewyn);

            const macbeth = {
                "id": "the-tragedy-of-macbeth",
                "title": "The Tragedy of Macbeth",
                "year": 2021,
                "director": "Joel Coen",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, expressionist black-and-white theatrical abstraction.",
                "plot": "A Scottish lord becomes convinced by a trio of witches that he will become the next King of Scotland.",
                "releaseDate": "2021-12-25",
                "writer": "Joel Coen",
                "cinematographer": "Bruno Delbonnel",
                "editor": "Lucian Johnston",
                "composer": "Carter Burwell",
                "studio": "IAC Films / A24"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Tragedy%20of%20Macbeth`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) macbeth.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(macbeth);

            modified = true;
        }

        if (p.id === 'agnes-godard' || p.name === 'Agnès Godard') {
            p.mustWatch = [];
            const beau = {
                "id": "beau-travail",
                "title": "Beau Travail",
                "year": 1999,
                "director": "Claire Denis",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Tactile, poetic, and sun-bleached observation of bodies in space.",
                "plot": "This film focuses on an ex-Foreign Legion officer as he recalls his once glorious life, leading troops in Africa.",
                "releaseDate": "1999-09-04",
                "writer": "Claire Denis, Jean-Pol Fargeau",
                "cinematographer": "Agnès Godard",
                "editor": "Nelly Quettier",
                "composer": "Charles Henri de Brock",
                "studio": "La Sept-Arte"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Beau%20Travail`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) beau.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(beau);

            const rum = {
                "id": "35-shots-of-rum",
                "title": "35 Shots of Rum",
                "year": 2008,
                "director": "Claire Denis",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, intimate, and dimly lit observational naturalism.",
                "plot": "A long-standing, pseudo-marital relationship between a father and daughter is soon to be tested.",
                "releaseDate": "2008-08-29",
                "writer": "Claire Denis, Jean-Pol Fargeau",
                "cinematographer": "Agnès Godard",
                "editor": "Guy Lecorne",
                "composer": "Tindersticks",
                "studio": "Soudaine Compagnie"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=35%20Shots%20of%20Rum`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) rum.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(rum);

            const home = {
                "id": "home",
                "title": "Home",
                "year": 2008,
                "director": "Ursula Meier",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Absurdist framing conveying suburban isolation against an empty highway.",
                "plot": "A family's peaceful existence is threatened when a busy highway is opened only meters away from their isolated house.",
                "releaseDate": "2008-05-18",
                "writer": "Ursula Meier, Antoine Jaccoud",
                "cinematographer": "Agnès Godard",
                "editor": "Susana Rossberg",
                "composer": "Frank Beauvais, Edana",
                "studio": "Box Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Home&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) home.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(home);

            modified = true;
        }

        if (p.id === 'benoit-debie' || p.name === 'Benoît Debie') {
            p.mustWatch = [];
            const voidm = {
                "id": "enter-the-void",
                "title": "Enter the Void",
                "year": 2009,
                "director": "Gaspar Noé",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Trippy, neon-soaked subjective POV with floating camera work.",
                "plot": "An American drug dealer living in Tokyo is killed in a police raid, but his soul continues to observe his sister and friends.",
                "releaseDate": "2009-05-22",
                "writer": "Gaspar Noé",
                "cinematographer": "Benoît Debie",
                "editor": "Gaspar Noé, Marc Boucrot",
                "composer": "Thomas Bangalter",
                "studio": "Fidélité Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Enter%20the%20Void`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) voidm.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(voidm);

            const spring = {
                "id": "spring-breakers",
                "title": "Spring Breakers",
                "year": 2012,
                "director": "Harmony Korine",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Hyper-colored, fluorescent, day-glo fever dream.",
                "plot": "Four college girls hold up a restaurant in order to fund their spring break vacation. While partying, they get arrested and bailed out by a local drug dealer.",
                "releaseDate": "2012-09-04",
                "writer": "Harmony Korine",
                "cinematographer": "Benoît Debie",
                "editor": "Douglas Crise",
                "composer": "Cliff Martinez, Skrillex",
                "studio": "Muse Productions / A24"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Spring%20Breakers`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) spring.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(spring);

            const sisters = {
                "id": "the-sisters-brothers",
                "title": "The Sisters Brothers",
                "year": 2018,
                "director": "Jacques Audiard",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pitch-black night scenes and painterly western landscapes.",
                "plot": "In 1850s Oregon, the infamous Sisters brothers are hired to assassinate a prospector.",
                "releaseDate": "2018-09-02",
                "writer": "Jacques Audiard, Thomas Bidegain",
                "cinematographer": "Benoît Debie",
                "editor": "Juliette Welfling",
                "composer": "Alexandre Desplat",
                "studio": "Why Not Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Sisters%20Brothers`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) sisters.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(sisters);

            modified = true;
        }

        if (p.id === 'henri-alekan' || p.name === 'Henri Alekan') {
            p.mustWatch = [];
            const beauty = {
                "id": "beauty-and-the-beast",
                "title": "Beauty and the Beast",
                "year": 1946,
                "director": "Jean Cocteau",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Magical, ethereal, and deeply romantic black-and-white lighting.",
                "plot": "A beautiful young woman takes her father's place as the prisoner of a mysterious beast, who wishes to marry her.",
                "releaseDate": "1946-10-29",
                "writer": "Jean Cocteau",
                "cinematographer": "Henri Alekan",
                "editor": "Claude Iberia",
                "composer": "Georges Auric",
                "studio": "DisCina"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Beauty%20and%20the%20Beast&year=1946`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) beauty.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(beauty);

            const wings = {
                "id": "wings-of-desire",
                "title": "Wings of Desire",
                "year": 1987,
                "director": "Wim Wenders",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Silvery, melancholic black-and-white for angelic perspectives juxtaposed with color.",
                "plot": "Invisible, immortal angels populate Berlin and listen to the thoughts of its human inhabitants, comforting the distressed.",
                "releaseDate": "1987-09-23",
                "writer": "Wim Wenders, Peter Handke",
                "cinematographer": "Henri Alekan",
                "editor": "Peter Przygodda",
                "composer": "Jürgen Knieper",
                "studio": "Road Movies Filmproduktion"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Wings%20of%20Desire`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) wings.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(wings);

            const roman = {
                "id": "roman-holiday",
                "title": "Roman Holiday",
                "year": 1953,
                "director": "William Wyler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sparkling, luminous black-and-white location shooting in Rome.",
                "plot": "A bored and sheltered princess escapes her guardians and falls in love with an American newsman in Rome.",
                "releaseDate": "1953-08-27",
                "writer": "Dalton Trumbo",
                "cinematographer": "Henri Alekan, Franz Planer",
                "editor": "Robert Swink",
                "composer": "Georges Auric, Victor Young",
                "studio": "Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Roman%20Holiday`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) roman.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(roman);

            modified = true;
        }

        if (p.id === 'henri-decae' || p.name === 'Henri Decaë' || p.name.includes('Deca')) {
            p.mustWatch = [];
            const blows = {
                "id": "the-400-blows",
                "title": "The 400 Blows",
                "year": 1959,
                "director": "François Truffaut",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Spontaneous, mobile location shooting defining the French New Wave.",
                "plot": "A young boy, left without attention, delves into a life of petty crime.",
                "releaseDate": "1959-05-04",
                "writer": "François Truffaut, Marcel Moussy",
                "cinematographer": "Henri Decaë",
                "editor": "Marie-Josèphe Yoyotte",
                "composer": "Jean Constantin",
                "studio": "Les Films du Carrosse"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20400%20Blows`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) blows.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(blows);

            const samourai = {
                "id": "le-samourai",
                "title": "Le Samouraï",
                "year": 1967,
                "director": "Jean-Pierre Melville",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cool, stark, grey-and-blue minimalist noir aesthetics.",
                "plot": "After a professional hitman leaves witnesses, he must cover his tracks as both the police and his employers try to catch him.",
                "releaseDate": "1967-10-25",
                "writer": "Jean-Pierre Melville",
                "cinematographer": "Henri Decaë",
                "editor": "Monique Bonnot",
                "composer": "François de Roubaix",
                "studio": "Filmel"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Le%20Samouraï`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) samourai.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(samourai);

            const elevator = {
                "id": "elevator-to-the-gallows",
                "title": "Elevator to the Gallows",
                "year": 1958,
                "director": "Louis Malle",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Moodily lit, jazz-infused Parisian nightscapes.",
                "plot": "A self-assured business man murders his employer, the husband of his mistress, which unintentionally provokes an ill-fated chain of events.",
                "releaseDate": "1958-01-29",
                "writer": "Louis Malle, Roger Nimier",
                "cinematographer": "Henri Decaë",
                "editor": "Léonide Azar",
                "composer": "Miles Davis",
                "studio": "Nouvelles Éditions de Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Elevator%20to%20the%20Gallows`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) elevator.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(elevator);

            modified = true;
        }

        if (p.id === 'maryse-alberti' || p.name === 'Maryse Alberti') {
            p.mustWatch = [];
            const wrestler = {
                "id": "the-wrestler",
                "title": "The Wrestler",
                "year": 2008,
                "director": "Darren Aronofsky",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Intimate, gritty, documentary-style over-the-shoulder tracking shots.",
                "plot": "A faded professional wrestler must retire, but finds his quest for a new life outside the ring a dispiriting struggle.",
                "releaseDate": "2008-12-17",
                "writer": "Robert Siegel",
                "cinematographer": "Maryse Alberti",
                "editor": "Andrew Weisblum",
                "composer": "Clint Mansell",
                "studio": "Protozoa Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Wrestler&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) wrestler.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(wrestler);

            const creed = {
                "id": "creed",
                "title": "Creed",
                "year": 2015,
                "director": "Ryan Coogler",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Visceral, kinetic, and highly choreographed long takes.",
                "plot": "The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed.",
                "releaseDate": "2015-11-25",
                "writer": "Ryan Coogler",
                "cinematographer": "Maryse Alberti",
                "editor": "Michael P. Shawver, Claudia Castello",
                "composer": "Ludwig Göransson",
                "studio": "Metro-Goldwyn-Mayer"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Creed&year=2015`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) creed.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(creed);

            const velvet = {
                "id": "velvet-goldmine",
                "title": "Velvet Goldmine",
                "year": 1998,
                "director": "Todd Haynes",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Glamorous, colorful, highly stylized theatricality.",
                "plot": "In 1984, a British journalist tries to uncover what happened to his former idol, a glam rock star who faked his own death a decade earlier.",
                "releaseDate": "1998-10-23",
                "writer": "Todd Haynes",
                "cinematographer": "Maryse Alberti",
                "editor": "James Lyons",
                "composer": "Carter Burwell",
                "studio": "Zenith Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Velvet%20Goldmine`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) velvet.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(velvet);

            modified = true;
        }

        if (p.id === 'claire-mathon' || p.name === 'Claire Mathon') {
            p.mustWatch = [];
            const portrait = {
                "id": "portrait-of-a-lady-on-fire",
                "title": "Portrait of a Lady on Fire",
                "year": 2019,
                "director": "Céline Sciamma",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Painterly, textured, and deeply intimate digital lighting mimicking 18th-century art.",
                "plot": "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
                "releaseDate": "2019-05-19",
                "writer": "Céline Sciamma",
                "cinematographer": "Claire Mathon",
                "editor": "Julien Lacheray",
                "composer": "Jean-Baptiste de Laubier, Arthur Simonini",
                "studio": "Lilies Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Portrait%20of%20a%20Lady%20on%20Fire`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) portrait.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(portrait);

            const atlantics = {
                "id": "atlantics",
                "title": "Atlantics",
                "year": 2019,
                "director": "Mati Diop",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Ethereal, haunting, neon-lit supernatural naturalism.",
                "plot": "In a popular suburb of Dakar, workers on the construction site of a futuristic tower, without pay for months, decide to leave the country by the ocean for a better future.",
                "releaseDate": "2019-05-16",
                "writer": "Mati Diop, Olivier Demangel",
                "cinematographer": "Claire Mathon",
                "editor": "Aël Dallier Vega",
                "composer": "Fatima Al Qadiri",
                "studio": "Les Films du Bal"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Atlantics&year=2019`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) atlantics.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(atlantics);

            const omer = {
                "id": "saint-omer",
                "title": "Saint Omer",
                "year": 2022,
                "director": "Alice Diop",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rigorous, austere framing emphasizing the spoken word.",
                "plot": "Rama, a novelist, attends the trial of Laurence Coly, a young woman accused of killing her 15-month-old daughter.",
                "releaseDate": "2022-09-07",
                "writer": "Alice Diop, Amrita David",
                "cinematographer": "Claire Mathon",
                "editor": "Amrita David",
                "composer": "None",
                "studio": "SRAB Films"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Saint%20Omer`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) omer.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(omer);

            modified = true;
        }

        if (p.id === 'philippe-rousselot' || p.name === 'Philippe Rousselot') {
            p.mustWatch = [];
            const river = {
                "id": "a-river-runs-through-it",
                "title": "A River Runs Through It",
                "year": 1992,
                "director": "Robert Redford",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Lush, sun-dappled and majestic nature photography.",
                "plot": "The story about two sons of a stern minister—one reserved, one rebellious—growing up in rural Montana.",
                "releaseDate": "1992-10-09",
                "writer": "Richard Friedenberg",
                "cinematographer": "Philippe Rousselot",
                "editor": "Robert Dalva, Lynzee Klingman",
                "composer": "Mark Isham",
                "studio": "Columbia Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A%20River%20Runs%20Through%20It`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) river.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(river);

            const interview = {
                "id": "interview-with-the-vampire",
                "title": "Interview with the Vampire",
                "year": 1994,
                "director": "Neil Jordan",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rich, opulent, and dimly lit gothic period lighting.",
                "plot": "A vampire tells his epic life story: love, betrayal, loneliness, and hunger.",
                "releaseDate": "1994-11-11",
                "writer": "Anne Rice",
                "cinematographer": "Philippe Rousselot",
                "editor": "Mick Audsley, Joke van Wijk",
                "composer": "Elliot Goldenthal",
                "studio": "Geffen Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Interview%20with%20the%20Vampire`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) interview.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(interview);

            const big = {
                "id": "big-fish",
                "title": "Big Fish",
                "year": 2003,
                "director": "Tim Burton",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, highly stylized and colorful fable-like aesthetics.",
                "plot": "A frustrated son tries to determine the fact from fiction in his dying father's life.",
                "releaseDate": "2003-12-10",
                "writer": "John August",
                "cinematographer": "Philippe Rousselot",
                "editor": "Chris Lebenzon",
                "composer": "Danny Elfman",
                "studio": "Columbia Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Big%20Fish`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) big.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(big);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated French cinematographers.");
    }
}

run();
