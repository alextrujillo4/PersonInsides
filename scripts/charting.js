var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ["Apertura a Experimentar", "Responsabilidad", "Extrovertido", "Cordialidad", "Estado Emocional"],
        datasets: [{
            label: 'Personalidad',
            data: [12, 19, 8, 10, 13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx = document.getElementById("myChart_2").getContext('2d');
var myChart_2 = new Chart(ctx, {
    type: 'line',
    showLines: true,
    data: {
        labels: [-100, 0, 100],
        datasets: [{
            label: 'Personalidad',
            data: [12, 19, 8, 10, 13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx = document.getElementById("myChart_3").getContext('2d');
var myChart_3 = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Apertura a Experimentar", "Responsabilidad", "Extrovertido", "Cordialidad", "Estado Emocional"],
        datasets: [{
            label: 'Personalidad',
            data: [12, 19, 8, 10, 13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

// SQUARE CHART STARTS //

Highcharts.chart('container2', {
    series: [{
        type: "treemap",
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                    textShadow: 'none'
                }
            }
        }],
        data: [{
            id: 'A',
            name: 'Conservador',
            color: "#009688"
        }, {
            id: 'B',
            name: 'Apertura al Cambio',
            color: "#2196F3"
        }, {
            id: 'C',
            name: 'Hedonismo',
            color: '#EC9800'
        }, {
            id: 'D',
            name: 'Mejoramiento Autónomo',
            color: '#F44336'
        }, {
            id: 'E',
            name: 'Trascender',
            color: '#8BC34A'
        }, {
            parent: 'A',
            name: 50 + "<h1>%</h1>",
            value: 50
        }, {
            parent: 'B',
            name: 30 + "<h1>%</h1>",
            value: 30
        }, {
            parent: 'C',
            name: 40 + "<h1>%</h1>",
            value: 40
        }, {
            parent: 'D',
            name: 40 + "<h1>%</h1>",
            value: 40
        }, {
            parent: 'E',
            name: 100 + "<h1>%</h1>",
            value: 100
        }]
    }],
    title: {
        text: 'Valores'
    }
});

// SQUARE CHARTS ENDS //

// BUBBLE CHARTS STARTS //

Highcharts.chart('container3', {

  chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy'
  },

  legend: {
    enabled: false
  },

  title: {
    text: 'Necesidades'
  },

  xAxis: {
    gridLineWidth: 0,
    tickColor: 'white',
    title: null,
    labels: {
      enabled: false
    },
  },

  yAxis: {
    gridLineWidth: 0,
    startOnTick: false,
    endOnTick: false,
    title: null,
    labels: {
      enabled: false
    },
    maxPadding: 0.2,
  },

  tooltip: {
    useHTML: true,
    headerFormat: '<table>',
    pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
      '<tr><th></th><td>{point.z}%</td></tr>',
    footerFormat: '</table>',
    followPointer: true
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },

  series: [{
    data: [
      { x: 65, y: 125, z: .19, name: 'Retos', country: 'Retos', color: '#FF5722' },
      { x: 74.5, y: 102.9, z: .14, name: 'Reservarse', country: 'Reservarse', color: '#FF9800'},
      { x: 72.8, y: 91.5, z: .25, name: 'Curiosidad', country: 'Curiosidad', color: '#E91E63'},
      { x: 70.4, y: 120.5, z: .42, name: 'Emoción', country: 'Emoción', color: '#FFEB3B'},
      { x: 73.3, y: 55.1, z: .81, name: 'Armonía', country: 'Armonía', color: '#673AB7'},
      { x: 69.4, y: 69.1, z: .96, name: 'Ideales', country: 'Ideales', color: '#8BC34A'},
      { x: 66.2, y: 48.5, z: .14, name: 'Libertad', country: 'Libertad', color: '#4CAF50'},
      { x: 66.5, y: 86.1, z: .70, name: 'Amor', country: 'Amor', color: '#009688'},
      { x: 63, y: 93.2, z: .24, name: 'Práctico', country: 'Práctico', color: '#00BCD4'},
      { x: 63.2, y: 57.6, z: .60, name: 'Expresivo', country: 'Expresivo', color: '#9C27B0'},
      { x: 60.6, y: 30, z: .46, name: 'Estabilidad', country: 'Estabilidad', color: '#2196F3'},
      { x: 61.5, y: 126.4, z: .95, name: 'Estructura', country: 'Estructura', color: '#3F51B5'},
    ]
  }]

});

// BUBBLE CHARTS ENDS //
