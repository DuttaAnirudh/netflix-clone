import { API_URL, KEY } from './config.js';

export const fetchGenreList = async function () {
  try {
    const res = await fetch(`${API_URL}/list?api_key=${KEY}`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
