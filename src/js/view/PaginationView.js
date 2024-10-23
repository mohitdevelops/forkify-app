import View from './View';
import svgIcons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    console.log(numPage);

    //on page 1 with other pages
    if (this._data.page === 1 && numPage > 1) {
      return 'on page 1';
    }

    //on last page
    if (this._data.page === numPage && numPage > 1) {
      return 'last';
    }

    //on other page
    if (this._data.page < numPage) {
      return 'other';
    }

    //only on page 1
    return 'only on 1';
  }
}

export default new PaginationView();
