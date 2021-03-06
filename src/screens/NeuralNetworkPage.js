import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';
import displayRelativeTimeFromNow from '../utilities/dateHelper';
import createURL from '../utilities/createURL';

export default function NeuralNetworkPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocationId, experiment, setExperiment, locationName } =
    useContext(LocationContext);
  const [relativeDate, setRelativeDate] = useState('');

  useEffect(() => {
    if (selectedLocationId) {
      API.get(`locations/${selectedLocationId}/sensors/`)
        .then((res) => setSensorsLocation(res.data))
        .catch(window.console.error);

      API.get(`/locations/${selectedLocationId}/experiments/`)
        .then((res) =>
          setExperiment({
            ...res.data,
            url: {
              neuralNetworkLog: createURL(res.data.neuralNetworkLog),
            },
          })
        )
        .catch(window.console.error);
    }
  }, [selectedLocationId]);

  useEffect(() => {
    if (experiment.timestamp) {
      setRelativeDate(
        displayRelativeTimeFromNow(new Date(experiment.timestamp))
      );
    }
  }, [experiment]);

  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      {locationName.length ? (
        <>
          <p>
            Last experiment: {relativeDate} -{' '}
            {new Date(experiment.timestamp).toLocaleString('fr-FR')}
          </p>
          <h3>Sensors Map {locationName} </h3>
          <Map pins={sensorsLocation} />
          <a
            className="download"
            href={experiment?.url?.neuralNetworkLog}
            target="_blank"
            rel="noreferrer"
          >
            Get Neural Network Logs
          </a>
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
