import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState, useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import graphOptions from './graphHelper';

export default function CostGraph({
  inputJoNL = [1, 2, 3, 4, 5, 6, 7, 8],
  inputJblin = [9, 8, 7, 6, 5, 4, 3, 2],
  inputJlin = [19, 18, 17, 16, 15, 14, 13, 12],
  inputR = [39, 38, 37, 36, 35, 34, 33, 32],
}) {
  const [chartOptions, setChartOptions] = useState(graphOptions);
  const { locationName } = useContext(LocationContext);

  const setChartData = (JoNL, Jblin, Jlin, r) =>
    setChartOptions((previousOptions) => ({
      ...previousOptions,
      series: [
        {
          ...previousOptions.series[0],
          data: JoNL,
        },
        { ...previousOptions.series[1], data: Jblin },
        { ...previousOptions.series[2], data: Jlin },
        { ...previousOptions.series[3], data: r },
      ],
    }));

  useEffect(() => {
    setChartData(inputJoNL, inputJblin, inputJlin, inputR);
  }, []);

  return (
    <>
      <h3>Costs Graph {locationName}</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
}
