/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useToasts } from 'react-toast-notifications';
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
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

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
              neuralNetworkLog: createURL(data.neuralNetworkLog),
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
          <p>
            Selected experiment was: {relativeDate} -{' '}
            {new Date(experiment.timestamp).toLocaleString('fr-FR')}
          </p>
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
              href={experiment?.url?.neuralNetworkLog}
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
              href={experiment?.costGraph}
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
      <button
        type="button"
        id="btn"
        name="btn"
        className="btn sync"
        onClick={() => {
          setIsLoading(true);
          API.get('/sync')
            .then((res) => {
              addToast(res.data, {
                appearance: 'info',
                autoDismiss: true,
              });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
        style={isLoading ? { pointerEvents: 'none' } : null}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-refresh-cw"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </button>
    </>
  );
}
