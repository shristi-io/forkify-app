import icons from "url:../../img/icons.svg";
import View from "./view.js";
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
    // Reset all input fields
    this._parentElement.reset(); 
  
    // Optional: Remove any dynamically added ingredient fields beyond the default 6
    // ... logic to remove extra nodes ...
  
    this._additionalIngredient = 7;
  }
}

export default new AddRecipeView();
