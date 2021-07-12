import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';
import AssimilationInfos from '../components/AssimilationInfos';
import displayRelativeTimeFromNow from '../components/dateHelper';
import API from '../APIClient';

export default function DataAssimilationPage() {
  const { selectedLocation, selectedLocationId, experiment, setExperiment } =
    useContext(LocationContext);

  const [showParams, setShowParams] = useState(false);
  const [locationParams, setLocationParams] = useState(['None']);
  const [relativeDate, setRelativeDate] = useState('');

  const assimilationParams = [
    {
      location: 'Abidjan',
    },
    {
      location: 'Antibes',
    },
    {
      location: 'Toulouse',
    },
  ];

  useEffect(() => {
    if (!selectedLocation) {
      setShowParams(false);
    } else {
      setLocationParams(
        assimilationParams.filter(
          ({ location }) => location === selectedLocation
        )
      );
      setShowParams(true);
    }
  }, [selectedLocation]);

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
      <p>Last experiment: {relativeDate}</p>
      {showParams ? (
        <>
          <AssimilationInfos
            assimilationParams={locationParams}
            show={showParams}
          />
        </>
      ) : null}
      <Link
        className="download"
        to={experiment?.assimilationLog || ''}
        target="_blank"
        download
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Get Data Assimilation Logs
      </Link>
      <Link
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        className="link"
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Neural Network
      </Link>
    </>
  );
}
