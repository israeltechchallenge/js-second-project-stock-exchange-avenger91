const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;
const ctx = document.getElementById("canvas").getContext("2d");

const getHistoricalData = async () => {
  const response = await fetch(stockHistoryURL);
  const data = await response.json();

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(1, " rgba(255,192,203,0.8");

  length = data.historical.length;
  labels = [];
  values = [];
  for (i = 0; i < length; i += 50) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  labels.sort((a, b) => new Date(a) - new Date(b));

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close",
          data: values,
          fill: true,
          borderColor: "grey",
          borderWidth: 1,
          backgroundColor: gradient,
          pointRadius: 1,
        },
      ],
    },

    options: {
      responsive: true,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });
};

getHistoricalData();
