import { dataObj } from "./app.js";
import MainClass from "./classes/mainClass.js";
import MoviePage from "./classes/moviePage.js";
import Navbar from "./classes/navbar.js";
import {
  addToWatchlist,
  removeFromWatchlist,
  getMoviePage,
} from "./functions.js";

const mainClass = new MainClass();

export function layerHandler() {
  Navbar.mobileMenuState("remove", "scroll");
  console.log(dataObj.pageName);
  if (dataObj.pageName === "moviePage") {
    MoviePage.trailerContainer.classList.remove("active");
    MoviePage.trailerVideo ? (MoviePage.trailerVideo.src = "") : false;
    mainClass.renderLayer("remove");
  }
}

export function mainPageHandler(e) {
  if (e.target.closest("[data-watchlist-btn]")) watchlistBtnHandler(e);
  if (e.target.closest("[data-expand-card]")) expandBtnHandler(e);
}

function watchlistBtnHandler(e) {
  const btn = e.target.closest("[data-watchlist-btn]");

  if (btn.classList.contains("active")) {
    if (btn.dataset.watchlistBtn === "header")
      btn.innerHTML = "Add to watchlist";
    else {
      btn.children[0].className = "fa-solid fa-plus";
      btn.setAttribute("title", "Add to watchlist");
    }

    removeFromWatchlist(btn.id);
  } else {
    if (btn.dataset.watchlistBtn === "header")
      btn.innerHTML = "Added to watchlist";
    else {
      btn.children[0].className = "fa-solid fa-check";
      btn.setAttribute("title", "Remove from watchlist");
    }

    addToWatchlist(btn);
  }
  console.log(e.target);
  btn.classList.toggle("active");
}

function expandBtnHandler(e) {
  const card = e.target.closest("[data-expand-card]");

  MoviePage.renderLoader();

  const id = card.id;
  const type = card.dataset.type;

  location.hash = `${type}-${id}`;
  dataObj.pageName = "moviePage";
  getMoviePage(type, id);

  Navbar.updateNavLinks();
}

export function moviePageHandler(e) {
  if (e.target.closest("[data-trailer-btn]")) {
    MoviePage.trailerContainer.classList.add("active");
    MoviePage.trailerVideo
      ? (MoviePage.trailerVideo.src = MoviePage.trailerUrl)
      : false;
    mainClass.renderLayer("add", 10);
  }
  if (e.target.closest("[data-close-trailer]")) {
    MoviePage.trailerContainer.classList.remove("active");
    MoviePage.trailerVideo ? (MoviePage.trailerVideo.src = "") : false;
    mainClass.renderLayer("remove");
  }
}
