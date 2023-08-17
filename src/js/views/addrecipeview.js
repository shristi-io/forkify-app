import icons from "url:../../img/icons.svg";
import View from "./view.js";
import { mark } from "regenerator-runtime";
import { MODAL_CLEAR_FORM } from "../config.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = `Recipe was successfully uploaded :)`;

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _additionalIngredient = 7;

  constructor() {
    super();
    this.addHandleShowWindow();
    this.addHandleHideWindow();
    this.addHandleAddMore();
  }

  addHandleShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandleHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandleAddMore() {
    document
      .querySelector(".add-ingredients__btn")
      .addEventListener("click", this._addMoreIngredient.bind(this));
  }

  addHandleUpload(callback) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      callback(data);
    });
  }

  _addMoreIngredient(e) {
    e.preventDefault();
    const markup = `
    <div class="ingredient__input">
            <label>Ingredient ${this._additionalIngredient}</label>
            <input
              type="text"
              name="ingredient-${this._additionalIngredient}-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-${this._additionalIngredient}-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-${this._additionalIngredient}-description"
              type="text"
              placeholder="Description"
            />
          </div>
    `;
    document
      .querySelector(".upload__column--second")
      .insertAdjacentHTML("beforeend", markup);
    document
      .querySelector(".upload__column--first")
      .insertAdjacentHTML("beforeend", "<div>.</div>");
    this._additionalIngredient++;
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
    if (this._window.classList.contains("hidden")) {
      setTimeout(() => {
        this._clearForm();
      }, MODAL_CLEAR_FORM * 1000);
    }
  }

  _clearForm() {
    const markup = `
    <div class="upload__column upload__column--first">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST123" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST123" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST123" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST123" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column upload__column--second">
          <h3 class="upload__heading">Ingredients</h3>
          <div class="ingredient__input">
            <label>Ingredient 1</label>
            <input
              type="text"
              required
              name="ingredient-1-quantity"
              placeholder="Quantity"
            />
            <input
              name="ingredient-1-unit"
              required
              type="text"
              placeholder="Unit"
            />
            <input
              name="ingredient-1-description"
              required
              type="text"
              placeholder="Description"
            />
          </div>

          <div class="ingredient__input">
            <label>Ingredient 2</label>
            <input
              type="text"
              name="ingredient-2-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-2-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-2-description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div class="ingredient__input">
            <label>Ingredient 3</label>
            <input
              type="text"
              name="ingredient-3-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-3-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-3-description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div class="ingredient__input">
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-4-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-4-description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div class="ingredient__input">
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-5-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-5-description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div class="ingredient__input">
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6-quantity"
              placeholder="Quantity"
            />
            <input name="ingredient-6-unit" type="text" placeholder="Unit" />
            <input
              name="ingredient-6-description"
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
        .
        <button type="button" class="btn add-ingredients__btn">Add more ingredients</button>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
    this._parentElement.innerHTML = markup;
    this.addHandleAddMore();
    this._additionalIngredient = 7;
  }
}

export default new AddRecipeView();
