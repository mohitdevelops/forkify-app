import View from './View';
import svgIcons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShow();
    this._addHandlerClose();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShow() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerClose() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));

    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  uploadRecipeHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  //   _generateMarkup() {}
}

export default new AddRecipeView();
