class Error {
  $mainPage = document.querySelector("[data-main-page]");

  renderError(num = "", message = "") {
    this.$mainPage.innerHTML = `
        <div class="error">
            <span class="error-code">${num}</span>
            <p class="error-message">Something went wrong</p>
            <p class="error-message">${message}</p>
            <button class="btn" data-back-home>Back to Home</button>
        </div>
    `;
  }
}

export default new Error();
