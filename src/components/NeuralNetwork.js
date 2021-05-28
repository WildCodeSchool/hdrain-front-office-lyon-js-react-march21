import { useContext, useState } from 'react';
import { LocationContext } from '../contexts/LocationContext';

export default function NeuralNetwork() {
  const { locationList, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
    setIsEnabled(locationValue === 'None');
  };

  return (
    <>
      <h1>Neural Network</h1>
      <h2>{selectedLocation}</h2>
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
      <button type="button" disabled={isEnabled}>
        Neural Network
      </button>
      <button type="button" disabled={isEnabled}>
        Assimilation
      </button>
    </>
  );
}
