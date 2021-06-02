import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import rainMMap from '../assets/rainmap.png';
import Map from '../components/Map';

export default function HistoryPage() {
  const { locationList, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [date, setDate] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (selectedLocation !== 'None' && date !== null) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [date, selectedLocation]);

  return (
    <>
      <h2>History</h2>
      <div className="dateAndPlacePicker">
        <div className="placePicker">
          <p>Select a location to get data</p>
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
        </div>
        <div className="datePicker">
          <p>Select a timestamp</p>
          <DateTimePicker onChange={setDate} value={date} />
        </div>
      </div>
      <div className="maps">
        <h3>Sensor map</h3>
        {isEnabled && <Map />}
        <h3>Rain map</h3>
        {isEnabled && <img src={rainMMap} alt="rainMap" />}
      </div>
      <div>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get GLOBAL Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get Neural Network Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get Assimilation Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get assimilation parameters
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={isEnabled ? null : { pointerEvents: 'none' }}
        >
          Get assimilation costs
        </Link>
      </div>
    </>
  );
}
