import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';

import LocationDropDown from '../components/LocationDropDown';
import DataAssimilationLink from '../components/DataAssimilationLink';

export default function NeuralNetworkPage() {
  const { selectedLocation } = useContext(LocationContext);
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
        style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
      >
        Download Neural Network Logs
      </Link>
      <Link
        className="download"
        to={pathToLog}
        target="_blank"
        download
        style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
      >
        Download Neural Network Logs
      </Link>
      <DataAssimilationLink />
    </>
  );
}
