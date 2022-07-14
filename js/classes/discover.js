import MainClass from "./mainClass.js";
import { getNewDiscoverPageCards, getMoreCards } from "../functions.js";
import { dataObj } from "../app.js";

class Discover extends MainClass {
  pageName;
  filterBtn;
  genreList;
  cardContainer;
  discoverPage;
  navBtn;
  loadMoreBtn;

  rendermainPageElement(movieObj, generList) {
    this._mainPage.innerHTML = `
            ${this._getHomeHeaderSection(movieObj, dataObj.pageName)}
            <section class="discover-section" id="first-section">
                <div class="container flex-container-column">
                    <header class="discover-header flex-container-column">
                        <div class="top">
                            <h2 class="section-title">Discover in ${
                              dataObj.pageName === `movie`
                                ? `movies`
                                : `TV shows`
                            }</h2>
                            <div class="filter-wrap">
                                <button class="filter btn" data-filter>Filter <i class="icon fa-solid fa-filter"></i></button>
                            </div>
                            <ul class="genre-list" data-genre-list>
                               ${this._getGenerList(generList)}
                            </ul>
                        </div>
                        <nav class="section-nav">
                            <div class="nav-back" data-nav-back></div>
                            <button class="btn active" data-discover-page="popular">Popular</button>
                            <button class="btn" data-discover-page="trending">Trending</button>
                            <button class="btn" data-discover-page="top_rated">Top Rated</button>
                        </nav>
                    </header>
                    <div class="card-container grid popular" data-discover-container>
                        <div class="loading-spinner">
                          <span class="load-out"></span>
                          <span class="load-in"></span>
                        </div>    
                        ${this._getSectionCards(movieObj, dataObj.pageName)}
                    </div>
                    <button class="btn" data-load-more>Load More</button>
                </div>
            </section>
        `;

    this.filterBtn = this._mainPage.querySelector("[data-filter]");
    this.genreList = this._mainPage.querySelector("[data-genre-list]");
    this.navBtn = this._mainPage.querySelectorAll("[data-discover-page]");
    this.cardContainer = this._mainPage.querySelector(
      "[data-discover-container]"
    );
    this.loadMoreBtn = this._mainPage.querySelector("[data-load-more]");

    this._sectionNavListener();
    this._discoverFilterListener();
    this._loadMoreListener();
  }

  _sectionNavListener() {
    const navBack = document.querySelector("[data-nav-back]");

    this.navBtn.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        this.cardContainer.className = "card-container grid";
        const loader = document.createElement("div");
        loader.innerHTML = `
          <span class="load-out"></span>
          <span class="load-in"></span>
        `;
        this.cardContainer.append(loader);

        this.navBtn.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        this.discoverPage = btn.dataset.discoverPage;
        getNewDiscoverPageCards(this.discoverPage, dataObj.pageName);

        const parentWidth =
          parseInt(
            getComputedStyle(btn.parentElement).getPropertyValue("width")
          ) / 3;
        navBack.style.left = `${idx * parentWidth}px`;
      });
    });
  }

  _discoverFilterListener() {
    this.filterBtn.addEventListener("click", () => {
      this.genreList.classList.toggle("active");
    });
  }

  getNewDiscoverPage(pageData) {
    this.cardContainer.className = `card-container grid ${this.discoverPage}`;
    this.cardContainer.innerHTML = this._getSectionCards(
      pageData,
      dataObj.pageName
    );
  }

  _loadMoreListener() {
    this.loadMoreBtn.addEventListener("click", (e) => {
      this.renderLoader(e.currentTarget, false);

      getMoreCards();

      if (dataObj.pageNum === 500) e.currentTarget.remove();
    });
  }

  clearLoadMore() {
    this.loadMoreBtn.innerHTML = "Load More";
  }
}

export default new Discover();
