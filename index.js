import { features } from "./feature.js"

// API KEY 
const API_KEY = "1d07f6a0a630d302e9910ad9665efa4a"
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
// UI
const cardContainer = document.querySelector(".cards")
const cards = document.querySelector(".cards")
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")
const modal = document.querySelector(".modal")
const modalCloseBtn = document.querySelector(".modal-close-btn")

const modalTitle = modal.querySelector(".modal-title")
const modalOverview = modal.querySelector(".modal-overview")

const featureContainer = document.querySelector(".feature-container")



let scrollAmount = 500

//Fetch API
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.results.forEach((movie, index) => {
        const wrapper = document.createElement("div")
        wrapper.classList.add("poster")

      const img = document.createElement("img")
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      img.alt = movie.original_title

      const number = document.createElement("span")
      number.textContent = index + 1
      number.classList.add("poster-number")
      console.log(index + 1)

      img.addEventListener("click", function () {
        modal.style.backgroundImage = `
          linear-gradient(to bottom, rgba(255,255,255,0.0) 0%, rgba(20,20,20,0.9) 60%, rgba(20,20,20,0.95) 100%),
          url(https://image.tmdb.org/t/p/w500${movie.poster_path})
        `
        modalTitle.textContent = movie.title;

        const maxChars = 150; 
        let overview = movie.overview;
        if (overview.length > maxChars) {
          overview = overview.substring(0, maxChars) + "..."
        }
        modalOverview.textContent = overview;
        modal.style.display = "block";
      });
      wrapper.append(number)
      wrapper.append(img)
      cardContainer.append(wrapper)
    })
  })
  .catch(error => console.error("Error fetching data:", error))

// Carousel 
nextBtn.addEventListener("click", function () {
  cards.scrollBy({ left: scrollAmount, behavior: "smooth" })
})

prevBtn.addEventListener("click", function () {
  cards.scrollBy({ left: -scrollAmount, behavior: "smooth" })
})

cards.addEventListener("scroll", function () {
  let maxScrollLeft = cards.scrollWidth - cards.clientWidth

  prevBtn.style.display = cards.scrollLeft <= 0 ? "none" : "block"
  nextBtn.style.display = cards.scrollLeft >= maxScrollLeft - 10 ? "none" : "block"
})

// Modal close
modalCloseBtn.addEventListener("click", function () {
  modal.style.display = "none"
})

// Iterate Over Banner 

features.forEach(text => {
    const div = document.createElement("div")

    const title = document.createElement("h3")
    title.textContent = `${text.title}`

    const desc = document.createElement("p")
    desc.textContent = `${text.desc}`

    
    div.append(title, desc)
    div.classList.add("feature-div")
    featureContainer.append(div)
})