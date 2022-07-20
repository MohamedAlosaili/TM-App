import MainClass from "./mainClass.js";
import { getHomePage } from "../functions.js";
import { dataObj } from "../app.js";
import Navbar from "./navbar.js";

class Watchlist extends MainClass {
  rendermainPageElement(watchlistCards) {
    this._mainPage.innerHTML = `
        <section class="watchlist-page">
            <div class="container">
                <h2 class="section-title">WatchList<span class="icon"></span></h2> 
                <div class="cards-container grid">
                    ${
                      this._getSectionCards(watchlistCards) ||
                      `<div class="empty-cards">
                        <h3 class="empty-title">Your watchlist is empty click <a href="#" data-back-home>HERE</a> and Discover more<h3>
                    </div>`
                    }
                </div>
            </div>
    </section>
        `;
    this._backToHomePage();
  }
  _backToHomePage() {
    const backHome = document.querySelector("[data-back-home]");

    if (backHome) {
      backHome.addEventListener("click", () => {
        dataObj.pageName = "home";
        Navbar.updateNavLinks();
        getHomePage();
      });
    }
  }
}

export default new Watchlist();
