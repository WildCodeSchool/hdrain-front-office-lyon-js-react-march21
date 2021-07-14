import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';
import displayRelativeTimeFromNow from '../components/dateHelper';

export default function NeuralNetworkPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocationId, experiment, setExperiment, locationName } =
    useContext(LocationContext);
  const [relativeDate, setRelativeDate] = useState('');

  useEffect(() => {
    if (selectedLocationId) {
      API.get(`locations/${selectedLocationId}/sensors/`)
        .then((response) => setSensorsLocation(response.data))
        .catch(window.console.error);

      API.get(`/locations/${selectedLocationId}/experiments/`)
        .then((res) => setExperiment(res.data))
        .then(() => {
          if (experiment.timestamp) {
            setRelativeDate(
              displayRelativeTimeFromNow(new Date(experiment?.timestamp))
            );
          }
        })
        .catch(window.console.error);
    }
  }, [selectedLocationId]);
  console.log(setRelativeDate);
  console.log(displayRelativeTimeFromNow);
  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      {Object.entries(experiment).length ? (
        <>
          <p>Last experiment: {relativeDate}</p>
          <h3>Sensors Map - {locationName} </h3>
          <Map pins={sensorsLocation} />
          <Link
            className="download"
            to={experiment?.neuralNetworkLog || ''}
            target="_blank"
            download
          >
            Get Neural Network Logs
          </Link>
          <Link
            to={`/assimilation?locationId=${selectedLocationId}`}
            className="link"
          >
            Data Assimilation
          </Link>
        </>
      ) : null}
    </>
  );
}
