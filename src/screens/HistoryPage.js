import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import Map from '../components/Map';
import RainMap from '../components/RainMap';
import LocationDropDown from '../components/LocationDropDown';
import displayRelativeTimeFromNow from '../components/dateHelper';

export default function HistoryPage() {
  const { selectedLocationId, experiment, setExperiment } =
    useContext(LocationContext);
  const [date, setDate] = useState(new Date(2021, 5, 12, 18, 45));
  const [isEnabled, setIsEnabled] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const coeff = 1000 * 60 * 5;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `0${date.getDate()}`.slice(-2);
  const formattedHours = `0${date.getHours()}`.slice(-2);
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  const roundedMinutes = `0${rounded.getMinutes()}`.slice(-2);
  const formattedDate = `${year}-${month}-${day}T${formattedHours}:${roundedMinutes}:00`;

  useEffect(() => {
    if (
      parseInt(selectedLocationId, 10) !== 0 &&
      selectedLocationId !== undefined
    ) {
      history.push(
        `${location.pathname}?locationId=${selectedLocationId}&timestamp=${formattedDate}`
      );

      API.get(
        `/locations/${selectedLocationId}/experiments/?timestamp=${formattedDate}`
      )
        .then((res) => setExperiment(res.data))
        .catch(window.console.error)
        .finally(setIsEnabled(true));

      API.get(
        `locations/${selectedLocationId}/sensors/?timestamp=${formattedDate}`
      )
        .then((res) => setSensorsLocation(res.data))
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
      {isEnabled ? (
        <>
          <p>
            Selected experiment was:{' '}
            {displayRelativeTimeFromNow(new Date(experiment.timestamp))}
          </p>
          <div className="maps">
            <>{!!Object.entries(experiment).length && <p>call works</p>}</>
            <h3>Sensors map</h3>
            <Map pins={sensorsLocation} />
            <h3>Rain map</h3>
            <RainMap />
          </div>
          <div className="download-links">
            <Link
              className="download"
              to={experiment?.neuralNetworkLog}
              target="_blank"
              download
              style={isEnabled ? null : { pointerEvents: 'none' }}
            >
              Get Neural Network Log
            </Link>
            <Link
              className="download"
              to={experiment?.assimilationLog}
              target="_blank"
              download
              style={isEnabled ? null : { pointerEvents: 'none' }}
            >
              Get Assimilation Log
            </Link>
            <Link
              className="download"
              to={experiment?.parameters}
              target="_blank"
              download
              style={isEnabled ? null : { pointerEvents: 'none' }}
            >
              Get assimilation parameters
            </Link>
            <Link
              className="download"
              to={experiment?.costGraph}
              target="_blank"
              download
              style={isEnabled ? null : { pointerEvents: 'none' }}
            >
              Get assimilation costs
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
