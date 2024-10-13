import * as model from './model';
import recipeView from './view/recipe-view';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, recipeController)
);
