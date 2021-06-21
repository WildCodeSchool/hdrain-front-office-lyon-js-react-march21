import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';

export default function NeuralNetworkPage() {
  const { selectedLocationId } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  return (
    <>
      <h2>Neural Network</h2>
      <LocationDropDown />
      <br />
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
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Assimilation Page
      </Link>
    </>
  );
}
