import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';
import RainGraph from '../components/RainGraph';

export default function NeuralNetworkPage() {
  const { selectedLocationId, isParamsEmpty } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  return (
    <>
      {/* Add props : inputDampening, inputRain, inputTime */}
      <h2>Neural Network</h2>
      <LocationDropDown />
      <RainGraph />
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
      </div>
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
