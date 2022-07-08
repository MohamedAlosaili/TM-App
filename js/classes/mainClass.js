import { POSTER_URL, BACKDROP_URL } from "../config.js";

export default class MainClass {
  _mainPage = document.querySelector("[data-main-page]");
  pageName = "home";
  pageNum = 1;
  watchlistBtns;

  renderLoader(parent = this._mainPage) {
    parent.innerHTML = `
    <div class="layer"></div>
    <div class="loading-spinner active">
        <span class="load-out"></span>
        <span class="load-in"></span>
    </div>
    `;
  }

  _getHomeHeaderSection(arrOfMovies) {
    const result = arrOfMovies.results[0];
    return `
        <article class="header-section">
            <figure class="header-backdrop-img">
                <img src="${BACKDROP_URL}${result.backdrop_path}" alt="'${
      result.title ?? result.original_title
    }' backdrop">
            </figure>
            <div class="movie-content container">
            <figure class="poster-img">
               ${
                 result.poster_path
                   ? `
               <img src="${POSTER_URL}${result.poster_path}" alt="'${
                       result.title ?? result.original_title
                     }' poster">
                   `
                   : `<div class="no-img">
                   <i class="icon fa-solid fa-file-image"></i>
                   Image Not <br> Available
               </div>`
               }
            </figure>
            <section class="post-info">
                <h2 class="post-title">${
                  result.title ?? result.original_title
                }</h2>
                <div class="rate">
                    <i class="icon fa-solid fa-star"></i>
                    <span class="rate-num">${
                      result.vote_average
                    }<span> / 10</span></span>
                    <span class="people-rated">${
                      result.vote_count
                    } voters</span>
                </div>
                <div class="button">
                    <button class="btn more-btn">More info</button>
                    <button class="btn watchlist-btn" id="header-btn" data-watchlist-btn>Add to watchlist</button>
                </div>
            </section>
            </div>
            <button class="explore-btn">
                <a href="#first-section" class="arrow-link"><i class="fa-solid fa-angles-down"></i></a>
            </button>
    </article>
    `;
  }

  _getSectionCards(arrOfMovies) {
    const cardContainer = document.createElement("div");

    arrOfMovies.results.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.innerHTML = `
            <figure class="card-poster">
                ${
                  card.poster_path
                    ? `<img src="${POSTER_URL}${card.poster_path}"
                alt="'${card.title ?? card.original_title}' poster">`
                    : `<div class="no-img">
                <i class="icon fa-solid fa-file-image"></i>
                Image Not <br> Available
            </div>`
                }
                <figcaption class="card-title">${
                  card.title ?? card.original_title
                }</figcaption>
            </figure>
            <button class="watchlist-btn btn" data-watchlist-btn title="Add to watchlist"><i
                    class="fa-solid fa-plus"></i></button>
        `;

      cardContainer.append(cardEl);
    });
    const cards = cardContainer.innerHTML;
    return cards;
  }

  _getGenerList(genres) {
    const generList = document.createElement("ul");

    genres.genres.forEach((genre) => {
      const genreItem = document.createElement("li");
      genreItem.className = "genre-item btn";
      genreItem.id = genre.id;
      genreItem.innerHTML = genre.name;

      generList.append(genreItem);
    });
    const genreItems = generList.innerHTML;
    return genreItems;
  }

  _watchlistBtnListener() {
    this.watchlistBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.id === "header-btn") {
          if (btn.classList.contains("active"))
            btn.innerHTML = "Add to watchlist";
          else btn.innerHTML = "Added to watchlist";

          btn.classList.toggle("active");

          return;
        }
        if (btn.classList.contains("active"))
          btn.children[0].className = "fa-solid fa-plus";
        else btn.children[0].className = "fa-solid fa-check";

        btn.classList.toggle("active");
      });
    });
  }
}
