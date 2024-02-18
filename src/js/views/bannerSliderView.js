import { API_URL_BASE_IMAGE } from '../config.js';

export const renderBannerSlider = async function (data) {
  try {
    const parentElement = document.getElementById('banner-row-list');

    if (!parentElement) {
      return;
    }

    const markup = data
      .map(movie => {
        return `<div class="banner__recommend-container  " data-id="${movie.id}">
        <img
          src="${API_URL_BASE_IMAGE}${movie.posterImg}"
          alt="${movie.title} poster"
          class="recommend__img"
        />
      </div>`;
      })
      .join('');

    parentElement.innerHTML = '';

    parentElement.insertAdjacentHTML('afterbegin', markup);
    _renderActiveStatus();
  } catch (err) {
    throw err;
  }
};

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

const _renderActiveStatus = function () {
  const parentSection = document.getElementById('section-hero');
  const sliderBox = document.querySelectorAll('.banner__recommend-container');

  sliderBox.forEach(box =>
    box.dataset.id === parentSection.dataset.id
      ? box.classList.add('active')
      : box.classList.remove('active')
  );
};
