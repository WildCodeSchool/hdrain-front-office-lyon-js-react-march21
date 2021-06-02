import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import AssimilationInfos from './AssimilationInfos';
import Map from './Map';
import rainMMap from '../assets/rainmap.png';

export default function DataAssimilation() {
  const { locationList, setSelectedLocation } = useContext(LocationContext);
  const [pathToLog] = useState(asset);
  const [showParams, setShowParams] = useState(false);
  const [LocationParams, setLocationParams] = useState([]);

  const assimilationParams = [
    {
      location: 'Abidjan',
      NX: 120,
      NY: 300,
      theta: 0.9,
    },
    {
      location: 'Antibe',
      NX: 180,
      NY: 192,
      theta: 0.5,
    },
    {
      location: 'Toulouse',
      NX: 150,
      NY: 250,
      theta: 0.8,
    },
  ];

  const showData = (location) => {
    const dataToShow = assimilationParams.filter(
      (params) => params.location === location
    );
    setLocationParams(dataToShow);
  };

  const handleLocationSelection = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);
    showData(locationValue);

    if (locationValue === 'None') {
      return setShowParams(false);
    }
    return setShowParams(true);
  };

  return (
    <>
      <h2>Data Assimilation</h2>
      <p>Select a location from the list</p>
      <select name="location" id="location" onChange={handleLocationSelection}>
        Location
        {locationList.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <br />
      <br />
      <Link to={pathToLog} target="_blank" download>
        Local Log
      </Link>
      <Link to={pathToLog} target="_blank" download>
        Assimilation Log
      </Link>
      {showParams ? (
        <>
          <AssimilationInfos
            assimilationParams={LocationParams}
            show={showParams}
          />
          <div className="maps">
            <h3>Sensor map</h3>
            <Map />
            <h3>Rain map</h3>
            <img src={rainMMap} alt="rainMap" />
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
