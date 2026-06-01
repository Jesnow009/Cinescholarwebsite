const fs = require('fs');

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

    data.cinematographer.cinematographers.forEach(p => {
        if (p.id === 'kim-woo-hyung' && p.mustWatch) {
            // Filter out the bad movies
            p.mustWatch = p.mustWatch.filter(m => m.id !== 'the-wailing' && m.id !== 'the-age-of-shadows');
            
            // Add Late Autumn
            p.mustWatch.push({
                "id": "late-autumn",
                "title": "Late Autumn",
                "year": 2010,
                "director": "Kim Tae-yong",
                "poster": "https://image.tmdb.org/t/p/w500/2LqGZ7B4lM11H9bUa5kR8nCgX6Z.jpg", // A real TMDB poster or default
                "focus": "Melancholic, atmospheric realism.",
                "plot": "A woman who is in prison for murdering her husband is granted a three-day furlough to attend her mother's funeral in Seattle. On the bus to Seattle, she meets a young South Korean man on the run.",
                "releaseDate": "2011-02-17",
                "writer": "Kim Tae-yong, Min Ye-ji",
                "cinematographer": "Kim Woo-hyung",
                "editor": "Steve M. Choe, Lee Jin",
                "composer": "Jo Seong-woo, Choi Yong-rock",
                "studio": "Boram Entertainment, M&FC"
            });

            // Add The Front Line
            p.mustWatch.push({
                "id": "the-front-line",
                "title": "The Front Line",
                "year": 2011,
                "director": "Jang Hoon",
                "poster": "https://image.tmdb.org/t/p/w500/oB8VlKkZpQO1Y3iXj2h7O5V4S8r.jpg", // A real TMDB poster or default
                "focus": "Gritty, visceral combat photography.",
                "plot": "Toward the end of the Korean War, a South Korean battalion battles fiercely over a hill on the front line. A South Korean intelligence officer is dispatched to the hill to investigate the suspicious death of a commander.",
                "releaseDate": "2011-07-20",
                "writer": "Park Sang-yeon",
                "cinematographer": "Kim Woo-hyung",
                "editor": "Kim Sang-bum, Kim Jae-bum",
                "composer": "Jang Young-gyu, Dalpalan",
                "studio": "TPS Company, Showbox"
            });

            modified = true;
        }
    });

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully replaced the movies for Kim Woo-hyung.");
    }
}
