import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import rainMap from '../assets/rainmap.png';
import API from '../APIClient';
import Map from '../components/Map';
import LocationDropDown from '../components/LocationDropDown';

export default function HistoryPage() {
  const { selectedLocationId, selectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const [parameters, setParameters] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [sensorsLocation] = useState([]);
  const coeff = 1000 * 60 * 5;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `0${date.getDate()}`.slice(-2);
  const formattedHours = `0${date.getHours()}`.slice(-2);
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  const roundedMinutes = `0${rounded.getMinutes()}`.slice(-2);
  const formattedDate = `${year}-${month}-${day}T${formattedHours}:${roundedMinutes}:00`;
  console.log(day, formattedHours);

  useEffect(() => {
    if (selectedLocation !== 'None' && date !== null) {
      setIsEnabled(true);
      history.push(
        `${location.pathname}?locationId=${selectedLocationId}&timestamp=${formattedDate}`
      );

      API.get(
        `/locations/${selectedLocationId}/experiments/?timestamp=${formattedDate}`
      )
        .then((res) => {
          setParameters(res.data);
        })

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
        <>
          {!!parameters.length &&
            parameters.map((parameter) => (
              <ul>
                <li>assimilation: {parameter.assimilationLog}</li>
                <li>neuralNetwork: {parameter.neuralNetworkLog}</li>
                <li>parameters: {parameter.parameters}</li>
                <li>raingraph: {parameter.rainGraph}</li>
                <li>costGraph: {parameter.rainGraph}</li>
              </ul>
            ))}
        </>
        <h3>Sensor map</h3>
        {isEnabled && <Map pins={sensorsLocation} />}
        <h3>Rain map</h3>
        {isEnabled && <img src={rainMap} alt="rainMap" />}
      </div>
      <div className="download-links">
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
