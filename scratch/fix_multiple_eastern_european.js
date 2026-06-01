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
        if (p.name.includes('Łukasz Żal') || p.id === 'lukasz-zal') {
            p.mustWatch = [];
            const zone = {
                "id": "the-zone-of-interest",
                "title": "The Zone of Interest",
                "year": 2023,
                "director": "Jonathan Glazer",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Rigorous, observational hidden-camera setups and stark geometric framing.",
                "plot": "Auschwitz commandant Rudolf Höss and his wife Hedwig strive to build a dream life for their family in a house and garden next to the camp.",
                "releaseDate": "2023-05-19",
                "writer": "Jonathan Glazer",
                "cinematographer": "Łukasz Żal",
                "editor": "Paul Watts",
                "composer": "Mica Levi",
                "studio": "A24 / Film4 Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Zone%20of%20Interest&year=2023`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) zone.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(zone);

            const ida = {
                "id": "ida",
                "title": "Ida",
                "year": 2013,
                "director": "Paweł Pawlikowski",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Stark, high-contrast 4:3 black-and-white with extreme headroom framing.",
                "plot": "Anna, a young novitiate nun in 1960s Poland, is on the verge of taking her vows when she discovers a dark family secret dating back to the years of the Nazi occupation.",
                "releaseDate": "2013-08-30",
                "writer": "Paweł Pawlikowski, Rebecca Lenkiewicz",
                "cinematographer": "Łukasz Żal, Ryszard Lenczewski",
                "editor": "Jarosław Kamiński",
                "composer": "Kristian Eidnes Andersen",
                "studio": "Opus Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ida&year=2013`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) ida.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(ida);

            const coldwar = {
                "id": "cold-war",
                "title": "Cold War (Zimna wojna)",
                "year": 2018,
                "director": "Paweł Pawlikowski",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Crisp, luminous 4:3 black-and-white spanning decades across Europe.",
                "plot": "A passionate love story between two people of different backgrounds and temperaments, who are fatefully mismatched, set against the background of the Cold War in the 1950s in Poland, Berlin, Yugoslavia and Paris.",
                "releaseDate": "2018-05-10",
                "writer": "Paweł Pawlikowski, Janusz Głowacki",
                "cinematographer": "Łukasz Żal",
                "editor": "Jarosław Kamiński",
                "composer": "Marcin Masecki",
                "studio": "Opus Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Cold%20War&year=2018`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) coldwar.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(coldwar);

            modified = true;
        }

        if (p.name.includes('Vilmos Zsigmond') || p.id === 'vilmos-zsigmond') {
            p.mustWatch = [];
            const encounters = {
                "id": "close-encounters-of-the-third-kind",
                "title": "Close Encounters of the Third Kind",
                "year": 1977,
                "director": "Steven Spielberg",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Awe-inspiring, blindingly bright practical lighting effects and deep silhouettes.",
                "plot": "After an encounter with UFOs, an everyday blue-collar worker feels undeniably drawn to an isolated area in the wilderness where something spectacular is about to happen.",
                "releaseDate": "1977-11-16",
                "writer": "Steven Spielberg",
                "cinematographer": "Vilmos Zsigmond",
                "editor": "Michael Kahn",
                "composer": "John Williams",
                "studio": "Columbia Pictures / EMI Films"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Close%20Encounters%20of%20the%20Third%20Kind&year=1977`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) encounters.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(encounters);

            const mccabe = {
                "id": "mccabe-and-mrs-miller",
                "title": "McCabe & Mrs. Miller",
                "year": 1971,
                "director": "Robert Altman",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Flashing techniques used to create a murky, faded, antique western atmosphere.",
                "plot": "A gambler and a prostitute become business partners in a remote Old West mining town, and their enterprise thrives until a large corporation arrives on the scene.",
                "releaseDate": "1971-06-24",
                "writer": "Robert Altman, Brian McKay",
                "cinematographer": "Vilmos Zsigmond",
                "editor": "Lou Lombardo",
                "composer": "Leonard Cohen",
                "studio": "Warner Bros."
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=McCabe%20%26%20Mrs.%20Miller&year=1971`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mccabe.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mccabe);

            const deer = {
                "id": "the-deer-hunter",
                "title": "The Deer Hunter",
                "year": 1978,
                "director": "Michael Cimino",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, smoky industrial town aesthetics contrasted with harsh, desaturated jungle realities.",
                "plot": "An in-depth examination of the ways in which the U.S. Vietnam War impacts and disrupts the lives of people in a small industrial town in Pennsylvania.",
                "releaseDate": "1978-12-08",
                "writer": "Deric Washburn",
                "cinematographer": "Vilmos Zsigmond",
                "editor": "Peter Zinner",
                "composer": "Stanley Myers",
                "studio": "EMI Films / Universal Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Deer%20Hunter&year=1978`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) deer.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(deer);

            modified = true;
        }

        if (p.name.includes('László Kovács') || p.id === 'laszlo-kovacs') {
            p.mustWatch = [];
            const easy = {
                "id": "easy-rider",
                "title": "Easy Rider",
                "year": 1969,
                "director": "Dennis Hopper",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Spontaneous, sun-flared, handheld 16mm capturing American counterculture.",
                "plot": "Two counterculture bikers travel from Los Angeles to New Orleans in search of America.",
                "releaseDate": "1969-07-14",
                "writer": "Peter Fonda, Dennis Hopper, Terry Southern",
                "cinematographer": "László Kovács",
                "editor": "Donn Cambern",
                "composer": "Compiled rock soundtrack",
                "studio": "Pando Company / Raybert Productions"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Easy%20Rider&year=1969`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) easy.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(easy);

            const paper = {
                "id": "paper-moon",
                "title": "Paper Moon",
                "year": 1973,
                "director": "Peter Bogdanovich",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "High-contrast, deep-focus black-and-white mimicking Depression-era photography.",
                "plot": "During the Great Depression, a con man finds himself saddled with a young girl who may or may not be his daughter, and the two forge an unlikely partnership.",
                "releaseDate": "1973-05-09",
                "writer": "Alvin Sargent",
                "cinematographer": "László Kovács",
                "editor": "Verna Fields",
                "composer": "Compiled 1930s radio recordings",
                "studio": "The Directors Company"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Paper%20Moon&year=1973`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) paper.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(paper);

            const five = {
                "id": "five-easy-pieces",
                "title": "Five Easy Pieces",
                "year": 1970,
                "director": "Bob Rafelson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Raw, naturalistic lighting observing working-class alienation.",
                "plot": "A classical musician who has given up his career to work on an oil rig must return home to his wealthy family when he learns his father is ill.",
                "releaseDate": "1970-09-12",
                "writer": "Adrien Joyce",
                "cinematographer": "László Kovács",
                "editor": "Christopher Holmes, Gerald B. Greenberg",
                "composer": "Compiled classical pieces",
                "studio": "BBS Productions"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Five%20Easy%20Pieces&year=1970`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) five.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(five);

            modified = true;
        }

        if (p.name.includes('Mihai') || p.id === 'mihai-malaimare-jr') {
            p.mustWatch = [];
            const master = {
                "id": "the-master",
                "title": "The Master",
                "year": 2012,
                "director": "Paul Thomas Anderson",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Glorious, high-resolution 65mm format capturing piercing psychological depth.",
                "plot": "A Naval veteran arrives home from war unsettled and uncertain of his future - until he is tantalized by The Cause and its charismatic leader.",
                "releaseDate": "2012-09-14",
                "writer": "Paul Thomas Anderson",
                "cinematographer": "Mihai Mălaimare Jr.",
                "editor": "Leslie Jones, Peter McNulty",
                "composer": "Jonny Greenwood",
                "studio": "Ghoulardi Film Company / Annapurna Pictures"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Master&year=2012`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) master.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(master);

            const jojo = {
                "id": "jojo-rabbit",
                "title": "Jojo Rabbit",
                "year": 2019,
                "director": "Taika Waititi",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Vibrant, highly saturated colors subverting traditional bleak WWII aesthetics.",
                "plot": "A young boy in Hitler's army finds out his mother is hiding a Jewish girl in their home.",
                "releaseDate": "2019-10-18",
                "writer": "Taika Waititi",
                "cinematographer": "Mihai Mălaimare Jr.",
                "editor": "Tom Eagles",
                "composer": "Michael Giacchino",
                "studio": "Fox Searchlight Pictures"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jojo%20Rabbit&year=2019`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) jojo.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(jojo);

            const youth = {
                "id": "youth-without-youth",
                "title": "Youth Without Youth",
                "year": 2007,
                "director": "Francis Ford Coppola",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Pioneering early digital cinematography embracing deep shadows and fluid motion.",
                "plot": "A 78-year-old linguist inexplicably regains his youth after being struck by lightning, forcing him into a life on the run across WWII Europe.",
                "releaseDate": "2007-10-20",
                "writer": "Francis Ford Coppola",
                "cinematographer": "Mihai Mălaimare Jr.",
                "editor": "Walter Murch",
                "composer": "Osvaldo Golijov",
                "studio": "American Zoetrope"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Youth%20Without%20Youth&year=2007`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) youth.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(youth);

            modified = true;
        }

        if (p.name.includes('Lajos Koltai') || p.id === 'lajos-koltai') {
            p.mustWatch = [];
            const malena = {
                "id": "malena",
                "title": "Malèna",
                "year": 2000,
                "director": "Giuseppe Tornatore",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Warm, golden, nostalgic Mediterranean light highlighting intense voyeurism.",
                "plot": "Amidst the war climate, a teenage boy discovering himself becomes love-stricken by Malèna, a sensual woman living in a small, narrow-minded Italian town.",
                "releaseDate": "2000-10-27",
                "writer": "Giuseppe Tornatore",
                "cinematographer": "Lajos Koltai",
                "editor": "Massimo Quaglia",
                "composer": "Ennio Morricone",
                "studio": "Medusa Film / Miramax"
            };
            let sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mal%C3%A8na`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) malena.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(malena);

            const legend = {
                "id": "the-legend-of-1900",
                "title": "The Legend of 1900",
                "year": 1998,
                "director": "Giuseppe Tornatore",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Sweeping, magical realist tracking shots moving through grand ocean liner interiors.",
                "plot": "A baby boy, discovered in 1900 on an ocean liner, grows into a musical prodigy, never setting foot on land.",
                "releaseDate": "1998-10-28",
                "writer": "Giuseppe Tornatore",
                "cinematographer": "Lajos Koltai",
                "editor": "Massimo Quaglia",
                "composer": "Ennio Morricone",
                "studio": "Medusa Film"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Legend%20of%201900`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) legend.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(legend);

            const mephisto = {
                "id": "mephisto",
                "title": "Mephisto",
                "year": 1981,
                "director": "István Szabó",
                "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
                "focus": "Theatrical spotlighting and deep shadows echoing the Faustian moral descent.",
                "plot": "A German stage actor finds unexpected success and mixed blessings in the popularity of his performance in a Faustian play as the Nazis take power.",
                "releaseDate": "1981-02-11",
                "writer": "Péter Dobai, István Szabó",
                "cinematographer": "Lajos Koltai",
                "editor": "Zsuzsa Csákány",
                "composer": "Zdenkó Tamássy",
                "studio": "Mafilm"
            };
            sRes = await fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Mephisto&year=1981`);
            if (sRes && sRes.results.length > 0 && sRes.results[0].poster_path) mephisto.poster = 'https://image.tmdb.org/t/p/w500' + sRes.results[0].poster_path;
            p.mustWatch.push(mephisto);

            modified = true;
        }

    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Eastern European cinematographers.");
    }
}

run();
