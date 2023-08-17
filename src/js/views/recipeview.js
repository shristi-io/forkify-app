import icons from "url:../../img/icons.svg"; // In parcel 2, we need to mention "url:" infront of the source path
import { Fraction } from "fractional";
import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = `An error occured while loading the recipe! Please try later.`;
  _message = `Recipe successfully loaded`;

  addHandleRender(callback) {
    const events = [`hashchange`, `load`];
    events.forEach((ev) => window.addEventListener(ev, callback));
  }

  addHandleServings(callback) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const updateTo = Number(btn.dataset.updateTo);
      if (updateTo > 0) callback(updateTo);
    });
  }

  addHandleBookmark(callback) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      callback();
      const bookmarkIcon = btn.querySelector("use");

      if (bookmarkIcon.dataset.bookmark == "false") {
        bookmarkIcon.setAttribute("href", `${icons}#icon-bookmark-fill`);
        bookmarkIcon.dataset.bookmark = "true";
        return;
      }
      if (bookmarkIcon.dataset.bookmark == "true") {
        bookmarkIcon.setAttribute("href", `${icons}#icon-bookmark`);
        bookmarkIcon.dataset.bookmark = "false";
      }
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        ${this._generateButtons()};
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use data-bookmark="${
          this._data.bookmark
        }" href="${icons}#icon-bookmark${
      this._data.bookmark ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
        ${this._generateIngredients()}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;
  }

  _generateIngredients() {
    return this._data.ingredients.reduce((accu, ingredient) => {
      return `
          ${accu}

          <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
          `;
    }, "");
  }

  _generateButtons() {
    return `
    <button class="btn--tiny btn--update-servings" data-update-to="${
      this._data.servings - 1
    }">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--update-servings" data-update-to="${
      this._data.servings + 1
    }">
      <svg>
        <use href="${icons}#icon-plus-circle"></use>
      </svg>
    </button>
    `;
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateIngredients();
    document.querySelector(".recipe__ingredient-list").innerHTML = markup;
    const buttonMarkup = this._generateButtons();
    document.querySelector(".recipe__info-buttons").innerHTML = buttonMarkup;
    document.querySelector(".recipe__info-data--people").textContent =
      data.servings;
  }
}

export default new RecipeView();
