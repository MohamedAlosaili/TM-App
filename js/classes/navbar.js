import { dataObj } from "../app.js";
import { controlChangePages } from "../functions.js";
import { layerHandler, searchFromHandler } from "../handlerFunctions.js";
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
    this._searchFromListener(searchFromHandler);
    this._mobileMenuListener();
    this._setFooterYear();
    mainClass.layerListener(layerHandler);
  }

  _navLinksListener() {
    this.$navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Deal with links
        this.$navLinks.forEach((link) =>
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
    this.$navLinks.forEach((link) => {
      if (link.dataset.page === dataObj.pageName)
        link.classList.add("active", "shake");
      else link.classList.remove("active", "shake");
    });
  }

  _searchFromListener(handler) {
    this.$searchFrom.addEventListener("submit", handler);
  }

  _mobileMenuListener() {
    this.$mobileMenuToggler.addEventListener("click", (e) => {
      if (this.$mobileMenu.classList.contains("active"))
        this.mobileMenuState("remove", "auto", "close");
      else this.mobileMenuState("add", "hidden", "open");
    });
  }

  mobileMenuState(classType, overflow, toggler) {
    this.$mobileMenuToggler.className = `hamburger ${toggler}`;
    this.$mobileMenu.classList[classType]("active");
    this.$navbar.classList[classType]("active");
    mainClass.renderLayer(classType);
    document.body.style.overflowY = overflow;
  }

  _setFooterYear() {
    this.$footerYear.innerHTML = new Date().getFullYear();
  }
}

export default new Navbar();
