/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import rainMMap from '../assets/rainmap.png';
import Map from '../components/Map';
import LocationDropDown from '../components/LocationDropDown';
import API from '../APIClient';

export default function HistoryPage() {
  const { selectedLocationId, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const [parameters, setParameters] = useState();

  useEffect(() => {
    if (selectedLocation !== 'None' && date !== null) {
      setIsEnabled(true);
      API.get(`/experiments/${selectedLocationId}`)
        .then((res) => setParameters(res.data))
        .catch((err) => console.log(err));
    } else {
      setIsEnabled(false);
    }
  }, [date, selectedLocation]);

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
        <h3>Log</h3>
        {parameters.neuralNetworkLog}
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
