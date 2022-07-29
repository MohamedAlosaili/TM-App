const API_URL = `https://api.themoviedb.org/3/`;

// Images
const POSTER_URL = "https://image.tmdb.org/t/p/w300";
const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280";

// Videos
const VIDEO_URL = "https://www.youtube.com/embed/";

// Main Requests
const DAY_TREND = `${API_URL}trending/all/day`;
const WEEK_TREND = `${API_URL}trending/all/week`;
const FULL_DETAILS = (type, id) => `${API_URL}${type}/${id}`;

// Movies & TV Show
const POPULAR = (type) => `${API_URL}${type}/popular`;

const CUSTOM_REQUEST = (type) => `${API_URL}${type}`;

const SEARCH = `${API_URL}search/multi`;

export {
  POSTER_URL,
  BACKDROP_URL,
  VIDEO_URL,
  DAY_TREND,
  WEEK_TREND,
  FULL_DETAILS,
  POPULAR,
  CUSTOM_REQUEST,
  SEARCH,
};
