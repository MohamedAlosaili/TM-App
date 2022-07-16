import { dataObj } from "../app.js";
import MoviePage from "./moviePage.js";

class MovieSectionAll extends MoviePage {
  sectionAll;
  sectionAllBackBtn;
  sectionTitle;
  cardContainer;

  getSectionAll(type) {
    this.sectionAll = document.querySelector("[data-section-all]");
    this.sectionAll.classList.add("active");
    const obj = dataObj.moviePage[type] ?? null;

    this.rendermainPageElement(obj, type);
  }

  rendermainPageElement(sectionObj, type) {
    this.sectionAllBackBtn = document.querySelector("[data-back-btn]");
    this.sectionTitle = document.querySelector("[data-section-title]");
    this.cardContainer = document.querySelector("[data-section-container]");

    this.sectionTitle.innerHTML = `All ${type}`;
    this.cardContainer.innerHTML = this._getSectionContent(sectionObj, type);

    this.sectionAllBackListener();
  }

  _getSectionContent(sectionObj, type) {
    this.cardContainer.innerHTML = "";
    if (type === "cast") {
      this._getCastCards(sectionObj, false);
      return;
    } else {
      const posters = dataObj.moviePage.posters;
      const backdrops = dataObj.moviePage.backdrops;
      this.getAllImages(posters, "Posters");
      this.getAllImages(backdrops, "Backdrops");
    }
  }

  getAllImages(arr, type) {
    const section = document.createElement("section");
    section.className = "imgs-section";

    const sectionTitle = document.createElement("h3");
    sectionTitle.innerHTML = type;

    const imgContainer = document.createElement("div");
    imgContainer.className = "imgs-container";

    section.append(sectionTitle, imgContainer);
    arr.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.file_path;
      img.style.aspectRatio = item.aspect_ratio;
      console.log(this._movieObj);
      img.alt =
        this._movieObj.title ??
        this._movieObj.original_title ??
        this._movieObj.name ??
        this._movieObj.original_name;

      imgContainer.append(img);
    });

    console.log(section);

    this.cardContainer += section.innerHTML;
  }

  sectionAllBackListener() {
    this.sectionAllBackBtn.addEventListener("click", () => {
      this.sectionAll.classList.remove("active");
    });
  }
}

export default new MovieSectionAll();
