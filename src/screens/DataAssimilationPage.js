import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';
import CostGraph from '../components/CostGraph';
import RainMap from '../components/RainMap';
import displayRelativeTimeFromNow from '../utilities/dateHelper';
import API from '../APIClient';
import createURL from '../utilities/createURL';

export default function DataAssimilationPage() {
  const { selectedLocationId, experiment, setExperiment, locationName } =
    useContext(LocationContext);

  const [relativeDate, setRelativeDate] = useState('');

  useEffect(() => {
    if (selectedLocationId) {
      API.get(`/locations/${selectedLocationId}/experiments/`)
        .then((res) =>
          setExperiment({
            ...res.data,
            url: {
              assimilationLog: createURL(res.data.assimilationLog),
            },
          })
        )
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

  useEffect(() => {
    if (experiment.timestamp) {
      setRelativeDate(
        displayRelativeTimeFromNow(new Date(experiment.timestamp))
      );
    }
  }, [experiment]);

  return (
    <>
      <h2>Data Assimilation</h2>
      <LocationDropDown />
      {locationName.length ? (
        <>
          <p>Last experiment: {relativeDate}</p>
          {experiment.parameters}
          <CostGraph />
          <RainMap />
          <a
            className="download"
            href={experiment?.url?.assimilationLog || ''}
            target="_blank"
            rel="noreferrer"
          >
            Get Data Assimilation Logs
          </a>
          <Link
            to={`/neuralNetwork?locationId=${selectedLocationId}`}
            className="link"
          >
            Go to Neural Network
          </Link>
        </>
      ) : null}
    </>
  );
}
