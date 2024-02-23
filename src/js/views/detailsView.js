import View from './View.js';
import star from 'url:../../assets/star.png';
import { API_URL_BASE_IMAGE } from '../config.js';

class DetailsView extends View {
  _parentElement = document.getElementById('main');
  _vidElement = document.querySelectorAll('.trailer__card');

  _generateMarkupTrailer() {
    return this._data.videosKeys
      .map(key => {
        return `<div class="trailer__card">
    <iframe width="450" height="250" src="https://www.youtube.com/embed/${key}?enablejsapi=1&theme=dark&color=white&rel=0"
  frameborder="0" allowfullscreen="1" ></iframe>
  </div>`;
      })
      .join('');
  }

  _generateMarkupDetails() {
    return `<figure class="movie__poster">
        <img
          src="${API_URL_BASE_IMAGE}${this._data.topLevelDetails[0].posterImg}"
          alt="movie poster"
          class="movie__img"
        />
        </figure>
          
        <div class="movie__content">
        <div class="movie__info mb-4">
          <h2 class="heading-primary">${
            this._data.topLevelDetails[0].title
          }</h2>
          
          <div class="movie__stats">
            <div class="movie__rating">
            <img
            src="${star}"
            alt="star"
            class="recommend__rating-star"
          />
              <p class="paragraph">${this._data.topLevelDetails[0].rating.toFixed(
                1
              )}</p>
            </div>
            <p class="paragraph">${this._data.topLevelDetails[0].runtime}m</p>
            <p class="paragraph">${
              this._data.topLevelDetails[0].year.split('-')[0]
            }</p>
            <p class="paragraph paragraph--light">PG-13</p>
          </div>
          
          <p class="paragraph">${this._data.topLevelDetails[0].genreID.join(
            ', '
          )}</p>
          
          <p class="paragraph paragraph--light">
          ${this._data.topLevelDetails[0].overview}
          </p>
          
          <div class="movie__cast">
            <p class="paragraph">Starring</p>
            <p class="paragraph paragraph--light">
              ${this._data.actors.join(', ')}
            </p>
          </div>
          
          <div class="movie__cast">
            <p class="paragraph">Directed By</p>
            <p class="paragraph paragraph--light">${this._data.director}</p>
          </div>
        </div>
          
          
        <div class="section-trailer">
            <h2 class="heading-secondary mb-2">Trailers and Clips</h2>
            <div class="trailer-row slider-box" id="videos-row">
              ${this._generateMarkupTrailer()}
        </div>
        </div>
        </div>`;
  }

  _generateMarkupSimilarMoviesList() {
    return this._data.similarMovies
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
  }

  _generateMarkup() {
    return `<section
    class="section-movie-details mb-4"> 
    ${this._generateMarkupDetails()}
  </section>
  <section
    class="section-details-list grid-list mb-4">
    ${this._generateMarkupSimilarMoviesList()}
  </section>`;
  }

  addHandlerClick(handler) {
    const parentElement = document.getElementById('main');
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
}

export default new DetailsView();
