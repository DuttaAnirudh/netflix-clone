import {
  API_URL,
  KEY,
  API_URL_GENRE,
  API_URL_TRENDING,
  TIME_FRAME,
  API_URL_SEARCH,
} from './config.js';

export const fetchGenreList = async function () {
  try {
    const res = await fetch(`${API_URL_GENRE}/list?api_key=${KEY}`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchPopularMovies = async function () {
  try {
    const res = await fetch(
      `${API_URL}/popular?language=en-US&page=1&api_key=${KEY}`
    );

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchTrendingWeekly = async function () {
  try {
    const res = await fetch(`${API_URL_TRENDING}/${TIME_FRAME}?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchTopRated = async function () {
  try {
    const res = await fetch(`${API_URL}/top_rated?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchMovieCast = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}/credits?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchMovieDetails = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchMovieVideos = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}/videos?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchSimilarMovies = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}/similar?api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchQueryDetails = async function (query) {
  try {
    const res = await fetch(`${API_URL_SEARCH}?query=${query}&api_key=${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
