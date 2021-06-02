import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import LocationDropDown from '../components/LocationDropDown';
import NeuralNetworkLink from '../components/NeuralNetworkLink';

export default function DataAssimilation() {
  const { selectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  return (
    <>
      <h2>Data Assimilation</h2>
      <LocationDropDown />
      <br />

      <br />
      <Link
        className="download"
        to={pathToLog}
        target="_blank"
        download
        style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
      >
        Download Global Log
      </Link>
      <Link
        className="download"
        to={pathToLog}
        target="_blank"
        download
        style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
      >
        Download Data Assimilation Logs
      </Link>
      <br />
      <NeuralNetworkLink />
      <br />
    </>
  );
}
