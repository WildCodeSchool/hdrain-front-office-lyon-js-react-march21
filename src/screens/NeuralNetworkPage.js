import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';
import RainGraph from '../components/RainGraph';

export default function NeuralNetworkPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocationId } = useContext(LocationContext);

  useEffect(() => {
    API.get(`locations/${selectedLocationId}/sensors/`)
      .then((response) => response.data)
      .then((data) => {
        setSensorsLocation(data);
      });
  }, [selectedLocationId]);

  const [pathToLog] = useState(asset);

  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      <Map pins={sensorsLocation} />
      <RainGraph />
      <Link
        className="download"
        to={pathToLog}
        target="_blank"
        download
        style={
          !selectedLocationId || selectedLocationId === 'None'
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
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Data Assimilation
      </Link>
    </>
  );
}
