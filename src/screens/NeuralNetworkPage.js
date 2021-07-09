import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import asset from '../assets/sensor.png';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropDown from '../components/LocationDropDown';
import Map from '../components/Map';
import RainGraph from '../components/RainGraph';

export default function NeuralNetworkPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocationId } = useContext(LocationContext);

  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `0${date.getDate()}`.slice(-2);
  const formattedHours = `0${date.getHours()}`.slice(-2);
  const coeff = 1000 * 60 * 5;
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  const roundedMinutes = `0${rounded.getMinutes()}`.slice(-2);
  const currentFormattedDate = `${year}-${month}-${day}T${formattedHours}:${roundedMinutes}:00`;
  useEffect(() => {
    API.get(
      `locations/${selectedLocationId}/sensors/?timestamp=${currentFormattedDate}`
    )
      .then((response) => response.data)
      .then((data) => {
        setSensorsLocation(data);
      });
  }, [selectedLocationId]);

  const [pathToLog] = useState(asset);

  return (
    <>
      {/* Add props : inputDampening, inputRain, inputTime */}
      <h2>Neural Network</h2>
      <LocationDropDown />
      <Map pins={sensorsLocation} />
      <RainGraph />
      <Link
        className="download"
        to={pathToLog}
        target="_blank"
        download
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Download Neural Network Logs
      </Link>
      <Link
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        className="link"
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Data Assimilation
      </Link>
    </>
  );
}
