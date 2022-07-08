import {
  POSTER_URL,
  GENRE_LIST,
  DAY_TREND,
  WEEK_TREND,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  TREND_MOVIES,
  POPULAR_TV,
  TOP_RATED_TV,
  TREND_TV,
  CUSTOM_REQUEST,
} from "./config.js";
import Home from "./classes/home.js";
import Movies from "./classes/movies.js";
import TvShows from "./classes/tvShows.js";

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
    fetchData(POPULAR_MOVIES),
    fetchData(POPULAR_TV),
  ]);
  const homeObj = {
    trendDay: trendDay,
    trendWeek: trendWeek,
    popularMovies: popularMovies,
    popularTV: popularTV,
  };

  Home.rendermainPageElement(homeObj);
}

export async function getMoviesPage() {
  const popularMovies = await fetchData(POPULAR_MOVIES);
  const generList = await fetchData(GENRE_LIST("movie"));

  Movies.rendermainPageElement(popularMovies, generList);
}

export async function controlChangePages(pageName) {
  if (pageName !== Home.pageName) {
    if (pageName === "movie") {
      location.hash = "movies";
      Movies.renderLoader();
      getMoviesPage();
    }
  }
}

export function getSearchResult() {}

export async function getNewDiscoverPageCards(pageName) {
  if (pageName === "popular" || pageName === "top_rated") {
    const pageData = await fetchData(CUSTOM_REQUEST(`movie/${pageName}`));
    console.log(pageData);
    Movies.getNewDiscoverPage(pageData);
  } else {
    const pageData = await fetchData(CUSTOM_REQUEST(`${pageName}/movie/day`));
    Movies.getNewDiscoverPage(pageData);
  }
}
