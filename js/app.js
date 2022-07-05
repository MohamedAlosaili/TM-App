import {
  FIND_BY_ID,
  POPULAR_MOVIES,
  SEARCH_URL,
  DISCOVER_MOVIES,
} from "./config.js";

// getInfo();
async function getInfo() {
  try {
    const req = await fetch(POPULAR_MOVIES);
    if (!req.ok) throw req.json().errors[0];
    const res = await req.json();
    console.log(res);
    // getCards(res.results);
  } catch (err) {
    throw err;
  }
}

const popularMovies = document.querySelector(".card-container");

function getCards(arr) {
  arr.forEach((movie) => {
    const figure = document.createElement("figure");
    figure.classList.add(".card-poster");

    figure.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${
      movie.original_title
    }">
      <figcaption>${movie.original_title ?? movie.title}</figcaption>
    `;
    popularMovies.append(figure);
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
