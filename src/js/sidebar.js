import { fetchGenreList } from './helpers';

export const state = {
  list: {
    genres: [],
  },
};

export const loadGenreList = async function () {
  try {
    const data = await fetchGenreList();

    const genreList = data.genres;

    state.list.genres = genreList.map(gen => {
      return {
        id: gen.id,
        genre: gen.name,
      };
    });
  } catch (err) {
    throw err;
  }
};

const sidebar = document.getElementById('sidebar-list-genre');
export const renderGenreList = async function () {
  try {
    const markup = state.list.genres
      .map(el => {
        return `<li class="sidebar__item">
          <a href="./results-list.html" class="sidebar__link">${el.genre}</a>
          </li>`;
      })
      .join('');

    sidebar.innerHTML = '';
    sidebar.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    throw err;
  }
};
