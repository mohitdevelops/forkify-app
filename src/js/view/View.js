import svgIcons from '../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length <= 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', domMarkup);
  };

  update(data) {
    // if (!data || (Array.isArray(data) && data.length <= 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); //isEqualNode compare the newEl with the curEl

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

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
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${svgIcons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
