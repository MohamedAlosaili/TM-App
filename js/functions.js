import {
  GENRE_LIST,
  DAY_TREND,
  WEEK_TREND,
  FULL_DETAILS,
  POPULAR,
  TOP_RATED,
  TREND,
  CUSTOM_REQUEST,
} from "./config.js";
import { dataObj } from "./app.js";
import Home from "./classes/home.js";
import Discover from "./classes/discover.js";
import Watchlist from "./classes/watchlist.js";
import MoviePage from "./classes/moviePage.js";

async function fetchData(API_URL) {
  try {
    const req = await fetch(API_URL);

    if (!req.ok) throw err;

    const res = req.json();

    return res;
  } catch (err) {
    throw err;
  }
}

// Pages Functions
export async function getHomePage() {
  const [trendDay, trendWeek, popularMovies, popularTV] = await Promise.all([
    fetchData(DAY_TREND),
    fetchData(WEEK_TREND),
    fetchData(POPULAR("movie")),
    fetchData(POPULAR("tv")),
  ]);
  const homeObj = {
    trendDay: trendDay,
    trendWeek: trendWeek,
    popularMovies: popularMovies,
    popularTV: popularTV,
  };
  dataObj.pageName = "home";
  Home.rendermainPageElement(homeObj);
}

export async function getDiscoverPage(type) {
  const popular = await fetchData(POPULAR(type));
  const generList = await fetchData(GENRE_LIST(type));

  dataObj.discoverCurrentUrl = POPULAR(type);

  Discover.rendermainPageElement(popular, generList);
}

export function getWatchlistPage() {
  Watchlist.renderLoader();

  const watchlistCards = JSON.parse(localStorage.getItem("watchlist"));
  Watchlist.rendermainPageElement(watchlistCards);
}

export async function getMoviePage(type, id) {
  console.log(id, type);
  const movieObj = await fetchData(
    FULL_DETAILS(type, id, "&append_to_response=videos,credits,images,similar")
  );

  MoviePage.rendermainPageElement(movieObj, type);
}

export async function controlChangePages(pageName) {
  if (pageName !== dataObj.pageName) {
    dataObj.classes[pageName].renderLoader();
    dataObj.pages[pageName](pageName);

    dataObj.pageName = pageName;
    location.hash = pageName;
  }
}

export function getSearchResult() {}

export async function getNewDiscoverPageCards(pageName, type) {
  let reqUrl;
  if (pageName === "popular" || pageName === "top_rated") {
    reqUrl = CUSTOM_REQUEST(`${type}/${pageName}`);
  } else {
    reqUrl = CUSTOM_REQUEST(`${pageName}/${type}/day`);
  }

  dataObj.discoverCurrentUrl = reqUrl;

  const pageData = await fetchData(reqUrl);
  Discover.getNewDiscoverPage(pageData);
}

export async function getMoreCards() {
  dataObj.pageNum += 1;

  const newCards = await fetchData(
    `${dataObj.discoverCurrentUrl}&page=${dataObj.pageNum}`
  );

  Discover.clearLoadMore();
  Discover.cardContainer.innerHTML += Discover._getSectionCards(
    newCards,
    dataObj.pageName
  );
}

export function addToWatchlist(btn) {
  const parent = btn.closest("[data-poster-parent]");

  const posterImg = parent.querySelector("[data-poster]")?.src ?? null;
  const title = (
    parent.querySelector(".card-title") ?? parent.querySelector(".post-title")
  ).innerHTML;

  const watchlistObj = {
    id: btn.id,
    title: title,
    poster_path: posterImg,
    media_type: btn.dataset.type,
  };

  let exist = false;
  dataObj.watchlist.results.forEach((item) => {
    if (item.id === watchlistObj.id) exist = true;
  });

  if (!exist) {
    dataObj.watchlist.results.push(watchlistObj);
    localStorage.setItem("watchlist", JSON.stringify(dataObj.watchlist));
  }
}

export function removeFromWatchlist(id) {
  let removedIdx;
  dataObj.watchlist.results.forEach((item, idx) => {
    if (`${item.id}` === `${id}`) removedIdx = idx;
  });

  dataObj.watchlist.results.splice(removedIdx, 1);

  localStorage.setItem("watchlist", JSON.stringify(dataObj.watchlist));
}

export function checkTheWatchlist(id) {
  let checkResult = false;
  dataObj.watchlist.results.forEach((item) => {
    if (`${item.id}` === `${id}`) checkResult = true;
  });

  return checkResult;
}
