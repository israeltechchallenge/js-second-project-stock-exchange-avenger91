const resetSearch = (() => {
  searchList.innerHTML = "";
  magnify.style.display = "block";
  loadingSpinner.style.display = "none";
})();

const debounce = (func, delay) => {
  let timeoutId;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const getSearchResults = async (input) => {
  try {
    const searchURL = `${baseURL}search?query=${input.value}&limit=10&exchange=NASDAQ`;
    const response = await fetch(searchURL);
    const data = await response.json();
    const companies = data.map((company) => company.symbol);
    const companyData = await Promise.all(companies.map(getCompanyData));
    const searchResults = companyData.filter((data) => data !== null);
    searchResults.forEach(listSearchResult);
  } catch (error) {
    console.log(error);
  }
};

const createResultsElement = (data) => {
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
};

const listSearchResult = (data) => {
  const listElement = createResultsElement(data);
  const temporaryContainer = document.createDocumentFragment();
  temporaryContainer.appendChild(listElement);
  searchList.appendChild(temporaryContainer);
};

const handleInput = () => {
  searchList.innerHTML = "";
  getSearchResults(input);
};

const handleButtonClick = (event) => {
  event.preventDefault();
  searchList.innerHTML = "";
  magnify.style.display = "none";
  loadingSpinner.style.display = "block";

  setTimeout(() => {
    magnify.style.display = "block";
    loadingSpinner.style.display = "none";
  }, delay);

  getSearchResults(input);

  input.removeEventListener("input", handleInput);
};

button.addEventListener("click", handleButtonClick);
input.addEventListener("input", debounce(handleInput, delay));
