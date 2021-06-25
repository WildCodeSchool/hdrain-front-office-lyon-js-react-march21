/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import qs from 'query-string';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import rainMMap from '../assets/rainmap.png';
import Map from '../components/Map';
import LocationDropDown from '../components/LocationDropDown';
import API from '../APIClient';

export default function HistoryPage() {
  const { selectedLocationId, selectedLocation, setLocationId } =
    useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const [parameters, setParameters] = useState('');
  const location = useLocation();
  const history = useHistory();

  const coeff = 1000 * 60 * 5;
  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const day = `${date.getDate()}`.padStart(2, '0');
  // const hours = date.getHours();
  // const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  // const roundedMinutes = rounded.getMinutes();
  // const formattedDate = `${year}-${month}-${day}T${hours}:${roundedMinutes}:00`;
  // const datetest = new Date(2021, 6, 22, 15, 0).toString();
  // const datetest2 = new Date().toString();

  const roundedDate = new Date(
    date.getTime() + coeff - (date.getTime() % coeff)
  ).toString();

  // console.log(roundedtest);
  // console.log(datetest === date.toString());
  // console.log(datetest2 === date.toString());
  // const formattedDate2 = new Date(
  //   year,
  //   month,
  //   day,
  //   hours,
  //   roundedMinutes,
  //   0
  // ).toString();
  // console.log(formattedDate);
  // console.log(formattedDate2);
  // console.log(datetest);
  // console.log(datetest2);
  // console.log(date);

  const queryParams = qs.parse(location.search);
  console.log(queryParams);

  useEffect(() => {
    if (selectedLocation !== 'None' && date !== null) {
      setIsEnabled(true);
      history.push(
        `${location.pathname}?locationId=${selectedLocationId}&timestamp=${roundedDate}`
      );
      API.get(
        `/experiments?locationId=${selectedLocationId}&timestamp=${roundedDate}`
      )
        .then((res) => setParameters(res.data))
        .catch((err) => console.log(err));
    } else {
      setIsEnabled(false);
    }
  }, [date, selectedLocation]);

  return (
    <>
      <h2>History</h2>
      <div className="dateAndPlacePicker">
        <div className="placePicker">
          <LocationDropDown />
        </div>
        <div className="datePicker">
          <p>Select a timestamp</p>
          <DateTimePicker onChange={setDate} value={date} />
        </div>
      </div>
      <div className="maps">
        <h3>Log</h3>

        <h3>Sensor map</h3>
        {isEnabled && <Map />}
        <h3>Rain map</h3>
        {isEnabled && <img src={rainMMap} alt="rainMap" />}
      </div>
      <div>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get GLOBAL Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get Neural Network Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get Assimilation Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get assimilation parameters
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get assimilation costs
        </Link>
      </div>
    </>
  );
}
