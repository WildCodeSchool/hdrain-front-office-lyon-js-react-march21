import { useContext, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';

export default function HistoryPage() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

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
      <div className="dateAndPlacePicker">
        <div className="placePicker">
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
        <div className="datePicker">
          <p>Select a timestamp</p>
          <DateTimePicker onChange={setDate} value={date} />
        </div>
      </div>
      <div className="map">
        <h3>Sensor map</h3>
        <h3>Rain map</h3>
      </div>
      <div className="link">
        <Link
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? { pointerEvents: 'none' } : null}
        >
          Get Log GLOBAL
        </Link>

        <Link
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? { pointerEvents: 'none' } : null}
        >
          Get Log Neural Network
        </Link>
        <Link
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? { pointerEvents: 'none' } : null}
        >
          Get Log Assimilation
        </Link>
        <Link
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? { pointerEvents: 'none' } : null}
        >
          Get assimilation parameters
        </Link>
        <Link
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? { pointerEvents: 'none' } : null}
        >
          Get assimilation costs
        </Link>
      </div>
    </>
  );
}
