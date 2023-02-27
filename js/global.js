const input = document.querySelector("input");
const button = document.querySelector("button");
const magnify = document.querySelector(".fa-magnifying-glass");
const loadingSpinner = document.querySelector(".fa-spinner");
const searchList = document.querySelector(".search-results");
const marqueeElement = document.querySelector(".marquee");
const companyNameElement = document.querySelector(".company-name");
const companyPriceElement = document.querySelector(".company-price");
const companyDescription = document.querySelector(".company-description");
const listCompanyData = document.querySelector(".list-company-data");
const delay = 500;

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
const marqueeURL = baseURL + "stock/list";

const getCompanyData = async (symbol) => {
  try {
    const getCompanyURL = baseURL + `company/profile/${symbol}`;
    const response = await fetch(getCompanyURL);
    const data = await response.json();
    return data.profile ? { ...data, symbol } : null;
  } catch (error) {
    console.log(error);
  }
};

const createImageElement = (image) => {
  const imageElement = document.createElement("img");
  replaceBrokenImage(imageElement);
  imageElement.setAttribute("src", `${image}`);
  return imageElement;
};

function createLinkElement(symbol) {
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
  return linkElement;
}

function createTextElement(companyName, symbol) {
  const textElement = document.createElement("p");
  textElement.textContent = ` ${companyName} (${symbol}) `;
  return textElement;
}

const createCompanyLinkElement = (companyName, website) => {
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", `${website}`);
  linkElement.textContent = companyName;
  return linkElement;
};

const createPriceElement = (price, currency) => {
  const textElement = document.createElement("p");
  textElement.textContent = ` $${price} ${currency}`;
  return textElement;
};

const createSymbolElement = (symbol) => {
  const symbolElement = document.createElement("span");
  symbolElement.textContent = `(${symbol})`;
  return symbolElement;
};

const createDescriptionElement = (description) => {
  const descrElement = document.createElement("p");
  descrElement.textContent = description;
  return descrElement;
};

const createChangesElement = (changes, changesPercentage) => {
  const changesElement = document.createElement("p");
  changesElement.textContent = formatChanges(changes, changesPercentage);
  changesElement.classList.add(getChangesColor(changes));
  return changesElement;
};

const formatChanges = (changes, changesPercentage) => {
  const roundedChanges = Math.round(changes * 100) / 100;
  const roundedChangesPercentage = Math.round(changesPercentage * 100) / 100;

  if (roundedChanges < 0) {
    return ` ${roundedChanges} (${roundedChangesPercentage}%)`;
  } else {
    return `+${roundedChanges} (+${roundedChangesPercentage}%)`;
  }
};

const getChangesColor = (changes) => {
  return changes < 0 ? "red" : "green";
};

const replaceBrokenImage = (image) => {
  image.onerror = () => {
    image.src =
      "https://cdn0.iconfinder.com/data/icons/money-exchange-3/106/money-currency-bank-256.png";
  };
};
