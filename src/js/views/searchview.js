class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector(".search__field").value = "";
  }

  addHandleSearch(callbackFunc) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      callbackFunc();
    });
  }
}

export default new SearchView();
