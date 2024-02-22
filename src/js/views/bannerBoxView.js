import View from './View.js';
import playCircle from 'url:../../assets/play_circle.png';
import { API_URL_BASE_IMAGE } from '../config.js';

class BannerBoxView extends View {
  _parentElement = document.getElementById('banner-text-box');
  _bannerSection = document.getElementById('section-hero');

  _generateMarkup() {
    if (!this._bannerSection) {
      return;
    }

    this._bannerSection.dataset.id = this._data.id;
    this._bannerSection.style.backgroundImage = `linear-gradient(90deg, hsla(210, 14%, 3%, 1) 0%, hsla(220, 17%, 7%, 0.116) 100%), url(${API_URL_BASE_IMAGE}${this._data.backdropImg})`;

    return `<h1 class="heading-primary">${this._data.title}</h1>
    <div class="banner__year-rating">
      <p class="paragraph">${this._data.year.split('-')[0]}</p>
      <p class="paragraph paragraph--light">${this._data.rating.toFixed(1)}</p>
    </div>
    <div class="paragraph">${this._data.genreID.join(', ')}</div>
    <p class="paragraph mb-2">
      ${this._data.overview}
    </p>
    <button class="btn banner__btn" data-id="${this._data.id}">
      <span>
      <img
          src="${playCircle}"
          alt="play button"
          class="banner__btn-img" /></span
      >Watch Now
    </button>`;
  }

  addHandlerUpdateBanner(handler) {
    if (!this._bannerSection) {
      return;
    }

    this._bannerSection.addEventListener('click', function (e) {
      const box = e.target.closest('.banner__recommend-container');

      if (!box) {
        return;
      }

      const movieID = box.dataset.id;
      return handler(movieID);
    });
  }

  addHandlerClick(handler) {
    if (!this._parentElement) {
      return;
    }

    this._parentElement.addEventListener('click', function (e) {
      const box = e.target.closest('.banner__btn');

      if (!box) {
        return;
      }

      const movieID = box.dataset.id;
      return handler(movieID);
    });
  }
}

export default new BannerBoxView();
