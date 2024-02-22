import View from './View.js';
import star from 'url:../../assets/star.png';
import { API_URL_BASE_IMAGE } from '../config.js';

class ResultsView extends View {
  _parentElement = document.getElementById('main-search');

  addHandlerClick(handler) {
    const parentElement = document.getElementById('main-search');
    if (!parentElement) {
      return;
    }

    parentElement.addEventListener('click', function (e) {
      const box = e.target.closest('.grid__container');

      if (!box) {
        return;
      }

      const movieID = box.dataset.id;
      return handler(movieID);
    });
  }

  _generateMarkupList() {
    return this._data.queryResultsList
      .map(movie => {
        if (movie.posterImg) {
          return `<div class="grid__container" data-id="${movie.id}">
          <img
        src="${API_URL_BASE_IMAGE}${movie.posterImg}"
        alt="grid image"
        class="grid__img"
      />
      <div class="grid__info-box">
        <h3 class="heading-tertiary grid__title">
          ${movie.title}
        </h3>
        <div class="grid__rating-year">
          <div class="grid__rating">
            <img
              src="${star}"
              alt="star"
              class="grid__rating-star"
            />
            <p class="paragraph paragraph--light">${movie.rating.toFixed(1)}</p>
          </div>
          <p class="paragraph paragraph--light">${movie.year.split('-')[0]}</p>
        </div>
      </div>
      </div>`;
        }
      })
      .join('');
  }

  _generateMarkup() {
    return `
    <section class="section-query-details mb-4">
    <p class="paragrapgh paragraph--red">Results for</p>
    <p class="heading-primary heading-primary--bold">"${
      this._data.queryString[0]
    }"</p>
  </section>
  
  <section class="section-results-list grid-list">
  ${this._generateMarkupList()}
  </section>
    `;
  }
}

export default new ResultsView();
