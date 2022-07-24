import { dataObj } from "../app.js";
import mainClass from "./mainClass.js";

class Home extends mainClass {
  rendermainPageElement(homeObj) {
    const { trendDay, trendWeek, popularMovies, popularTV } = homeObj;

    this.$mainPage.innerHTML = `
        ${this.getHeaderSection(trendDay)}
        <div class="container flex-column">
            <section class="section" id="${
              dataObj.pageName
            }/first_section" data-popular-section>
                <h2 class="section-title">Today's Trend</h2>
                <div class="cards-container flex">
                    ${this.getSectionCards(trendDay.results)}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">This week trend</h2>
                <div class="cards-container flex">
                    ${this.getSectionCards(trendWeek.results)}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">Popular movies</h2>
                <div class="cards-container flex">
                    ${this.getSectionCards(popularMovies.results, "movie")}
                </div>
            </section>
            <section class="section">
                <h2 class="section-title">Popular TV shows</h2>
                <div class="cards-container flex">
                    ${this.getSectionCards(popularTV.results, "tv")}
                </div>
            </section>
        </div>    
    `;
  }
}

export default new Home();
