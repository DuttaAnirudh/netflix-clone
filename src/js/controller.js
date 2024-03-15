import * as model from './model.js';
import sidebarView from './views/sidebarView.js';
import menuView from './views/menuView.js';
import bannerSliderView from './views/bannerSliderView.js';
import bannerBoxView from './views/bannerBoxView.js';
import weeklyTrendingView from './views/weeklyTrendingView.js';
import topRatedView from './views/topRatedView.js';
import detailsView from './views/detailsView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import navigationView from './views/navigationView.js';
import sliderView from './views/sliderView.js';

///////////////////////
// SIDEBAR
const controlSidebar = async function () {
  try {
    // Fetching and waitimg for genre list data and pushing it to state
    await model.loadGenreList();

    // Rendering genre list on the sidebar of the website
    sidebarView.render(model.state.list.genres);

    // Rendering genre list on the navigation hamburger menu of the website
    menuView.render(model.state.list.genres);
  } catch (err) {
    console.error(err);
  }
};

///////////////////////
// BANNER
const controlBanner = async function () {
  try {
    // Fetching and waitimg for genre list data and pushing it to state
    await model.loadGenreList();

    // Fetching popular movie data and pushing it to the state
    await model.loadPopularMovies();

    // Filtering the first movie in popular movie array and pushing it to state
    await model.loadBannerMovie();

    // Rendering the first popular movie to the banner section when page loads
    bannerBoxView.render(model.state.list.bannerMovie[0]);
  } catch (err) {
    console.error(err);
  }
};

///////////////////////
// BANNER SLIDER
const controlBannerSlider = async function () {
  try {
    // Fetching popular movie data and pushing it to the state
    await model.loadPopularMovies();

    // Rendering the popular movies to the banner slider
    bannerSliderView.render(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

///////////////////////////////////////////
// BANNER INFORMATION & SLIDER UPDATE
const controlBannerOnCLick = async function (id) {
  try {
    // Updating the banner movie array with the id of the movie selected in slider
    await model.bannerMovieUpdate(id);

    // Rendering the new popular movie from banner movie array to the banner section
    bannerBoxView.render(model.state.list.bannerMovie[0]);

    // Rendering active status to current banner movie
    bannerSliderView.render(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////
// WEEKLY TRENDING SECTION
const controlWeeklyTrending = async function () {
  try {
    // Fetching the trending movies of the week and pushing it to the state
    await model.loadWeeklyTrending();

    // Rendering the weekly trending movies to the homepage
    weeklyTrendingView.render(model.state.list.trendingList);
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////
// TOP RATED SECTION
const controlTopRated = async function () {
  try {
    // Fetching the top rated movies of all time and pushing it to the state
    await model.loadTopRated();

    // Rendering the top rated movies to the homepage
    topRatedView.render(model.state.list.topRated);
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////
// DETAILS PAGE

// Changing url of the page and redirecting to DETAILS page
const controlDetailsPageURL = async function (id) {
  try {
    window.location.href = `details.html?id=${id}`;
  } catch (err) {
    console.error(err);
  }
};

// Rendering the details of the movie requested
const controlMovieDetails = async function () {
  try {
    // Rendering the spinner while the information is loading
    detailsView.renderSpinner();
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter
    const id = urlParams.get('id');

    // Fetching data for the requested movie id
    await model.loadMovieDetails(id);

    // Rendering the requested movie details
    detailsView.render(model.state.movie);
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////
// RESULTS PAGE

// Changing url of the page and redirecting to RESULTS page
// For GENRE search
const controlGenreSearchURL = async function (genre) {
  try {
    window.location.href = `results-list.html?genre=${genre}`;
  } catch (err) {
    console.error(err);
  }
};

// Rendering the results for the requested genre
const controlGenreSearch = async function () {
  try {
    // Rendering the spinner while the information is loading
    resultsView.renderSpinner();
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of the 'genre' parameter
    const query = urlParams.get('genre');

    // Fetching movie data for the requested genre
    await model.loadSearchDetails(query);

    // Rendering the movie list with requested genre
    resultsView.render(model.state.query);
  } catch (err) {
    console.error(err);
  }
};

// Changing url of the page and redirecting to RESULTS page
// For KEYWORD search
const controlKeywordSearchURL = async function (query) {
  try {
    window.location.href = `results-list.html?search=${query}`;
  } catch (err) {
    console.error(err);
  }
};

// Rendering the results for the requested genre
const controlKeywordSearch = async function () {
  try {
    // Rendering the spinner while the information is loading
    resultsView.renderSpinner();
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of the 'search' parameter
    const query = urlParams.get('search');

    // Fetching movie data for the requested keyword
    await model.loadSearchDetails(query);

    // Rendering the movie list which are related to searched keyword
    resultsView.render(model.state.query);
  } catch (err) {
    console.error(err);
  }
};

// INITIALIZE
const init = function () {
  sidebarView.addHandlerRender(controlSidebar);
  bannerBoxView.addHandlerRender(controlBanner);
  bannerSliderView.addHandlerRender(controlBannerSlider);
  weeklyTrendingView.addHandlerRender(controlWeeklyTrending);
  topRatedView.addHandlerRender(controlTopRated);

  bannerBoxView.addHandlerUpdateBanner(controlBannerOnCLick);

  bannerBoxView.addHandlerClick(controlDetailsPageURL);
  weeklyTrendingView.addHandlerClick(controlDetailsPageURL);
  topRatedView.addHandlerClick(controlDetailsPageURL);
  detailsView.addHandlerClick(controlDetailsPageURL);

  detailsView.addHandlerRender(controlMovieDetails);

  sidebarView.addHandlerClick(controlGenreSearchURL);
  menuView.addHandlerClick(controlGenreSearchURL);

  resultsView.addHandlerRender(controlGenreSearch);
  resultsView.addHandlerClick(controlDetailsPageURL);

  searchView.addHandlerSearchValue(controlKeywordSearchURL);
  resultsView.addHandlerRender(controlKeywordSearch);
};
init();
