import { dataObj } from "../app.js";
import { controlChangePages, getSearchResult } from "../functions.js";

class Navbar {
  _navbar = document.querySelector(".nav-bar");
  _navLinks = document.querySelectorAll("[data-page]");
  _searchFrom = document.querySelector("[data-search-form]");
  _mobileMenuToggler = document.querySelector("[data-mobile-toggler]");
  _mobileMenu = document.querySelector("[data-mobile-menu]");
  _footerYear = document.querySelector("[data-copyright-year]");

  callClassFunctions() {
    this._navLinksListener();
    this._searchFromListener();
    this._mobileMenuListener();
    this._setFooterYear();
  }

  _navLinksListener() {
    this._navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Deal with links
        this._navLinks.forEach((link) => link.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this._mobileMenuState("remove", "visible");

        // Deal with pages
        const pageName = link.dataset.page;
        console.log(pageName);
        controlChangePages(pageName);
      });
    });
  }

  updateNavLinks() {
    this._navLinks.forEach((link) => {
      if (link.dataset.page === dataObj.pageName) link.classList.add("active");
      else link.classList.remove("active");
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

  _mobileMenuListener() {
    this._mobileMenuToggler.addEventListener("click", (e) => {
      if (this._mobileMenu.classList.contains("active"))
        this._mobileMenuState("remove", "visible");
      else this._mobileMenuState("add", "hidden");
    });
  }

  _mobileMenuState(classType, overflow) {
    this._mobileMenuToggler.classList[classType]("active");
    this._mobileMenu.classList[classType]("active");
    this._navbar.classList[classType]("active");
    document.body.style.overflowY = overflow;
  }

  _setFooterYear() {
    this._footerYear.innerHTML = new Date().getFullYear();
  }
}

export default new Navbar();
