async function getMarqueeData() {
  try {
    const marqueeURL = baseURL + "stock/list";
    const response = await fetch(marqueeURL);
    const data = await response.json();
    for (let i = 0; i < 10; i++) {
      const company = data[i];
      displayMarqueeData(company);
    }
    for (let i = 10; i < 30; i++) {
      const company = data[i];
      displayMarqueeData(company);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayMarqueeData(company) {
  const symbol = company.symbol;
  const price = company.price;
  const textElement = document.createElement("span");
  textElement.textContent = ` ${symbol} ${price} `;
  marqueeElement.appendChild(textElement);
}

getMarqueeData();
