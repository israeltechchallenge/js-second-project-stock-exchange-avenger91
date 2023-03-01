class FetchSearchResults {
  async fetchResults(input) {
    searchResultsList.innerHTML = "";

    try {
      const searchURL = `${baseURL}search?query=${input}&limit=10&exchange=NASDAQ`;
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
    const textElement = createTextElement(companyName, symbol);
    const changesElement = createChangesElement(changes, changesPercentage);

    listElement.append(imageElement, linkElement, textElement, changesElement);
    listElement.addEventListener("click", () => {
      window.location.href = linkElement.getAttribute("href");
    });

    return listElement;
  }

  displaySearchResults(data) {
    const symbol = data.symbol;
    if (searchResultsList.querySelector(`[data-symbol="${symbol}"]`)) {
      return;
    }
    const listElement = this.createResultsElement(data);
    listElement.setAttribute("data-symbol", symbol);
    const temporaryContainer = document.createDocumentFragment();
    temporaryContainer.appendChild(listElement);
    searchResultsList.appendChild(temporaryContainer);
    if (searchResultsList.children.length === 1) {
      searchResultsList.firstChild.style.marginTop = "60px";
    }
  }
}
