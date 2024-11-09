import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: 10,
  },
  bookmarks: [],
};

export const loadRecipe = async recipeId => {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === recipeId)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchRecipeHandler = async search => {
  try {
    state.search.query = search;
    const data = await getJSON(`${API_URL}?search=${search}`);
    state.search.result = data.data.recipes.map(item => {
      return {
        id: item.id,
        title: item.title,
        image: item.image_url,
        publisher: item.publisher,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * +state.search.resultPerPage;
  const end = page * +state.search.resultPerPage;

  return state.search.result.slice(start, end);
};

export const handleUpdateServings = newServing => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

export const addBookmark = recipes => {
  state.bookmarks.push(recipes);

  if (recipes.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const removeBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
