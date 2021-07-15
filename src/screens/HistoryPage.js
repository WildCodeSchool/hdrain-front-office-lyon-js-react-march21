/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import Map from '../components/Map';
import RainMap from '../components/RainMap';
import LocationDropDown from '../components/LocationDropDown';
import displayRelativeTimeFromNow from '../utilities/dateHelper';
import createURL from '../utilities/createURL';

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
        .then(({ data }) => {
          const augmentedExperiment = {
            ...data,
            url: {
              neuralNetwork: createURL(data.neuralNetwork),
              costGraph: createURL(data.costGraph),
              parameters: createURL(data.parameters),
              assimilationLog: createURL(data.assimilationLog),
            },
          };
          setExperiment(augmentedExperiment);
        })
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
            <a
              className="download"
              target="_blank"
              rel="noreferrer"
              href={experiment?.url?.neuralNetwork}
            >
              Get Neural Network Log
            </a>
            <a
              className="download"
              target="_blank"
              rel="noreferrer"
              href={experiment?.url?.assimilationLog}
            >
              Get Assimilation Log
            </a>
            <a
              className="download"
              href={experiment?.url?.parameters}
              target="_blank"
              rel="noreferrer"
            >
              Get assimilation parameters
            </a>
            <a
              className="download"
              href={experiment?.url?.costGraph}
              target="_blank"
              rel="noreferrer"
            >
              Get assimilation costs
            </a>
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
