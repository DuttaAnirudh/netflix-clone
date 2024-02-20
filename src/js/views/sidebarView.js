const parentElement = document.getElementById('sidebar-list-genre');
export const renderGenreList = async function (data) {
  try {
    const markup = data
      .map(el => {
        return `<li class="sidebar__item" data-genre="${el.genre.toLowerCase()}">
          <p class="sidebar__link">${el.genre}</p>
          </li>`;
      })
      .join('');

    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    throw err;
  }
};

export const addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

export const addHandlerClick = function (handler) {
  if (!parentElement) {
    return;
  }

  parentElement.addEventListener('click', function (e) {
    const box = e.target.closest('.sidebar__item');

    if (!box) {
      return;
    }

    const genreName = box.dataset.genre;
    return handler(genreName);
  });
};
