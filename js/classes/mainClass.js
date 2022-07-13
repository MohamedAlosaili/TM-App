import { POSTER_URL, BACKDROP_URL } from "../config.js";
import { checkTheWatchlist } from "../functions.js";

export default class MainClass {
  _mainPage = document.querySelector("[data-main-page]");
  _layer = document.querySelector("[data-layer]");
  pageName = "home";
  watchlistBtns;

  renderLoader(parent = this._mainPage, layer = true) {
    parent.innerHTML = `
    <div class="loading-spinner">
        <span class="load-out"></span>
        <span class="load-in"></span>
    </div>
    ${layer ? `<div class="layer active"></div>` : ""}
    `;
  }
  renderLayer(type) {
    this._layer.classList[type]("active");
  }

  mainPageListener(handler) {
    this._mainPage.addEventListener("click", handler);
  }

  _getHomeHeaderSection(arrOfMovies, type = null) {
    const result = arrOfMovies.results[0];
    return `
        <article class="header-section">
            <figure class="header-backdrop-img">
                <img src="${BACKDROP_URL}${result.backdrop_path}" alt="'${
      result.title ??
      result.original_title ??
      result.name ??
      result.original_name
    }' backdrop">
            </figure>
            <div class="movie-content container" data-poster-parent>
            <figure class="poster-img">
               ${
                 result.poster_path
                   ? `
               <img src="${POSTER_URL}${
                       result.poster_path
                     }" data-poster alt="'${
                       result.title ??
                       result.original_title ??
                       result.name ??
                       result.original_name
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
                  result.title ??
                  result.original_title ??
                  result.name ??
                  result.original_name
                }</h2>
                <div class="rate">
                    <i class="icon fa-solid fa-star"></i>
                    <span class="rate-num">${result.vote_average.toFixed(
                      1
                    )}<span> / 10</span></span>
                    <span class="people-rated">${
                      result.vote_count
                    } voters</span>
                </div>
                <div class="button">
                    <button class="btn more-btn" id="${
                      result.id
                    }" data-expand-card data-type="${
      type ?? result.media_type
    }">More info</button>
                    ${
                      checkTheWatchlist(result.id)
                        ? `<button class="btn watchlist-btn active" id="${
                            result.id
                          }" data-watchlist-btn="header" data-type="${
                            type ?? result.media_type
                          }">Added to watchlist</button>`
                        : `<button class="btn watchlist-btn" id="${
                            result.id
                          }" data-watchlist-btn="header" data-type="${
                            type ?? result.media_type
                          }">Add to watchlist</button>`
                    }
                </div>
            </section>
            </div>
            <button class="explore-btn">
                <a href="#first-section" class="arrow-link"><i class="fa-solid fa-angles-down"></i></a>
            </button>
    </article>
    `;
  }

  _getSectionCards(arrOfCards, type = null) {
    const cardContainer = document.createElement("div");

    if (!arrOfCards || arrOfCards.length === 0) {
      return false;
    }

    arrOfCards.results.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.dataset.posterParent = "";

      cardEl.innerHTML = `
            <button class="expand-btn" id="${card.id}" title="${
        card.title ?? card.original_title ?? card.name ?? card.original_name
      }" data-expand-card data-type="${type ?? card.media_type}">
            <p class="text">Expand</p>
      </button>
            <figure class="card-poster">
                ${
                  card.poster_path || card.profile_path
                    ? `<img src="${POSTER_URL}${
                        card.poster_path ?? card.profile_path
                      }"
                        alt="'${
                          card.title ??
                          card.original_title ??
                          card.name ??
                          card.original_name
                        }' poster" loading="lazy" data-poster>`
                    : `<div class="no-img">
                        <i class="icon fa-solid fa-file-image"></i>
                        Image Not <br> Available
                    </div>`
                }
                <figcaption class="card-title">${
                  card.title ??
                  card.original_title ??
                  card.name ??
                  card.original_name
                }</figcaption>
            </figure>
            ${
              checkTheWatchlist(card.id)
                ? `<button class="watchlist-btn btn active" id="${
                    card.id
                  }" data-watchlist-btn title="Remove from watchlist"  data-type="${
                    type ?? card.media_type
                  }"><i
                      class="fa-solid fa-check"></i></button>`
                : `<button class="watchlist-btn btn" id="${
                    card.id
                  }" data-watchlist-btn title="Add to watchlist" data-type="${
                    type ?? card.media_type
                  }"><i
                      class="fa-solid fa-plus"></i></button>`
            }
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
}
