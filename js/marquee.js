class Marquee {
  constructor(marqueeURL, start, end) {
    this.marqueeURL = marqueeURL;
    this.start = start;
    this.end = end;
  }

  static async fetchData(marqueeURL) {
    try {
      const response = await fetch(marqueeURL);
      const data = await response.json();
      const companies = data.map((company) => ({
        symbol: company.symbol,
        price: company.price,
      }));
      const filteredData = companies.filter((data) => data !== null);
      Marquee.data = filteredData;
    } catch (error) {
      console.log(error);
    }
  }

  createMarqueeElements() {
    const companies = Marquee.data.slice(this.start, this.end);
    const marqueeText = document.createElement("div");
    marqueeText.classList.add("marquee-text");
    marqueeText.classList.add("rainbow-letters");
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
    console.log(marqueeChild);
    await Marquee.fetchData(this.marqueeURL);
    for (let i = 0; i < 6; i++) {
      const marqueeChildren = document.createElement("span");
      const start = i * 20;
      const end = (i + 1) * 500;
      const marquee = new Marquee(this.marqueeURL, start, end);
      const marqueeText = marquee.createMarqueeElements();
      const randomPadding = Math.floor(Math.random() * 1) + 2;
      marqueeText.style.paddingLeft = `${randomPadding}px`;
      console.log(marqueeText);
      console.log(marqueeChild);
      marqueeChildren.append(marqueeText);
      marqueeChild.appendChild(marqueeChildren);
    }
    marqueeElement.appendChild(marqueeChild);
  }
}

const marquee = new Marquee(marqueeURL, 0, 500);
marquee.marqueeLoop();
