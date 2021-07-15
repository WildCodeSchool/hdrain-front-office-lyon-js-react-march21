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

const formatDate = (date) => {
  // Round to 5 minutes
  const coeff = 1000 * 60 * 5;
  return new Date(Math.round(date.getTime() / coeff) * coeff).toISOString();
};

export default function HistoryPage() {
  const { selectedLocationId, experiment, setExperiment, locationName } =
    useContext(LocationContext);
  const [date, setDate] = useState(new Date(2021, 5, 12, 18, 45));
  const location = useLocation();
  const history = useHistory();
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const [relativeDate, setRelativeDate] = useState('');
  const formattedDate = formatDate(date);

  useEffect(() => {
    if (selectedLocationId) {
      history.push(
        `${location.pathname}?locationId=${selectedLocationId}&timestamp=${formattedDate}`
      );

      API.get(
        `/locations/${selectedLocationId}/experiments/?timestamp=${formattedDate}`
      )
        .then((res) => setExperiment(res.data))
        .then(() => {
          if (experiment.timestamp) {
            setRelativeDate(
              displayRelativeTimeFromNow(new Date(experiment?.timestamp))
            );
          }
        })
        .catch(window.console.error);

      API.get(
        `locations/${selectedLocationId}/sensors/?timestamp=${formattedDate}`
      )
        .then((res) => setSensorsLocation(res.data))
        .catch(window.console.error);
    }
  }, [formattedDate, selectedLocationId]);

  useEffect(() => {
    if (experiment.timestamp) {
      setRelativeDate(
        displayRelativeTimeFromNow(new Date(experiment.timestamp))
      );
    }
  }, [experiment]);

  return (
    <>
      <h2>History</h2>
      <div className="dateAndPlacePicker">
        <div className="placePicker">
          <LocationDropDown />
        </div>
        <div className="datePicker">
          <p>Select a timestamp</p>
          <DateTimePicker
            onChange={setDate}
            value={date}
            disabled={
              !selectedLocationId || parseInt(selectedLocationId, 10) === 0
            }
          />
        </div>
      </div>
      {locationName.length ? (
        <>
          <p>Selected experiment was: {relativeDate}</p>
          <div className="maps">
            <h3>Sensors Map {locationName}</h3>
            <Map pins={sensorsLocation} />
            <RainMap />
          </div>
          <div className="download-links">
            <Link
              className="download"
              to={experiment?.neuralNetworkLog}
              target="_blank"
              download
            >
              Get Neural Network Log
            </Link>
            <Link
              className="download"
              to={experiment?.assimilationLog}
              target="_blank"
              download
            >
              Get Assimilation Log
            </Link>
            <Link
              className="download"
              to={experiment?.parameters}
              target="_blank"
              download
            >
              Get assimilation parameters
            </Link>
            <Link
              className="download"
              to={experiment?.costGraph}
              target="_blank"
              download
            >
              Get assimilation costs
            </Link>
          </div>
          <Link
            to={`/neuralNetwork?locationId=${selectedLocationId}`}
            className="link"
          >
            Go to Neural Network
          </Link>
          <Link
            to={`/assimilation?locationId=${selectedLocationId}`}
            className="link"
          >
            Go to Data Assimilation
          </Link>
        </>
      ) : null}
    </>
  );
}
