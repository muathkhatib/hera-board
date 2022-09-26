const getKeys = (obj) => Object.keys(obj).filter((e) => e !== 'columns');

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;


const getValueOfKey = (obj, array) => {
    const value = array.map((e) => {
        return obj[e]
    })
    return value
}

const chartsHandler = (id, style, data, columnKey) => {

    const dataList = data.map((e) => {
        const columns = e[columnKey];
        const data = Object.keys(e).filter(item => item !== columnKey).map((key) => e[key]);
        const color = randomColor()

        return {
            label: columns,
            data,
            borderColor: color,
        }
    })

    const chart = new Chart(id, {
        type: style,
        data: {
            labels: data.columns.slice(1).map(e => {
                const date = new Date(e);
                const result = date.toLocaleString('en-US', { month: 'short', day: '2-digit' });
                return result
            }),
            datasets: dataList,
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',

                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                },
            }
        },
    })
}



d3.csv('./assets/data/InstallAppvsUserActuallySignedUp.csv')
    .then(data => chartsHandler('installs', 'line', data, 'series'))
    .catch(console.error);

d3.csv('./assets/data/Past30DaysNearbyHealthCenters.csv')
    .then(data => chartsHandler('nearby-health-centers', 'line', data, "City"));




let startNum = 0,
    endNum = 321,
    nSecond = 2,
    resolutionMS = 33,
    deltaNum = (endNum - startNum) / (1000 / resolutionMS) / nSecond;

function countIni() {

    const totalRemindersChart = new Chart('total-reminders', {
        type: 'doughnut',
        data: {
            labels: ['Total Number Of Reminders'],
            datasets: [{
                data: ['321'],
                backgroundColor: 'pink'
            }]
        },
        options: {
            responsive: true
        },
    });

    var handle = setInterval(() => {

        var x = startNum.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        document.querySelector('#number').innerHTML = x.toString();

        // if already updated the endNum, stop
        if (startNum >= endNum) clearInterval(handle);

        startNum += deltaNum;
        startNum = Math.min(startNum, endNum);
    }, resolutionMS);


}


countIni();


// people-reached-emergency
d3.csv('./assets/data/Past30DaysEmergencyCall.csv')
    .then(data => chartsHandler('people-reached-emergency', 'line', data, "City"));

//health-tips-news
d3.csv('./assets/data/Past30DaysHealthTipsNews.csv')
    .then(data => chartsHandler('health-tips-news', 'line', data, "City"));