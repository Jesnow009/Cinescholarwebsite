const fs = require('fs');
const https = require('https');

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

function fetchJson(url) {
    return new Promise(r => https.get(url, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => r(JSON.parse(data)));
    }).on('error', e => {
        console.error("HTTP Error", e.code);
        r(null);
    }));
}

const newData = {
    // Bengali
    "Subrata Mitra": [
        {
            "id": "pather-panchali",
            "title": "Pather Panchali (Song of the Little Road)",
            "year": 1955,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Groundbreaking use of bounce lighting and naturalism.",
            "plot": "Impoverished priest Harihar Ray, dreaming of a better life for himself and his family, leaves his rural Bengal village in search of work.",
            "releaseDate": "1955-08-26",
            "writer": "Satyajit Ray",
            "cinematographer": "Subrata Mitra",
            "editor": "Dulal Dutta",
            "composer": "Ravi Shankar",
            "studio": "Government of West Bengal"
        },
        {
            "id": "jalsaghar",
            "title": "Jalsaghar (The Music Room)",
            "year": 1958,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Shadowy, evocative lighting depicting decay.",
            "plot": "An aging, aristocratic landlord tries to hold on to his dwindling wealth and prestige in the face of modern society.",
            "releaseDate": "1958-10-10",
            "writer": "Satyajit Ray",
            "cinematographer": "Subrata Mitra",
            "editor": "Dulal Dutta",
            "composer": "Vilayat Khan",
            "studio": "Aurora Film Corporation"
        },
        {
            "id": "charulata",
            "title": "Charulata (The Lonely Wife)",
            "year": 1964,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Elegant tracking shots and precise composition.",
            "plot": "The neglected wife of a busy newspaper publisher falls in love with his visiting cousin in late 19th-century Bengal.",
            "releaseDate": "1964-04-17",
            "writer": "Satyajit Ray",
            "cinematographer": "Subrata Mitra",
            "editor": "Dulal Dutta",
            "composer": "Satyajit Ray",
            "studio": "R.D. Bansal & Co."
        }
    ],
    "Soumendu Roy": [
        {
            "id": "sonar-kella",
            "title": "The Golden Fortress (Sonar Kella)",
            "year": 1974,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant capture of the expansive Rajasthan desert landscapes.",
            "plot": "A young boy claims to remember his past life, leading a parapsychologist and a detective to the golden fortress in Rajasthan.",
            "releaseDate": "1974-12-27",
            "writer": "Satyajit Ray",
            "cinematographer": "Soumendu Roy",
            "editor": "Dulal Dutta",
            "composer": "Satyajit Ray",
            "studio": "Production Department, Government of West Bengal"
        },
        {
            "id": "ashani-sanket",
            "title": "Distant Thunder (Ashani Sanket)",
            "year": 1973,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush color photography contrasting with the horrific reality of famine.",
            "plot": "The impact of the man-made Bengal famine of 1943 on a small village.",
            "releaseDate": "1973-08-15",
            "writer": "Satyajit Ray",
            "cinematographer": "Soumendu Roy",
            "editor": "Dulal Dutta",
            "composer": "Satyajit Ray",
            "studio": "Balaka Movies"
        },
        {
            "id": "shatranj-ke-khilari",
            "title": "The Chess Players (Shatranj Ke Khilari)",
            "year": 1977,
            "director": "Satyajit Ray",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Rich, opulent colors detailing period costumes and settings.",
            "plot": "In 1856, two obsessively chess-playing noblemen in Lucknow ignore the British annexation of their kingdom.",
            "releaseDate": "1977-10-03",
            "writer": "Satyajit Ray",
            "cinematographer": "Soumendu Roy",
            "editor": "Dulal Dutta",
            "composer": "Satyajit Ray",
            "studio": "Devki Chitra Productions"
        }
    ],
    "Avik Mukhopadhyay": [
        {
            "id": "sardar-udham",
            "title": "Sardar Udham",
            "year": 2021,
            "director": "Shoojit Sircar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Muted, somber palettes contrasting with stark, intense sequences.",
            "plot": "A biographical film about Udham Singh, a revolutionary who sought revenge for the 1919 Jallianwala Bagh massacre.",
            "releaseDate": "2021-10-16",
            "writer": "Shubhendu Bhattacharya, Ritesh Shah",
            "cinematographer": "Avik Mukhopadhyay",
            "editor": "Chandrashekhar Prajapati",
            "composer": "Shantanu Moitra",
            "studio": "Rising Sun Films / Kino Works"
        },
        {
            "id": "october",
            "title": "October",
            "year": 2018,
            "director": "Shoojit Sircar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, melancholic lighting evoking the changing of seasons.",
            "plot": "A hotel management trainee's life turns upside down when a fellow employee meets with a tragic accident.",
            "releaseDate": "2018-04-13",
            "writer": "Juhi Chaturvedi",
            "cinematographer": "Avik Mukhopadhyay",
            "editor": "Chandrashekhar Prajapati",
            "composer": "Shantanu Moitra",
            "studio": "Rising Sun Films"
        },
        {
            "id": "chokher-bali",
            "title": "Chokher Bali (A Passion Play)",
            "year": 2003,
            "director": "Rituparno Ghosh",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, sensuous colors exploring the repressed emotions within a Bengali household.",
            "plot": "A young widow's presence stirs complicated relationships in an aristocratic Bengali household.",
            "releaseDate": "2003-10-09",
            "writer": "Rituparno Ghosh",
            "cinematographer": "Avik Mukhopadhyay",
            "editor": "Arghyakamal Mitra",
            "composer": "Debojyoti Mishra",
            "studio": "Shree Venkatesh Films"
        }
    ],

    // Malayalam
    "Madhu Ambat": [
        {
            "id": "amaram",
            "title": "Amaram",
            "year": 1991,
            "director": "Bharathan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vivid depiction of life by the sea, utilizing naturalistic lighting.",
            "plot": "An uneducated fisherman dreams of making his daughter a doctor, leading to conflicts.",
            "releaseDate": "1991-01-01",
            "writer": "A. K. Lohithadas",
            "cinematographer": "Madhu Ambat",
            "editor": "B. Lenin, V. T. Vijayan",
            "composer": "Raveendran",
            "studio": "Babu Pictures"
        },
        {
            "id": "anjali",
            "title": "Anjali",
            "year": 1990,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Emotional lighting that captures the innocence and struggles of children.",
            "plot": "A mother who learns that her intellectually disabled child did not die at birth seeks to bring her back home.",
            "releaseDate": "1990-07-12",
            "writer": "Mani Ratnam",
            "cinematographer": "Madhu Ambat",
            "editor": "B. Lenin, V. T. Vijayan",
            "composer": "Ilaiyaraaja",
            "studio": "Sujatha Productions"
        },
        {
            "id": "makaramanju",
            "title": "Makaramanju (The Mist of Capricorn)",
            "year": 2011,
            "director": "Lenie Lenin",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, evocative cinematography.",
            "plot": "A story about the famous Indian painter Raja Ravi Varma and his muse.",
            "releaseDate": "2011-09-09",
            "writer": "K. P. Kumaran",
            "cinematographer": "Madhu Ambat",
            "editor": "B. Lenin",
            "composer": "Ramesh Narayan",
            "studio": "Green Cinema"
        }
    ],
    "Rajeev Ravi": [
        {
            "id": "gangs-of-wasseypur",
            "title": "Gangs of Wasseypur",
            "year": 2012,
            "director": "Anurag Kashyap",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, kinetic, deeply textured visual documentation of decades.",
            "plot": "A saga of power, politics, and vengeance among three crime families in Wasseypur.",
            "releaseDate": "2012-06-22",
            "writer": "Akhilesh Jaiswal, Anurag Kashyap, Sachin K. Ladia, Zeishan Quadri",
            "cinematographer": "Rajeev Ravi",
            "editor": "Shweta Venkat Matthew",
            "composer": "Sneha Khanwalkar",
            "studio": "Jar Pictures / AKFPL"
        },
        {
            "id": "dev-d",
            "title": "Dev.D",
            "year": 2009,
            "director": "Anurag Kashyap",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Neon-soaked, hallucinatory, and energetic handheld camerawork.",
            "plot": "A modern, darker reinterpretation of the classic Devdas story set in Delhi and Punjab.",
            "releaseDate": "2009-02-06",
            "writer": "Anurag Kashyap, Vikramaditya Motwane",
            "cinematographer": "Rajeev Ravi",
            "editor": "Aarti Bajaj",
            "composer": "Amit Trivedi",
            "studio": "UTV Spotboy / Bindass"
        },
        {
            "id": "kammattipaadam",
            "title": "Kammattipaadam",
            "year": 2016,
            "director": "Rajeev Ravi",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Earthy, somber visual tone tracking the violent displacement of lower-caste communities.",
            "plot": "Krishnan returns to Kochi to help a friend from his dark past, confronting the violent gentrification of his hometown.",
            "releaseDate": "2016-05-20",
            "writer": "P. Balachandran",
            "cinematographer": "Rajeev Ravi",
            "editor": "B. Ajithkumar",
            "composer": "K, John P. Varkey, Vinayak Sasikumar",
            "studio": "Global United Media"
        }
    ],
    "Shyju Khalid": [
        {
            "id": "kumbalangi-nights",
            "title": "Kumbalangi Nights",
            "year": 2019,
            "director": "Madhu C. Narayanan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Warm, naturalistic, and intimate framing of a dysfunctional family by the backwaters.",
            "plot": "The strained relationship between four brothers living in a rundown home on a small island is tested.",
            "releaseDate": "2019-02-07",
            "writer": "Syam Pushkaran",
            "cinematographer": "Shyju Khalid",
            "editor": "Saiju Sreedharan",
            "composer": "Sushin Shyam",
            "studio": "Working Class Hero / Fahadh Faasil & Friends"
        },
        {
            "id": "maheshinte-prathikaaram",
            "title": "Maheshinte Prathikaaram (Mahesh's Revenge)",
            "year": 2016,
            "director": "Dileesh Pothan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Realistic, grounded visual style capturing the essence of a small Idukki town.",
            "plot": "A mild-mannered photographer vows to not wear footwear until he avenges a public humiliation.",
            "releaseDate": "2016-02-05",
            "writer": "Syam Pushkaran",
            "cinematographer": "Shyju Khalid",
            "editor": "Saiju Sreedharan",
            "composer": "Bijibal",
            "studio": "OPM Dream Mill Cinematic"
        },
        {
            "id": "ee-ma-yau",
            "title": "Ee.Ma.Yau.",
            "year": 2018,
            "director": "Lijo Jose Pellissery",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dark, moody, tracking shots navigating chaos during a stormy funeral.",
            "plot": "The sudden death of a man throws his family and the local parish into dark, comic chaos.",
            "releaseDate": "2018-05-04",
            "writer": "P. F. Mathews",
            "cinematographer": "Shyju Khalid",
            "editor": "Deepu Joseph",
            "composer": "Prashant Pillai",
            "studio": "OPM Dream Mill Cinematic / Sunflower Film Company"
        }
    ],
    "Girish Gangadharan": [
        {
            "id": "angamaly-diaries",
            "title": "Angamaly Diaries",
            "year": 2017,
            "director": "Lijo Jose Pellissery",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Kinetic, uninterrupted long takes, notably the legendary 11-minute climax.",
            "plot": "A young man forms a gang in Angamaly, leading to violent rivalries with other local groups.",
            "releaseDate": "2017-03-03",
            "writer": "Chemban Vinod Jose",
            "cinematographer": "Girish Gangadharan",
            "editor": "Shameer Muhammed",
            "composer": "Prashant Pillai",
            "studio": "Friday Film House"
        },
        {
            "id": "jallikattu",
            "title": "Jallikattu",
            "year": 2019,
            "director": "Lijo Jose Pellissery",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Frenetic, primal, and visceral camerawork tracking chaos in the dark.",
            "plot": "A butcher's buffalo escapes, triggering a frenzy of violence and chaos in a remote village.",
            "releaseDate": "2019-10-04",
            "writer": "S. Hareesh, R. Jayakumar",
            "cinematographer": "Girish Gangadharan",
            "editor": "Deepu Joseph",
            "composer": "Prashant Pillai",
            "studio": "OPM Dream Mill Cinematic"
        },
        {
            "id": "vikram",
            "title": "Vikram",
            "year": 2022,
            "director": "Lokesh Kanagaraj",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "High-octane, stylish, kinetic action cinematography.",
            "plot": "A black-ops squad led by a legendary operative hunts down a masked group of serial killers.",
            "releaseDate": "2022-06-03",
            "writer": "Lokesh Kanagaraj",
            "cinematographer": "Girish Gangadharan",
            "editor": "Philomin Raj",
            "composer": "Anirudh Ravichander",
            "studio": "Raaj Kamal Films International"
        }
    ],
    "Sameer Thahir": [
        {
            "id": "big-b",
            "title": "Big B",
            "year": 2007,
            "director": "Amal Neerad",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Highly stylized, slick, desaturated visual tone that redefined action in Malayalam cinema.",
            "plot": "Four adopted brothers return to Kochi to avenge the murder of their adoptive mother.",
            "releaseDate": "2007-04-13",
            "writer": "Amal Neerad, Unni R.",
            "cinematographer": "Sameer Thahir",
            "editor": "Vivek Harshan",
            "composer": "Alphons Joseph, Gopi Sundar",
            "studio": "Mary Matha Productions"
        },
        {
            "id": "bangalore-days",
            "title": "Bangalore Days",
            "year": 2014,
            "director": "Anjali Menon",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Bright, vibrant, and youthful framing of urban spaces.",
            "plot": "Three cousins relocate to Bangalore and navigate the challenges of life, love, and adulthood.",
            "releaseDate": "2014-05-30",
            "writer": "Anjali Menon",
            "cinematographer": "Sameer Thahir",
            "editor": "Praveen Prabhakar",
            "composer": "Gopi Sundar",
            "studio": "Anwar Rasheed Entertainments / Weekend Blockbusters"
        },
        {
            "id": "chappa-kurishu",
            "title": "Chappa Kurishu",
            "year": 2011,
            "director": "Sameer Thahir",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Gritty, tense, handheld style.",
            "plot": "A wealthy businessman and a poor slum dweller's lives intertwine when a misplaced phone holds compromising video footage.",
            "releaseDate": "2011-07-14",
            "writer": "Sameer Thahir, Unni R.",
            "cinematographer": "Jomon T. John",
            "editor": "A. Sreekar Prasad",
            "composer": "Rex Vijayan",
            "studio": "E4 Entertainment"
        }
    ],
    "Jomon T. John": [
        {
            "id": "charlie",
            "title": "Charlie",
            "year": 2015,
            "director": "Martin Prakkat",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Whimsical, colorful, deeply atmospheric and bohemian imagery.",
            "plot": "A young woman traces the life of an enigmatic, free-spirited artist through the people he has helped.",
            "releaseDate": "2015-12-24",
            "writer": "Martin Prakkat, Unni R.",
            "cinematographer": "Jomon T. John",
            "editor": "Shameer Muhammed",
            "composer": "Gopi Sundar",
            "studio": "Finding Cinema"
        },
        {
            "id": "thattathin-marayathu",
            "title": "Thattathin Marayathu",
            "year": 2012,
            "director": "Vineeth Sreenivasan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, romantic, sun-dappled and highly saturated frames.",
            "plot": "A Hindu boy falls in love with a Muslim girl, leading to communal friction in their small town.",
            "releaseDate": "2012-07-06",
            "writer": "Vineeth Sreenivasan",
            "cinematographer": "Jomon T. John",
            "editor": "Ranjan Abraham",
            "composer": "Shaan Rahman",
            "studio": "Lumiere Film Company"
        },
        {
            "id": "arm-ajayante-randam-moshanam",
            "title": "A.R.M (Ajayante Randam Moshanam)",
            "year": 2024,
            "director": "Jithin Lal",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Epic scale, multi-generational visual storytelling.",
            "plot": "Three heroes across three generations attempt to protect the most important treasure of the land.",
            "releaseDate": "2024-01-01",
            "writer": "Sujith Nambiar",
            "cinematographer": "Jomon T. John",
            "editor": "Shameer Muhammed",
            "composer": "Dhibu Ninan Thomas",
            "studio": "Magic Frames / UGM Productions"
        }
    ],

    // Tamil
    "Balu Mahendra": [
        {
            "id": "moondram-pirai",
            "title": "Moondram Pirai",
            "year": 1982,
            "director": "Balu Mahendra",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, evocative use of natural light and shadow.",
            "plot": "A school teacher rescues a woman suffering from amnesia from a brothel and brings her to his home in Ooty.",
            "releaseDate": "1982-02-19",
            "writer": "Balu Mahendra",
            "cinematographer": "Balu Mahendra",
            "editor": "D. Vasu",
            "composer": "Ilaiyaraaja",
            "studio": "Sathya Movies"
        },
        {
            "id": "veedu",
            "title": "Veedu (The House)",
            "year": 1988,
            "director": "Balu Mahendra",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Grounded, realistic, unfiltered depiction of middle-class life.",
            "plot": "A middle-class woman struggles against bureaucracy and financial constraints to build a house for her family.",
            "releaseDate": "1988-01-01",
            "writer": "Balu Mahendra",
            "cinematographer": "Balu Mahendra",
            "editor": "Lancy-Mohan",
            "composer": "Ilaiyaraaja",
            "studio": "Sri Lakshmi Chitra"
        },
        {
            "id": "sandhya-raagam",
            "title": "Sandhya Raagam",
            "year": 1989,
            "director": "Balu Mahendra",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Poignant, somber visual framing.",
            "plot": "An elderly man moves to the city to live with his nephew's family after the death of his wife.",
            "releaseDate": "1989-01-01",
            "writer": "Balu Mahendra",
            "cinematographer": "Balu Mahendra",
            "editor": "Lancy-Mohan",
            "composer": "Ilaiyaraaja",
            "studio": "Doordarshan"
        }
    ],
    "Santosh Sivan": [
        {
            "id": "iruvar",
            "title": "Iruvar (The Duo)",
            "year": 1997,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dynamic, vibrant colors defining different decades of Tamil Nadu politics.",
            "plot": "The intertwined lives of a struggling actor and a passionate writer who become powerful political rivals.",
            "releaseDate": "1997-01-14",
            "writer": "Mani Ratnam",
            "cinematographer": "Santosh Sivan",
            "editor": "Suresh Urs",
            "composer": "A. R. Rahman",
            "studio": "Madras Talkies"
        },
        {
            "id": "the-terrorist",
            "title": "The Terrorist",
            "year": 1997,
            "director": "Santosh Sivan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Visceral, impressionistic, highly textured close-ups and nature shots.",
            "plot": "A young female guerrilla fighter is assigned to assassinate a political leader via a suicide bombing.",
            "releaseDate": "1997-12-15",
            "writer": "Santosh Sivan, Ravi Deshpande, Vijay Deodhar",
            "cinematographer": "Santosh Sivan",
            "editor": "A. Sreekar Prasad",
            "composer": "Rajamani, Sonu Sisupal",
            "studio": "Wonderkids / Asmita Productions"
        },
        {
            "id": "dil-se",
            "title": "Dil Se..",
            "year": 1998,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Stunning, high-contrast imagery moving between the vibrant and the desolate.",
            "plot": "A radio executive falls in love with a mysterious woman, unaware that she is a terrorist with a tragic past.",
            "releaseDate": "1998-08-21",
            "writer": "Mani Ratnam, Tigmanshu Dhulia",
            "cinematographer": "Santosh Sivan",
            "editor": "Suresh Urs",
            "composer": "A. R. Rahman",
            "studio": "Madras Talkies / Eros International"
        }
    ],
    "Ravi K. Chandran": [
        {
            "id": "kannathil-muthamittal",
            "title": "Kannathil Muthamittal (A Peck on the Cheek)",
            "year": 2002,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Beautiful, sweeping, yet intimate visuals capturing the Sri Lankan conflict.",
            "plot": "A young adopted girl travels to war-torn Sri Lanka with her parents to find her biological mother.",
            "releaseDate": "2002-02-14",
            "writer": "Mani Ratnam",
            "cinematographer": "Ravi K. Chandran",
            "editor": "A. Sreekar Prasad",
            "composer": "A. R. Rahman",
            "studio": "Madras Talkies"
        },
        {
            "id": "black",
            "title": "Black",
            "year": 2005,
            "director": "Sanjay Leela Bhansali",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Highly stylized, deep, shadowy, and monochromatic lighting.",
            "plot": "A deaf-blind woman and her relationship with her eccentric, alcoholic teacher who later develops Alzheimer's disease.",
            "releaseDate": "2005-02-04",
            "writer": "Sanjay Leela Bhansali, Bhavani Iyer, Prakash Kapadia",
            "cinematographer": "Ravi K. Chandran",
            "editor": "Bela Segal",
            "composer": "Monty Sharma",
            "studio": "SLB Films / Applause Entertainment"
        },
        {
            "id": "dil-chahta-hai",
            "title": "Dil Chahta Hai",
            "year": 2001,
            "director": "Farhan Akhtar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Fresh, bright, modern aesthetic that redefined Bollywood visual language.",
            "plot": "Three inseparable childhood friends navigate love, relationships, and maturity.",
            "releaseDate": "2001-08-10",
            "writer": "Farhan Akhtar, Kassim Jagmagia",
            "cinematographer": "Ravi K. Chandran",
            "editor": "A. Sreekar Prasad",
            "composer": "Shankar-Ehsaan-Loy",
            "studio": "Excel Entertainment"
        }
    ],
    "P. C. Sreeram": [
        {
            "id": "nayakan",
            "title": "Nayakan",
            "year": 1987,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Iconic, atmospheric use of shadows, smoke, and backlighting.",
            "plot": "The epic journey of a young boy from Bombay's slums who rises to become a powerful and feared mafia don.",
            "releaseDate": "1987-10-21",
            "writer": "Mani Ratnam",
            "cinematographer": "P. C. Sreeram",
            "editor": "B. Lenin",
            "composer": "Ilaiyaraaja",
            "studio": "Muktha Films / Sujatha Productions"
        },
        {
            "id": "thiruda-thiruda",
            "title": "Thiruda Thiruda (Thief Thief)",
            "year": 1993,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Dynamic, glossy, high-energy framing and colors.",
            "plot": "Two petty thieves get caught up in a heist involving stolen money intended for the government.",
            "releaseDate": "1993-11-13",
            "writer": "Mani Ratnam, Suhasini Maniratnam",
            "cinematographer": "P. C. Sreeram",
            "editor": "Suresh Urs",
            "composer": "A. R. Rahman",
            "studio": "Aalayam Productions"
        },
        {
            "id": "alaipayuthey",
            "title": "Alaipayuthey",
            "year": 2000,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Soft, romantic, warm hues creating a sense of urban intimacy.",
            "plot": "A young couple elopes and marries secretly, but soon reality hits them.",
            "releaseDate": "2000-04-14",
            "writer": "Mani Ratnam",
            "cinematographer": "P. C. Sreeram",
            "editor": "A. Sreekar Prasad",
            "composer": "A. R. Rahman",
            "studio": "Madras Talkies"
        }
    ],
    "Tirru": [
        {
            "id": "hey-ram",
            "title": "Hey Ram",
            "year": 2000,
            "director": "Kamal Haasan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Richly textured period details and evocative, moody lighting.",
            "plot": "An alternate history depicting a man's plot to assassinate Mahatma Gandhi.",
            "releaseDate": "2000-02-18",
            "writer": "Kamal Haasan",
            "cinematographer": "Tirru",
            "editor": "Renu Saluja",
            "composer": "Ilaiyaraaja",
            "studio": "Raaj Kamal Films International / Dreamz Unlimited"
        },
        {
            "id": "kanchivaram",
            "title": "Kanchivaram",
            "year": 2008,
            "director": "Priyadarshan",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vibrant and authentic visual depiction of the silk weavers.",
            "plot": "A silk weaver in pre-independence India struggles to fulfill a promise to wrap his daughter in a silk sari.",
            "releaseDate": "2008-09-12",
            "writer": "Priyadarshan",
            "cinematographer": "Tirru",
            "editor": "Arun Kumar",
            "composer": "M. G. Sreekumar",
            "studio": "Percept Picture Company"
        },
        {
            "id": "24",
            "title": "24",
            "year": 2016,
            "director": "Vikram Kumar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Slick, stylized sci-fi aesthetic blending high-tech and emotional drama.",
            "plot": "A watchmaker uses a time-traveling watch to stop his evil twin brother from changing the past.",
            "releaseDate": "2016-05-05",
            "writer": "Vikram Kumar",
            "cinematographer": "Tirru",
            "editor": "Prawin Pudi",
            "composer": "A. R. Rahman",
            "studio": "2D Entertainment"
        }
    ],
    "Ravi Varman": [
        {
            "id": "barfi",
            "title": "Barfi!",
            "year": 2012,
            "director": "Anurag Basu",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Lush, whimsical, golden-hour saturated fairy-tale visuals.",
            "plot": "The story of Barfi, a deaf and mute man, and his relationships with two women.",
            "releaseDate": "2012-09-14",
            "writer": "Anurag Basu, Tani Basu",
            "cinematographer": "Ravi Varman",
            "editor": "Akiv Ali",
            "composer": "Pritam Chakraborty",
            "studio": "Ishana Movies / UTV Motion Pictures"
        },
        {
            "id": "tamasha",
            "title": "Tamasha",
            "year": 2015,
            "director": "Imtiaz Ali",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Vivid, energetic lighting capturing the theatricality of life.",
            "plot": "A young man, living a mundane life, meets a free-spirited woman in Corsica who encourages him to follow his true passion.",
            "releaseDate": "2015-11-27",
            "writer": "Imtiaz Ali",
            "cinematographer": "Ravi Varman",
            "editor": "Aarti Bajaj",
            "composer": "A. R. Rahman",
            "studio": "Nadiadwala Grandson Entertainment"
        },
        {
            "id": "ponniyin-selvan-part-1",
            "title": "Ponniyin Selvan: Part 1",
            "year": 2022,
            "director": "Mani Ratnam",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Epic, grand, sweeping scale with rich historical textures.",
            "plot": "Vandiyathevan sets out to cross the Chola land to deliver a message from the Crown Prince Aditha Karikalan.",
            "releaseDate": "2022-09-30",
            "writer": "Mani Ratnam, Elango Kumaravel, B. Jeyamohan",
            "cinematographer": "Ravi Varman",
            "editor": "A. Sreekar Prasad",
            "composer": "A. R. Rahman",
            "studio": "Madras Talkies / Lyca Productions"
        }
    ],
    "Nirav Shah": [
        {
            "id": "super-deluxe",
            "title": "Super Deluxe",
            "year": 2019,
            "director": "Thiagarajan Kumararaja",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Quirky, saturated, highly stylized and deliberate framing.",
            "plot": "Four interconnected stories of people dealing with their darkest secrets, prejudices, and absurd situations on a fateful day.",
            "releaseDate": "2019-03-29",
            "writer": "Thiagarajan Kumararaja, Mysskin, Nalan Kumarasamy, Neelan K. Sekar",
            "cinematographer": "Nirav Shah, P. S. Vinod",
            "editor": "Sathyaraj Natarajan",
            "composer": "Yuvan Shankar Raja",
            "studio": "Tyler Durden And Kino Fist / East West Dream Work Entertainment / Alchemy Vision Work"
        },
        {
            "id": "pokkiri",
            "title": "Pokkiri",
            "year": 2007,
            "director": "Prabhu Deva",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "Slick, dynamic, commercial high-energy lighting.",
            "plot": "A ruthless hitman in Chennai is caught between two rival gangs, but hides a secret identity.",
            "releaseDate": "2007-01-12",
            "writer": "Puri Jagannadh, Prabhu Deva",
            "cinematographer": "Nirav Shah",
            "editor": "Kola Bhaskar",
            "composer": "Mani Sharma",
            "studio": "Kanakaratna Movies"
        },
        {
            "id": "2-point-0",
            "title": "2.0",
            "year": 2018,
            "director": "S. Shankar",
            "poster": "https://image.tmdb.org/t/p/w500/placeholder.jpg",
            "focus": "High-tech 3D cinematography and heavy CGI integration.",
            "plot": "When cell phones start flying out of people's hands and disappearing, a scientist reassembles his dismantled robot to fight a new threat.",
            "releaseDate": "2018-11-29",
            "writer": "S. Shankar, B. Jeyamohan",
            "cinematographer": "Nirav Shah",
            "editor": "Anthony",
            "composer": "A. R. Rahman, Qutub-E-Kripa",
            "studio": "Lyca Productions"
        }
    ]
};

async function run() {
    const dataStr = fs.readFileSync('js/data.js', 'utf8');
    const match = dataStr.match(/const FILMS_DATA = (\{[\s\S]*?\});/);
    let data = eval('(' + match[1] + ')');
    let modified = false;

    for (let name in newData) {
        let dp = data.cinematographer.cinematographers.find(p => p.name === name || p.id === name.toLowerCase().replace(/ /g, '-'));
        
        if (dp) {
            dp.mustWatch = newData[name];
            console.log(`Replaced mustWatch for ${name}`);
            
            // fetch posters
            for (let m of dp.mustWatch) {
                let query = encodeURIComponent(m.title.replace(/\(.*\)/, '').trim());
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&year=${m.year}`;
                
                // Some specific overrides for hard to find Indian titles
                if (m.title.includes("Chokher Bali")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Chokher%20Bali`;
                } else if (m.title.includes("2.0")) {
                    url = `https://api.themoviedb.org/3/movie/338225?api_key=${API_KEY}`;
                } else if (m.title.includes("Barfi")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Barfi!`;
                } else if (m.title.includes("A.R.M")) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=A.R.M`;
                }
                
                let mRes = await fetchJson(url);
                
                let posterUrl = null;
                if (mRes && mRes.poster_path) {
                     posterUrl = 'https://image.tmdb.org/t/p/w500' + mRes.poster_path;
                } else if (mRes && mRes.results && mRes.results.length > 0 && mRes.results[0].poster_path) {
                    posterUrl = 'https://image.tmdb.org/t/p/w500' + mRes.results[0].poster_path;
                }

                if (posterUrl) {
                    m.poster = posterUrl;
                    console.log(`Found poster for ${m.title}`);
                } else {
                    console.log(`Could not find poster for ${m.title}`);
                }
            }
            modified = true;
        } else {
            console.log(`Could not find DP: ${name}`);
        }
    }

    if (modified) {
        let newContent = JSON.stringify(data, null, 4);
        const newFileContent = dataStr.substring(0, match.index) + 'const FILMS_DATA = ' + newContent + ';' + dataStr.substring(match.index + match[0].length);
        fs.writeFileSync('js/data.js', newFileContent, 'utf8');
        console.log("Successfully updated Indian Cinematographers");
    }
}

run();
