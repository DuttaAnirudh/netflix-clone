import { fetchGenreList, fetchPopularMovies } from './helpers.js';

export const state = {
  list: {
    genres: [],
    popularMovies: [],
  },
};

export const loadGenreList = async function () {
  try {
    const data = await fetchGenreList();

    const genreList = data.genres;

    state.list.genres = genreList.map(gen => {
      return {
        id: gen.id,
        genre: gen.name,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadPopularMovies = async function () {
  try {
    const data = await fetchPopularMovies();

    const popularMovieList = data.results;

    state.list.popularMovies = popularMovieList.map(movie => {
      return {
        id: movie.id,
        genreID: movie.genre_ids,
        title: movie.title,
        overview: movie.overview,
        year: movie.release_date,
        rating: movie.vote_average,
        posterImg: movie.poster_path,
        backdropImg: movie.backdrop_path,
      };
    });
  } catch (err) {
    throw err;
  }
};
