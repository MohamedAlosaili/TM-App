import MainClass from "./mainClass.js";
import { BACKDROP_URL, POSTER_URL, VIDEO_URL } from "../config.js";
import { checkTheWatchlist } from "../functions.js";
import { dataObj } from "../app.js";
import { moviePageHandler } from "../handlerFunctions.js";

class MoviePage extends MainClass {
  _movieHeader;
  trailerContainer;
  trailerVideo;
  trailerUrl;

  rendermainPageElement(movieObj, type) {
    this._mainPage.innerHTML = `
        ${this._movieHeaderSection(movieObj, type)}
        <section class="info-section">
            <div class="container">
                <section class="overview section">
                    <h2 class="section-title">Overview</h2>
                    <p>${movieObj.overview}</p>
                </section>
                <section class="cast section">
                    <h2 class="section-title">Cast</h2>
                    <div class="card-container flex">
                        ${this._getCastCards(movieObj.credits)}    
                    </div>
                </section>
                <section class="videos section">
                    <h2 class="section-title">Videos</h2>
                    <div class="card-container flex">
                        ${
                          this._getMovieVideos(movieObj.videos) ||
                          `
                               <div class="no-videos">
                                    <i class="icon fa-solid fa-video-slash"></i>
                                    <p class="text">
                                        We don't find any videos for <span class="movie-name">${
                                          movieObj.title ??
                                          movieObj.original_title ??
                                          movieObj.name ??
                                          movieObj.original_name
                                        }</span><br> you can watch videos on youtube <a href="https://www.youtube.com/results?search_query=${
                            movieObj.title ??
                            movieObj.original_title ??
                            movieObj.name ??
                            movieObj.original_name
                          }" target="_blank">Click</a>
                                    </p>
                                </div> 
                            `
                        }
                    </div>
                </section>
                <section class="similar section">
                    <h2 class="section-title">Similar movies</h2>
                    <div class="card-container flex">
                        ${this._getSectionCards(movieObj.similar, type)}
                    </div>
                </section>
            </div>
        </section>
        `;

    this._movieHeader = document.querySelector("[data-movie-header]");
    this.trailerContainer = document.querySelector("[data-trailer-container]");
    this.trailerVideo = this.trailerContainer.querySelector(
      "[data-trailer-video]"
    );
    this.trailerUrl = this.trailerVideo?.src;

    this._movieHeaderListener(moviePageHandler);
  }

  _movieHeaderSection(movieObj, type) {
    return `
        <article class="header-section movie-header poster-parent" data-movie-header>
        <figure class="header-backdrop-img">
        ${
          movieObj.backdrop_path
            ? `<img src="${BACKDROP_URL}${movieObj.backdrop_path}" alt="'${
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
            <figure class="poster-img">
                <img src="${POSTER_URL}${
      movieObj.poster_path
    }" data-poster alt="'${
      movieObj.title ??
      movieObj.original_title ??
      movieObj.name ??
      movieObj.original_name
    }' poster">
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
      movieObj.runtime ?? movieObj.episode_run_time
    }min</h3>
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
                    <div class="layer" data-trailer-layer></div>      
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
                        <div class="trailer-frame no-videos">
                            <i class="icon fa-solid fa-video-slash"></i>
                            <p class="text">
                                We don't find a trailer for <span class="movie-name">${
                                  movieObj.title ??
                                  movieObj.original_title ??
                                  movieObj.name ??
                                  movieObj.original_name
                                }</span> you can watch videos on youtube <a href="https://www.youtube.com/results?search_query=${
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

    const genreItems = genreList.innerHTML;
    return genreItems;
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

  _getCastCards(castObj) {
    let lotOfCards = false;
    if (castObj.cast.length > 10) {
      lotOfCards = true;
      dataObj.cast = castObj.cast;
      castObj.cast.length = 10;
    }

    const castContainer = document.createElement("div");

    castObj.cast.forEach((cast) => {
      const card = document.createElement("div");
      card.className = "card";
      console.log(cast);
      card.innerHTML = `
            <figure class="cast-poster">
                ${
                  cast.profile_path
                    ? `<img src="${POSTER_URL}${cast.profile_path}"
                        alt="${cast.name ?? original_name}" loading="lazy">`
                    : `
                    <div class="no-img">
                        <i class="icon fa-solid fa-file-image"></i>
                        Image Not <br> Available
                    </div>
                    `
                }
                <figcaption>${cast.name ?? cast.original_name}</figcaption>
                <p class="character">${cast.character}</p>
            </figure>
        `;
      castContainer.append(card);
    });
    if (lotOfCards) {
      const seeAllCards = document.createElement("div");
      seeAllCards.className = "more-cast btn";
      seeAllCards.innerHTML = `
            <p class="wraper">
                All Cast
                <i class="icon fa-solid fa-chevron-right"></i>
            </p>
        `;

      castContainer.append(seeAllCards);
    }

    const cards = castContainer.innerHTML;

    return cards;
  }

  _getMovieVideos(videosObj) {
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

    const videos = videosContainer.innerHTML;

    return videos;
  }

  _movieHeaderListener(handler) {
    this._movieHeader.addEventListener("click", handler);
  }
}

export default new MoviePage();
