import MainClass from "./mainClass.js";
import { getHomePage } from "../functions.js";
import { dataObj } from "../app.js";
import Navbar from "./navbar.js";

class Watchlist extends MainClass {
  rendermainPageElement(watchlistCards) {
    this.mainPage.innerHTML = `
        <section class="watchlist-page">
            <div class="container">
                <h2 class="section-title">WatchList<span class="icon"></span></h2> 
                <div class="cards-container grid">
                    ${
                      this._getSectionCards(watchlistCards) ||
                      `
                      <div class="no-content">
                        <i class="icon empty-cards"></i>
                        <p class="text">
                        Your watchlist is empty click <a href="#" data-back-home>HERE</a> and Discover more
                        </p>
                      </div>`
                    }
                </div>
            </div>
    </section>
        `;
  }
}

export default new Watchlist();
