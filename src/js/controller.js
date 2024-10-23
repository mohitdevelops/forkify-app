import * as model from './model';
import PaginationView from './view/PaginationView';
import recipeView from './view/recipe-view';
import ResultView from './view/ResultView';
import searchView from './view/search-view';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const recipeController = async () => {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    recipeView.loader();
    // 1. Loading Data
    await model.loadRecipe(recipeId);

    // 2.Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const searchControlHandler = async () => {
  try {
    ResultView.loader();
    //Get
    const query = searchView.getQuery();
    if (!query) return;

    //Load
    await model.loadSearchRecipeHandler(query);

    //Render

    ResultView.render(model.getSearchResults());

    //Pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRenderRecipe(recipeController);
  searchView.searchHandler(searchControlHandler);
};

init();
