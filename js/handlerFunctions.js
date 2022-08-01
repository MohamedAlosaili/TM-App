import { dataObj } from "./app.js";
import { mainClass } from "./classes/mainClass.js";
import Navbar from "./classes/navbar.js";
import Discover from "./classes/discover.js";
import SearchResult from "./classes/searchResult.js";
import MoviePage from "./classes/moviePage.js";
import MovieSectionAll from "./classes/movieSectionAll.js";
import CastPage from "./classes/castPage.js";
import {
  getHomePage,
  getNewDiscoverPageCards,
  getMoreCards,
  removeFromWatchlist,
  addToWatchlist,
  getMoviePage,
  getSearchResult,
  getCastPage,
  controlChangePages,
} from "./functions.js";

export function layerHandler() {
  Navbar.mobileMenuState("remove", "relative", "close");

  if (dataObj.pageName === "tv-" || dataObj.pageName === "movie-") {
    MoviePage.$trailerContainer.classList.remove("active");
    MoviePage.$trailerVideo ? (MoviePage.$trailerVideo.src = "") : false;
    mainClass.renderLayer("remove");
  }
}

export function navLinksHandler(e) {
  // Deal with links
  Navbar.$navLinks.forEach((link) => link.classList.remove("active", "shake"));
  e.currentTarget.classList.add("active", "shake");
  Navbar.mobileMenuState("remove", "relative", "close");

  // Deal with pages
  const pageName = e.currentTarget.dataset.page;
  controlChangePages(pageName);
}

export function searchFromHandler(e) {
  e.preventDefault();
  const value = Navbar.$searchInput.value;

  if (value) {
    SearchResult.renderLoader();
    getSearchResult(value);

    Navbar.mobileMenuState("remove", "relative", "close");
    dataObj.pageName = "search?q=";
    location.hash = `search?q=${value}`;
    Navbar.updateNavLinks();
    Navbar.$searchInput.value = "";
    Navbar.$searchInput.blur();
  }
}

export function mobileMenuHandler() {
  if (Navbar.$mobileMenu.classList.contains("active")) {
    Navbar.mobileMenuState("remove", "relative", "close");
  } else {
    Navbar.mobileMenuState("add", "fixed", "open");
  }
}

export function mainPageHandler(e) {
  if (e.target.closest("[data-watchlist-btn]")) watchlistBtnHandler(e);
  else if (e.target.closest("[data-expand-card]")) expandBtnHandler(e);
  else if (e.target.closest("[data-moreten-btn]"))
    MovieSectionAll.getSectionAll(e.target.dataset.type);
  else if (e.target.closest("[data-back-home]")) backToHomePage();
  else if (e.target.closest("[data-expand-cast]")) expandCastHandler(e);
  else if (e.target.closest("[data-browse-imgs]")) openBrowseImgs(e);
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
  btn.classList.toggle("active");
}

function expandBtnHandler(e) {
  const card = e.target.closest("[data-expand-card]");

  const id = card.id;
  const type = card.dataset.type;

  location.hash = `${type}-${id}`;
  dataObj.pageName = `${type}-`;
  getMoviePage(id);

  Navbar.updateNavLinks();
}

function backToHomePage() {
  location.hash = "home";
  dataObj.pageName = "home";

  Navbar.updateNavLinks();
  getHomePage();
}

function expandCastHandler(e) {
  const btn = e.target.closest("[data-expand-cast]");

  location.hash = `person-${btn.id}`;
  dataObj.pageName = "person-";
  getCastPage(btn.id);

  Navbar.updateNavLinks();
}

function openBrowseImgs(e) {
  const img = e.target.closest("[data-browse-imgs]");
  const idx = +img.dataset.idx;

  if (idx === 0) {
    CastPage.$leftSlider.classList.add("not-allowed");
    CastPage.$rightSlider.classList.remove("not-allowed");
  } else if (idx === CastPage.$browseContainer.children.length - 1) {
    CastPage.$rightSlider.classList.add("not-allowed");
    CastPage.$leftSlider.classList.remove("not-allowed");
  } else {
    CastPage.$leftSlider.classList.remove("not-allowed");
    CastPage.$rightSlider.classList.remove("not-allowed");
  }

  CastPage.browseNum = idx;

  CastPage.$browseContainer.style.left = `-${idx * 100}vw`;
  CastPage.$browseContainer.parentElement.classList.add("open");
}

export function moviePageHandler(e) {
  if (e.target.closest("[data-trailer-btn]")) {
    MoviePage.$trailerContainer.classList.add("active");
    MoviePage.$trailerVideo
      ? (MoviePage.$trailerVideo.src = MoviePage.trailerUrl)
      : false;
    mainClass.renderLayer("add", 10);
  }
  if (e.target.closest("[data-close-trailer]")) {
    MoviePage.$trailerContainer.classList.remove("active");
    MoviePage.$trailerVideo ? (MoviePage.$trailerVideo.src = "") : false;
    mainClass.renderLayer("remove");
  }
}

export function sectionNavHandler(e) {
  Discover.$loadMoreBtn.style.display = "block";
  dataObj.pageNum = 1;

  const $navBack = document.querySelector("[data-nav-back]");
  const btn = e.target.closest("[data-discover-page]");
  const idx = btn.dataset.idx;

  Discover.$cardContainer.className = "cards-container wrap";
  const loader = document.createElement("div");
  loader.className = "loading-spinner";
  loader.innerHTML = `
          <span class="load-out"></span>
          <span class="load-in"></span>
        `;
  Discover.$cardContainer.prepend(loader);

  for (let i = 1; i < Discover.$discoverNav.children.length; i++)
    Discover.$discoverNav.children[i].classList.remove("active");
  btn.classList.add("active");

  Discover.discoverPage = btn.dataset.discoverPage;
  getNewDiscoverPageCards(Discover.discoverPage, dataObj.pageName);

  const parentWidth =
    parseInt(getComputedStyle(btn.parentElement).getPropertyValue("width")) / 3;
  $navBack.style.left = `${idx * parentWidth}px`;

  Discover.$discoverNav.removeEventListener("click", sectionNavHandler);
}

export function loadMoreHandler(e) {
  Discover.renderLoader(e.currentTarget, false);

  getMoreCards();

  if (dataObj.pageNum === 500) Discover.$loadMoreBtn.style.display = "none";
  Discover.$loadMoreBtn.removeEventListener("click", loadMoreHandler);
}

export function movieNavHandler(e) {
  const $navBack = document.querySelector("[data-nav-back]");
  const btn = e.target.closest("[data-image-type]");
  const type = btn.dataset.imageType;
  const idx = btn.dataset.idx;

  MoviePage.$navBtns.forEach((btn) => btn.classList.remove("active"));
  btn.classList.add("active");

  MoviePage.$cardContainer.innerHTML = MoviePage.getMovieImages(
    dataObj.moviePage[type],
    type
  );

  const parentWidth =
    parseInt(getComputedStyle(btn.parentElement).getPropertyValue("width")) / 2;
  $navBack.style.left = `${idx * parentWidth}px`;
}

export function collapseBtnHandler(e) {
  e.target.parentElement.classList.toggle("show");
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    CastPage.$collapseBtn.innerHTML = `Show less<i class="icon fa-solid fa-chevron-up">`;
  } else {
    CastPage.$collapseBtn.innerHTML = `Show more<i class="icon fa-solid fa-chevron-right">`;
  }
}

export function leftSliderHandler() {
  CastPage.$rightSlider.classList.remove("not-allowed");
  let num = CastPage.browseNum;
  num--;

  if (num === 0) CastPage.$leftSlider.classList.add("not-allowed");
  else if (num < 0) {
    CastPage.$leftSlider.classList.add("not-allowed");
    return;
  }

  CastPage.browseNum = num;
  CastPage.$browseContainer.style.left = `-${num * 100}vw`;
}

export function rightSliderHandler() {
  CastPage.$leftSlider.classList.remove("not-allowed");
  let num = CastPage.browseNum;
  num++;

  if (num === CastPage.$browseContainer.children.length - 1)
    CastPage.$rightSlider.classList.add("not-allowed");
  else if (num >= CastPage.$browseContainer.children.length) {
    CastPage.$rightSlider.classList.add("not-allowed");
    return;
  }

  CastPage.browseNum = num;
  CastPage.$browseContainer.style.left = `-${num * 100}vw`;
}
