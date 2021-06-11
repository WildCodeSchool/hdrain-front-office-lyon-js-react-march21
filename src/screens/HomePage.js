import { React, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropdown from '../components/LocationDropDown';

export default function HomePage() {
  const { selectedLocationId, isParamsEmpty } = useContext(LocationContext);
  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <Link
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'undefined' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Neural Network Page
      </Link>
      <Link
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'undefined' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Assimilation Page
      </Link>

      <NavLink
        to={`/history?locationId=${selectedLocationId}`}
        style={
          selectedLocationId === 'undefined' || isParamsEmpty
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to History Page
      </NavLink>
      <br />
      <div>
        <img
          src="https://www.kindpng.com/picc/m/331-3317031_simple-silhouette-world-map-hd-png-download.png"
          alt="worldmap"
        />
      </div>
    </>
  );
}
