import Highcharts from 'highcharts';

const graphOptions = {
  chart: {
    zoomType: 'xy',
  },
  title: {
    text: 'Rain Graph for Station XXX',
    align: 'center',
  },
  subtitle: {
    text: 'Station XXX mode NUV',
    align: 'center',
  },
  xAxis: [
    {
      categories: [
        new Date(2021, 5, 15).toLocaleDateString(),
        new Date(2021, 5, 16).toLocaleDateString(),
        new Date(2021, 5, 17).toLocaleDateString(),
        new Date(2021, 5, 18).toLocaleDateString(),
        new Date(2021, 5, 19).toLocaleDateString(),
        new Date(2021, 5, 20).toLocaleDateString(),
        new Date(2021, 5, 21).toLocaleDateString(),
        new Date(2021, 5, 22).toLocaleDateString(),
        new Date(2021, 5, 23).toLocaleDateString(),
        new Date(2021, 5, 24).toLocaleDateString(),
        new Date(2021, 5, 25).toLocaleDateString(),
        new Date(2021, 5, 26).toLocaleDateString(),
      ],
      crosshair: true,
      title: {
        text: 'Date',
      },
    },
  ],
  yAxis: [
    {
      // Primary yAxis
      gridLineWidth: 0,
      title: {
        text: 'Atténuation',
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      labels: {
        format: '{value} dB',
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
    },
    {
      // Secondary yAxis
      labels: {
        format: '{value}',
        style: {
          color: Highcharts.getOptions().colors[5],
        },
      },
      title: {
        text: 'Critère de Pluie / Non pluie',
        style: {
          color: Highcharts.getOptions().colors[5],
        },
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 80,
    verticalAlign: 'top',
    y: 55,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      'rgba(255,255,255,0.25)',
  },
  series: [
    {
      name: 'Atténuation',
      type: 'line',
      yAxis: 0,
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
      tooltip: {
        valueSuffix: ' dB',
      },
    },
    {
      name: 'Critère de Pluie',
      yAxis: 1,
      type: 'line',
      data: [
        7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
      ],
      tooltip: {
        valueSuffix: ' %',
      },
      color: Highcharts.getOptions().colors[5],
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            floating: false,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
          },
          yAxis: [
            {
              labels: {
                align: 'right',
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              labels: {
                align: 'left',
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              visible: false,
            },
          ],
        },
      },
    ],
  },
};

export default graphOptions;

// export function updateChartOptions(previousOptions) {
//   return {
//     ...previousOptions,
//     xAxis: [
//       {
//         categories: time,
//       },
//     ],
//     series: [
//       {
//         name: 'Atténuation',
//         type: 'line',
//         yAxis: 0,
//         data: dampening,
//         tooltip: {
//           valueSuffix: ' dB',
//         },
//       },
//       {
//         name: 'Critère de Pluie',
//         yAxis: 1,
//         type: 'line',
//         data: rain,
//         tooltip: {
//           valueSuffix: ' %',
//         },
//         color: Highcharts.getOptions().colors[5],
//       },
//     ],
//   };
// }