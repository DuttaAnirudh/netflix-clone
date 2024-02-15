import { API_URL_BASE_IMAGE } from '../config.js';

const parentElement = document.getElementById('banner-row-list');

export const renderBannerSlider = async function (data) {
  try {
    const markup = data
      .map(movie => {
        return `<div class="banner__recommend-container active" data-id="${movie.id}">
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
  } catch (err) {
    throw err;
  }
};
