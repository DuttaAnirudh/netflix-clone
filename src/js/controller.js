import * as model from './model.js';
import * as sidebarView from './view/sidebarView.js';
import * as bannerSliderView from './view/bannerSliderView.js';
import * as bannerBoxView from './view/bannerBoxView.js';

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
    bannerBoxView.bannerBoxOnLoad(bannerMovie);
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
    bannerBoxView.bannerBoxOnLoad(bannerMovie);

    // Rendering Slider boxes with active status
    bannerSliderView.renderBannerSlider(model.state.list.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

// INITIALIZE
const init = function () {
  sidebarView.addHandlerRender(controlSidebar);
  bannerBoxView.addHandlerRender(controlBanner);
  bannerSliderView.addHandlerRender(controlBannerSlider);
  bannerBoxView.addHandlerClick(controlBannerOnCLick);
};
init();
