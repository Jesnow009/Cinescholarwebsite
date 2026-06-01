const API_KEY = '6be1031699ca4c4d9d1d72b2cfb7ee3c';

async function fetchDetails() {
    let psychoRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Psycho&language=ta-IN&year=2020`);
    let psychoData = await psychoRes.json();
    let p = psychoData.results.find(m => m.original_language === 'ta');
    console.log("PSYCHO:", p.overview, p.poster_path);

    let leoRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Leo&language=ta-IN&year=2023`);
    let leoData = await leoRes.json();
    let l = leoData.results.find(m => m.original_language === 'ta');
    console.log("LEO:", l.overview, l.poster_path);
}

fetchDetails();
