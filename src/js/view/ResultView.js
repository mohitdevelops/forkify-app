import View from './View';
import svgIcons from '../../img/icons.svg';
import previewVIew from './previewVIew';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again :)';

  _generateMarkup() {
    return this._data.map(result => previewVIew.render(result, false)).join('');
  }
}

export default new ResultView();
