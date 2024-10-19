import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
  },
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
  } catch (err) {}
};
