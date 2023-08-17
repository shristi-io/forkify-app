"use strict";

import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeview.js";
import searchView from "./views/searchview.js";
import resultsView from "./views/resultsview.js";
import paginationView from "./views/paginationview.js";
import bookmarksView from "./views/bookmarksview.js";
import addRecipeView from "./views/addrecipeview.js";
import { MODAL_CLOSE_TIME } from "./config.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import addrecipeview from "./views/addrecipeview.js";

const controlRecipe = async function () {
  try {
    // Getting the recipe id
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Rendering the spinner until the recipe loads
    recipeView.renderSpinner();

    // Loading the recipe
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);

    // Updating the bookmarks
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    console.error(err.message);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    resultsView.totalSearchResults(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmark) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  bookmarksView.render(model.state.bookmarks);
};

const controlStartBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();

    // Upload the recipe and load the state
    await model.uploadRecipe(data);

    // Display the recipe
    recipeView.render(model.state.recipe);

    // Display a success message on the modal window
    addRecipeView.renderSuccess();

    // Change the url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Render bookmark
    bookmarksView.render(model.state.bookmarks);

    // Hide the modal window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIME * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandleRender(controlStartBookmark);
  recipeView.addHandleRender(controlRecipe);
  searchView.addHandleSearch(controlSearch);
  recipeView.addHandleBookmark(controlBookmark);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandleServings(controlServing);
  addrecipeview.addHandleUpload(controlAddRecipe);
};

init();
