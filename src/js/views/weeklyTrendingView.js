import star from 'url:../../assets/star.png';
import { API_URL_BASE_IMAGE } from '../config.js';

const parentElement = document.getElementById('weekly-trending');

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

export const renderWeeklyTrending = function (data) {
  if (!parentElement) {
    return;
  }

  const markup = data
    .map(movie => {
      return `<div class="recommend__container" data-id="${movie.id}">
    <img
      src="${API_URL_BASE_IMAGE}${movie.posterImg}"
      alt="recommend image"
      class="recommend__img"
    />
    <div class="recommend__info-box">
      <h3 class="heading-tertiary recommend__title">
        ${movie.title}
      </h3>
      <div class="recommend__rating-year">
        <div class="recommend__rating">
          <img
            src="${star}"
            alt="star"
            class="recommend__rating-star"
          />
          <p class="paragraph paragraph--light">${movie.rating.toFixed(1)}</p>
        </div>
        <p class="paragraph paragraph--light">${movie.year.split('-')[0]}</p>
      </div>
    </div>
  </div>`;
    })
    .join('');

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};
