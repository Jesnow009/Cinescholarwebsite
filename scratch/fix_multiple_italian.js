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
        if (p.id === 'vittorio-storaro' || p.name === 'Vittorio Storaro') {
            p.mustWatch = [];
            const apocalypse = {
                "id": "apocalypse-now",
                "title": "Apocalypse Now",
                "year": 1979,
                "director": "Francis Ford Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Operatic, highly saturated fever-dream lighting in the jungle.",
                "plot": "At the height of the Vietnam war, Captain Benjamin Willard is sent on a dangerous mission that, officially, 'does not exist, nor will it ever be written.' His goal is to locate - and eliminate - a mysterious Green Beret Colonel named Walter Kurtz.",
                "releaseDate": "1979-08-15",
                "writer": "John Milius, Francis Ford Coppola",
                "cinematographer": "Vittorio Storaro",
                "editor": "Richard Marks, Walter Murch, Gerald B. Greenberg, Lisa Fruchtman",
                "composer": "Carmine Coppola, Francis Ford Coppola",
                "studio": "Omni Zoetrope"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Apocalypse%20Now&year=1979`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) apocalypse.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(apocalypse);

            const conformist = {
                "id": "the-conformist",
                "title": "The Conformist",
                "year": 1970,
                "director": "Bernardo Bertolucci",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Chiaroscuro lighting, geometric fascist architecture, and color symbolism.",
                "plot": "A weak-willed Italian man becomes a fascist flunky who goes abroad to arrange the assassination of his old teacher, now a political dissident.",
                "releaseDate": "1970-10-22",
                "writer": "Bernardo Bertolucci",
                "cinematographer": "Vittorio Storaro",
                "editor": "Franco Arcalli",
                "composer": "Georges Delerue",
                "studio": "Mars Film / Paramount Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Conformist&year=1970`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) conformist.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(conformist);

            const emperor = {
                "id": "the-last-emperor",
                "title": "The Last Emperor",
                "year": 1987,
                "director": "Bernardo Bertolucci",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Grand, sweeping tracking shots and symbolic color progression representing life stages.",
                "plot": "A dramatic history of Pu Yi, the last of the Emperors of China, from his lofty birth and brief reign in the Forbidden City, the object of worship by half a billion people; through his abdication, his decline and dissolute lifestyle; his exploitation by the invading Japanese, and finally to his obscure existence as just another peasant worker in the People's Republic.",
                "releaseDate": "1987-10-04",
                "writer": "Mark Peploe, Bernardo Bertolucci",
                "cinematographer": "Vittorio Storaro",
                "editor": "Gabriella Cristiani",
                "composer": "Ryuichi Sakamoto, David Byrne, Cong Su",
                "studio": "Recorded Picture Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Last%20Emperor`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) emperor.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(emperor);

            modified = true;
        }

        if (p.id === 'gianni-di-venanzo' || p.name === 'Gianni Di Venanzo') {
            p.mustWatch = [];
            const otto = {
                "id": "8-and-a-half",
                "title": "8½",
                "year": 1963,
                "director": "Federico Fellini",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "High-contrast, dreamlike, floating black-and-white cinematography.",
                "plot": "Guido Anselmi, a film director, finds himself creatively barren at the peak of his career. Urged by his doctors to rest, Anselmi heads for a luxurious resort, but a sorry group gathers—his producer, staff, actors, wife, mistress, and relatives—each one begging him to get on with the show.",
                "releaseDate": "1963-02-14",
                "writer": "Federico Fellini, Ennio Flaiano, Tullio Pinelli, Brunello Rondi",
                "cinematographer": "Gianni Di Venanzo",
                "editor": "Leo Catozzo",
                "composer": "Nino Rota",
                "studio": "Cineriz"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=8%C2%BD&year=1963`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) otto.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(otto);

            const eclisse = {
                "id": "l-eclisse",
                "title": "L'Eclisse",
                "year": 1962,
                "director": "Michelangelo Antonioni",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, modernist architectural framing emphasizing alienation.",
                "plot": "A young woman meets a vital young man, but their love affair is doomed because of the man's materialistic nature.",
                "releaseDate": "1962-04-12",
                "writer": "Michelangelo Antonioni, Tonino Guerra",
                "cinematographer": "Gianni Di Venanzo",
                "editor": "Eraldo Da Roma",
                "composer": "Giovanni Fusco",
                "studio": "Interopa Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=L%27Eclisse`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) eclisse.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(eclisse);

            const salvatore = {
                "id": "salvatore-giuliano",
                "title": "Salvatore Giuliano",
                "year": 1962,
                "director": "Francesco Rosi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Gritty, sun-bleached, documentary-style neorealism.",
                "plot": "A neo-realist look at the life of the infamous Sicilian bandit, Salvatore Giuliano.",
                "releaseDate": "1962-02-28",
                "writer": "Francesco Rosi, Suso Cecchi d'Amico, Enzo Provenzale, Franco Solinas",
                "cinematographer": "Gianni Di Venanzo",
                "editor": "Mario Serandrei",
                "composer": "Piero Piccioni",
                "studio": "Lux Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Salvatore%20Giuliano`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) salvatore.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(salvatore);

            modified = true;
        }

        if (p.id === 'luca-bigazzi' || p.name === 'Luca Bigazzi') {
            p.mustWatch = [];
            const beauty = {
                "id": "the-great-beauty",
                "title": "The Great Beauty",
                "year": 2013,
                "director": "Paolo Sorrentino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Fluid, roaming tracking shots capturing opulent, decadent parties and ancient Roman ruins.",
                "plot": "Jep Gambardella has seduced his way through the lavish nightlife of Rome for decades, but after his 65th birthday and a shock from the past, Jep looks past the nightclubs and parties to find a timeless landscape of absurd, exquisite beauty.",
                "releaseDate": "2013-05-21",
                "writer": "Paolo Sorrentino, Umberto Contarello",
                "cinematographer": "Luca Bigazzi",
                "editor": "Cristiano Travaglioli",
                "composer": "Lele Marchitelli",
                "studio": "Indigo Film"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Great%20Beauty`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) beauty.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(beauty);

            const youth = {
                "id": "youth",
                "title": "Youth",
                "year": 2015,
                "director": "Paolo Sorrentino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Crisp, symmetrical, and luminous compositions in a Swiss Alps resort.",
                "plot": "Fred and Mick, two old friends, are on vacation in an elegant hotel at the foot of the Alps. Fred, a composer and conductor, is now retired. Mick, a film director, is still working. They look with curiosity and tenderness on their children's confused lives, Mick's enthusiastic young writers, and the other hotel guests.",
                "releaseDate": "2015-05-20",
                "writer": "Paolo Sorrentino",
                "cinematographer": "Luca Bigazzi",
                "editor": "Cristiano Travaglioli",
                "composer": "David Lang",
                "studio": "Indigo Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Youth&year=2015`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) youth.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(youth);

            const divo = {
                "id": "il-divo",
                "title": "Il Divo",
                "year": 2008,
                "director": "Paolo Sorrentino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Kinetic, highly stylized political satire with aggressive camera movement.",
                "plot": "The story of Italian politician Giulio Andreotti, who served as Prime Minister of Italy seven times, and his alleged ties to the Mafia.",
                "releaseDate": "2008-05-23",
                "writer": "Paolo Sorrentino",
                "cinematographer": "Luca Bigazzi",
                "editor": "Cristiano Travaglioli",
                "composer": "Teho Teardo",
                "studio": "Indigo Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Il%20Divo&year=2008`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) divo.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(divo);

            modified = true;
        }

        if (p.id === 'dante-spinotti' || p.name === 'Dante Spinotti') {
            p.mustWatch = [];
            const heat = {
                "id": "heat",
                "title": "Heat",
                "year": 1995,
                "director": "Michael Mann",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Cool blue nighttime cityscapes and hyper-realistic, kinetic action photography.",
                "plot": "Obsessive master thief, Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective, Vincent Hanna pursues him without rest.",
                "releaseDate": "1995-12-15",
                "writer": "Michael Mann",
                "cinematographer": "Dante Spinotti",
                "editor": "Dov Hoenig, Pasquale Buba, William Goldenberg, Tom Rolf",
                "composer": "Elliot Goldenthal",
                "studio": "Warner Bros."
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Heat&year=1995`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) heat.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(heat);

            const lac = {
                "id": "la-confidential",
                "title": "L.A. Confidential",
                "year": 1997,
                "director": "Curtis Hanson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sharp, sunlit neo-noir utilizing period-accurate lighting and strong shadows.",
                "plot": "As corruption grows in 1950s Los Angeles, three policemen—one strait-laced, one brutal, and one sleazy—investigate a series of murders with their own brand of justice.",
                "releaseDate": "1997-09-19",
                "writer": "Brian Helgeland, Curtis Hanson",
                "cinematographer": "Dante Spinotti",
                "editor": "Peter Honess",
                "composer": "Jerry Goldsmith",
                "studio": "Regency Enterprises"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=L.A.%20Confidential&year=1997`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) lac.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(lac);

            const mohicans = {
                "id": "the-last-of-the-mohicans",
                "title": "The Last of the Mohicans",
                "year": 1992,
                "director": "Michael Mann",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweeping wilderness landscapes and visceral, fire-lit battle sequences.",
                "plot": "As the English and French soldiers battle for control of the American colonies in the 18th century, the settlers and native Americans are forced to take sides.",
                "releaseDate": "1992-09-25",
                "writer": "Michael Mann, Christopher Crowe",
                "cinematographer": "Dante Spinotti",
                "editor": "Dov Hoenig, Arthur Schmidt",
                "composer": "Trevor Jones, Randy Edelman",
                "studio": "Morgan Creek / 20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Last%20of%20the%20Mohicans&year=1992`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mohicans.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mohicans);

            modified = true;
        }

        if (p.id === 'tonino-delli-colli' || p.name === 'Tonino Delli Colli') {
            p.mustWatch = [];
            const west = {
                "id": "once-upon-a-time-in-the-west",
                "title": "Once Upon a Time in the West",
                "year": 1968,
                "director": "Sergio Leone",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Extreme tight close-ups, sweeping panoramic wide shots, and sun-drenched dusty vistas.",
                "plot": "A mysterious stranger with a harmonica joins forces with a notorious desperado to protect a beautiful widow from a ruthless assassin working for the railroad.",
                "releaseDate": "1968-12-21",
                "writer": "Sergio Donati, Sergio Leone",
                "cinematographer": "Tonino Delli Colli",
                "editor": "Nino Baragli",
                "composer": "Ennio Morricone",
                "studio": "Rafran Cinematografica / Paramount Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Once%20Upon%20a%20Time%20in%20the%20West&year=1968`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) west.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(west);

            const rose = {
                "id": "the-name-of-the-rose",
                "title": "The Name of the Rose",
                "year": 1986,
                "director": "Jean-Jacques Annaud",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Dark, candle-lit monastic interiors invoking medieval paranoia.",
                "plot": "14th-century Franciscan monk William of Baskerville and his novice arrive at a conference to find that several monks have been murdered under mysterious circumstances.",
                "releaseDate": "1986-09-24",
                "writer": "Andrew Birkin, Gérard Brach, Howard Franklin, Alain Godard",
                "cinematographer": "Tonino Delli Colli",
                "editor": "Jane Seitz",
                "composer": "James Horner",
                "studio": "Neue Constantin Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Name%20of%20the%20Rose&year=1986`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) rose.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(rose);

            const life = {
                "id": "life-is-beautiful",
                "title": "Life Is Beautiful",
                "year": 1997,
                "director": "Roberto Benigni",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, sunny Italian vistas transitioning into bleak, muted concentration camp desolation.",
                "plot": "A touching story of an Italian book seller of Jewish ancestry who lives in his own, little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II.",
                "releaseDate": "1997-12-20",
                "writer": "Vincenzo Cerami, Roberto Benigni",
                "cinematographer": "Tonino Delli Colli",
                "editor": "Simona Paggi",
                "composer": "Nicola Piovani",
                "studio": "Melampo Cinematografica"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Life%20Is%20Beautiful&year=1997`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) life.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(life);

            modified = true;
        }

        if (p.id === 'giuseppe-rotunno' || p.name === 'Giuseppe Rotunno') {
            p.mustWatch = [];
            const leopard = {
                "id": "the-leopard",
                "title": "The Leopard",
                "year": 1963,
                "director": "Luchino Visconti",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Opulent, historically precise 70mm widescreen capturing Sicilian aristocracy.",
                "plot": "As Garibaldi's troops begin the unification of Italy in the 1860s, an aristocratic Sicilian family adapts to the turbulent social changes threatening their way of life.",
                "releaseDate": "1963-03-28",
                "writer": "Suso Cecchi d'Amico, Pasquale Festa Campanile, Enrico Medioli, Massimo Franciosa, Luchino Visconti",
                "cinematographer": "Giuseppe Rotunno",
                "editor": "Mario Serandrei",
                "composer": "Nino Rota",
                "studio": "Titanus"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Leopard&year=1963`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) leopard.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(leopard);

            const jazz = {
                "id": "all-that-jazz",
                "title": "All That Jazz",
                "year": 1979,
                "director": "Bob Fosse",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Theatrical, highly stylized spotlights and dynamic dance tracking.",
                "plot": "Director/choreographer Bob Fosse tells his own life story as he details the exhausting, frantic life of Joe Gideon, a choreographer directing a new Broadway musical while editing a feature film.",
                "releaseDate": "1979-12-20",
                "writer": "Robert Alan Aurthur, Bob Fosse",
                "cinematographer": "Giuseppe Rotunno",
                "editor": "Alan Heim",
                "composer": "Ralph Burns",
                "studio": "Columbia Pictures / 20th Century Fox"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=All%20That%20Jazz&year=1979`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) jazz.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(jazz);

            const amarcord = {
                "id": "amarcord",
                "title": "Amarcord",
                "year": 1973,
                "director": "Federico Fellini",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, surreal, and nostalgic lighting of a recreated coastal town.",
                "plot": "A year in the life of a small Italian coastal town in the 1930s, as is recalled by a director with a superstar's touch.",
                "releaseDate": "1973-12-18",
                "writer": "Federico Fellini, Tonino Guerra",
                "cinematographer": "Giuseppe Rotunno",
                "editor": "Ruggero Mastroianni",
                "composer": "Nino Rota",
                "studio": "F.C. Produzioni"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Amarcord&year=1973`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) amarcord.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(amarcord);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Italian cinematographers.");
    }
}

run();
