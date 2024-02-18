import {
  fetchGenreList,
  fetchPopularMovies,
  fetchTrendingWeekly,
  fetchTopRated,
} from './helpers.js';

export const state = {
  list: {
    genres: [],
    popularMovies: [],
    bannerMovie: [],
    trendingList: [],
    topRated: [],
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

const createMovieObject = function (moviesArray) {
  const arr = moviesArray.map(movie => {
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
  return arr;
};

export const loadPopularMovies = async function () {
  try {
    const data = await fetchPopularMovies();

    const popularMovieList = data.results;

    state.list.popularMovies = createMovieObject(popularMovieList);

    // Mutating GenreID array (Changing genre IDs to genre names)
    const genreMap = state.list.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.genre;
      return acc;
    }, {});

    state.list.popularMovies.forEach(movie => {
      movie.genreID = movie.genreID.map(id => genreMap[id]);
    });
  } catch (err) {
    throw err;
  }
};

export const loadBannerMovie = async function () {
  try {
    const currentBannerMovie = state.list.popularMovies[0];

    state.list.bannerMovie.push(currentBannerMovie);
  } catch (err) {
    throw err;
  }
};

export const bannerMovieUpdate = async function (id) {
  try {
    const movie = state.list.popularMovies.filter(movie => movie.id === +id);
    state.list.bannerMovie.push(movie[0]);

    if (state.list.bannerMovie.length > 1) {
      state.list.bannerMovie.splice(0, state.list.bannerMovie.length - 1);
    }
  } catch (err) {
    throw err;
  }
};

export const loadWeeklyTrending = async function () {
  try {
    const data = await fetchTrendingWeekly();

    const trendingList = data.results;

    state.list.trendingList = createMovieObject(trendingList);
  } catch (err) {
    throw err;
  }
};

export const loadTopRated = async function () {
  try {
    const data = await fetchTopRated();

    const topRatedList = data.results;

    state.list.topRated = createMovieObject(topRatedList);
  } catch (err) {
    throw err;
  }
};
