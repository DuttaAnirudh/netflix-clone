import * as model from './model.js';
import * as sidebarView from './view/sidebarView.js';
import * as bannerView from './view/bannerView.js';

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
    bannerView.renderBannerSlider(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

// INITIALIZE
const init = function () {
  controlSidebar();
  controlBanner();
};

init();
