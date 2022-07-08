import Navbar from "./classes/navbar.js";
import Home from "./classes/home.js";
import { getHomePage } from "./functions.js";

const init = (function () {
  Navbar.callClassFunctions();
  renderPage();
})();

function renderPage() {
  const urlPath = location.pathname.slice(1);
  if (urlPath === "") {
    Home.renderLoader();
    getHomePage();
  }
}
