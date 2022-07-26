import { POSTER_URL, BACKDROP_URL } from "../config.js";
import { checkTheWatchlist } from "../functions.js";
import { dataObj } from "../app.js";

export default class MainClass {
  $mainPage = document.querySelector("[data-main-page]");
  $layer = document.querySelector("[data-layer]");

  renderLoader(parent = this.$mainPage, layer = true) {
    parent.innerHTML = `
    <div class="loading-spinner">
        <span class="load-out"></span>
        <span class="load-in"></span>
    </div>
    ${layer ? `<div class="layer active"></div>` : ""}
    `;
  }

  renderLayer(type, zIndex = 5) {
    this.$layer.classList[type]("active");
    this.$layer.style.zIndex = zIndex;
  }

  layerListener(handler) {
    this.$layer.addEventListener("click", handler);
  }

  mainPageListener(handler) {
    this.$mainPage.addEventListener("click", handler);
  }

  getHeaderSection(arrOfMovies, type = null) {
    const result = arrOfMovies.results[0];
    return `
        <article class="landing">
            <figure class="backdrop">
              ${
                !result.backdrop_path && !result.poster_path
                  ? ""
                  : result.backdrop_path
                  ? `<img src="${BACKDROP_URL + result.backdrop_path}" alt="'${
                      result.title ??
                      result.original_title ??
                      result.name ??
                      result.original_name
                    }' backdrop">
                `
                  : `
                <img src="${BACKDROP_URL + result.poster_path}" alt="'${
                      result.title ??
                      result.original_title ??
                      result.name ??
                      result.original_name
                    }' backdrop">
                `
              }
            </figure>
            <div class="container" data-poster-parent>
            <figure class="poster">
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
                <a href="#${
                  dataObj.pageName
                }/first_section" class="arrow-link"><i class="fa-solid fa-angles-down"></i></a>
            </button>
    </article>
    `;
  }

  getSectionCards(arrOfCards, type = null) {
    const cardContainer = document.createElement("div");

    if (!arrOfCards || arrOfCards.length === 0) {
      return false;
    }

    arrOfCards.forEach((card, idx) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.dataset.posterParent = "";
      cardEl.style.cssText = `--i: ${idx}`;
      cardEl.innerHTML = `
            <button class="expand-btn" id="${card.id}" title="${
        card.title ?? card.original_title ?? card.name ?? card.original_name
      }" data-expand-card data-type="${type ?? card.media_type}">
            <p class="text">Expand</p>
      </button>
            <figure class="poster">
                ${
                  card.poster_path || card.profile_path
                    ? card.poster_path.startsWith("http")
                      ? `<img src="${card.poster_path ?? card.profile_path}"
                      alt="'${
                        card.title ??
                        card.original_title ??
                        card.name ??
                        card.original_name
                      }' poster" loading="lazy" data-poster>`
                      : `<img src="${POSTER_URL}${
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
                <div class="wrapper">
                  <figcaption class="card-title">${
                    card.title ??
                    card.original_title ??
                    card.name ??
                    card.original_name
                  }</figcaption>
                  ${
                    card.character
                      ? `<p class="character">${card.character}</p>`
                      : ""
                  }
                </div>
            </figure>
            ${
              checkTheWatchlist(card.id)
                ? `<button class="watchlist-btn btn active" id="${
                    card.id
                  }" data-watchlist-btn title="Remove from watchlist"  data-type="${
                    type ?? card.media_type
                  }"><i
                      class="icon fa-solid fa-check"></i></button>`
                : `<button class="watchlist-btn btn" id="${
                    card.id
                  }" data-watchlist-btn title="Add to watchlist" data-type="${
                    type ?? card.media_type
                  }"><i
                      class="icon fa-solid fa-plus"></i></button>`
            }
        `;

      cardContainer.append(cardEl);
    });

    return cardContainer.innerHTML;
  }

  getCastCards(castArr, shirnk = true) {
    let lotOfCards = false;

    if (shirnk) {
      if (castArr.length === 0) {
        return `
        <div class="no-content">
        <i class="icon empty-cards"></i>
          <p class="text">
          There are no cast for <span class="movie-name">${
            dataObj.moviePage.movieObj.title ??
            dataObj.moviePage.movieObj.original_title ??
            dataObj.moviePage.movieObj.name ??
            dataObj.moviePage.movieObj.original_name
          }
          </p>
        </div>
        `;
      }
      dataObj.moviePage.cast = [...castArr];
      if (castArr.length > 10) {
        lotOfCards = true;
        castArr.length = 10;
      }
    }
    const castContainer = document.createElement("div");
    castArr.forEach((cast) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
            <figure class="cast-poster">
                ${
                  cast.profile_path
                    ? `<button class="expand" id="${cast.id}" data-expand-cast>
                          <img src="${POSTER_URL}${cast.profile_path}"
                          alt="${cast.name ?? original_name}" loading="lazy">
                       </button>`
                    : `
                    <button class="expand" id="${cast.id}" data-expand-cast>
                    <div class="no-img">
                        <i class="icon fa-solid fa-file-image"></i>
                        Image Not <br> Available
                    </div>
                    </button>
                    `
                }
                <button class="expand" id="${cast.id}" data-expand-cast>  
                <figcaption>${cast.name ?? cast.original_name}</figcaption>
                </button>
                ${
                  cast.character
                    ? `<p class="character">${cast.character}</p>`
                    : ""
                }
            </figure>
        `;
      castContainer.append(card);
    });
    if (lotOfCards) {
      const seeAllCards = document.createElement("div");
      seeAllCards.className = "more cast btn";
      seeAllCards.innerHTML = `
            <p class="wrapper" data-moreten-btn data-type="cast">
                All Cast
                <i class="icon fa-solid fa-chevron-right"></i>
            </p>
        `;

      castContainer.append(seeAllCards);
    }

    return castContainer.innerHTML;
  }
}

const mainClass = new MainClass();

export { mainClass };
