import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';
import RainGraph from '../components/RainGraph';
import displayRelativeTimeFromNow from '../components/dateHelper';

export default function NeuralNetworkPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocationId } = useContext(LocationContext);

  const { experiment, setExperiment } = useContext(LocationContext);

  useEffect(() => {
    API.get(`locations/${selectedLocationId}/sensors/`)
      .then((response) => setSensorsLocation(response.data))
      .catch(window.console.error);

    API.get(`/locations/${selectedLocationId}/experiments/`)
      .then((res) => setExperiment(res.data))
      .catch(window.console.error);
  }, [selectedLocationId]);

  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      <p>
        Last experiment:{' '}
        {displayRelativeTimeFromNow(new Date(experiment.timestamp))}
      </p>
      <Map pins={sensorsLocation} />
      <RainGraph />
      <Link
        className="download"
        to={experiment?.neuralNetworkLog}
        target="_blank"
        download
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Get Neural Network Logs
      </Link>
      <Link
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        className="link"
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Data Assimilation
      </Link>
    </>
  );
}
