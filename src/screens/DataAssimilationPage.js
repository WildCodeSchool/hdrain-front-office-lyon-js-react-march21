import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import LocationDropDown from '../components/LocationDropDown';
import AssimilationInfos from '../components/AssimilationInfos';
import API from '../APIClient';
import Map from '../components/Map';

export default function DataAssimilationPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);

  useEffect(() => {
    API.get('http://localhost:5000/sensors')
      .then((response) => response.data)
      .then((data) => {
        setSensorsLocation(data);
      });
  }, []);

  const { selectedLocation, selectedLocationId, isParamsEmpty } =
    useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [showParams, setShowParams] = useState(false);
  const [locationParams, setLocationParams] = useState(['None']);

  const assimilationParams = [
    {
      location: 'Abidjan',
      NX: 120,
      NY: 300,
      theta: 0.9,
    },
    {
      location: 'Antibes',
      NX: 180,
      NY: 192,
      theta: 0.5,
    },
    {
      location: 'Toulouse',
      NX: 150,
      NY: 250,
      theta: 0.8,
    },
  ];

  useEffect(() => {
    if (selectedLocation === 'None') {
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

  return (
    <>
      <h2>Data Assimilation</h2>
      <LocationDropDown />
      {showParams ? (
        <>
          <AssimilationInfos
            assimilationParams={locationParams}
            show={showParams}
          />
          <Map pins={sensorsLocation} />
        </>
      ) : (
        ''
      )}
      <div className="download-links">
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={
            selectedLocationId === 'None' || isParamsEmpty
              ? { pointerEvents: 'none' }
              : null
          }
        >
          Download Global Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={
            selectedLocationId === 'None' || isParamsEmpty
              ? { pointerEvents: 'none' }
              : null
          }
        >
          Download Data Assimilation Logs
        </Link>
      </div>
      <Link
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        className="link"
        style={
          selectedLocationId === 'None' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Neural Network
      </Link>
    </>
  );
}
