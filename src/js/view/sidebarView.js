const parentElement = document.getElementById('sidebar-list-genre');
export const renderGenreList = async function (data) {
  try {
    const markup = data
      .map(el => {
        return `<li class="sidebar__item">
          <a href="./results-list.html" class="sidebar__link">${el.genre}</a>
          </li>`;
      })
      .join('');

    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    throw err;
  }
};
