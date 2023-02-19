const resetSearch = () => {
  searchList.innerHTML = "";
  magnify.style.display = "block";
  loadingSpinner.style.display = "none";
};

resetSearch();

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

const getCompanyData = async (symbol) => {
  try {
    const getCompanyURL = baseURL + `company/profile/${symbol}`;
    const response = await fetch(getCompanyURL);
    const data = await response.json();
    return data.profile ? { ...data, symbol } : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const listSearchResult = (data) => {
  const { companyName, image, changes, changesPercentage } = data.profile;
  const symbol = data.symbol;

  const temporaryContainer = document.createDocumentFragment();
  const listElement = document.createElement("div");
  const imageElement = document.createElement("img");
  const linkElement = document.createElement("a");
  const textElement = document.createElement("p");
  const changesElement = document.createElement("p");

  replaceBrokenImage(imageElement);
  linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
  imageElement.setAttribute("src", `${image}`);
  textElement.textContent = ` ${companyName} (${symbol}) `;
  changesElement.textContent = formatChanges(changes, changesPercentage);
  changesElement.classList.add(changes < 0 ? "red" : "green");

  listElement.append(imageElement, linkElement, textElement, changesElement);
  temporaryContainer.appendChild(listElement);
  searchList.appendChild(temporaryContainer);

  listElement.addEventListener("click", () => {
    window.location.href = linkElement.getAttribute("href");
  });
};

const handleInput = () => {
  searchList.innerHTML = "";
  getSearchResults(input);
};

input.addEventListener("input", debounce(handleInput, delay));

button.addEventListener("click", (event) => {
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
});
