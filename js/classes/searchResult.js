import { dataObj } from "../app.js";
import MainClass from "./mainClass.js";

class SearchResult extends MainClass {
  rendermainPageElement(query) {
    this.$mainPage.innerHTML = `
        <section class="search-result">
        <div class="container flex-column">
            <h2 class="section-title"><span>Result of:</span> ${query}</h2>
            <div class="flex-column">
                <section>
                  <h3 class="section-title">Movies / TV</h3>
                  <div class="cards-container grid">
                  ${
                    this.getSectionCards(dataObj.searchResults.movies) ||
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
                </section>
                <section>
                  <h3 class="section-title">People</h3>
                  <div class="cards-container grid">
                  ${
                    this.getCastCards(dataObj.searchResults.person, false) ||
                    `
                      <div class="no-content">
                        <i class="icon empty-cards"></i>
                        <p class="text">
                        There are no people matched <span class="movie-name">${query}
                        </span>. <button class="btn" data-back-home>Home</button>
                        </p>
                      </div>
                      `
                  }
                  </div>
                </section>
            </div>
        </div>
    </section>
            `;
  }
}

export default new SearchResult();
