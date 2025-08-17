// API KEY 
const API_KEY = "1d07f6a0a630d302e9910ad9665efa4a"
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
// UI
const cardContainer = document.querySelector(".cards")
const cards = document.querySelector(".cards")
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")

let scrollAmount = 500

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

// Carousel 
nextBtn.addEventListener('click', function () {
    cards.scrollBy({ left: scrollAmount, behavior: 'smooth' })
})

prevBtn.addEventListener('click', function () {
    cards.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
})

cards.addEventListener("scroll", function () {
    let maxScrollLeft = cards.scrollWidth - cards.clientWidth

    if (cards.scrollLeft <= 0) {
        prevBtn.style.display = "none"
    } else {
        prevBtn.style.display = "block"
    }

    if (cards.scrollLeft >= maxScrollLeft - 10) {
        nextBtn.style.display = "none"
    } else {
        nextBtn.style.display = "block"
    }
})

// Modal


