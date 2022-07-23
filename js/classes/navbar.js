import { dataObj } from "../app.js";
import { controlChangePages } from "../functions.js";
import { layerHandler, searchFromHandler } from "../handlerFunctions.js";
import { mainClass } from "../classes/mainClass.js";

class Navbar {
  _navbar = document.querySelector(".nav-bar");
  _navLinks = document.querySelectorAll("[data-page]");
  _searchFrom = document.querySelector("[data-search-form]");
  $searchInput = document.querySelector("[data-search-input]");
  _mobileMenuToggler = document.querySelector("[data-mobile-toggler]");
  _mobileMenu = document.querySelector("[data-mobile-menu]");
  _footerYear = document.querySelector("[data-copyright-year]");

  callClassFunctions() {
    this._navLinksListener();
    this._searchFromListener(searchFromHandler);
    this._mobileMenuListener();
    this._setFooterYear();
    mainClass.layerListener(layerHandler);
  }

  _navLinksListener() {
    this._navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Deal with links
        this._navLinks.forEach((link) =>
          link.classList.remove("active", "shake")
        );
        e.currentTarget.classList.add("active", "shake");
        this.mobileMenuState("remove", "auto", "close");

        // Deal with pages
        const pageName = link.dataset.page;
        controlChangePages(pageName);
      });
    });
  }

  updateNavLinks() {
    this._navLinks.forEach((link) => {
      if (link.dataset.page === dataObj.pageName)
        link.classList.add("active", "shake");
      else link.classList.remove("active", "shake");
    });
  }

  _searchFromListener(handler) {
    this._searchFrom.addEventListener("submit", handler);
  }

  _mobileMenuListener() {
    this._mobileMenuToggler.addEventListener("click", (e) => {
      if (this._mobileMenu.classList.contains("active"))
        this.mobileMenuState("remove", "auto", "close");
      else this.mobileMenuState("add", "hidden", "open");
    });
  }

  mobileMenuState(classType, overflow, toggler) {
    this._mobileMenuToggler.className = `hamburger ${toggler}`;
    this._mobileMenu.classList[classType]("active");
    this._navbar.classList[classType]("active");
    mainClass.renderLayer(classType);
    document.body.style.overflowY = overflow;
  }

  _setFooterYear() {
    this._footerYear.innerHTML = new Date().getFullYear();
  }
}

export default new Navbar();
