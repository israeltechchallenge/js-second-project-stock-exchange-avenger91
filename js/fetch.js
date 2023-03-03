class FetchSearchResults {
  constructor(input) {
    this.input = input;
    this.searchResults = searchResults;
  }

  async fetchResults() {
    this.searchResults.innerHTML = "";
    try {
      const searchURL = `${baseURL}search?query=${this.input}&limit=10&exchange=NASDAQ`;
      const response = await fetch(searchURL);
      const data = await response.json();
      const companies = data.map((company) => company.symbol);
      const companyData = await Promise.all(companies.map(getCompanyData));

      return companyData.filter((data) => data !== null);
    } catch (error) {
      console.log(error);
    }
  }
  createResultsElement(data) {
    const { companyName, image, changes, changesPercentage } = data.profile;
    const symbol = data.symbol;
    const listElement = document.createElement("div");
    const imageElement = createImageElement(image);
    const linkElement = createLinkElement(symbol);
    const textElement = this.createTextElement(companyName, symbol);
    const changesElement = createChangesElement(changes, changesPercentage);

    listElement.append(imageElement, linkElement, textElement, changesElement);
    listElement.addEventListener("click", () => {
      window.location.href = linkElement.getAttribute("href");
    });

    return listElement;
  }

  createTextElement(companyName, symbol) {
    const textElement = document.createElement("span");
    const searchText = this.input;
    const companyText = companyName + " " + symbol;
    const regex = new RegExp(searchText, "gi");
    if (companyText.match(regex)) {
      textElement.innerHTML = `${companyText.replace(
        regex,
        '<span style="background-color: rgba(255, 255, 0, 0.678)">$&</span>'
      )}`;
    } else {
      textElement.textContent = `${companyName} (${symbol})`;
    }
    return textElement;
  }

  displaySearchResults(data) {
    const symbol = data.symbol;
    if (this.searchResults.querySelector(`[data-symbol="${symbol}"]`)) {
      return;
    }
    const listElement = this.createResultsElement(data);
    listElement.setAttribute("data-symbol", symbol);
    const temporaryContainer = document.createDocumentFragment();
    temporaryContainer.appendChild(listElement);
    this.searchResults.appendChild(temporaryContainer);
    if (this.searchResults.children.length === 1) {
      this.searchResults.firstChild.style.marginTop = "60px";
    }
  }
}
