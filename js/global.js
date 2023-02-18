const input = document.querySelector("input");
const button = document.querySelector("button");
const magnify = document.querySelector(".fa-magnifying-glass");
const loadingSpinner = document.querySelector(".fa-spinner");
const searchList = document.querySelector(".search-results");
const delay = 500;

const companyNameElement = document.querySelector(".company-name");
const companyPriceElement = document.querySelector(".company-price");
const companyDescription = document.querySelector(".company-description");
const listCompanyData = document.querySelector(".list-company-data");

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

function formatChanges(changes, changesPercentage) {
  changes = Math.round(changes * 100) / 100;
  changesPercentage = Math.round(changesPercentage * 100) / 100;

  if (changes < 0) {
    return ` ${changes} (${changesPercentage}%)`;
  } else {
    return `+${changes} (+${changesPercentage}%)`;
  }
}

function getChangesColor(changes) {
  return changes < 0 ? "red" : "green";
}

function replaceBrokenImage(image) {
  image.onerror = function () {
    image.src =
      "https://cdn0.iconfinder.com/data/icons/money-exchange-3/106/money-currency-bank-256.png";
  };
}
