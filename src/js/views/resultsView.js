import star from 'url:../../assets/star.png';
import { API_URL_BASE_IMAGE } from '../config.js';

export const renderSearchResults = async function (data) {
  const parentElement = document.getElementById('main-search');

  if (!parentElement) {
    return;
  }

  const markupList = data.queryResultsList
    .map(movie => {
      if (movie.posterImg) {
        return `<div class="grid__container">
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
              <p class="paragraph paragraph--light">${movie.rating.toFixed(
                1
              )}</p>
            </div>
            <p class="paragraph paragraph--light">${
              movie.year.split('-')[0]
            }</p>
          </div>
        </div>
        </div>`;
      }
    })
    .join('');

  const markup = `
  <section class="section-query-details mb-4">
  <p class="paragrapgh paragraph--red">Results for</p>
  <p class="heading-primary heading-primary--bold">"${
    data.queryString[0][0].toUpperCase() + data.queryString[0].slice(1)
  }"</p>
</section>

<section class="section-results-list grid-list">
${markupList}
</section>
  `;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};
