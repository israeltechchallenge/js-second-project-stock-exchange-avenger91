const colors = {
  purple: {
    default: "rgba(168, 80, 255, 1)",
    half: "rgba(168, 80, 255, 0.8)",
    quarter: "rgba(168, 80, 255, 0.45)",
    zero: "rgba(168, 80, 255, 0.1)",
  },
};

const ctx = document.getElementById("canvas").getContext("2d");
const gradient = ctx.createLinearGradient(0, 25, 0, 300);
const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;

async function getHistoricalData() {
  const response = await fetch(stockHistoryURL);
  const data = await response.json();
  length = data.historical.length;

  labels = [];
  values = [];
  for (i = 0; i < length; i += 50) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  labels = labels.reverse();
  values = values.reverse();

  gradient.addColorStop(0, colors.purple.default);
  gradient.addColorStop(0.3, colors.purple.half);
  gradient.addColorStop(0.5, colors.purple.quarter);
  gradient.addColorStop(1, colors.purple.zero);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close",
          data: values,
          fill: true,
          backgroundColor: gradient,
          borderColor: "white",
          borderWidth: 1,
          pointRadius: 0,
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
            scaleLabel: {
              display: true,
              labelString: "Closing Price",
              fontSize: 16,
            },
          },
        ],
      },
    },
  });
}
getHistoricalData();
