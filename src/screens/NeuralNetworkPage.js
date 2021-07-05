import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';
import RainGraph from '../components/RainGraph';

export default function NeuralNetworkPage() {
  const { selectedLocationId } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  return (
    <>
      {/* Add props : inputDampening, inputRain, inputTime */}
      <h2>Neural Network</h2>
      <LocationDropDown />
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
