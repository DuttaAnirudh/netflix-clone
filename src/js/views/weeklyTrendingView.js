import View from './View.js';
import star from 'url:../../assets/star.png';
import { API_URL_BASE_IMAGE } from '../config.js';

class WeeklyTrendingView extends View {
  _parentElement = document.getElementById('weekly-trending');

  addHandlerClick(handler) {
    if (!this._parentElement) {
      return;
    }

    this._parentElement.addEventListener('click', function (e) {
      const box = e.target.closest('.recommend__container');

      if (!box) {
        return;
      }

      const movieID = box.dataset.id;
      return handler(movieID);
    });
  }

  _generateMarkup() {
    return this._data
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
  }
}

export default new WeeklyTrendingView();
