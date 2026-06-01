const fs = require('fs');

const metadataMap = {
    "the-favourite": {
        releaseDate: "2018-08-30",
        writer: "Deborah Davis, Tony McNamara",
        cinematographer: "Robbie Ryan",
        editor: "Yorgos Mavropsaridis",
        composer: "Various",
        studio: "Element Pictures, Film4"
    },
    "poor-things": {
        releaseDate: "2023-09-01",
        writer: "Tony McNamara",
        cinematographer: "Robbie Ryan",
        editor: "Yorgos Mavropsaridis",
        composer: "Jerskin Fendrix",
        studio: "Element Pictures, Film4"
    },
    "american-honey": {
        releaseDate: "2016-05-15",
        writer: "Andrea Arnold",
        cinematographer: "Robbie Ryan",
        editor: "Joe Bini",
        composer: "Various",
        studio: "Parts & Labor, Pulse Films"
    },
    "cmon-cmon": {
        releaseDate: "2021-09-02",
        writer: "Mike Mills",
        cinematographer: "Robbie Ryan",
        editor: "Jennifer Vecchiarello",
        composer: "Aaron Dessner, Bryce Dessner",
        studio: "A24"
    },
    "leaving-las-vegas": {
        releaseDate: "1995-10-27",
        writer: "Mike Figgis",
        cinematographer: "Declan Quinn",
        editor: "John Smith",
        composer: "Mike Figgis",
        studio: "Lumiere Pictures"
    },
    "in-america": {
        releaseDate: "2002-09-12",
        writer: "Jim Sheridan, Naomi Sheridan, Kirsten Sheridan",
        cinematographer: "Declan Quinn",
        editor: "Naomi Geraghty",
        composer: "Gavin Friday, Maurice Seezer",
        studio: "Fox Searchlight"
    },
    "rachel-getting-married": {
        releaseDate: "2008-09-03",
        writer: "Jenny Lumet",
        cinematographer: "Declan Quinn",
        editor: "Tim Squyres",
        composer: "Donald Harrison Jr.",
        studio: "Sony Pictures Classics"
    },
    "normal-people": {
        releaseDate: "2020-04-26",
        writer: "Sally Rooney, Alice Birch",
        cinematographer: "Suzie Lavelle, Kate McCullough",
        editor: "Nathan Nugent",
        composer: "Stephen Rennicks",
        studio: "Element Pictures"
    },
    "the-lobster": {
        releaseDate: "2015-05-15",
        writer: "Yorgos Lanthimos, Efthimis Filippou",
        cinematographer: "Thimios Bakatakis",
        editor: "Yorgos Mavropsaridis",
        composer: "Various",
        studio: "Element Pictures"
    },
    "his-house": {
        releaseDate: "2020-01-27",
        writer: "Remi Weekes",
        cinematographer: "Jo Willems",
        editor: "Julia Bloch",
        composer: "Roque Baños",
        studio: "New Regency, BBC Films"
    }
};

const dataStr = fs.readFileSync('js/data.js', 'utf8');
const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);

if (match) {
    let data;
    try {
        data = eval('(' + match[1] + ')');
    } catch (e) {
        console.error("Eval error", e);
        process.exit(1);
    }
    
    let modified = false;

    if (data.cinematographer && data.cinematographer.cinematographers) {
        data.cinematographer.cinematographers.forEach(person => {
            if (person.region && person.region.toLowerCase() === 'irish') {
                if (person.mustWatch) {
                    person.mustWatch.forEach(movie => {
                        const meta = metadataMap[movie.id];
                        if (meta) {
                            ['releaseDate', 'writer', 'cinematographer', 'editor', 'composer', 'studio'].forEach(field => {
                                if (movie[field] === "N/A" || !movie[field]) {
                                    movie[field] = meta[field];
                                    modified = true;
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated metadata for Irish cinematographers.");
    } else {
        console.log("No modifications were needed or found.");
    }
}
