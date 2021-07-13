import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import graphOptions from './graphHelper';

export default function RainGraph({
  inputDampening = [1, 2, 3, 4, 5, 6, 7, 8],
  inputRain = [9, 8, 7, 6, 5, 4, 3, 2],
  inputTime = [
    new Date(2021, 5, 15).toLocaleDateString(),
    new Date(2021, 5, 16).toLocaleDateString(),
    new Date(2021, 5, 17).toLocaleDateString(),
    new Date(2021, 5, 18).toLocaleDateString(),
    new Date(2021, 5, 19).toLocaleDateString(),
    new Date(2021, 5, 20).toLocaleDateString(),
    new Date(2021, 5, 21).toLocaleDateString(),
    new Date(2021, 5, 22).toLocaleDateString(),
  ],
}) {
  const [chartOptions, setChartOptions] = useState(graphOptions);

  const setChartData = (dampening, rain, time) =>
    setChartOptions((previousOptions) => ({
      ...previousOptions,
      xAxis: [
        {
          categories: time,
        },
      ],
      series: [
        {
          ...previousOptions.series[0],
          data: dampening,
        },
        { ...previousOptions.series[1], data: rain },
      ],
    }));

  useEffect(() => {
    setChartData(inputDampening, inputRain, inputTime);
  }, []);

  return (
    <>
      <h3>Cost Graph</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
}
