import mainClass from "./mainClass.js";

class Home extends mainClass {
  pageName = "home";

  rendermainPageElement(homeObj) {
    const { trendDay, trendWeek, popularMovies, popularTV } = homeObj;

    this._mainPage.innerHTML = `
        ${this._getHomeHeaderSection(trendDay)}
        <div class="container home-page">
            <section class="section" id="first-section" data-popular-section>
                <h2 class="section-title">Today's Trend</h2>
                <div class="card-container">
                    ${this._getSectionCards(trendDay)}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">This week trend</h2>
                <div class="card-container">
                    ${this._getSectionCards(trendWeek)}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">Popular movies</h2>
                <div class="card-container">
                    ${this._getSectionCards(popularMovies)}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">Popular TV shows</h2>
                <div class="card-container">
                    ${this._getSectionCards(popularTV)}
                </div>
            </section>
        </div>    
    `;

    this.watchlistBtns = this._mainPage.querySelectorAll(
      "[data-watchlist-btn]"
    );
    this._watchlistBtnListener();
  }
}

export default new Home();
