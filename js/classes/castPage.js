import { POSTER_URL } from "../config.js";
import MainClass from "./mainClass.js";
import { leftSliderHandler, rightSliderHandler } from "../handlerFunctions.js";

class CastPage extends MainClass {
  biography;
  collapseBtn;
  browseContainer;
  leftSlider;
  rightSlider;
  closeBrowse;

  browseNum = 0;

  rendermainPageElement(personObj, popularPerople) {
    this.mainPage.innerHTML = `
            <section class="cast-page">
                <div class="container flex-column">
                    <header class="landing">
                        <div class="poster-side">
                            <figure class="poster">
                                ${
                                  personObj.profile_path
                                    ? `<img src="${POSTER_URL}${personObj.profile_path}" alt="${personObj.name}">`
                                    : ` <div class="no-img">
                                      <i class="icon fa-solid fa-file-image"></i>
                                      Image Not <br> Available
                                    </div>`
                                }
                            </figure>   
                            <ul class="social-accounts">
                                ${this._getCastAccounts(personObj.external_ids)}
                            </ul>
                        </div>
                        <section class="person-info flex-column">
                                <h2 class="name">${
                                  personObj.name ?? "Unknown"
                                }</h2>
                                <section>
                                    <h2 class="section-title">Personal info</h2>  
                                    <div class="personal-wrapper">
                                      <p class="info"><strong>Known for: </strong>${
                                        personObj.known_for_department ?? "-"
                                      }</p>
                                      <p class="info"><strong>Date of birth: </strong>${
                                        personObj.birthday ?? "-"
                                      }</p>
                                      ${
                                        personObj.deathday
                                          ? `
                                      <p class="info"><strong>Date of death: </strong>${personObj.deathday}</p>
                                      `
                                          : ""
                                      }
                                      <p class="info"><strong>Age: </strong>${this._calculateAge(
                                        personObj.birthday,
                                        personObj.deathday
                                      )}</p>
                                      <p class="info"><strong>Gender: </strong>${this._gnederType(
                                        personObj.gender
                                      )}</p>                                
                                      <p class="info"><strong>Also known as: </strong>
                                              ${this._knownAsList(
                                                personObj.also_known_as
                                              )}
                                      </p>
                                    </div>
                                </section>
                            <section>
                                <h2 class="section-title">Biography</h2>            
                                <p class="biography" data-biography>${
                                  personObj.biography ||
                                  "Biography not available"
                                }
                                      <button class="collapse-btn" data-collapse-btn>Show more<i class="icon fa-solid fa-chevron-right"></i></button>    
                                  </p>
                            </section>
                        </section>
                    </header> 
                    <section>
                            <h2 class="section-title">${
                              personObj.images.profiles.length === 1
                                ? "Image"
                                : "Images"
                            }</h2>    
                            <div class="imgs-container cards-container grid">
                                ${this._getCastImages(
                                  personObj.images.profiles,
                                  personObj.name
                                )}
                                <button class="more btn" data-browse-imgs data-idx="0">
                                      <p class="wrapper">
                                          All Images
                                          <i class="icon fa-solid fa-chevron-right"></i>
                                      </p>
                                </button>
                            </div>
                            <div class="browse-imgs">
                                <div class="browse-container" data-browse-container>    
                                    ${this._getCastImages(
                                      personObj.images.profiles,
                                      personObj.name,
                                      true
                                    )}
                                </div>
                                ${
                                  personObj.images.profiles.length > 1
                                    ? `
                                        <button class="btn slide left not-allowed" data-left-slide><i class="icon fa-solid fa-chevron-left"></i></button>    
                                        <button class="btn slide right" data-right-slide><i class="icon fa-solid fa-chevron-right"></i></button>
                                    `
                                    : `
                                        <button class="btn slide left not-allowed" data-left-slide><i class="icon fa-solid fa-chevron-left"></i></button>    
                                        <button class="btn slide right not-allowed" data-right-slide><i class="icon fa-solid fa-chevron-right"></i></button>
                                    `
                                }    
                                <button class="btn close" data-close-slider><i class="icon fa-solid fa-xmark"></i></button>    
                            </div>
                    </section> 
                    <section>
                            <h2 class="section-title">Known for</h2>
                            <div class="cards-container flex">
                                ${this._getSectionCards(
                                  personObj.combined_credits.cast
                                )}          
                            </div>
                    </section>  
                    <section>
                            <h2 class="section-title">Popular people</h2>
                            <div class="cards-container flex">
                                ${this.getCastCards(
                                  popularPerople.results,
                                  false
                                )}          
                            </div>
                    </section>         
                </div>
            </section>
        `;

    this.biography = document.querySelector("[data-biography]");
    this.collapseBtn = document.querySelector("[data-collapse-btn]");
    this.browseContainer = document.querySelector("[data-browse-container]");
    this.leftSlider = document.querySelector("[data-left-slide]");
    this.rightSlider = document.querySelector("[data-right-slide]");
    this.closeBrose = document.querySelector("[data-close-slider]");

    this.collapseBtnListener();
    this.checkBiographyLong();
    this.browseImgsBtnListener(leftSliderHandler, rightSliderHandler);
  }

  _getCastAccounts(idObj) {
    const list = document.createElement("ul");
    const socials = ["facebook", "twitter", "instagram", "imdb"];
    const icons = [
      "fa-facebook-square",
      "fa-twitter-square",
      "fa-instagram-square",
      "fa-imdb",
    ];
    const urls = {
      facebook: "https://www.facebook.com/",
      twitter: "https://twitter.com/",
      instagram: "https://www.instagram.com/",
      imdb: "https://www.imdb.com/name/",
    };

    socials.forEach((account, idx) => {
      if (!idObj[`${account}_id`]) return;

      const item = document.createElement("li");

      item.innerHTML = `
        <a href="${urls[account]}${
        idObj[`${account}_id`]
      }" class="${account}" target="_blank">
            <i class="fa-brands ${icons[idx]}"></i>
        </a>
      `;

      list.append(item);
    });

    return list.innerHTML;
  }

  _calculateAge(birthday, deathday) {
    if (!birthday) {
      return "-";
    }

    const DOB = new Date(birthday);

    let lastDate;
    if (deathday) {
      lastDate = new Date(deathday);
    } else {
      lastDate = new Date();
    }

    const age = Math.floor((lastDate - DOB) / 1000 / 60 / 60 / 24 / 365);
    return `${age} Years old`;
  }

  _gnederType(num) {
    if (num === 1) return "Female";
    else if (num === 2) return "Male";
    else if (num === 3) return "Non-binary";
    else return "-";
  }

  _knownAsList(knownList) {
    if (knownList.length === 0) return "-";
    const list = document.createElement("p");

    knownList.forEach((item) => {
      const span = document.createElement("span");
      span.className = "known-item";

      span.innerHTML = item;

      list.append(span);
    });

    console.log(list);
    return list.innerHTML;
  }

  checkBiographyLong() {
    if (this.biography.clientHeight > 173)
      this.biography.classList.add("collapse");
  }

  _getCastImages(imgs, name, browse = false) {
    const container = document.createElement("div");

    if (imgs.length === 0) {
      return `
            <div class="no-content">
                <i class="icon fa-solid fa-image"></i>
                <p class="text">
                There are no Images for <span class="movie-name">${
                  name ?? "Unknown"
                }
                </p>
            </div> 
        `;
    }

    imgs.forEach((img, idx) => {
      const card = document.createElement("div");

      !browse ? (card.className = "cast-img") : false;

      card.innerHTML = `
        ${
          browse
            ? `<div class="cast-img">
                <img src="${POSTER_URL + img.file_path}" alt="${
                name ?? "Unknown"
              }" >
            </div>`
            : `
                <img src="${POSTER_URL + img.file_path}" alt="${
                name ?? "Unknown"
              }" data-browse-imgs data-idx="${idx}">
                `
        }
      `;

      container.append(card);
    });

    return container.innerHTML;
  }

  collapseBtnListener() {
    this.collapseBtn.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("show");
      e.target.classList.toggle("active");
      if (e.target.classList.contains("active")) {
        this.collapseBtn.innerHTML = `Show less<i class="icon fa-solid fa-chevron-up">`;
      } else {
        this.collapseBtn.innerHTML = `Show more<i class="icon fa-solid fa-chevron-right">`;
      }
    });
  }

  browseImgsBtnListener(leftHandler, rightHandler) {
    this.leftSlider.addEventListener("click", leftHandler);
    this.rightSlider.addEventListener("click", rightHandler);
    this.closeBrose.addEventListener("click", () => {
      this.browseContainer.parentElement.classList.remove("open");
    });
  }
}

export default new CastPage();
