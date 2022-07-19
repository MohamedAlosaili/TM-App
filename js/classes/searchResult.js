import MainClass from "./mainClass.js";

class SearchResult extends MainClass {
  rendermainPageElement(resultCards, query) {
    this._mainPage.innerHTML = `
        <section class="search-result">
        <div class="container">
            <h2 class="section-title"><span>Result of:</span> ${query}</h2>
            <div class="card-container grid">
                ${
                  this._getSectionCards(resultCards) ||
                  `<div class="empty-cards">
                        <h3 class="empty-title">There are no Movies/Tv that matched <span class="underline active">${query}</span>, <br> Back to <a href="#" data-back-home>Home</a> page<h3>
                    </div>`
                }
            </div>
        </div>
    </section>
            `;
  }
}

export default new SearchResult();
