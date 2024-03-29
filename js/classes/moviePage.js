import MainClass from "./mainClass.js";
import { BACKDROP_URL, POSTER_URL, VIDEO_URL } from "../config.js";
import { checkTheWatchlist } from "../functions.js";
import { dataObj } from "../app.js";
import { moviePageHandler, movieNavHandler } from "../handlerFunctions.js";

class MoviePage extends MainClass {
  $movieHeader;
  $trailerContainer;
  $trailerVideo;
  trailerUrl;
  $cardContainer;
  $navBtns;

  rendermainPageElement(movieObj, type) {
    this.$mainPage.innerHTML = `
        <section class="section-all" data-section-all>
            <div class="container">
                <button class="btn" data-back-btn><i class="fa-solid fa-chevron-left"></i></button>
                <h2 class="section-title" data-section-title></h2>
                <div class="cards-container" data-section-container>
                    
                </div>
            </div>
            <footer class="footer">
              <div class="container">
                <img src="./imgs/logo.png" alt="TM logo">
                &copy; <span data-copyright-year>${new Date().getFullYear()}</span><a href="https://github.com/MohamedAlosaili/midNightMovie-App"
                    class="underline accent-color">@MohamedAlosaili</a> All Right Reserved
              </div>
            </footer>
        </section>
        ${this._movieHeaderSection(movieObj, type)}
        <section class="info-section" data-info-section>
            <div class="container flex-column">
                <section class="overview section">
                    <h2 class="section-title">Overview</h2>
                    <p>${movieObj.overview ?? "Overview not available"}</p>
                </section>
                <section class="section">
                    <h2 class="section-title">Cast</h2>
                    <div class="cards-container flex">
                        ${this.getCastCards(movieObj.credits.cast)}    
                    </div>
                </section>
                <section class="section">
                    <h2 class="section-title">Videos</h2>
                    <div class="cards-container flex">
                        ${this._getMovieVideos(movieObj.videos)}
                    </div>
                </section>
                <section class="section">
                    <h2 class="section-title">Images</h2>
                    <nav class="section-nav movie-nav">
                        <div class="nav-back" data-nav-back></div>
                        <button class="btn active" data-image-type="backdrops" data-idx="0">Backdrops <span class="num">${
                          dataObj.moviePage.backdrops.length
                        }</span></button>
                        <button class="btn" data-image-type="posters"data-idx="1">Posters <span class="num">${
                          dataObj.moviePage.posters.length
                        }</span></button>
                    </nav>
                    <div class="cards-container flex" data-images-container>
                        ${this.getMovieImages(
                          movieObj.images.backdrops,
                          "backdrops"
                        )}
                    </div>
                </section>
                <section class="section">
                    <h2 class="section-title">Similar movies</h2>
                    <div class="cards-container flex">
                        ${
                          this.getSectionCards(
                            movieObj.similar.results,
                            type
                          ) ||
                          `<div class="no-content">
                        <i class="icon empty-cards"></i>
                          <p class="text">
                          There are no similar movies for <span class="movie-name">${
                            dataObj.moviePage.movieObj.title ??
                            dataObj.moviePage.movieObj.original_title ??
                            dataObj.moviePage.movieObj.name ??
                            dataObj.moviePage.movieObj.original_name
                          }
                          </p>
                        </div>`
                        }
                    </div>
                </section>
            </div>
        </section>
        `;

    this.$movieHeader = document.querySelector("[data-movie-header]");

    this.$trailerContainer = document.querySelector("[data-trailer-container]");
    this.$trailerVideo = document.querySelector("[data-trailer-video]");
    this.trailerUrl = this.$trailerVideo?.src;

    this.$cardContainer = document.querySelector("[data-images-container]");
    this.$navBtns = document.querySelectorAll("[data-image-type]");

    this._movieHeaderListener();
    this._sectionNavListener();
  }

  _movieHeaderSection(movieObj, type) {
    return `
        <article class="landing movie-landing" data-movie-header>
        
        <figure class="backdrop">
        ${
          !movieObj.backdrop_path && !movieObj.poster_path
            ? ""
            : movieObj.backdrop_path
            ? `
            <img src="${BACKDROP_URL}${movieObj.backdrop_path}" alt="'${
                movieObj.title ??
                movieObj.original_title ??
                movieObj.name ??
                movieObj.original_name
              }' backdrop">
          `
            : `
          <img src="${BACKDROP_URL}${movieObj.poster_path}" alt="'${
                movieObj.title ??
                movieObj.original_title ??
                movieObj.name ??
                movieObj.original_name
              }' backdrop">
          `
        }
            </figure>
        <div class="container" data-poster-parent>
            <figure class="poster">
            ${
              movieObj.poster_path
                ? `
                <img src="${POSTER_URL}${
                    movieObj.poster_path
                  }" data-poster alt="'${
                    movieObj.title ??
                    movieObj.original_title ??
                    movieObj.name ??
                    movieObj.original_name
                  }' poster">`
                : `<div class="no-img">
                      <i class="icon fa-solid fa-file-image"></i>
                      Image Not <br> Available
                    </div>`
            }
            </figure>
            <section class="post-info">
                <h2 class="post-title">${
                  movieObj.title ??
                  movieObj.original_title ??
                  movieObj.name ??
                  movieObj.original_name
                }</h2>
                <ul class="genre-list">
                    ${this._getMovieGenres(movieObj)}
                </ul>
                <div class="rate">
                    <i class="icon fa-solid fa-star"></i>
                    <span class="rate-num">${movieObj.vote_average.toFixed(
                      1
                    )}<span> / 10</span></span>
                    <span class="people-rated">${
                      movieObj.vote_count
                    } voters</span>
                </div>
                <div class="date-time-info">
                    <h3><span class="define">Release date:</span> ${
                      movieObj.release_date ?? movieObj.first_air_date
                    }</h3>
                    <h3><span class="define">${
                      type === `movie` ? `Duration` : `Episode Time`
                    }:</span> ${
      movieObj.runtime ?? movieObj.episode_run_time[0] ?? 0
    } min</h3>
                </div>
                <div class="button">
                    <button class="btn more-btn" data-trailer-btn><i class="icon fa-solid fa-play"></i> Watch
                        Trailer</button>
                    ${
                      checkTheWatchlist(movieObj.id)
                        ? `<button class="btn watchlist-btn active" id="${movieObj.id}" data-watchlist-btn="header" data-type="${type}">Added to watchlist</button>`
                        : `<button class="btn watchlist-btn" id="${movieObj.id}" data-watchlist-btn="header" data-type="${type}">Add to watchlist</button>`
                    }
                </div>
                <div class="trailer-container" data-trailer-container>      
                    ${
                      this._getFirstTrailerKey(movieObj)
                        ? `
                    <iframe class="trailer-frame" data-trailer-video src="${VIDEO_URL}${this._getFirstTrailerKey(
                            movieObj
                          )}"
                        frameborder="0"
                        allowfullscreen loading="lazy">
                    </iframe>
                    `
                        : `
                        <div class="trailer-frame no-content">
                            <i class="icon fa-solid fa-video-slash"></i>
                            <p class="text">
                                We don't find a trailer for <span class="movie-name">${
                                  movieObj.title ??
                                  movieObj.original_title ??
                                  movieObj.name ??
                                  movieObj.original_name
                                }</span> watch on youtube <a href="https://www.youtube.com/results?search_query=${
                            movieObj.title ??
                            movieObj.original_title ??
                            movieObj.name ??
                            movieObj.original_name
                          }" target="_blank">Click</a>
                            </p>
                        </div>
                    `
                    }
                    
                    <button class="btn" title="Close Video" data-close-trailer><i class="fa-solid fa-xmark"></i></button>
                </div>
            </section>
        </div>
    </article>
        `;
  }

  _getMovieGenres(movieObj) {
    const genreList = document.createElement("ul");

    movieObj.genres.forEach((genre) => {
      const genreItem = document.createElement("li");
      genreItem.className = "genre-item";
      genreItem.innerHTML = genre.name;

      genreList.append(genreItem);
    });

    return genreList.innerHTML;
  }

  _getFirstTrailerKey(movieObj) {
    let trailerKey;

    for (let i = 0; i < movieObj.videos.results.length; i++) {
      if (movieObj.videos.results[i].type === "Trailer") {
        trailerKey = movieObj.videos.results[i].key;
        break;
      }
    }
    return trailerKey;
  }

  _getMovieVideos(videosObj) {
    if (videosObj.results.length === 0) {
      const movieObj = dataObj.moviePage.movieObj;
      return `
      <div class="no-content">
        <i class="icon fa-solid fa-video-slash"></i>
        <p class="text">
          There are no videos for <span class="movie-name">${
            movieObj.title ??
            movieObj.original_title ??
            movieObj.name ??
            movieObj.original_name
          }</span><br> watch on youtube <a href="https://www.youtube.com/results?search_query=${
        movieObj.title ??
        movieObj.original_title ??
        movieObj.name ??
        movieObj.original_name
      }" target="_blank">Click</a>      
        </p>
      </div> 
      `;
    }

    const videosContainer = document.createElement("div");

    videosObj.results.forEach((video) => {
      const videoEl = document.createElement("div");
      videoEl.className = "trailer-container";

      videoEl.innerHTML = `
            <div class=video-card>
                <iframe class="trailer-frame" src="${VIDEO_URL}${video.key}"
                    frameborder="0" allowfullscreen loading="lazy">
                </iframe>
            <div>
        `;

      videosContainer.append(videoEl);
    });

    return videosContainer.innerHTML;
  }

  getMovieImages(imgsArr, type) {
    let lotOfImgs = false;

    const imgsCopy = [...imgsArr];

    if (imgsCopy.length > 10) {
      imgsCopy.length = 10;
      lotOfImgs = true;
    } else if (imgsCopy.length === 0) {
      return `
      <div class="no-content">
      <i class="icon fa-solid fa-image"></i>
      <p class="text">
      There are no ${type} for <span class="movie-name">${
        dataObj.moviePage.movieObj.title ??
        dataObj.moviePage.movieObj.original_title ??
        dataObj.moviePage.movieObj.name ??
        dataObj.moviePage.movieObj.original_name
      }
      </p>
      </div>  
      `;
    }

    const urls = {
      backdrops: BACKDROP_URL,
      posters: POSTER_URL,
    };

    const imagesContainer = document.createElement("div");

    imgsCopy.forEach((img) => {
      const imgEl = document.createElement("img");
      imgEl.className = `${type}-img`;
      imgEl.src = `${urls[type]}${img.file_path}`;
      imgEl.setAttribute("loading", "lazy");

      imagesContainer.append(imgEl);
    });

    if (lotOfImgs) {
      const seeAllCards = document.createElement("div");
      seeAllCards.className = "more imgs btn";
      seeAllCards.innerHTML = `
                  <p class="wrapper" data-moreten-btn data-type="images">
                      All ${type}
                      <i class="icon fa-solid fa-chevron-right"></i>
                  </p>
              `;

      imagesContainer.append(seeAllCards);
    }

    return imagesContainer.innerHTML;
  }

  _movieHeaderListener() {
    this.$movieHeader.addEventListener("click", moviePageHandler);
  }

  _sectionNavListener() {
    this.$navBtns.forEach((btn) => {
      btn.addEventListener("click", movieNavHandler);
    });
  }
}

export default new MoviePage();
