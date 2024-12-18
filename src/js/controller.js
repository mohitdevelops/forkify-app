import * as model from './model';
import bookMarksView from './view/bookMarksView';
import PaginationView from './view/PaginationView';
import recipeView from './view/recipe-view';
import ResultView from './view/ResultView';
import searchView from './view/search-view';
import addRecipeView from './view/addRecipeView';

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
    // 1. Updateing bookmarks
    bookMarksView.update(model.state.bookmarks);

    // 2. Loading Data
    await model.loadRecipe(recipeId);

    ResultView.update(model.getSearchResults());

    // 3.Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderMessage();
    console.error(err);
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

  bookMarksView.render(model.state.bookmarks);
  //Render Bookmarks
};

const controlBookmars = () => {
  bookMarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    //loader
    addRecipeView.loader();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Succes Message
    addRecipeView.renderMessage();

    //Render Bookmar
    bookMarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookMarksView.addHandlerRender(controlBookmars);
  recipeView.addHandlerRenderRecipe(recipeController);
  recipeView.addServings(handleControlServings);
  recipeView.addBookmarkHandler(bookmarkHandler);
  searchView.searchHandler(searchControlHandler);
  PaginationView.handlePaginationClick(controlPagination);
  addRecipeView.uploadRecipeHandler(controlUploadRecipe);
};

init();
