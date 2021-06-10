import React, { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

function DropDown() {
  // eslint-disable-next-line prettier/prettier
  const { locationList, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);

  return (
    <>
      <p>Select a location from the list : </p>
      <select
        name="location"
        id="location"
        value={selectedLocation}
        onChange={(event) => {
          setSelectedLocation(event.target.value);
        }}
      >
        Location
        {/* <option key="None" value="None">
          None
        </option> */}
        {locationList.map((location) => (
          <option key={location.locationId} value={location.locationName}>
            {location.locationName}
          </option>
        ))}
      </select>
      <br />
    </>
  );
}

export default DropDown;
