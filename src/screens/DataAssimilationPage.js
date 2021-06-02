/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import LocationDropDown from '../components/LocationDropDown';
import NeuralNetworkLink from '../components/NeuralNetworkLink';

export default function DataAssimilationPage() {
  const { selectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [showParams, setShowParams] = useState(false);
  const [LocationParams, setLocationParams] = useState([]);

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

  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
    setLocationParams(
      assimilationParams.filter(({ location }) => location === locationValue)
    );
    // showData(locationValue);

    if (locationValue === 'None') {
      return setShowParams(false);
    }
    return setShowParams(true);
  };

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
