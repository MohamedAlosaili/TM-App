import {
  FIND_BY_ID,
  POPULAR_MOVIES,
  SEARCH_URL,
  DISCOVER_MOVIES,
} from "./config.js";
//
// getInfo();
async function getInfo() {
  try {
    const req = await fetch(
      "https://api.themoviedb.org/3/movie/667739?api_key=f9e2c5697b7fbecaa38a5d0713c3b191&language=en-US &append_to_response=images,videos,credits,similar"
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

hamburger.addEventListener("click", () => {
  hamburger.closest(".nav-bar").classList.toggle("active");
  menu.classList.toggle("active");
});
document.querySelectorAll(".card .watchlist-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.currentTarget.children[0].className === "fa-solid fa-plus")
      e.currentTarget.children[0].className = "fa-solid fa-check";
    else e.currentTarget.children[0].className = "fa-solid fa-plus";
    console.log(e.currentTarget.parentElement);
  });
});

const buttons = document.querySelectorAll(".discover-nav .btn");
const backLayer = document.querySelector(".discover-nav .nav-back");
const cardContainer = document.querySelector(".card-container");

buttons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const parentWidth =
      parseInt(
        getComputedStyle(backLayer.parentElement).getPropertyValue("width")
      ) / 3;
    backLayer.style.left = `${parentWidth * idx}px`;
    cardContainer.className = `card-container`;
    setTimeout(
      () =>
        (cardContainer.className = `card-container ${btn.dataset.discoverPage}`),
      300
    );
  });
});

// const trailerBtn = document.querySelector("[data-trailer-btn]");
// const trailerVideo = document.querySelector(".trailer-container");
// const layer = document.querySelector(".layer");
// const clsoeTrailer = document.querySelector(".trailer-container .btn");

// clsoeTrailer.addEventListener("click", () => {
//   trailerVideo.classList.remove("active");
//   layer.classList.remove("active");
// });

// trailerBtn.addEventListener("click", () => {
//   trailerVideo.classList.add("active");
//   layer.classList.add("active");
// });

const loader = document.querySelector(".loading-spinner");

const btn = document.querySelector(".discover-section .container > .btn");
const container = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card-container .card");

btn.addEventListener("click", () => {
  btn.innerHTML = "";
  btn.append(loader);
  setTimeout(() => {
    btn.innerHTML = "Load More";
  }, 3000);
});

const filter = document.querySelector(".filter");
const geners = document.querySelector(".genre-list");
const genreItems = document.querySelectorAll(".genre-item");

genreItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
  });
});

filter.addEventListener("click", () => {
  geners.classList.toggle("active");
});

const watchBtn = document.querySelectorAll(".watchlist-btn");

// watchBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (btn.firstElementChild.classList.contains("fa-plus"))
//       btn.firstElementChild.className = "fa-solid fa-check";
//     else btn.firstElementChild.className = "fa-solid fa-plus";
//   });
// });
