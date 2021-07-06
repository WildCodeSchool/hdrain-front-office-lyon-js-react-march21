import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
// import rainMMap from '../assets/rainmap.png';
import Map from '../components/Map';
import RainMap from '../components/RainMap';

import LocationDropDown from '../components/LocationDropDown';
import API from '../APIClient';

export default function HistoryPage() {
  const { selectedLocationId, experiment, setExperiment } =
    useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const coeff = 1000 * 60 * 5;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `0${date.getDate()}`.slice(-2);
  const formattedHours = `0${date.getHours()}`.slice(-2);
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  const roundedMinutes = `0${rounded.getMinutes()}`.slice(-2);
  const formattedDate = `${year}-${month}-${day}T${formattedHours}:${roundedMinutes}:00`;

  useEffect(() => {
    if (selectedLocationId !== 'None' || selectedLocationId !== 'undefined') {
      setIsEnabled(true);
      history.push(
        `${location.pathname}?locationId=${selectedLocationId}&timestamp=${formattedDate}`
      );
      API.get(
        `/locations/${selectedLocationId}/experiments/?timestamp=${formattedDate}`
      )
        .then((res) => {
          setExperiment(res.data);
        })
        .catch(window.console.error);
    } else {
      setIsEnabled(false);
    }
  }, [formattedDate, selectedLocationId]);

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
      {selectedLocationId !== 'undefined' ? (
        <>
          <div className="maps">
            <>{!!Object.entries(experiment).length && <p>call works</p>}</>
            <h3>Sensors map</h3>
            {isEnabled && <Map />}
            <h3>Rain map</h3>
            {isEnabled && <RainMap />}
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
      ) : (
        <p>Please select one localisation</p>
      )}
    </>
  );
}
