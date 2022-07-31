import MainClass from "./mainClass.js";

class Watchlist extends MainClass {
  rendermainPageElement(watchlistCards) {
    this.$mainPage.innerHTML = `
        <section class="watchlist-page">
            <div class="container flex-column">
                <h2 class="section-title">WatchList<span class="icon"></span></h2> 
                <div class="cards-container wrap">
                    ${
                      this.getSectionCards(watchlistCards) ||
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
