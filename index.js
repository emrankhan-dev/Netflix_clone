// API KEY 
const API_KEY = "1d07f6a0a630d302e9910ad9665efa4a"
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`

const cardContainer = document.querySelector(".cards")
//Fetch API
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        // console.log(data.results)
        data.results.forEach(movie => {
            console.log(movie.poster_path)
            const img = document.createElement("img")
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            img.alt = movie.title
            cardContainer.append(img)
        })
    })
    .catch(error => console.error("Error fetching data:", error))

