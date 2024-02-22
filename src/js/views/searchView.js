import View from './View.js';

class SearchView extends View {
  _form = document.getElementById('search-form');

  addHandlerSearchValue(handler) {
    this._form.addEventListener('submit', function (event) {
      event.preventDefault();

      const inputValue = document.getElementById('search-box').value;
      return handler(inputValue);
    });
  }
}

export default new SearchView();
