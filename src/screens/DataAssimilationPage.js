import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LocationContext } from '../contexts/LocationContext';
import asset from '../assets/sensor.png';
import LocationDropDown from '../components/LocationDropDown';
import AssimilationInfos from '../components/AssimilationInfos';
import API from '../APIClient';
import Map from '../components/Map';

export default function DataAssimilationPage() {
  const [sensorsLocation, setSensorsLocation] = useState([]);
  const { selectedLocation, selectedLocationId } = useContext(LocationContext);

  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `0${date.getDate()}`.slice(-2);
  const formattedHours = `0${date.getHours()}`.slice(-2);
  const coeff = 1000 * 60 * 5;
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
  const roundedMinutes = `0${rounded.getMinutes()}`.slice(-2);
  const currentFormattedDate = `${year}-${month}-${day}T${formattedHours}:${roundedMinutes}:00`;
  console.log(currentFormattedDate);

  useEffect(() => {
    API.get(
      `locations/${selectedLocationId}/sensors/?timestamp=${currentFormattedDate}`
    )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setSensorsLocation(data);
      });
  }, [selectedLocationId]);

  const [pathToLog] = useState(asset);
  const [showParams, setShowParams] = useState(false);
  const [locationParams, setLocationParams] = useState(['None']);

  const assimilationParams = [
    {
      location: 'Abidjan',
      NX: 120,
      NY: 300,
      theta: 0.9,
    },
    {
      location: 'Antibes',
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

  useEffect(() => {
    if (selectedLocation === 'None') {
      setShowParams(false);
    } else {
      setLocationParams(
        assimilationParams.filter(
          ({ location }) => location === selectedLocation
        )
      );
      setShowParams(true);
    }
  }, [selectedLocation]);

  return (
    <>
      <h2>Data Assimilation</h2>
      <LocationDropDown />
      {showParams ? (
        <>
          <AssimilationInfos
            assimilationParams={locationParams}
            show={showParams}
          />
          <Map pins={sensorsLocation} />
        </>
      ) : (
        ''
      )}
      <br />
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
        Download Global Log
      </Link>
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
        Download Data Assimilation Logs
      </Link>
      <Link
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        className="link"
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Neural Network
      </Link>
    </>
  );
}
