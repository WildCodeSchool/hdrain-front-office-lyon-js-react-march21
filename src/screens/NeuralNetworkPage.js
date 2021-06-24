import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';

export default function NeuralNetworkPage() {
  // eslint-disable-next-line no-unused-vars
  const [sensorsLocation, setSensorsLocation] = useState([]);

  useEffect(() => {
    API.get('http://localhost:5000/sensors')
      .then((response) => response.data)
      .then((data) => {
        setSensorsLocation(data);
      });
  }, []);
  const { selectedLocationId, isParamsEmpty } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      <br />
      <Map pins={sensorsLocation} />
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
        Download Neural Network Logs
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
        Download Neural Network Logs
      </Link>
      <Link
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        className="link"
        style={
          selectedLocationId === 'None' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Data Assimilation
      </Link>
    </>
  );
}
