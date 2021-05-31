import { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationDropDown from './LocationDropDown';
import asset from '../assets/sensor.png';

export default function NeuralNetwork() {
  const [pathToLog] = useState(asset);

  return (
    <>
      <LocationDropDown />
      <br />
      <Link to={pathToLog} target="_blank" download>
        Download Logs
      </Link>
    </>
  );
}
