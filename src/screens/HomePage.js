import { React, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropdown from '../components/LocationDropDown';
import Map from '../components/Map';

export default function HomePage() {
  const { selectedLocationId, isParamsEmpty } = useContext(LocationContext);
  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <Link
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'None' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Neural Network Page
      </Link>
      <Link
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'None' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Assimilation Page
      </Link>

      <NavLink
        to={`/history?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'None' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to History Page
      </NavLink>
      <br />
      <div>
        <Map />
      </div>
    </>
  );
}
