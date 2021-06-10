import { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropDown from '../components/LocationDropDown';

export default function NeuralNetworkPage() {
  const { id } = useParams();

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
      <Link to={`/locations/assimilation/${id}`}>Go to Assimilation Page</Link>
    </>
  );
}
