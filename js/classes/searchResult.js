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
                        <h3 class="empty-title">There is no Movie/TV called <span>${query}</span>, <br> try another name or you can click <a href="#" data-back-home>HERE</a> and Discover more<h3>
                    </div>`
                }
            </div>
        </div>
    </section>
            `;
    // this._backToHomePage();
  }
}

export default new SearchResult();
