const ctx = document.getElementById("canvas").getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;

async function getHistoricalData() {
  const response = await fetch(stockHistoryURL);
  const data = await response.json();
  console.log(data);
  length = data.historical.length;

  labels = [];
  values = [];
  for (i = 0; i < length; i += 50) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  labels = labels.reverse();
  values = values.reverse();

  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(1, " rgba(255,192,203,0.8");

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
