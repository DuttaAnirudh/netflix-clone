import View from './View';

class SideBar extends View {
  _parentElement = document.getElementById('menu-list-genre');

  _generateMarkup() {
    return this._data
      .map(el => {
        return `<li class="menu__item" data-genre="${el.genre.toLowerCase()}">
          <p class="menu__link">${el.genre}</p>
          </li>`;
      })
      .join('');
  }

  addHandlerClick(handler) {
    if (!this._parentElement) {
      return;
    }

    this._parentElement.addEventListener('click', function (e) {
      const box = e.target.closest('.menu__item');

      if (!box) {
        return;
      }

      const genreName = box.dataset.genre;
      return handler(genreName);
    });
  }
}

export default new SideBar();
