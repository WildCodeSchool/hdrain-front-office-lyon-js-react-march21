import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';
import CostGraph from '../components/CostGraph';
import RainMap from '../components/RainMap';
import displayRelativeTimeFromNow from '../components/dateHelper';
import API from '../APIClient';

export default function DataAssimilationPage() {
  const { selectedLocationId, experiment, setExperiment } =
    useContext(LocationContext);

  const [assimilationParams, setAssimilationParams] = useState([]);
  const [relativeDate, setRelativeDate] = useState('');

  useEffect(() => {
    if (selectedLocationId) {
      API.get(`/locations/${selectedLocationId}/experiments/`)
        .then((res) => setAssimilationParams(res.data))
        .catch(window.console.error);
    }
  }, [selectedLocationId]);

  useEffect(() => {
    if (selectedLocationId) {
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

  return (
    <>
      <h2>Data Assimilation</h2>
      <LocationDropDown />
      {Object.entries(experiment).length ? (
        <>
          <p>Last experiment: {relativeDate}</p>
          {assimilationParams.parameters}
          <CostGraph />
          <RainMap />
          <Link
            className="download"
            to={experiment?.assimilationLog || ''}
            target="_blank"
            download
          >
            Get Data Assimilation Logs
          </Link>
          <Link
            to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
            className="link"
          >
            Neural Network
          </Link>
        </>
      ) : null}
    </>
  );
}
