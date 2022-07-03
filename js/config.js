import KEY from "./key.js";

const API_KEY = KEY;
const API_URL = `https://api.themoviedb.org/3/`;

// Main Requests
const POPULAR_MOVIES = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
const TOP_RATE_MOVIES = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US`;
const DISCOVER_MOVIES = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US`;
const DISCOVER_TVS = `${API_URL}discover/tv?api_key=${API_KEY}&language=en-US`;
const FIND_BY_ID = (idType, id) =>
  `${API_URL}${idType}/${id}?api_key=${API_KEY}&language=en-US`;
const SEARCH_URL = (query) =>
  `${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${query}`;

const GENRE_LIST = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

export {
  API_KEY,
  API_URL,
  POPULAR_MOVIES,
  TOP_RATE_MOVIES,
  DISCOVER_MOVIES,
  DISCOVER_TVS,
  FIND_BY_ID,
  SEARCH_URL,
  GENRE_LIST,
};
