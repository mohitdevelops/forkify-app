export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message} (${response.status})`);
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
  console.log(state.recipe);
};
