import View from './View.js';
import { API_URL_BASE_IMAGE } from '../config.js';

class BannerSliderView extends View {
  _parentElement = document.getElementById('banner-row-list');
  _parentSection = document.getElementById('section-hero');
  _generateMarkup() {
    return this._data
      .map(movie => {
        const parentID = this._parentSection.dataset.id;
        return `<div class="banner__recommend-container ${
          +parentID === movie.id ? 'active' : ''
        } " data-id="${movie.id}">
      <img
        src="${API_URL_BASE_IMAGE}${movie.posterImg}"
        alt="${movie.title} poster"
        class="recommend__img"
      />
    </div>`;
      })
      .join('');
  }
}

export default new BannerSliderView();
