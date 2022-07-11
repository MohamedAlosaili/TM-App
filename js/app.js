import Navbar from "./classes/navbar.js";
import Home from "./classes/home.js";
import Discover from "./classes/discover.js";
import Watchlist from "./classes/watchlist.js";
import { getDiscoverPage, getHomePage, getWatchlistPage } from "./functions.js";

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
  },
  classes: {
    home: Home,
    movie: Discover,
    tv: Discover,
    watchlist: Watchlist,
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

  if (urlHash === "" || urlHash === "first-section") {
    urlHash = "home";
    location.hash = "home";
  }

  dataObj.pageName = urlHash;
  dataObj.pages[urlHash](urlHash);
  Navbar.updateNavLinks();
}

const scrollTopBtn = document.querySelector("[data-scroll-top]");
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  if (window.scrollY > 500) scrollTopBtn.classList.add("active");
  else scrollTopBtn.classList.remove("active");
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
