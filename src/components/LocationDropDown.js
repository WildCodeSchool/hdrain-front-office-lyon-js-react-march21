import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

function DropDown() {
  const { locationList, selectedLocationId, setLocationId } =
    useContext(LocationContext);

  return (
    <>
      <p>Select a location from the list : </p>
      <div className="select">
        <select
          name="location"
          id="location"
          value={selectedLocationId}
          onChange={(event) => {
            setLocationId(event.target.value);
          }}
        >
          Location
          <option key="None" value={0}>
            None
          </option>
          {locationList.map((location) => (
            <option key={location.locationId} value={location.locationId}>
              {location.locationName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default DropDown;
