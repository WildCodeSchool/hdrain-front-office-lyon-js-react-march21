import { useContext, useState } from 'react';
import DatePicker from 'react-date-picker';
import { LocationContext } from '../contexts/LocationContext';

export default function HistoryPage() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [value, onChange] = useState(new Date());
  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
  };
  return (
    <>
      <h2>History</h2>
      <div className="selection">
        <p>Select a location</p>
        <select
          name="location"
          id="location"
          onChange={handleLocationSelection}
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
      </div>
      <p>Select a date</p>
      <DatePicker onChange={onChange} value={value} />
    </>
  );
}
