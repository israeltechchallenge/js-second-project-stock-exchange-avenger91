function resetSearch() {
  searchList.innerHTML = "";
  magnify.style.display = "block";
  loadingSpinner.style.display = "none";
}

resetSearch();

function debounce(func, delay) {
  let timeoutId;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(null, args);
    }, delay);
  };
}

async function getSearchResults(input) {
  try {
    const searchURL = `${baseURL}search?query=${input.value}&limit=10&exchange=NASDAQ`;
    const response = await fetch(searchURL);
    const data = await response.json();
    for (const company of data) {
      const { symbol } = company;
      getCompanyData(symbol);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCompanyData(symbol) {
  try {
    const getCompanyURL = baseURL + `company/profile/${symbol}`;
    const response = await fetch(getCompanyURL);
    const data = await response.json();
    listSearchData(data);
  } catch (error) {
    console.log(error);
  }
}

function listSearchData(data) {
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
  changesElement.classList.add(getChangesColor(changes));

  listElement.append(imageElement, linkElement, textElement, changesElement);
  temporaryContainer.appendChild(listElement);
  searchList.appendChild(temporaryContainer);

  listElement.addEventListener("click", function () {
    window.location.href = linkElement.getAttribute("href");
  });
}

input.addEventListener(
  "input",
  debounce(function () {
    searchList.innerHTML = "";
    getSearchResults(input);
  }, delay)
);

button.addEventListener("click", function (event) {
  event.preventDefault();
  searchList.innerHTML = "";
  magnify.style.display = "none";
  loadingSpinner.style.display = "block";

  setTimeout(function () {
    magnify.style.display = "block";
    loadingSpinner.style.display = "none";
  }, delay);

  getSearchResults(input);
});
