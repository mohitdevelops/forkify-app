import View from './View';
import previewVIew from './previewVIew';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewVIew.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
