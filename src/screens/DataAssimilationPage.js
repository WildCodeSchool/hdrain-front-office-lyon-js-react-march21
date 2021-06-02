import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import NeuralNetworkLink from '../components/NeuralNetworkLink';

export default function DataAssimilation() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
  };

  return (
    <>
      <h2>Data Assimilation</h2>
      <p>Select a location from the list</p>
      <select name="location" id="location" onChange={handleLocationSelection}>
        Location
        <option key="None" value="None">
          None
        </option>
        {locationList.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <br />

      <br />
      <Link to={pathToLog} target="_blank" download>
        Local Log
      </Link>
      <Link to={pathToLog} target="_blank" download>
        Assimilation Log
      </Link>
      <br />
      <NeuralNetworkLink />
      <br />
    </>
  );
}
