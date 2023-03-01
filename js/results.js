class GetSearchResults {
  constructor() {
    this.delay = delay;
    this.handleInput = this.debounce((input) => {
      this.handleSearch(input.value);
    }, this.delay);
  }

  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  async handleSearch(input) {
    searchResultsList.innerHTML = "";
    loadingSpinner.style.display = "block";
    magnify.style.display = "none";

    try {
      const searchResults = await new FetchSearchResults().fetchResults(input);
      searchResults.forEach((data) => {
        new FetchSearchResults().displaySearchResults(data);
      });
    } catch (error) {
      console.log(error);
    }

    loadingSpinner.style.display = "none";
    magnify.style.display = "block";
  }

  async handleButtonClick(input, event) {
    event.preventDefault();
    await this.handleSearch(input.value);
  }
}
