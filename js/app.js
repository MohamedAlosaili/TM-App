import Navbar from "./classes/navbar.js";
import Home from "./classes/home.js";
import Discover from "./classes/discover.js";
import Watchlist from "./classes/watchlist.js";
import {
  getDiscoverPage,
  getHomePage,
  getWatchlistPage,
  getMoviePage,
} from "./functions.js";
import { mainPageHandler } from "./handlerFunctions.js";
import MoviePage from "./classes/moviePage.js";

export const dataObj = {
  watchlist: {
    results: [],
  },
  discoverCurrentUrl: "",
  pageName: "",
  pageNum: 1,
  pages: {
    home: getHomePage,
    movie: getDiscoverPage,
    tv: getDiscoverPage,
    watchlist: getWatchlistPage,
    moviePage: getMoviePage,
  },
  classes: {
    home: Home,
    movie: Discover,
    tv: Discover,
    watchlist: Watchlist,
    moviePage: MoviePage,
  },
  moviePage: {
    cast: [],
    backdrops: [],
    posters: [],
  },
};

function getBookmarks() {
  if (localStorage.getItem("watchlist")) {
    dataObj.watchlist = JSON.parse(localStorage.getItem("watchlist"));
  }
}

const init = (function () {
  getBookmarks();
  Navbar.callClassFunctions();
  renderPage();
})();

function renderPage() {
  let urlHash = location.hash.slice(1);

  let moviePage;

  if (urlHash === "" || urlHash === "first-section") {
    urlHash = "home";
    location.hash = "home";
  } else if (urlHash.startsWith("movie-") || urlHash.startsWith("tv-")) {
    moviePage = urlHash;

    urlHash = "moviePage";
  }

  const params = moviePage ? moviePage.split("-") : [urlHash];
  console.log(params);
  dataObj.pageName = urlHash;
  dataObj.pages[urlHash](params[0], params[1]);
  Navbar.updateNavLinks();

  dataObj.classes[urlHash].mainPageListener(mainPageHandler);
}

const scrollTopBtn = document.querySelector("[data-scroll-top]");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) scrollTopBtn.classList.add("active");
  else scrollTopBtn.classList.remove("active");
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
