class GetSearchResults {
  constructor(input) {
    this.input = input;
    this.searchResults = searchResults;
    this.button = document.querySelector("button");
    this.magnify = document.querySelector(".fa-magnifying-glass");
    this.loadingSpinner = document.querySelector(".fa-spinner");
    this.delay = 200;
  }

  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  async handleSearch(input) {
    this.searchResults.innerHTML = "";
    this.loadingSpinner.style.display = "block";
    this.magnify.style.display = "none";

    const fetchSearch = new FetchSearchResults(input);
    try {
      const appendResults = await fetchSearch.fetchResults();
      appendResults.forEach((data) => {
        fetchSearch.displaySearchResults(data);
      });
    } catch (error) {
      console.log(error);
    }

    this.loadingSpinner.style.display = "none";
    this.magnify.style.display = "block";
  }

  async handleButtonClick(event) {
    event.preventDefault();
    await this.handleSearch(this.input.value);
  }

  setupEventListeners() {
    const debouncedSearch = this.debounce((input) => {
      this.handleSearch(input);
    }, this.delay);

    this.input.addEventListener("input", (event) => {
      debouncedSearch(event.target.value);
    });

    this.button.addEventListener("click", (event) => {
      this.handleButtonClick(event);
    });
  }
}
