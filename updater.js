const fs = require('fs');
const https = require('https');

const TMDB_API_KEY = '3e52e2f5350ae60de5e2fc58e46f4d45';

const inputData = {
  "Lester James Peries": [
    { title: "Rekava", country: "Sri Lanka", releaseDate: "December 28, 1956", director: "Lester James Peries", writer: "Lester James Peries / K.A.W. Perera", cinematographer: "William Blake", editor: "Titus Thotawatte", composer: "Sunil Santha / K.A. Dayaratne", studio: "Chitra Lanka" },
    { title: "Gamperaliya", country: "Sri Lanka", releaseDate: "December 20, 1963", director: "Lester James Peries", writer: "Reggie SiriwardENA", cinematographer: "William Blake", editor: "Sumitra Peries", composer: "W.D. Amaradeva", studio: "Cine Lanka" },
    { title: "Nidhanaya", country: "Sri Lanka", releaseDate: "April 3, 1972", director: "Lester James Peries", writer: "Tissa Abeysekara", cinematographer: "M.S. Anandan", editor: "Sumitra Peries", composer: "Premasiri Khemadasa", studio: "Ceylon Studios" }
  ],
  "Prasanna Vithanage": [
    { title: "Anantha Rathriya", country: "Sri Lanka", releaseDate: "March 15, 1996", director: "Prasanna Vithanage", writer: "Prasanna Vithanage", cinematographer: "M.D. Mahindapala", editor: "Elmo Halliday", composer: "Harsha Makalanda", studio: "Film Lanka Productions" },
    { title: "Purahanda Kaluwara", country: "Sri Lanka", releaseDate: "July 27, 2001", director: "Prasanna Vithanage", writer: "Prasanna Vithanage", cinematographer: "M.D. Mahindapala", editor: "A. Sreekar Prasad", composer: "Harsha Makalanda", studio: "Prasanna Vithanage Productions" },
    { title: "With You, Without You", country: "Sri Lanka", releaseDate: "August 31, 2012", director: "Prasanna Vithanage", writer: "Prasanna Vithanage", cinematographer: "M.D. Mahindapala", editor: "A. Sreekar Prasad", composer: "Lakshman Joseph De Saram", studio: "Prasanna Vithanage Productions" }
  ],
  "Vimukthi Jayasundara": [
    { title: "Forsaken Land", country: "Sri Lanka / France", releaseDate: "May 14, 2005", director: "Vimukthi Jayasundara", writer: "Vimukthi Jayasundara", cinematographer: "Channa Deshapriya", editor: "Gisèle Rapp-Meichler", composer: "Nadeeka Guruge", studio: "Les Films de l'Etranger / Film Council" },
    { title: "Between Two Worlds", country: "Sri Lanka / France", releaseDate: "September 8, 2009", director: "Vimukthi Jayasundara", writer: "Vimukthi Jayasundara", cinematographer: "Channa Deshapriya", editor: "Julie Beziau", composer: "Nadeeka Guruge", studio: "Digimage / Les Films de l'Etranger" }
  ],
  "Tareque Masud": [
    { title: "The Clay Bird", country: "Bangladesh / France", releaseDate: "May 15, 2002", director: "Tareque Masud", writer: "Tareque Masud / Catherine Masud", cinematographer: "Sudheer Palsane", editor: "Catherine Masud", studio: "Audiovision / Mk2 Productions" },
    { title: "Ontoryatra", country: "Bangladesh", releaseDate: "April 21, 2006", director: "Tareque Masud / Catherine Masud", writer: "Tareque Masud / Catherine Masud", cinematographer: "Tareque Masud", editor: "Catherine Masud", studio: "Audiovision" }
  ],
  "Humayun Ahmed": [
    { title: "Aguner Poroshmoni", country: "Bangladesh", releaseDate: "December 23, 1994", director: "Humayun Ahmed", writer: "Humayun Ahmed", cinematographer: "Anwar Hossain", editor: "M.A. Khaleque", composer: "Satya Saha", studio: "Nuhash Chalachitra" },
    { title: "Shyamol Chhaya", country: "Bangladesh", releaseDate: "December 16, 2004", director: "Humayun Ahmed", writer: "Humayun Ahmed", cinematographer: "Mahfuzur Rahman Khan", editor: "Aminul Islam Mintu", composer: "Maksud Jamil Mintu", studio: "Nuhash Chalachitra" }
  ],
  "Mostofa Sarwar Farooki": [
    { title: "Television", country: "Bangladesh", releaseDate: "January 25, 2013", director: "Mostofa Sarwar Farooki", writer: "Mostofa Sarwar Farooki / Anisul Hoque", cinematographer: "Golam Maula Nabir", editor: "Amit Debnath", composer: "Ayub Bachchu", studio: "Chabial" },
    { title: "Doob: No Bed of Roses", country: "Bangladesh / India", releaseDate: "October 27, 2017", director: "Mostofa Sarwar Farooki", writer: "Mostofa Sarwar Farooki", cinematographer: "Sheikh Rajibul Islam", editor: "Amit Debnath", composer: "Pavel Areen", studio: "Jaaz Multimedia / Irrfan Khan Movies / Eskay Movies" }
  ],
  "Shoaib Mansoor": [
    { title: "Khuda Kay Liye", country: "Pakistan", releaseDate: "July 20, 2007", director: "Shoaib Mansoor", writer: "Shoaib Mansoor", cinematographer: "Faisal Qureshi", editor: "Shoaib Mansoor", composer: "Shoaib Mansoor", studio: "Shoman Productions" },
    { title: "Bol", country: "Pakistan", releaseDate: "June 24, 2011", director: "Shoaib Mansoor", writer: "Shoaib Mansoor", cinematographer: "Jono Smith", editor: "Yousuf Hasan Khan", composer: "Shoaib Mansoor", studio: "Shoman Productions" }
  ],
  "Sarmad Khoosat": [
    { title: "Manto", country: "Pakistan", releaseDate: "September 11, 2015", director: "Sarmad Khoosat", writer: "Shahid Nadeem", cinematographer: "Bilal Khan", editor: "Rohit Philip", composer: "True Brew Records", studio: "Geo Films / Khoosat Films" },
    { title: "Kamli", country: "Pakistan", releaseDate: "June 3, 2022", director: "Sarmad Khoosat", writer: "Fatimah Sattar", cinematographer: "Awais Gohar", editor: "Saim Sadiq", composer: "Saad Sultan", studio: "Khoosat Films" }
  ],
  "Min Bahadur Bham": [
    { title: "The Black Hen", country: "Nepal / France / Germany / Switzerland", releaseDate: "September 4, 2015", director: "Min Bahadur Bham", writer: "Min Bahadur Bham / Abinash Bikram Shah", cinematographer: "Aziz Zhambakiyev", editor: "Niam Itani", composer: "Jason Kunwar", studio: "Shooney Films / Mila Productions" },
    { title: "Shambhala", country: "Nepal / France / Germany / Norway / Hong Kong", releaseDate: "February 23, 2024", director: "Min Bahadur Bham", writer: "Min Bahadur Bham / Abinash Bikram Shah", cinematographer: "Muriel Cravatte", editor: "Kiran Shrestha", studio: "Shooney Films / CDP" }
  ],
  "Deepak Rauniyar": [
    { title: "Highway", country: "Nepal", releaseDate: "June 15, 2012", director: "Deepak Rauniyar", writer: "Deepak Rauniyar / Kedar Shrestha", cinematographer: "Deepak Rauniyar", editor: "Lokesh Bajracharya", studio: "Aadi Production" },
    { title: "White Sun", country: "Nepal / United States / Netherlands / Qatar", releaseDate: "September 1, 2016", director: "Deepak Rauniyar", writer: "Deepak Rauniyar / David Barker", cinematographer: "Mark Jeevan", editor: "David Barker", studio: "Aadi Production / Louverture Films" }
  ]
};

function fetchPoster(title, year) {
  return new Promise((resolve) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
    if (year) {
      url += `&year=${year}`;
    }
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.results && parsed.results.length > 0 && parsed.results[0].poster_path) {
            resolve(`https://image.tmdb.org/t/p/w500${parsed.results[0].poster_path}`);
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

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function updateData() {
  const fileContent = fs.readFileSync('js/data.js', 'utf8');
  const jsonStr = fileContent.replace('const FILMS_DATA = ', '').replace(/;\s*$/, '');
  const data = JSON.parse(jsonStr);

  for (const dirName in inputData) {
    let director = data.director.directors.find(d => d.name === dirName);
    if (!director) {
      console.log("Director not found: " + dirName);
      continue;
    }
    
    let oldMovies = director.mustWatch || [];
    let newMoviesList = [];
    
    for (const inMovie of inputData[dirName]) {
      let match = oldMovies.find(m => m.title.toLowerCase() === inMovie.title.toLowerCase() || m.title.toLowerCase().includes(inMovie.title.toLowerCase()));
      
      if (inMovie.title === "The Clay Bird") {
        match = oldMovies.find(m => m.title.includes("Matir Moina") || m.title.includes("Clay Bird"));
      }
      if (inMovie.title === "Forsaken Land" || inMovie.title === "The Forsaken Land") {
        match = oldMovies.find(m => m.title.includes("Forsaken Land"));
      }
      if (inMovie.title === "Purahanda Kaluwara") {
        match = oldMovies.find(m => m.title.includes("Death on a Full Moon Day") || m.title.includes("Purahanda"));
      }
      
      let yearMatch = inMovie.releaseDate.match(/\d{4}/);
      let year = yearMatch ? parseInt(yearMatch[0], 10) : "";
      
      let newMovie = {
        id: match ? match.id : slugify(inMovie.title),
        title: inMovie.title,
        year: year,
        director: inMovie.director,
        writer: inMovie.writer,
        cinematographer: inMovie.cinematographer,
        editor: inMovie.editor,
        composer: inMovie.composer,
        studio: inMovie.studio,
        country: inMovie.country,
        releaseDate: inMovie.releaseDate,
        focus: match && match.focus ? match.focus : "",
        plot: match && match.plot ? match.plot : "",
        poster: match && match.poster ? match.poster : ""
      };
      
      if (!newMovie.poster) {
        newMovie.poster = await fetchPoster(inMovie.title, year) || "";
        console.log("Fetched new poster for", inMovie.title, ":", newMovie.poster);
      } else {
        console.log("Kept existing poster for", inMovie.title);
      }
      
      Object.keys(newMovie).forEach(key => {
        if (newMovie[key] === undefined) {
          delete newMovie[key];
        }
      });
      
      newMoviesList.push(newMovie);
    }
    
    director.mustWatch = newMoviesList;
  }
  
  const output = 'const FILMS_DATA = ' + JSON.stringify(data, null, 4) + ';\n';
  fs.writeFileSync('js/data.js', output);
  console.log('Update complete.');
}

updateData();
