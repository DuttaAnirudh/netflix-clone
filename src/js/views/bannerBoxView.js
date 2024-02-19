import playCircle from 'url:../../assets/play_circle.png';
import { API_URL_BASE_IMAGE } from '../config.js';
const parentElement = document.getElementById('banner-text-box');
const bannerSection = document.getElementById('section-hero');

export const renderBannerBox = async function (data) {
  if (!bannerSection) {
    return;
  }

  bannerSection.dataset.id = data.id;
  bannerSection.style.backgroundImage = `linear-gradient(90deg, hsla(210, 14%, 3%, 1) 0%, hsla(220, 17%, 7%, 0.116) 100%), url(${API_URL_BASE_IMAGE}${data.backdropImg})`;

  const markup = `<h1 class="heading-primary">${data.title}</h1>
    <div class="banner__year-rating">
      <p class="paragraph">${data.year.split('-')[0]}</p>
      <p class="paragraph paragraph--light">${data.rating.toFixed(1)}</p>
    </div>
    <div class="paragraph">${data.genreID.join(', ')}</div>
    <p class="paragraph mb-2">
      ${data.overview}
    </p>
    <button class="btn banner__btn">
      <span>
      <img
          src="${playCircle}"
          alt="play button"
          class="banner__btn-img" /></span
      >Watch Now
    </button>`;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

export const addHandlerClick = function (handler) {
  if (!bannerSection) {
    return;
  }

  bannerSection.addEventListener('click', function (e) {
    const box = e.target.closest('.banner__recommend-container');

    if (!box) {
      return;
    }

    const movieID = box.dataset.id;
    return handler(movieID);
  });
};
