function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const symbol = getUrlParameter("symbol");

async function getCompanyData(symbol) {
  try {
    const getCompanyURL = baseURL + `company/profile/${symbol}`;
    const response = await fetch(getCompanyURL);
    const data = await response.json();
    displayCompanyData(data);
    listKeyCompanyData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayCompanyData(data) {
  const {
    companyName,
    image,
    website,
    price,
    changes,
    changesPercentage,
    description,
    currency,
  } = data.profile;
  const symbol = data.symbol;

  const textElement = document.createElement("p");
  const symbolElement = document.createElement("span");
  const linkElement = document.createElement("a");
  const imageElement = document.createElement("img");
  const descrElement = document.createElement("p");

  replaceBrokenImage(imageElement);
  linkElement.setAttribute("href", `${website}`);
  imageElement.setAttribute("src", `${image}`);

  const changesElement = document.createElement("p");
  changesElement.textContent = formatChanges(changes, changesPercentage);
  changesElement.classList.add(getChangesColor(changes));

  linkElement.textContent = companyName;
  symbolElement.textContent = `(${symbol})`;
  textElement.textContent = ` $${price} ${currency}`;
  descrElement.textContent = description;

  companyDescription.append(imageElement, descrElement);
  companyNameElement.append(linkElement, symbolElement);
  companyPriceElement.append(textElement, changesElement);
}

function listKeyCompanyData(data) {
  const {
    exchangeShortName,
    sector,
    industry,
    country,
    ipoDate,
    mktCap,
    volAvg,
  } = data.profile;

  const dataArr = [
    { name: "Exchange", value: exchangeShortName },
    { name: "Sector", value: sector },
    { name: "Industry", value: industry },
    { name: "Country", value: country },
    { name: "IPO Date", value: ipoDate },
    { name: "Market Cap", value: mktCap },
    { name: "Average Volume", value: volAvg },
  ];

  dataArr.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}: ${item.value}`;
    listCompanyData.appendChild(listItem);
  });
}

getCompanyData(symbol);
