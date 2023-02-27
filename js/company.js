const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const symbol = getUrlParameter("symbol");

const getCompanyDataAsync = async () => {
  const data = await getCompanyData(symbol);
  if (data) {
    createCompanyElements(data);
    createCompanyList(data);
  }
};

const createCompanyElements = (data) => {
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
  const textElement = createPriceElement(price, currency);
  const symbolElement = createSymbolElement(symbol);
  const linkElement = createCompanyLinkElement(companyName, website);
  const imageElement = createImageElement(image);
  const descrElement = createDescriptionElement(description);
  const changesElement = createChangesElement(changes, changesPercentage);

  appendCompanyDescr(imageElement, descrElement);
  appendCompanyName(linkElement, symbolElement);
  appendCompanyPrice(textElement, changesElement);
};

const appendCompanyDescr = (imageElement, descrElement) => {
  const temporaryContainer = document.createDocumentFragment();
  temporaryContainer.append(imageElement, descrElement);
  companyDescription.append(temporaryContainer);
};

const appendCompanyName = (linkElement, symbolElement) => {
  const temporaryContainer = document.createDocumentFragment();
  temporaryContainer.append(linkElement, symbolElement);
  companyNameElement.append(temporaryContainer);
};

const appendCompanyPrice = (textElement, changesElement) => {
  const temporaryContainer = document.createDocumentFragment();
  temporaryContainer.append(textElement, changesElement);
  companyPriceElement.append(temporaryContainer);
};

const createCompanyList = (data) => {
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

  appendListFragments(dataArr);
};

const appendListFragments = (dataArr) => {
  const temporaryContainer = document.createDocumentFragment();
  for (const item of dataArr) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}: ${item.value}`;
    temporaryContainer.appendChild(listItem);
  }
  listCompanyData.appendChild(temporaryContainer);
};

getCompanyDataAsync();
