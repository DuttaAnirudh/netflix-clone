import {
  fetchGenreList,
  fetchPopularMovies,
  fetchTrendingWeekly,
  fetchTopRated,
  fetchMovieCast,
  fetchMovieDetails,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchQueryDetails,
} from './helpers.js';

export const state = {
  list: {
    genres: [],
    popularMovies: [],
    bannerMovie: [],
    trendingList: [],
    topRated: [],
  },

  movie: {
    topLevelDetails: [],
    actors: [],
    director: [],
    videosKeys: [],
    similarMovies: [],
  },

  query: {
    queryString: [],
    queryResultsList: [],
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

const convertGenreIDToName = function (data) {
  const genreMap = data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.genre;
    return acc;
  }, {});

  data.popularMovies.forEach(movie => {
    movie.genreID = movie.genreID.map(id => genreMap[id]);
  });
};

export const loadPopularMovies = async function () {
  try {
    const data = await fetchPopularMovies();

    const popularMovieList = data.results;

    state.list.popularMovies = createMovieObject(popularMovieList);

    // Mutating GenreID array (Changing genre IDs to genre names)
    convertGenreIDToName(state.list);
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

export const loadMovieDetails = async function (id) {
  try {
    if (!id) {
      return;
    }

    // Fetching videos for the movie
    const dataMovieVideo = await fetchMovieVideos(id);
    // Fetching Movie Top level Details
    const dataMovieDetails = await fetchMovieDetails(id);
    // Fetching entire movie cast array
    const dataMovieCast = await fetchMovieCast(id);
    // Fetching similar movies
    const dataMovieSimilar = await fetchSimilarMovies(id);

    const dataTopLevel = {
      id: dataMovieDetails.id,
      adult: dataMovieDetails.adult,
      genreID: dataMovieDetails.genres.map(gen => gen.name),
      title: dataMovieDetails.title,
      overview: dataMovieDetails.overview,
      runtime: dataMovieDetails.runtime,
      year: dataMovieDetails.release_date,
      rating: dataMovieDetails.vote_average,
      posterImg: dataMovieDetails.poster_path,
      backdropImg: dataMovieDetails.backdrop_path,
    };

    // Filtering only the first 10 actors
    const dataActors = dataMovieCast.cast
      .filter(el => el.known_for_department === 'Acting')
      .slice(0, 10)
      .map(el => el.name);

    // Filtering only the first director
    const dataDirector = dataMovieCast.crew.filter(
      el => el.known_for_department === 'Directing'
    )[0];

    const movieVideos = dataMovieVideo.results
      .filter(
        vidInfo =>
          vidInfo.type === 'Teaser' ||
          vidInfo.type === 'Trailer' ||
          vidInfo.type === 'Clip'
      )
      .map(vidInfo => vidInfo.key);

    state.movie.topLevelDetails.push(dataTopLevel);
    state.movie.actors = dataActors;
    if (dataDirector) {
      state.movie.director = dataDirector.name;
    } else {
      state.movie.director = 'N.A';
    }
    state.movie.videosKeys = movieVideos;
    state.movie.similarMovies = dataMovieSimilar.results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        year: movie.release_date,
        rating: movie.vote_average,
        posterImg: movie.poster_path,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadSearchDetails = async function (query) {
  try {
    if (!query) {
      return;
    }

    state.query.queryString.push(query);

    const searchResultsObject = await fetchQueryDetails(query);

    state.query.queryResultsList = createMovieObject(
      searchResultsObject.results
    );
  } catch (err) {
    throw err;
  }
};
