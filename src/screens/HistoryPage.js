import { useContext, useState } from 'react';
import DatePicker from 'react-date-picker';
import { LocationContext } from '../contexts/LocationContext';

export default function HistoryPage() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(true);

  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
    setIsEnabled(locationValue === 'None');
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
      <DatePicker onChange={setDate} value={date} />
      <div className="map">
        <h3>Sensor map</h3>
        <h3>Rain map</h3>
        <br />
        <button type="button" disabled={isEnabled}>
          Get Log GLOBAL
        </button>
        <button type="button" disabled={isEnabled}>
          Get Log Neural Network
        </button>
        <button type="button" disabled={isEnabled}>
          Get Log Assimilation
        </button>
        <button type="button" disabled={isEnabled}>
          Get parametres assimilation
        </button>
        <button type="button" disabled={isEnabled}>
          Get assimilation costs
        </button>
      </div>
    </>
  );
}
