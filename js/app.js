import {
  FIND_BY_ID,
  POPULAR_MOVIES,
  SEARCH_URL,
  DISCOVER_MOVIES,
} from "./config.js";

// getInfo();
async function getInfo() {
  try {
    const req = await fetch(
      FIND_BY_ID("person", "1372") + "&append_to_response=combined_credits"
    );
    console.log(req);
    if (!req.ok) throw req.json().errors[0];
    const res = await req.json();
    console.log(res);
  } catch (err) {
    throw err;
  }
}
const current = new Date();
const DOB = new Date("1972-06-07");
const calculate = Math.trunc((current - DOB) / 1000 / 60 / 60 / 24 / 30 / 12);
console.log(calculate);

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".sidbar-menu");
const layer = document.querySelector(".layer");

hamburger.addEventListener("click", () => {
  hamburger.closest(".nav-bar").classList.toggle("active");
  menu.classList.toggle("active");
});
