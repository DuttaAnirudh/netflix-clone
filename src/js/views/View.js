import spinner from 'url:../../assets/spinner.png';

export default class View {
  _data;

  render(data) {
    if (!this._parentElement) {
      return;
    }

    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    if (!this._parentElement) {
      return;
    }
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    if (!this._parentElement) {
      return;
    }

    const markup = `
    <div id="loader" class="nfLoader">
    <img src="${spinner}" class="nfLoader__img"
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
