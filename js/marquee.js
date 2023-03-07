class Marquee {
  constructor(marqueeElement) {
    this.marqueeElement = marqueeElement;
    this.data = [];
  }

  async fetchData() {
    try {
      const marqueeURL = baseURL + "stock/list";
      const response = await fetch(marqueeURL);
      const data = await response.json();
      const companies = data.map((company) => ({
        symbol: company.symbol,
        price: company.price,
      }));
      const filteredData = companies.filter((data) => data !== null);
      this.data = filteredData;
    } catch (error) {
      console.log(error);
    }
  }

  createMarqueeElements(start, end) {
    const marqueeText = document.createElement("div");
    marqueeText.classList.add("marquee-text");
    marqueeText.classList.add("marquee-letters");

    const companies = this.data.slice(start, end);
    companies.forEach((company) => {
      Object.values(company).forEach((value) => {
        const textElement = document.createElement("span");
        textElement.textContent = ` ${value} `;
        marqueeText.appendChild(textElement);
      });
    });

    return marqueeText;
  }

  async marqueeLoop() {
    const marqueeChild = document.createElement("div");
    await this.fetchData();
    for (let i = 0; i < 3; i++) {
      const marqueeChildren = document.createElement("span");
      const start = i * 10;
      const end = (i + 1) * 500;
      const marqueeText = this.createMarqueeElements(start, end);
      const randomPadding = Math.floor(Math.random() * 1) + 2;
      marqueeText.style.paddingLeft = `${randomPadding}px`;
      marqueeChildren.append(marqueeText);
      marqueeChild.appendChild(marqueeChildren);
    }
    this.marqueeElement.appendChild(marqueeChild);
  }
}
