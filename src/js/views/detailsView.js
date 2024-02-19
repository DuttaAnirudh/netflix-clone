import star from 'url:../../assets/star.png';
import videoBg from 'url:../../assets/video-bg-icon.png';
import { API_URL_BASE_IMAGE } from '../config.js';

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

export const renderMovieDetails = function (movie) {
  const parentElement = document.getElementById('section-movie-details');
  const vidElement = document.querySelectorAll('.trailer__card');

  if (!parentElement || !vidElement) {
    return;
  }

  const markupTrailer = movie.videosKeys
    .map(key => {
      return `<div class="trailer__card">
    <iframe width="450" height="250" src="https://www.youtube.com/embed/${key}?enablejsapi=1&theme=dark&color=white&rel=0"
  frameborder="0" allowfullscreen="1" ></iframe>
  </div>`;
    })
    .join('');

  const markup = `<figure class="movie__poster">
  <img
    src="${API_URL_BASE_IMAGE}${movie.topLevelDetails[0].posterImg}"
    alt="movie poster"
    class="movie__img"
  />
</figure>

<div class="movie__content">
  <div class="movie__info mb-4">
    <h2 class="heading-primary">${movie.topLevelDetails[0].title}</h2>

    <div class="movie__stats">
      <div class="movie__rating">
      <img
      src="${star}"
      alt="star"
      class="recommend__rating-star"
    />
        <p class="paragraph">${movie.topLevelDetails[0].rating.toFixed(1)}</p>
      </div>
      <p class="paragraph">${movie.topLevelDetails[0].runtime}m</p>
      <p class="paragraph">${movie.topLevelDetails[0].year.split('-')[0]}</p>
      <p class="paragraph paragraph--light">PG-13</p>
    </div>

    <p class="paragraph">${movie.topLevelDetails[0].genreID.join(', ')}</p>

    <p class="paragraph paragraph--light">
    ${movie.topLevelDetails[0].overview}
    </p>

    <div class="movie__cast">
      <p class="paragraph">Starring</p>
      <p class="paragraph paragraph--light">
        ${movie.actors.join(', ')}
      </p>
    </div>

    <div class="movie__cast">
      <p class="paragraph">Directed By</p>
      <p class="paragraph paragraph--light">${movie.director}</p>
    </div>
  </div>


  <div class="section-trailer">
    <div class="trailer mb-4">
      <h2 class="heading-secondary mb-2">Trailers and Clips</h2>
      <div class="trailer-row slider-box" id="videos-row">
        ${markupTrailer}
      </div>
    </div>
  </div>
</div>`;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};