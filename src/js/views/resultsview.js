import icons from "url:../../img/icons.svg";
import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No results found for that recipe name! Please try searching for a different recipe.`;
  _totalResultsElement = document.querySelector(".total__results");

  _generateMarkup() {
    return this._data.reduce((str, recipe) => {
      return `
        ${str}
        <li class="preview">
                <a href="#${recipe.id}" class="preview__link">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.title}</p>
                    <div class="recipe__user-generated ${
                      recipe.key ? "" : "hidden"
                    }">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
                </a>
            </li>
    `;
    }, "");
  }

  totalSearchResults(data) {
    const noOfResults = data.length;
    this._totalResultsElement.firstElementChild.textContent = `${noOfResults} results found`;
  }
}

export default new ResultsView();
