import * as model from './model';
import bookMarksView from './view/bookMarksView';
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

    ResultView.update(model.getSearchResults());
    bookMarksView.update(model.state.bookmarks)

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

const controlPagination = page => {
  //1. render new result with pagination
  ResultView.render(model.getSearchResults(page));

  //2. render new pagination button
  PaginationView.render(model.state.search);
};

const handleControlServings = function (newServings) {
  model.handleUpdateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const bookmarkHandler = function () {
  //Add Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookMarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRenderRecipe(recipeController);
  recipeView.addServings(handleControlServings);
  recipeView.addBookmarkHandler(bookmarkHandler);
  searchView.searchHandler(searchControlHandler);
  PaginationView.handlePaginationClick(controlPagination);
};

init();
