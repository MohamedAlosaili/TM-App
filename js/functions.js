import {
  API_KEY,
  DAY_TREND,
  WEEK_TREND,
  FULL_DETAILS,
  POPULAR,
  CUSTOM_REQUEST,
  SEARCH,
} from "./config.js";
import { dataObj } from "./app.js";
import Home from "./classes/home.js";
import Discover from "./classes/discover.js";
import MoviePage from "./classes/moviePage.js";
import Watchlist from "./classes/watchlist.js";
import SearchResult from "./classes/searchResult.js";
import CastPage from "./classes/castPage.js";
import Error from "./classes/errorHandler.js";

async function fetchData(mainRequest, extra = "") {
  const serverless = `/.netlify/functions/fetch-data`;
  const options = {
    method: "POST",
    body: JSON.stringify({
      mainRequest: mainRequest,
      extra: extra,
    }),
  };
  try {
    const req = await fetch(serverless, options);

    const res = await req.json();
    if (!req.ok) {
      Error.renderError(req.status, res.status_message);
      throw res.status_message;
    }

    return res;
  } catch (err) {
    Error.renderError(err.status, err.status_message);
    throw err;
  }
}

// Pages Functions
export async function getHomePage() {
  Home.renderLoader();

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

export async function getDiscoverPage(type = null) {
  Discover.renderLoader();

  const popular = await fetchData(POPULAR(type));

  dataObj.discoverCurrentUrl = POPULAR(type);

  Discover.rendermainPageElement(popular);
}

export function getWatchlistPage() {
  Watchlist.renderLoader();

  const watchlistCards = JSON.parse(localStorage.getItem("watchlist"));

  setTimeout(() => {
    Watchlist.rendermainPageElement(watchlistCards);
  }, 500);
}

export async function getMoviePage(id) {
  MoviePage.renderLoader();

  const regex = /[a-zA-Z]+/;
  const type = dataObj.pageName.match(regex).join("");

  const movieObj = await fetchData(
    FULL_DETAILS(type, id),
    "&include_image_language=en,null&append_to_response=videos,credits,images,similar"
  );

  dataObj.moviePage.movieObj = movieObj;
  dataObj.moviePage.backdrops = [...movieObj.images.backdrops];
  dataObj.moviePage.posters = [...movieObj.images.posters];

  MoviePage.rendermainPageElement(movieObj, type);
}

export async function getSearchResult(query) {
  query = query.replaceAll("%20", " ");

  SearchResult.renderLoader();

  const results = await fetchData(SEARCH, `&query=${query}&page=1`);

  separateTheResults(results);
  SearchResult.rendermainPageElement(query);
}

function separateTheResults(results) {
  dataObj.searchResults.person = [];
  dataObj.searchResults.movies = [];

  results.results.forEach((item) => {
    if (item.media_type === "person") {
      dataObj.searchResults.person.push(item);
    } else {
      dataObj.searchResults.movies.push(item);
    }
  });
}

export async function getCastPage(id) {
  CastPage.renderLoader();

  const [personObj, popularPeople] = await Promise.all([
    fetchData(
      FULL_DETAILS("person", id),
      "&append_to_response=combined_credits,images,external_ids"
    ),
    fetchData(POPULAR("person")),
  ]);

  CastPage.rendermainPageElement(personObj, popularPeople);
}

export async function controlChangePages(pageName) {
  if (pageName !== dataObj.pageName) {
    dataObj.pages[pageName](pageName);

    dataObj.pageName = pageName;
    location.hash = pageName;
  }
}

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
    `${dataObj.discoverCurrentUrl}`,
    `&page=${dataObj.pageNum}`
  );
  Discover.loadMoreListener();
  Discover.clearLoadMore();
  Discover.$cardContainer.innerHTML += Discover.getSectionCards(
    newCards.results,
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
  dataObj.watchlist.forEach((item) => {
    if (item.id === watchlistObj.id) exist = true;
  });

  if (!exist) {
    dataObj.watchlist.push(watchlistObj);
    localStorage.setItem("watchlist", JSON.stringify(dataObj.watchlist));
  }
}

export function removeFromWatchlist(id) {
  let removedIdx;
  dataObj.watchlist.forEach((item, idx) => {
    if (`${item.id}` === `${id}`) removedIdx = idx;
  });

  dataObj.watchlist.splice(removedIdx, 1);

  localStorage.setItem("watchlist", JSON.stringify(dataObj.watchlist));
}

export function checkTheWatchlist(id) {
  let checkResult = false;
  dataObj.watchlist.forEach((item) => {
    if (`${item.id}` === `${id}`) checkResult = true;
  });

  return checkResult;
}
