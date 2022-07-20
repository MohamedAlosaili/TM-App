import MainClass from "./mainClass.js";

class SearchResult extends MainClass {
  rendermainPageElement(resultCards, query) {
    this.mainPage.innerHTML = `
        <section class="search-result">
        <div class="container">
            <h2 class="section-title"><span>Result of:</span> ${query}</h2>
            <div class="cards-container grid">
                ${
                  this._getSectionCards(resultCards) ||
                  `
                    <div class="no-content">
                      <i class="icon empty-cards"></i>
                      <p class="text">
                      There are no movies/tv shows matched <span class="movie-name">${query}
                      </span>. <button class="btn" data-back-home>Home</button>
                      </p>
                    </div>
                    `
                }
            </div>
        </div>
    </section>
            `;
  }
}

export default new SearchResult();
