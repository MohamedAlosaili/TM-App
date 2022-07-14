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

// Movies & TV Show
const POPULAR = (type) =>
  `${API_URL}${type}/popular?api_key=${API_KEY}&language=en-US`;

const CUSTOM_REQUEST = (type) =>
  `${API_URL}${type}?api_key=${API_KEY}&language=en-US`;

const SEARCH = (query) => `
${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;

export {
  POSTER_URL,
  BACKDROP_URL,
  VIDEO_URL,
  GENRE_LIST,
  DAY_TREND,
  WEEK_TREND,
  FULL_DETAILS,
  POPULAR,
  CUSTOM_REQUEST,
  SEARCH,
};
