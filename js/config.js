import KEY from "./key.js";

const API_KEY = KEY;
const API_URL = `https://api.themoviedb.org/3/`;

// Images
const POSTER_URL = "https://image.tmdb.org/t/p/w300";
const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280";

// Videos
const VIDEO_URL = "https://www.youtube.com/embed/";

// Main Requests
const GENRE_LIST = (type) =>
  `${API_URL}genre/${type}/list?api_key=${API_KEY}&language=en-US`;
const DAY_TREND = `${API_URL}trending/all/day?api_key=${API_KEY}&language=en-US`;
const WEEK_TREND = `${API_URL}trending/all/week?api_key=${API_KEY}&language=en-US`;
const FULL_DETAILS = (type, id, extraDetails = "") =>
  `${API_URL}${type}/${id}?api_key=${API_KEY}&language=en-US${extraDetails}`;

// Movies
const POPULAR_MOVIES = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
const TOP_RATED_MOVIES = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US`;
const TREND_MOVIES = `${API_URL}trending/movie/day?api_key=${API_KEY}&language=en-US`;

// TV Show
const POPULAR_TV = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US`;
const TOP_RATED_TV = `${API_URL}tv/top_rated?api_key=${API_KEY}&language=en-US`;
const TREND_TV = `${API_URL}trending/tv/day?api_key=${API_KEY}&language=en-US`;

const CUSTOM_REQUEST = (type) =>
  `${API_URL}${type}?api_key=${API_KEY}&language=en-US`;

export {
  API_KEY,
  API_URL,
  POSTER_URL,
  BACKDROP_URL,
  VIDEO_URL,
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
};
