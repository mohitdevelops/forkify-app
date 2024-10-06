import svgIcons from '../../img/icons.svg';
import Fraction from 'fractional';

export class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#clear;
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  loader = () => {
    const domMarkup = `<div class="spinner">
            <svg>
              <use href="${svgIcons}#icon-loader"></use>
            </svg>
          </div>`;
    this.#parentElement.innerHML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', domMarkup);
  };

  _generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${svgIcons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${svgIcons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${svgIcons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${svgIcons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${svgIcons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${svgIcons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateIngredientList).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${svgIcons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  #generateIngredientList(item) {
    return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${svgIcons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          item.quantity ? new Fraction.Fraction(item.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${item.unit}</span>
          ${item.description}
        </div>
      </li>`;
  }
}

export default new RecipeView();
