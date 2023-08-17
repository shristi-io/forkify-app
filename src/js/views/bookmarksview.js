import icons from "url:../../img/icons.svg";
import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data.reduce((str, recipe) => {
      return `
        ${str}
        <li class="preview">
                <a href="#${recipe.id}" class="preview__link ${
        recipe.id === id ? `preview__link--active` : ""
      }">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.title}</p>
                </div>
                </a>
            </li>
    `;
    }, "");
  }

  addHandleRender(callback) {
    window.addEventListener("load", callback);
  }
}

export default new BookmarksView();
