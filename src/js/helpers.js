import { API_URL, KEY, API_URL_GENRE } from './config.js';

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
