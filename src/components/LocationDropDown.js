/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
//import qs from 'query-string';
import { LocationContext } from '../contexts/LocationContext';

function DropDown() {
  const { locationList, selectedLocationId, setLocationId } =
    useContext(LocationContext);

  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const { pathname } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [, locationUrl, datatype, idUrl] = pathname.split('/');

  return (
    <>
      <p>Select a location from the list : </p>
      <select
        name="location"
        id="location"
        value={selectedLocationId}
        onChange={(event) => {
          setLocationId(event.target.value);
        }}
      >
        Location
        {/* <option key="None" value="None">
          None
        </option> */}
        {locationList.map((location) => (
          <option key={location.locationId} value={location.locationId}>
            {location.locationName}
          </option>
        ))}
      </select>
      <br />
    </>
  );
}

export default DropDown;
