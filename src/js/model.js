import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, FIRST_PAGE, KEY } from "./config";
import { getJSON, sendJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: FIRST_PAGE,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmark = true;
    } else state.recipe.bookmark = false;
  } catch (err) {
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = FIRST_PAGE) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmark = false;
  persistBookmarks();
};

export const uploadRecipe = async function (recipeData) {
  try {
    const filteredIngredients = Object.entries(recipeData).filter(
      (entry) => entry[0].startsWith(`ingredient`) && entry[1] !== ``
    );
    let ingredients = [];
    for (let i = 0; i < filteredIngredients.length; i += 3) {
      const quantity = filteredIngredients[i][1];
      const unit = filteredIngredients[i + 1][1];
      const description = filteredIngredients[i + 2][1];

      if (
        Number.isNaN(Number(quantity)) ||
        description.length === 0 ||
        unit.length === 0
      )
        throw new Error(
          "Invalid recipe input! Please enter ingredient details in valid format."
        );
      const recipeObject = {
        quantity: quantity ? +quantity : null,
        unit,
        description,
      };

      ingredients.push(recipeObject);
    }
    const recipe = {
      title: recipeData.title,
      source_url: recipeData.sourceUrl,
      image_url: recipeData.image,
      publisher: recipeData.publisher,
      cooking_time: +recipeData.cookingTime,
      servings: +recipeData.servings,
      ingredients,
    };

    const response = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(response);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
