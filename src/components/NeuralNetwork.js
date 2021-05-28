import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';

export default function NeuralNetwork() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState('');

  const [isEnabled, setIsEnabled] = useState(true);
  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
    setIsEnabled(locationValue === 'None');
  };

  return (
    <>
      <h2>Neural Network</h2>
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
      <button type="button" disabled={isEnabled}>
        Neural Network
      </button>
      <button type="button" disabled={isEnabled}>
        Assimilation
      </button>
      <br />
      <Link to={pathToLog} target="_blank" download>
        Download Logs
      </Link>
    </>
  );
}
