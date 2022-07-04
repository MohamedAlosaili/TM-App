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
const current = new Date();
const DOB = new Date("1972-06-07");
const calculate = Math.trunc((current - DOB) / 1000 / 60 / 60 / 24 / 30 / 12);
console.log(calculate);

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".sidbar-menu");
const layer = document.querySelector(".layer");

hamburger.addEventListener("click", () => {
  hamburger.closest(".nav-bar").classList.toggle("active");
  menu.classList.toggle("active");
});
