import MainClass from "./mainClass.js";
import { dataObj } from "../app.js";
import { sectionNavHandler, loadMoreHandler } from "../handlerFunctions.js";

class Discover extends MainClass {
  $discoverNav;
  $cardContainer;
  discoverPage;
  $loadMoreBtn;

  rendermainPageElement(movieObj) {
    this.$mainPage.innerHTML = `
            ${this.getHeaderSection(movieObj, dataObj.pageName)}
            <section class="discover-section" id="${
              dataObj.pageName
            }/first_section">
                <div class="container flex-column">
                    <header class="discover-header flex-column">
                        <h2 class="section-title">Discover in ${
                          dataObj.pageName === `movie` ? `movies` : `TV shows`
                        }</h2>
                        <nav class="section-nav" data-discover-nav>
                            <div class="nav-back" data-nav-back></div>
                            <button class="btn active" data-discover-page="popular" data-idx="0">Popular</button>
                            <button class="btn" data-discover-page="trending" data-idx="1">Trending</button>
                            <button class="btn" data-discover-page="top_rated" data-idx="2">Top Rated</button>
                        </nav>
                    </header>
                    <div class="cards-container wrap popular" data-discover-container>    
                        ${this.getSectionCards(
                          movieObj.results,
                          dataObj.pageName
                        )}
                    </div>
                    <button class="btn" data-load-more>Load More</button>
                </div>
            </section>
        `;

    this.$discoverNav = document.querySelector("[data-discover-nav]");
    this.$cardContainer = document.querySelector("[data-discover-container]");
    this.$loadMoreBtn = document.querySelector("[data-load-more]");

    this._sectionNavListener();
    this.loadMoreListener();
  }

  _sectionNavListener() {
    this.$discoverNav.addEventListener("click", sectionNavHandler);
  }

  getNewDiscoverPage(pageData) {
    this._sectionNavListener();

    setTimeout(
      () =>
        (this.$cardContainer.className = `cards-container wrap ${this.discoverPage}`),
      300
    );

    this.$cardContainer.innerHTML = this.getSectionCards(
      pageData.results,
      dataObj.pageName
    );
  }

  loadMoreListener() {
    this.$loadMoreBtn.addEventListener("click", loadMoreHandler);
  }

  clearLoadMore() {
    this.$loadMoreBtn.innerHTML = "Load More";
  }
}

export default new Discover();
