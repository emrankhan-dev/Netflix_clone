import { features } from "./feature.js"
import { questions } from "./question.js"
import { contacts } from "./contact.js"

// API KEY 
const API_KEY = "1d07f6a0a630d302e9910ad9665efa4a"
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`

// UI
const mainContainer = document.querySelector(".main-container")
const cardContainer = document.querySelector(".cards")
const cards = document.querySelector(".cards")
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")
const modal = document.querySelector(".modal")
const modalCloseBtn = document.querySelector(".modal-close-btn")
const modalTitle = modal.querySelector(".modal-title")
const modalOverview = modal.querySelector(".modal-overview")
const featureContainer = document.querySelector(".feature-container")
const questionContainer = document.querySelector(".question-container")
const questionTitleArea = document.querySelector(".question-title-area")
const questionAnswer = document.querySelector(".question-answer")
const contactUsList = document.querySelector(".contact-us-list")

const scrollAmount = 500

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

      img.addEventListener("click", function () {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
        mainContainer.classList.add("shadow")
        modal.style.backgroundImage = `
          linear-gradient(to bottom, rgba(255,255,255,0.0) 0%, rgba(20,20,20,0.9) 60%, rgba(20,20,20,0.95) 100%),
          url(https://image.tmdb.org/t/p/w500${movie.poster_path})
        `
        modalTitle.textContent = movie.title
        modal.classList.remove("show")
        setTimeout(() => {
          modal.classList.add("show"); // fade in
        }, 100);

        const maxChars = 150;
        let overview = movie.overview;
        if (overview.length > maxChars) {
          overview = overview.substring(0, maxChars) + "..."
        }
        modalOverview.textContent = overview;
        modal.style.display = "block";
      })
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
  mainContainer.classList.remove("shadow")
  document.body.style.overflow = "auto"
})

// Features Section
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

// Questions Sections 
questions.forEach(question => {
  console.log(question)
  const div = document.createElement("div")
  div.innerHTML = `
  <div class="question-div">
      <div class="question-title-area">
        <h3 class="question-title">${question.question}</h3>
        <span class="question-plus-btn">&plus;</span>
      </div>
      <p class="question-answer">${question.answer}</p>
  </div>
  `
  questionContainer.append(div)
  const questionDiv = div.querySelector(".question-div")
  const questionTitleArea = div.querySelector(".question-title-area")
  const questionAnswer = div.querySelector(".question-answer")
  const questionPlusBtn = div.querySelector(".question-plus-btn")

   questionAnswer.style.display = "none"

  questionTitleArea.addEventListener("click", function (e) {
    e.preventDefault()
    const isOpen = questionAnswer.style.display === "block" || questionAnswer.style.display === ""
    if (isOpen) {
      questionAnswer.style.display = "none"
      questionPlusBtn.innerHTML = "&plus;"
      questionDiv.classList.remove("open")
    } else {
      questionAnswer.style.display = "block"
      questionPlusBtn.innerHTML = "&times;"
      questionDiv.classList.add("open")
    }

  })

})

// Contact-Us 

contacts.forEach(contact => {
  console.log(contact)
  const p = document.createElement("p")
  p.innerHTML = contact
  contactUsList.append(p)
  
})

// Scroll Button 

const scrollBtn = document.getElementById("scroll-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  alert("🚀 Get Started clicked!");
  // Example redirect:
  // window.location.href = "signup.html";
});



