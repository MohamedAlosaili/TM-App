import { dataObj } from "../app.js";
import {
  layerHandler,
  navLinksHandler,
  searchFromHandler,
  mobileMenuHandler,
} from "../handlerFunctions.js";
import { mainClass } from "../classes/mainClass.js";

class Navbar {
  $navbar = document.querySelector(".nav-bar");
  $navLinks = document.querySelectorAll("[data-page]");
  $searchFrom = document.querySelector("[data-search-form]");
  $searchInput = document.querySelector("[data-search-input]");
  $mobileMenuToggler = document.querySelector("[data-mobile-toggler]");
  $mobileMenu = document.querySelector("[data-mobile-menu]");
  $footerYear = document.querySelector("[data-copyright-year]");

  callClassFunctions() {
    this._navLinksListener();
    this._searchFromListener();
    this._mobileMenuListener();
    this._setFooterYear();
    mainClass.layerListener(layerHandler);
  }

  _navLinksListener() {
    this.$navLinks.forEach((link) => {
      link.addEventListener("click", navLinksHandler);
    });
  }

  updateNavLinks() {
    this.$navLinks.forEach((link) => {
      if (link.dataset.page === dataObj.pageName)
        link.classList.add("active", "shake");
      else link.classList.remove("active", "shake");
    });
  }

  _searchFromListener() {
    this.$searchFrom.addEventListener("submit", searchFromHandler);
  }

  _mobileMenuListener() {
    this.$mobileMenuToggler.addEventListener("click", mobileMenuHandler);
  }

  mobileMenuState(classType, position, toggler) {
    this.$mobileMenuToggler.className = `hamburger ${toggler}`;
    this.$mobileMenu.classList[classType]("active");
    this.$navbar.classList[classType]("active");
    mainClass.renderLayer(classType);
    document.body.style.position = position;
  }

  _setFooterYear() {
    this.$footerYear.innerHTML = new Date().getFullYear();
  }
}

export default new Navbar();
