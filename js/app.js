import {
  FIND_BY_ID,
  POPULAR_MOVIES,
  SEARCH_URL,
  DISCOVER_MOVIES,
} from "./config.js";

// getInfo();
async function getInfo() {
  try {
    const req = await fetch(
      "https://api.themoviedb.org/3/movie/438148?api_key=f9e2c5697b7fbecaa38a5d0713c3b191&language=en-US&append_to_response=videos,credits"
    );
    if (!req.ok) throw req.json().errors[0];
    const res = await req.json();
    console.log(res);
    // getCards(res);
  } catch (err) {
    throw err;
  }
}

const popularMovies = document.querySelector(".cast-container");
console.log(popularMovies);
function getCards(arr) {
  arr.credits.cast.forEach((cast, idx) => {
    if (idx >= 10) return;
    const card = document.createElement("div");
    card.classList.add(".card");

    card.innerHTML = `
      <figure class="cast-poster">
      <img src="https://image.tmdb.org/t/p/w300${cast.profile_path}" alt="${
      cast.name ?? cast.original_name
    }">
      <figcaption>${cast.name ?? cast.original_name}</figcaption>
      <p class="character">${cast.character}</p>
      </figure>
    `;
    popularMovies.append(card);
  });
}

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".sidbar-menu");
const layer = document.querySelector(".layer");

hamburger.addEventListener("click", () => {
  hamburger.closest(".nav-bar").classList.toggle("active");
  menu.classList.toggle("active");
});

// const btns = document.querySelectorAll(".discover-section .btn");

// btns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     btns.forEach((btn) => btn.classList.remove("active"));
//     btn.classList.add("active");
//   });
// });

// const btn = document.querySelector(".discover-section .container > .btn");
// const container = document.querySelector(".card-container");
// const cards = document.querySelectorAll(".card-container .card");

// btn.addEventListener("click", () => {
//   btn.innerHTML = "";
//   btn.classList.add("loading");
//   setTimeout(() => {
//     btn.innerHTML = "Load More";
//     btn.classList.remove("loading");
//   }, 1000);
// });

// const filter = document.querySelector("button.filter");
// const geners = document.querySelector(".genre-list");
// const genreItems = document.querySelectorAll(".genre-item");

// genreItems.forEach((item) => {
//   item.addEventListener("click", (e) => {
//     e.target.classList.toggle("active");
//   });
// });

// filter.addEventListener("click", () => {
//   geners.classList.toggle("active");
// });

const watchBtn = document.querySelectorAll(".watchlist-btn");

// watchBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (btn.firstElementChild.classList.contains("fa-plus"))
//       btn.firstElementChild.className = "fa-solid fa-check";
//     else btn.firstElementChild.className = "fa-solid fa-plus";
//   });
// });
