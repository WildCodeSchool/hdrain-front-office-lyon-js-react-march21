import { useContext, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import rainMMap from '../assets/rainmap.png';
import Map from '../components/Map';
import LocationDropDown from '../components/LocationDropDown';

export default function HistoryPage() {
  const { selectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);

  const [date, setDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <>
      <h2>History</h2>
      <div className="dateAndPlacePicker">
        <div className="placePicker">
          <LocationDropDown />
        </div>
        <div className="datePicker">
          <p>Select a timestamp</p>
          <DateTimePicker onChange={setDate} value={date} />
        </div>
      </div>
      <div className="maps">
        <h3>Sensor map</h3>
        {selectedLocation === 'None' ? '' : <Map />}
        <h3>Rain map</h3>
        {selectedLocation === 'None' ? (
          ''
        ) : (
          <img src={rainMMap} alt="rainMap" />
        )}
      </div>
      <div>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
        >
          Get GLOBAL Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
        >
          Get Neural Network Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
        >
          Get Assimilation Log
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
        >
          Get assimilation parameters
        </Link>
        <Link
          className="download"
          to={pathToLog}
          target="_blank"
          download
          style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
        >
          Get assimilation costs
        </Link>
      </div>
    </>
  );
}
