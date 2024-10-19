import svgIcons from '../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    return (this._parentElement.innerHTML = '');
  }

  loader = () => {
    const domMarkup = `<div class="spinner">
              <svg>
                <use href="${svgIcons}#icon-loader"></use>
              </svg>
            </div>`;
    this._parentElement.innerHML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', domMarkup);
  };

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${svgIcons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
