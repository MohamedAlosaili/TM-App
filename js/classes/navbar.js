import { controlChangePages, getSearchResult } from "../functions.js";

class Navbar {
  _navLinks = document.querySelectorAll("[data-page]");
  _searchFrom = document.querySelector("[data-search-form]");
  _footerYear = document.querySelector("[data-copyright-year]");

  callClassFunctions() {
    this._navLinksListener();
    this._searchFromListener();
    this._setFooterYear();
  }

  _navLinksListener() {
    this._navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Deal with the links
        this._navLinks.forEach((link) => link.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Deal with page
        const pageName = link.dataset.page;
        controlChangePages(pageName);
      });
    });
  }
  _searchFromListener() {
    const searchInput = document.querySelector("[data-search-input]");
    this._searchFrom.addEventListener("submit", (e) => {
      e.preventDefault();

      if (searchInput.value) {
        getSearchResult(searchInput.value);
      }
    });
  }

  _setFooterYear() {
    this._footerYear.innerHTML = new Date().getFullYear();
  }
}

export default new Navbar();
