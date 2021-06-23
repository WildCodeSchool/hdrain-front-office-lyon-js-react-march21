import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';

export default function RainGraph() {
  const [chartOptions] = useState({
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
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Atténuation (dB)',
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
  });

  // setChartOptions(() => ({ ...data }));

  return (
    <>
      <h3>Rain Graph</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
}
