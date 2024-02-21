import * as model from './model.js';
import * as sidebarView from './views/sidebarView.js';
import * as bannerSliderView from './views/bannerSliderView.js';
import * as bannerBoxView from './views/bannerBoxView.js';
import * as weeklyTrendingView from './views/weeklyTrendingView.js';
import * as topRatedView from './views/topRatedView.js';
import * as detailsView from './views/detailsView.js';
import * as resultsView from './views/resultsView.js';
import * as searchView from './views/searchView.js';

// VARIABLES
const searchBtn = document.querySelector('.search__icon');
const searchField = document.querySelector('.search__field');
const sliders = document.querySelectorAll('.slider-box');

// EVENT LISTENERS
// Focusing on search input field when clicking on search icon
searchBtn.addEventListener('click', () => {
  searchField.focus();
});

// Scrolling in X direction on mouse scroll
sliders.forEach(slider => {
  slider.addEventListener('wheel', function (e) {
    // Determing scroll direction(1 = down | -1 = up)
    const delta = Math.sign(e.deltaY);

    // Controling the scroll speed
    const scrollAmount = 25;

    slider.scrollLeft += delta * scrollAmount;

    // Prevent Default scrolling behavior
    e.preventDefault();
  });
});

///////////////////////
// SIDEBAR
const controlSidebar = async function () {
  try {
    await model.loadGenreList();
    sidebarView.renderGenreList(model.state.list.genres);
  } catch (err) {
    console.error(err);
  }
};

///////////////////////
// BANNER
const controlBanner = async function () {
  try {
    await model.loadPopularMovies();
    await model.loadBannerMovie();
    const bannerMovie =
      model.state.list.bannerMovie[model.state.list.bannerMovie.length - 1];
    bannerBoxView.renderBannerBox(bannerMovie);
  } catch (err) {
    console.error(err);
  }
};

const controlBannerSlider = async function () {
  try {
    await model.loadPopularMovies();
    bannerSliderView.renderBannerSlider(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

const controlBannerOnCLick = async function (id) {
  try {
    await model.bannerMovieUpdate(id);
    const bannerMovie =
      model.state.list.bannerMovie[model.state.list.bannerMovie.length - 1];
    bannerBoxView.renderBannerBox(bannerMovie);

    // Rendering Slider boxes with active status
    bannerSliderView.renderBannerSlider(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

const controlWeeklyTrending = async function () {
  try {
    await model.loadWeeklyTrending();
    weeklyTrendingView.renderWeeklyTrending(model.state.list.trendingList);
  } catch (err) {
    console.error(err);
  }
};

const controlTopRated = async function () {
  try {
    await model.loadTopRated();
    topRatedView.renderWeeklyTrending(model.state.list.topRated);
  } catch (err) {
    console.error(err);
  }
};

const controlDetailsPageURL = async function (id) {
  try {
    window.location.href = `details.html?id=${id}`;
  } catch (err) {
    console.error(err);
  }
};

const controlMovieDetails = async function () {
  try {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'data' parameter
    const id = urlParams.get('id');

    await model.loadMovieDetails(id);
    detailsView.renderMovieDetails(model.state.movie);
  } catch (err) {
    console.error(err);
  }
};

const controlGenreSearchURL = async function (query) {
  try {
    window.location.href = `results-list.html?genre=${query}`;
  } catch (err) {
    console.error(err);
  }
};

const controlGenreSearch = async function () {
  try {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'data' parameter
    const query = urlParams.get('genre');

    await model.loadSearchDetails(query);
    resultsView.renderSearchResults(model.state.query);
  } catch (err) {
    console.error(err);
  }
};

const controlKeywordSearchURL = async function (query) {
  try {
    window.location.href = `results-list.html?search=${query}`;
  } catch (err) {
    console.error(err);
  }
};

const controlKeywordSearch = async function () {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'data' parameter
    const query = urlParams.get('search');

    await model.loadSearchDetails(query);
    resultsView.renderSearchResults(model.state.query);
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
  weeklyTrendingView.addHandlerRender(controlTopRated);

  bannerBoxView.addHandlerUpdateBanner(controlBannerOnCLick);

  bannerBoxView.addHandlerClick(controlDetailsPageURL);
  weeklyTrendingView.addHandlerClick(controlDetailsPageURL);
  topRatedView.addHandlerClick(controlDetailsPageURL);
  detailsView.addHandlerClick(controlDetailsPageURL);

  detailsView.addHandlerRender(controlMovieDetails);

  sidebarView.addHandlerClick(controlGenreSearchURL);

  resultsView.addHandlerRender(controlGenreSearch);
  resultsView.addHandlerClick(controlDetailsPageURL);

  searchView.addHandlerSearchValue(controlKeywordSearchURL);
  resultsView.addHandlerRender(controlKeywordSearch);
};
init();
