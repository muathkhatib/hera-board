const getKeys = (obj) => Object.keys(obj).filter((e) => e !== "columns");

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const getValueOfKey = (obj, array) => {
  const value = array.map((e) => {
    return obj[e];
  });
  return value;
};

const chartsHandler = (id, style, data, columnKey) => {
  const dataList = data.map((e) => {
    const columns = e[columnKey];
    const data = Object.keys(e)
      .filter((item) => item !== columnKey)
      .map((key) => e[key]);
    const color = randomColor();

    return {
      label: columns,
      data,
      borderColor: color,
    };
  });
  console.log({ dataList: dataList[0] });

  const chart = new Chart(id, {
    type: style,
    data: {
      labels: data.columns.slice(1).map((e) => {
        const date = new Date(e);
        const result = date.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
        });
        return result;
      }),
      datasets: dataList,
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

d3.csv("./assets/data/InstallAppvsUserActuallySignedUp.csv")
  .then((data) => chartsHandler("installs", "line", data, "series"))
  .catch(console.error);

d3.csv("./assets/data/Past30DaysNearbyHealthCenters.csv").then((data) =>
  chartsHandler("nearby-health-centers", "line", data, "City")
);

function countIni(id, startNum, endNum, labels, data) {
  if (endNum) {
    let nSecond = 2,
      resolutionMS = 33,
      deltaNum = (endNum - startNum) / (1000 / resolutionMS) / nSecond;

    const handle = setInterval(() => {
      let x = startNum.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      document.querySelector("#number").innerHTML = x.toString();

      // if already updated the endNum, stop
      if (startNum >= endNum) clearInterval(handle);

      startNum += deltaNum;
      startNum = Math.min(startNum, endNum);
    }, resolutionMS);
  }

  const totalRemindersChart = new Chart(id, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "rgb(245,108,155)",
            "rgb(234,85,66)",
            "rgb(239,155,31)",
            "rgb(189,207,47)",
            "rgb(60,174,238)",
            "rgb(181,62,199)",
          ],
        },
      ],
    },

    options: {
      responsive: true,
    },
  });
}
// Did not answer

countIni("total-reminders", 0, 321, ["Total Number Of Reminders"], ["321"]);
countIni(
  "response-to-checkup",
  0,
  321,
  [
    "Did not answer",
    "Answered Yes to everything",
    "Answered No to everything",
    "Did not read any notifications",
    "Read all notifications",
  ],
  ["377", "21", "11", "385", "11"]
);

// people-reached-emergency
d3.csv("./assets/data/Past30DaysEmergencyCall.csv").then((data) =>
  chartsHandler("people-reached-emergency", "line", data, "City")
);

//health-tips-news
d3.csv("./assets/data/Past30DaysHealthTipsNews.csv").then((data) =>
  chartsHandler("health-tips-news", "line", data, "City")
);

// days-health-records
d3.csv("./assets/data/Past30DaysHealthRecords.csv").then((data) =>
  chartsHandler("days-health-records", "line", data, "series")
);
