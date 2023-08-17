import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Renders the input object to the screen
   * @param {Object | Object[]} data Takes an object or array as an input e.g a recipe object
   * @returns {undefined}
   */
  render(data) {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      data.results?.length === 0
    )
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Clears inner HTML of the parent element
   * @param {} data Doesn't take any parameters
   * @returns {undefined}
   */
  _clear() {
    this._parentElement.innerHTML = ``;
  }

  /**
   * Renders a loading spinner on the parent element
   * @param {} data Doesn't take any parameters
   * @returns {undefined}
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> -->
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders an error message on the parent element
   * @param {string} message Takes a string as input
   * @returns {undefined}
   */
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a success message on the parent element
   * @param {string} message Takes a string as input
   * @returns {undefined}
   */
  renderSuccess(message = this._message) {
    const markup = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${this._message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
