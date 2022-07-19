import MainClass from "./mainClass.js";
import { dataObj } from "../app.js";
import { sectionNavHandler, loadMoreHandler } from "../handlerFunctions.js";

class Discover extends MainClass {
  pageName;
  filterBtn;
  genreList;
  cardContainer;
  discoverPage;
  discoverNav;
  loadMoreBtn;

  rendermainPageElement(movieObj, generList) {
    this._mainPage.innerHTML = `
            ${this._getHomeHeaderSection(movieObj, dataObj.pageName)}
            <section class="discover-section" id="${
              dataObj.pageName
            }/first_section">
                <div class="container flex-container-column">
                    <header class="discover-header flex-container-column">
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
                    <div class="card-container grid popular" data-discover-container>    
                        ${this._getSectionCards(movieObj, dataObj.pageName)}
                    </div>
                    <button class="btn" data-load-more>Load More</button>
                </div>
            </section>
        `;

    this.filterBtn = this._mainPage.querySelector("[data-filter]");
    this.genreList = this._mainPage.querySelector("[data-genre-list]");
    this.discoverNav = this._mainPage.querySelector("[data-discover-nav]");
    this.cardContainer = this._mainPage.querySelector(
      "[data-discover-container]"
    );
    this.loadMoreBtn = this._mainPage.querySelector("[data-load-more]");

    this._sectionNavListener();
    this.loadMoreListener();
  }

  _sectionNavListener() {
    this.discoverNav.addEventListener("click", sectionNavHandler);
  }

  getNewDiscoverPage(pageData) {
    this._sectionNavListener();
    this.cardContainer.className = `card-container grid ${this.discoverPage}`;
    this.cardContainer.innerHTML = this._getSectionCards(
      pageData,
      dataObj.pageName
    );
  }

  loadMoreListener() {
    this.loadMoreBtn.addEventListener("click", loadMoreHandler);
  }

  clearLoadMore() {
    this.loadMoreBtn.innerHTML = "Load More";
  }
}

export default new Discover();