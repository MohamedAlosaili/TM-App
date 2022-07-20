import { dataObj } from "../app.js";
import { BACKDROP_URL, POSTER_URL } from "../config.js";
import MoviePage from "./moviePage.js";

class MovieSectionAll extends MoviePage {
  infoSection;
  headerSection;
  sectionAll;
  sectionAllBackBtn;
  sectionTitle;
  cardContainer;

  getSectionAll(type) {
    this.infoSection = document.querySelector("[data-info-section]");
    this.headerSection = document.querySelector("[data-movie-header]");
    setTimeout(() => {
      this.infoSection.style.display = "none";
      this.headerSection.style.display = "none";
    }, 300);

    this.sectionAll = document.querySelector("[data-section-all]");
    this.sectionAll.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const obj = dataObj.moviePage[type] ?? null;

    this.sectionAllBackBtn = document.querySelector("[data-back-btn]");
    this.sectionTitle = document.querySelector("[data-section-title]");
    this.sectionContainer = document.querySelector("[data-section-container]");

    this.rendermainPageElement(obj, type);
  }

  rendermainPageElement(sectionObj, type) {
    this.sectionTitle.innerHTML = `All ${type}`;

    if (type === "cast") {
      this.sectionContainer.classList.add("grid");
      this.sectionContainer.classList.remove("flex");
    } else {
      this.sectionContainer.classList.remove("grid");
      this.sectionContainer.classList.add("flex");
    }

    this.sectionContainer.innerHTML = this._getSectionContent(sectionObj, type);

    this.sectionAllBackListener();
  }

  _getSectionContent(sectionObj, type) {
    this.sectionContainer.innerHTML = "";
    if (type === "cast") {
      return this._getCastCards(sectionObj, false);
    } else {
      return this._getImagesSection();
    }
  }

  _getImagesSection() {
    dataObj.moviePage.posters = [];
    return `
      <section class="posters">
        <h3 class="imgs-title">Posters</h3>
        <div class="cards-container grid">
          ${this.getAllImages(dataObj.moviePage.posters, "poster")}
        </div>
      </section>
      <section class="backdrops">
        <h3 class="imgs-title">Backdrops</h3>
        <div class="cards-container grid">
          ${this.getAllImages(dataObj.moviePage.backdrops, "backdrop")}
        </div>
      </section>
    `;
  }

  getAllImages(arr, type) {
    if (arr.length === 0) {
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

    const imgContainer = document.createElement("div");

    const movie = dataObj.moviePage.movieObj;

    arr.forEach((item) => {
      const img = document.createElement("img");
      img.src =
        type === "poster"
          ? `${POSTER_URL}${item.file_path}`
          : `${BACKDROP_URL}${item.file_path}`;

      img.className = `${type}-img`;
      img.setAttribute("loading", "lazy");
      img.alt =
        movie.title ??
        movie.original_title ??
        movie.name ??
        movie.original_name;

      imgContainer.append(img);
    });

    const imgs = imgContainer.innerHTML;
    return imgs;
  }

  sectionAllBackListener() {
    this.sectionAllBackBtn.addEventListener("click", () => {
      this.infoSection.style.display = "block";
      this.headerSection.style.display = "block";

      this.sectionAll.classList.remove("active");
    });
  }
}

export default new MovieSectionAll();
