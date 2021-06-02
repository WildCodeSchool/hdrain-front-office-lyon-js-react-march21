import React, { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

function DropDown() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);

  return (
    <>
      <p>Select a location from the list : </p>
      <select
        name="location"
        id="location"
        onChange={(event) => {
          setSelectedLocation(event.target.value);
        }}
      >
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
    </>
  );
}

export default DropDown;
